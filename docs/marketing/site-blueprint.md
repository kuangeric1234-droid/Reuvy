# Ruevii marketing site — Decoda layout audit + build blueprint

_Authored 2026-06-02 from `C:\Users\kuang\decoda-screenshots` (38 captures). Pairs with [feature-inventory.md](feature-inventory.md) (what features exist) and [schema-reference.md](schema-reference.md) (real columns for mockups). Goal: replicate Decoda's **information architecture and section rhythm**, populated with **Ruevii's real features**, in **Ruevii's brand** (never Decoda's colours)._

---

## Part A — Decoda structural audit (what to copy: layout, not content)

### Global chrome (on every page)
- **Announcement bar** (very top, thin): one line + "Read more" link. _(Decoda: funding news. Ruevii: e.g. "Built for Australian clinics — AHPRA-compliant." or a product announcement.)_
- **Top nav:** logo left · centre links `Platform ▾ · Who We Serve ▾ · Resources ▾` · right `Sign in` + a pill **"Book a demo"** CTA.
- **Global closing band** (bottom of every page): full-width dark band, big headline + two CTAs. _(Decoda: "Decoda is building the future of elective care.")_
- **Footer:** dark, 4–5 columns of links (Platform / Who We Serve / Resources / Company / Legal) + logo + socials.

### Three mega-menus
1. **Platform** — wide panel, **4 labelled columns** (`CARE · REVENUE · CLINICAL · OPERATIONS`), each a stack of `Name + tiny description`. A demo/teaser card sits beneath or beside.
2. **Who We Serve** — **2 columns**: by vertical (Med Spa, Wellness, Weight Loss, IV, Longevity, Regenerative) and by size (Solo, Single Location, Multi-Location, Franchise).
3. **Resources** — single column: Blog, Help Center, Developers, Partnerships, Investors, Careers.

### Homepage section flow (top → bottom)
1. **Hero** — light top. Two-line headline with a **rotating last word** ("Built for IV therapy" / "med spa" / …). Subhead, two CTAs, and a **floating product-UI card** overlapping into the next section.
2. **Problem band** (dark) — "Your workflow is held together by duct tape." Stacked product/chat UI cards on one side.
3. **Evolution statement** (light) — "Your clinic evolves. Your EMR should too." Big statement + one wide screenshot.
4. **Platform grid** (dark) — "The platform that never leaves you stuck." 2-column grid of small feature UI cards.
5. **AI row** — small AI-feature cards.
6. **Social proof** — "The proof is in the practice." Photos / testimonials.
7. **Scale band** (light) — "Built to scale with you." Analytics/charts screenshot + bullets.
8. **Closing band** (dark) + **footer**.

> **Rhythm = alternating light (cream/paper) and dark sections**, each introduced by a small **eyebrow tag chip**, with a **two-tone headline** (line 1 strong, line 2 in a muted/accent tone) and a **real product-UI screenshot** per section.

### Product-detail page template (e.g. AI Front Desk)
1. Hero: eyebrow tag · two-tone headline · subhead · 2 CTAs.
2. Section header + **3 small feature cards** (icon · title · desc).
3. **2 highlighted feature blocks** (bordered cards, the headline capabilities).
4. **Row of 4 smaller feature cards** (supporting capabilities).
5. **Dark stats band** — 3 big numbers + a testimonial quote.
6. **"What you're paying now vs. what you could be"** — a comparison table of the point tools this replaces.
7. **Closing CTA card** ("Stop missing calls. Start closing patients.").
8. Global closing band + footer.

### "Who We Serve" page template (e.g. Med Spa)
1. Hero: two-tone headline ("You sell luxury. You run on duct tape.") · subhead · CTA · product card.
2. **"Where it breaks"** — 3–4 problem cards (light).
3. **Workflow screenshot band** (light) — "Same practice. Different Tuesday."
4. **Capability band** (dark) — segment-specific UI ("Every unit tracked. Every membership on autopilot.").
5. **Retention story** (dark) — narrative + **stat tiles** (e.g. 2+ hrs, 97%, $0, 3x).
6. Testimonial quote.
7. **Aspirational CTA band** ("Your backend should feel as premium as your treatment room.").
8. Global closing band + footer.

### Reusable components to build once (then reuse everywhere)
`AnnouncementBar` · `TopNav` + 3 `MegaMenu` panels · `Hero` (two-tone headline + product card) · `EyebrowTag` · `FeatureCard` (icon/title/desc) · `HighlightBlock` (bordered) · `StatBand` (big numbers) · `ComparisonTable` (tools-you-replace) · `Testimonial` · `ProblemCard` · `ClosingCTABand` · `Footer` · `ProductScreenshot` (a brand-styled UI mock frame).

---

