"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { create } from "zustand";

type Item = { sec: string; label: string; hint: string };

const ITEMS: Item[] = [
  { sec: "Ask Ruevii AI", label: "Which injectors are below target this month?", hint: "AI" },
  { sec: "Ask Ruevii AI", label: "Draft a re-book SMS for lapsed clients", hint: "AI" },
  { sec: "Ask Ruevii AI", label: "Summarise today's clinical notes", hint: "AI" },
  { sec: "Navigate", label: "Today's calendar", hint: "↵" },
  { sec: "Navigate", label: "Open client — Mia Albescu", hint: "↵" },
  { sec: "Navigate", label: "S4 drug register", hint: "↵" },
  { sec: "Navigate", label: "Staff performance report", hint: "↵" },
  { sec: "Actions", label: "Book new appointment", hint: "B" },
  { sec: "Actions", label: "Take a payment", hint: "P" },
  { sec: "Actions", label: "Raise a purchase order", hint: "O" },
  { sec: "Actions", label: "Fill open slots from waitlist", hint: "W" },
];

type Action = { label: string; hint: string; hot?: boolean };
type Answer = { query: string; body: string; actions: Action[] };

/* Scripted, schema-grounded answers — this is a marketing demo, so responses are
   canned but written against the real data model (clients.status INACTIVE,
   item_type SERVICE, appointments, consent, etc.). */
const RESPONSES: Record<string, Omit<Answer, "query">> = {
  "which injectors are below target this month?": {
    body: "2 of 5 injectors are tracking below their June target. Dr Lane is at 82% and N. Park at 76% — measured on completed sale_line_items where item_type = SERVICE, against each practitioner's monthly goal.",
    actions: [
      { label: "Draft a re-book campaign for N. Park's lapsed clients", hint: "Run →", hot: true },
      { label: "Open this month's staff performance report", hint: "↵" },
      { label: "Fill 3 open slots from the waitlist", hint: "↵" },
    ],
  },
  "draft a re-book sms for lapsed clients": {
    body: "Drafted for 34 clients with status INACTIVE and last_treatment_at over 90 days ago:\n\n“Hi {full_name}, it's been a little while since your last visit to the clinic — we'd love to see you back. Reply YES and we'll find a time that suits. — The team”",
    actions: [
      { label: "Send to 34 lapsed clients", hint: "Run →", hot: true },
      { label: "Edit the message", hint: "↵" },
      { label: "Schedule for 9:00 AM tomorrow", hint: "↵" },
    ],
  },
  "summarise today's clinical notes": {
    body: "12 consults completed today across SKIN and DMD. 9 SOAP notes signed, 3 still awaiting prescriber sign-off. 2 treatments flagged for follow-up, and 1 consent form remains unsigned on appointment S-10428.",
    actions: [
      { label: "Open the 3 notes awaiting sign-off", hint: "↵", hot: true },
      { label: "Chase the unsigned consent on S-10428", hint: "Run →" },
      { label: "Draft GP letters for today's referrals", hint: "↵" },
    ],
  },
};

const FALLBACK_ACTIONS: Action[] = [
  { label: "Show the records behind this answer", hint: "↵", hot: true },
  { label: "Draft a follow-up message", hint: "↵" },
  { label: "Open the related report", hint: "↵" },
];

function resolveAnswer(query: string): Answer {
  const q = query.trim().toLowerCase();
  for (const [key, val] of Object.entries(RESPONSES)) {
    if (q === key || q.includes(key) || key.includes(q)) {
      return { query: query.trim(), ...val };
    }
  }
  return {
    query: query.trim(),
    body: `Pulled from your clinic for “${query.trim()}” — scoped to this clinic_id with row-level security, every figure linked back to the row it came from. In the live product Ruevii AI answers from your real records and can run the action for you; this is a preview of how it reads and responds.`,
    actions: FALLBACK_ACTIONS,
  };
}

type CmdState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useCommandPalette = create<CmdState>((set, get) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
}));

