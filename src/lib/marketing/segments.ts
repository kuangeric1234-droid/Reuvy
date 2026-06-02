// Audience segment catalog for "Who We Serve" — AU-only.
// Source of truth: docs/marketing/site-blueprint.md Part B.
//
// Six segments split across two groups (clinic-type x size). Each segment
// drives an 8-section detail page rendered from this data.

import type { LucideIcon } from "lucide-react";
import {
  Syringe,
  Scan,
  HeartPulse,
  User,
  Building,
  Building2,
} from "lucide-react";

export type SegmentGroup = "clinic-type" | "size";

export type Segment = {
  /** kebab-case unique slug — drives the route /who-we-serve/[slug] */
  slug: string;
  /** display name */
  name: string;
  /** group key — drives the index page columns and mega-menu tabs */
  group: SegmentGroup;
  /** lucide icon */
  icon: LucideIcon;
  /** hero line 1 — bold black */
  hookPrimary: string;
  /** hero line 2 — muted charcoal */
  hookSecondary: string;
  /** hero subhead */
  subhead: string;
  /** 3-4 problem cards for "Where it breaks" */
  whereItBreaks: { title: string; body: string }[];
  /** dark capability band headline */
  capabilityHeading: { primary: string; secondary: string };
  /** 3-5 capability bullets shown on the dark band */
  capabilityBullets: string[];
  /** 4 retention stats for the dark stat band */
  stats: { value: string; label: string }[];
  /** AU testimonial */
  testimonial: { body: string; name: string; role: string };
  /** aspirational CTA band headline */
  aspirational: { primary: string; secondary: string };
  /** 4 related feature slugs (must exist in features.ts) */
  relatedFeatureSlugs: string[];
};

/* -------------------------------------------------------------------------- */
/*  Segments                                                                   */
/* -------------------------------------------------------------------------- */

