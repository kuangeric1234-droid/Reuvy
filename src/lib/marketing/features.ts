// Feature catalog for the Ruevii marketing site mega-menu and feature-detail pages.
// Source of truth: docs/marketing/feature-inventory.md
//
// All icon names below were verified against lucide-react v0.469.0; no substitutions
// were required.

import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  ShieldCheck,
  Calendar,
  MessagesSquare,
  CreditCard,
  Syringe,
  Users,
  FileText,
  Mic,
  Images,
  Pill,
  Video,
  LineChart,
  BookOpen,
  Mail,
  Sparkle,
  ClipboardCheck,
  MousePointerClick,
  Monitor,
  ListPlus,
  BellRing,
  CalendarX,
  CalendarClock,
  Repeat,
  Package,
  Gift,
  FileSignature,
  Receipt,
  Percent,
  Coins,
  Undo2,
  UsersRound,
  Clock,
  CalendarRange,
  Boxes,
  ShieldAlert,
  Truck,
  BarChart3,
  LayoutDashboard,
  FileCheck,
  Palette,
  Phone,
  Bot,
  MessageCircleReply,
  DollarSign,
  Workflow,
  Megaphone,
  TrendingUp,
  FormInput,
  Star,
  Heart,
} from "lucide-react";

export type FeatureStatus = "shipped" | "partial" | "beta";
export type FeatureCategoryKey =
  | "featured"
  | "care"
  | "scheduling"
  | "payments"
  | "management"
  | "conversations";

export type Feature = {
  /** kebab-case unique slug */
  slug: string;
  /** display name (no asterisks or emoji) */
  name: string;
  /** exact one-liner from the inventory */
  oneLiner: string;
  category: FeatureCategoryKey;
  icon: LucideIcon;
  /** "shipped" for ✅, "partial" for 🟡 */
  status: FeatureStatus;
  /** true if marked ⭐ in the inventory */
  differentiator?: boolean;
};

