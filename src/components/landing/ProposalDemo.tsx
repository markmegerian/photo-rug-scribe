import { Check, CheckCircle2, Maximize2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import SampleRugPhoto from './SampleRugPhoto';
import {
  approveSample,
  resetSample,
  sampleServices,
  setActiveSampleService,
  toggleSampleService,
  useSampleSelection,
} from './sampleProposal';

const DISCLOSURE = 'Interactive example only. Your selections do not approve services or change a real job.';

function ServiceRow({ id, expanded, source }: { id: string; expanded: boolean; source: string }) {
  const { selected, active } = useSampleSelection();
  const s = sampleServices.find((x) => x.id === id)!;
  const on = !!selected[s.id];
  const isActive = active === s.id;
  const showDetail = expanded || isActive;

  return (
    <li className={`border-b border-border last:border-b-0 ${isActive ? 'bg-muted/60' : ''}`}>
      <div className="flex items-center gap-3 px-4 py-2">
        <input
          type="checkbox"
          className="h-5 w-5 shrink-0 cursor-pointer accent-foreground"
          checked={on}
          onChange={() => toggleSampleService(s.id, source)}
          aria-label={`Include ${s.name}, $${s.price}`}
        />
        <button
          type="button"
          onClick={() => setActiveSampleService(s.id)}
          aria-expanded={showDetail}
          className="flex min-h-11 flex-1 items-center justify-between gap-3 text-left text-sm focus-visible:outline-none focus-visible:underline"
        >
          <span className="flex items-center gap-2 font-bold">
            <span aria-hidden="true" className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${isActive ? 'bg-foreground text-background' : 'border border-foreground'}`}>{s.marker}</span>
            {s.name}
            {s.optional && <span className="text-xs font-semibold text-muted-foreground">Optional</span>}
          </span>
          <span className="font-extrabold tabular-nums">${s.price}</span>
        </button>
      </div>
      {showDetail && (
        <dl className={`grid gap-2 px-4 pb-4 pl-12 text-sm leading-relaxed ${expanded ? 'sm:text-base' : ''}`}>
          <div><dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Observed</dt><dd>{s.found}</dd></div>
          <div><dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Why it’s recommended</dt><dd>{s.why}</dd></div>
          <div><dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Client benefit</dt><dd>{s.benefit}</dd></div>
        </dl>
      )}
    </li>
  );
}

function Outcome({ source }: { source: string }) {
  const { total, count, approved } = useSampleSelection();
  return (
    <div className="border-t border-border p-4">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-semibold">Selected total <span className="font-normal text-muted-foreground">({count} of {sampleServices.length})</span></span>
        <span className="text-2xl font-extrabold tabular-nums" aria-live="polite">${total}</span>
      </div>
      {approved ? (
        <div role="status" className="mt-3 flex items-center justify-between gap-3 bg-muted px-3 py-2 text-sm">
          <span className="flex items-center gap-2 font-semibold"><CheckCircle2 className="h-4 w-4" aria-hidden="true" />Sample approved: {count} service{count === 1 ? '' : 's'}, ${total}</span>
          <button type="button" onClick={resetSample} className="inline-flex min-h-11 items-center gap-1 font-semibold underline underline-offset-4">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />Reset
          </button>
        </div>
      ) : (
        <Button className="mt-3 w-full" disabled={count === 0} onClick={() => approveSample(source)}>
          <Check aria-hidden="true" />Approve selected services (sample)
        </Button>
      )}
    </div>
  );
}

export default function ProposalDemo({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { active } = useSampleSelection();

  return (
    <>
      <aside aria-label="Sample client proposal" className="border border-border bg-card shadow-medium">
        <div className="flex items-center justify-between border-b border-border px-4 py-2 text-xs">
          <span className="font-semibold uppercase tracking-[0.16em]">Sample client proposal</span>
          <span className="text-muted-foreground">Illustrative · 8' × 10' wool rug</span>
        </div>
        <div className="grid sm:grid-cols-[0.85fr_1.15fr]">
          <SampleRugPhoto priority active={active} />
          <div className="flex flex-col">
            <ul className="flex-1">
              {sampleServices.map((s) => <ServiceRow key={s.id} id={s.id} expanded={false} source="hero" />)}
            </ul>
          </div>
        </div>
        <Outcome source="hero" />
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          className="flex min-h-11 w-full items-center justify-center gap-2 border-t border-border text-sm font-semibold hover:bg-muted"
        >
          <Maximize2 className="h-4 w-4" aria-hidden="true" />View full proposal
        </button>
      </aside>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="h-[100dvh] max-h-[100dvh] w-full max-w-none gap-0 overflow-y-auto p-0 sm:h-auto sm:max-h-[92vh] sm:max-w-5xl">
          <div className="border-b border-border px-5 py-4 pr-12">
            <DialogTitle className="text-xl font-extrabold">Sample client proposal</DialogTitle>
            <DialogDescription className="mt-1 text-sm">{DISCLOSURE}</DialogDescription>
          </div>
          <div className="grid md:grid-cols-[0.9fr_1.1fr]">
            <figure className="md:sticky md:top-0 md:self-start">
              <SampleRugPhoto active={active} />
              <figcaption className="px-5 py-2 text-xs text-muted-foreground">Illustrative findings. Select a marker to read its explanation.</figcaption>
            </figure>
            <div>
              <ul>{sampleServices.map((s) => <ServiceRow key={s.id} id={s.id} expanded source="viewer" />)}</ul>
              <Outcome source="viewer" />
              <p className="px-4 pb-4 text-xs text-muted-foreground">Your team reviews every recommendation and price before a proposal is sent.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