## Part B — Map Decoda's pages to Ruevii's REAL features

### Platform mega-menu → Ruevii's 4 columns
Pull items from [feature-inventory.md](feature-inventory.md). Suggested columns (keep Decoda's column-count, Ruevii's content):

| CARE (clinical) | PAYMENTS | CONVERSATIONS & AI ⭐ | OPERATIONS |
|---|---|---|---|
| Clients (EMR) | Payments & POS | **Ruevii AI** | Calendar |
| Injectable Charting ⭐ | Payment Plans | Unified Inbox | Online Booking |
| Forms & Charting | Memberships | Calls | Client Portal ⭐ |
| AI Scribe | Packages | AI Receptionist ⭐ | Waitlist |
| Before & After Photos | Gift Cards ⭐ | AI Instant Answers ⭐ | Check-In |
| Prescriptions | Quotes | Pay in Conversation ⭐ | Inventory + S4 Register ⭐ |
| Consultations | Commissions | Automations · Campaigns | Team · Timesheets · Roster |
| Clinical Charts · Letters | Refunds | Lead Management ⭐ · Reviews · Loyalty | Reporting · Compliance & Audit ⭐ |

Add a **teaser card** in the mega-menu like Decoda's (theirs shows AI auto-replies) — Ruevii's should show the **Ruevii AI command bar** or an **AI instant-answer** thread.

### Who We Serve → AU-relevant segments only
**Keep / adapt (by clinic type):** Cosmetic & injectable clinics · Skin & laser clinics · Cosmetic nursing / dermal therapy.
**By size:** Solo injector · Single clinic · Multi-location group _(ties to specs/location-switcher.md)_.
**❌ DROP (US wellness verticals, not the AU aesthetics wedge):** Weight Loss, IV Therapy, Longevity, Regenerative, Franchise (keep franchise only if you want an aspirational page).

### Resources → trim
**Keep:** Blog · Help Center · Developers (you have a public REST API + webhooks). **Optional:** Partnerships. **❌ Drop:** Investors (Decoda is VC-raise-flexing; not your story — lead with "Australian-made" instead).

### ❌ DO NOT build these Decoda product pages (deliberate non-features)
- **Labs & Diagnostics** — not built; US/longevity-centric.
- **Good Faith Exams (GFE)** — US compliance concept; AHPRA-native consult is your equivalent.
- **Medications & ePrescribe (US transmission)** — you have an AHPRA-gated **Prescriptions** pad, not US e-prescribing; frame it as Prescriptions, don't claim ePrescribe.
- **Telephony as a standalone product** — fold into **Calls / Conversations** (you have Twilio voice + AI receptionist, but don't market a separate VoIP product).
- Anything tagged 🟡 in feature-inventory.md unless labelled "New/Beta".

### ⭐ Lead with what Decoda CAN'T claim (give these hero weight)
**AHPRA-native compliance · Australian-made + AU data residency (Sydney) · genuinely AI-native** (Ruevii AI, AI receptionist, AI scribe, instant answers). Plus ⭐ gift cards, loyalty, reviews, patient portal, lead CRM with AI scoring, S4 register, pay-in-thread.

---

## Part C — Brand translation (Decoda rhythm, Ruevii palette)

| Decoda uses | Ruevii uses instead |
|---|---|
| Cream + dark forest-green sections | **Paper `#f9f9f7`** (light) alternating with **near-black `#0f0f0e`** (dark) |
| Warm orange accent | **Dusty blue `#9bb7d1`** — sparingly; semantic tones (sage/rose/beige) for stat/status accents |
| Two-tone headline (line 2 muted/orange) | Line 1 black `#000`, **line 2 charcoal `#4d4d4c`** (or dusty-blue for one hero word) |
| Their sans display font | **Awesome Serif** headings · **Apercu** body · Geist Mono for data/metrics |
| Pill CTA in cream | **Solid black** primary CTA (white text); greige/outline secondary |
| Rounded heavy cards w/ soft shadows | Small radius (~6px), **warm-grey borders** over heavy shadows; flat/editorial |

Keep Decoda's **structure, density, and section rhythm**; swap every colour, font, and the orange accent.

---

## Part D — Page priority (ship order)

**Tier 1 (build first):** Home · Platform mega-menu · Product-detail template (→ generates all feature pages from `features.ts`) · Pricing · AHPRA/Compliance · Book a demo.
**Tier 2:** "Who We Serve" template (AU segments) · Resources/Blog · About (Australian-made) · Integrations.
**Tier 3:** Developers/API docs · individual blog posts.

The Product-detail **template** is the big lever: design it once (per the §A template), drive it from the `features.ts` catalog, and every feature page renders from data — exactly how Decoda templates its ~21 product pages.
