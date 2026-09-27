import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackCTAClick, trackEvent } from '@/lib/analytics';
import rugPhoto from '@/assets/demo-rug-1.jpg';

type Service = {
  id: string;
  marker: number;
  name: string;
  price: number;
  found: string;
  why: string;
  benefit: string;
  // Marker position on the photo (percent)
  x: number;
  y: number;
};

const services: Service[] = [
  {
    id: 'cleaning',
    marker: 1,
    name: 'Deep immersion cleaning',
    price: 440,
    found: 'Ground-in soil across the field, dulling the colors.',
    why: 'Grit settles deep in the pile, where vacuuming cannot reach it. Over time it acts like sandpaper on the fibers.',
    benefit: 'Removes embedded soil, brings back the depth of the colors, and helps the rug wear more slowly.',
    x: 50,
    y: 45,
  },
  {
    id: 'fringe',
    marker: 2,
    name: 'Fringe repair',
    price: 180,
    found: 'Loose and missing knots along both ends.',
    why: 'The fringe is part of the rug’s foundation. Once it loosens, wear can spread into the woven body.',
    benefit: 'Secures the ends so damage stops spreading, protecting the rug’s appearance and value.',
    x: 30,
    y: 90,
  },
  {
    id: 'protect',
    marker: 3,
    name: 'Fiber protection (optional)',
    price: 95,
    found: 'High-traffic wool rug in a family room.',
    why: 'A protective treatment helps fibers resist new spills and soiling between cleanings.',
    benefit: 'Gives extra time to blot spills before they set. Recommended, not required.',
    x: 72,
    y: 22,
  },
];

export default function LandingHero() {
  const [selected, setSelected] = useState<Record<string, boolean>>({ cleaning: true, fringe: true, protect: false });
  const total = services.reduce((sum, s) => (selected[s.id] ? sum + s.price : sum), 0);
  const count = services.filter((s) => selected[s.id]).length;

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      trackEvent('sample_proposal_toggle', { service: id, included: next[id] });
      return next;
    });
  };

  return (
    <section id="top" className="border-b border-border pt-24 sm:pt-28 lg:pt-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-12 sm:px-6 sm:pb-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-14 lg:px-8 lg:pb-20">
        <div className="lg:pt-10">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            For cleaning companies &amp; rug retailers
          </p>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.02] text-foreground sm:text-5xl lg:text-6xl">
            Rug care expertise that builds client confidence.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            RugBoost equips cleaning companies and rug retailers to identify service opportunities, communicate their value, and guide clients toward informed approval.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button size="lg" asChild>
              <Link to="/request-demo" onClick={() => trackCTAClick('Book a demo', 'hero')}>
                Book a demo
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <a className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4" href="#sample-proposal">
              Explore a sample proposal
            </a>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Clear recommendations. Transparent prices. Customer choice.</p>
        </div>

        <section
          id="sample-proposal"
          aria-labelledby="sample-proposal-heading"
          className="scroll-mt-20 border border-border bg-card shadow-medium"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 sm:px-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Sample customer proposal · illustrative data
            </p>
            <span className="text-xs text-muted-foreground">Reviewed by your team before sending</span>
          </div>

          <div className="px-4 pt-4 sm:px-5">
            <h2 id="sample-proposal-heading" className="text-lg font-extrabold">Your rug care proposal</h2>
            <p className="text-xs text-muted-foreground">8' × 10' hand-knotted wool rug · What the customer sees</p>
          </div>

          <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-[0.8fr_1.2fr]">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden border border-border">
                <img
                  src={rugPhoto}
                  alt="Sample hand-knotted rug with numbered markers on the soiled field, worn fringe, and a high-traffic area"
                  className="absolute inset-0 h-full w-full object-cover"
                  fetchPriority="high"
                />
                {services.map((s) => (
                  <span
                    key={s.id}
                    aria-hidden="true"
                    style={{ left: `${s.x}%`, top: `${s.y}%` }}
                    className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-background bg-foreground text-xs font-extrabold text-background shadow-soft"
                  >
                    {s.marker}
                  </span>
                ))}
              </div>
              <figcaption className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                Numbered markers show areas flagged for attention. Your team confirms each one.
              </figcaption>
            </figure>

            <div>
              <ul className="space-y-3">
                {services.map((s) => {
                  const on = !!selected[s.id];
                  return (
                    <li key={s.id} className={`border ${on ? 'border-foreground' : 'border-border'}`}>
                      <div className="flex items-start justify-between gap-3 border-b border-border px-3 py-2">
                        <span className="flex items-start gap-2">
                          <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-muted text-[11px] font-extrabold">{s.marker}</span>
                          <span className="text-sm font-extrabold">{s.name}</span>
                        </span>
                        <span className="text-sm font-extrabold">${s.price}</span>
                      </div>
                      <div className="space-y-1.5 px-3 py-2 text-xs leading-relaxed">
                        <p className="text-muted-foreground"><span className="font-semibold text-foreground">What we found:</span> {s.found}</p>
                        <p><span className="font-semibold">Why we recommend it:</span> {s.why}</p>
                        <p className="border-l-2 border-foreground pl-2"><span className="font-semibold">What you gain:</span> {s.benefit}</p>
                      </div>
                      <label className="flex min-h-11 cursor-pointer items-center gap-2 border-t border-border px-3 text-xs font-semibold focus-within:outline focus-within:outline-2 focus-within:outline-ring">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-foreground"
                          checked={on}
                          onChange={() => toggle(s.id)}
                          aria-label={`Approve ${s.name}, $${s.price}`}
                        />
                        {on ? 'Approved in this sample' : 'Declined in this sample'}
                      </label>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm font-semibold">
                  Estimate total <span className="font-normal text-muted-foreground">({count} of {services.length} services)</span>
                </span>
                <span className="text-xl font-extrabold" aria-live="polite">${total}</span>
              </div>
              <p className="mt-3 flex items-start gap-2 bg-muted/60 p-3 text-[11px] leading-relaxed text-muted-foreground">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Try selecting or declining services. This sample is not connected to any real job, and nothing is sent or recorded.
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
