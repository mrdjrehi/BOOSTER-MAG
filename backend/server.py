from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import random
import secrets
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

import packages as catalog

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'boostermag2026')

app = FastAPI(title="BOOSTER MAG API")
api_router = APIRouter(prefix="/api")

# In-memory admin session tokens (fine for demo)
ADMIN_TOKENS = set()

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ----------------------------- Models -----------------------------
class OrderCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    platform: str
    service: str
    package_id: str
    quality_tier: str = "active"
    delivery_speed: str = "regular"
    username: str
    email: EmailStr
    upgrades: List[str] = []
    card_last4: Optional[str] = None
    is_subscription: bool = False
    subscription_id: Optional[str] = None
    bonus_qty: int = 0
    bonus_price: float = 0.0
    bonus_label: Optional[str] = None


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


class AdminLogin(BaseModel):
    password: str


class AdminOrderUpdate(BaseModel):
    status: Optional[str] = None
    progress_pct: Optional[float] = None
    delivered_count: Optional[int] = None
    note: Optional[str] = None


class BoostCreate(BaseModel):
    platform: str = "instagram"
    username: str


# ----------------------------- Helpers -----------------------------
def now_iso():
    return datetime.now(timezone.utc).isoformat()


def gen_order_number():
    return "BM-" + "".join(random.choices("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", k=8))


def compute_progress(order: dict):
    """Simulate follower/like/view growth based on elapsed time."""
    try:
        created = datetime.fromisoformat(order["created_at"])
    except Exception:
        created = datetime.now(timezone.utc)
    if created.tzinfo is None:
        created = created.replace(tzinfo=timezone.utc)

    if order.get("manual_override"):
        pct = float(order.get("progress_pct", 0))
        manual_delivered = order.get("delivered_count")
    else:
        speed = catalog.find_speed(order.get("delivery_speed", "regular"))
        window_min = speed["window_minutes"]
        if "instant" in (order.get("upgrades") or []):
            window_min = max(3, window_min * 0.15)
        elapsed_min = (datetime.now(timezone.utc) - created).total_seconds() / 60.0
        pct = max(0.0, min(100.0, (elapsed_min / window_min) * 100.0))
        manual_delivered = None

    qty = int(order.get("package_qty", 0))
    if manual_delivered is not None:
        delivered = int(manual_delivered)
    else:
        delivered = int(round(qty * pct / 100.0))

    if pct <= 0:
        status = "pending"
    elif pct < 100:
        status = "processing" if pct < 15 else "growing"
    else:
        status = "completed"

    admin_status = order.get("admin_status")
    if admin_status in ("canceled", "completed", "processing", "growing", "pending"):
        status = admin_status
        if admin_status == "completed":
            pct, delivered = 100.0, qty
    return round(pct, 1), delivered, status


def serialize_order(order: dict, include_email=True):
    pct, delivered, status = compute_progress(order)
    out = {
        "id": order.get("id"),
        "order_number": order.get("order_number"),
        "platform": order.get("platform"),
        "platform_label": order.get("platform_label"),
        "service": order.get("service"),
        "service_label": order.get("service_label"),
        "unit": order.get("unit"),
        "package_qty": order.get("package_qty"),
        "base_qty": order.get("base_qty", order.get("package_qty")),
        "bonus_qty": order.get("bonus_qty", 0),
        "quality_tier": order.get("quality_tier"),
        "delivery_speed": order.get("delivery_speed"),
        "username": order.get("username"),
        "upgrades": order.get("upgrades", []),
        "upgrade_details": order.get("upgrade_details", []),
        "base_price": order.get("base_price"),
        "total": order.get("total"),
        "is_subscription": order.get("is_subscription", False),
        "subscription_id": order.get("subscription_id"),
        "created_at": order.get("created_at"),
        "progress_pct": pct,
        "delivered_count": delivered,
        "status": status,
        "note": order.get("note", ""),
    }
    if include_email:
        out["email"] = order.get("email")
    return out


def require_admin(authorization: Optional[str] = Header(None)):
    token = None
    if authorization and authorization.lower().startswith("bearer "):
        token = authorization.split(" ", 1)[1].strip()
    if not token or token not in ADMIN_TOKENS:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return token


# ----------------------------- Routes -----------------------------
@api_router.get("/")
async def root():
    return {"message": "BOOSTER MAG API", "status": "ok"}


@api_router.get("/packages")
async def get_packages(platform: str = "instagram", service: str = "followers"):
    data = catalog.get_catalog(platform, service)
    if not data:
        raise HTTPException(status_code=404, detail="Unknown platform/service")
    return data


