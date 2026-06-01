# Handoff: Ruevii Marketing Homepage

## Overview
This is the public marketing homepage for **Ruevii** — an all-in-one, multi-tenant practice-management SaaS for medical aesthetics & cosmetic clinics in Australia, positioned as "the operating system for a modern aesthetics clinic" with AHPRA compliance baked in. The page's job is to communicate the product's feature breadth, establish trust/compliance credibility, and drive demo bookings.

Positioning to preserve in the build: **premium, calm, clinical, trustworthy, editorial.** NOT a loud gradient-heavy startup; NOT generic medical-blue SaaS.

---

## About the Design Files
The files in this bundle (`Ruevii Homepage.html`, `assets/styles.css`, `assets/app.js`) are a **design reference created in HTML/CSS/JS** — a working prototype that demonstrates the intended look, layout, and behavior. They are **not production code to copy verbatim.**

Your task is to **recreate this design in the target codebase's existing environment**, using its established patterns, component library, and conventions:
- If the project already uses a framework (React/Next, Vue/Nuxt, Astro, SvelteKit, etc.), build it there using existing components, the existing CSS solution (Tailwind / CSS Modules / styled-components / vanilla), and the existing routing.
- If there is no codebase yet, choose the most appropriate framework for a marketing site (Next.js or Astro are both strong choices) and implement there.
- The "product UI" shown in the hero, feature blocks, compliance band, and AI section are **stylized mockups built in HTML/CSS** to represent real product screenshots. In production these can stay as CSS mockups OR be replaced with real product screenshots — see "Assets" below.

## Fidelity
**High-fidelity (hifi).** Final colors, typography intent, spacing, layout, copy, and interactions are all specified. Recreate the UI faithfully using the codebase's libraries. Exact hex values, type roles, spacing, radii, and the full copy deck are documented below — match them.

---

## Design Tokens

### Color palette (monochrome + warm neutrals)
| Token | Hex | Usage |
|---|---|---|
| `--paper` | `#f9f9f7` | Page background (warm off-white) |
| `--black` | `#000000` | Primary — all primary CTAs, headings, key text |
| `--ink` | `#0f0f0e` | Near-black surfaces (AI section, final CTA, footer) |
| `--charcoal` | `#4d4d4c` | Secondary / body text |
| `--greige` | `#e5e3de` | Borders, muted surfaces, secondary-button outline |
| `--greige-2` | `#efedea` | Lighter muted fill (placeholder textures) |
| `--white` | `#ffffff` | Cards / overlays |
| `--blue` | `#9bb7d1` | Dusty-blue ACCENT — used sparingly (clinical/data accents, one calendar block type, quote mark) |
| `--blue-ink` | `#5b7790` | Darker readable variant of the accent — used for accent **text** (header emphasis, eyebrow markers, links, feature tags) so it stays legible on paper |

**Accent discipline:** the dusty blue is deliberately rare. It appears as: the italic emphasis word in every section header (`--blue-ink`), eyebrow tick marks, feature checklist bullets, feature-link arrows, stat units, the testimonial quote mark (`--blue`), the "AHPRA-compliant" emphasis, S4/clinical badges, one calendar block variant, the AI command star, and hover states. Do **not** flood the page with it.

### Typography
Three roles. **The user has their licensed fonts in their codebase — use those font families; the names below are the brand intent and the fallbacks used in the prototype.**

| Role | Brand font | Prototype fallback | Used for |
|---|---|---|---|
| Display / serif | **"Awesome Serif"** (elegant serif) | `Newsreader`, Georgia | Hero headline, all section headlines, big stat numbers, testimonial quote |
| Body / UI | **"Apercu"** (clean grotesque sans) | Helvetica Neue / system-ui | Body copy, nav, buttons, UI labels, lists |
| Mono | **"Geist Mono"** | Geist Mono | Data, metrics, timestamps, eyebrows, kbd hints, SKUs, dates |

