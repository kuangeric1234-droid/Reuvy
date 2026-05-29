import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Award,
  BarChart3,
  Bell,
  Boxes,
  Briefcase,
  Building2,
  Calendar,
  Camera,
  CheckCircle2,
  ClipboardList,
  Clock,
  CreditCard,
  Database,
  FileText,
  Gift,
  Globe,
  GraduationCap,
  Heart,
  HeartPulse,
  Image as ImageIcon,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  LineChart,
  Lock,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  MessagesSquare,
  Microscope,
  PenLine,
  Percent,
  Pill,
  Receipt,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Stethoscope,
  Tag,
  Target,
  Trophy,
  UserCheck,
  Users,
  Video,
  Wallet,
  Wrench,
} from "lucide-react";

/* ----------------------------- FEATURES ----------------------------- */

export type Feature = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  category: "care" | "scheduling" | "management" | "marketing";
  highlights: string[];
  badge?: "NEW" | "POPULAR" | "SPOTLIGHT";
};

export const FEATURES: Feature[] = [
  // CARE
  {
    slug: "emr",
    name: "Clients (EMR)",
    tagline: "A clinical record your team wants to live in.",
    description:
      "Charting, photos, consent and visit history on one calm timeline. Per-treatment templates, version history, AHPRA-aware fields.",
    icon: FileText,
    category: "care",
    highlights: ["Visual timelines", "Per-treatment templates", "Photos + consent", "AHPRA-aware"],
    badge: "POPULAR",
  },
  {
    slug: "scribe",
    name: "Scribe AI",
    tagline: "Listens, drafts, never interrupts.",
    description:
      "Ambient consult notes ready to sign in seconds — in your phrasing, with your fields, on your templates.",
    icon: PenLine,
    category: "care",
    highlights: ["Ambient capture", "Template aware", "Sign-off in seconds"],
    badge: "POPULAR",
  },
  {
    slug: "telehealth",
    name: "Telehealth",
    tagline: "Video visits that feel like real ones.",
    description:
      "HD video, room links, waiting rooms, and clinical notes in the same screen — no second tool to manage.",
    icon: Video,
    category: "care",
    highlights: ["HD video + audio", "Branded waiting room", "In-call notes"],
  },
  {
    slug: "memberships",
    name: "Memberships & Packages",
    tagline: "Recurring revenue, on autopilot.",
    description:
      "Sell packages and memberships, track usage, expiry and recharges — all reconciled to the client record.",
    icon: Award,
    category: "care",
    highlights: ["Auto-recharge", "Usage tracking", "Tiered perks"],
  },
  {
    slug: "measurements",
    name: "Measurement Tracking",
    tagline: "Outcomes you can actually point to.",
    description:
      "Weight, body fat, range of motion, photos — every measurement plotted against the treatment plan.",
    icon: Activity,
    category: "care",
    highlights: ["Custom metrics", "Trend charts", "Before/after overlay"],
  },
  {
    slug: "vaccines",
    name: "Vaccines",
    tagline: "Schedules, batches, recalls.",
    description:
      "Track vaccination history, batch numbers and expiry dates. Recall patients automatically when boosters are due.",
    icon: Pill,
    category: "care",
    highlights: ["Batch tracking", "Auto recalls", "Compliance reports"],
  },
  {
    slug: "forms",
    name: "Forms & Charting",
    tagline: "The last forms you'll ever build.",
    description:
      "Drag-and-drop builder, conditional logic, e-signature, pre-fill from the client record, and dynamic charting.",
    icon: ClipboardList,
    category: "care",
    highlights: ["No-code builder", "Conditional logic", "E-signature"],
  },
  {
    slug: "before-after",
    name: "Before & After Photo",
    tagline: "Photos worth showing off.",
    description:
      "Consistent lighting prompts, side-by-side compare, secure consented galleries you can repost with one tap.",
    icon: Camera,
    category: "care",
    highlights: ["Consistent capture", "Side-by-side", "Consent baked in"],
  },
  {
    slug: "aftercare",
    name: "Aftercare",
    tagline: "The follow-up the front desk never has time for.",
    description:
      "Curated post-treatment PDFs and SMS sequences, scheduled to land exactly when each client needs them.",
    icon: Bell,
    category: "care",
    highlights: ["Per-treatment content", "Auto schedule", "Bilingual ready"],
  },
  {
    slug: "letters",
    name: "Letters & Dictation",
    tagline: "Referrals and reports — written for you.",
    description:
      "AI pulls from the chart, matches the recipient's tone, and waits for your sign-off. Hours back every week.",
    icon: Mail,
    category: "care",
    highlights: ["AI drafts", "Recipient-aware tone", "Sign-off workflow"],
  },
  {
    slug: "labs",
    name: "Labs",
    tagline: "Order, receive, action — in one place.",
    description:
      "Lab orders sent and results returned directly into the chart. Flagged abnormals surface in your queue.",
    icon: Microscope,
    category: "care",
    highlights: ["Lab integrations", "Result flagging", "Auto-attach"],
  },
  {
    slug: "prescriptions",
    name: "Prescriptions",
    tagline: "Clinician-led, AI-supported.",
    description:
      "Surfaces relevant history, allergens and contraindications before each script. Every prescription reviewed by a clinician.",
    icon: Pill,
    category: "care",
    highlights: ["Allergen check", "History-aware", "Sign-off required"],
  },
  // SCHEDULING
  {
    slug: "calendar",
    name: "Calendar",
    tagline: "The calendar your front desk actually likes.",
    description:
      "Multi-staff, multi-room, multi-location calendar with drag-to-reschedule, smart conflict detection and rich client cards in tooltips.",
    icon: Calendar,
    category: "scheduling",
    highlights: ["Multi-staff/room", "Conflict detection", "Quick rebook"],
    badge: "POPULAR",
  },
  {
    slug: "online-booking",
    name: "Online Booking",
    tagline: "Bookings that fill themselves.",
    description:
      "A public widget that respects real availability, takes deposits, sends SMS confirmations and adds to the client portal automatically.",
    icon: Globe,
    category: "scheduling",
    highlights: ["Public widget", "Card-on-file deposits", "SMS confirm"],
    badge: "POPULAR",
  },
  {
    slug: "client-portal",
    name: "Client Portal",
    tagline: "Their whole story — in their pocket.",
    description:
      "Branded portal where clients book, pay, view photos, sign forms and read aftercare — all in one tap.",
    icon: Smartphone,
    category: "scheduling",
    highlights: ["Branded mobile", "Booking + pay", "Signed forms"],
  },
  {
    slug: "classes",
    name: "Classes",
    tagline: "Group bookings, packed rooms.",
    description:
      "Run group classes with capacity limits, waitlists and recurring schedules. Members book with one tap.",
    icon: Users,
    category: "scheduling",
    highlights: ["Capacity limits", "Waitlist auto-fill", "Recurring sessions"],
  },
  {
    slug: "payments",
    name: "Payments",
    tagline: "Payments that just happen.",
    description:
      "Card-on-file, Apple/Google Pay, payment plans, deposits, refunds — reconciled to invoices automatically.",
    icon: CreditCard,
    category: "scheduling",
    highlights: ["Card-on-file", "Payment plans", "Auto-reconcile"],
  },
  {
    slug: "invoices",
    name: "Invoices & POS",
    tagline: "Tap, pay, done.",
    description:
      "POS terminal mode for in-clinic, with invoicing, deposits, refunds and tipping built in.",
    icon: Receipt,
    category: "scheduling",
    highlights: ["POS terminal", "Tipping", "Refund flows"],
  },
  {
    slug: "insurance-billing",
    name: "Insurance Billing",
    tagline: "Claims that don't bounce.",
    description:
      "Submit, track and reconcile claims with built-in validation. Fewer denials, faster payments.",
    icon: ShieldCheck,
    category: "scheduling",
    highlights: ["Claim validation", "Tracking dashboard", "Bulk submit"],
  },
  {
    slug: "quotes",
    name: "Quotes",
    tagline: "Recommendations that close.",
    description:
      "Generate treatment quotes from the chart, send for e-sign, convert to invoice in one tap.",
    icon: FileText,
    category: "scheduling",
    highlights: ["E-sign", "Convert to invoice", "Pre-treatment plans"],
  },
  {
    slug: "policies",
    name: "Policies",
    tagline: "Cancellation, deposits, late fees — handled.",
    description:
      "Set per-treatment policies for deposits, late fees and cancellations. Enforced at booking time.",
    icon: Lock,
    category: "scheduling",
    highlights: ["Per-treatment rules", "Auto enforcement", "Deposit capture"],
  },
  {
    slug: "mobile-app",
    name: "Mobile App",
    tagline: "Your whole practice in your pocket.",
    description:
      "iOS and Android apps for clinicians and front desk. Full calendar, charting and payments on the go.",
    icon: Smartphone,
    category: "scheduling",
    highlights: ["iOS + Android", "Offline charting", "Push notifications"],
  },
  {
    slug: "waitlist",
    name: "Waitlist",
    tagline: "Cancellations refilled in minutes.",
    description:
      "Smart waitlist offers freed slots to the right clients first. Watch fill rates climb without lifting a finger.",
    icon: Clock,
    category: "scheduling",
    highlights: ["Smart matching", "SMS offers", "Auto-confirm"],
  },
  // MANAGEMENT
  {
    slug: "team-management",
    name: "Team Management",
    tagline: "Roles, rosters, permissions.",
    description:
      "Organise staff by role, location and team. Granular permissions and clean handovers between shifts.",
    icon: Users,
    category: "management",
    highlights: ["Roles + permissions", "Shift handover", "Location scoping"],
  },
  {
    slug: "commissions",
    name: "Commissions",
    tagline: "Pay what you owe — exactly.",
    description:
      "Per-service, per-product commission rules with tiered earnings, deductions and clean monthly statements.",
    icon: Percent,
    category: "management",
    highlights: ["Tiered rules", "Auto statements", "Per-staff dashboards"],
  },
  {
    slug: "timesheets",
    name: "Timesheets",
    tagline: "Hours, attendance, payroll-ready.",
    description:
      "Clock-in from any device, approve in bulk, export straight to payroll. No more spreadsheet roulette.",
    icon: Clock,
    category: "management",
    highlights: ["Mobile clock-in", "Bulk approve", "Payroll export"],
  },
  {
    slug: "compliance",
    name: "Compliance",
    tagline: "Stay secure, compliant, audit-ready.",
    description:
      "HIPAA, AHPRA, GDPR — Reuvy ships compliant by default with audit trails for every record touch.",
    icon: ShieldCheck,
    category: "management",
    highlights: ["HIPAA + AHPRA", "Audit trails", "Role-based access"],
  },
  {
    slug: "reporting",
    name: "Reporting",
    tagline: "Honest numbers, not vanity dashboards.",
    description:
      "Revenue per chair, retention by treatment, LTV by channel — the metrics that actually move a practice.",
    icon: BarChart3,
    category: "management",
    highlights: ["Revenue + retention", "Cohorts", "Custom exports"],
  },
  {
    slug: "dashboards",
    name: "Dashboards",
    tagline: "Real-time, glanceable, on the wall.",
    description:
      "Pin the numbers that matter. Live updates for owners, managers and the front desk.",
    icon: LayoutDashboard,
    category: "management",
    highlights: ["Live updates", "Wall-mountable", "Per-role views"],
  },
  {
    slug: "inventory",
    name: "Inventory & Orders",
    tagline: "Stock that reorders itself.",
    description:
      "Track every vial, every cartridge. Auto-reorder thresholds, supplier integrations and waste tracking.",
    icon: Boxes,
    category: "management",
    highlights: ["Auto-reorder", "Supplier sync", "Waste tracking"],
  },
  // MARKETING
  {
    slug: "capture-forms",
    name: "Capture Forms",
    tagline: "Turn website visits into bookings.",
    description:
      "Embed lead capture forms anywhere. New leads flow straight into your CRM with full marketing attribution.",
    icon: MessageCircle,
    category: "marketing",
    highlights: ["Embed anywhere", "UTM tracking", "Auto-assign"],
  },
  {
    slug: "lead-management",
    name: "Lead Management",
    tagline: "From form fill to first visit.",
    description:
      "Pipeline view of every lead, with reminders, scoring and AI-suggested next actions.",
    icon: Target,
    category: "marketing",
    highlights: ["Pipeline view", "Lead scoring", "AI next-best-action"],
  },
  {
    slug: "campaigns",
    name: "Campaigns",
    tagline: "Email + SMS that actually converts.",
    description:
      "Beautifully designed campaign builder, with segmentation pulled directly from your clinical and booking data.",
    icon: Mail,
    category: "marketing",
    highlights: ["Email + SMS", "Clinical segments", "A/B testing"],
  },
  {
    slug: "workflows",
    name: "Workflows",
    tagline: "Automations that feel handwritten.",
    description:
      "Trigger-based sequences for reminders, aftercare, recalls and rebooks — branched logic, perfect timing.",
    icon: Layers,
    category: "marketing",
    highlights: ["Branching logic", "Per-trigger timing", "Pre-built templates"],
  },
  {
    slug: "loyalty",
    name: "Loyalty",
    tagline: "Reward the regulars.",
    description:
      "Points, tiers and rewards built into the checkout flow. Members feel seen, you keep them coming back.",
    icon: Trophy,
    category: "marketing",
    highlights: ["Points + tiers", "Auto-redemption", "Per-treatment earn"],
  },
  {
    slug: "gift-cards",
    name: "Gift Vouchers",
    tagline: "Sell joy. Recover December.",
    description:
      "Sell digital and physical gift vouchers online or in-clinic, with branded delivery and easy redemption.",
    icon: Gift,
    category: "marketing",
    highlights: ["Branded delivery", "Digital + physical", "Easy redeem"],
  },
  {
    slug: "discounts",
    name: "Offers & Discounts",
    tagline: "Promotions, without the chaos.",
    description:
      "Time-bound offers, codes and bundles, applied at checkout with full margin reporting after the fact.",
    icon: Tag,
    category: "marketing",
    highlights: ["Codes + bundles", "Time-bound", "Margin reports"],
  },
  {
    slug: "reviews",
    name: "Reviews",
    tagline: "Google, Trustpilot, internal — handled.",
    description:
      "Automatically request reviews from happy clients on the right platform. Reply from one inbox.",
    icon: Star,
    category: "marketing",
    highlights: ["Smart routing", "One inbox", "Sentiment analysis"],
  },
];

