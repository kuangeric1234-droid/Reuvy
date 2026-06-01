# Ruevii — Feature inventory for the marketing site

_Authored 2026-06-02. Source of truth for the Features mega-menu and the feature-detail pages on the marketing site. Mirrors Pabau's Features-tab structure (Featured / Care / Scheduling / Management / Marketing) but adapted to Ruevii's real, AU/AHPRA-native product._

**Status legend:** ✅ shipped & solid · 🟡 partial/beta (market carefully or label "new"/"coming soon") · ⭐ Ruevii has it and Pabau/Decoda don't market it (lead with these).

---

## Mega-menu structure (6 tabs)

Pabau uses 5 tabs. Ruevii adds a **Conversations & AI** tab because that's our biggest edge over Pabau. Each tab = a left rail item that reveals a 2–3 column grid of `Icon · Name · one-line description`, plus a "Latest release" / "Spotlight" card on the right (copy Pabau's layout exactly — it's a good pattern).

1. **Featured** — top picks across all tabs + latest release
2. **Care** — clinical / EMR
3. **Scheduling** — calendar, booking, front-of-house
4. **Payments** — money in / POS / plans / memberships
5. **Management** — team, inventory, reporting, compliance
6. **Conversations & AI** ⭐ — messaging, calls, automations, Ruevii AI

---

## TAB 1 — Featured (curated top picks)

Pull the strongest items from other tabs. Lead with differentiators.

| Icon | Name | One-liner |
|---|---|---|
| Sparkles | **Ruevii AI** ⭐ | Ask your clinic anything — an AI command bar (Ctrl+K) that surfaces insights and runs actions |
| ShieldCheck | **AHPRA Compliance** ⭐ | Built-in compliance for Australian cosmetic & injectable clinics — not bolted on |
| Calendar | **Smart Calendar** | Appointments, staff, rooms & resources in one view |
| MessagesSquare | **Conversations** ⭐ | Two-way SMS, calls & email in one inbox — get paid in the thread |
| CreditCard | **Payments & POS** | Take payment online and in-clinic, with plans & memberships |
| Syringe | **Injectable Charting** ⭐ | Face-map injection plotting with dose, product & batch — the AU-injectables moat |

**Latest release card:** "Pay-in-thread — send a Stripe link in any conversation, money lands straight in POS". Tag `NEW`.

---

## TAB 2 — Care (clinical / EMR)

| Icon | Name | One-liner | Status |
|---|---|---|---|
| Users | **Clients (EMR)** | Centralised patient records, history, documents & wallet | ✅ |
| Syringe | **Injectable Charting** | Face & body injection mapping — dose, product, batch, depth, technique | ✅ ⭐ |
| FileText | **Forms & Charting** | Custom clinical forms, SOAP notes (10 AU templates) & e-signature | ✅ |
| Mic | **AI Scribe** | Record the consult → auto-drafted SOAP note for review | ✅ |
| Images | **Before & After Photos** | Albums, side-by-side, 2×2 & slider compare, guided capture | ✅ |
| Pill | **Prescriptions** | AHPRA-gated prescribing — dose, frequency, prescriber sign-off | ✅ |
| Video | **Consultations** | In-person & video consults (AHPRA-compliant; no async prescribing) | ✅ |
| LineChart | **Clinical Charts** | Longitudinal tracking — weight, BMI, blood pressure, erythema & more | ✅ |
| BookOpen | **Clinical Catalogs** | Per-clinic drugs, conditions, vaccines, education & lab codes | ✅ |
| Mail | **Clinical Letters** | AI-drafted GP & referral letters from the record | ✅ |
| Sparkle | **Skincare Plans** | Treatment recommendation templates & client skincare plans | ✅ |
| ClipboardCheck | **Consent Enforcement** | Block treatment until consent is signed — plaintiff-proof | ✅ ⭐ |

> **Do NOT list:** Labs (not built), insurance/claims (UK/US only). These are deliberate gaps.

---

## TAB 3 — Scheduling (booking & front-of-house)

| Icon | Name | One-liner | Status |
|---|---|---|---|
| Calendar | **Calendar** | Appointments, staff, rooms & resources with buffers | ✅ |
| MousePointerClick | **Online Booking** | Self-service 24/7 booking on a branded page | ✅ |
| Monitor | **Client Portal** | Patients book, pay, view history & complete forms | ✅ ⭐ |
| ListPlus | **Waitlist** | Auto-fill cancelled slots from the waitlist | ✅ |
| BellRing | **Reminders** | Automated SMS & email appointment reminders | ✅ |
| CalendarX | **No-show Protection** | Deposits, cancellation fees & AI no-show risk scoring | ✅ ⭐ |
| ClipboardCheck | **Check-In Hub** | One-screen front-desk arrival & queue flow | 🟡 |

