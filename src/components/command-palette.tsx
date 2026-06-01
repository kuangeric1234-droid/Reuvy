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
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter((i) => i.label.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        toggle();
        return;
      }
      if (!useCommandPalette.getState().isOpen) return;
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
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered.length, close, toggle]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelected(0);
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
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask Ruevii or jump to anything…"
                className="flex-1 bg-transparent border-none outline-none text-[#fafaf8] text-[17px] placeholder:text-[#6f6c64]"
                autoComplete="off"
              />
              <span className="font-mono text-[11px] text-[#8a877f] border border-[#34342f] rounded-[5px] px-2 py-[3px]">
                ESC
              </span>
            </div>

            <div className="max-h-[360px] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="p-[30px] text-center text-[#6f6c64] text-[14px]">
                  No matches — try "payment", "consent", or "report".
                </div>
              ) : (
                grouped.map((g) => (
                  <div key={g.sec}>
                    <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#6f6c64] px-3 pt-3 pb-[6px]">
                      {g.sec}
                    </div>
                    {g.items.map((it, idx) => {
                      const globalIdx = g.startIndex + idx;
                      const isSel = globalIdx === selected;
                      return (
                        <motion.div
                          key={it.label}
                          onMouseEnter={() => setSelected(globalIdx)}
                          onClick={close}
                          className={`flex items-center gap-[13px] px-3 py-[11px] rounded-[7px] text-[14.5px] cursor-pointer transition-colors ${
                            isSel ? "bg-[#232320] text-[#fafaf8]" : "text-[#d8d6cf]"
                          }`}
                        >
                          <span
                            className={`w-[19px] h-[19px] rounded-[5px] border-[1.5px] shrink-0 transition-colors ${
                              isSel
                                ? "border-[var(--color-blue)] bg-[color-mix(in_srgb,var(--color-blue)_22%,transparent)]"
                                : "border-[#44443f]"
                            }`}
                          />
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
