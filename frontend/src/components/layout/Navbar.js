import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Menu, LayoutDashboard, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SERVICES, BRAND } from "@/lib/content";

const Logo = () => (
  <Link to="/" data-testid="nav-logo" className="flex items-center gap-2 group">
    <span className="grid place-items-center h-8 w-8 rounded-lg bm-grad-cta text-white">
      <Zap className="h-5 w-5" fill="white" />
    </span>
    <span className="font-display text-2xl leading-none tracking-wide">{BRAND}</span>
  </Link>
);

const ServiceDropdown = ({ group }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        data-testid={`nav-dropdown-${group.platform}`}
        className="flex items-center gap-1 text-sm font-medium py-2 hover:text-[var(--bm-purple)]"
      >
        {group.label} Services <ChevronDown className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-2 w-64 z-50">
          <div className="rounded-xl border border-black/10 bg-white bm-card-shadow p-2">
            {group.items.map((it) => (
              <Link
                key={it.service}
                to={`/purchase/${group.platform}/${it.service}`}
                data-testid={`nav-link-${group.platform}-${it.service}`}
                className="block rounded-lg px-3 py-2 hover:bg-[var(--bm-surface-2)]"
              >
                <div className="font-semibold text-sm">
                  {group.label} {it.label}
                </div>
                <div className="text-xs text-[var(--bm-muted)]">{it.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-black/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-6">
          {SERVICES.map((g) => (
            <ServiceDropdown key={g.platform} group={g} />
          ))}
          <Link to="/faq" data-testid="nav-faq" className="text-sm font-medium hover:text-[var(--bm-purple)]">
            FAQ
          </Link>
          <Link to="/contact" data-testid="nav-contact" className="text-sm font-medium hover:text-[var(--bm-purple)]">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            data-testid="nav-dashboard-button"
            variant="outline"
            className="rounded-full border-black/15 gap-2 hidden sm:flex"
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button data-testid="nav-mobile-trigger" variant="outline" size="icon" className="md:hidden rounded-full border-black/15">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="font-display text-2xl">{BRAND}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {SERVICES.map((g) => (
                  <div key={g.platform}>
                    <div className="text-xs uppercase tracking-wide text-[var(--bm-muted)] mb-2">
                      {g.label}
                    </div>
                    <div className="space-y-1">
                      {g.items.map((it) => (
                        <Link
                          key={it.service}
                          to={`/purchase/${g.platform}/${it.service}`}
                          data-testid={`nav-mobile-${g.platform}-${it.service}`}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-lg px-3 py-2 hover:bg-[var(--bm-surface-2)] text-sm font-medium"
                        >
                          {g.label} {it.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="border-t border-black/10 pt-4 space-y-1">
                  {[
                    ["/dashboard", "Dashboard"],
                    ["/boost", "Free Boost"],
                    ["/faq", "FAQ"],
                    ["/contact", "Contact"],
                  ].map(([to, label]) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2 hover:bg-[var(--bm-surface-2)] text-sm font-medium"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