@api_router.post("/orders")
async def create_order(payload: OrderCreate):
    tier = catalog.find_tier(payload.platform, payload.service, payload.package_id)
    cat = catalog.get_catalog(payload.platform, payload.service)
    if not tier or not cat:
        raise HTTPException(status_code=400, detail="Invalid package selection")

    quality = catalog.find_quality(payload.quality_tier)
    speed = catalog.find_speed(payload.delivery_speed)

    base_price = round(tier["price"] * quality["multiplier"], 2)
    upgrade_details = []
    upg_total = 0.0
    for uid in payload.upgrades:
        u = catalog.find_upgrade(uid)
        if u:
            upgrade_details.append({"id": u["id"], "name": u["name"], "price": u["price"]})
            upg_total += u["price"]

    total = round(base_price + upg_total + speed.get("extra", 0.0), 2)

    # Optional "final offer" bonus followers/likes/views
    bonus_qty = max(0, int(payload.bonus_qty or 0))
    bonus_price = round(max(0.0, float(payload.bonus_price or 0.0)), 2)
    if bonus_qty > 0 and bonus_price >= 0:
        total = round(total + bonus_price, 2)
        if payload.bonus_label:
            upgrade_details.append({"id": "bonus", "name": payload.bonus_label, "price": bonus_price})

    total_qty = tier["qty"] + bonus_qty

    order = {
        "id": str(uuid.uuid4()),
        "order_number": gen_order_number(),
        "platform": payload.platform,
        "platform_label": cat["platform_label"],
        "service": payload.service,
        "service_label": cat["service_label"],
        "unit": cat["unit"],
        "package_id": payload.package_id,
        "package_qty": total_qty,
        "base_qty": tier["qty"],
        "bonus_qty": bonus_qty,
        "bonus_price": bonus_price,
        "bonus_label": payload.bonus_label,
        "quality_tier": payload.quality_tier,
        "delivery_speed": payload.delivery_speed,
        "username": payload.username.lstrip("@").strip(),
        "email": payload.email.lower(),
        "upgrades": [u["id"] for u in upgrade_details],
        "upgrade_details": upgrade_details,
        "base_price": base_price,
        "total": total,
        "is_subscription": payload.is_subscription,
        "subscription_id": payload.subscription_id,
        "admin_status": None,
        "manual_override": False,
        "progress_pct": 0.0,
        "delivered_count": 0,
        "note": "",
        "created_at": now_iso(),
        "updated_at": now_iso(),
    }
    await db.orders.insert_one({**order})
    return serialize_order(order)


@api_router.get("/orders/lookup")
async def lookup_orders(email: Optional[str] = None, order_number: Optional[str] = None):
    query = {}
    if order_number:
        query["order_number"] = order_number.strip().upper()
    elif email:
        query["email"] = email.strip().lower()
    else:
        raise HTTPException(status_code=400, detail="Provide email or order_number")

    docs = await db.orders.find(query, {"_id": 0}).sort("created_at", -1).to_list(200)
    return {"orders": [serialize_order(d) for d in docs]}


@api_router.get("/orders/{order_number}")
async def get_order(order_number: str):
    doc = await db.orders.find_one({"order_number": order_number.strip().upper()}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Order not found")
    return serialize_order(doc)


@api_router.post("/boost")
async def free_boost(payload: BoostCreate):
    """Simulated free boost. Usernames containing 'private' are treated as private."""
    username = payload.username.lstrip("@").strip()
    if not username:
        raise HTTPException(status_code=400, detail="Enter a username")
    is_private = "private" in username.lower()
    boost_amount = random.choice([25, 35, 50, 60, 75])
    doc = {
        "id": str(uuid.uuid4()),
        "username": username,
        "platform": payload.platform,
        "amount": boost_amount,
        "created_at": now_iso(),
    }
    await db.boosts.insert_one({**doc})
    return {"username": username, "private": is_private, "amount": boost_amount}


@api_router.post("/contact")
async def create_contact(payload: ContactCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "email": payload.email.lower(),
        "message": payload.message.strip(),
        "created_at": now_iso(),
    }
    await db.contacts.insert_one({**doc})
    return {"success": True, "message": "Thanks! We'll get back to you shortly."}


@api_router.get("/stats")
async def public_stats():
    total = await db.orders.count_documents({})
    return {
        "orders": total,
        "followers_delivered": 1200000 + total * 137,
        "creators": 30000 + total,
        "rating": 5.0,
    }


# ----------------------------- Admin -----------------------------
@api_router.post("/admin/login")
async def admin_login(payload: AdminLogin):
    if payload.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid password")
    token = secrets.token_urlsafe(24)
    ADMIN_TOKENS.add(token)
    return {"token": token}


@api_router.get("/admin/orders")
async def admin_orders(status: Optional[str] = None, _=Depends(require_admin)):
    docs = await db.orders.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    orders = [serialize_order(d) for d in docs]
    if status and status != "all":
        orders = [o for o in orders if o["status"] == status]
    summary = {"total": len(orders), "revenue": round(sum(o["total"] for o in orders), 2)}
    return {"orders": orders, "summary": summary}


@api_router.patch("/admin/orders/{order_id}")
async def admin_update_order(order_id: str, payload: AdminOrderUpdate, _=Depends(require_admin)):
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    update = {"updated_at": now_iso()}
    qty = int(order.get("package_qty", 0) or 0)
    if payload.status is not None:
        update["admin_status"] = payload.status
    if payload.progress_pct is not None:
        update["progress_pct"] = payload.progress_pct
        update["manual_override"] = True
        if qty:
            update["delivered_count"] = int(round(qty * float(payload.progress_pct) / 100.0))
    if payload.delivered_count is not None:
        update["delivered_count"] = int(payload.delivered_count)
        update["manual_override"] = True
        if qty:
            update["progress_pct"] = round(min(100.0, max(0.0, payload.delivered_count / qty * 100.0)), 1)
    if payload.note is not None:
        update["note"] = payload.note
    await db.orders.update_one({"id": order_id}, {"$set": update})
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    return serialize_order(order)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
