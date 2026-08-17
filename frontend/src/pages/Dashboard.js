import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Mail,
  Hash,
  Loader2,
  TrendingUp,
  Clock,
  Gift,
  Star,
  Instagram,
  Music2,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import api from "@/lib/api";
import { STATUS_META, formatNum, money } from "@/lib/content";

const statusColors = {
  amber: "bg-amber-100 text-amber-700 border-amber-200",
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
  lime: "bg-lime-100 text-lime-700 border-lime-200",
  red: "bg-red-100 text-red-700 border-red-200",
};

function StatusChip({ status }) {
  const meta = STATUS_META[status] || STATUS_META.pending;
  return (
    <Badge className={`border ${statusColors[meta.color]}`} data-testid="order-status-chip">
      {meta.label}
    </Badge>
  );
}

function OrderCard({ order, onCancel }) {
  const PlatformIcon = order.platform === "tiktok" ? Music2 : Instagram;
  const meta = STATUS_META[order.status] || STATUS_META.pending;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white border border-black/10 bm-card-shadow p-6"
      data-testid="dashboard-order-card"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center h-11 w-11 rounded-xl bg-[var(--bm-surface-2)]">
            <PlatformIcon className="h-5 w-5 text-[var(--bm-pink)]" />
          </span>
          <div>
            <div className="font-semibold">
              {formatNum(order.package_qty)} {order.service_label}
            </div>
            <div className="text-xs text-[var(--bm-muted)]">
              {order.platform_label} · @{order.username} · {order.order_number}
            </div>
          </div>
        </div>
        <StatusChip status={order.status} />
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-[var(--bm-muted)]">{meta.desc}</span>
          <span className="font-semibold">{order.progress_pct}%</span>
        </div>
        <Progress value={order.progress_pct} className="h-3" data-testid="order-progress-bar" />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl bg-[var(--bm-surface-2)] p-3">
          <div className="text-lg font-bold" data-testid="order-delivered-count">
            {formatNum(order.delivered_count)}
          </div>
          <div className="text-[11px] text-[var(--bm-muted)]">Delivered</div>
        </div>
        <div className="rounded-xl bg-[var(--bm-surface-2)] p-3">
          <div className="text-lg font-bold">{formatNum(order.package_qty)}</div>
          <div className="text-[11px] text-[var(--bm-muted)]">Total</div>
        </div>
        <div className="rounded-xl bg-[var(--bm-surface-2)] p-3">
          <div className="text-lg font-bold">{money(order.total)}</div>
          <div className="text-[11px] text-[var(--bm-muted)]">Paid</div>
        </div>
      </div>

      {order.upgrade_details?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {order.upgrade_details.map((u) => (
            <Badge key={u.id} variant="outline" className="border-black/15">
              {u.name}
            </Badge>
          ))}
        </div>
      )}

      {order.is_subscription && order.status !== "canceled" && (
        <Button
          data-testid="cancel-renewal-button"
          variant="outline"
          onClick={() => onCancel(order)}
          className="mt-4 w-full rounded-full border-black/15 gap-2 text-red-600"
        >
          <XCircle className="h-4 w-4" /> Cancel Renewal
        </Button>
      )}
    </motion.div>
  );
}

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState("email");
  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState(searchParams.get("order") || "");
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);

  const doLookup = useCallback(async (params) => {
    setLoading(true);
    try {
      const res = await api.lookupOrders(params);
      setOrders(res.orders);
      if (res.orders.length === 0) toast.info("No orders found. Try again.");
    } catch (err) {
      toast.error("Lookup failed. Please try again.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const o = searchParams.get("order");
    if (o) {
      setTab("order");
      doLookup({ order_number: o });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // auto refresh progress every 15s when we have orders
  useEffect(() => {
    if (!orders || orders.length === 0) return;
    const id = setInterval(() => {
      if (tab === "email" && email) doLookup({ email });
      else if (tab === "order" && orderNumber) doLookup({ order_number: orderNumber });
    }, 15000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, tab, email, orderNumber]);

  const submit = () => {
    if (tab === "email") {
      if (!email.trim()) return toast.error("Enter your email");
      doLookup({ email: email.trim() });
    } else {
      if (!orderNumber.trim()) return toast.error("Enter your order number");
      doLookup({ order_number: orderNumber.trim() });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-5xl uppercase text-center">Dashboard</h1>
      <p className="text-center text-[var(--bm-muted)] mt-3">
        Track your growth. Please allow up to 24 hours to start seeing results.
      </p>

      {/* Promo card */}
      <div className="mt-8 rounded-2xl bm-grad-hero text-white p-6 relative overflow-hidden">
        <div className="bm-blob bg-white/30 h-32 w-32 -top-4 right-6" />
        <div className="relative flex items-center gap-4">
          <Gift className="h-10 w-10" />
          <div>
            <div className="font-semibold flex items-center gap-2">
              Leave a review & get 500 FREE followers! <Star className="h-4 w-4 fill-white" />
            </div>
            <div className="text-sm opacity-90">
              Limited-time offer. Remember to include your username in the review.
            </div>
          </div>
        </div>
      </div>

      {/* Lookup */}
      <div className="mt-8 rounded-2xl bg-white border border-black/10 bm-card-shadow p-6">
        <h2 className="font-semibold mb-4">Look Up Your Order</h2>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-2 w-full rounded-xl bg-[var(--bm-surface-2)]">
            <TabsTrigger value="email" data-testid="lookup-tab-email" className="rounded-lg gap-2">
              <Mail className="h-4 w-4" /> By Email
            </TabsTrigger>
            <TabsTrigger value="order" data-testid="lookup-tab-order" className="rounded-lg gap-2">
              <Hash className="h-4 w-4" /> By Order #
            </TabsTrigger>
          </TabsList>
          <TabsContent value="email" className="mt-4">
            <Label htmlFor="lookup-email">Email Address</Label>
            <Input
              id="lookup-email"
              data-testid="lookup-email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="you@example.com"
              className="mt-1.5 h-11"
            />
          </TabsContent>
          <TabsContent value="order" className="mt-4">
            <Label htmlFor="lookup-order">Order Number</Label>
            <Input
              id="lookup-order"
              data-testid="lookup-order-input"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="BM-XXXXXXXX"
              className="mt-1.5 h-11"
            />
          </TabsContent>
        </Tabs>
        <Button
          data-testid="lookup-submit-button"
          onClick={submit}
          disabled={loading}
          className="mt-4 w-full h-11 rounded-full bm-grad-cta text-white gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          Look Up Order
        </Button>
      </div>

      {/* Results */}
      {orders !== null && (
        <div className="mt-8 space-y-4">
          {orders.length === 0 ? (
            <div className="text-center text-[var(--bm-muted)] py-8" data-testid="dashboard-empty">
              <TrendingUp className="h-10 w-10 mx-auto mb-3 opacity-40" />
              No orders found. Place an order to see it here!
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Your Orders ({orders.length})</h2>
                <span className="text-xs text-[var(--bm-muted)] flex items-center gap-1">
                  <RefreshCw className="h-3 w-3" /> Auto-refreshing
                </span>
              </div>
              {orders.map((o) => (
                <OrderCard key={o.id} order={o} onCancel={() => toast.success("Renewal canceled (demo).")} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
