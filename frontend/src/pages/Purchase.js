import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram,
  Music2,
  Check,
  Flame,
  Sparkles,
  Zap,
  Crown,
  ArrowRight,
  ArrowLeft,
  Lock,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Heart,
  Eye,
  Globe,
  Venus,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import api from "@/lib/api";
import { money } from "@/lib/content";

const UPGRADE_ICONS = {
  zap: Zap,
  venus: Venus,
  globe: Globe,
  heart: Heart,
  eye: Eye,
  "trending-up": TrendingUp,
};

const STEPS = ["Checkout", "Choose Upgrades", "Start Growing"];

export default function Purchase() {
  const { platform, service } = useParams();
  const navigate = useNavigate();

  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);

  const [quality, setQuality] = useState("active");
  const [speed, setSpeed] = useState("regular");
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [upgrades, setUpgrades] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" });
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setLoading(true);
    setStep(0);
    setSelectedPkg(null);
    setUpgrades([]);
    setOrder(null);
    api
      .getPackages(platform, service)
      .then((data) => {
        setCatalog(data);
        const best = data.tiers.find((t) => t.best_seller) || data.tiers[0];
        setSelectedPkg(best.id);
      })
      .catch(() => toast.error("Could not load packages"))
      .finally(() => setLoading(false));
  }, [platform, service]);

  const qualityObj = useMemo(
    () => catalog?.quality_tiers.find((q) => q.id === quality),
    [catalog, quality]
  );
  const tierObj = useMemo(
    () => catalog?.tiers.find((t) => t.id === selectedPkg),
    [catalog, selectedPkg]
  );

  const basePrice = useMemo(() => {
    if (!tierObj || !qualityObj) return 0;
    return tierObj.price * qualityObj.multiplier;
  }, [tierObj, qualityObj]);

  const upgradesTotal = useMemo(() => {
    if (!catalog) return 0;
    return catalog.upgrades
      .filter((u) => upgrades.includes(u.id))
      .reduce((s, u) => s + u.price, 0);
  }, [catalog, upgrades]);

  const total = useMemo(() => basePrice + upgradesTotal, [basePrice, upgradesTotal]);
  const origTotal = useMemo(() => {
    if (!tierObj) return 0;
    return tierObj.orig * (qualityObj?.multiplier || 1) + upgradesTotal;
  }, [tierObj, qualityObj, upgradesTotal]);

  const PlatformIcon = platform === "tiktok" ? Music2 : Instagram;

  const toggleUpgrade = (id) =>
    setUpgrades((u) => (u.includes(id) ? u.filter((x) => x !== id) : [...u, id]));

  const goNextFromStep0 = () => {
    if (!selectedPkg) return toast.error("Please select a package");
    if (!username.trim()) return toast.error("Please enter your username");
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const placeOrder = async () => {
    if (!email.trim()) return toast.error("Please enter your email");
    if (!card.number || card.number.replace(/\s/g, "").length < 12)
      return toast.error("Enter a valid card number");
    if (!card.expiry) return toast.error("Enter card expiry");
    if (!card.cvc) return toast.error("Enter CVV");
    setPlacing(true);
    try {
      const res = await api.createOrder({
        platform,
        service,
        package_id: selectedPkg,
        quality_tier: quality,
        delivery_speed: speed,
        username,
        email,
        upgrades,
        card_last4: card.number.replace(/\s/g, "").slice(-4),
      });
      setOrder(res);
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      toast.error("Could not place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (loading || !catalog) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--bm-purple)]" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Title */}
      <div className="text-center">
        <h1 className="font-display text-4xl sm:text-5xl uppercase flex items-center justify-center gap-3">
          <PlatformIcon className="h-8 w-8 text-[var(--bm-pink)]" /> Buy {catalog.platform_label}{" "}
          {catalog.service_label}
        </h1>
      </div>

      {/* Stepper */}
      <div className="mt-8 flex items-center justify-center" data-testid="checkout-stepper">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`h-9 w-9 rounded-full grid place-items-center text-sm font-bold ${
                  i < step
                    ? "bm-grad-cta text-white"
                    : i === step
                    ? "bg-black text-white"
                    : "bg-black/5 text-black/40 border border-black/10"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className="mt-1.5 text-xs font-medium text-[var(--bm-muted)] whitespace-nowrap">
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 w-16 sm:w-28 mx-2 ${i < step ? "bm-grad-cta" : "bg-black/10"}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 0 - PACKAGES */}
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-10"
          >
            {/* Quality tiers */}
            <Tabs value={quality} onValueChange={setQuality} className="w-full">
              <TabsList className="w-full h-auto p-1 grid grid-cols-3 rounded-xl bg-[var(--bm-surface-2)]" data-testid="quality-tier-tabs">
                {catalog.quality_tiers.map((q) => (
                  <TabsTrigger
                    key={q.id}
                    value={q.id}
                    data-testid={`quality-tab-${q.id}`}
                    className="rounded-lg data-[state=active]:bg-[image:var(--bm-grad-cta)] data-[state=active]:text-white py-2 relative"
                  >
                    {q.name}
                    {q.popular && (
                      <span className="absolute -top-2 right-1 text-[9px] bg-[var(--bm-amber)] text-white px-1.5 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <p className="text-center text-sm text-[var(--bm-muted)] mt-3">{qualityObj?.desc}</p>

            {/* Delivery speed */}
            <div className="mt-6">
              <Label className="text-xs uppercase tracking-wide text-[var(--bm-muted)]">
                Delivery Speed
              </Label>
              <RadioGroup
                value={speed}
                onValueChange={setSpeed}
                className="mt-2 grid grid-cols-3 gap-3"
                data-testid="delivery-speed-radio"
              >
                {catalog.delivery_speeds.map((s) => (
                  <label
                    key={s.id}
                    htmlFor={`speed-${s.id}`}
                    className={`cursor-pointer rounded-xl border p-3 flex items-start gap-2 ${
                      speed === s.id ? "border-[var(--bm-purple)] bg-[var(--bm-surface-2)]" : "border-black/10"
                    }`}
                  >
                    <RadioGroupItem value={s.id} id={`speed-${s.id}`} className="mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold">{s.name}</div>
                      <div className="text-xs text-[var(--bm-muted)]">{s.desc}</div>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>

            {/* Package grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {catalog.tiers.map((t) => {
                const active = selectedPkg === t.id;
                const price = (t.price * (qualityObj?.multiplier || 1)).toFixed(2);
                const orig = (t.orig * (qualityObj?.multiplier || 1)).toFixed(2);
                return (
                  <button
                    key={t.id}
                    data-testid={`package-select-${platform}-${service}-${t.id}-button`}
                    onClick={() => setSelectedPkg(t.id)}
                    className={`relative text-left rounded-2xl p-[1.5px] ${
                      active ? "bg-[image:var(--bm-grad-border)]" : "bg-black/10"
                    }`}
                  >
                    <div className="rounded-2xl bg-white p-5 h-full">
                      {t.best_seller && (
                        <Badge className="absolute -top-2 left-4 bm-grad-cta text-white border-0 gap-1">
                          <Flame className="h-3 w-3" /> Best Seller
                        </Badge>
                      )}
                      {t.best_value && (
                        <Badge className="absolute -top-2 left-4 bg-[var(--bm-blue)] text-white border-0 gap-1">
                          <Sparkles className="h-3 w-3" /> Best Value
                        </Badge>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold tracking-tight">
                          {t.qty.toLocaleString()}
                        </div>
                        <span className="text-2xl">{t.emoji}</span>
                      </div>
                      <div className="text-xs text-[var(--bm-muted)]">{catalog.service_label}</div>
                      {t.bonus && (
                        <div className="mt-1 text-xs font-medium text-[var(--bm-purple)]">{t.bonus}</div>
                      )}
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-2xl font-bold">${price}</span>
                        <span className="text-sm text-[var(--bm-muted)] line-through">${orig}</span>
                      </div>
                      <div className="text-[11px] text-[var(--bm-muted)] mt-0.5">
                        ${t.per_unit.toFixed(4)} / {catalog.unit.toLowerCase()}
                      </div>
                      <div
                        className={`mt-4 h-9 rounded-full grid place-items-center text-sm font-semibold ${
                          active ? "bm-grad-cta text-white" : "bg-[var(--bm-surface-2)] text-black"
                        }`}
                      >
                        {active ? (
                          <span className="flex items-center gap-1">
                            <Check className="h-4 w-4" /> Selected
                          </span>
                        ) : (
                          "Select"
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Username + continue */}
            <div className="mt-8 rounded-2xl bg-white border border-black/10 bm-card-shadow p-6">
              <Label htmlFor="username" className="font-semibold">
                Enter Your {catalog.platform_label} Username
              </Label>
              <div className="mt-2 flex rounded-xl border border-black/10 overflow-hidden">
                <span className="grid place-items-center px-3 bg-[var(--bm-surface-2)] text-[var(--bm-muted)]">
                  @
                </span>
                <Input
                  id="username"
                  data-testid="checkout-username-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="yourusername"
                  className="border-0 h-12 focus-visible:ring-0"
                />
              </div>
              <p className="mt-2 text-xs text-[var(--bm-muted)] flex items-center gap-1">
                <Lock className="h-3.5 w-3.5" /> No password required — 100% secure. Keep your account public.
              </p>
              <Button
                data-testid="step0-continue-button"
                onClick={goNextFromStep0}
                className="mt-5 w-full h-12 rounded-full bm-grad-cta text-white hover:brightness-105 gap-2 text-base"
              >
                Continue <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Subscriptions */}
            <div className="mt-12">
              <h2 className="font-display text-3xl uppercase text-center">Or Go Monthly</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {catalog.subscriptions.map((s) => (
                  <div
                    key={s.id}
                    className="rounded-2xl border border-black/10 bg-white bm-card-shadow p-6"
                  >
                    <div className="flex items-center justify-between">
                      <Badge className="bg-[var(--bm-surface-2)] text-black border border-black/10">
                        {s.tag}
                      </Badge>
                      <span className="text-3xl">{s.emoji}</span>
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-3xl font-bold">${s.price.toFixed(0)}</span>
                      <span className="text-[var(--bm-muted)]">/{s.period}</span>
                      <span className="text-sm line-through text-[var(--bm-muted)]">
                        ${s.orig}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[var(--bm-muted)]">{s.blurb}</p>
                    <ul className="mt-4 space-y-1.5">
                      {s.benefits.slice(0, 5).map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-[var(--bm-purple)] mt-0.5" /> {b}
                        </li>
                      ))}
                    </ul>
                    <Button
                      data-testid={`subscription-${s.id}-button`}
                      onClick={() => toast.info("Subscriptions use the same demo checkout — select a package above to try it!")}
                      variant="outline"
                      className="mt-5 w-full h-11 rounded-full border-black/15"
                    >
                      {s.cta}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 1 - UPGRADES */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid gap-6 lg:grid-cols-3"
          >
            <div className="lg:col-span-2 space-y-3">
              <h2 className="font-display text-3xl uppercase">Choose Your Upgrades</h2>
              <p className="text-sm text-[var(--bm-muted)]">Supercharge your order (optional).</p>
              {catalog.upgrades.map((u) => {
                const Icon = UPGRADE_ICONS[u.icon] || Zap;
                const on = upgrades.includes(u.id);
                return (
                  <div
                    key={u.id}
                    className={`flex items-center gap-4 rounded-xl border p-4 ${
                      on ? "border-[var(--bm-purple)] bg-[var(--bm-surface-2)]" : "border-black/10 bg-white"
                    }`}
                  >
                    <span className="grid place-items-center h-10 w-10 rounded-lg bg-[var(--bm-surface-2)]">
                      <Icon className="h-5 w-5 text-[var(--bm-purple)]" />
                    </span>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{u.name}</div>
                      <div className="text-xs text-[var(--bm-muted)]">{u.desc}</div>
                    </div>
                    <span className="text-sm font-semibold text-[var(--bm-purple)]">
                      +{money(u.price)}
                    </span>
                    <Switch
                      data-testid={`upsell-toggle-${u.id}`}
                      checked={on}
                      onCheckedChange={() => toggleUpgrade(u.id)}
                    />
                  </div>
                );
              })}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  data-testid="step1-back-button"
                  onClick={() => setStep(0)}
                  className="rounded-full border-black/15 gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  data-testid="step1-next-button"
                  onClick={() => {
                    setStep(2);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="rounded-full bm-grad-cta text-white gap-2 flex-1"
                >
                  Continue to Checkout <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <OrderSummary
              catalog={catalog}
              tierObj={tierObj}
              qualityObj={qualityObj}
              speed={speed}
              upgrades={upgrades}
              total={total}
              origTotal={origTotal}
              username={username}
            />
          </motion.div>
        )}

        {/* PAYMENT (rendered when step===1.9 flag) handled below via separate state */}
        {step === 2 && !order && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid gap-6 lg:grid-cols-3"
          >
            <div className="lg:col-span-2 rounded-2xl bg-white border border-black/10 bm-card-shadow p-6">
              <h2 className="font-display text-3xl uppercase">Checkout</h2>
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-[var(--bm-amber)] bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5" /> Demo checkout — no real charge
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    data-testid="payment-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1.5 h-11"
                  />
                  <p className="text-[11px] text-[var(--bm-muted)] mt-1">
                    Used to track your order in the Dashboard.
                  </p>
                </div>
                <div>
                  <Label htmlFor="card">Card Number</Label>
                  <div className="mt-1.5 relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--bm-muted)]" />
                    <Input
                      id="card"
                      data-testid="payment-card-number-input"
                      value={card.number}
                      onChange={(e) => setCard({ ...card, number: e.target.value })}
                      placeholder="4242 4242 4242 4242"
                      className="h-11 pl-9"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input
                      id="expiry"
                      data-testid="payment-expiry-input"
                      value={card.expiry}
                      onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                      placeholder="MM/YY"
                      className="mt-1.5 h-11"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVV</Label>
                    <Input
                      id="cvc"
                      data-testid="payment-cvc-input"
                      value={card.cvc}
                      onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                      placeholder="123"
                      className="mt-1.5 h-11"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardname">Name on Card</Label>
                  <Input
                    id="cardname"
                    data-testid="payment-name-input"
                    value={card.name}
                    onChange={(e) => setCard({ ...card, name: e.target.value })}
                    placeholder="Full name"
                    className="mt-1.5 h-11"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-5">
                <Button
                  variant="outline"
                  data-testid="payment-back-button"
                  onClick={() => setStep(1)}
                  className="rounded-full border-black/15 gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  data-testid="payment-submit-button"
                  onClick={placeOrder}
                  disabled={placing}
                  className="rounded-full bm-grad-cta text-white gap-2 flex-1 h-12"
                >
                  {placing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" /> Complete Order — {money(total)}
                    </>
                  )}
                </Button>
              </div>
              <p className="mt-3 text-center text-[11px] text-[var(--bm-muted)]">
                SSL Secured · 256-bit Encryption · Money-Back Guarantee (demo)
              </p>
            </div>
            <OrderSummary
              catalog={catalog}
              tierObj={tierObj}
              qualityObj={qualityObj}
              speed={speed}
              upgrades={upgrades}
              total={total}
              origTotal={origTotal}
              username={username}
            />
          </motion.div>
        )}

        {/* CONFIRMATION */}
        {step === 2 && order && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-10 max-w-xl mx-auto text-center rounded-2xl bg-white border border-black/10 bm-card-shadow p-10"
          >
            <div className="mx-auto h-16 w-16 rounded-full bm-grad-cta grid place-items-center bm-glow">
              <CheckCircle2 className="h-9 w-9 text-white" />
            </div>
            <h2 className="mt-5 font-display text-4xl uppercase">Payment Complete!</h2>
            <p className="mt-2 text-[var(--bm-muted)]">
              It may take up to 24 hours to fully deliver your {catalog.service_label.toLowerCase()}.
            </p>
            <div className="mt-6 rounded-xl bg-[var(--bm-surface-2)] p-4">
              <div className="text-xs text-[var(--bm-muted)]">Your Order Number</div>
              <div data-testid="confirmation-order-number" className="text-2xl font-bold tracking-wide">
                {order.order_number}
              </div>
            </div>
            <div className="mt-4 text-sm text-[var(--bm-muted)]">
              {order.package_qty.toLocaleString()} {catalog.service_label} for @{order.username}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                data-testid="confirmation-dashboard-button"
                onClick={() => navigate(`/dashboard?order=${order.order_number}`)}
                className="rounded-full bm-grad-cta text-white gap-2"
              >
                View Order Status <ArrowRight className="h-4 w-4" />
              </Button>
              <Link to="/">
                <Button variant="outline" className="rounded-full border-black/15">
                  Back Home
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OrderSummary({ catalog, tierObj, qualityObj, speed, upgrades, total, origTotal, username }) {
  const speedObj = catalog.delivery_speeds.find((s) => s.id === speed);
  const selectedUpgrades = catalog.upgrades.filter((u) => upgrades.includes(u.id));
  return (
    <div className="rounded-2xl bg-white border border-black/10 bm-card-shadow p-6 h-fit lg:sticky lg:top-24">
      <h3 className="font-semibold">Order Summary</h3>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[var(--bm-muted)]">
            {tierObj?.qty.toLocaleString()} {catalog.service_label}
          </span>
          <span className="font-medium">
            ${(tierObj?.price * (qualityObj?.multiplier || 1)).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-[var(--bm-muted)]">
          <span>Quality</span>
          <span>{qualityObj?.name}</span>
        </div>
        <div className="flex justify-between text-[var(--bm-muted)]">
          <span>Delivery</span>
          <span>{speedObj?.name}</span>
        </div>
        {username && (
          <div className="flex justify-between text-[var(--bm-muted)]">
            <span>Account</span>
            <span>@{username}</span>
          </div>
        )}
        {selectedUpgrades.map((u) => (
          <div key={u.id} className="flex justify-between">
            <span className="text-[var(--bm-muted)]">{u.name}</span>
            <span className="font-medium">+${u.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-black/10 pt-4 flex items-baseline justify-between">
        <span className="font-semibold">Total Due</span>
        <div className="text-right">
          <span className="text-xs line-through text-[var(--bm-muted)] mr-2">
            ${origTotal.toFixed(2)}
          </span>
          <span data-testid="order-summary-total" className="text-2xl font-bold">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="mt-2 text-xs text-center text-[var(--bm-purple)] font-medium">
        You're saving ${(origTotal - total).toFixed(2)} (50% off)
      </div>
    </div>
  );
}
