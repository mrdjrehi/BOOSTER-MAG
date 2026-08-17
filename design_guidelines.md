{
  "brand": {
    "name": "BOOSTER MAG",
    "tagline_options": [
      "Turn scrolls into followers.",
      "Boost your socials. Loudly.",
      "Fast growth for creators on the move."
    ],
    "brand_attributes": [
      "bold",
      "playful",
      "high-conversion",
      "Gen-Z / creator economy",
      "trustworthy-but-not-corporate",
      "mobile-first",
      "urgency-driven"
    ],
    "voice_and_copy": {
      "tone": "short, punchy, meme-aware, confident",
      "rules": [
        "Use energetic microcopy: 'Start Growing', 'Claim Deal', 'Boost Now'.",
        "Use emojis in marketing copy ONLY (headlines, badges, package names). Avoid emojis as icons; use lucide-react icons.",
        "Always include reassurance near payment: 'Demo checkout — no real charges'."
      ]
    }
  },
  "inspiration_sources": {
    "layout_reference": {
      "name": "Shadcnblocks Landing Page 3",
      "url": "https://www.shadcnblocks.com/page/landing-page3",
      "takeaways": [
        "Dual-row logo marquee for social proof",
        "Hero with gradient mask + strong CTA",
        "Pricing grid with highlighted plan",
        "Testimonials grid + newsletter CTA"
      ]
    },
    "component_style_reference": {
      "name": "Refero Pally design system",
      "url": "https://styles.refero.design/style/029d3ce0-0fe5-4a8c-99c4-4f9d704f1c60",
      "takeaways": [
        "Tight tracking on headings for punch",
        "Pill shapes + glossy halos",
        "Compact but intentional spacing rhythm",
        "Use gradients as halos/accents rather than full-page washes"
      ]
    }
  },
  "typography": {
    "google_fonts": {
      "display": {
        "family": "Bebas Neue",
        "fallback": "ui-sans-serif, system-ui",
        "usage": "Hero H1, sale banner numerals, big section titles (sparingly)."
      },
      "body": {
        "family": "Space Grotesk",
        "fallback": "ui-sans-serif, system-ui",
        "usage": "Body, UI labels, pricing, forms, dashboard."
      }
    },
    "tracking_rules": {
      "h1": "tracking-tight",
      "h2": "tracking-tight",
      "ui": "tracking-normal",
      "badge": "tracking-wide uppercase"
    },
    "type_scale_tailwind": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl",
      "h2": "text-base md:text-lg",
      "body": "text-sm md:text-base",
      "small": "text-xs"
    },
    "recommended_heading_style": {
      "className": "font-display uppercase leading-[0.95]",
      "note": "Use Bebas Neue uppercase for that poster-like punch; keep subheading in Space Grotesk for readability."
    }
  },
  "color_system": {
    "notes": [
      "User requested RizzUp-like purple→pink→magenta→blue gradients. This conflicts with the global 'no dark/saturated gradients' restriction; however the problem statement explicitly requires it. Implement with strict containment: gradients only as decorative overlays and hero accents, never behind long text, never >20% viewport.",
      "Keep the base UI light (paper white) with crisp black text; use gradients as glossy trims, borders, and CTA fills."
    ],
    "tokens_css_variables": {
      "base": {
        "--bm-bg": "#ffffff",
        "--bm-surface": "#ffffff",
        "--bm-surface-2": "#f7f7fb",
        "--bm-text": "#0b0b12",
        "--bm-muted": "#5b5b6a",
        "--bm-border": "rgba(15, 15, 25, 0.12)",
        "--bm-ring": "rgba(0, 0, 0, 0.35)"
      },
      "brand_solids": {
        "--bm-purple": "#6d28d9",
        "--bm-pink": "#ec4899",
        "--bm-magenta": "#d946ef",
        "--bm-blue": "#2563eb",
        "--bm-cyan": "#06b6d4",
        "--bm-lime": "#a3e635",
        "--bm-amber": "#f59e0b",
        "--bm-danger": "#ef4444"
      },
      "gradients": {
        "--bm-grad-hero": "linear-gradient(135deg, rgba(109,40,217,0.95) 0%, rgba(236,72,153,0.92) 35%, rgba(217,70,239,0.88) 60%, rgba(37,99,235,0.90) 100%)",
        "--bm-grad-cta": "linear-gradient(135deg, #6d28d9 0%, #ec4899 45%, #2563eb 100%)",
        "--bm-grad-card": "linear-gradient(135deg, rgba(109,40,217,0.18) 0%, rgba(236,72,153,0.16) 40%, rgba(37,99,235,0.14) 100%)",
        "--bm-grad-border": "linear-gradient(90deg, #6d28d9 0%, #ec4899 35%, #d946ef 60%, #2563eb 100%)"
      },
      "shadows": {
        "--bm-shadow-sm": "0 1px 0 rgba(0,0,0,0.04), 0 8px 24px rgba(15, 15, 25, 0.06)",
        "--bm-shadow-md": "0 1px 0 rgba(0,0,0,0.06), 0 18px 50px rgba(15, 15, 25, 0.10)",
        "--bm-shadow-glow": "0 18px 60px rgba(109,40,217,0.18), 0 10px 40px rgba(236,72,153,0.14), 0 8px 24px rgba(37,99,235,0.12)"
      },
      "radius": {
        "--bm-radius-card": "18px",
        "--bm-radius-pill": "999px",
        "--bm-radius-input": "14px"
      }
    },
    "shadcn_hsl_mapping": {
      "instruction": "Update /src/index.css :root HSL tokens to match BM light theme. Keep dark mode optional but not default.",
      "suggested": {
        "--background": "0 0% 100%",
        "--foreground": "240 20% 6%",
        "--card": "0 0% 100%",
        "--card-foreground": "240 20% 6%",
        "--muted": "240 20% 97%",
        "--muted-foreground": "240 6% 40%",
        "--border": "240 10% 88%",
        "--input": "240 10% 88%",
        "--ring": "240 10% 20%",
        "--primary": "240 20% 6%",
        "--primary-foreground": "0 0% 100%",
        "--secondary": "240 20% 97%",
        "--secondary-foreground": "240 20% 6%",
        "--accent": "240 20% 97%",
        "--accent-foreground": "240 20% 6%"
      }
    }
  },
  "layout_and_grid": {
    "container": {
      "max_width": "max-w-6xl",
      "padding": "px-4 sm:px-6",
      "section_spacing": "py-12 sm:py-16 lg:py-20",
      "rhythm_note": "Use 2–3x more spacing than feels comfortable; keep sections airy even with loud colors."
    },
    "page_patterns": {
      "home": "Z-pattern hero → social proof → packages → how it works → testimonials → FAQ → CTA footer",
      "purchase": "Stepper top → package grid → upgrades → payment → confirmation",
      "dashboard": "Lookup card → status/progress → promo card → settings",
      "admin": "Login card → table"
    }
  },
  "components": {
    "component_path": {
      "shadcn_ui": [
        "/app/frontend/src/components/ui/button.jsx",
        "/app/frontend/src/components/ui/badge.jsx",
        "/app/frontend/src/components/ui/card.jsx",
        "/app/frontend/src/components/ui/accordion.jsx",
        "/app/frontend/src/components/ui/navigation-menu.jsx",
        "/app/frontend/src/components/ui/sheet.jsx",
        "/app/frontend/src/components/ui/tabs.jsx",
        "/app/frontend/src/components/ui/switch.jsx",
        "/app/frontend/src/components/ui/radio-group.jsx",
        "/app/frontend/src/components/ui/progress.jsx",
        "/app/frontend/src/components/ui/table.jsx",
        "/app/frontend/src/components/ui/input.jsx",
        "/app/frontend/src/components/ui/textarea.jsx",
        "/app/frontend/src/components/ui/label.jsx",
        "/app/frontend/src/components/ui/sonner.jsx",
        "/app/frontend/src/components/ui/dialog.jsx",
        "/app/frontend/src/components/ui/tooltip.jsx",
        "/app/frontend/src/components/ui/carousel.jsx"
      ]
    },
    "global_component_rules": {
      "data_testid": "All buttons/links/inputs/toggles/steppers/progress/status chips must include data-testid in kebab-case.",
      "icons": "Use lucide-react icons only (no emoji icons).",
      "states": [
        "Hover: subtle lift (translateY -1px) + glow shadow",
        "Active: scale-95",
        "Focus: visible ring (ring-2 ring-black/30) + outline-none"
      ]
    },
    "nav_and_sale_banner": {
      "sale_banner": {
        "layout": "Sticky top banner above nav; contains '50% OFF SALE' + countdown + CTA",
        "classes": "sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-black/10",
        "inner": "max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-3",
        "countdown": "Use monospace numerals for timer: font-mono text-xs sm:text-sm",
        "cta": "Small pill gradient button",
        "micro_interaction": "Countdown digits animate on change (Framer Motion: y: -6→0, opacity 0→1)."
      },
      "nav": {
        "component": "navigation-menu + sheet (mobile)",
        "classes": "sticky top-[40px] z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-black/10",
        "logo": "BOOSTER MAG wordmark in Bebas Neue; add tiny gradient underline bar",
        "dropdown": "Services dropdown grouped by platform (Instagram/TikTok) and service (Followers/Likes/Views)."
      }
    },
    "hero": {
      "structure": [
        "Left: headline + subhead + CTA row + trust stars",
        "Right: glossy phone mock (simple card with gradient blobs + stats chips)"
      ],
      "background": {
        "rule": "Gradient overlay must be decorative and limited to top hero only (<20% viewport).",
        "implementation": "Absolute positioned blob divs with blur + opacity; base background stays white."
      },
      "cta_buttons": {
        "primary": {
          "component": "Button",
          "classes": "rounded-full px-6 py-6 text-base font-medium text-white shadow-[var(--bm-shadow-glow)] bg-[image:var(--bm-grad-cta)] hover:brightness-[1.03] focus-visible:ring-2 focus-visible:ring-black/30",
          "data_testid": "hero-start-growing-button"
        },
        "secondary": {
          "component": "Button variant=outline",
          "classes": "rounded-full border-black/15 bg-white hover:bg-black/[0.03]",
          "data_testid": "hero-view-packages-button"
        }
      },
      "trust_block": {
        "content": "5.0 rating • Trusted by 30,000 creators",
        "badge": "Use Badge with star icon (lucide Star)"
      }
    },
    "marquee": {
      "use_cases": [
        "Benefit marquee (fast delivery / real-looking / cancel anytime)",
        "Top client logo marquee"
      ],
      "implementation": {
        "css": "Create a .marquee class with keyframes translateX; duplicate content twice for seamless loop.",
        "motion": "Pause on hover; reduce motion for prefers-reduced-motion.",
        "data_testid": "logo-marquee"
      }
    },
    "package_pricing_cards": {
      "card_style": {
        "surface": "white card with glossy gradient border + subtle inner sheen",
        "classes": "relative overflow-hidden rounded-[var(--bm-radius-card)] bg-white shadow-[var(--bm-shadow-md)]",
        "border": "Use pseudo-element or wrapper div with p-[1px] bg-[image:var(--bm-grad-border)]",
        "sheen": "after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.9),transparent_45%)] after:opacity-60"
      },
      "badges": {
        "best_seller": "Badge: 'Best Seller' with flame icon",
        "most_popular": "Badge: 'Most Popular' with sparkles icon"
      },
      "price_presentation": {
        "rule": "Show strikethrough original + bold sale price + per-unit microcopy",
        "classes": "text-3xl font-semibold tracking-tight"
      },
      "cta": {
        "button": "Gradient primary button full width",
        "data_testid_pattern": "package-select-{platform}-{service}-{package-id}-button"
      }
    },
    "stepper_checkout": {
      "pattern": "3-step horizontal stepper on desktop; compact stacked stepper on mobile",
      "implementation": {
        "desktop": "Use flex items-center gap-2; each step is a pill with number + label",
        "active": "bg-black text-white",
        "complete": "bg-black/5 text-black border border-black/10 + check icon",
        "data_testid": "checkout-stepper"
      }
    },
    "toggles_and_tiers": {
      "quality_tier": {
        "component": "Tabs",
        "tabs": ["Active", "Premium", "VIP"],
        "data_testid": "quality-tier-tabs"
      },
      "delivery_speed": {
        "component": "RadioGroup",
        "options": ["Regular", "Fast", "Organic"],
        "data_testid": "delivery-speed-radio"
      },
      "upsells": {
        "component": "Switch",
        "pattern": "Each upsell is a Card row with title, microcopy, price chip, and Switch",
        "data_testid_pattern": "upsell-toggle-{upsell-id}"
      }
    },
    "forms_payment_demo": {
      "components": ["Input", "Label", "Textarea"],
      "credit_card": {
        "note": "Fake card form only; add helper text 'Demo only'.",
        "fields": ["Card number", "Expiry", "CVC", "Name", "Email"],
        "data_testid": {
          "card_number": "payment-card-number-input",
          "expiry": "payment-expiry-input",
          "cvc": "payment-cvc-input",
          "submit": "payment-submit-button"
        }
      }
    },
    "dashboard_progress": {
      "component": "Progress",
      "style": {
        "track": "bg-black/10",
        "indicator": "bg-[image:var(--bm-grad-cta)]",
        "glow": "shadow-[var(--bm-shadow-glow)]"
      },
      "delivered_count": {
        "pattern": "Big number + small label; animate count-up (requestAnimationFrame)"
      },
      "data_testid": {
        "progress": "order-progress-bar",
        "delivered": "order-delivered-count",
        "eta": "order-eta-text"
      }
    },
    "testimonials": {
      "component": "Carousel (embla)",
      "card": "Video-style card (AspectRatio) with play overlay; use static image placeholder",
      "note": "Testimonials must be fictional; use influencer-style names.",
      "data_testid": "testimonials-carousel"
    },
    "faq": {
      "component": "Accordion",
      "style": "Large tap targets; subtle hover background",
      "data_testid": "faq-accordion"
    },
    "floating_chat": {
      "pattern": "Bottom-right floating bubble; opens Dialog/Drawer",
      "classes": "fixed bottom-4 right-4 z-50",
      "micro_interaction": "Idle pulse (scale 1→1.04→1) every 4s; stop on hover",
      "data_testid": {
        "button": "support-chat-open-button",
        "panel": "support-chat-panel"
      }
    },
    "admin_table": {
      "component": "Table + Select",
      "status_chip": "Badge variants: pending (amber), processing (blue), delivered (lime), canceled (red)",
      "data_testid": "admin-orders-table"
    }
  },
  "motion_and_microinteractions": {
    "library": "framer-motion (already available)",
    "principles": [
      "Entrance: fade+slide up 12px for sections",
      "Hover: lift -1px + glow shadow on cards",
      "Buttons: press scale 0.97",
      "Marquee: continuous but pause on hover",
      "Respect prefers-reduced-motion"
    ],
    "snippets": {
      "section_reveal": "<motion.section initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true, amount:0.2}} transition={{duration:0.45, ease:[0.22,1,0.36,1]}} />",
      "button_press": "whileTap={{ scale: 0.97 }}"
    }
  },
  "accessibility": {
    "rules": [
      "Maintain readable contrast: never place paragraph text on gradients.",
      "All inputs must have labels (Label component).",
      "Focus-visible rings on all interactive elements.",
      "Large tap targets: min-h-[44px] for buttons/toggles.",
      "Provide aria-label for icon-only buttons (chat bubble, carousel arrows)."
    ]
  },
  "image_urls": {
    "hero_creator_photos": [
      {
        "url": "https://images.pexels.com/photos/7676405/pexels-photo-7676405.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "description": "Influencer streaming setup with neon signs (use as testimonial/hero side media).",
        "category": "home/hero"
      },
      {
        "url": "https://images.pexels.com/photos/7676486/pexels-photo-7676486.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "description": "Creator filming content with ring light (use in testimonials section).",
        "category": "home/testimonials"
      }
    ],
    "abstract_glossy_backgrounds": [
      {
        "url": "https://images.unsplash.com/photo-1636907312269-d1facecaf8a7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGFuYWx5dGljcyUyMGRhc2hib2FyZCUyMGFic3RyYWN0JTIwM2QlMjBzaGFwZXN8ZW58MHx8fGJsdWV8MTc4NzAwODE4N3ww&ixlib=rb-4.1.0&q=85",
        "description": "Abstract 3D shapes on blue/pink background (use as dashboard empty state illustration).",
        "category": "dashboard/empty-state"
      },
      {
        "url": "https://images.unsplash.com/photo-1633432695467-66403aa96bfd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGdsb3NzeSUyMGdyYWRpZW50JTIwYmxvYnMlMjAzZCUyMHJlbmRlcnxlbnwwfHx8cHVycGxlfDE3ODcwMDgxODh8MA&ixlib=rb-4.1.0&q=85",
        "description": "Glossy spheres on purple background (use as subtle section art in purchase pages).",
        "category": "purchase/side-art"
      }
    ]
  },
  "page_blueprints": {
    "home": {
      "sections": [
        "SaleBanner (countdown)",
        "StickyNav (services dropdown + mobile sheet)",
        "Hero (headline + CTA + trust stars + glossy mock)",
        "BenefitMarquee (scrolling)",
        "HowItWorks (3 numbered gradient steps)",
        "PackagesPreview (best seller + grid)",
        "VideoTestimonials (carousel)",
        "TopClientsLogoMarquee (dual row)",
        "FeatureColumns (3 columns)",
        "FAQAccordion",
        "BigCTASection",
        "Footer",
        "FloatingChat"
      ]
    },
    "purchase": {
      "sections": [
        "Stepper",
        "TierTabs + SpeedRadio",
        "PackageGrid (highlight best seller)",
        "Upsells (switch list)",
        "PaymentForm (demo)",
        "Confirmation (order number + next steps)"
      ]
    },
    "dashboard": {
      "sections": [
        "OrderLookup (email + order number)",
        "OrderStatusCard (status chip + progress + delivered count + ETA)",
        "PromoCard (leave review for free followers)",
        "SettingsCard (cancel renewal)"
      ]
    },
    "boost": {
      "sections": [
        "GiftHero (fun copy)",
        "UsernameInput",
        "PublicAccountWarning",
        "BoostResult (animated count-up)"
      ]
    },
    "admin": {
      "sections": [
        "AdminLogin",
        "OrdersTable (status update)"
      ]
    }
  },
  "libraries_and_setup": {
    "already_available": [
      "framer-motion",
      "embla-carousel-react (via shadcn carousel)",
      "lucide-react",
      "recharts",
      "sonner"
    ],
    "optional_additions": [
      {
        "name": "lottie-react",
        "why": "Use a small looping animation for Boost success / confetti without heavy video.",
        "install": "npm i lottie-react",
        "usage_note": "Provide fallback static SVG if prefers-reduced-motion."
      }
    ]
  },
  "instructions_to_main_agent": [
    "Remove CRA default centered App styles; do not use .App { text-align:center }.",
    "Implement BM tokens in index.css (CSS variables) and map shadcn HSL tokens to light theme.",
    "Keep gradients constrained: hero overlay blobs + CTA buttons + card borders only. No gradient behind paragraphs or tables.",
    "Use shadcn components from /src/components/ui only (Accordion, Tabs, Switch, RadioGroup, Progress, Table, Sheet, NavigationMenu, Sonner).",
    "Every interactive element must include data-testid (kebab-case).",
    "Use lucide-react icons for stars, badges, play button, chat icon.",
    "Use Framer Motion for section reveals, countdown digit flips, and subtle card hover lift. Respect prefers-reduced-motion.",
    "Testimonials must be fictional; avoid real brand names/logos unless using generic placeholders."
  ],
  "general_ui_ux_design_guidelines_appendix": "<General UI UX Design Guidelines>\n    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.\n</General UI UX Design Guidelines>"
}
