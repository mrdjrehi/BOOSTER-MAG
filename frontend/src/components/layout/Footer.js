import { Link } from "react-router-dom";
import { Zap, Instagram, Twitter, Youtube } from "lucide-react";
import { BRAND, SERVICES } from "@/lib/content";

export const Footer = () => {
  return (
    <footer className="border-t border-black/10 bg-[var(--bm-surface-2)] mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="grid place-items-center h-8 w-8 rounded-lg bm-grad-cta text-white">
              <Zap className="h-5 w-5" fill="white" />
            </span>
            <span className="font-display text-2xl tracking-wide">{BRAND}</span>
          </div>
          <p className="text-sm text-[var(--bm-muted)] max-w-xs">
            Fast, simulated social growth for creators. A demo experience — no real charges, no real followers.
          </p>
          <div className="flex gap-3 mt-4">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <span key={i} className="grid place-items-center h-9 w-9 rounded-full bg-white border border-black/10">
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
        {SERVICES.map((g) => (
          <div key={g.platform}>
            <div className="font-semibold mb-3">{g.label}</div>
            <ul className="space-y-2 text-sm text-[var(--bm-muted)]">
              {g.items.map((it) => (
                <li key={it.service}>
                  <Link to={`/purchase/${g.platform}/${it.service}`} className="hover:text-[var(--bm-purple)]">
                    Buy {g.label} {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div className="font-semibold mb-3">Company</div>
          <ul className="space-y-2 text-sm text-[var(--bm-muted)]">
            <li><Link to="/dashboard" className="hover:text-[var(--bm-purple)]">Dashboard</Link></li>
            <li><Link to="/boost" className="hover:text-[var(--bm-purple)]">Free Boost</Link></li>
            <li><Link to="/faq" className="hover:text-[var(--bm-purple)]">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--bm-purple)]">Contact</Link></li>
            <li><Link to="/tos" className="hover:text-[var(--bm-purple)]">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-black/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 text-xs text-[var(--bm-muted)] flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} {BRAND}. Demo project — not affiliated with Instagram or TikTok.</span>
          <span>Made with energy ⚡</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
