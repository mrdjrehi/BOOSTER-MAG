import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Lock, ArrowRight, Loader2, PartyPopper, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/api";

function CountUp({ to }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const dur = 1200;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span>{n}</span>;
}

export default function Boost() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | private | success
  const [amount, setAmount] = useState(0);

  const runBoost = async () => {
    if (!username.trim()) return toast.error("Enter your username");
    setState("loading");
    try {
      const res = await api.boost({ username: username.trim(), platform: "instagram" });
      // little delay for drama
      setTimeout(() => {
        if (res.private) {
          setState("private");
        } else {
          setAmount(res.amount);
          setState("success");
        }
      }, 1400);
    } catch (err) {
      toast.error("Boost failed. Try again.");
      setState("idle");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-16 text-center">
      <div className="relative">
        <div className="bm-blob bg-[var(--bm-pink)] h-40 w-40 -top-6 left-6" />
        <div className="bm-blob bg-[var(--bm-purple)] h-40 w-40 top-0 right-6" />
        <div className="relative">
          <span className="inline-grid place-items-center h-20 w-20 rounded-3xl bm-grad-cta bm-glow">
            <Gift className="h-10 w-10 text-white" />
          </span>
          <h1 className="mt-6 font-display text-5xl uppercase">
            Free Follower <span className="bm-text-grad">Boost</span>
          </h1>
          <p className="mt-3 text-[var(--bm-muted)]">
            Claim a free sample boost on us. Remember to keep your account{" "}
            <span className="font-semibold text-black">PUBLIC</span>.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-white border border-black/10 bm-card-shadow p-6">
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex rounded-xl border border-black/10 overflow-hidden">
                <span className="grid place-items-center px-3 bg-[var(--bm-surface-2)] text-[var(--bm-muted)]">@</span>
                <Input
                  data-testid="boost-username-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && runBoost()}
                  placeholder="yourusername"
                  className="border-0 h-12 focus-visible:ring-0"
                />
              </div>
              <p className="mt-2 text-xs text-[var(--bm-muted)] flex items-center justify-center gap-1">
                <Lock className="h-3.5 w-3.5" /> No password required
              </p>
              <Button
                data-testid="boost-start-button"
                onClick={runBoost}
                className="mt-4 w-full h-12 rounded-full bm-grad-cta text-white gap-2 text-base"
              >
                Start Boost <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          )}

          {state === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-8">
              <Loader2 className="h-10 w-10 mx-auto animate-spin text-[var(--bm-purple)]" />
              <p className="mt-4 font-medium">Boosting @{username}...</p>
              <p className="text-sm text-[var(--bm-muted)]">Finding your profile</p>
            </motion.div>
          )}

          {state === "private" && (
            <motion.div key="private" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6" data-testid="boost-private">
              <span className="inline-grid place-items-center h-14 w-14 rounded-full bg-red-100">
                <Lock className="h-7 w-7 text-red-500" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">Profile is private</h3>
              <p className="mt-2 text-sm text-[var(--bm-muted)]">
                We can't deliver your free followers while your account is private. Make it public, then retry.
              </p>
              <div className="mt-5 flex gap-3 justify-center">
                <Button
                  data-testid="boost-retry-button"
                  variant="outline"
                  className="rounded-full border-black/15 gap-2"
                  onClick={() => setState("idle")}
                >
                  <RefreshCw className="h-4 w-4" /> Retry
                </Button>
                <Button
                  className="rounded-full bm-grad-cta text-white"
                  onClick={() => navigate("/purchase/instagram/followers")}
                >
                  See Packages
                </Button>
              </div>
            </motion.div>
          )}

          {state === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6" data-testid="boost-success">
              <span className="inline-grid place-items-center h-14 w-14 rounded-full bm-grad-cta bm-glow">
                <PartyPopper className="h-7 w-7 text-white" />
              </span>
              <div className="mt-4 font-display text-6xl bm-text-grad">
                +<CountUp to={amount} />
              </div>
              <p className="font-medium">Free followers on the way to @{username}!</p>
              <p className="mt-2 text-sm text-[var(--bm-muted)]">
                Want 10x more? Grab a full package with 50% off today.
              </p>
              <div className="mt-5 flex gap-3 justify-center">
                <Button
                  data-testid="boost-see-packages-button"
                  onClick={() => navigate("/purchase/instagram/followers")}
                  className="rounded-full bm-grad-cta text-white gap-2"
                >
                  See Packages <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="rounded-full border-black/15" onClick={() => setState("idle")}>
                  Boost Again
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-6 text-xs text-[var(--bm-muted)]">
        Tip: try a username containing the word “private” to preview the private-account flow.
      </p>
    </div>
  );
}