export const FEATURE_BY_SLUG = Object.fromEntries(
  FEATURES.map((f) => [f.slug, f]),
) as Record<string, Feature>;

export const FEATURE_CATEGORIES = [
  {
    key: "care",
    label: "Care",
    tagline: "Optimize client care",
    icon: Heart,
    sections: [
      {
        title: "Optimize client care",
        slugs: ["emr", "scribe", "telehealth", "memberships", "measurements", "vaccines"],
      },
      {
        title: "Clinical excellence",
        slugs: ["forms", "before-after", "aftercare", "letters", "labs", "prescriptions"],
      },
    ],
    latest: {
      title: "Care Plus",
      badge: "SPOTLIGHT FEATURE",
      blurb: "Premium patient care tools for smarter clinical workflows.",
      href: "/features/care-plus",
    },
  },
  {
    key: "scheduling",
    label: "Scheduling",
    tagline: "Streamline admin tasks",
    icon: Calendar,
    sections: [
      {
        title: "Streamline admin tasks",
        slugs: ["calendar", "online-booking", "client-portal", "classes"],
      },
      {
        title: "Payments",
        slugs: ["payments", "invoices", "insurance-billing", "quotes"],
      },
      {
        title: "Other",
        slugs: ["policies", "mobile-app", "waitlist"],
      },
    ],
    latest: {
      title: "Klarna",
      badge: "NEW",
      blurb: "Buy now, pay later is now available in Reuvy checkout.",
      href: "/features/klarna",
    },
  },
  {
    key: "management",
    label: "Management",
    tagline: "Manage your clinic with confidence",
    icon: ShieldCheck,
    sections: [
      {
        title: "Manage & grow",
        slugs: ["team-management", "commissions", "timesheets", "compliance"],
      },
      {
        title: "Gain insights",
        slugs: ["reporting", "dashboards"],
      },
      {
        title: "Stock",
        slugs: ["inventory"],
      },
    ],
    latest: {
      title: "Insights Plus",
      badge: "NEW",
      blurb:
        "Real-time visibility into bookings, revenue and practitioner performance.",
      href: "/features/insights-plus",
    },
  },
  {
    key: "marketing",
    label: "Marketing",
    tagline: "Attract, engage, retain",
    icon: Megaphone,
    sections: [
      {
        title: "CRM",
        slugs: ["capture-forms", "lead-management"],
      },
      {
        title: "Automation",
        slugs: ["campaigns", "workflows"],
      },
      {
        title: "Loyalty",
        slugs: ["loyalty", "gift-cards", "discounts", "reviews"],
      },
    ],
    latest: {
      title: "Marketing Plus",
      badge: "SPOTLIGHT FEATURE",
      blurb: "Helps clinics attract and engage patients automatically.",
      href: "/features/marketing-plus",
    },
  },
] as const;

