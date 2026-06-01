import { create } from "zustand";

/**
 * Maps a feature slug → carousel module index.
 * Used by the Features mega-menu to rotate the hero carousel to the matching mock.
 */
const SLUG_TO_INDEX: Record<string, number> = {
  calendar: 0,
  "smart-calendar": 0,
  "online-booking": 1,
  "clients-emr": 2,
  emr: 2,
  workflows: 3,
  automations: 3,
  "payments-pos": 4,
  payments: 4,
};

type HeroState = {
  active: number;
  paused: boolean;
  setActive: (i: number) => void;
  setActiveBySlug: (slug: string) => boolean;
  setPaused: (p: boolean) => void;
};

export const useHeroCarousel = create<HeroState>((set) => ({
  active: 0,
  paused: false,
  setActive: (i) => set({ active: i, paused: true }),
  setActiveBySlug: (slug) => {
    const idx = SLUG_TO_INDEX[slug];
    if (idx === undefined) return false;
    set({ active: idx, paused: true });
    return true;
  },
  setPaused: (p) => set({ paused: p }),
}));
