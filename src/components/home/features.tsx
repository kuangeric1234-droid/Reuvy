"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

const EASE = [0.21, 0.61, 0.27, 1] as const;

const fmtCents = (c: number) =>
  `$${(c / 100).toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function Features() {
  return (
    <section id="features" className="wrap section">
      <div className="max-w-[640px] mb-[18px]">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="eyebrow"
        >
          One platform
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.05, ease: EASE }}
          className="text-[clamp(30px,4vw,46px)]"
        >
          Everything your clinic runs on, finally <em>in one place</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          className="mt-[18px] text-[var(--color-charcoal)] text-[19px] leading-[1.55] max-w-[46ch]"
        >
          From the first enquiry to the follow-up review — clinical, front-desk and back-office
          work flows through a single, considered system. No more stitching together five tools.
        </motion.p>
      </div>

      <FeatureRow
        tagline="Clients & clinical records"
        headline={
          <>
            A complete <em>clinical picture</em> for every patient
          </>
        }
        body="Charts, before & after photos, consent forms, SOAP notes and prescriptions — organised on one timeline, accessible to your whole team and locked to your compliance rules."
        bullets={[
          "Patient CRM with full treatment history and recall",
          "Before/after photo sets with consent capture",
          "Digital consent forms & e-signatures stored to the record",
          "Structured clinical notes and prescribing",
        ]}
        linkLabel="Explore clinical records"
        visual={<ClientCard />}
        first
      />
      <FeatureRow
        flip
        tagline="Scheduling & online booking"
        headline={
          <>
            A calendar that <em>fills itself</em> — and protects your time
          </>
        }
        body="Take bookings 24/7 from a branded online page, run a smart waitlist, and cut no-shows with automated SMS and email reminders. Deposits hold the slot."
        bullets={[
          "Branded online booking page per clinic and per injector",
          "Automated reminders & confirmations over SMS + email",
          "Waitlist that backfills cancellations automatically",
          "No-show tracking with deposit and rebooking rules",
        ]}
        linkLabel="See scheduling"
        visual={<CalendarMock />}
      />
      <FeatureRow
        tagline="Payments & POS"
        headline={
          <>
            Get paid the way <em>modern clinics</em> do
          </>
        }
        body="Take payment at the chair, sell memberships that auto-bill, split treatments into plans, and pay commissions accurately — all reconciled against the booking."
        bullets={[
          "In-clinic POS with deposits, quotes and tips",
          "Memberships & packages with recurring auto-billing",
          "Payment plans and pay-over-time at checkout",
          "Automatic staff commission tracking",
        ]}
        linkLabel="See payments"
        visual={<PosMock />}
      />
      <FeatureRow
        flip
        tagline="Inventory & supply chain"
        headline={
          <>
            Never run out — and account for <em>every unit</em>
          </>
        }
        body="Track stock down to the vial, keep a tidy S4 drug register, raise purchase orders to suppliers, and catch wastage before it eats your margin."
        bullets={[
          "Real-time stock with low-stock reorder alerts",
          "S4 controlled-drug register tied to each treatment",
          "Purchase orders & supplier management",
          "Wastage and batch/expiry tracking",
        ]}
        linkLabel="See inventory"
        visual={<InventoryMock />}
      />
    </section>
  );
}

function FeatureRow({
  tagline,
  headline,
  body,
  bullets,
  linkLabel,
  visual,
  flip,
  first,
}: {
  tagline: string;
  headline: ReactNode;
  body: string;
  bullets: string[];
  linkLabel: string;
  visual: ReactNode;
  flip?: boolean;
  first?: boolean;
}) {
  return (
    <div
      className={`grid lg:grid-cols-[1fr_1.15fr] gap-[40px] lg:gap-[72px] items-center py-[78px] ${
        first ? "" : "border-t border-[var(--color-greige)]"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className={flip ? "lg:order-2" : ""}
      >
        <p className="font-mono text-[12px] tracking-[0.12em] uppercase text-[var(--color-blue-ink)] mb-[18px]">
          {tagline}
        </p>
        <h3 className="text-[clamp(26px,3vw,38px)]">{headline}</h3>
        <p className="mt-[18px] text-[var(--color-charcoal)] text-[18px] max-w-[42ch]">{body}</p>
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
          className="my-[26px] mb-[30px] list-none p-0 flex flex-col gap-[13px]"
        >
          {bullets.map((b) => (
            <motion.li
              key={b}
              variants={{
                hidden: { opacity: 0, x: -8 },
                show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              className="flex gap-3 text-[15px] text-[var(--color-charcoal)] items-start"
            >
              <PlusBullet />
              {b}
            </motion.li>
          ))}
        </motion.ul>
        <a
          href="#"
          className="group inline-flex items-center gap-2 text-[15px] font-medium text-[var(--color-blue-ink)]"
        >
          {linkLabel}
          <span className="transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
        className={flip ? "lg:order-1" : ""}
      >
        {visual}
      </motion.div>
    </div>
  );
}

function PlusBullet() {
  return (
    <span
      aria-hidden
      className="w-4 h-4 mt-[2px] flex-none rounded-full border-[1.5px] border-[var(--color-blue-ink)] grid place-items-center"
    >
      <span className="relative w-[6px] h-[6px]">
        <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-[var(--color-blue-ink)]" />
        <span className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-[var(--color-blue-ink)]" />
      </span>
    </span>
  );
}

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`bg-white border border-[var(--color-greige)] rounded-[10px] shadow-[0_20px_50px_-36px_rgba(20,20,18,0.28)] ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function ClientCard() {
  return (
    <Card className="p-5">
      <div className="flex gap-[14px] items-center pb-4 border-b border-[var(--color-greige)]">
        <div className="w-[52px] h-[52px] rounded-lg bg-[var(--color-greige)] flex-none" />
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[11px] text-[var(--color-charcoal)] tracking-wide">
            DEMO-001
          </div>
          <div className="text-[17px] font-semibold mt-[2px]">Mia Albescu</div>
          <div className="font-mono text-[11.5px] text-[var(--color-charcoal)] mt-[3px]">
            FEMALE · VIC · last_treatment_at 14d ago
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.06em] rounded-full px-[9px] py-[2px] border border-[var(--color-greige)] inline-flex items-center gap-[6px] text-[var(--color-charcoal)] bg-white">
            <span className="w-[6px] h-[6px] rounded-full bg-[#6fae8a]" />
            ACTIVE
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.06em] rounded-full px-[9px] py-[2px] border border-[color-mix(in_srgb,var(--color-blue)_55%,white)] bg-[#f1f5f9] text-[var(--color-blue-ink)]">
            SKIN
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[10px] mt-4">
        {["Before · 12 Mar", "After · 09 Apr"].map((c) => (
          <div
            key={c}
            className="aspect-[4/3] rounded-md border border-[var(--color-greige)] relative"
            style={{
              background:
                "repeating-linear-gradient(45deg, var(--color-greige-2) 0 9px, var(--color-white) 9px 18px)",
            }}
          >
            <span className="absolute left-2 bottom-2 font-mono text-[10px] text-[var(--color-charcoal)] bg-white border border-[var(--color-greige)] rounded px-[6px] py-[2px]">
              {c}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-[18px] flex flex-col">
        {[
          ["09 APR", "Anti-wrinkle — upper face", "22u · botulinum toxin", "DR LANE"],
          ["12 MAR", "Initial consultation", "Treatment plan agreed · consent signed", "DR LANE"],
          ["12 MAR", "Skin assessment + photos", "Baseline photo set captured", "RN PARK"],
        ].map(([when, title, sub, author], i) => (
          <div
            key={i}
            className={`grid grid-cols-[64px_1fr_auto] gap-3 py-[11px] text-[13px] items-start ${
              i === 0 ? "" : "border-t border-[var(--color-greige)]"
            }`}
          >
            <span className="font-mono text-[11px] text-[var(--color-charcoal)]">{when}</span>
            <span>
              <b className="font-semibold">{title}</b>
              <p className="text-[var(--color-charcoal)] text-[12.5px] mt-[2px]">{sub}</p>
            </span>
            <span className="font-mono text-[10px] text-[var(--color-blue-ink)] tracking-wide self-start">
              {author}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function CalendarMock() {
  // appointments.status is lowercase per schema; appointments hang off resources (e.g. "DR LANE").
  type Block = {
    row: number;
    col: number;
    title: string;
    time: string;
    status: "confirmed" | "completed" | "pending";
    res: string;
    b?: boolean;
  };
  const blocks: Block[] = [
    { row: 0, col: 0, time: "09:00", title: "Anti-wrinkle review", status: "confirmed", res: "DR LANE", b: true },
    { row: 0, col: 2, time: "09:30", title: "Initial consult", status: "confirmed", res: "DR LANE" },
    { row: 1, col: 1, time: "10:30", title: "Lip filler 1.0ml", status: "completed", res: "DR LANE" },
    { row: 1, col: 3, time: "10:00", title: "Video consult", status: "confirmed", res: "DR LANE", b: true },
    { row: 2, col: 0, time: "11:15", title: "Skin needling", status: "confirmed", res: "RN PARK" },
    { row: 2, col: 2, time: "11:00", title: "Hydrafacial", status: "pending", res: "RN PARK" },
  ];
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[15px] font-semibold">Mon 1 — Thu 4 Jun</span>
        <div className="flex gap-[6px]">
          {["‹", "›"].map((c) => (
            <span
              key={c}
              className="w-[26px] h-[26px] border border-[var(--color-greige)] rounded-md grid place-items-center text-[11px] text-[var(--color-charcoal)]"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[38px_repeat(4,1fr)] border border-[var(--color-greige)] rounded-md overflow-hidden">
        <div className="font-mono text-[10.5px] text-[var(--color-charcoal)] p-2 text-center border-b border-r border-[var(--color-greige)] bg-[var(--color-paper)]" />
        {["MON", "TUE", "WED", "THU"].map((d) => (
          <div
            key={d}
            className="font-mono text-[10.5px] text-[var(--color-charcoal)] p-2 text-center border-b border-[var(--color-greige)] bg-[var(--color-paper)]"
          >
            {d}
          </div>
        ))}
        {[0, 1, 2].map((row) => (
          <RowCells key={row} row={row} blocks={blocks.filter((b) => b.row === row)} times={["09", "10", "11"][row]} />
        ))}
      </div>
      <div className="mt-3 font-mono text-[12px] text-[var(--color-charcoal)] flex items-center gap-2">
        <span className="w-[6px] h-[6px] rounded-full bg-[var(--color-blue)]" />
        2 reminders sent · 1 deposit held · waitlist: 4
      </div>
    </Card>
  );
}

function RowCells({
  row,
  blocks,
  times,
}: {
  row: number;
  blocks: {
    col: number;
    time: string;
    title: string;
    status: "confirmed" | "completed" | "pending";
    res: string;
    b?: boolean;
  }[];
  times: string;
}) {
  return (
    <>
      <div className="font-mono text-[10px] text-[#a6a399] p-[6px] text-right border-r border-b border-[var(--color-greige)]">
        {times}
      </div>
      {[0, 1, 2, 3].map((col) => {
        const block = blocks.find((b) => b.col === col);
        const isLast = col === 3;
        return (
          <div
            key={col}
            className={`min-h-[46px] p-1 border-b ${isLast ? "" : "border-r"} border-[var(--color-greige)] relative`}
          >
            {block && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.15 + row * 0.06, ease: [0.21, 0.61, 0.27, 1] }}
                className="text-[10.5px] rounded-[5px] px-[7px] py-[5px] bg-white border border-[var(--color-greige)] leading-[1.25]"
                style={{ borderLeft: `3px solid ${block.b ? "var(--color-blue)" : "var(--color-charcoal)"}` }}
              >
                <div className="flex items-baseline justify-between gap-1">
                  <span className="font-mono text-[9px] text-[var(--color-charcoal)]">{block.time}</span>
                  <span className="font-mono text-[8.5px] text-[var(--color-blue-ink)] tracking-wide">
                    {block.res}
                  </span>
                </div>
                <span className="block truncate">{block.title}</span>
                <span className="block font-mono text-[8.5px] lowercase text-[var(--color-charcoal)] mt-[1px]">
                  {block.status}
                </span>
              </motion.div>
            )}
          </div>
        );
      })}
    </>
  );
}

function PosMock() {
  // sale_line_items.item_type + amounts in integer cents (unit_price_cents etc.)
  const lines: { item_type: "SERVICE" | "PRODUCT" | "CREDIT_ADJUSTMENT"; item_name: string; amount_cents: number }[] = [
    { item_type: "SERVICE", item_name: "Anti-wrinkle — upper face (22u)", amount_cents: 39600 },
    { item_type: "PRODUCT", item_name: "Vitamin skin booster", amount_cents: 18000 },
    { item_type: "CREDIT_ADJUSTMENT", item_name: "Glow membership credit", amount_cents: -5000 },
  ];

  return (
    <Card className="p-[18px]">
      <div className="flex items-baseline justify-between mb-[14px]">
        <h5 className="font-sans text-[13px] uppercase tracking-[0.08em] text-[var(--color-charcoal)] font-semibold m-0">
          Checkout · Mia Albescu
        </h5>
        <span className="font-mono text-[11px] text-[var(--color-charcoal)] tracking-wide">
          S-10428
        </span>
      </div>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
      >
        {lines.map((l, i) => (
          <motion.div
            key={l.item_name}
            variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.21, 0.61, 0.27, 1] } } }}
            className={`flex justify-between gap-3 py-[11px] text-[14px] ${i === 0 ? "" : "border-t border-[var(--color-greige)]"}`}
          >
            <span className="flex-1 min-w-0">
              <span className="block font-mono text-[9.5px] uppercase tracking-[0.08em] text-[var(--color-blue-ink)]">
                {l.item_type}
              </span>
              <span className="block text-[var(--color-charcoal)]">{l.item_name}</span>
            </span>
            <span className="font-mono shrink-0">
              {l.amount_cents < 0 ? `−${fmtCents(Math.abs(l.amount_cents))}` : fmtCents(l.amount_cents)}
            </span>
          </motion.div>
        ))}
      </motion.div>
      <div className="flex justify-between font-semibold py-[14px] border-t-[1.5px] border-black mt-1">
        <span>Total due</span>
        <span className="font-mono text-[17px]">{fmtCents(52600)}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.06em] px-2 py-[2px] rounded-full bg-black text-white">
          COMPLETED
        </span>
        <span className="font-mono text-[10px] text-[var(--color-charcoal)] tracking-wide">
          EFT_POS
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="text-[13.5px] font-medium leading-none px-3 py-[11px] rounded-md bg-black text-white hover:bg-[#1c1c1b] active:translate-y-px transition-colors">
          Charge card
        </button>
        <button className="text-[13.5px] font-medium leading-none px-3 py-[11px] rounded-md bg-white border border-[var(--color-greige)] text-black hover:border-[#cdcabf] active:translate-y-px transition-colors">
          Payment plan
        </button>
      </div>
      <div className="mt-3 font-mono text-[12px] text-[var(--color-charcoal)] flex gap-2 items-center">
        ⟳ Glow membership · {fmtCents(9900)}/mo · MONTHLY · next bill 1 Jul
      </div>
    </Card>
  );
}

function InventoryMock() {
  // products: short_code + category (ProductCategory enum)
  const rows: {
    name: string;
    short_code: string;
    category: "SKINCARE" | "MASK" | "OTHER";
    qty: string;
    status: "s4" | "low" | "ok";
    label: string;
    flag: string;
  }[] = [
    { name: "Botulinum toxin 100u", short_code: "BTX-100", category: "OTHER", qty: "6", status: "s4", label: "S4 register", flag: "s4_controlled" },
    { name: "HA filler — lips 1.0ml", short_code: "HAF-L10", category: "OTHER", qty: "3", status: "low", label: "Reorder", flag: "below_reorder_point" },
    { name: "Skin booster vials", short_code: "SB-VIT", category: "SKINCARE", qty: "21", status: "ok", label: "In stock", flag: "in_stock" },
    { name: "Numbing cream 30g", short_code: "NUM-30", category: "SKINCARE", qty: "14", status: "ok", label: "In stock", flag: "in_stock" },
  ];

  const statusClass = {
    s4: "text-[var(--color-blue-ink)] border-[color-mix(in_srgb,var(--color-blue)_55%,var(--color-white))] bg-[#f1f5f9]",
    low: "text-[#a8602f] border-[#e7cdb7] bg-[#fbf3ea]",
    ok: "text-[#4d7a5e] border-[#cfe3d6] bg-[#f1f7f2]",
  };

  return (
    <Card>
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            {["Product", "On hand", "Status"].map((h, i) => (
              <th
                key={h}
                className={`font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--color-charcoal)] py-3 px-[18px] border-b border-[var(--color-greige)] font-medium ${
                  i === 0 ? "text-left" : "text-right"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <motion.tr
              key={r.short_code}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.06, ease: [0.21, 0.61, 0.27, 1] }}
            >
              <td className={`py-[13px] px-[18px] ${i === rows.length - 1 ? "" : "border-b border-[var(--color-greige)]"}`}>
                <div className="font-medium">{r.name}</div>
                <div className="font-mono text-[11px] text-[var(--color-charcoal)] tracking-wide">
                  {r.short_code} · {r.category}
                </div>
              </td>
              <td
                className={`py-[13px] px-[18px] text-right font-mono ${i === rows.length - 1 ? "" : "border-b border-[var(--color-greige)]"}`}
              >
                {r.qty}
              </td>
              <td
                className={`py-[13px] px-[18px] text-right ${i === rows.length - 1 ? "" : "border-b border-[var(--color-greige)]"}`}
              >
                <div className="inline-flex flex-col items-end gap-[3px]">
                  <span className={`font-mono text-[10.5px] px-[9px] py-[3px] rounded-full border ${statusClass[r.status]}`}>
                    {r.label}
                  </span>
                  <span className="font-mono text-[9px] lowercase text-[var(--color-charcoal)] tracking-wide">
                    {r.flag}
                  </span>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