export const SEGMENTS: Segment[] = [
  /* ====================== CLINIC TYPE ====================== */
  {
    slug: "cosmetic-injectables",
    name: "Cosmetic & injectable clinics",
    group: "clinic-type",
    icon: Syringe,
    hookPrimary: "You bill in units.",
    hookSecondary: "But you run on duct tape.",
    subhead:
      "Anti-wrinkle and dermal filler clinics deserve a system that tracks every unit, every batch, every consent — without a binder, a spreadsheet and a paper register stitched together.",
    whereItBreaks: [
      {
        title: "S4 register lives in a paperback",
        body: "Every botulinum vial logged in a notebook by the cabinet. One missed entry and your next AHPRA review is a fortnight of reconciliation.",
      },
      {
        title: "Consent forms scanned to a Dropbox",
        body: "PDF in one folder, photo in another, chart in the EMR. When the cooling-off complaint lands, no one can find what was signed.",
      },
      {
        title: "Charts drawn on a printed face map",
        body: "Injector sketches on paper, scans at end-of-day, re-types into the EMR. The dose, batch and technique never make it to the longitudinal record.",
      },
      {
        title: "Deposits chased over SMS",
        body: "Quoted in clinic, deposit invoice sent from accounting, paid via bank transfer — three apps for one cosmetic booking.",
      },
    ],
    capabilityHeading: {
      primary: "Every unit tracked.",
      secondary: "Every consent on file.",
    },
    capabilityBullets: [
      "Face-map injection plotting with dose, product, batch, depth and technique on every shot",
      "S4 dispensing register auto-written from the chart — no double entry, prescriber-signed",
      "Consent forms gated to the appointment — treatment can't start until the patient signs",
      "Cooling-off windows enforced for cosmetic procedures, baked into the booking flow",
      "Before-and-after photos attached to the same appointment as the chart and consent",
    ],
    stats: [
      { value: "8h", label: "Saved per injector, per week" },
      { value: "100%", label: "Consent-on-record at treatment start" },
      { value: "S4", label: "Register kept in-app · auto-signed" },
      { value: "AU", label: "Data residency · Sydney" },
    ],
    testimonial: {
      body: "We dropped the S4 paperback the week we switched. Every vial, every consent, every photo lives on the same client record — and an AHPRA review would be an afternoon, not a fortnight.",
      name: "Nurse Holly Tran",
      role: "Lead injector, Lumen Cosmetic — Melbourne",
    },
    aspirational: {
      primary: "Your treatment room is clinical.",
      secondary: "Your backend should be too.",
    },
    relatedFeatureSlugs: [
      "injectable-charting",
      "ahpra-compliance",
      "s4-register",
      "consent-enforcement",
    ],
  },
  {
    slug: "skin-and-laser",
    name: "Skin & laser clinics",
    group: "clinic-type",
    icon: Scan,
    hookPrimary: "Your treatments are clinical.",
    hookSecondary: "Your front desk shouldn't be improvised.",
    subhead:
      "Skin, laser and resurfacing clinics sell courses, not one-offs. The diary, the package balance, the photo album and the next appointment all need to live in the same record.",
    whereItBreaks: [
      {
        title: "Packages tracked on a sticky note",
        body: "Six of ten sessions used? You'd have to ask reception, who'd have to ask the therapist. The spreadsheet's two weeks out of date.",
      },
      {
        title: "Photo albums scattered across iPads",
        body: "Before-and-afters live in the camera roll on whichever device was closest. No side-by-side compare, no patient-facing share.",
      },
      {
        title: "Course rebookings end with the client leaving",
        body: "Therapist forgets to push the next slot at checkout, the next-of-course follow-up never goes out, the patient drifts to the clinic up the road.",
      },
      {
        title: "Skin consult notes never reach the chart",
        body: "Initial consult in one form, plan in another, fluence settings on a laminated card. Nothing ties to the patient's longitudinal record.",
      },
    ],
    capabilityHeading: {
      primary: "Course, photo, chart.",
      secondary: "One client record.",
    },
    capabilityBullets: [
      "Prepaid packages with session redemption visible to the therapist and the patient",
      "Guided before-and-after capture with side-by-side, 2x2 and slider compare",
      "Skincare plan templates that flow from consult notes into the diary as recommended sessions",
      "Auto re-book on checkout — the next course session lands in the calendar before they leave",
      "Longitudinal charts for erythema, hydration and treatment settings tied to each visit",
    ],
    stats: [
      { value: "3x", label: "Package re-engagement rate" },
      { value: "9 min", label: "Saved per skin consult" },
      { value: "92%", label: "Course completion vs. industry 64%" },
      { value: "AU", label: "Data residency · Sydney" },
    ],
    testimonial: {
      body: "Our therapists used to print the package balance on a sticky note. Now the patient can see how many sessions they have left from the portal — and the rebook happens at checkout, every time.",
      name: "Sasha Patel",
      role: "Clinic owner, Skin Ritual — Sydney",
    },
    aspirational: {
      primary: "Your skin clinic deserves a chart.",
      secondary: "Not a sticky-note system.",
    },
    relatedFeatureSlugs: [
      "before-after-photos",
      "packages",
      "skincare-plans",
      "client-portal",
    ],
  },
  {
    slug: "cosmetic-nursing",
    name: "Cosmetic nursing & dermal therapy",
    group: "clinic-type",
    icon: HeartPulse,
    hookPrimary: "AHPRA-aligned by design.",
    hookSecondary: "So you can stop being your own compliance officer.",
    subhead:
      "Cosmetic nurses and dermal therapists carry the regulatory weight personally. The software should carry the paper-trail — so the nurse can carry the patient.",
    whereItBreaks: [
      {
        title: "Prescriber sign-off chased over SMS",
        body: "Cosmetic nurse books, treats, then waits three days for the doctor to retro-sign the script. The audit trail catches up — until it doesn't.",
      },
      {
        title: "Consult-before-treatment is on the honour system",
        body: "Most of the time it happens. But the booking system doesn't force it, and the one time it didn't, it ended in a complaint.",
      },
      {
        title: "Cooling-off enforced from memory",
        body: "Seven-day cooling-off for cosmetic procedures — tracked on whiteboards, calendars and the back of envelopes. Until the regulator asks.",
      },
      {
        title: "Treatment records depend on the nurse",
        body: "When the cosmetic nurse takes leave, the chart is in their head. The locum can't see what was injected, where or with which batch.",
      },
    ],
    capabilityHeading: {
      primary: "Consent. Consult. Cooling-off.",
      secondary: "Three gates, every time.",
    },
    capabilityBullets: [
      "Mandatory consult before any cosmetic treatment is bookable — AHPRA-aligned, by default",
      "Cooling-off windows enforced per procedure type before treatment can start",
      "AHPRA-gated prescribing — dose, frequency and prescriber sign-off captured in the same write",
      "S4 dispensing register auto-populated from charts — no parallel paper book",
      "Immutable audit log on every clinical action — defensible, exportable, plaintiff-proof",
    ],
    stats: [
      { value: "0", label: "Untreated consents allowed through" },
      { value: "100%", label: "AHPRA-aligned booking flow" },
      { value: "8h", label: "Saved per nurse, per week" },
      { value: "AU", label: "Data residency · Sydney" },
    ],
    testimonial: {
      body: "I'm the registered nurse. My licence is on the line. Ruevii is the first system that takes that personally — consult, cooling-off and prescriber sign-off are gates, not reminders.",
      name: "Nurse Eliza Brooks",
      role: "Cosmetic nurse practitioner, Adelaide",
    },
    aspirational: {
      primary: "You took the AHPRA oath.",
      secondary: "Let the software help you keep it.",
    },
    relatedFeatureSlugs: [
      "ahpra-compliance",
      "consent-enforcement",
      "prescriptions",
      "compliance-audit",
    ],
  },

  /* ============================ SIZE ============================ */
  {
    slug: "solo-injector",
    name: "Solo injectors",
    group: "size",
    icon: User,
    hookPrimary: "One chair.",
    hookSecondary: "Don't run it on three apps.",
    subhead:
      "Solo injectors are the receptionist, the clinician, the marketer and the bookkeeper. The platform should fold all four into one screen — not split them across five subscriptions.",
    whereItBreaks: [
      {
        title: "Booking, payments and SMS in different tabs",
        body: "Calendly for the diary, Stripe for the deposit, Mailchimp for the reminder, a personal mobile for the reply. Four tools, one tired injector.",
      },
      {
        title: "After-hours messages go unanswered",
        body: "Patient texts at 8pm to rebook. You see it Tuesday. They've already booked elsewhere.",
      },
      {
        title: "No-shows hurt more than they should",
        body: "Without a no-show fee mechanism, a missed Friday slot is a missed Friday — full stop. No charge, no rebook, no recovery.",
      },
      {
        title: "Marketing is whatever you can do at 9pm",
        body: "Lapsed clients you meant to follow up, reviews you meant to chase, an Instagram lead you meant to reply to. Tomorrow always comes first.",
      },
    ],
    capabilityHeading: {
      primary: "One screen, one injector.",
      secondary: "Every patient handled.",
    },
    capabilityBullets: [
      "AI receptionist picks up missed calls and after-hours SMS — books straight into your diary",
      "Pay-in-thread closes the deposit without leaving the conversation",
      "Lapsed-client recovery runs automatically — Ruevii AI flags who to call this morning",
      "No-show protection: deposits, cancellation fees and AI risk scoring without a front desk",
      "Reviews and loyalty captured at checkout — the marketing engine that runs while you treat",
    ],
    stats: [
      { value: "12h", label: "Saved per week (no front desk needed)" },
      { value: "32%", label: "Fewer no-shows with deposit gating" },
      { value: "24/7", label: "AI receptionist, even when you're treating" },
      { value: "$0", label: "Onboarding · we migrate for you" },
    ],
    testimonial: {
      body: "I'm one injector with one chair. Before Ruevii I had four apps and a personal phone full of patient messages. Now the AI receptionist handles the after-hours and I'm actually off on Sundays.",
      name: "Nurse Maddy Wells",
      role: "Solo cosmetic nurse, Newcastle",
    },
    aspirational: {
      primary: "Solo doesn't mean stretched.",
      secondary: "Let the platform be your second pair of hands.",
    },
    relatedFeatureSlugs: [
      "ai-receptionist",
      "pay-in-conversation",
      "no-show-protection",
      "ruevii-ai",
    ],
  },
  {
    slug: "single-clinic",
    name: "Single-location clinics",
    group: "size",
    icon: Building,
    hookPrimary: "Your clinic outgrew the spreadsheet.",
    hookSecondary: "It deserves more than another spreadsheet.",
    subhead:
      "One location, three to ten staff, a real diary and a real P&L. The clinic needs a real system — rosters, commissions, inventory and reporting — without an enterprise rollout.",
    whereItBreaks: [
      {
        title: "Roster lives in a Google Sheet",
        body: "Manager publishes Sunday night, swaps happen by SMS, payroll re-keys it Friday morning. Three sources of truth for one week of shifts.",
      },
      {
        title: "Inventory is counted in your head",
        body: "Who used the last vial? When was the last order placed? What's the wastage rate this quarter? Nobody knows until something runs out mid-treatment.",
      },
      {
        title: "Commissions reconciled in Excel",
        body: "End of month, owner exports sales, sorts by clinician, calculates split, pastes to payslip. Three hours, one mistake, one awkward conversation.",
      },
      {
        title: "Owner reporting = whatever Square will export",
        body: "No clinic-level dashboard. No comparison week-on-week. No idea which therapist's rebook rate is dragging the package revenue down.",
      },
    ],
    capabilityHeading: {
      primary: "Roster, sales, stock.",
      secondary: "One source of truth.",
    },
    capabilityBullets: [
      "Week-grid rostering with publish, swap and overnight-aware shifts — timesheets export to payroll",
      "Inventory with batch, lot and expiry — auto-deducted on chart save, reorder alerts before runout",
      "Per-practitioner commission tracking with monthly reports your owner can hand to the bookkeeper",
      "Real-time owner dashboard — revenue, rebook rate, no-shows and stock all in one view",
      "Ruevii AI command bar: ask “Who has unpaid plans this week?” and get a list, not a SQL query",
    ],
    stats: [
      { value: "10+", label: "Reports replacing your monthly Excel" },
      { value: "12h", label: "Saved per month on payroll prep" },
      { value: "1", label: "Source of truth · for everything" },
      { value: "$0", label: "Onboarding · we migrate for you" },
    ],
    testimonial: {
      body: "We used to publish the roster on Sunday and re-key it on Friday for payroll. With Ruevii, the shift goes in once — the timesheet, the commission and the payslip all flow from the same row.",
      name: "Carla Mendes",
      role: "Practice manager, Vela Aesthetic — Brisbane",
    },
    aspirational: {
      primary: "Your clinic isn't a side hustle.",
      secondary: "Stop running it like one.",
    },
    relatedFeatureSlugs: [
      "roster",
      "inventory",
      "commissions",
      "dashboards",
    ],
  },
  {
    slug: "multi-location",
    name: "Multi-location groups",
    group: "size",
    icon: Building2,
    hookPrimary: "Three clinics. Three sources of truth.",
    hookSecondary: "Get one.",
    subhead:
      "Groups with two or more clinics burn weeks reconciling rosters, stock and revenue across sites. Ruevii's multi-location layer gives you one ledger and one dashboard — without losing per-clinic control.",
    whereItBreaks: [
      {
        title: "Each location runs a slightly different setup",
        body: "Different price lists, different service codes, different SMS templates. End-of-month, group reporting is a copy-paste reconciliation in Excel.",
      },
      {
        title: "Stock can't move between clinics",
        body: "Surry Hills is out of botulinum. Bondi has six vials. There's no transfer flow, so reception just rebooks the patient and loses the day.",
      },
      {
        title: "Staff who work across sites are a payroll nightmare",
        body: "Therapist does Tues at one clinic, Thurs at another. Two timesheets, two rosters, one frustrated payroll officer.",
      },
      {
        title: "Group-level KPIs live nowhere",
        body: "Each owner-manager has a number. The group director has a guess. No clinic-vs-clinic comparison, no league table, no early warning when a site dips.",
      },
    ],
    capabilityHeading: {
      primary: "Per-clinic detail.",
      secondary: "Group-level truth.",
    },
    capabilityBullets: [
      "Location switcher — staff move between clinics without losing their context or their permissions",
      "Inventory transfers between sites with full audit, batch and expiry preserved",
      "Group-level dashboards: revenue, no-show rate and rebook rate compared clinic-vs-clinic",
      "Per-clinic permissioning by staff.role — site managers see their site, directors see them all",
      "Single team roster and timesheet — one record per shift, even when staff cross locations",
    ],
    stats: [
      { value: "1", label: "Dashboard for every clinic" },
      { value: "60%", label: "Faster month-end close" },
      { value: "20h", label: "Saved per month on group reporting" },
      { value: "AU", label: "Data residency · Sydney" },
    ],
    testimonial: {
      body: "We were running three clinics with three Pabau tenants and a fortnightly Excel reconciliation. Ruevii gave us one ledger, one roster and one dashboard — and the month-end close went from a week to an afternoon.",
      name: "Dr. James Whittaker",
      role: "Group director, Northshore Cosmetic Group — Sydney",
    },
    aspirational: {
      primary: "One group. One platform.",
      secondary: "One number you can actually trust.",
    },
    relatedFeatureSlugs: [
      "dashboards",
      "reporting",
      "team-management",
      "compliance-audit",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Lookups                                                                    */
/* -------------------------------------------------------------------------- */

export const SEGMENT_BY_SLUG: Record<string, Segment> = Object.fromEntries(
  SEGMENTS.map((s) => [s.slug, s]),
);

export const SEGMENT_GROUPS: {
  key: SegmentGroup;
  label: string;
  tagline: string;
  slugs: string[];
}[] = [
  {
    key: "clinic-type",
    label: "By clinic type",
    tagline: "Built for the way Australian aesthetics actually practises.",
    slugs: SEGMENTS.filter((s) => s.group === "clinic-type").map((s) => s.slug),
  },
  {
    key: "size",
    label: "By size",
    tagline: "From one chair to a multi-site group — the same calm platform.",
    slugs: SEGMENTS.filter((s) => s.group === "size").map((s) => s.slug),
  },
];