export function CommandPalette() {
  const { isOpen, close, toggle } = useCommandPalette();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [typed, setTyped] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter((i) => i.label.toLowerCase().includes(q));
  }, [query]);

  // Submit a list item: AI prompts answer in place, everything else "navigates" (closes).
  function runItem(item: Item) {
    if (item.sec === "Ask Ruevii AI") {
      ask(item.label);
    } else {
      close();
    }
  }

  function ask(q: string) {
    if (!q.trim()) return;
    setAnswer(resolveAnswer(q));
    setSelected(0);
  }

  // Typing effect for the answer body.
  useEffect(() => {
    if (!answer) {
      setTyped("");
      return;
    }
    setTyped("");
    let i = 0;
    const step = Math.max(1, Math.round(answer.body.length / 90));
    const id = setInterval(() => {
      i += step;
      setTyped(answer.body.slice(0, i));
      if (i >= answer.body.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [answer]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        toggle();
        return;
      }
      if (!useCommandPalette.getState().isOpen) return;

      // ----- Answer view -----
      if (answer) {
        if (e.key === "Escape") {
          e.preventDefault();
          setAnswer(null);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelected((s) => Math.min(s + 1, answer.actions.length - 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelected((s) => Math.max(s - 1, 0));
        } else if (e.key === "Enter") {
          e.preventDefault();
          close(); // "run" the suggested action
        }
        return;
      }

      // ----- List view -----
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[selected];
        if (item) runItem(item);
        else if (query.trim()) ask(query); // free-text question
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered, selected, query, answer, close, toggle]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelected(0);
      setAnswer(null);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => setSelected(0), [query]);

  // group by section
  const grouped: { sec: string; items: Item[]; startIndex: number }[] = [];
  let runningIndex = 0;
  filtered.forEach((item) => {
    let last = grouped[grouped.length - 1];
    if (!last || last.sec !== item.sec) {
      grouped.push({ sec: item.sec, items: [], startIndex: runningIndex });
      last = grouped[grouped.length - 1];
    }
    last.items.push(item);
    runningIndex += 1;
  });

  const typingDone = answer ? typed.length >= answer.body.length : false;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: [0.21, 0.61, 0.27, 1] }}
          className="fixed inset-0 z-[200]"
          role="dialog"
          aria-label="Ruevii AI command bar"
        >
          <motion.div
            onClick={close}
            className="absolute inset-0 bg-[rgba(15,15,14,0.4)] backdrop-blur-[3px]"
          />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.18, ease: [0.21, 0.61, 0.27, 1] }}
            className="absolute left-1/2 top-[14vh] -translate-x-1/2 w-[min(600px,92vw)] bg-[#181816] text-[#f4f3ef] border border-[#2c2c29] rounded-[12px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-3 px-5 py-[17px] border-b border-[#2c2c29]">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0 fill-[var(--color-blue)]">
                <path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (answer) setAnswer(null); // typing returns to search
                }}
                placeholder="Ask Ruevii or jump to anything…"
                className="flex-1 bg-transparent border-none outline-none text-[#fafaf8] text-[17px] placeholder:text-[#6f6c64]"
                autoComplete="off"
              />
              <span className="font-mono text-[11px] text-[#8a877f] border border-[#34342f] rounded-[5px] px-2 py-[3px]">
                ESC
              </span>
            </div>

            <div className="max-h-[380px] overflow-y-auto p-2">
              {answer ? (
                /* ----------------------- ANSWER VIEW ----------------------- */
                <motion.div
                  key="answer"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: [0.21, 0.61, 0.27, 1] }}
                  className="px-1"
                >
                  <div className="flex items-center gap-2 px-3 pt-3 pb-[6px]">
                    <button
                      onClick={() => setAnswer(null)}
                      className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#8a877f] hover:text-[#d8d6cf] transition-colors inline-flex items-center gap-1"
                    >
                      ← Ask
                    </button>
                    <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#6f6c64] truncate">
                      / {answer.query}
                    </span>
                  </div>

                  <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#6f6c64] px-3 pt-2 pb-2">
                    Answer
                  </div>
                  <p className="px-3 pb-2 text-[14.5px] leading-[1.55] text-[#d8d6cf] whitespace-pre-wrap">
                    {typed}
                    {!typingDone && (
                      <span className="inline-block w-[2px] h-[15px] bg-[var(--color-blue)] ml-[1px] align-[-2px] caret-blink" />
                    )}
                  </p>

                  <AnimatePresence>
                    {typingDone && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: [0.21, 0.61, 0.27, 1] }}
                      >
                        <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#6f6c64] px-3 pt-3 pb-[6px]">
                          Suggested actions
                        </div>
                        {answer.actions.map((a, idx) => {
                          const isSel = idx === selected;
                          return (
                            <div
                              key={a.label}
                              onMouseEnter={() => setSelected(idx)}
                              onClick={close}
                              className={`flex items-center gap-[13px] px-3 py-[11px] rounded-[7px] text-[14.5px] cursor-pointer transition-colors ${
                                isSel || a.hot ? "bg-[#232320] text-[#fafaf8]" : "text-[#d8d6cf]"
                              }`}
                            >
                              <span
                                className={`w-[19px] h-[19px] rounded-[5px] border-[1.5px] shrink-0 transition-colors ${
                                  isSel || a.hot
                                    ? "border-[var(--color-blue)] bg-[color-mix(in_srgb,var(--color-blue)_22%,transparent)]"
                                    : "border-[#44443f]"
                                }`}
                              />
                              {a.label}
                              <span className="ml-auto font-mono text-[11px] text-[#6f6c64]">
                                {a.hint}
                              </span>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : filtered.length === 0 ? (
                /* ----------------------- EMPTY → ASK ----------------------- */
                <div
                  onClick={() => ask(query)}
                  className="flex items-center gap-[13px] m-1 px-3 py-[13px] rounded-[7px] text-[14.5px] cursor-pointer bg-[#232320] text-[#fafaf8]"
                >
                  <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] shrink-0 fill-[var(--color-blue)]">
                    <path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" />
                  </svg>
                  Ask Ruevii — “{query.trim()}”
                  <span className="ml-auto font-mono text-[11px] text-[#6f6c64]">↵</span>
                </div>
              ) : (
                /* ----------------------- LIST VIEW ----------------------- */
                grouped.map((g) => (
                  <div key={g.sec}>
                    <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#6f6c64] px-3 pt-3 pb-[6px]">
                      {g.sec}
                    </div>
                    {g.items.map((it, idx) => {
                      const globalIdx = g.startIndex + idx;
                      const isSel = globalIdx === selected;
                      const isAI = it.sec === "Ask Ruevii AI";
                      return (
                        <motion.div
                          key={it.label}
                          onMouseEnter={() => setSelected(globalIdx)}
                          onClick={() => runItem(it)}
                          className={`flex items-center gap-[13px] px-3 py-[11px] rounded-[7px] text-[14.5px] cursor-pointer transition-colors ${
                            isSel ? "bg-[#232320] text-[#fafaf8]" : "text-[#d8d6cf]"
                          }`}
                        >
                          {isAI ? (
                            <svg viewBox="0 0 24 24" className="w-[19px] h-[19px] shrink-0 fill-[var(--color-blue)]">
                              <path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" />
                            </svg>
                          ) : (
                            <span
                              className={`w-[19px] h-[19px] rounded-[5px] border-[1.5px] shrink-0 transition-colors ${
                                isSel ? "border-[var(--color-blue)] bg-[color-mix(in_srgb,var(--color-blue)_22%,transparent)]" : "border-[#44443f]"
                              }`}
                            />
                          )}
                          {it.label}
                          <span className="ml-auto font-mono text-[11px] text-[#6f6c64]">
                            {it.hint}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
