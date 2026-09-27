import rugPhoto from '@/assets/demo-rug-1.jpg';
import { sampleServices } from './sampleProposal';

export default function SampleRugPhoto({ priority = false, highlight }: { priority?: boolean; highlight?: string }) {
  return (
    <div className="relative aspect-square overflow-hidden bg-muted">
      <img
        src={rugPhoto}
        alt="Sample rug with numbered markers on the soiled field, the worn fringe, and a high-traffic area"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority={priority ? 'high' : undefined}
        loading={priority ? undefined : 'lazy'}
      />
      {sampleServices.map((s) => (
        <span
          key={s.id}
          aria-hidden="true"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          className={`absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-background text-xs font-extrabold shadow-soft ${
            !highlight || highlight === s.id ? 'bg-foreground text-background' : 'bg-background text-foreground'
          }`}
        >
          {s.marker}
        </span>
      ))}
    </div>
  );
}