Type treatment specifics:
- Headings: serif, weight **400**, `letter-spacing: -0.01em` (hero `-0.025em`), `line-height: 1.08`, `text-wrap: pretty`.
- **Signature device:** every section header emphasizes **one standout phrase** wrapped in an italic serif `<em>` colored `--blue-ink` (on light) / `--blue` (on dark). Preserve this — it's the page's through-line. (Hero: "aesthetics clinic"; Features intro: "in one place"; the four feature blocks: "clinical picture" / "fills itself" / "modern clinics" / "every unit"; Compliance: "regulators expect"; AI: "anything"; Integrations: "already uses"; Final CTA: "your".)
- Eyebrows: mono, 12px, `letter-spacing: 0.14em`, uppercase, charcoal, preceded by an 18px blue-ink tick rule.
- Body base: 17px, line-height 1.6.

### Shape, spacing & elevation
- **Border radius:** `--radius: 6px` (0.375rem) for buttons/inputs/small cards; `--radius-lg: 10px` for large cards/app mockups. Small radii throughout — this is a low-radius brand.
- **Borders over shadows:** default border is `1px solid var(--greige)`. Use subtle warm-grey borders to separate surfaces rather than heavy shadows.
- **Shadows** (used sparingly, very soft): app mock `0 1px 0 rgba(0,0,0,.02), 0 24px 60px -32px rgba(20,20,18,.22)`; cards `0 20px 50px -36px rgba(20,20,18,.28)`.
- **Layout container:** max-width `1200px`, side gutter `40px` (desktop) → `22px` (mobile ≤720px).
- **Section vertical rhythm:** `.section` = 110px top/bottom; `.section-sm` = 64px; feature rows = 78px; hero = 84px top / 72px bottom. Mobile sections reduce to 72px.

