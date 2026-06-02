"use client";

import type { ReactNode } from "react";
import {
  Sparkles,
  ShieldCheck,
  Calendar,
  MessagesSquare,
  CreditCard,
  Syringe,
  Bot,
  DollarSign,
  Mic,
  ClipboardCheck,
  FileCheck,
  Repeat,
  Zap,
  PlugZap,
  Eye,
  Mail,
  Phone,
  Activity,
  FormInput,
  Heart,
  Megaphone,
  Star,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import {
  EyebrowTag,
  TwoToneHeadline,
  FeatureCard,
  HighlightBlock,
  StatBand,
  ComparisonTable,
  ProductScreenshot,
} from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
import {
  FEATURE_BY_SLUG,
  FEATURE_CATEGORIES,
  type Feature,
  type FeatureCategoryKey,
} from "@/lib/marketing/features";

/* -------------------------------------------------------------------------- */
/*  Category labels                                                            */
/* -------------------------------------------------------------------------- */

const CATEGORY_LABEL: Record<FeatureCategoryKey, string> = {
  featured: "Featured",
  care: "Care",
  scheduling: "Scheduling",
  payments: "Payments",
  management: "Management",
  conversations: "Conversations & AI",
};

/* -------------------------------------------------------------------------- */
/*  Money helper — schema_reference money is integer cents                     */
/* -------------------------------------------------------------------------- */

const fmtCents = (c: number) =>
  `$${(c / 100).toLocaleString("en-AU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

/* -------------------------------------------------------------------------- */
/*  Per-feature rich copy — 6 differentiators get bespoke text                 */
/* -------------------------------------------------------------------------- */

type Capability = { icon: LucideIcon; title: string; body: string };
type HighlightCopy = {
  eyebrow: string;
  title: ReactNode;
  body: string;
  bullets: string[];
  mock?: "client" | "sale" | "thread" | "appointment" | "membership" | "audit";
};
type SupportingCard = Capability;
type FeatureCopy = {
  hookSecondary: string;
  expandedBody: string;
  capabilities?: Capability[];
  highlights?: HighlightCopy[];
  supporting?: SupportingCard[];
  closingPrimary?: string;
  closingSecondary?: string;
};

const FEATURE_COPY: Record<string, FeatureCopy> = {
  /* -------------------- Ruevii AI -------------------- */
  "ruevii-ai": {
    hookSecondary: "lives one keystroke away.",
    expandedBody:
      "A command bar that sits on top of every screen. Ask in plain English, get an answer pulled from your real records, and let Ruevii AI run the action — book the appointment, send the SMS, draft the letter. Press Ctrl+K from anywhere.",
    capabilities: [
      {
        icon: Sparkles,
        title: "Ask anything",
        body: "“Who has unpaid plans this week?” — answered from your live data in seconds.",
      },
      {
        icon: Zap,
        title: "Run actions",
        body: "Book, message, refund, draft a letter — all from the same prompt bar.",
      },
      {
        icon: Eye,
        title: "Surface the hidden",
        body: "Lapsed clients, soft-decline payments, idle leads — flagged before you ask.",
      },
    ],
    highlights: [
      {
        eyebrow: "ONE PROMPT, EVERY SURFACE",
        title: (
          <>
            A command bar that <em>actually does the work</em>.
          </>
        ),
        body: "Ruevii AI reads your clinic the way your owner does — clients, sales, conversations, inventory. Then it reaches in and acts on what you ask.",
        bullets: [
          "Cross-record context with status ACTIVE, COMPLETED and PAYMENT_PLAN aware",
          "Action-grade — books appointments, drafts SMS, issues refunds",
          "Permissioned by staff.role so reception never sees what they shouldn't",
        ],
        mock: "client",
      },
      {
        eyebrow: "GROUNDED IN YOUR REAL DATA",
        title: (
          <>
            Not a chatbot. <em>Your clinic with a brain.</em>
          </>
        ),
        body: "Every answer is grounded in your tenant's records, scoped by clinic_id and RLS. No hallucinations — citations link straight to the row.",
        bullets: [
          "Multi-table joins across appointments, sales and conversations",
          "Append-only audit log captures every prompt and action",
          "Australian data residency — your prompts never leave Sydney",
        ],
        mock: "audit",
      },
    ],
    supporting: [
      {
        icon: Activity,
        title: "Daily brief",
        body: "A short morning summary of today's risks and revenue.",
      },
      {
        icon: PlugZap,
        title: "Recover anything",
        body: "Lapsed clients, no-shows, abandoned quotes — re-engaged automatically.",
      },
      {
        icon: Mail,
        title: "Draft from records",
        body: "GP letters, follow-ups and quotes pre-written from the chart.",
      },
      {
        icon: ShieldCheck,
        title: "Safe by default",
        body: "Read-only mode, role-aware, and an undo for every action.",
      },
    ],
    closingPrimary: "Stop scrolling for answers.",
    closingSecondary: "Ask Ruevii AI instead.",
  },

  /* -------------------- AHPRA Compliance -------------------- */
  "ahpra-compliance": {
    hookSecondary: "is the floor, not the feature.",
    expandedBody:
      "Built in Australia for AHPRA-regulated practice. Consent enforcement, an S4 controlled-substance register and an immutable audit log on every clinical and financial action — there from day one, not bolted on after a complaint.",
    capabilities: [
      {
        icon: ClipboardCheck,
        title: "Consent enforced",
        body: "Treatment is blocked until the consent form is signed and on the record.",
      },
      {
        icon: Syringe,
        title: "S4 register",
        body: "Controlled-substance dispensing logged to the dose, batch and prescriber.",
      },
      {
        icon: FileCheck,
        title: "Immutable audit",
        body: "Every action — clinical and financial — written to an append-only log.",
      },
    ],
    highlights: [
      {
        eyebrow: "BUILT FOR THE AU REGULATOR",
        title: (
          <>
            Plaintiff-proof <em>consent and charting</em>.
          </>
        ),
        body: "Consent forms attach to the appointment by status and block in_progress until signed. The injector sees what was agreed; the patient sees what they signed.",
        bullets: [
          "Per-treatment consent templates with e-signature",
          "Appointment.status flips to in_progress only after consent is captured",
          "Forms versioned — the patient sees the version they agreed to",
        ],
        mock: "appointment",
      },
      {
        eyebrow: "S4 + AUDIT, OUT OF THE BOX",
        title: (
          <>
            A dispensing log <em>you can hand to AHPRA</em>.
          </>
        ),
        body: "Schedule 4 dispensing tracked to the batch, prescriber and dose. Pair it with the immutable audit trail and you have a defensible record for every visit.",
        bullets: [
          "S4 register with batch, expiry and prescriber sign-off",
          "Append-only audit — no record can be silently edited",
          "Reports exportable for AHPRA, insurance and indemnity reviews",
        ],
        mock: "audit",
      },
    ],
    supporting: [
      {
        icon: ShieldCheck,
        title: "PHI-grade security",
        body: "Tenant-scoped via clinic_id with RLS on every clinical table.",
      },
      {
        icon: FileCheck,
        title: "AU data residency",
        body: "Records and backups hosted in Sydney, never offshored.",
      },
      {
        icon: ClipboardCheck,
        title: "Cooling-off built in",
        body: "Cosmetic cooling-off periods enforced before treatment.",
      },
      {
        icon: Activity,
        title: "Compliance dashboard",
        body: "Flags consent gaps, missed checks and overdue reviews.",
      },
    ],
    closingPrimary: "Sleep through your next audit.",
    closingSecondary: "Built-in, not bolted on.",
  },

  /* -------------------- Injectable Charting -------------------- */
  "injectable-charting": {
    hookSecondary: "to the millilitre, to the batch.",
    expandedBody:
      "Face and body injection mapping that knows what an injector actually needs: dose, product, batch, depth, technique — all plotted on the chart and tied to the patient's longitudinal record.",
    capabilities: [
      {
        icon: Syringe,
        title: "Plot the injection",
        body: "Tap the face map. Pick the product. The dose, depth and technique come with you.",
      },
      {
        icon: FileCheck,
        title: "Batch & expiry",
        body: "Every unit tied to its product, batch and expiry — auto-deducted from stock.",
      },
      {
        icon: Activity,
        title: "Longitudinal view",
        body: "See what was injected, where, and when — across every visit.",
      },
    ],
    highlights: [
      {
        eyebrow: "PURPOSE-BUILT FOR AU INJECTABLES",
        title: (
          <>
            The chart your injector <em>already drew on paper</em>.
          </>
        ),
        body: "A real face and body map — not a screenshot. Plot the injection site, capture dose in units, link the product and batch, and write the technique once.",
        bullets: [
          "Anterior, lateral and posterior maps with overlay templates",
          "Dose in units · product · batch · expiry on every shot",
          "Technique presets per injector — bolus, microbolus, fanning, threading",
        ],
        mock: "client",
      },
      {
        eyebrow: "INVENTORY THAT SELF-MANAGES",
        title: (
          <>
            Each plot <em>moves the stock</em>.
          </>
        ),
        body: "When the injection is charted, the unit is deducted, the S4 register entry is created, and the sale_line_items row is queued for checkout.",
        bullets: [
          "Auto-deduction from inventory by batch on chart save",
          "S4 register row created in the same write",
          "Charges drop into the sale ready for total_cents at checkout",
        ],
        mock: "sale",
      },
    ],
    supporting: [
      {
        icon: ClipboardCheck,
        title: "Consent-gated",
        body: "Charting cannot start until the cosmetic consent is signed.",
      },
      {
        icon: FileCheck,
        title: "Replay any visit",
        body: "Compare today's map to last visit in a single tap.",
      },
      {
        icon: Activity,
        title: "Volume tracking",
        body: "Per-area lifetime volumes for safer dosing decisions.",
      },
      {
        icon: ShieldCheck,
        title: "AHPRA-ready",
        body: "Photos, consent and chart attach to the same appointment.",
      },
    ],
    closingPrimary: "Chart the way an injector thinks.",
    closingSecondary: "Map, dose, batch — one screen.",
  },

  /* -------------------- Conversations -------------------- */
  conversations: {
    hookSecondary: "in one calm thread.",
    expandedBody:
      "Two-way SMS, calls and email in a single inbox tied to the patient record. Reply from anywhere, get paid in the thread, and let the AI take the after-hours weight off your front desk.",
    capabilities: [
      {
        icon: MessagesSquare,
        title: "One inbox",
        body: "SMS, email and calls land together — channel set to sms · email · phone.",
      },
      {
        icon: DollarSign,
        title: "Pay in the thread",
        body: "Send a Stripe link; payment_requests.status flips to PAID without leaving the chat.",
      },
      {
        icon: Bot,
        title: "AI on call",
        body: "After hours, the AI replies, books and routes — never a missed message.",
      },
    ],
    highlights: [
      {
        eyebrow: "ONE THREAD PER PATIENT",
        title: (
          <>
            Every channel, <em>one conversation</em>.
          </>
        ),
        body: "SMS, calls and email collapse into a single thread tied to the client_uuid. Reception sees the full history without alt-tabbing between four apps.",
        bullets: [
          "Channels: sms · email · phone · webchat · instagram · facebook",
          "author_type staff · contact · automation distinguished at a glance",
          "Templates and merge fields drawn from the patient record",
        ],
        mock: "thread",
      },
      {
        eyebrow: "PAY-IN-THREAD CHECKOUT",
        title: (
          <>
            A reply that <em>collects revenue</em>.
          </>
        ),
        body: "Send a Stripe checkout link inside any message. payment_requests row is created with status PENDING, flips to PAID, and lands as a COMPLETED sale in POS — automatically.",
        bullets: [
          "stripe_checkout_session_id on every request — fully reconciled",
          "Sale total_cents posts back to the patient wallet on PAID",
          "Read receipts: status PENDING · VIEWED · PAID · EXPIRED",
        ],
        mock: "sale",
      },
    ],
    supporting: [
      {
        icon: Bot,
        title: "AI receptionist",
        body: "Picks up missed calls and texts 24/7, books straight into the diary.",
      },
      {
        icon: Phone,
        title: "Recorded calls",
        body: "Twilio call_logs with transcript and a per-call AI summary.",
      },
      {
        icon: Repeat,
        title: "Instant answers",
        body: "Common SMS questions auto-replied by intent matching.",
      },
      {
        icon: Mail,
        title: "Campaigns built in",
        body: "Targeted SMS + email campaigns from the same inbox.",
      },
    ],
    closingPrimary: "Stop missing the patient.",
    closingSecondary: "Reply, book, get paid.",
  },

  /* -------------------- AI Receptionist -------------------- */
  "ai-receptionist": {
    hookSecondary: "answers while you treat.",
    expandedBody:
      "An AI that picks up every missed call and every after-hours SMS, books straight into the diary, and sends the booking link or quote — so reception can actually look the patient in the eye.",
    capabilities: [
      {
        icon: Phone,
        title: "Pick up every call",
        body: "Missed calls captured as call_logs with direction missed → resolved.",
      },
      {
        icon: Bot,
        title: "Books in the diary",
        body: "Writes appointments.status confirmed straight to the calendar.",
      },
      {
        icon: MessagesSquare,
        title: "Sends the link",
        body: "Booking page, intake form or quote — delivered in the thread.",
      },
    ],
    highlights: [
      {
        eyebrow: "24/7 FRONT DESK",
        title: (
          <>
            A receptionist who <em>never sleeps</em>.
          </>
        ),
        body: "Every missed call and after-hours text turns into a booked appointment, a saved lead or a routed message — handled before the next morning.",
        bullets: [
          "Twilio voice + AI greeting on missed calls",
          "Resolution status flips resolved with a transcript and summary",
          "Hand-off to staff when the question needs a human",
        ],
        mock: "thread",
      },
      {
        eyebrow: "BOOK STRAIGHT INTO THE DIARY",
        title: (
          <>
            From “hi” to <em>confirmed appointment</em>.
          </>
        ),
        body: "The AI knows your services, your injectors and your buffers — and writes a confirmed appointments row when the patient picks a time.",
        bullets: [
          "Reads services.duration_minutes and resource availability",
          "Creates appointments.status confirmed with starts_at and ends_at",
          "Sends SMS confirmation and reminder via reminders engine",
        ],
        mock: "appointment",
      },
    ],
    supporting: [
      {
        icon: Mic,
        title: "Call summaries",
        body: "Every call ends with a transcript and an AI-written summary.",
      },
      {
        icon: Activity,
        title: "Lead capture",
        body: "Unknown callers saved as leads with source DISCOVERY_CALL.",
      },
      {
        icon: ShieldCheck,
        title: "Knows the boundaries",
        body: "Won't quote clinical advice — escalates to a clinician instead.",
      },
      {
        icon: PlugZap,
        title: "Drops into the inbox",
        body: "Every exchange lands in the same Conversations thread.",
      },
    ],
    closingPrimary: "Never miss a patient again.",
    closingSecondary: "Even after hours.",
  },

  /* -------------------- Pay in Conversation -------------------- */
  "pay-in-conversation": {
    hookSecondary: "without leaving the chat.",
    expandedBody:
      "Send a Stripe checkout link in any message. The patient pays. The sale closes in POS — total_cents reconciled, GST calculated, receipt sent. No re-keying. No second tab.",
    capabilities: [
      {
        icon: DollarSign,
        title: "One link, one tap",
        body: "Stripe checkout session attached to the message, paid in seconds.",
      },
      {
        icon: CreditCard,
        title: "Lands in POS",
        body: "PAID flips a sales row to COMPLETED with the right line items.",
      },
      {
        icon: FileCheck,
        title: "GST handled",
        body: "gst_cents = round(total_cents / 11) — automatic, AU-inclusive.",
      },
    ],
    highlights: [
      {
        eyebrow: "STRIPE INSIDE THE INBOX",
        title: (
          <>
            A payment link <em>that becomes a sale</em>.
          </>
        ),
        body: "payment_requests row created on send. status walks PENDING → VIEWED → PAID. On PAID, a sales row appears in POS — already reconciled.",
        bullets: [
          "Read receipts at every status — PENDING · VIEWED · PAID · EXPIRED",
          "amount_cents tied to the message_id and conversation_id",
          "stripe_payment_intent_id on the sale for instant reconciliation",
        ],
        mock: "sale",
      },
      {
        eyebrow: "EVERY METHOD, ONE LEDGER",
        title: (
          <>
            Split-tender, <em>still in the thread</em>.
          </>
        ),
        body: "Patient pays half on a saved card, half from wallet credit? Each lands as a sale_payments row with the right method — no manual reconciliation.",
        bullets: [
          "method: EFT_POS · BANK_TRANSFER · CASH · WALLET · CARD_ON_FILE · GIFT_CARD",
          "wallet_credit_used_cents tracked on the sale",
          "Receipts auto-emailed; receipts.pdf attached to the thread",
        ],
        mock: "thread",
      },
    ],
    supporting: [
      {
        icon: Repeat,
        title: "Payment plans",
        body: "WEEKLY · FORTNIGHTLY · MONTHLY auto-charged from the thread.",
      },
      {
        icon: ShieldCheck,
        title: "Refunds, audited",
        body: "Stripe-integrated refunds write straight to the audit log.",
      },
      {
        icon: PlugZap,
        title: "Card-on-file",
        body: "Charge a saved card without sending a link.",
      },
      {
        icon: Activity,
        title: "Reconciled to Xero",
        body: "xero_contact_id reconciles the patient automatically.",
      },
    ],
    closingPrimary: "Send the link.",
    closingSecondary: "Close the sale.",
  },

  "unified-inbox": {
    hookSecondary: "where the front desk works.",
    expandedBody: "The Unified Inbox is a shared SMS workspace for your front desk, where every two-way conversation sits beside the client or lead record it belongs to. Triage what's unread, assign threads to the right person, and reply with canned templates that pull merge fields straight from the patient record — no copy-paste, no missed messages.",
    capabilities: [
      { icon: MessagesSquare, title: "Real Two-Way SMS", body: "Every inbound and outbound message lands as a typed thread, tracked through status queued, sent, delivered, read or failed." },
      { icon: FormInput, title: "Templates That Fill Themselves", body: "Canned replies merge fields from the linked client or lead record, so the patient's name and details drop in before you hit send." },
      { icon: Eye, title: "Nothing Slips", body: "An is_unread flag and a tidy open or closed status mean the desk always knows what still needs a human." },
    ],
    highlights: [
      {
        eyebrow: "TRIAGE AND ASSIGN",
        title: (
          <>
            {"Every thread "}<em>{"lands on the right desk"}</em>{"."}
          </>
        ),
        body: "Set assigned_to and the conversation belongs to one nurse or receptionist, not the whole team's anxiety. Tags and an open or closed status keep the queue clean as the day moves.",
        bullets: [
          "assigned_to routes each thread to one staff member: reception · nurse · therapist",
          "status open · closed and the is_unread flag keep triage honest",
          "tags[] and last_message_preview let you scan the queue at a glance",
        ],
        mock: "thread",
      },
      {
        eyebrow: "MERGE FROM THE RECORD",
        title: (
          <>
            {"Templates that "}<em>{"already know the patient"}</em>{"."}
          </>
        ),
        body: "Pick a canned template and merge fields pull live from the linked lead or client — first name, next action, skin_concerns — so each SMS reads as written for them. The reply is logged as message_type sms with direction outbound, tied to the same contact forever.",
        bullets: [
          "Merge fields draw from the contact: lead or client record, never re-typed",
          "Sends recorded as message_type sms · direction outbound · author_type staff",
          "Delivery tracked via provider_sid through status sent · delivered · read",
        ],
        mock: "audit",
      },
    ],
    supporting: [
      { icon: Repeat, title: "Scheduled Sends", body: "Queue a message with scheduled_for and it leaves at the right moment without anyone watching the clock." },
      { icon: ClipboardCheck, title: "Linked To The Record", body: "Each thread sits against its contact_type lead, client or anon, so context travels with the conversation." },
      { icon: ShieldCheck, title: "Clinic-Scoped", body: "Every inbox is bounded by clinic_id under row-level security, with data resident in Sydney." },
      { icon: FileCheck, title: "Internal Notes", body: "Drop a message_type internal_note with direction internal to brief a colleague without texting the patient." },
    ],
    closingPrimary: "Clear the inbox by lunch.",
    closingSecondary: "Triage, assign, reply, done.",
  },

  "calls": {
    hookSecondary: "land in the thread, recorded.",
    expandedBody: "Calls brings phone into the platform: place and receive calls in-app over Twilio, with each one recorded, transcribed, and summarised. Every call drops into the same conversation thread as a call_log entry, alongside the SMS and email already there. It is in beta and rolling out clinic by clinic, so expect the surface to keep sharpening as it lands.",
    capabilities: [
      { icon: Phone, title: "In-app calling", body: "Dial and answer over Twilio without leaving the patient's thread, with direction logged as inbound, outbound, or missed." },
      { icon: Mic, title: "Recorded and transcribed", body: "Each connected call captures a recording_url and full transcript automatically, no toggles to remember." },
      { icon: Activity, title: "Beta, rolling out", body: "Calls is in active beta and switching on clinic by clinic, so a few edges are still settling as it reaches your centre." },
    ],
    highlights: [
      {
        eyebrow: "ONE THREAD, EVERY CHANNEL",
        title: (
          <>
            {"The call lives "}<em>{"next to the texts"}</em>{"."}
          </>
        ),
        body: "A call is not a separate silo here. It arrives in the conversation as a message_type call_log, sitting in sequence with the sms and email so the whole exchange reads as one calm history.",
        bullets: [
          "Lands inline as message_type call_log, threaded by last_message_at",
          "direction: inbound · outbound · missed, each marked at a glance",
          "twilio_call_sid and duration_seconds stored for an honest record",
        ],
        mock: "thread",
      },
      {
        eyebrow: "READ IT IN SECONDS",
        title: (
          <>
            {"An AI summary "}<em>{"instead of a replay"}</em>{"."}
          </>
        ),
        body: "You should not have to re-listen to a five-minute call to know what happened. Every call carries an ai_summary over the raw transcript, and a resolution_status so the next person knows whether anything is still open.",
        bullets: [
          "ai_summary distils the call; transcript kept for the full word",
          "resolution_status: resolved · unresolved flags the follow-up",
          "handled_by ties the call to the staff member who took it",
        ],
        mock: "audit",
      },
    ],
    supporting: [
      { icon: Bot, title: "Missed, not lost", body: "A direction of missed still creates a call_log, so nothing slips past unanswered." },
      { icon: FileCheck, title: "Full transcript", body: "Every recording is transcribed to searchable text held against the call_log record." },
      { icon: ShieldCheck, title: "Clinic-scoped", body: "Call logs sit behind the clinic_id RLS boundary, with data resident in Sydney." },
      { icon: ClipboardCheck, title: "Owned by name", body: "handled_by records who fielded each call, so accountability is built in rather than assumed." },
    ],
    closingPrimary: "Take the call, keep the record.",
    closingSecondary: "Recorded, summarised, in the thread.",
  },

  "ai-instant-answers": {
    hookSecondary: "answers the question while you sleep.",
    expandedBody: "AI Instant Answers reads every inbound SMS, recognises the common ones — opening hours, pricing, parking, aftercare — and replies in seconds, 24/7. Each reply is sent as author_type automation with message_type sms, so it sits plainly in the thread alongside your team's messages. When the question is unfamiliar or even slightly clinical, it stays quiet and hands the conversation to a person.",
    capabilities: [
      { icon: Bot, title: "Replies in seconds", body: "Inbound texts are intent-matched and answered automatically, landing in the thread as author_type automation, direction outbound, status delivered." },
      { icon: ShieldCheck, title: "Never clinical", body: "Anything touching treatment, dosing or symptoms is escalated to a nurse or therapist — it answers logistics, never advice." },
      { icon: Activity, title: "Always awake", body: "Questions at 11pm get the same calm reply as questions at 11am, with no one rostered on." },
    ],
    highlights: [
      {
        eyebrow: "MATCHED BY INTENT",
        title: (
          <>
            {"It knows the difference between "}<em>{"\"how much\" and \"is this normal\""}</em>{"."}
          </>
        ),
        body: "Common, answerable questions get an instant reply; everything else is left for a human. The model matches intent, not keywords, so phrasing never trips it up.",
        bullets: [
          "Auto-handled intents: opening hours · pricing · parking · aftercare logistics",
          "Replies sent as author_type automation, message_type sms, direction outbound",
          "Uncertain or clinical questions skip the auto-reply and wait for staff",
        ],
        mock: "thread",
      },
      {
        eyebrow: "A CLEAN HANDOFF",
        title: (
          <>
            {"When it isn't sure, it "}<em>{"steps back"}</em>{"."}
          </>
        ),
        body: "No guessing, no almost-right answers. The conversation stays open and assigned for your reception or nursing team to pick up, with the full context already in the thread.",
        bullets: [
          "Escalations leave conversations.status open for staff follow-up",
          "Clinical queries route to staff.role nurse · therapist — never auto-answered",
          "Every automation reply is logged in messages with provider_sid and metadata",
        ],
        mock: "audit",
      },
    ],
    supporting: [
      { icon: Eye, title: "Visible as automation", body: "Auto-replies are clearly marked author_type automation so staff always know what was machine-sent." },
      { icon: MessagesSquare, title: "Stays in thread", body: "Every answer appears in the same conversation, never a separate system message or detached log." },
      { icon: FileCheck, title: "Fully audited", body: "Each reply is written to messages with status, scheduled_for and provider_sid for a complete record." },
      { icon: Syringe, title: "Clinician-gated", body: "Aftercare wording stays logistical; anything clinical is handed to a registered practitioner." },
    ],
    closingPrimary: "Answer the easy ones instantly.",
    closingSecondary: "Escalate the rest to a human.",
  },

  "automations": {
    hookSecondary: "that run the clinic for you.",
    expandedBody: "Automations is a visual workflow builder for your clinic. A trigger fires when something real happens — an appointment booked, a lead created, a payment_requests row reaching PAID, an appointments.status of no_show — then conditions branch the path and actions do the work: send an sms or email, create a task, wait, or charge a card. When you would rather describe than draw, the AI assistant turns a plain-English sentence into a working workflow you can review and edit.",
    capabilities: [
      { icon: Workflow, title: "Real triggers", body: "Start a flow the moment leads.status changes, an appointment is booked, or appointments.status flips to no_show." },
      { icon: Bot, title: "AI drafts it", body: "Describe the outcome in plain English and the assistant builds the trigger, branches, and actions for you to approve." },
      { icon: Zap, title: "Branching logic", body: "Split the path on conditions so a CLOG_SET lead and an EXPIRED one never get the same message." },
    ],
    highlights: [
      {
        eyebrow: "TRIGGERS TO ACTIONS",
        title: (
          <>
            {"From a single event to a "}<em>{"whole sequence"}</em>{"."}
          </>
        ),
        body: "Every workflow begins with a trigger and ends with something done, with branches in between. Wait a day, check a condition, then send an sms, draft an email, create a task, or raise a charge — all in one canvas.",
        bullets: [
          "Triggers: appointment booked · lead created · payment_requests.status PAID · appointments.status no_show",
          "Actions: send sms · email · create task · wait · charge",
          "Branch on leads.status NOT_BOOKED · OFFERED · BOOKED · CLOG_SET · COMPLETED",
        ],
        mock: "audit",
      },
      {
        eyebrow: "DESCRIBE IT, DON'T DRAW IT",
        title: (
          <>
            {"An AI assistant that "}<em>{"writes the workflow"}</em>{"."}
          </>
        ),
        body: "Type \"text a reminder when an appointment is a no_show, then offer a rebook\" and the assistant lays out the trigger, condition, and actions. You review each node, adjust the wait or the message, and switch it on.",
        bullets: [
          "Plain-English prompt becomes a trigger → condition → action chain",
          "Generated messages send as message_type sms or email, direction outbound",
          "Charge actions create a payment_requests row with amount_cents, status PENDING",
        ],
        mock: "thread",
      },
    ],
    supporting: [
      { icon: Repeat, title: "Timed waits", body: "Insert a wait step so follow-ups land hours or days later, using scheduled_for on the queued message." },
      { icon: CreditCard, title: "Charge on cue", body: "Trigger a payment_requests row the instant a lead reaches CONSULT_PURCHASED, GST inclusive at round(total_cents / 11)." },
      { icon: ShieldCheck, title: "Clinic-scoped", body: "Every workflow and message it sends is bound to clinic_id under RLS, so nothing crosses a tenant boundary." },
      { icon: ClipboardCheck, title: "Auditable runs", body: "Each action writes a message with author_type automation, so every step a flow took is on the record." },
    ],
    closingPrimary: "Stop chasing every step.",
    closingSecondary: "Trigger, branch, done.",
  },

  "campaigns": {
    hookSecondary: "that respect every consent line.",
    expandedBody: "Campaigns sends targeted email and SMS to audiences built from your real data, not a static list you maintain by hand. Segment on clients.status INACTIVE, last_treatment_at, division SKIN or DMD, or a lead's ai_score_tier, pick a template, and schedule the send. Every message respects consent and stays inside AHPRA cosmetic advertising guidelines.",
    capabilities: [
      { icon: Megaphone, title: "Real-data segments", body: "Build an audience from clients.status INACTIVE, last_treatment_at and division SKIN/DMD instead of exporting a spreadsheet." },
      { icon: Calendar, title: "Scheduled sends", body: "Set messages.scheduled_for and the campaign goes out at the right hour without anyone at the desk." },
      { icon: ShieldCheck, title: "AHPRA-aware", body: "Consent is enforced and copy is held to the cosmetic guidelines, so no before/after promises slip through." },
    ],
    highlights: [
      {
        eyebrow: "AUDIENCE FROM LIVE DATA",
        title: (
          <>
            {"The segment is a query, "}<em>{"never a stale list"}</em>{"."}
          </>
        ),
        body: "You describe who you want and Campaigns assembles them from the same tables your team works in every day. Re-run it tomorrow and the audience is already up to date.",
        bullets: [
          "Filter on clients.status INACTIVE and last_treatment_at to win back lapsed treatment",
          "Split by division SKIN · DMD · BOTH so the message fits the service",
          "Target warm leads by ai_score_tier with ai_score_reasoning behind every pick",
        ],
        mock: "client",
      },
      {
        eyebrow: "TEMPLATES, SCHEDULED, TRACKED",
        title: (
          <>
            {"Write once, send "}<em>{"on your terms"}</em>{"."}
          </>
        ),
        body: "Start from the template library, choose email or SMS, and queue it for the moment that lands best. Each recipient becomes a real message you can follow from queued through to read.",
        bullets: [
          "message_type sms or email, drawn from a shared template library",
          "messages.scheduled_for queues the send; status moves queued · sent · delivered · read",
          "author_type automation keeps campaign sends distinct from staff replies in the thread",
        ],
        mock: "thread",
      },
    ],
    supporting: [
      { icon: MessagesSquare, title: "Email and SMS", body: "Run the same campaign across message_type email and sms without rebuilding the audience." },
      { icon: Activity, title: "Delivery tracking", body: "Watch status delivered and read per recipient instead of guessing whether it landed." },
      { icon: FileCheck, title: "Template library", body: "Reuse approved, on-brand copy so every send starts compliant rather than from a blank page." },
      { icon: TrendingUp, title: "Reactivation built in", body: "Pair last_treatment_at with clients.status INACTIVE to bring quiet clients back in." },
    ],
    closingPrimary: "Reach the right clients.",
    closingSecondary: "Segment, schedule, send.",
  },

  "lead-management": {
    hookSecondary: "scored before you reply.",
    expandedBody: "Lead Management is a CRM pipeline built directly on the leads table, moving every enquiry through a fixed status flow from NOT_BOOKED to COMPLETED. Each lead is scored by AI on arrival, with ai_score, ai_score_tier, ai_score_reasoning and a suggested ai_next_action, so your reception team always knows who to call first. Saved views slice the pipeline however your clinic works, and a single conversion sets client_uuid to turn the lead into a client.",
    capabilities: [
      { icon: TrendingUp, title: "Scored on arrival", body: "Every lead lands with an ai_score and ai_score_tier so the hottest enquiries surface at the top of the list." },
      { icon: Workflow, title: "One clear pipeline", body: "Leads advance through status NOT_BOOKED, OFFERED, BOOKED, CLOG_SET, CONSULT_PURCHASED and COMPLETED without guesswork." },
      { icon: Eye, title: "Views that stick", body: "Saved filters on source, division and skin_concerns[] mean your morning list is ready before you open it." },
    ],
    highlights: [
      {
        eyebrow: "AI SCORING, NOT GUESSWORK",
        title: (
          <>
            {"Know who to call "}<em>{"before the day starts"}</em>{"."}
          </>
        ),
        body: "Each lead carries a transparent score with the reasoning written out in plain language, not a black-box number. The platform also proposes the next move, so reception spends time calling rather than deciding.",
        bullets: [
          "ai_score and ai_score_tier rank the pipeline at a glance",
          "ai_score_reasoning shows the why behind every tier",
          "ai_next_action suggests the move, timestamped at ai_scored_at",
        ],
        mock: "client",
      },
      {
        eyebrow: "PIPELINE TO PATIENT",
        title: (
          <>
            {"From first enquiry to "}<em>{"booked and converted"}</em>{"."}
          </>
        ),
        body: "The status flow mirrors how a cosmetic clinic actually qualifies and books, with CANCELLED and EXPIRED handled cleanly rather than left hanging. When a lead converts, client_uuid is set and the record carries its conversion_outcome forward.",
        bullets: [
          "status NOT_BOOKED to COMPLETED, with CANCELLED and EXPIRED",
          "source PURCHASED_CONSULT and DISCOVERY_CALL tracked per lead",
          "conversion sets client_uuid; non_conversion_reason captured when it doesn't",
        ],
        mock: "audit",
      },
    ],
    supporting: [
      { icon: FormInput, title: "Skin concerns captured", body: "skin_concerns[] and properties (jsonb) hold the detail each consult needs without forcing it into rigid fields." },
      { icon: Activity, title: "Division aware", body: "Filter and route by division across DMD, SKIN or BOTH so each side of the clinic sees its own pipeline." },
      { icon: Phone, title: "Last touch in view", body: "last_contacted_at keeps follow-ups honest and stops warm leads going quiet." },
      { icon: ShieldCheck, title: "Isolated per clinic", body: "Every lead is scoped by clinic_id under RLS, with data resident in Sydney." },
    ],
    closingPrimary: "Score the lead. Work the pipeline.",
    closingSecondary: "Book, convert, and never lose track.",
  },

  "capture-forms": {
    hookSecondary: "turn the website into a pipeline.",
    expandedBody: "Capture Forms are branded, embeddable enquiry forms that live on your clinic's own website and write straight into your pipeline. Each submission creates a leads row, maps answers into leads.properties (jsonb) and skin_concerns[], stamps the source, and can fire an automation the moment it lands. No exports, no inbox triage — a website visitor becomes a tracked lead in seconds.",
    capabilities: [
      { icon: FormInput, title: "Form to lead", body: "Every submission creates a leads row with status NOT_BOOKED, ready for the next action." },
      { icon: Zap, title: "Instant reply", body: "A new enquiry can trigger an automation — like an instant outbound SMS — before the visitor closes the tab." },
      { icon: TrendingUp, title: "Tracked source", body: "UTM and channel data land on the lead so you know which campaign actually filled the pipeline." },
    ],
    highlights: [
      {
        eyebrow: "STRAIGHT INTO THE PIPELINE",
        title: (
          <>
            {"A submission isn't an email — it's a "}<em>{"scored lead"}</em>{"."}
          </>
        ),
        body: "The form maps each field to a real column, so concerns and contact details arrive structured, not as free text in someone's inbox. The lead is created ready for AI scoring and the next action.",
        bullets: [
          "Answers map into leads.properties (jsonb) and skin_concerns[]",
          "source set to PURCHASED_CONSULT or DISCOVERY_CALL on creation",
          "Created with status NOT_BOOKED, awaiting ai_score and ai_next_action",
        ],
        mock: "client",
      },
      {
        eyebrow: "REPLY BEFORE THEY COOL",
        title: (
          <>
            {"The fastest reply is the one that's "}<em>{"already sent"}</em>{"."}
          </>
        ),
        body: "A capture form can fire an automation the instant it's submitted, so a warm enquiry gets an answer in seconds. Every touch is logged as a message against the lead's conversation.",
        bullets: [
          "Triggers a message with author_type automation, direction outbound",
          "Tracked through status queued · sent · delivered · read",
          "Stamps last_contacted_at the moment the SMS goes out",
        ],
        mock: "thread",
      },
    ],
    supporting: [
      { icon: Megaphone, title: "Marketing attribution", body: "UTM parameters are captured into leads.properties so spend ties back to real enquiries." },
      { icon: Syringe, title: "Division routing", body: "Route enquiries to the right team by setting division to DMD, SKIN or BOTH." },
      { icon: ShieldCheck, title: "Tenant-safe", body: "Every captured lead is scoped to your clinic_id under row-level security from the first byte." },
      { icon: Sparkles, title: "Branded to you", body: "Embed a form styled to your centre's brand, not a generic third-party widget." },
    ],
    closingPrimary: "Stop losing the visitor.",
    closingSecondary: "Capture, score, reply.",
  },

  "reviews": {
    hookSecondary: "that respect the rules.",
    expandedBody: "Reviews requests, collects, moderates and replies to patient feedback in one place. An automation fires the moment an appointment reaches status completed, inviting the patient to share their experience — and every reply is held for moderation before it ever goes public, so nothing reaches Google without a human eye. Service and experience reviews are framed to stay within AHPRA's restrictions on testimonials about regulated treatments.",
    capabilities: [
      { icon: Repeat, title: "Auto-request", body: "A review invite is queued automatically when an appointment hits status completed, with no manual chasing." },
      { icon: Eye, title: "Moderate first", body: "Every incoming review waits for staff approval before it can be published or funnelled outward." },
      { icon: Star, title: "Reply in-app", body: "Respond to each review from the same thread, recorded against the patient like any other message author_type." },
    ],
    highlights: [
      {
        eyebrow: "REQUEST THEN MODERATE",
        title: (
          <>
            {"Nothing goes public "}<em>{"until you say so"}</em>{"."}
          </>
        ),
        body: "The request is triggered by automation off appointments.status completed, then the patient's reply lands in a moderation queue rather than on the public web. You approve, hold, or decline — only approved reviews surface in dashboards and reporting.",
        bullets: [
          "Trigger: automation fires on appointments.status completed",
          "Invite delivered as a message with message_type sms or email",
          "Held for approval before publish — scoped to clinic_id under RLS",
        ],
        mock: "audit",
      },
      {
        eyebrow: "FUNNEL THE HAPPY ONES",
        title: (
          <>
            {"Send your best patients "}<em>{"to Google"}</em>{"."}
          </>
        ),
        body: "Happy patients are gently routed toward your public Google profile, while everything else stays an internal, private signal you can act on. The whole exchange lives in the thread, replies and all, attributed to staff so accountability is never in question.",
        bullets: [
          "Replies attributed to author_type staff with direction outbound",
          "Delivery tracked by status queued · sent · delivered · failed",
          "Frame around experience and service — AHPRA-safe, no treatment claims",
        ],
        mock: "thread",
      },
    ],
    supporting: [
      { icon: ShieldCheck, title: "AHPRA-aware", body: "Copy and prompts steer reviews toward experience and service, away from testimonials about regulated treatments." },
      { icon: Activity, title: "Surfaced in reporting", body: "Approved reviews feed straight into dashboards alongside the rest of your clinic metrics." },
      { icon: MessagesSquare, title: "One thread", body: "Requests and replies sit in the same conversation as sms, email and the patient's other channels." },
      { icon: ClipboardCheck, title: "Full trail", body: "Every approval, decline and reply is logged append-only and scoped to your clinic_id." },
    ],
    closingPrimary: "Ask at the right moment.",
    closingSecondary: "Approve, reply, publish.",
  },

  "loyalty": {
    hookSecondary: "tracked on the client record.",
    expandedBody: "Loyalty rewards repeat patients without turning your clinic into a points arcade. Earn on visits or spend, redeem at the till as a sale discount, and watch real repeat behaviour surface from last_treatment_at and lifecycle_stage — all tied to the same client record your team already trusts.",
    capabilities: [
      { icon: Star, title: "Earn on visits", body: "Points or visit counts accrue against the client record every time a sale is recorded at the till." },
      { icon: CreditCard, title: "Redeem at checkout", body: "Rewards apply as a discount on the sale, reducing amount_cents before the GST-inclusive total is rendered." },
      { icon: Activity, title: "See who returns", body: "Repeat behaviour reads off last_treatment_at and lifecycle_stage, so loyal patients are visible, not guessed at." },
    ],
    highlights: [
      {
        eyebrow: "EARN AT THE TILL",
        title: (
          <>
            {"Loyalty that lives on the "}<em>{"sale"}</em>{", not a side app."}
          </>
        ),
        body: "Every reward is anchored to the client record and the sale it came from, so nothing drifts out of sync. Points or visits accrue on checkout and redeem the same way — as a clean line on the receipt.",
        bullets: [
          "Rewards redeem as a sale discount against amount_cents, rendered $x,xxx.xx",
          "GST stays inclusive: round(total_cents / 11) recalculated after the discount",
          "Every accrual scoped to clinic_id under RLS — no leakage across tenants",
        ],
        mock: "sale",
      },
      {
        eyebrow: "REPEAT BEHAVIOUR, MEASURED",
        title: (
          <>
            {"Know who's "}<em>{"actually coming back"}</em>{"."}
          </>
        ),
        body: "Loyalty isn't a vanity counter — it tracks the signals that matter for retention. Patient cadence surfaces from last_treatment_at, and lifecycle_stage tells you who's lapsing before they're gone.",
        bullets: [
          "Repeat cadence derived from last_treatment_at on the client record",
          "lifecycle_stage flags active, at-risk and lapsed patients at a glance",
          "Pairs with memberships and packages so recurring patients compound, not overlap",
        ],
        mock: "membership",
      },
    ],
    supporting: [
      { icon: Repeat, title: "Visit or points", body: "Choose visit-based or points-based earning per clinic, whichever suits how you reward return patients." },
      { icon: Heart, title: "Pairs with memberships", body: "Loyalty sits alongside memberships and packages rather than competing with them for the same patient." },
      { icon: ShieldCheck, title: "Tenant-safe by default", body: "Balances and redemptions are isolated by clinic_id under RLS, with data resident in Sydney." },
      { icon: Eye, title: "Quiet by design", body: "No badges, no confetti — rewards read as a discount line on the sale and a number on the client record." },
    ],
    closingPrimary: "Reward the patients who return.",
    closingSecondary: "Earn, track, redeem — quietly.",
  },
};

/* -------------------------------------------------------------------------- */
/*  Generic fallbacks                                                          */
/* -------------------------------------------------------------------------- */

const GENERIC_CAPABILITIES: Capability[] = [
  {
    icon: Zap,
    title: "Set up in minutes",
    body: "Sensible defaults out of the box — switch on and start working today.",
  },
  {
    icon: Repeat,
    title: "Synced across the clinic",
    body: "Tied to the patient record and reflected on every screen in real time.",
  },
  {
    icon: ShieldCheck,
    title: "AHPRA-aware",
    body: "Tenant-scoped via clinic_id with the audit log capturing every change.",
  },
];

const GENERIC_HIGHLIGHTS = (feature: Feature): HighlightCopy[] => [
  {
    eyebrow: "BUILT INTO THE PLATFORM",
    title: (
      <>
        {feature.name}, <em>where you already work</em>.
      </>
    ),
    body: feature.oneLiner,
    bullets: [
      "Lives next to clients, appointments and sales — never a side tool",
      "Tenant-scoped by clinic_id with RLS on every read",
      "Reflected in dashboards, reports and the Ruevii AI command bar",
    ],
    mock: "client",
  },
  {
    eyebrow: "DESIGNED FOR THE CLINIC",
    title: (
      <>
        Quiet by default, <em>powerful when you need it</em>.
      </>
    ),
    body: "Designed with the same restraint as the rest of Ruevii — no dashboards-within-dashboards, no surprise modals, no noisy notifications.",
    bullets: [
      "Keyboard-first workflows that respect your time",
      "Permissioned by staff.role — admin · therapist · nurse · reception",
      "Every action captured in the append-only audit log",
    ],
    mock: "audit",
  },
];

const GENERIC_SUPPORTING: SupportingCard[] = [
  {
    icon: PlugZap,
    title: "Works with your stack",
    body: "Stripe, Xero, Tyro and Twilio plug in without extra setup.",
  },
  {
    icon: Activity,
    title: "Reportable",
    body: "Flows straight into the reporting + dashboards layer.",
  },
  {
    icon: ShieldCheck,
    title: "Audit-friendly",
    body: "Every change captured by the append-only audit trail.",
  },
  {
    icon: Repeat,
    title: "Multi-location aware",
    body: "Works the same whether you're one room or ten clinics.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Mini schema-accurate mockups                                               */
/* -------------------------------------------------------------------------- */

function MiniClientCard() {
  return (
    <div className="p-4 text-[12px] leading-snug">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-[color-mix(in_srgb,var(--color-blue)_25%,white)] grid place-items-center font-mono text-[11px] text-[var(--color-blue-ink)]">
            AK
          </span>
          <div>
            <p className="text-[13px] font-medium text-black leading-tight">
              Ava Kowalski
            </p>
            <p
              className="font-mono text-[10.5px] text-[var(--color-charcoal)] leading-tight"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              DEMO-001 · SKIN
            </p>
          </div>
        </div>
        <span
          className="font-mono text-[10px] tracking-[0.1em] uppercase px-1.5 py-[2px] rounded-full bg-[color-mix(in_srgb,var(--color-blue)_18%,white)] text-[var(--color-blue-ink)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          ACTIVE
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 pt-3 border-t border-[var(--color-greige-2)]">
        <Field label="Last treatment" value="14 May 2026" />
        <Field label="Lifecycle stage" value="Returning" />
        <Field label="Division" value="SKIN" />
        <Field label="Referral" value="INSTAGRAM" />
      </div>
    </div>
  );
}

function MiniSaleRow() {
  return (
    <div className="p-4 text-[12px] leading-snug">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p
            className="font-mono text-[10.5px] text-[var(--color-charcoal)] leading-tight"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            S-10428
          </p>
          <p className="text-[13px] font-medium text-black leading-tight">
            Ava Kowalski
          </p>
        </div>
        <span
          className="font-mono text-[10px] tracking-[0.1em] uppercase px-1.5 py-[2px] rounded-full bg-[color-mix(in_srgb,var(--color-blue)_18%,white)] text-[var(--color-blue-ink)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          COMPLETED
        </span>
      </div>
      <div className="border-t border-[var(--color-greige-2)] pt-3 flex flex-col gap-1.5">
        <Line label="Anti-wrinkle · 20u" cents={48000} />
        <Line label="Lip filler · 1ml" cents={48000} />
        <Line label="Skin booster" cents={36000} />
      </div>
      <div className="mt-3 pt-3 border-t border-[var(--color-greige-2)] flex items-center justify-between">
        <span
          className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-charcoal)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          total_cents · {fmtCents(52600)}
        </span>
        <span
          className="font-mono text-[10.5px] text-[var(--color-charcoal)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          GST {fmtCents(4782)}
        </span>
      </div>
    </div>
  );
}

function MiniThread() {
  return (
    <div className="p-4 text-[12px] leading-snug">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[13px] font-medium text-black leading-tight">
          Ava Kowalski
        </p>
        <span
          className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--color-charcoal)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          channel · sms
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Bubble direction="inbound">
          Hi! Can I move my Friday 2:30 to next Tuesday morning?
        </Bubble>
        <Bubble direction="outbound">
          Of course — Tuesday 9:45 with Dr Hale works. Shall I confirm?
        </Bubble>
        <Bubble direction="outbound" payment>
          Payment request · {fmtCents(15000)} deposit · PENDING
        </Bubble>
      </div>
    </div>
  );
}

function MiniAppointment() {
  return (
    <div className="p-4 text-[12px] leading-snug">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[13px] font-medium text-black leading-tight">
          Cosmetic consultation
        </p>
        <span
          className="font-mono text-[10px] tracking-[0.1em] uppercase px-1.5 py-[2px] rounded-full bg-[color-mix(in_srgb,var(--color-blue)_18%,white)] text-[var(--color-blue-ink)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          confirmed
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 pt-3 border-t border-[var(--color-greige-2)]">
        <Field label="Client" value="Ava Kowalski" />
        <Field label="Resource" value="Dr Hale · Room 2" />
        <Field label="Starts" value="Tue 9:45 AM" />
        <Field label="Duration" value="30 min" />
      </div>
      <div
        className="mt-3 pt-3 border-t border-[var(--color-greige-2)] font-mono text-[10.5px] text-[var(--color-blue-ink)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        consent.signed · ahpra.cooling_off ✓
      </div>
    </div>
  );
}

function MiniAudit() {
  return (
    <div className="p-4 text-[12px] leading-snug">
      <p
        className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-charcoal)] mb-3"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        audit_log · append-only
      </p>
      <div className="flex flex-col gap-2.5">
        <AuditRow
          action="sales.update"
          actor="reception"
          detail="status PAYMENT_PLAN → COMPLETED"
        />
        <AuditRow
          action="prescriptions.create"
          actor="Dr Hale"
          detail="S4 · botulinum · batch B-2049"
        />
        <AuditRow
          action="consent.sign"
          actor="Ava Kowalski"
          detail="cosmetic_v3 · DEMO-001"
        />
        <AuditRow
          action="appointments.update"
          actor="ai_receptionist"
          detail="status confirmed · 9:45 AM"
        />
      </div>
    </div>
  );
}

function MiniMembership() {
  return (
    <div className="p-4 text-[12px] leading-snug">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[13px] font-medium text-black leading-tight">
            Glow Member · Monthly
          </p>
          <p
            className="font-mono text-[10.5px] text-[var(--color-charcoal)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            billing_period · MONTHLY
          </p>
        </div>
        <span
          className="font-mono text-[10px] tracking-[0.1em] uppercase px-1.5 py-[2px] rounded-full bg-[color-mix(in_srgb,var(--color-blue)_18%,white)] text-[var(--color-blue-ink)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          ACTIVE
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 pt-3 border-t border-[var(--color-greige-2)]">
        <Field label="price_cents" value={fmtCents(19900)} />
        <Field label="next_billing_at" value="01 Jul 2026" />
        <Field label="sessions / cycle" value="2" />
        <Field label="started_at" value="14 Jan 2026" />
      </div>
    </div>
  );
}

function MockFor(kind: HighlightCopy["mock"]) {
  switch (kind) {
    case "sale":
      return <MiniSaleRow />;
    case "thread":
      return <MiniThread />;
    case "appointment":
      return <MiniAppointment />;
    case "membership":
      return <MiniMembership />;
    case "audit":
      return <MiniAudit />;
    case "client":
    default:
      return <MiniClientCard />;
  }
}

/* -------------------------------------------------------------------------- */
/*  Small mockup helpers                                                       */
/* -------------------------------------------------------------------------- */

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--color-charcoal)] mb-0.5"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </p>
      <p className="text-[12px] text-black leading-tight">{value}</p>
    </div>
  );
}

function Line({ label, cents }: { label: string; cents: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] text-black">{label}</span>
      <span
        className="font-mono text-[11.5px] text-[var(--color-charcoal)] tabular-nums"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {fmtCents(cents)}
      </span>
    </div>
  );
}

function Bubble({
  children,
  direction,
  payment,
}: {
  children: ReactNode;
  direction: "inbound" | "outbound";
  payment?: boolean;
}) {
  const inbound = direction === "inbound";
  return (
    <div
      className={[
        "max-w-[85%] px-3 py-2 rounded-[10px] text-[12px] leading-snug",
        inbound
          ? "self-start bg-[var(--color-greige-2)] text-black"
          : payment
            ? "self-end bg-[color-mix(in_srgb,var(--color-blue)_20%,white)] text-[var(--color-blue-ink)] border border-[color-mix(in_srgb,var(--color-blue)_35%,white)]"
            : "self-end bg-black text-white",
      ].join(" ")}
    >
      {payment ? (
        <span
          className="font-mono text-[10.5px] tracking-[0.06em]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {children}
        </span>
      ) : (
        children
      )}
    </div>
  );
}

function AuditRow({
  action,
  actor,
  detail,
}: {
  action: string;
  actor: string;
  detail: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span
        aria-hidden
        className="mt-[6px] w-[5px] h-[5px] rounded-full shrink-0"
        style={{ background: "var(--color-blue-ink)" }}
      />
      <div className="min-w-0 flex-1">
        <p
          className="font-mono text-[11px] text-black leading-tight"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {action}
        </p>
        <p
          className="font-mono text-[10.5px] text-[var(--color-charcoal)] leading-snug"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {actor} · {detail}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero-side ProductScreenshot per feature                                    */
/* -------------------------------------------------------------------------- */

function HeroVisualFor(feature: Feature) {
  // Pick a heroic mock per slug. Falls back to the client card.
  const slug = feature.slug;
  const url = `features/${slug}`;
  let inner: ReactNode = <MiniClientCard />;
  if (slug === "ruevii-ai" || slug === "ai-receptionist") inner = <MiniThread />;
  else if (slug === "conversations" || slug === "pay-in-conversation")
    inner = <MiniSaleRow />;
  else if (slug === "ahpra-compliance" || slug === "compliance-audit")
    inner = <MiniAudit />;
  else if (slug === "injectable-charting" || slug === "clients-emr")
    inner = <MiniClientCard />;
  else if (slug === "memberships" || slug === "payment-plans")
    inner = <MiniMembership />;
  else if (
    slug === "smart-calendar" ||
    slug === "calendar" ||
    slug === "online-booking" ||
    slug === "reminders" ||
    slug === "waitlist"
  )
    inner = <MiniAppointment />;
  else if (
    slug === "payments-pos" ||
    slug === "invoices" ||
    slug === "refunds" ||
    slug === "quotes"
  )
    inner = <MiniSaleRow />;
  return (
    <ProductScreenshot url={url} className="max-w-[480px] ml-auto">
      {inner}
    </ProductScreenshot>
  );
}

/* -------------------------------------------------------------------------- */
/*  Comparison-table copy                                                      */
/* -------------------------------------------------------------------------- */

function comparisonFor(feature: Feature): {
  youReplace: { name: string; monthly: string }[];
  ruevii: { name: string; included: string[] };
  rueviiMonthly: string;
} {
  // A few feature-specific replacements; everything else uses a sensible default set.
  const slug = feature.slug;
  const universal = {
    ruevii: {
      name: `${feature.name} — included`,
      included: [
        "Lives inside the same client record",
        "Reportable, auditable and AHPRA-aware",
        "No extra logins for your team",
      ],
    },
    rueviiMonthly: "$0",
  };

  if (slug === "conversations" || slug === "ai-receptionist") {
    return {
      youReplace: [
        { name: "Twilio (SMS + voice)", monthly: "$60" },
        { name: "Front / Intercom inbox", monthly: "$74" },
        { name: "After-hours answering service", monthly: "$220" },
        { name: "Mailchimp marketing", monthly: "$25" },
      ],
      ...universal,
    };
  }
  if (slug === "pay-in-conversation" || slug === "payments-pos") {
    return {
      youReplace: [
        { name: "Stripe Invoices add-on", monthly: "$45" },
        { name: "Tyro terminal reporting", monthly: "$59" },
        { name: "Paper receipt printer roll", monthly: "$18" },
        { name: "Spreadsheet reconciliation (hours)", monthly: "$160" },
      ],
      ...universal,
    };
  }
  if (slug === "injectable-charting" || slug === "ahpra-compliance") {
    return {
      youReplace: [
        { name: "Paper face-map charts", monthly: "$22" },
        { name: "Consent app (DocuSign-style)", monthly: "$35" },
        { name: "S4 paper register + lockbox", monthly: "$45" },
        { name: "External audit consultant (amortised)", monthly: "$180" },
      ],
      ...universal,
    };
  }
  if (slug === "ruevii-ai") {
    return {
      youReplace: [
        { name: "Generic ChatGPT seats", monthly: "$60" },
        { name: "BI dashboard subscription", monthly: "$95" },
        { name: "Reporting analyst (amortised)", monthly: "$240" },
        { name: "Manual lapsed-client outreach (hours)", monthly: "$120" },
      ],
      ...universal,
    };
  }

  // Default — generic point-tools every clinic ends up paying for.
  return {
    youReplace: [
      { name: "Calendly (Pro)", monthly: "$20" },
      { name: "Mailchimp marketing", monthly: "$25" },
      { name: "Paper consent + scan-to-PDF", monthly: "$18" },
      { name: "Spreadsheet reporting (hours)", monthly: "$140" },
    ],
    ...universal,
  };
}

/* -------------------------------------------------------------------------- */
/*  Section helpers                                                            */
/* -------------------------------------------------------------------------- */

function SectionLight({
  children,
  className,
  id,
  tint,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tint?: boolean;
}) {
  return (
    <section
      id={id}
      className={["w-full", className ?? ""].join(" ")}
      style={{
        background: tint
          ? "color-mix(in srgb, var(--color-paper) 80%, white)"
          : "var(--color-white)",
      }}
    >
      <div className="wrap section">{children}</div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main exported page                                                         */
/* -------------------------------------------------------------------------- */

export function FeatureDetailPage({ slug }: { slug: string }) {
  const feature = FEATURE_BY_SLUG[slug];
  if (!feature) return null;

  const copy = FEATURE_COPY[slug];
  const capabilities = copy?.capabilities ?? GENERIC_CAPABILITIES;
  const highlights = copy?.highlights ?? GENERIC_HIGHLIGHTS(feature);
  const supporting = copy?.supporting ?? GENERIC_SUPPORTING;
  const hookSecondary =
    copy?.hookSecondary ?? "Built for the way your clinic actually runs.";
  const expandedBody = copy?.expandedBody ?? feature.oneLiner;
  const closingPrimary =
    copy?.closingPrimary ?? `See ${feature.name} in your clinic.`;
  const closingSecondary =
    copy?.closingSecondary ?? "A 20-minute walkthrough, tailored to your set-up.";

  const categoryLabel = CATEGORY_LABEL[feature.category] ?? "Platform";
  const comparison = comparisonFor(feature);
  const HeroIcon = feature.icon;

  return (
    <>
      {/* ---------------- 1. HERO (light) ---------------- */}
      <SectionLight id="feature-hero">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="max-w-[640px]">
            <Reveal y={8}>
              <div className="inline-flex mb-6">
                <EyebrowTag icon={HeroIcon}>
                  {categoryLabel} · {feature.name}
                  {feature.status !== "shipped" ? " · Beta" : ""}
                </EyebrowTag>
              </div>
            </Reveal>
            <Reveal y={14} delay={0.05}>
              <TwoToneHeadline
                as="h1"
                primary={feature.name}
                secondary={hookSecondary}
                accent="charcoal"
              />
            </Reveal>
            <Reveal y={12} delay={0.12}>
              <p className="mt-6 text-[18px] leading-[1.55] text-[var(--color-charcoal)] max-w-[52ch]">
                {expandedBody}
              </p>
            </Reveal>
            <Reveal y={10} delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3 max-md:flex-col max-md:items-stretch">
                <a
                  href="/demo"
                  className="inline-flex items-center justify-center gap-[9px] text-[15px] font-medium leading-none px-5 py-[14px] rounded-md bg-black text-white hover:bg-[#1c1c1b] transition-colors max-md:w-full"
                >
                  Book a demo
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="#feature-highlights"
                  className="inline-flex items-center justify-center text-[15px] font-medium leading-none px-5 py-[14px] rounded-md bg-white text-black border border-[var(--color-greige)] hover:border-[color-mix(in_srgb,var(--color-blue)_50%,white)] transition-colors max-md:w-full"
                >
                  Take a tour
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal y={20} delay={0.22} className="min-w-0">
            {HeroVisualFor(feature)}
          </Reveal>
        </div>
      </SectionLight>

      {/* ---------------- 2. WHAT YOU GET — 3 small cards (light) ---------------- */}
      <SectionLight>
        <div className="max-w-[640px] mb-10">
          <Reveal y={8}>
            <div className="inline-flex mb-5">
              <EyebrowTag>WHAT YOU GET</EyebrowTag>
            </div>
          </Reveal>
          <Reveal y={14} delay={0.05}>
            <TwoToneHeadline
              primary={`${feature.name}.`}
              secondary="Three things you'll feel on day one."
            />
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {capabilities.map((c) => (
            <StaggerItem key={c.title}>
              <FeatureCard icon={c.icon} title={c.title} body={c.body} />
            </StaggerItem>
          ))}
        </Stagger>
      </SectionLight>

      {/* ---------------- 3. TWO HIGHLIGHTED BLOCKS (light) ---------------- */}
      <SectionLight id="feature-highlights">
        <div className="max-w-[640px] mb-10">
          <Reveal y={8}>
            <div className="inline-flex mb-5">
              <EyebrowTag>HEADLINE CAPABILITIES</EyebrowTag>
            </div>
          </Reveal>
          <Reveal y={14} delay={0.05}>
            <TwoToneHeadline
              primary="Two big shifts."
              secondary="The rest is detail."
            />
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-1 gap-6" stagger={0.1}>
          {highlights.map((h, i) => (
            <StaggerItem key={i}>
              <HighlightBlock
                eyebrow={h.eyebrow}
                title={h.title}
                body={h.body}
                bullets={h.bullets}
                visual={
                  <div
                    className="rounded-[10px] bg-[var(--color-greige-2)]/40 border border-[var(--color-greige)] overflow-hidden"
                    style={{
                      boxShadow: "0 20px 60px -40px rgba(20,20,18,0.18)",
                    }}
                  >
                    {MockFor(h.mock)}
                  </div>
                }
              />
            </StaggerItem>
          ))}
        </Stagger>
      </SectionLight>

      {/* ---------------- 4. ROW OF 4 SUPPORTING CARDS (light tinted) ---------------- */}
      <SectionLight tint>
        <div className="max-w-[640px] mb-10">
          <Reveal y={8}>
            <div className="inline-flex mb-5">
              <EyebrowTag>SUPPORTING CAPABILITIES</EyebrowTag>
            </div>
          </Reveal>
          <Reveal y={14} delay={0.05}>
            <TwoToneHeadline
              primary="And four more"
              secondary="that quietly do the work."
            />
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {supporting.slice(0, 4).map((s) => (
            <StaggerItem key={s.title}>
              <FeatureCard icon={s.icon} title={s.title} body={s.body} />
            </StaggerItem>
          ))}
        </Stagger>
      </SectionLight>

      {/* ---------------- 5. STATS BAND (dark) ---------------- */}
      <StatBand
        stats={[
          { value: "8h", label: "Saved per clinician, per week" },
          { value: "32%", label: "Fewer no-shows" },
          { value: "97%", label: "AHPRA-aligned visits" },
        ]}
        quote={{
          body: `Switching to Ruevii ${feature.name.toLowerCase()} took a Tuesday — and we got our front desk back the same week.`,
          name: "Dr Mia Halvorsen",
          role: "Owner, Ascot Aesthetics · Brisbane",
        }}
      />

      {/* ---------------- 6. COMPARISON TABLE (light) ---------------- */}
      <SectionLight>
        <div className="max-w-[640px] mb-10">
          <Reveal y={8}>
            <div className="inline-flex mb-5">
              <EyebrowTag>WHAT IT REPLACES</EyebrowTag>
            </div>
          </Reveal>
          <Reveal y={14} delay={0.05}>
            <TwoToneHeadline
              primary="Tools you can stop"
              secondary="paying for."
            />
          </Reveal>
          <Reveal y={10} delay={0.12}>
            <p className="mt-5 text-[16px] leading-[1.55] text-[var(--color-charcoal)] max-w-[52ch]">
              {feature.name} is included on every plan. The point tools you're
              stitching together aren't.
            </p>
          </Reveal>
        </div>

        <Reveal y={18} delay={0.05}>
          <ComparisonTable
            youReplace={comparison.youReplace}
            ruevii={comparison.ruevii}
            rueviiMonthly={comparison.rueviiMonthly}
          />
        </Reveal>
      </SectionLight>

      {/* ---------------- 7. CLOSING CTA CARD (light) ---------------- */}
      <SectionLight>
        <Reveal y={20}>
          <div
            className="rounded-[16px] border border-[var(--color-greige)] p-10 md:p-14 flex flex-col items-center text-center"
            style={{
              background:
                "color-mix(in srgb, var(--color-blue) 6%, var(--color-white))",
            }}
          >
            <div className="inline-flex mb-6">
              <EyebrowTag icon={HeroIcon}>{feature.name}</EyebrowTag>
            </div>
            <TwoToneHeadline
              primary={closingPrimary}
              secondary={closingSecondary}
              accent="blue"
            />
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 max-md:flex-col max-md:w-full">
              <a
                href="/demo"
                className="inline-flex items-center justify-center gap-[9px] text-[15px] font-medium leading-none px-5 py-[14px] rounded-md bg-black text-white hover:bg-[#1c1c1b] transition-colors max-md:w-full"
              >
                Book a demo
                <span aria-hidden>→</span>
              </a>
              <a
                href="#feature-hero"
                className="inline-flex items-center justify-center text-[15px] font-medium leading-none px-5 py-[14px] rounded-md bg-transparent text-black border border-[var(--color-greige)] hover:border-[color-mix(in_srgb,var(--color-blue)_50%,white)] transition-colors max-md:w-full"
              >
                Take the tour
              </a>
            </div>

            <RelatedFeatures currentSlug={feature.slug} />
          </div>
        </Reveal>
      </SectionLight>

      {/* 8. Global ClosingCTABand is rendered by the page wrapper. */}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Related features — sibling links from the same category                    */
/* -------------------------------------------------------------------------- */

function RelatedFeatures({ currentSlug }: { currentSlug: string }) {
  const current = FEATURE_BY_SLUG[currentSlug];
  if (!current) return null;
  const category = FEATURE_CATEGORIES.find((c) => c.key === current.category);
  if (!category) return null;
  const siblings = category.features
    .filter((f) => f.slug !== currentSlug)
    .slice(0, 4);
  if (siblings.length === 0) return null;

  return (
    <div className="mt-10 pt-8 border-t border-[var(--color-greige)] w-full max-w-[680px]">
      <p
        className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-charcoal)] mb-3"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Pairs well with
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {siblings.map((s) => (
          <a
            key={s.slug}
            href={`/features/${s.slug}`}
            className="inline-flex items-center gap-2 text-[13px] text-black px-3 py-1.5 rounded-full bg-white border border-[var(--color-greige)] hover:border-[color-mix(in_srgb,var(--color-blue)_50%,white)] transition-colors"
          >
            <s.icon size={13} className="text-[var(--color-blue-ink)]" />
            {s.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default FeatureDetailPage;
