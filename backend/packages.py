"""Package / pricing catalog for BOOSTER MAG (simulated storefront).

Prices are display values. `orig` is the pre-sale (crossed out) price used to
show the "50% OFF" marketing effect. All data is static config used by the API.
"""

# Quality tier multipliers applied on top of base package price
QUALITY_TIERS = [
    {"id": "active", "name": "Active", "desc": "Genuine followers related to your niche", "multiplier": 1.0, "popular": False},
    {"id": "premium", "name": "Premium", "desc": "Higher-retention, more engaged accounts", "multiplier": 1.35, "popular": True},
    {"id": "vip", "name": "VIP", "desc": "Top-tier engaged accounts + priority", "multiplier": 1.75, "popular": False},
]

# Delivery speed affects how fast the simulated growth completes (seconds window)
DELIVERY_SPEEDS = [
    {"id": "regular", "name": "Regular", "desc": "Natural drip over time", "window_minutes": 120, "extra": 0.0},
    {"id": "fast", "name": "Fast", "desc": "Speeds things up", "window_minutes": 45, "extra": 0.0},
    {"id": "organic", "name": "Organic", "desc": "Most natural-looking pattern", "window_minutes": 180, "extra": 0.0},
]

UPGRADES = [
    {"id": "instant", "name": "Instant Delivery", "desc": "Delivery starts in seconds.", "price": 0.99, "icon": "zap"},
    {"id": "female", "name": "Female Followers", "desc": "Target female followers only.", "price": 1.49, "icon": "venus"},
    {"id": "country", "name": "Country Targeting", "desc": "Target followers from a chosen country.", "price": 1.49, "icon": "globe"},
    {"id": "bonus_likes", "name": "Bonus Likes", "desc": "Add 50 likes across your recent posts.", "price": 1.49, "icon": "heart"},
    {"id": "bonus_views", "name": "Bonus Views", "desc": "Add 250 views across your recent posts.", "price": 0.99, "icon": "eye"},
    {"id": "engagement", "name": "Engagement Pack", "desc": "Auto-likes + views for 7 days.", "price": 1.99, "icon": "trending-up"},
]

SUBSCRIPTIONS = [
    {
        "id": "premium",
        "name": "Premium",
        "emoji": "🏆",
        "tag": "🔥 Crazy Low",
        "price": 19.0,
        "orig": 39.99,
        "period": "mo",
        "blurb": "The best way to grow quickly with advanced targeting. Ideal for fast growing influencers and brands.",
        "cta": "Start Growing",
        "benefits": [
            "2,500 - 3,500 Followers Monthly",
            "New Followers in Just 48 Hours",
            "Satisfaction Guaranteed",
            "Engaged Followers for Your Brand",
            "Fully Automated Growth",
            "Smart AI-Powered Targeting",
            "Dedicated 24/7 Client Support",
        ],
    },
    {
        "id": "elite",
        "name": "Elite",
        "emoji": "👑",
        "tag": "👑 Luxury Growth",
        "price": 49.0,
        "orig": 99.99,
        "period": "mo",
        "blurb": "Designed for the most ambitious influencers and brands. Advanced tools and personalized services.",
        "cta": "Join the Elite",
        "benefits": [
            "10,000+ Followers Monthly",
            "Followers Begin Growing within 24 Hours",
            "Premium Satisfaction Guarantee",
            "Personalized Growth Strategy",
            "Fully Automated Growth",
            "Advanced AI Targeting Tools",
            "24/7 Elite Customer Support",
            "Exclusive VIP Community Access",
            "Monthly Growth Analytics Report",
        ],
    },
]


def _p(qty, price, orig, emoji, tag=None, bonus=None, best_seller=False, best_value=False):
    per = round(price / qty, 4) if qty else 0
    return {
        "id": str(qty),
        "qty": qty,
        "price": price,
        "orig": orig,
        "emoji": emoji,
        "tag": tag,
        "bonus": bonus,
        "per_unit": per,
        "best_seller": best_seller,
        "best_value": best_value,
    }


FOLLOWERS_TIERS = [
    _p(80, 0.99, 1.98, "😐", tag="Basic Package"),
    _p(500, 4.99, 9.98, "😎"),
    _p(1200, 9.99, 19.98, "🤑", bonus="+600 Likes"),
    _p(2500, 19.99, 39.98, "🤩", tag="Best Seller", best_seller=True),
    _p(6500, 49.99, 99.98, "🥳", bonus="+3,250 Likes", best_value=True),
    _p(14000, 99.99, 199.98, "👑", bonus="+7,000 Likes"),
    _p(25000, 149.99, 299.98, "🤴", bonus="+12,500 Likes"),
]

LIKES_TIERS = [
    _p(100, 1.99, 3.98, "😐", tag="Basic Package"),
    _p(500, 4.99, 9.98, "😎"),
    _p(1000, 8.99, 17.98, "🤑"),
    _p(2500, 17.99, 35.98, "🤩", tag="Best Seller", best_seller=True),
    _p(5000, 29.99, 59.98, "🥳", best_value=True),
    _p(10000, 49.99, 99.98, "👑"),
]

VIEWS_TIERS = [
    _p(1000, 1.99, 3.98, "😐", tag="Basic Package"),
    _p(5000, 4.99, 9.98, "😎"),
    _p(10000, 8.99, 17.98, "🤑"),
    _p(25000, 15.99, 31.98, "🤩", tag="Best Seller", best_seller=True),
    _p(50000, 24.99, 49.98, "🥳", best_value=True),
    _p(100000, 39.99, 79.98, "👑"),
]

SERVICE_META = {
    "followers": {"label": "Followers", "unit": "Follower", "tiers": FOLLOWERS_TIERS},
    "likes": {"label": "Likes", "unit": "Like", "tiers": LIKES_TIERS},
    "views": {"label": "Views", "unit": "View", "tiers": VIEWS_TIERS},
}

PLATFORM_META = {
    "instagram": {"label": "Instagram", "color": "#E1306C"},
    "tiktok": {"label": "TikTok", "color": "#000000"},
}


def get_catalog(platform: str, service: str):
    platform = (platform or "").lower()
    service = (service or "").lower()
    if platform not in PLATFORM_META or service not in SERVICE_META:
        return None
    svc = SERVICE_META[service]
    return {
        "platform": platform,
        "platform_label": PLATFORM_META[platform]["label"],
        "service": service,
        "service_label": svc["label"],
        "unit": svc["unit"],
        "tiers": svc["tiers"],
        "quality_tiers": QUALITY_TIERS,
        "delivery_speeds": DELIVERY_SPEEDS,
        "upgrades": UPGRADES,
        "subscriptions": SUBSCRIPTIONS,
    }


def find_tier(platform: str, service: str, package_id: str):
    svc = SERVICE_META.get((service or "").lower())
    if not svc:
        return None
    for t in svc["tiers"]:
        if t["id"] == str(package_id):
            return t
    return None


def find_quality(qid: str):
    for q in QUALITY_TIERS:
        if q["id"] == qid:
            return q
    return QUALITY_TIERS[0]


def find_speed(sid: str):
    for s in DELIVERY_SPEEDS:
        if s["id"] == sid:
            return s
    return DELIVERY_SPEEDS[0]


def find_upgrade(uid: str):
    for u in UPGRADES:
        if u["id"] == uid:
            return u
    return None