### Dark surfaces
`--ink` (#0f0f0e) background with `#f4f3ef`/`#fafaf8` text, `#b9b6ad` muted text, `#2c2c29` hairline borders. Used for: Ruevii AI section, final CTA band, footer. The page is **light-first**; a full dark mode is a future enhancement, not required for v1.

---

## Page Structure (top → bottom)

The homepage mirrors a feature-rich practice-management narrative arc. 11 sections:

### 1. Nav bar (`<header class="nav">`)
- Sticky, top:0, z-index 50. Background is translucent paper with `backdrop-filter: blur(12px)`. On scroll past 8px, a `.scrolled` class adds a greige bottom border (JS-toggled).
- Height 68px. Left→right: **logo** ("Ruevii" in serif 25px + a 22px black rounded-square mark with a paper dot), **center nav links** (Product▾, Features, Compliance, Pricing — 15px charcoal, hover→black), then pushed right: **"Log in"** text link + **"Book a demo"** primary black button.
- Mobile ≤720px: nav links + login hide; a "Menu" secondary button appears (toggle is presentational in the prototype — wire to a real mobile menu in production).

### 2. Hero (`.hero`) — centered
- Trust pill (white, 100px radius, greige border): 3 overlapping avatar circles + "Trusted by **340+ Australian clinics**". A small `--blue` dot accent.
- **H1**, serif, `clamp(40px, 6vw, 78px)`, max-width 16ch, centered: "The operating system for your *aesthetics clinic*" (last two words italic, `--blue-ink`).
- Subhead `.sub`: 20px charcoal, max-width 52ch — "Ruevii brings clinical records, AHPRA-compliant consults, bookings, payments and inventory into one calm, beautiful workspace — built natively for Australian injectable & cosmetic clinics."
- **CTAs** (flex, gap 12px): primary black "Book a demo →" + secondary outline "Take a product tour". Mobile: stack full-width.
- Meta row: ★★★★★ + "**4.9** from clinic owners · AHPRA-aligned by design".
- **Hero product mock** (`.app`): a full clinic dashboard mockup (see "Product mockups" below), with a soft radial dusty-blue glow behind its base.

### 3. Trust strip (`.trust`)
- Full-width band, paper bg, greige top+bottom borders, 30px padding.
- Left: claim text "Built for Australian clinics. **AHPRA-compliant** consultations and S4 records, baked in." (the bold is `--blue-ink`).
- Right (pushed via margin-left:auto): row of 5 placeholder clinic wordmarks in muted greige (`#b4b1a8`) — mix of serif and bold-sans treatments. **Replace with real client logos** in production (greyscale/muted is the intended treatment).

### 4. Feature blocks (`#features`)
- Intro `.feat-head`: eyebrow "ONE PLATFORM", H2 "Everything your clinic runs on, finally *in one place*", lead paragraph.
- **Four alternating image/text rows** (`.feature`, every other one `.flip` to swap column order). Grid `1fr 1.15fr`, gap 72px. Each row: greige top border, 78px padding.
  - Each `.f-copy` block contains: a mono uppercase **tagline** in `--blue-ink`, an H3 (with italic blue emphasis word), a paragraph, a **checklist** (`.f-list`, custom blue-ink circular "+" bullet markers), and an arrow text-link in `--blue-ink`.
  - Each `.f-visual` contains a stylized product mock card (see below).
- The four pillars, in order:
  1. **Clients & clinical records** — H3 "A complete *clinical picture* for every patient". Bullets: Patient CRM with full treatment history and recall · Before/after photo sets with consent capture · Digital consent forms & e-signatures stored to the record · Structured clinical notes and prescribing. Visual: **client profile card**.
  2. **Scheduling & online booking** (flipped) — H3 "A calendar that *fills itself* — and protects your time". Bullets: Branded online booking page per clinic and per injector · Automated reminders & confirmations over SMS + email · Waitlist that backfills cancellations automatically · No-show tracking with deposit and rebooking rules. Visual: **week calendar**.
  3. **Payments & POS** — H3 "Get paid the way *modern clinics* do". Bullets: In-clinic POS with deposits, quotes and tips · Memberships & packages with recurring auto-billing · Payment plans and pay-over-time at checkout · Automatic staff commission tracking. Visual: **POS checkout card**.
  4. **Inventory & supply chain** (flipped) — H3 "Never run out — and account for *every unit*". Bullets: Real-time stock with low-stock reorder alerts · S4 controlled-drug register tied to each treatment · Purchase orders & supplier management · Wastage and batch/expiry tracking. Visual: **inventory table**.

### 5. AHPRA compliance band (`#compliance`, `.compliance`)
- Paper bg, greige top+bottom borders. Grid `1fr 1fr`, gap 72px.
- Left: eyebrow "AHPRA COMPLIANCE" (blue-ink tick), H2 "Compliance that works the way *regulators expect*", paragraph, then **4 numbered points** (`.cpoint`, mono numbers 01–04 in `--blue-ink`, hairline separators): Mandatory clinical gating · In-person & video consultations · S4 drug register · Immutable audit trail (full copy in HTML).
- Right: an **audit-trail card** — header with a blue "shield" glyph + "Audit trail" title + a blue "Tamper-evident" badge; 4 timestamped log rows (mono time · action · actor); footer note "🔒 Records locked on sign-off · changes are versioned, never overwritten".
- Tone: reassuring, authoritative. This is the key differentiator — keep it prominent.

### 6. Ruevii AI spotlight (`#ai`, `.dark.ai`) — DARK
- `--ink` background. Centered head: eyebrow "RUEVII AI", H2 "Ask your clinic *anything*. Then let it act." (emphasis in `--blue`), paragraph.
- A **command-palette mockup** (`.cmd-mock`, max-width 620px, dark #181816): an input row with a blue star icon, a typed query "Which injectors are below target this month?" + blinking blue caret + "⌘K" kbd; an "Answer" section; a "Suggested actions" list (one highlighted `.hot` row). This is a static visual representing the live ⌘K bar.
- Footer line: "Try it anywhere in Ruevii — press ⌘ K to open the command bar."

### 7. Stats / outcomes band (`.stats`)
- Paper bg, greige bottom border, `.section-sm`. 4-column grid divided by left borders.
- Each stat: huge serif number with a mono/serif unit in `--blue-ink`, + a charcoal label. Values (PLACEHOLDER — see note): **11 hrs** admin saved/week per practitioner · **38%** fewer no-shows · **24%** more rebookings · **340+** Australian clinics.
- Disclaimer note in mono: "// Indicative figures from early Ruevii clinics. Your results will vary."

### 8. Testimonial (`.quote-wrap`)
- Centered, max-width 880px. Large `--blue` serif quote mark, then a serif blockquote `clamp(26px,3.4vw,40px)` with an italic emphasis on "*Australian*", then attribution: avatar + "Dr. Hannah Lane" / "Founder · Lumière Aesthetics, Melbourne" (mono role).
- PLACEHOLDER quote + person — replace with a real, sourced testimonial.

### 9. Integrations strip (`.integ`, `.section-sm`)
- Paper bg, greige top border. Grid `1fr 2fr`, gap 60px.
- Left: H3 "Works with the tools your clinic *already uses*" + paragraph "Connect payments, inbox and accounting in a few clicks. Two-way sync, no exports."
- Right: 3-col grid of 6 `.itile` tiles (border, 6px radius, hover lifts 2px + blue border): **Stripe, Tyro, Xero, Gmail, Microsoft 365, Twilio SMS**. Each tile has a placeholder mono-letter logo square — **replace with real brand logos** in production.

### 10. Final CTA band (`#pricing`, `.dark.final`)
- `--ink` background, centered, 130px padding. H2 `clamp(38px,5.5vw,72px)` "See Ruevii in *your* clinic" (emphasis `--blue`), paragraph, two CTAs (white primary "Book a demo →" + outline-on-dark "View pricing"), meta line "No lock-in contracts · Australian data residency · onboarding included".
- Note: the brief mentioned a "pricing teaser." This band currently serves as the final CTA; a real pricing-tier section can be added before it if desired (flagged as a future option).

### 11. Footer (`.footer`)
- `--ink` background. Top grid: `1.6fr` brand column (logo + tagline) + four link columns: **Product** (Clinical records, Scheduling, Payments & POS, Inventory, Ruevii AI) · **Solutions** (Injectable clinics, Cosmetic & skin, Multi-site groups, Nurses & injectors) · **Company** (About, AHPRA compliance, Pricing, Contact) · **Legal** (Privacy, Terms, Security, Data residency).
- Bottom bar (hairline top): "© 2026 Ruevii Pty Ltd · ABN 00 000 000 000" · **Australian-made note** "🇦🇺-style flag chip + Designed & hosted in Australia" · legal links (Privacy, Terms, Status).
- ABN is a PLACEHOLDER — insert the real ABN.

---

## Product mockups (the in-brand "screenshots")
All product UI is built from styled HTML/CSS so it inherits the brand. Reusable pieces:

- **App shell** (`.app`): white card, 10px radius, soft shadow. Top `.app-bar` (46px, paper bg) with traffic-light dots, a search field showing "Search clients, treatments, invoices…" + a "⌘K" kbd chip, and a blue avatar. Body is a `196px` sidebar + main grid. Sidebar items have an icon square + label; the active item is solid black with white text. Sidebar groups under a mono "OPERATIONS" label.
- **Dashboard main** (hero): greeting H4 + mono date, a 3-up stat-card row (mono values, blue-ink deltas), then a `.mock-sched` list of appointment rows — each row has a colored left border (greige default, `--blue` for consults, `--charcoal` for treatments), mono time, name + treatment, and a mono pill tag (Consult/Treatment/Telehealth).
- **Client profile card** (`.client-card`): photo square + name + mono meta line + a green-dot "Consent current" badge; a 2-up before/after photo placeholder row (striped diagonal texture + mono caption); a treatment timeline.
- **Week calendar** (`.cal`): month label + mini nav arrows; a CSS grid (time gutter + 4 day columns) with `.cblock` appointment blocks (white, colored left border; `.b` variant uses `--blue`); a mono status footer.
- **POS checkout** (`.pos`): line items with mono amounts, a bold total row with a 1.5px black top border, two action buttons (primary "Charge card" + secondary "Payment plan"), and a recurring-membership note.
- **Inventory table** (`.inv`): mono column headers, product name + mono SKU, mono on-hand counts, and status pills — `.s4` (blue, "S4 register"), `.low` (amber, "Reorder"), `.ok` (green, "In stock").
- **Audit-trail card** and **AI command palette** as described in sections 5 and 6.

In production you may keep these as CSS mockups (they're brand-accurate and lightweight) or swap in real product screenshots once available.

---

## Interactions & Behavior (`assets/app.js`)

1. **Sticky-nav scroll state:** on `scroll`, if `window.scrollY > 8`, add `.scrolled` to the nav (adds bottom border + slightly more opaque bg). Passive listener.

2. **⌘K / Ctrl+K command palette** (the Ruevii AI differentiator — a real, working overlay):
   - Global keydown: `(metaKey || ctrlKey) && key === 'k'` toggles the palette open/closed; `preventDefault`.
   - The hero search field (`#heroSearch`) also opens it on click.
   - Overlay (`.cmdk`): dimmed `rgba(15,15,14,.4)` backdrop with blur; centered dark panel at 14vh, fades/slides in via `.open` class.
   - Input filters a static list of commands grouped into sections: **Ask Ruevii AI**, **Navigate**, **Actions** (full list in `app.js`). Live substring filter on input.
   - Keyboard nav: ↑/↓ moves the `.sel` highlight (clamped), Enter closes, Esc closes. Mouse hover sets selection; click closes. Empty-state message when no matches.
   - In production, wire these commands to real routes/actions; the prototype just closes on selection.

   **State needed:** `isOpen` (bool), `query` (string), `selectedIndex` (int), `filteredItems` (array). Trivial to model with `useState` in React.

3. **Hover/transition states:** buttons translate 1px down on `:active` and shift their arrow 3px on hover; integration tiles lift 2px and gain a blue border on hover; nav links and footer links transition color. Smooth scroll via `html { scroll-behavior: smooth }` and in-page `#` anchors (nav → sections).

---

## Responsive behavior
- **≤1000px:** feature rows, compliance grid, and integrations grid collapse to single column (flipped rows reorder so copy leads); stats become 2-col; footer becomes 2-col; app sidebar still shown.
- **≤720px:** gutter 22px; sections 72px; nav links/login hidden + "Menu" shown; hero CTAs stack full-width; app mock sidebar hidden + stat row stacks; stats single-column; footer single-column.

---

## Content / copy notes
- All copy in the prototype is **real and final-quality** (not lorem) and reflects AU/AHPRA positioning — reuse it. Tone: confident, concrete, clinician-facing, not hypey.
- **Placeholders to replace before launch:** clinic logos (trust strip + integrations), stat figures (flagged as indicative), the testimonial quote + attribution, the ABN, and the Australian-flag chip (use a proper flag asset/icon).

---

## Assets
- **No external image assets** are used — all imagery is CSS (striped diagonal placeholders for photos, geometric logo marks, CSS shapes for the shield/flag/avatars). Replace photo placeholders (before/after, client avatar, testimonial avatar) and brand logos with real assets in production.
- **Fonts:** the prototype loads Newsreader + Geist Mono from Google Fonts as stand-ins. **Use your licensed Awesome Serif + Apercu + Geist Mono in the build** — the type roles and sizes above map directly onto them. (A metric-matched `@font-face` fallback for the serif exists in the prototype only to prevent layout shift during font load; you can drop it once your real fonts are self-hosted, or keep an equivalent fallback to avoid FOUT reflow.)
- **Icons:** the prototype uses CSS shapes and one inline SVG (the AI star). Swap in your icon library (Lucide, Phosphor, etc.) for sidebar/nav/feature icons in production.

---

## Files in this bundle
- `Ruevii Homepage.html` — full page markup, all sections in order, semantic and well-commented.
- `assets/styles.css` — complete stylesheet; all design tokens are CSS custom properties in `:root` at the top. Section-by-section, commented.
- `assets/app.js` — sticky-nav state + the ⌘K command palette logic.

Open `Ruevii Homepage.html` in a browser to see the living reference (press ⌘K / Ctrl+K to try the command bar).