export const FEATURED_PICKS = ["calendar", "online-booking", "scribe", "client-portal", "forms", "payments", "telehealth"];

/* --------------------------- PRACTICE TYPES --------------------------- */

export type Practice = {
  slug: string;
  name: string;
  group:
    | "wellness"
    | "aesthetics"
    | "health"
    | "performance"
    | "mental"
    | "role"
    | "size";
  tagline: string;
  icon: LucideIcon;
};

export const PRACTICES: Practice[] = [
  // Wellness
  { slug: "private-gp", name: "Private GP", group: "wellness", tagline: "Private practice & GP clinics", icon: Stethoscope },
  { slug: "wellness", name: "Wellness", group: "wellness", tagline: "Wellness & lifestyle clinics", icon: Heart },
  { slug: "longevity", name: "Longevity", group: "wellness", tagline: "Longevity & healthspan clinics", icon: Activity },
  { slug: "functional-medicine", name: "Functional Medicine", group: "wellness", tagline: "Root-cause practitioners", icon: Microscope },
  { slug: "iv-therapy", name: "IV Therapy", group: "wellness", tagline: "Drip & infusion clinics", icon: HeartPulse },
  { slug: "weight-loss", name: "Weight Loss", group: "wellness", tagline: "Weight loss & metabolic clinics", icon: Activity },
  { slug: "metabolic-health", name: "Metabolic Health", group: "wellness", tagline: "Metabolic & nutrition clinics", icon: LineChart },
  // Aesthetics
  { slug: "med-spa", name: "Med Spa", group: "aesthetics", tagline: "Modern med spas of every size", icon: Sparkles },
  { slug: "aesthetics-clinic", name: "Aesthetics Clinic", group: "aesthetics", tagline: "Injectables, lasers, skin", icon: Sparkles },
  { slug: "dermatology", name: "Dermatology", group: "aesthetics", tagline: "Medical and cosmetic dermatology", icon: ShieldCheck },
  { slug: "cosmetic-surgery", name: "Cosmetic Surgery", group: "aesthetics", tagline: "Plastic & cosmetic surgeons", icon: Stethoscope },
  { slug: "skin-clinic", name: "Skin Clinic", group: "aesthetics", tagline: "Skin-first treatment practices", icon: Sparkles },
  { slug: "laser-clinic", name: "Laser Clinic", group: "aesthetics", tagline: "Laser hair removal & resurfacing", icon: Sparkles },
  { slug: "hair-clinic", name: "Hair Transplant", group: "aesthetics", tagline: "Hair restoration practices", icon: Users },
  { slug: "spa", name: "Spa", group: "aesthetics", tagline: "Day spas & resort spas", icon: Heart },
  // Health
  { slug: "fertility", name: "Fertility", group: "health", tagline: "Fertility & reproductive clinics", icon: HeartPulse },
  { slug: "ivf", name: "IVF & Gynecology", group: "health", tagline: "IVF and women's health", icon: HeartPulse },
  { slug: "mens-health", name: "Men's Health", group: "health", tagline: "Men's health & vitality clinics", icon: Stethoscope },
  { slug: "sexual-health", name: "Sexual Health", group: "health", tagline: "Sexual health clinics", icon: Heart },
  { slug: "pelvic-health", name: "Pelvic Health", group: "health", tagline: "Pelvic floor & continence", icon: HeartPulse },
  { slug: "hrt", name: "HRT", group: "health", tagline: "Hormone replacement clinics", icon: Pill },
  // Performance
  { slug: "physio", name: "Physical Therapy", group: "performance", tagline: "Physio & rehab clinics", icon: HeartPulse },
  { slug: "sports-medicine", name: "Sports Medicine", group: "performance", tagline: "Sports & performance medicine", icon: Activity },
  { slug: "chiro", name: "Chiropractic", group: "performance", tagline: "Chiropractic practices", icon: HeartPulse },
  { slug: "osteo", name: "Osteopathy", group: "performance", tagline: "Osteopathy clinics", icon: HeartPulse },
  { slug: "regenerative", name: "Regenerative Medicine", group: "performance", tagline: "PRP, stem cell & regenerative", icon: Sparkles },
  // Mental
  { slug: "mental-health", name: "Mental Health", group: "mental", tagline: "Mental health practices", icon: Heart },
  { slug: "psychology", name: "Psychology", group: "mental", tagline: "Psychology practices", icon: Briefcase },
  { slug: "therapy", name: "Therapy & Counselling", group: "mental", tagline: "Therapy & counselling clinics", icon: MessagesSquare },
  { slug: "adhd", name: "ADHD Assessment", group: "mental", tagline: "ADHD assessment & support", icon: ClipboardList },
  { slug: "psychiatry", name: "Psychiatry", group: "mental", tagline: "Psychiatry clinics", icon: Stethoscope },
  { slug: "coaching", name: "Coaching", group: "mental", tagline: "Coaching practices", icon: GraduationCap },
  { slug: "speech-therapy", name: "Speech Therapy", group: "mental", tagline: "Speech & language clinics", icon: MessagesSquare },
  // Roles
  { slug: "owners", name: "Practice Owners", group: "role", tagline: "For owners & managers", icon: Briefcase },
  { slug: "providers", name: "Treatment Providers", group: "role", tagline: "For clinicians", icon: Stethoscope },
  { slug: "front-of-house", name: "Front of House", group: "role", tagline: "For the front desk", icon: UserCheck },
  { slug: "marketers", name: "Marketers", group: "role", tagline: "For in-house marketers", icon: Megaphone },
  // Size
  { slug: "enterprise", name: "Enterprise", group: "size", tagline: "Multi-brand groups", icon: Building2 },
  { slug: "large", name: "Large Practice", group: "size", tagline: "10+ practitioners", icon: Building2 },
  { slug: "small", name: "Small Practice", group: "size", tagline: "2–10 practitioners", icon: MapPin },
  { slug: "solo", name: "Solo Practitioner", group: "size", tagline: "Going it alone", icon: Users },
];

