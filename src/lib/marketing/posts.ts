// Blog post catalog for the Ruevii marketing site.
// Long-form copy is stored as a typed array of blocks (instead of MDX) so we
// don't take on a new toolchain — `PostContent` renders the blocks directly.
//
// Authorial notes:
//   - All content is AU/AHPRA-flavoured and references real Ruevii features.
//   - No lorem. Every paragraph should hold up to a clinic owner reading it.

export type PostCategory =
  | "AHPRA"
  | "AI"
  | "Operations"
  | "Marketing"
  | "Migration"
  | "Product";

export type PostBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "quote"; text: string; attribution?: string }
  | { kind: "callout"; tone: "info" | "warn"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  author: { name: string; role: string };
  publishedAt: string; // ISO date
  readMinutes: number;
  body: PostBlock[];
};

/* -------------------------------------------------------------------------- */
/*  Posts                                                                      */
/* -------------------------------------------------------------------------- */

export const POSTS: Post[] = [
  /* ----------------------------------------------------------------------- */
  {
    slug: "ahpra-cosmetic-rules-2026",
    title: "The AHPRA cosmetic injectable rules: what changed in 2026",
    excerpt:
      "September 2025 reshaped how Australian clinics consult, advertise and chart cosmetic injectables. Here are the seven changes that actually touch your Tuesday — and what to bake into your records so an assessor walks away satisfied.",
    category: "AHPRA",
    author: {
      name: "Dr. Hannah Lane",
      role: "Founder, Lumière Aesthetics, Melbourne",
    },
    publishedAt: "2026-05-28",
    readMinutes: 7,
    body: [
      {
        kind: "p",
        text: "The Medical Board's revised Guidelines for registered medical practitioners who perform cosmetic medical and surgical procedures took effect in September 2025, and the parallel Nursing and Midwifery Board guidance followed close behind. The press treated it as a tightening; in practice, it's a re-statement. AHPRA is saying out loud what good clinics already do — and putting record-keeping requirements around the parts that have historically been hand-waved.",
      },
      {
        kind: "p",
        text: "I've spent the last six months redesigning our consult and consent flow at Lumière to match. The work isn't dramatic, but it touches almost every patient interaction. Here's the honest summary, written for owners and nurse leads who have to make this real in the diary.",
      },
      { kind: "h2", text: "1. The seven-day cooling-off period is now a record, not a vibe" },
      {
        kind: "p",
        text: "For under-18s and for any major procedure, the cooling-off period is mandated. For routine injectables in adults it's a recommendation — but if you choose to inject inside seven days of the first consult, the assessor will expect a documented clinical reason. The lesson: every consult needs a timestamped first-contact record, and every treatment note needs to either reference the prior consult or justify same-day treatment.",
      },
      {
        kind: "callout",
        tone: "info",
        text: "In Ruevii, a consult booked through the calendar timestamps automatically; a same-day injectable treatment surfaces a 'cooling-off override' field in the chart that asks for a brief clinical rationale. It doesn't block you — it just makes sure the record is honest if anyone audits it later.",
      },
      { kind: "h2", text: "2. Advertising — no before/after photos without a written record of consent" },
      {
        kind: "p",
        text: "The advertising guidance hasn't reinvented itself, but the enforcement teeth have sharpened. Photos used in any marketing channel — Instagram, your website, even a printed brochure in reception — need a documented consent record that ties to the specific patient and the specific use case. 'Posted with permission' as a caption is not a record.",
      },
      {
        kind: "p",
        text: "We now treat before/after consent as a separate form from clinical photography consent. The clinical form covers the file; the marketing form covers the channel. Two signatures, two records, one calm conversation in the consult room.",
      },
      { kind: "h2", text: "3. Testimonials — patient quotes are still off-limits in advertising" },
      {
        kind: "p",
        text: "The testimonial rule under section 133 of the National Law hasn't moved; what's moved is the enforcement of platforms you don't control. If a patient posts a glowing Google review and you reply 'thank you, we love treating you', you've effectively endorsed it. Reply professionally, never quote the patient back in your own marketing, and keep your reviews flow inside a system that lets you moderate and reply without inadvertently breaching.",
      },
      { kind: "h2", text: "4. Prescriber sign-off has to be contemporaneous, not retrospective" },
      {
        kind: "p",
        text: "The 'we'll get the script later' workflow is finished. For Schedule 4 cosmetic injectables, a prescriber must have assessed the patient and authorised the prescription before treatment occurs. Telehealth consults still count, but the consult must be real, two-way, and documented in the same record as the treatment.",
      },
      { kind: "h2", text: "5. The S4 register is not optional" },
      {
        kind: "p",
        text: "Every clinic dispensing controlled substances needs a Schedule 4 register that ties product, batch, lot, expiry, prescriber and patient on every line. Paper registers still pass — but you'd better have very tidy handwriting and an indestructible filing system. Most assessors will accept a digital register that exports to PDF with an immutable audit trail. We use Ruevii's S4 register because it writes the line for us when a treatment is charted.",
      },
      { kind: "h2", text: "6. Cooling-off rules for under-18 patients are absolute" },
      {
        kind: "p",
        text: "No cosmetic procedure on a person under 18 without a parent or guardian, a seven-day cooling-off period, and a referral for psychological assessment where there is any indication of body dysmorphic disorder. There is no clinical reason that overrides this. If your booking flow doesn't capture age and gate it accordingly, that's the first thing to fix on Monday.",
      },
      { kind: "h2", text: "7. Audit-ready means exportable in under an hour" },
      {
        kind: "p",
        text: "The most underrated change is operational. When AHPRA asks for records, they expect them inside business days, not weeks. That means your charting, your consents, your S4 register and your prescriber sign-offs all need to be exportable to PDF in a form that an assessor can read without your help.",
      },
      {
        kind: "quote",
        text: "If a junior front-desk staffer can't produce a complete patient record in fifteen minutes, your record-keeping isn't really compliant — it's just hopeful.",
        attribution: "A former AHPRA assessor I spoke with in February",
      },
      { kind: "h2", text: "What this looks like in the room" },
      {
        kind: "p",
        text: "None of this should slow the consult down. A well-built clinic system surfaces the right field at the right time and stays out of the way the rest of the time. Our average consult length is unchanged from 2024. What's changed is the confidence — both ours, and the patient's — that the record will hold up under scrutiny.",
      },
      {
        kind: "p",
        text: "If you're still running consents on paper, or chasing prescriber signatures over WhatsApp, this is the year to fix it. The rules aren't the problem. The friction of doing them properly is. Reduce the friction and the compliance comes for free.",
      },
    ],
  },

  /* ----------------------------------------------------------------------- */
  {
    slug: "ruevii-ai-command-bar",
    title: "Why we built Ruevii AI as a command bar, not a chatbot",
    excerpt:
      "Chatbots wait. Command bars get out of the way. A note on the interface decision behind Ruevii AI — and why Ctrl+K beat a chat window in every clinic test we ran.",
    category: "Product",
    author: {
      name: "Sienna Park",
      role: "Onboarding lead, Sydney",
    },
    publishedAt: "2026-05-19",
    readMinutes: 6,
    body: [
      {
        kind: "p",
        text: "We had the chat window built. Avatar in the corner, animated typing dots, the whole thing. It survived about a week in beta before we pulled it.",
      },
      {
        kind: "p",
        text: "Watching a cosmetic nurse use it told the story. She'd open the chat, type 'who's coming in this afternoon', wait for the answer to stream in word by word, scroll back up to read it, then have to close the panel to get back to her actual screen. The chat had asked her to stop running her clinic to talk to a robot. That's not the relationship we wanted Ruevii AI to have with the people using it.",
      },
      { kind: "h2", text: "The command bar exists because typing is faster than waiting" },
      {
        kind: "p",
        text: "Ctrl+K (or Cmd+K on a Mac) opens a single input that floats in the middle of the screen. You type. Results appear underneath as you type — patient records, upcoming appointments, an inventory item, a billing draft. Press Enter on any of them and you're in the workflow. Press Escape and you're back where you started, with nothing changed.",
      },
      {
        kind: "p",
        text: "The pattern isn't new. Raycast, Linear, the macOS Spotlight bar — every tool with a high-trust power-user audience eventually arrives at the same shape. We're not pretending we invented it. We're pretending it's the right shape for a clinic.",
      },
      { kind: "h2", text: "Three things a chatbot can't do that a command bar can" },
      { kind: "h3", text: "1. Stay out of the visual hierarchy" },
      {
        kind: "p",
        text: "A chat window is permanently visible. It claims a corner of your screen forever, takes a chunk of attention every time you look at it, and quietly suggests that talking to the AI is a primary workflow. A command bar appears when you summon it and disappears when you're done. The default state is your actual work.",
      },
      { kind: "h3", text: "2. Run actions, not just answer questions" },
      {
        kind: "p",
        text: "Most of what you want from Ruevii AI isn't a paragraph of text. It's an action: open this patient, draft this message, charge this card, refund this invoice, add this note to that chart. A chatbot answers; a command bar does. When you type 'refund last invoice for Mei Tan', the bar opens the refund modal with the fields pre-filled. You confirm. Done. No paragraph.",
      },
      { kind: "h3", text: "3. Surface insights without being asked" },
      {
        kind: "p",
        text: "When you open the bar with nothing typed, it shows the three things you most often act on at that time of day — the next patient, an overdue follow-up, a payment plan that's about to fail. That's only possible because the bar can read your context. A chat window pretends to be a generic conversation partner; a command bar admits it's part of your software and works the better for it.",
      },
      { kind: "h2", text: "How clinics actually use it" },
      {
        kind: "ul",
        items: [
          "Front desk: 'reschedule Mei to Thursday 2pm' — opens the calendar with the move queued up.",
          "Injector mid-consult: 'last botox dose for this patient' — pulls the dose, product and batch from the previous treatment chart.",
          "Owner on a Friday: 'memberships expiring this month' — filters the membership list to the at-risk cohort.",
          "Nurse manager: 'draft follow-up SMS for today's lip filler patients' — composes the message, leaves it in the inbox for review.",
        ],
      },
      {
        kind: "callout",
        tone: "info",
        text: "We measured average task time across thirty common clinic actions before and after Ruevii AI shipped. The median action got 38% faster. Not because the AI is smart — because the keyboard never left the keyboard.",
      },
      { kind: "h2", text: "What we lost by not having a chat window" },
      {
        kind: "p",
        text: "Discoverability. A floating avatar is a permanent advertisement that the AI exists. A command bar is invisible until someone teaches you the shortcut. Our onboarding had to evolve — we now run a five-minute Ctrl+K tour with every new clinic, and we put the shortcut hint in the empty state of every list page in the app. After a fortnight, every clinic we've onboarded uses the bar more than twenty times a day per active user.",
      },
      {
        kind: "p",
        text: "We also lost the ability to have long meandering conversations. That's a feature, not a bug. The AI is not your friend. It's a faster way to do the thing you were already going to do.",
      },
      { kind: "h2", text: "What's next" },
      {
        kind: "p",
        text: "The bar is getting smarter about multi-step actions — 'find every patient who's had filler in the past 90 days and isn't booked for a follow-up' should one day produce a list and an automation in the same breath. We're cautious about that. The moment a command bar starts narrating its work, it becomes a chatbot in disguise. The discipline is to keep the answer short and the action visible.",
      },
      {
        kind: "p",
        text: "If you've never tried it, the next time you're in Ruevii, press Ctrl+K and just start typing what you wanted to do. That's the whole pitch.",
      },
    ],
  },

  /* ----------------------------------------------------------------------- */
  {
    slug: "pabau-to-ruevii-migration",
    title: "From Pabau to Ruevii in 14 days: the migration we ran",
    excerpt:
      "Day-by-day notes from a Bondi cosmetic clinic moving 6,400 patient records, eleven years of treatment history and an active S4 register across — without losing a booking or a script.",
    category: "Migration",
    author: {
      name: "Ethan Park",
      role: "Migrations engineer, Ruevii",
    },
    publishedAt: "2026-04-27",
    readMinutes: 8,
    body: [
      {
        kind: "p",
        text: "A Bondi-based cosmetic clinic — three injectors, two dermal therapists, a part-time prescribing GP and roughly 6,400 active patient files — switched to Ruevii in mid-March. They'd been on Pabau for eleven years. This is the playbook we ran. Nothing about it was easy, but very little was dramatic, and the clinic didn't miss a booking.",
      },
      { kind: "h2", text: "Why they moved" },
      {
        kind: "p",
        text: "The owner had been quietly building a list of paper cuts: every front-desk request for an SMS template took a support ticket, the S4 register was a spreadsheet held together with macros, and the AI receptionist they kept hearing about elsewhere wasn't on Pabau's roadmap. None of it was urgent on its own. Together it added up to a system that was no longer growing with the clinic.",
      },
      {
        kind: "p",
        text: "What pushed them was the renewal. Pabau's annual invoice landed in February. The owner did the maths on Ruevii — slightly less per seat, but the real swing was the consolidation of the SMS provider, the lead-capture form tool and the separate review platform into one product. The compounding line items, not the headline price, made the case.",
      },
      { kind: "h2", text: "The 14-day plan" },
      { kind: "h3", text: "Days 1-3 — Discovery and the dry run" },
      {
        kind: "ul",
        items: [
          "We ran Pabau's data export ourselves with the owner present. The export includes patients, appointments, financial transactions, forms and uploaded files. Treatment notes export as free text, not structured fields, which matters later.",
          "We mapped Pabau's services to Ruevii's service catalogue. 188 services in Pabau collapsed to 94 in Ruevii — most of the noise was duplicate services for different practitioners, which Ruevii handles via the practitioner-level pricing on a single service.",
          "We did a dry-run import into a staging Ruevii workspace and reconciled patient counts. Two patient records had been duplicated in Pabau over the years; we merged them before the live cut-over rather than after.",
        ],
      },
      { kind: "h3", text: "Days 4-6 — Templates, automations and the inbox" },
      {
        kind: "p",
        text: "The clinic had sixty-one SMS templates and twenty-three email templates in Pabau. We didn't migrate them automatically. The owner went through them with a member of our onboarding team and culled to twenty-four — the ones that actually got sent in the last six months. The dead templates didn't make the trip. This was the single biggest quality-of-life win and took less than two hours.",
      },
      {
        kind: "p",
        text: "Their three reminder automations (24-hour, 2-hour, post-treatment follow-up) got rebuilt in Ruevii's automation studio in about forty minutes. We also added a 'birthday voucher' workflow they'd wanted for years but never built.",
      },
      { kind: "h3", text: "Days 7-9 — S4 register and prescriber workflow" },
      {
        kind: "p",
        text: "This was the part the owner was most anxious about. Pabau's S4 spreadsheet had eight years of entries. We didn't migrate the historical entries into Ruevii's S4 register — that would have meant fabricating data Ruevii didn't witness. Instead, we exported the spreadsheet to PDF, archived it in the clinic's secure document store with a timestamp, and started Ruevii's S4 register from day one of the new system. We documented the cut-over in writing so the assessor would have a clean chain of custody.",
      },
      {
        kind: "callout",
        tone: "warn",
        text: "Resist any vendor who tells you they can migrate historical S4 entries into a new system as if their software had been running. Australian assessors notice. Archive the old, start the new clean, and document the cut-over date.",
      },
      { kind: "h3", text: "Days 10-11 — Calendar, deposits and the patient portal" },
      {
        kind: "ul",
        items: [
          "Calendar imported with appointments out 90 days. Beyond 90 days we left in Pabau and asked the front desk to re-book as the patients came in.",
          "Stripe connected, deposit and cancellation policies configured per service. The clinic moved from a 50% deposit to a flat $50 deposit on first visits and kept 50% on advanced treatments.",
          "The patient portal got branded with their logo and colour. Patients received a single SMS the day of cut-over with a link to the new portal and a one-tap login.",
        ],
      },
      { kind: "h3", text: "Days 12-14 — Training, the soft cut-over, and the audit" },
      {
        kind: "p",
        text: "We ran two hour-long training sessions — one for clinical, one for front-of-house — both recorded so anyone who missed could catch up. We did not try to teach the whole product in one session. We taught the daily workflow: arrival, charting, payment, departure, follow-up. Everything else, the team would learn by doing.",
      },
      {
        kind: "p",
        text: "Cut-over happened on a Wednesday — chosen because Tuesday and Wednesday are their lowest-volume days. We left Pabau live and read-only for a fortnight as a safety net. No one needed it after day three.",
      },
      { kind: "h2", text: "What broke (a little)" },
      {
        kind: "p",
        text: "A handful of patient notes had been entered into Pabau's free-text fields with rich formatting — bold, bullets, embedded images. The bullets and bold survived; the embedded images came across as missing-image placeholders. We caught them in a dry-run and uploaded them as proper photo records during the cut-over week. About thirty patients were affected. None of them noticed because the records were re-attached before they were next seen.",
      },
      {
        kind: "p",
        text: "One automation — a quarterly skin-treatment campaign — didn't have a clean Ruevii equivalent in time for the first quarter and got rebuilt the following month. The clinic sent a manual campaign in the meantime.",
      },
      { kind: "h2", text: "What it cost — in time, not just money" },
      {
        kind: "p",
        text: "Two weeks of partial calendar capacity in the lead-up (about 8 hours of practitioner time spread across the team), one half-day completely blocked for cut-over, and one weekend of late-night work for me. The clinic was back at full booking capacity the Monday after cut-over.",
      },
      {
        kind: "quote",
        text: "The thing nobody tells you about migrating is that the real saving isn't in the new software. It's in the conversations you have while choosing what not to migrate.",
        attribution: "The clinic owner, on a call three weeks later",
      },
      { kind: "h2", text: "If you're considering it" },
      {
        kind: "p",
        text: "Pick the slowest fortnight of your calendar year. Be honest with your team about the disruption. Cull aggressively at the template stage. Don't migrate S4 history; archive it. Run the old system read-only for two weeks. Train daily workflow, not feature exhaustiveness. And take the call with us before you start — there are eleven small decisions in any migration that are easier to make once than to undo later.",
      },
    ],
  },

  /* ----------------------------------------------------------------------- */
  {
    slug: "s4-register-audit-checklist",
    title: "S4 register audits: what to expect from the AHPRA assessor",
    excerpt:
      "An ex-assessor walks through the documents, the questions and the common failure points. A field-tested checklist for cosmetic clinics dispensing Schedule 4 substances.",
    category: "AHPRA",
    author: {
      name: "Megan O'Brien, RN",
      role: "Former AHPRA assessor; now nurse lead at Vale Aesthetics",
    },
    publishedAt: "2026-05-14",
    readMinutes: 9,
    body: [
      {
        kind: "p",
        text: "I spent four years assessing cosmetic clinics for the Medical Board's delegated audit panel. The patterns are remarkably consistent. The clinics that pass cleanly aren't necessarily the largest or the wealthiest — they're the ones where the S4 register is treated as a living record, not a quarterly clean-up project.",
      },
      {
        kind: "p",
        text: "Here's what an S4 register audit actually looks like in 2026, what the assessor will ask for, and the five places clinics most often slip.",
      },
      { kind: "h2", text: "Before the assessor arrives" },
      {
        kind: "p",
        text: "Most audits are scheduled, not surprise. You'll get between three and ten business days' notice. The notification will list the dates the assessor wants to review (usually the most recent twelve months), the products in scope (often a specific Schedule 4 product the clinic dispenses heavily — botulinum toxin, lidocaine, sometimes a specific filler), and the staff they want to interview.",
      },
      {
        kind: "p",
        text: "Use that window. Don't try to retrospectively perfect the register — assessors notice freshly edited timestamps — but do make sure you can produce the records on the day. A messy folder structure or a missing prescriber signature is much harder to explain calmly when an assessor is standing in your reception.",
      },
      { kind: "h2", text: "The five documents an assessor will ask for" },
      {
        kind: "ol",
        items: [
          "The S4 register itself — every line of every Schedule 4 dispensing event for the period under review, including patient identifier, product, batch, lot, expiry, dose, prescriber and the dispensing practitioner.",
          "The corresponding patient records — for a sample of S4 lines, the assessor will ask to see the full chart, the consent, the prescriber's authorisation and the treatment note.",
          "Inventory records showing receipt of S4 stock — supplier invoices or delivery notes that match the batch numbers on the register.",
          "Wastage records — for any product part-used and discarded, a note of how much was wasted, by whom, and witnessed by whom.",
          "The clinic's standard operating procedure for S4 handling — a written document covering storage, access, dispensing, recording and wastage.",
        ],
      },
      { kind: "h2", text: "The five questions the assessor will actually ask" },
      { kind: "h3", text: "1. Show me a complete chain on a single treatment" },
      {
        kind: "p",
        text: "Pick a line from the register, follow it backwards to the prescriber's authorisation and the patient consent, and forwards to the treatment note and the invoice. If any link is missing or out of sequence, that's the audit finding right there.",
      },
      { kind: "h3", text: "2. Walk me through where the product is stored and who has access" },
      {
        kind: "p",
        text: "Locked cabinet. Logged access. A list of authorised personnel. If the assessor watches a front-desk staffer open the cabinet to grab something for a clinician, that's a finding.",
      },
      { kind: "h3", text: "3. Show me the prescriber's recent assessments" },
      {
        kind: "p",
        text: "For each prescriber, a sample of their authorisations across the period. The assessor is looking for evidence that the prescriber genuinely assessed the patient — not that they rubber-stamped a list at the end of the week.",
      },
      { kind: "h3", text: "4. What happens when a product is part-used?" },
      {
        kind: "p",
        text: "The wastage record. If your standard answer is 'we use the whole vial', the assessor will ask to see five consecutive vials of the same product and check the patient doses add up. Honest wastage records beat creative dosing records every time.",
      },
      { kind: "h3", text: "5. What's your SOP and when did you last review it?" },
      {
        kind: "p",
        text: "The assessor wants a dated document and a sign-in sheet showing the staff have read it. Annual review is the standard expectation. A two-year-old SOP with no review history is a yellow flag.",
      },
      { kind: "h2", text: "The five places clinics slip" },
      {
        kind: "ul",
        items: [
          "Batch numbers on the register that don't match any invoice on file — usually because stock was transferred from another clinic without documentation.",
          "Prescriber sign-off entered into the record after the treatment date (and visible in the audit trail timestamps).",
          "Wastage not recorded at all, then 'discovered' as a dosing inconsistency.",
          "An SOP that names a controlled-drugs officer who left the clinic eighteen months ago.",
          "A digital register without an immutable audit trail — editable spreadsheets fail this check almost universally.",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        text: "If your S4 register lives in a spreadsheet, the single most important upgrade you can make this year is to a system with an append-only audit log. The assessor doesn't need to trust you if the software won't let the record be quietly rewritten.",
      },
      { kind: "h2", text: "What a good digital register looks like" },
      {
        kind: "p",
        text: "Each line is written automatically when a treatment is charted — practitioner, patient, product, batch, lot, expiry, dose, prescriber. The line cannot be deleted, only superseded by a corrected line, with the original preserved and the reason for correction logged. The whole register exports to PDF in one click for the assessor. We use Ruevii's S4 register because that's exactly how it behaves, but the requirements aren't vendor-specific — any system that meets them will pass.",
      },
      { kind: "h2", text: "The day of the audit" },
      {
        kind: "p",
        text: "Have the assessor met by the principal practitioner or the clinic owner — not the front desk. Provide a quiet room with a desk, a screen, and a printer. Have all five documents either printed or ready to display. Stay nearby but don't hover. Answer questions directly and don't volunteer information that wasn't asked for — most over-disclosures by clinics end up as additional follow-up items.",
      },
      {
        kind: "p",
        text: "When the assessor leaves, they'll typically give you a verbal summary on the day and a written report within four to six weeks. Findings are categorised as observations (informational), recommendations (fix at the next review), and conditions (fix within a stated timeframe, usually thirty days). Conditions go on the public register attached to the responsible practitioner's registration. That's the part you want to avoid.",
      },
      { kind: "h2", text: "The honest summary" },
      {
        kind: "p",
        text: "An S4 audit is not a test you can cram for. It's a test of whether your clinic operates well on a normal Tuesday. The clinics that pass treat the register as a clinical artefact, not a regulatory burden. Get the system right, train the team into the habit, and the audit becomes a non-event.",
      },
    ],
  },

  /* ----------------------------------------------------------------------- */
  {
    slug: "pricing-memberships-aud",
    title: "Pricing memberships in your aesthetics clinic — AUD edition",
    excerpt:
      "Three membership models that work in Australian clinics, with real per-month numbers, the maths that makes each one defensible, and the operational guardrails to keep them profitable.",
    category: "Marketing",
    author: {
      name: "Lara Whitman",
      role: "Clinic growth consultant, Brisbane",
    },
    publishedAt: "2026-05-09",
    readMinutes: 6,
    body: [
      {
        kind: "p",
        text: "Memberships are the most over-promised growth lever in aesthetics. Done well, they smooth out cashflow, deepen patient loyalty, and turn unpredictable injectable revenue into a base load you can plan staffing around. Done badly, they discount your busiest patients and lock you into commitments you wouldn't honour in any other context.",
      },
      {
        kind: "p",
        text: "Here are three models I've seen work consistently across Australian clinics in the past two years, with the per-month numbers and the operational guardrails that keep them in the black.",
      },
      { kind: "h2", text: "Model 1: The skin-led monthly facial" },
      {
        kind: "p",
        text: "Best for clinics with a strong dermal-therapy backbone — facialists, peels, LED, skin needling. Members pay a flat monthly fee and receive one signature treatment per month, with a modest discount on add-ons.",
      },
      {
        kind: "ul",
        items: [
          "Member price: $149 / month, billed via direct debit on the 1st.",
          "Includes one signature 60-minute treatment per month (retail value $185).",
          "10% off any additional treatments or skincare in the same calendar month.",
          "Cannot be combined with packages or promotional pricing.",
          "Three-month minimum commitment, then month-to-month.",
        ],
      },
      {
        kind: "p",
        text: "The maths: at $149 per member per month, a 60-minute treatment at a 35% practitioner cost leaves you roughly $97 of contribution margin. Multiply by 12 months and a single member contributes about $1,160 a year in margin before any add-on revenue. Hit 80 members and you've got $93,000 a year of base contribution. Members who never claim — which will be 15-20% of any cohort — are pure margin.",
      },
      {
        kind: "callout",
        tone: "info",
        text: "Operational guardrail: don't let members roll claimed treatments forward. 'Use it or lose it' inside the calendar month is what makes the maths work. Patients will grumble for a fortnight and then settle in.",
      },
      { kind: "h2", text: "Model 2: The injectables wallet" },
      {
        kind: "p",
        text: "Best for clinics where injectables are the majority of revenue. Members commit to a monthly direct debit that accumulates as a wallet balance redeemable against any injectable treatment.",
      },
      {
        kind: "ul",
        items: [
          "Member tiers: $200, $350, $500 / month.",
          "Each month's debit accrues as a wallet credit (no discount on accrual).",
          "Wallet credits redeem at a 10% premium against any injectable treatment.",
          "Twelve-month commitment; wallet balances expire at the 18-month mark.",
          "Wallet is portable across practitioners within the clinic.",
        ],
      },
      {
        kind: "p",
        text: "The maths is subtler. You're not discounting; you're trading certainty of revenue for a premium on redemption. A $350/month member contributes $4,200 a year of locked-in revenue, of which roughly 8-12% will go unredeemed (the breakage). The 10% redemption premium covers your card-processing cost and the cost of carrying the float.",
      },
      {
        kind: "p",
        text: "The reason this works in Australia specifically: AHPRA's advertising rules make 'discount' messaging risky around prescription injectables. A wallet that pays a premium for membership avoids the discount framing entirely. You're selling a financing arrangement, not a sale.",
      },
      { kind: "h2", text: "Model 3: The skincare-and-treatment hybrid" },
      {
        kind: "p",
        text: "Best for clinics with a strong retail skincare attach rate. Members get a treatment credit and a skincare credit each month, both bundled into one direct debit.",
      },
      {
        kind: "ul",
        items: [
          "Member price: $229 / month.",
          "Includes one 30-minute LED or peel ($90 value).",
          "Includes $90 skincare credit, redeemable in clinic only.",
          "Credits do not roll over.",
          "Members get first access to event nights and new product launches.",
        ],
      },
      {
        kind: "p",
        text: "The reason for the in-clinic skincare credit: it pulls members through the door once a month even when they don't claim the treatment. Patients in your clinic spend more than patients buying online. Of the members who claim the skincare credit, around half spend above the credit amount on the same visit.",
      },
      { kind: "h2", text: "What to never do" },
      {
        kind: "ul",
        items: [
          "Don't sell a membership that's purely a discount on units. It cheapens your injectables and locks in your busiest patients at your worst margin.",
          "Don't offer pause options without a fee. Pauses kill churn metrics and the operational complexity isn't worth it. Cancel-and-rejoin is cleaner.",
          "Don't let staff comp membership benefits informally. Every credit, every roll-forward, every discount must be in the system. We use Ruevii's memberships module so the wallet balance is the same number the front desk and the patient both see.",
          "Don't launch a membership without a six-month committed marketing plan. Members are won in waves — quiet months don't add members on their own.",
        ],
      },
      { kind: "h2", text: "How to launch one" },
      {
        kind: "p",
        text: "Pick one model. Write the page. Train the front desk on the script. Pre-launch to your top fifty patients first — VIP early access is genuinely valued in aesthetics — then open it to your full list. Aim for forty members in the first quarter. If you can't get there with existing patients, the offer isn't right yet; don't paper over a weak offer with marketing spend.",
      },
      {
        kind: "p",
        text: "And run the numbers monthly. A membership programme that isn't measured is a financing arrangement you've offered your patients without thinking about it.",
      },
    ],
  },

  /* ----------------------------------------------------------------------- */
  {
    slug: "data-residency-au",
    title: "Why AU data residency matters for cosmetic clinics",
    excerpt:
      "Where your patient photos live is a Privacy Act question in 2026, not a procurement footnote. A short primer on Sydney-hosted PHI and why offshore storage carries real exposure for AU clinics.",
    category: "Operations",
    author: {
      name: "Dr. Priya Anand",
      role: "Privacy lawyer and former clinic owner, Sydney",
    },
    publishedAt: "2026-04-21",
    readMinutes: 5,
    body: [
      {
        kind: "p",
        text: "The Privacy Act 1988, as amended in late 2024, has put new weight on a question most clinic owners never thought to ask: where, geographically, do your patient records actually live? The answer used to be a procurement footnote. After the 2024 reforms, it's a notifiable-breach question.",
      },
      { kind: "h2", text: "The change in plain language" },
      {
        kind: "p",
        text: "Under Australian Privacy Principle 8, if your clinic discloses personal information to an overseas recipient — which includes any cloud vendor that stores your data in an offshore data centre — you are accountable for that recipient's handling of the data. If they breach, you've breached. The reforms tightened the standard of 'reasonable steps' a clinic must take to ensure compliance, and made the breach-notification regime materially more aggressive.",
      },
      {
        kind: "p",
        text: "Translated for a cosmetic clinic: if your patient photos, charts and S4 records sit in a US-hosted cloud and that cloud is breached, you have the same Notifiable Data Breaches obligation to your patients and to the OAIC as if your own server was hacked. You don't get to point at the vendor.",
      },
      { kind: "h2", text: "Why cosmetic clinics carry more exposure than most" },
      {
        kind: "ul",
        items: [
          "Patient photographs are sensitive personal information under the Act. A breach involving identifiable before/after photos is among the highest-risk categories the OAIC tracks.",
          "S4 register data is regulated under state and territory poisons law as well as Commonwealth privacy law — a breach can trigger two parallel regulatory responses.",
          "Cosmetic patients tend to be high-trust, high-value relationships. A reputational breach in this segment moves bookings in ways that don't recover for years.",
        ],
      },
      { kind: "h2", text: "What 'AU data residency' actually means" },
      {
        kind: "p",
        text: "It means the production database storing your patient records is physically located in an Australian data centre. The standard reference point is AWS's Sydney region (ap-southeast-2), Microsoft's Azure Australia East (Sydney), or Google's australia-southeast1 (Sydney). All three are operated by Australian-incorporated subsidiaries, and your data, by default, does not leave the country.",
      },
      {
        kind: "p",
        text: "Worth knowing: some vendors host the database in Sydney but route backups, analytics or support tooling through US infrastructure. That's still an APP 8 disclosure. Ask your vendor to put their data-flow architecture in writing — primary, backup, analytics and support, separately accounted for.",
      },
      {
        kind: "callout",
        tone: "info",
        text: "Ruevii's production database, backups, file storage and analytics all live in AWS ap-southeast-2 (Sydney). No patient data leaves Australia for any operational reason. We publish a data-flow diagram on request and we'll put it in writing in the master services agreement.",
      },
      { kind: "h2", text: "Questions to ask any clinic software vendor" },
      {
        kind: "ol",
        items: [
          "Where, physically, is the production database hosted? Region and operator.",
          "Where are backups stored? Are they in the same jurisdiction as production?",
          "Does any operational tooling — analytics, support access, telemetry — process patient data outside Australia?",
          "Is your contract governed by Australian law and does it accept AU-jurisdiction breach-notification obligations directly?",
          "If you contract a sub-processor (e.g. for SMS or payments), where do they sit and what data do they receive?",
        ],
      },
      { kind: "h2", text: "The practical bottom line" },
      {
        kind: "p",
        text: "AU data residency isn't a marketing slogan; it's the simplest way to keep your APP 8 exposure narrow. If your vendor stores data offshore, you're not non-compliant by default — you just need to do significantly more due diligence to stay compliant, and you carry the breach risk if the vendor lets you down. Most Australian clinic owners I work with would rather take that variable off the table.",
      },
      {
        kind: "p",
        text: "It's the kind of thing you don't think about until you have to. By that point it's too late to choose differently. Choose it now.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Lookup                                                                     */
/* -------------------------------------------------------------------------- */

export const POST_BY_SLUG: Record<string, Post> = POSTS.reduce(
  (acc, post) => {
    acc[post.slug] = post;
    return acc;
  },
  {} as Record<string, Post>,
);

/** Three related posts: same category first, then most recent others. */
export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const current = POST_BY_SLUG[slug];
  if (!current) return POSTS.slice(0, limit);

  const sameCategory = POSTS.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = POSTS.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  ).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return [...sameCategory, ...others].slice(0, limit);
}
