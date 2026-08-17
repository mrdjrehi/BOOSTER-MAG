# plan.md — BOOSTER MAG (RizzUp-style clone)

## 1) Objectives
- Rebuild rizzup.net UX end-to-end as **BOOSTER MAG** (new branding, fictional testimonials).
- Deliver a working full-stack MVP: marketing pages + service pages + multi-step checkout + order tracking dashboard + free boost + admin.
- **Simulated payments** only: fake card form, persist orders to MongoDB, show confirmation + order number.
- **Simulated fulfillment**: order progress/delivered count ramps over time; status transitions pending → processing → growing → completed.
- Admin: simple password login to view/update all orders.

## 2) Implementation Steps

### Phase 1 — Build V1 directly (no POC needed)
**User stories (UX-first)**
1. As a visitor, I can land on a bold gradient homepage and immediately understand what BOOSTER MAG does and click a primary CTA.
2. As a buyer, I can choose a service (IG/TikTok; followers/likes/views), select a package/tier/delivery, and see my total update instantly.
3. As a buyer, I can add upgrades (instant delivery, targeting, engagement pack) and see an order summary before paying.
4. As a buyer, I can “pay” with a fake card form and receive an order number + next steps.
5. As a customer, I can look up my order by email/order number and see status + progress + delivered count.

**Design (design_agent first)**
- Generate BOOSTER MAG design system: gradients, typography, buttons, cards, stepper, marquee, testimonial carousel, FAQ accordion.
- Produce reusable components in shadcn/ui + Tailwind tokens.

**Backend (FastAPI + MongoDB)**
- Models
  - `Order`: order_number, service, platform, package_qty, base_price, upgrades[], quality_tier (Active/Premium/VIP), delivery_speed (Regular/Fast/Organic), username, email, total, status, progress_pct, delivered_count, created_at, updated_at.
  - `ContactMessage`: name, email, message, created_at.
  - `AdminSession`: simple JWT/token.
- Seed pricing
  - Followers tiers (reuse): 80/500/1200/2500/6500/14000/25000 with 50% strikethrough display values.
  - Likes/views tiers: add sensible tier sets for IG/TikTok.
  - Upgrades: Instant +0.99, Female +1.49, Country +1.49, Bonus Likes +1.49, Bonus Views +0.99, Engagement Pack +1.99.
  - Subscriptions (display + optional “place order” as recurring_type=monthly): Premium $19/mo, Elite $49/mo.
- Core endpoints
  - `GET /api/packages?platform=&service=` (returns tiers + subscriptions + upgrades)
  - `POST /api/orders` (create order; returns order_number)
  - `GET /api/orders/lookup?email=...` and/or `?order_number=...`
  - `POST /api/boost` (free boost submission; returns guidance/result)
  - `POST /api/contact`
  - `POST /api/admin/login` (password → token)
  - `GET /api/admin/orders` (token)
  - `PATCH /api/admin/orders/{id}` (status override, notes)
- Simulated growth logic
  - Compute `progress_pct` + `delivered_count` from `now - created_at` (service-specific duration), with deterministic ramp.
  - Derive status by progress thresholds; allow admin override.

**Frontend (React + Router + shadcn/ui + Tailwind)**
- Routes/pages
  - `/` Home (hero, trust, marquee, how-it-works, video section, logos, testimonials, features, FAQ, CTA footer)
  - `/purchase/:platform/:service` service pages for IG/TikTok (followers/likes/views)
  - `/dashboard` order lookup + status/progress
  - `/boost` free boost flow
  - `/faq`, `/contact`, `/tos`
  - `/admin` (login) + `/admin/orders`
- Checkout flow (service pages)
  - Step 1: package + tier + delivery speed selection
  - Step 2: upgrades + order-bump modals (upgrade offers)
  - Step 3: fake card form → success screen with order number + “View in Dashboard”
  - Shared: stepper UI, countdown sale banner timer, sticky order summary
- Dashboard
  - Lookup by email or order number; show list or single order detail.
  - Progress bar, delivered count, ETA copy, “Cancel renewal” UI (simulated flag).
- Boost
  - Username entry; “account public” warning; simulated boost result; CTA to packages.
- Admin
  - Password login; orders table; inline status update.

**Phase 1 testing (testing_agent_v3)**
- E2E: package fetch → checkout → order created → dashboard lookup shows progress.
- Admin: login → list orders → update status reflects in dashboard.

### Phase 2 — Polish + completeness
**User stories**
1. As a visitor, I can browse all services from the nav dropdowns and land on the correct purchase page.
2. As a buyer, I see consistent pricing, strikethrough “50% off”, and upsell flows without broken states.
3. As a customer, I can track multiple orders under one email.
4. As an admin, I can filter/sort orders by status/service/date.
5. As a user, I can submit the contact form and see a confirmation state.

- Content completeness
  - Add IG Likes/Views and TikTok Likes/Views pages (same checkout engine, different tier data).
  - Add TOS + FAQ page copy; replace any RizzUp references with BOOSTER MAG.
- UX improvements
  - Empty/loading/error states everywhere.
  - Persist step state in URL/query/localStorage.
  - Basic anti-spam for contact (rate limit/light honeypot).
- Testing (testing_agent_v3)
  - Full route crawl; verify forms, navigation, and order flows across all services.

### Phase 3 — Hardening + maintainability
**User stories**
1. As an admin, I can manually set delivered_count/progress for edge cases.
2. As an admin, I can add an internal note to an order.
3. As a customer, I see clearer ETAs and status explanations per service.
4. As a user, I can export my order receipt details.
5. As the business, I can update pricing tiers without code changes.

- Admin enhancements
  - Add order detail view; editable progress/delivered_count; internal notes.
- Config/data
  - Move pricing/upgrades to a Mongo collection + simple admin edit (optional).
- Testing (testing_agent_v3)
  - Regression suite on checkout + dashboard + admin.

## 3) Next Actions
1. Run **design_agent** to produce BOOSTER MAG look & component specs.
2. Implement backend + frontend in minimal bulk writes (shared pricing config, shared checkout engine).
3. Run testing_agent_v3; fix blocking issues.
4. Fill remaining service pages + content; run testing again.

## 4) Success Criteria
- All required pages/routes exist and match the RizzUp-style UX with BOOSTER MAG branding.
- Checkout creates an order in MongoDB and returns a unique order number (no real payments).
- Dashboard reliably finds orders by email/order number and shows simulated progress + delivered count.
- Boost flow works end-to-end and routes users to relevant packages.
- Admin login works; admin can view all orders and update statuses.
- testing_agent_v3 passes E2E flows with no broken navigation or critical UI errors.
