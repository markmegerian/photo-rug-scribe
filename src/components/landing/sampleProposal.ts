import { useSyncExternalStore } from 'react';
import { trackEvent } from '@/lib/analytics';

export type SampleService = {
  id: string;
  marker: number;
  name: string;
  price: number;
  found: string;
  why: string;
  benefit: string;
  optional?: boolean;
  /** Marker position on the square rug photo (percent) */
  x: number;
  y: number;
};

// Illustrative sample only — not a real customer or inspection.
export const sampleServices: SampleService[] = [
  {
    id: 'cleaning',
    marker: 1,
    name: 'Deep immersion cleaning',
    price: 440,
    found: 'Ground-in soil across the field, dulling the colors.',
    why: 'Grit settles deep in the pile, where vacuuming cannot reach it. Over time it acts like sandpaper on the fibers.',
    benefit: 'Removes embedded soil, brings back the depth of the colors, and helps the rug wear more slowly.',
    x: 50,
    y: 40,
  },
  {
    id: 'fringe',
    marker: 2,
    name: 'Fringe repair',
    price: 180,
    found: 'Loose and missing knots along the fringed ends.',
    why: 'The fringe is part of the rug’s foundation. Once it loosens, wear can spread into the woven body.',
    benefit: 'Helps stabilize worn ends and limit further unraveling.',
    x: 7,
    y: 56,
  },
  {
    id: 'protect',
    marker: 3,
    name: 'Fiber protection',
    optional: true,
    price: 95,
    found: 'Wool rug placed in a high-traffic room.',
    why: 'A protective treatment helps fibers resist new spills and soiling between cleanings.',
    benefit: 'Gives extra time to blot spills before they set. Recommended, not required.',
    x: 68,
    y: 64,
  },
];

let state: Record<string, boolean> = { cleaning: true, fringe: true, protect: false };
const listeners = new Set<() => void>();

export function toggleSampleService(id: string, source: string) {
  state = { ...state, [id]: !state[id] };
  trackEvent('sample_proposal_toggle', { service: id, included: state[id], source });
  listeners.forEach((l) => l());
}

export function useSampleSelection() {
  const selected = useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => state,
    () => state,
  );
  const total = sampleServices.reduce((s, x) => (selected[x.id] ? s + x.price : s), 0);
  const count = sampleServices.filter((x) => selected[x.id]).length;
  return { selected, total, count };
}