export const PRACTICE_BY_SLUG = Object.fromEntries(
  PRACTICES.map((p) => [p.slug, p]),
) as Record<string, Practice>;

export const PRACTICE_GROUPS = [
  { key: "wellness", label: "Wellness & preventive care" },
  { key: "aesthetics", label: "Medical aesthetics" },
  { key: "health", label: "Women's & men's health" },
  { key: "performance", label: "Musculoskeletal & performance" },
  { key: "mental", label: "Mental health & lifestyle" },
  { key: "role", label: "By role" },
  { key: "size", label: "By business size" },
] as const;

/* -------------------------------- WHY US -------------------------------- */

export const WHY_US = {
  compare: [
    { label: "Success Stories", href: "/why-us/success-stories", desc: "Read case studies from real practices" },
    { label: "Compare Reuvy", href: "/why-us/compare", desc: "Reuvy vs. the alternatives" },
    { label: "Savings Calculator", href: "/why-us/savings", desc: "See your time and revenue gains" },
  ],
  implementation: [
    { label: "Data Migration", href: "/why-us/onboarding", desc: "Done-for-you migration" },
    { label: "Account Management", href: "/why-us/account-management", desc: "A named human, always" },
    { label: "Project Management", href: "/why-us/project-management", desc: "Roll-outs at scale" },
    { label: "On-site Training", href: "/why-us/training", desc: "We come to you" },
    { label: "Revenue Consultation", href: "/why-us/revenue", desc: "Strategic growth review" },
    { label: "Platinum Success", href: "/why-us/platinum", desc: "Dedicated success program" },
  ],
  security: [
    { label: "Security Commitment", href: "/why-us/security", desc: "Our security promise" },
    { label: "HIPAA Compliance", href: "/why-us/hipaa", desc: "Built HIPAA-ready" },
    { label: "GDPR Compliance", href: "/why-us/gdpr", desc: "EU data protection" },
  ],
  company: [
    { label: "About Us", href: "/why-us/about", desc: "Who we are" },
    { label: "Careers", href: "/why-us/careers", desc: "Build with us" },
  ],
};

