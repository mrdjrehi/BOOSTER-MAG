import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight, Mail, CheckCircle2, Copy } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatNum, money, STATUS_META } from "@/lib/content";

// A simulated order-confirmation "email" receipt rendered on-screen.
export const ReceiptDialog = ({ order, open, onOpenChange }) => {
  const navigate = useNavigate();
  if (!order) return null;

  const meta = STATUS_META[order.status] || STATUS_META.pending;
  const date = order.created_at
    ? new Date(order.created_at).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

  const copyNumber = () => {
    navigator.clipboard?.writeText(order.order_number).then(
      () => toast.success("Order number copied"),
      () => {}
    );
  };

  const trackUrl = `/dashboard?order=${order.order_number}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md p-0 overflow-hidden rounded-2xl"
        data-testid="receipt-dialog"
      >
        {/* Email-style header */}
        <div className="bm-grad-hero text-white px-6 py-6 text-center relative overflow-hidden">
          <div className="bm-blob bg-white/30 h-24 w-24 -top-4 right-6" />
          <div className="relative flex items-center justify-center gap-2">
            <span className="grid place-items-center h-8 w-8 rounded-lg bg-white/20">
              <Zap className="h-5 w-5" fill="white" />
            </span>
            <span className="font-display text-2xl tracking-wide">BOOSTER MAG</span>
          </div>
          <div className="relative mt-3 flex items-center justify-center gap-2 text-sm">
            <Mail className="h-4 w-4" /> Order Confirmation Receipt
          </div>
        </div>

        <div className="px-6 py-5">
          <div className="flex items-center gap-2 text-[var(--bm-blue)]">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold">Thanks for your order!</span>
          </div>
          <p className="mt-1 text-sm text-[var(--bm-muted)]">
            This is a demo receipt — no real charge was made. Keep your order number to track progress.
          </p>

          {/* Order number */}
          <div className="mt-4 rounded-xl bg-[var(--bm-surface-2)] p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-[var(--bm-muted)]">Order Number</div>
              <div className="text-lg font-bold tracking-wide" data-testid="receipt-order-number">
                {order.order_number}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={copyNumber}
              className="rounded-full border-black/15 gap-1"
              data-testid="receipt-copy-button"
            >
              <Copy className="h-3.5 w-3.5" /> Copy
            </Button>
          </div>

          {/* Line items */}
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--bm-muted)]">
                {formatNum(order.base_qty || order.package_qty)} {order.platform_label} {order.service_label}
              </span>
              <span className="font-medium">{money(order.base_price)}</span>
            </div>
            {(order.upgrade_details || []).map((u) => (
              <div key={u.id} className="flex justify-between">
                <span className="text-[var(--bm-muted)]">{u.name}</span>
                <span className="font-medium">+{money(u.price)}</span>
              </div>
            ))}
            <div className="flex justify-between text-[var(--bm-muted)]">
              <span>Account</span>
              <span>@{order.username}</span>
            </div>
            <div className="flex justify-between text-[var(--bm-muted)]">
              <span>Status</span>
              <span>{meta.label}</span>
            </div>
            {date && (
              <div className="flex justify-between text-[var(--bm-muted)]">
                <span>Date</span>
                <span>{date}</span>
              </div>
            )}
          </div>

          <div className="mt-3 border-t border-black/10 pt-3 flex items-center justify-between">
            <span className="font-semibold">Total Paid</span>
            <span className="text-xl font-bold">{money(order.total)}</span>
          </div>

          <Button
            data-testid="receipt-track-button"
            onClick={() => {
              onOpenChange(false);
              navigate(trackUrl);
            }}
            className="mt-5 w-full h-11 rounded-full bm-grad-cta text-white gap-2"
          >
            Track My Order <ArrowRight className="h-4 w-4" />
          </Button>
          <p className="mt-2 text-center text-[11px] text-[var(--bm-muted)]">
            A copy of this receipt is saved to your Dashboard.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptDialog;