---

## TAB 4 — Payments

| Icon | Name | One-liner | Status |
|---|---|---|---|
| CreditCard | **Payments & POS** | Online + in-clinic checkout via Stripe (card-on-file, terminal) | ✅ |
| CalendarClock | **Payment Plans** | Deposits + weekly/fortnightly/monthly instalments with auto-charge | ✅ |
| Repeat | **Memberships** | Recurring plans with automated billing & allowances | ✅ |
| Package | **Packages** | Prepaid treatment bundles & session redemption | ✅ |
| Gift | **Gift Cards** | Sell & redeem gift cards | ✅ ⭐ |
| FileSignature | **Quotes** | Build, send & e-sign treatment quotes; convert to sale | ✅ |
| Receipt | **Invoices** | Branded PDF invoices & receipts | ✅ |
| Percent | **Offers & Discounts** | Promo codes, vouchers & usage tracking | ✅ |
| Coins | **Commissions** | Per-practitioner commission tracking & reports | ✅ |
| Undo2 | **Refunds** | Stripe-integrated refunds with audit trail | ✅ |

---

## TAB 5 — Management

| Icon | Name | One-liner | Status |
|---|---|---|---|
| UsersRound | **Team Management** | Staff, roles, teams, permissions & calendar PIN lock | ✅ |
| Clock | **Timesheets** | Clock in/out, hours tracking & payroll CSV export | ✅ |
| CalendarRange | **Roster** | Week-grid shift planning (publish, overnight-aware) | ✅ |
| Boxes | **Inventory** | Stock with batch/lot/expiry & auto-deduction on treatment | ✅ |
| ShieldAlert | **S4 Register** | Controlled-substance dispensing register | ✅ ⭐ |
| Truck | **Purchase Orders** | Suppliers, POs, reorder, stock counts & wastage | ✅ |
| BarChart3 | **Reporting** | 10+ reports — revenue, staff, no-shows, inventory, commissions | ✅ |
| LayoutDashboard | **Dashboards** | Real-time owner & practitioner snapshots | ✅ |
| FileCheck | **Compliance & Audit** | Append-only audit log on every clinical & financial action | ✅ ⭐ |
| Palette | **Workspace Branding** | Per-clinic logo, colours & themed patient surfaces | ✅ |

---

## TAB 6 — Conversations & AI ⭐ (Ruevii's biggest edge over Pabau)

| Icon | Name | One-liner | Status |
|---|---|---|---|
| Sparkles | **Ruevii AI** | AI command bar (Ctrl+K) — ask, brief, recover, analyse across the clinic | ✅ ⭐ |
| MessagesSquare | **Unified Inbox** | Two-way SMS conversations with templates & merge fields | ✅ |
| Phone | **Calls** | In-app calling, recordings, transcripts & per-call AI summaries | 🟡 |
| Bot | **AI Receptionist** | AI answers missed calls & texts, books, sends links 24/7 | ✅ ⭐ |
| MessageCircleReply | **AI Instant Answers** | Auto-reply to common SMS questions, matched by AI | ✅ ⭐ |
| DollarSign | **Pay in Conversation** | Send a Stripe payment link in any thread — lands straight in POS | ✅ ⭐ |
| Workflow | **Automations** | Visual workflow builder with branching + AI assistant | ✅ |
| Megaphone | **Campaigns** | Targeted email & SMS campaigns with a template library | ✅ |
| TrendingUp | **Lead Management** | CRM pipeline with AI lead scoring & saved views | ✅ ⭐ |
| FormInput | **Capture Forms** | Turn website visitors into leads | ✅ |
| Star | **Reviews** | Collect, moderate & reply to patient reviews | ✅ |
| Heart | **Loyalty** | Reward & track repeat patients | ✅ |

> Email inbox is 🟡 OAuth-foundation only — market as "coming soon" or omit until the inbox UI ships.

---

## Positioning rules

1. **Lead with the moat:** AHPRA-native compliance, Australian-made / AU data residency (Sydney), AI-native (receptionist, scribe, instant-answers, Ruevii AI). Put these above the feature grid.
2. **Match Pabau's menu UX, not its brand.** Same left-rail + grid + spotlight-card layout. Apply Ruevii brand: serif headings (Awesome Serif), Apercu body, paper `#f9f9f7`, black CTAs, dusty-blue `#9bb7d1` used sparingly. NOT Pabau's blue.
3. **⭐ items are differentiators.** Give them visual weight.
4. **Be honest about 🟡 items.** Label "New"/"Beta"/"Coming soon" or omit. Don't claim Labs or insurance billing.
