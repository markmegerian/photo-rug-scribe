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
    x: 32,
    y: 33,
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

type SampleState = { selected: Record<string, boolean>; active: string; approved: boolean };
const initial: SampleState = { selected: { cleaning: true, fringe: true, protect: false }, active: 'cleaning', approved: false };
let state: SampleState = initial;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function toggleSampleService(id: string, source: string) {
  state = { ...state, approved: false, selected: { ...state.selected, [id]: !state.selected[id] } };
  trackEvent('sample_proposal_toggle', { service: id, included: state.selected[id], source });
  emit();
}

/** Focus a service's explanation. Never changes selection. */
export function setActiveSampleService(id: string) {
  state = { ...state, active: id };
  emit();
}

/** Local sample only: nothing is submitted anywhere. */
export function approveSample(source: string) {
  state = { ...state, approved: true };
  trackEvent('sample_proposal_approve', { source });
  emit();
}

export function resetSample() {
  state = initial;
  emit();
}

export function useSampleSelection() {
  const s = useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => state,
    () => state,
  );
  const total = sampleServices.reduce((t, x) => (s.selected[x.id] ? t + x.price : t), 0);
  const count = sampleServices.filter((x) => s.selected[x.id]).length;
  return { selected: s.selected, active: s.active, approved: s.approved, total, count };
}