/* ------------------------------ RESOURCES ------------------------------ */

export const RESOURCES = {
  popular: [
    { label: "Med Spa Trends 2026", href: "/resources/med-spa-trends" },
    { label: "Med Spa Business Guide", href: "/resources/med-spa-guide" },
    { label: "Marketing Your Med Spa", href: "/resources/marketing-med-spa" },
    { label: "Pricing Strategies", href: "/resources/pricing-strategies" },
  ],
  tools: [
    { label: "Templates Library", href: "/resources/templates", icon: FileText },
    { label: "ICD Codes", href: "/resources/icd-codes", icon: Database },
    { label: "Consent Forms", href: "/resources/consent-forms", icon: ClipboardList },
    { label: "Face Mapping", href: "/resources/face-mapping", icon: ImageIcon },
  ],
  education: [
    { label: "Blog", href: "/resources/blog", icon: PenLine },
    { label: "Reuvy Academy", href: "/resources/academy", icon: GraduationCap },
    { label: "Knowledge Base", href: "/resources/help", icon: LifeBuoy },
    { label: "Product Updates", href: "/resources/changelog", icon: Sparkles },
  ],
  referrals: [
    { label: "Refer-a-friend", href: "/resources/referrals", icon: Gift },
    { label: "Build with Reuvy", href: "/resources/partners", icon: Wrench },
    { label: "Become a Partner", href: "/resources/become-partner", icon: Wallet },
  ],
};
