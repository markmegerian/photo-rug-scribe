import rugPhoto from '@/assets/demo-rug-1.jpg';
import { sampleServices, setActiveSampleService } from './sampleProposal';

export default function SampleRugPhoto({ priority = false, active, className = "" }: { priority?: boolean; active?: string; className?: string }) {
  return (
    <div className={`relative aspect-square bg-muted ${className}`}>
      <img
        src={rugPhoto}
        alt="Sample wool rug with numbered markers on the field, the fringed end, and a high-traffic area"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority={priority ? 'high' : undefined}
        loading={priority ? undefined : 'lazy'}
      />
      {sampleServices.map((s) => {
        const on = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveSampleService(s.id)}
            aria-pressed={on}
            aria-label={`Marker ${s.marker}: show ${s.name} explanation`}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            className={`absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-foreground bg-background text-[13px] font-semibold text-foreground shadow-sm transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              on ? 'scale-110 border-border bg-muted text-foreground' : 'hover:scale-105'
            }`}
          >
            {s.marker}
          </button>
        );
      })}
    </div>
  );
}
