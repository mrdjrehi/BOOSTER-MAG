import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  Loader2,
  Zap,
  LogOut,
  RefreshCw,
  DollarSign,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import api from "@/lib/api";
import { STATUS_META, formatNum, money } from "@/lib/content";

const STATUS_OPTIONS = ["pending", "processing", "growing", "completed", "canceled"];
const statusColors = {
  amber: "bg-amber-100 text-amber-700 border-amber-200",
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
  lime: "bg-lime-100 text-lime-700 border-lime-200",
  red: "bg-red-100 text-red-700 border-red-200",
};

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("bm_admin_token") || "");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({ total: 0, revenue: 0 });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const load = useCallback(
    async (tk, status) => {
      setLoading(true);
      try {
        const res = await api.adminOrders(tk, status === "all" ? undefined : status);
        setOrders(res.orders);
        setSummary(res.summary);
      } catch (err) {
        if (err?.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("bm_admin_token");
          setToken("");
        } else {
          toast.error("Failed to load orders");
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (token) load(token, filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, filter]);

  const login = async () => {
    if (!password) return toast.error("Enter the admin password");
    setLoggingIn(true);
    try {
      const res = await api.adminLogin(password);
      localStorage.setItem("bm_admin_token", res.token);
      setToken(res.token);
      toast.success("Welcome back, admin!");
    } catch (err) {
      toast.error("Invalid password");
    } finally {
      setLoggingIn(false);
    }
  };

  const updateStatus = async (order, status) => {
    try {
      await api.adminUpdateOrder(token, order.id, { status });
      toast.success(`Order ${order.order_number} → ${status}`);
      load(token, filter);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("bm_admin_token");
    setToken("");
    setPassword("");
  };

  if (!token) {
    return (
      <div className="min-h-screen grid place-items-center bg-[var(--bm-surface-2)] px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white border border-black/10 bm-card-shadow p-8">
          <Link to="/" className="flex items-center justify-center gap-2 mb-6">
            <span className="grid place-items-center h-9 w-9 rounded-lg bm-grad-cta text-white">
              <Zap className="h-5 w-5" fill="white" />
            </span>
            <span className="font-display text-2xl tracking-wide">BOOSTER MAG</span>
          </Link>
          <h1 className="text-lg font-semibold text-center">Admin Login</h1>
          <p className="text-sm text-[var(--bm-muted)] text-center mt-1">
            Enter your admin password to manage orders.
          </p>
          <div className="mt-5">
            <Label htmlFor="admin-pass">Password</Label>
            <div className="mt-1.5 relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--bm-muted)]" />
              <Input
                id="admin-pass"
                type="password"
                data-testid="admin-password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && login()}
                placeholder="••••••••"
                className="h-11 pl-9"
              />
            </div>
          </div>
          <Button
            data-testid="admin-login-button"
            onClick={login}
            disabled={loggingIn}
            className="mt-5 w-full h-11 rounded-full bm-grad-cta text-white gap-2"
          >
            {loggingIn ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
            Log In
          </Button>
          <p className="mt-4 text-[11px] text-center text-[var(--bm-muted)]">
            Demo password: <span className="font-mono">boostermag2026</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bm-surface-2)]">
      <header className="bg-white border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid place-items-center h-8 w-8 rounded-lg bm-grad-cta text-white">
              <Zap className="h-5 w-5" fill="white" />
            </span>
            <span className="font-display text-xl tracking-wide">BOOSTER MAG · Admin</span>
          </Link>
          <Button data-testid="admin-logout-button" variant="outline" onClick={logout} className="rounded-full border-black/15 gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div className="rounded-2xl bg-white border border-black/10 p-5 flex items-center gap-4">
            <span className="grid place-items-center h-11 w-11 rounded-xl bg-[var(--bm-surface-2)]">
              <Package className="h-5 w-5 text-[var(--bm-purple)]" />
            </span>
            <div>
              <div className="text-2xl font-bold">{summary.total}</div>
              <div className="text-xs text-[var(--bm-muted)]">Total Orders</div>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-black/10 p-5 flex items-center gap-4">
            <span className="grid place-items-center h-11 w-11 rounded-xl bg-[var(--bm-surface-2)]">
              <DollarSign className="h-5 w-5 text-[var(--bm-blue)]" />
            </span>
            <div>
              <div className="text-2xl font-bold">{money(summary.revenue)}</div>
              <div className="text-xs text-[var(--bm-muted)]">Revenue (demo)</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-lg">Orders</h1>
          <div className="flex items-center gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40" data-testid="admin-filter-select">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {STATUS_META[s]?.label || s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => load(token, filter)} className="rounded-full border-black/15 gap-2">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-black/10 overflow-hidden">
          <div className="overflow-x-auto">
            <Table data-testid="admin-orders-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-[var(--bm-muted)] py-10">
                      {loading ? "Loading..." : "No orders yet."}
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((o) => {
                    const meta = STATUS_META[o.status] || STATUS_META.pending;
                    return (
                      <TableRow key={o.id} data-testid={`admin-order-row-${o.order_number}`}>
                        <TableCell className="font-mono text-xs">{o.order_number}</TableCell>
                        <TableCell className="text-sm">
                          {formatNum(o.package_qty)} {o.platform_label} {o.service_label}
                        </TableCell>
                        <TableCell className="text-sm">@{o.username}</TableCell>
                        <TableCell className="text-xs text-[var(--bm-muted)]">{o.email}</TableCell>
                        <TableCell className="text-sm font-medium">{money(o.total)}</TableCell>
                        <TableCell className="text-sm">{o.progress_pct}%</TableCell>
                        <TableCell>
                          <Select value={o.status} onValueChange={(v) => updateStatus(o, v)}>
                            <SelectTrigger
                              className={`w-32 h-8 text-xs border ${statusColors[meta.color]}`}
                              data-testid={`admin-status-select-${o.order_number}`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {STATUS_OPTIONS.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {STATUS_META[s]?.label || s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