export type FeatureCategory = {
  key: FeatureCategoryKey;
  label: string;
  /** short headline shown at top of menu panel */
  tagline: string;
  features: Feature[];
};

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    key: "featured",
    label: "Featured",
    tagline: "Quietly powerful, built for AU aesthetics.",
    features: [
      {
        slug: "ruevii-ai",
        name: "Ruevii AI",
        oneLiner:
          "Ask your clinic anything — an AI command bar (Ctrl+K) that surfaces insights and runs actions",
        category: "featured",
        icon: Sparkles,
        status: "shipped",
        differentiator: true,
      },
      {
        slug: "ahpra-compliance",
        name: "AHPRA Compliance",
        oneLiner:
          "Built-in compliance for Australian cosmetic & injectable clinics — not bolted on",
        category: "featured",
        icon: ShieldCheck,
        status: "shipped",
        differentiator: true,
      },
      {
        slug: "smart-calendar",
        name: "Smart Calendar",
        oneLiner: "Appointments, staff, rooms & resources in one view",
        category: "featured",
        icon: Calendar,
        status: "shipped",
      },
      {
        slug: "conversations",
        name: "Conversations",
        oneLiner:
          "Two-way SMS, calls & email in one inbox — get paid in the thread",
        category: "featured",
        icon: MessagesSquare,
        status: "shipped",
        differentiator: true,
      },
      {
        slug: "payments-pos",
        name: "Payments & POS",
        oneLiner:
          "Take payment online and in-clinic, with plans & memberships",
        category: "featured",
        icon: CreditCard,
        status: "shipped",
      },
      {
        slug: "injectable-charting",
        name: "Injectable Charting",
        oneLiner:
          "Face-map injection plotting with dose, product & batch — the AU-injectables moat",
        category: "featured",
        icon: Syringe,
        status: "shipped",
        differentiator: true,
      },
    ],
  },
  {
    key: "care",
    label: "Care",
    tagline: "Elevate your care to the next level.",
    features: [
      {
        slug: "clients-emr",
        name: "Clients (EMR)",
        oneLiner:
          "Centralised patient records, history, documents & wallet",
        category: "care",
        icon: Users,
        status: "shipped",
      },
      {
        slug: "injectable-charting",
        name: "Injectable Charting",
        oneLiner:
          "Face & body injection mapping — dose, product, batch, depth, technique",
        category: "care",
        icon: Syringe,
        status: "shipped",
        differentiator: true,
      },
      {
        slug: "forms-charting",
        name: "Forms & Charting",
        oneLiner:
          "Custom clinical forms, SOAP notes (10 AU templates) & e-signature",
        category: "care",
        icon: FileText,
        status: "shipped",
      },
      {
        slug: "ai-scribe",
        name: "AI Scribe",
        oneLiner: "Record the consult → auto-drafted SOAP note for review",
        category: "care",
        icon: Mic,
        status: "shipped",
      },
      {
        slug: "before-after-photos",
        name: "Before & After Photos",
        oneLiner:
          "Albums, side-by-side, 2×2 & slider compare, guided capture",
        category: "care",
        icon: Images,
        status: "shipped",
      },
      {
        slug: "prescriptions",
        name: "Prescriptions",
        oneLiner:
          "AHPRA-gated prescribing — dose, frequency, prescriber sign-off",
        category: "care",
        icon: Pill,
        status: "shipped",
      },
      {
        slug: "consultations",
        name: "Consultations",
        oneLiner:
          "In-person & video consults (AHPRA-compliant; no async prescribing)",
        category: "care",
        icon: Video,
        status: "shipped",
      },
      {
        slug: "clinical-charts",
        name: "Clinical Charts",
        oneLiner:
          "Longitudinal tracking — weight, BMI, blood pressure, erythema & more",
        category: "care",
        icon: LineChart,
        status: "shipped",
      },
      {
        slug: "clinical-catalogs",
        name: "Clinical Catalogs",
        oneLiner:
          "Per-clinic drugs, conditions, vaccines, education & lab codes",
        category: "care",
        icon: BookOpen,
        status: "shipped",
      },
      {
        slug: "clinical-letters",
        name: "Clinical Letters",
        oneLiner: "AI-drafted GP & referral letters from the record",
        category: "care",
        icon: Mail,
        status: "shipped",
      },
      {
        slug: "skincare-plans",
        name: "Skincare Plans",
        oneLiner:
          "Treatment recommendation templates & client skincare plans",
        category: "care",
        icon: Sparkle,
        status: "shipped",
      },
      {
        slug: "consent-enforcement",
        name: "Consent Enforcement",
        oneLiner:
          "Block treatment until consent is signed — plaintiff-proof",
        category: "care",
        icon: ClipboardCheck,
        status: "shipped",
      },
    ],
  },
  {
    key: "scheduling",
    label: "Scheduling",
    tagline: "Schedule & collect payments with ease.",
    features: [
      {
        slug: "calendar",
        name: "Calendar",
        oneLiner: "Appointments, staff, rooms & resources with buffers",
        category: "scheduling",
        icon: Calendar,
        status: "shipped",
      },
      {
        slug: "online-booking",
        name: "Online Booking",
        oneLiner: "Self-service 24/7 booking on a branded page",
        category: "scheduling",
        icon: MousePointerClick,
        status: "shipped",
      },
      {
        slug: "client-portal",
        name: "Client Portal",
        oneLiner:
          "Patients book, pay, view history & complete forms",
        category: "scheduling",
        icon: Monitor,
        status: "shipped",
        differentiator: true,
      },
      {
        slug: "waitlist",
        name: "Waitlist",
        oneLiner: "Auto-fill cancelled slots from the waitlist",
        category: "scheduling",
        icon: ListPlus,
        status: "shipped",
      },
      {
        slug: "reminders",
        name: "Reminders",
        oneLiner: "Automated SMS & email appointment reminders",
        category: "scheduling",
        icon: BellRing,
        status: "shipped",
      },
      {
        slug: "no-show-protection",
        name: "No-show Protection",
        oneLiner:
          "Deposits, cancellation fees & AI no-show risk scoring",
        category: "scheduling",
        icon: CalendarX,
        status: "shipped",
        differentiator: true,
      },
      {
        slug: "check-in-hub",
        name: "Check-In Hub",
        oneLiner: "One-screen front-desk arrival & queue flow",
        category: "scheduling",
        icon: ClipboardCheck,
        status: "partial",
      },
    ],
  },
  {
    key: "payments",
    label: "Payments",
    tagline: "Get paid the way modern clinics do.",
    features: [
      {
        slug: "payments-pos",
        name: "Payments & POS",
        oneLiner:
          "Online + in-clinic checkout via Stripe (card-on-file, terminal)",
        category: "payments",
        icon: CreditCard,
        status: "shipped",
      },
      {
        slug: "payment-plans",
        name: "Payment Plans",
        oneLiner:
          "Deposits + weekly/fortnightly/monthly instalments with auto-charge",
        category: "payments",
        icon: CalendarClock,
        status: "shipped",
      },
      {
        slug: "memberships",
        name: "Memberships",
        oneLiner: "Recurring plans with automated billing & allowances",
        category: "payments",
        icon: Repeat,
        status: "shipped",
      },
      {
        slug: "packages",
        name: "Packages",
        oneLiner: "Prepaid treatment bundles & session redemption",
        category: "payments",
        icon: Package,
        status: "shipped",
      },
      {
        slug: "gift-cards",
        name: "Gift Cards",
        oneLiner: "Sell & redeem gift cards",
        category: "payments",
        icon: Gift,
        status: "shipped",
        differentiator: true,
      },
      {
        slug: "quotes",
        name: "Quotes",
        oneLiner:
          "Build, send & e-sign treatment quotes; convert to sale",
        category: "payments",
        icon: FileSignature,
        status: "shipped",
      },
      {
        slug: "invoices",
        name: "Invoices",
        oneLiner: "Branded PDF invoices & receipts",
        category: "payments",
        icon: Receipt,
        status: "shipped",
      },
      {
        slug: "offers-discounts",
        name: "Offers & Discounts",
        oneLiner: "Promo codes, vouchers & usage tracking",
        category: "payments",
        icon: Percent,
        status: "shipped",
      },
      {
        slug: "commissions",
        name: "Commissions",
        oneLiner: "Per-practitioner commission tracking & reports",
        category: "payments",
        icon: Coins,
        status: "shipped",
      },
      {
        slug: "refunds",
        name: "Refunds",
        oneLiner: "Stripe-integrated refunds with audit trail",
        category: "payments",
        icon: Undo2,
        status: "shipped",
      },
    ],
  },
  {
    key: "management",
    label: "Management",
    tagline: "Manage your clinic with confidence.",
    features: [
      {
        slug: "team-management",
        name: "Team Management",
        oneLiner:
          "Staff, roles, teams, permissions & calendar PIN lock",
        category: "management",
        icon: UsersRound,
        status: "shipped",
      },
      {
        slug: "timesheets",
        name: "Timesheets",
        oneLiner: "Clock in/out, hours tracking & payroll CSV export",
        category: "management",
        icon: Clock,
        status: "shipped",
      },
      {
        slug: "roster",
        name: "Roster",
        oneLiner: "Week-grid shift planning (publish, overnight-aware)",
        category: "management",
        icon: CalendarRange,
        status: "shipped",
      },
      {
        slug: "inventory",
        name: "Inventory",
        oneLiner:
          "Stock with batch/lot/expiry & auto-deduction on treatment",
        category: "management",
        icon: Boxes,
        status: "shipped",
      },
      {
        slug: "s4-register",
        name: "S4 Register",
        oneLiner: "Controlled-substance dispensing register",
        category: "management",
        icon: ShieldAlert,
        status: "shipped",
        differentiator: true,
      },
      {
        slug: "purchase-orders",
        name: "Purchase Orders",
        oneLiner: "Suppliers, POs, reorder, stock counts & wastage",
        category: "management",
        icon: Truck,
        status: "shipped",
      },
      {
        slug: "reporting",
        name: "Reporting",
        oneLiner:
          "10+ reports — revenue, staff, no-shows, inventory, commissions",
        category: "management",
        icon: BarChart3,
        status: "shipped",
      },
      {
        slug: "dashboards",
        name: "Dashboards",
        oneLiner: "Real-time owner & practitioner snapshots",
        category: "management",
        icon: LayoutDashboard,
        status: "shipped",
      },
      {
        slug: "compliance-audit",
        name: "Compliance & Audit",
        oneLiner:
          "Append-only audit log on every clinical & financial action",
        category: "management",
        icon: FileCheck,
        status: "shipped",
        differentiator: true,
      },
      {
        slug: "workspace-branding",
        name: "Workspace Branding",
        oneLiner: "Per-clinic logo, colours & themed patient surfaces",
        category: "management",
        icon: Palette,
        status: "shipped",
      },
    ],
  },
  {
    key: "conversations",
    label: "Conversations & AI",
    tagline: "Push your growth to the next level.",
    features: [
      {
        slug: "ruevii-ai",
        name: "Ruevii AI",
        oneLiner:
          "AI command bar (Ctrl+K) — ask, brief, recover, analyse across the clinic",
        category: "conversations",
        icon: Sparkles,
        status: "shipped",
        differentiator: true,
      },
      {
        slug: "unified-inbox",
        name: "Unified Inbox",
        oneLiner:
          "Two-way SMS conversations with templates & merge fields",
        category: "conversations",
        icon: MessagesSquare,
        status: "shipped",
      },
      {
        slug: "calls",
        name: "Calls",
        oneLiner:
          "In-app calling, recordings, transcripts & per-call AI summaries",
        category: "conversations",
        icon: Phone,
        status: "partial",
      },
      {
        slug: "ai-receptionist",
        name: "AI Receptionist",
        oneLiner:
          "AI answers missed calls & texts, books, sends links 24/7",
        category: "conversations",
        icon: Bot,
        status: "shipped",
        differentiator: true,
      },
      {
        slug: "ai-instant-answers",
        name: "AI Instant Answers",
        oneLiner:
          "Auto-reply to common SMS questions, matched by AI",
        category: "conversations",
        icon: MessageCircleReply,
        status: "shipped",
        differentiator: true,
      },
      {
        slug: "pay-in-conversation",
        name: "Pay in Conversation",
        oneLiner:
          "Send a Stripe payment link in any thread — lands straight in POS",
        category: "conversations",
        icon: DollarSign,
        status: "shipped",
        differentiator: true,
      },
      {
        slug: "automations",
        name: "Automations",
        oneLiner: "Visual workflow builder with branching + AI assistant",
        category: "conversations",
        icon: Workflow,
        status: "shipped",
      },
      {
        slug: "campaigns",
        name: "Campaigns",
        oneLiner:
          "Targeted email & SMS campaigns with a template library",
        category: "conversations",
        icon: Megaphone,
        status: "shipped",
      },
      {
        slug: "lead-management",
        name: "Lead Management",
        oneLiner: "CRM pipeline with AI lead scoring & saved views",
        category: "conversations",
        icon: TrendingUp,
        status: "shipped",
        differentiator: true,
      },
      {
        slug: "capture-forms",
        name: "Capture Forms",
        oneLiner: "Turn website visitors into leads",
        category: "conversations",
        icon: FormInput,
        status: "shipped",
      },
      {
        slug: "reviews",
        name: "Reviews",
        oneLiner: "Collect, moderate & reply to patient reviews",
        category: "conversations",
        icon: Star,
        status: "shipped",
      },
      {
        slug: "loyalty",
        name: "Loyalty",
        oneLiner: "Reward & track repeat patients",
        category: "conversations",
        icon: Heart,
        status: "shipped",
      },
    ],
  },
];

export const ALL_FEATURES: Feature[] = FEATURE_CATEGORIES.flatMap(
  (c) => c.features,
);

export const FEATURE_BY_SLUG: Record<string, Feature> = Object.fromEntries(
  ALL_FEATURES.map((f) => [f.slug, f]),
);

export const LATEST_RELEASE = {
  title: "Pay-in-thread",
  badge: "NEW",
  blurb:
    "Send a Stripe link in any conversation, money lands straight in POS.",
  href: "/features/pay-in-conversation",
};
