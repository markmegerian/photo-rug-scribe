import SampleRugPhoto from './SampleRugPhoto';
import { sampleServices, toggleSampleService, useSampleSelection } from './sampleProposal';

export default function LandingSampleProposal() {
  const { selected, total, count } = useSampleSelection();

  return (
    <section id="sample-proposal" aria-labelledby="sample-proposal-heading" className="scroll-mt-16 border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Sample customer proposal · illustrative data</p>
        <h2 id="sample-proposal-heading" className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">What your client sees</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">An example 8' × 10' wool rug. Your team reviews every recommendation and price before a proposal is sent.</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <figure className="lg:sticky lg:top-24">
            <SampleRugPhoto />
            <figcaption className="mt-2 text-xs text-muted-foreground">Numbered markers show areas flagged for attention.</figcaption>
          </figure>

          <div>
            <ul className="space-y-3">
              {sampleServices.map((s) => {
                const on = !!selected[s.id];
                return (
                  <li key={s.id} className={`bg-card p-4 shadow-soft ${on ? 'ring-1 ring-foreground' : ''}`}>
                    <div className="flex items-start justify-between gap-3">
                      <p className="flex items-center gap-2 font-extrabold">
                        <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs text-background">{s.marker}</span>
                        {s.name}{s.optional && <span className="text-xs font-semibold text-muted-foreground">Optional</span>}
                      </p>
                      <span className="font-extrabold">${s.price}</span>
                    </div>
                    <details className="group mt-2 text-sm leading-relaxed">
                      <summary className="flex min-h-11 cursor-pointer items-center text-muted-foreground">
                        {s.found} <span className="ml-2 whitespace-nowrap font-semibold text-foreground underline underline-offset-4 group-open:hidden">Why it matters</span>
                      </summary>
                      <p className="mt-1"><span className="font-semibold">Why we recommend it:</span> {s.why}</p>
                      <p className="mt-1"><span className="font-semibold">What you gain:</span> {s.benefit}</p>
                    </details>
                    <label className="mt-1 flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold">
                      <input
                        type="checkbox"
                        className="h-5 w-5 accent-foreground"
                        checked={on}
                        onChange={() => toggleSampleService(s.id, 'sample_section')}
                        aria-label={`Select ${s.name}, $${s.price}`}
                      />
                      {on ? 'Selected' : 'Not selected'}
                    </label>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="font-semibold">Estimate total <span className="font-normal text-muted-foreground">({count} of {sampleServices.length} services)</span></span>
              <span className="text-2xl font-extrabold" aria-live="polite">${total}</span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Interactive example only. Your selections do not approve services or change a real job.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
