import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  ArrowRight,
  Zap,
  ShieldCheck,
  Lock,
  Play,
  Sprout,
  Gem,
  BadgeDollarSign,
  TrendingUp,
  Users,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Reveal, Marquee } from "@/components/Reveal";
import {
  BENEFITS,
  HOW_IT_WORKS,
  FEATURES,
  TESTIMONIALS,
  CLIENTS,
  FAQS,
  formatNum,
} from "@/lib/content";
import api from "@/lib/api";

const FeatureIcon = ({ name, className }) => {
  const map = { sprout: Sprout, gem: Gem, "badge-dollar-sign": BadgeDollarSign };
  const Icon = map[name] || Sprout;
  return <Icon className={className} />;
};

export default function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ followers_delivered: 1200000, creators: 30000 });

  useEffect(() => {
    api.stats().then(setStats).catch(() => {});
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="bm-blob bg-[var(--bm-purple)] h-72 w-72 -top-10 -left-10" />
        <div className="bm-blob bg-[var(--bm-pink)] h-72 w-72 top-0 right-0" />
        <div className="bm-blob bg-[var(--bm-blue)] h-64 w-64 top-20 left-1/3" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-14 text-center">
          <Reveal>
            <Badge className="rounded-full bg-white border border-black/10 text-black gap-1 mb-5 px-3 py-1">
              <Star className="h-3.5 w-3.5 fill-[var(--bm-amber)] text-[var(--bm-amber)]" /> 5.0 · Trusted by {formatNum(stats.creators)} creators
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] uppercase">
              10x Your <span className="bm-text-grad">Instagram</span> Followers
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-[var(--bm-muted)]">
              Get instant followers starting at <span className="font-semibold text-black">$0.99</span>.
              <br className="hidden sm:block" /> No bots, no fake followers, no passwords.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                data-testid="hero-start-growing-button"
                onClick={() => navigate("/purchase/instagram/followers")}
                className="rounded-full h-12 px-7 text-base text-white bm-grad-cta bm-glow hover:brightness-105 gap-2"
              >
                <Zap className="h-5 w-5" fill="white" /> Start Growing <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                data-testid="hero-boost-button"
                variant="outline"
                onClick={() => navigate("/boost")}
                className="rounded-full h-12 px-7 text-base border-black/15"
              >
                Try Free Boost 🎁
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[var(--bm-muted)]">
              <span className="flex items-center gap-1"><Lock className="h-4 w-4" /> No password</span>
              <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> 100% privacy</span>
            </div>
            <p className="mt-4 text-sm font-medium">Over {formatNum(stats.followers_delivered)} followers delivered</p>
          </Reveal>
        </div>
      </section>

      {/* BENEFIT MARQUEE */}
      <div className="border-y border-black/10 bg-[var(--bm-surface-2)] py-3 text-sm font-semibold">
        <Marquee items={BENEFITS} testId="benefit-marquee" />
      </div>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal>
          <h2 className="font-display text-4xl sm:text-5xl text-center uppercase">How It Works</h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {HOW_IT_WORKS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="text-center px-4">
                <div className="mx-auto h-14 w-14 rounded-full bm-grad-cta text-white grid place-items-center text-xl font-bold bm-glow">
                  {s.n}
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-[var(--bm-muted)]">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button
            data-testid="how-start-button"
            onClick={() => navigate("/purchase/instagram/followers")}
            className="rounded-full h-12 px-7 text-white bm-grad-cta hover:brightness-105"
          >
            Start Growing <ArrowRight className="h-5 w-5 ml-1" />
          </Button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[var(--bm-surface-2)] border-y border-black/10 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl text-center uppercase">
              30,000+ Creators Recommend Us
            </h2>
            <p className="text-center text-[var(--bm-muted)] mt-3">
              From top brands to rising influencers, we deliver results.
            </p>
          </Reveal>
          <div className="mt-10">
            <Carousel opts={{ align: "start", loop: true }} data-testid="testimonials-carousel">
              <CarouselContent>
                {TESTIMONIALS.map((t, i) => (
                  <CarouselItem key={i} className="sm:basis-1/2 lg:basis-1/3">
                    <div className="h-full rounded-2xl bg-white border border-black/10 bm-card-shadow overflow-hidden">
                      <div className="relative h-40">
                        <img src={t.img} alt={t.name} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 grid place-items-center">
                          <span className="h-11 w-11 rounded-full bg-white/90 grid place-items-center">
                            <Play className="h-5 w-5 text-black" fill="black" />
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{t.name}</span>
                          <ShieldCheck className="h-4 w-4 text-[var(--bm-blue)]" />
                        </div>
                        <div className="text-xs text-[var(--bm-muted)]">
                          {t.role} · {t.followers} followers
                        </div>
                        <p className="mt-3 text-sm text-[var(--bm-muted)] italic">“{t.quote}”</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* CLIENT LOGOS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <p className="text-center text-xs uppercase tracking-wide text-[var(--bm-muted)] mb-6">
          Trusted by leading brands
        </p>
        <div className="border-y border-black/10 py-5">
          <Marquee
            testId="logo-marquee"
            fast
            items={CLIENTS.map((c) => (
              <span className="font-display text-2xl text-[var(--bm-muted)] tracking-wide">{c}</span>
            ))}
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <Reveal>
          <h2 className="font-display text-4xl sm:text-5xl text-center uppercase">
            More Followers. Better Engagement. Higher Status.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="rounded-2xl bg-white border border-black/10 bm-card-shadow p-7 h-full">
                <span className="grid place-items-center h-12 w-12 rounded-xl bg-[var(--bm-surface-2)]">
                  <FeatureIcon name={f.icon} className="h-6 w-6 text-[var(--bm-purple)]" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-[var(--bm-muted)]">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <Reveal>
          <h2 className="font-display text-4xl sm:text-5xl text-center uppercase">
            Frequently Asked Questions
          </h2>
        </Reveal>
        <Accordion type="single" collapsible className="mt-8" data-testid="faq-accordion">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-[var(--bm-muted)]">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bm-grad-hero text-white text-center px-6 py-16 bm-glow">
            <div className="bm-blob bg-white/40 h-40 w-40 -top-6 left-10" />
            <p className="uppercase tracking-wide text-sm opacity-90">What are you waiting for?</p>
            <h2 className="font-display text-4xl sm:text-6xl uppercase mt-2">Seriously, Yo…</h2>
            <p className="mt-3 max-w-xl mx-auto opacity-95">
              You should really just say “f*ck it” and take BOOSTER MAG for a spin.
            </p>
            <Button
              data-testid="cta-start-button"
              onClick={() => navigate("/purchase/instagram/followers")}
              className="mt-7 rounded-full h-12 px-8 bg-white text-black hover:bg-white/90 gap-2"
            >
              Start Growing <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
