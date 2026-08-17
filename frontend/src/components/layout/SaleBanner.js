import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

function useCountdown(hours = 3) {
  const [target] = useState(() => {
    const saved = localStorage.getItem("bm_sale_end");
    if (saved && Number(saved) > Date.now()) return Number(saved);
    const end = Date.now() + hours * 3600 * 1000;
    localStorage.setItem("bm_sale_end", String(end));
    return end;
  });
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  let diff = Math.max(0, target - now);
  const h = Math.floor(diff / 3600000);
  diff -= h * 3600000;
  const m = Math.floor(diff / 60000);
  diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  const pad = (x) => String(x).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export const SaleBanner = () => {
  const time = useCountdown(3);
  const navigate = useNavigate();
  return (
    <button
      data-testid="sale-banner"
      onClick={() => navigate("/purchase/instagram/followers")}
      className="w-full bm-grad-cta text-white text-xs sm:text-sm font-medium py-2 px-4 flex items-center justify-center gap-2 hover:brightness-105"
    >
      <Sparkles className="h-4 w-4" />
      <span className="uppercase tracking-wide">Back To School Sale · 50% OFF All Services</span>
      <span className="font-mono bg-black/25 rounded px-2 py-0.5 ml-1" data-testid="sale-countdown">
        {time}
      </span>
    </button>
  );
};

export default SaleBanner;
