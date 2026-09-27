import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/analytics';
import SampleRugPhoto from './SampleRugPhoto';
import { sampleServices, toggleSampleService, useSampleSelection } from './sampleProposal';

export default function LandingHero() {
  const { selected, total } = useSampleSelection();
  const featured = sampleServices[1];
  const others = sampleServices.filter((s) => s.id !== featured.id && selected[s.id]);
  const on = !!selected[featured.id];

  return (
    <section id="top" className="border-b border-border pt-24 sm:pt-28 lg:pt-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-12 sm:px-6 sm:pb-16 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8 lg:pb-20">
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            For cleaning companies &amp; rug retailers
          </p>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.02] text-foreground sm:text-5xl lg:text-6xl">
            Rug care expertise that builds client confidence.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            RugBoost is an AI-assisted platform that helps your team recommend rug care services and explain their value through annotated photos, detailed service descriptions, and transparent pricing—giving clients the clarity to approve with confidence.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button size="lg" asChild id="hero-cta">
              <Link to="/request-demo" onClick={() => trackCTAClick('Book a demo', 'hero')}>
                Book a demo
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <a className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4" href="#sample-proposal">
              Explore a sample proposal
            </a>
          </div>
        </div>

        <aside aria-label="Sample proposal preview" className="bg-card shadow-medium">
          <div className="flex items-center justify-between px-4 py-2.5 text-xs text-muted-foreground">
            <span className="font-semibold uppercase tracking-[0.16em]">Sample · illustrative</span>
            <span>8' × 10' wool rug</span>
          </div>
          <div className="grid sm:grid-cols-[1fr_1fr]">
            <SampleRugPhoto priority highlight={featured.id} />
            <div className="flex flex-col p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="flex items-center gap-2 text-base font-extrabold">
                  <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs text-background">{featured.marker}</span>
                  {featured.name}
                </p>
                <span className="text-base font-extrabold">${featured.price}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{featured.found}</p>
              <p className="mt-2 text-sm leading-relaxed">{featured.benefit}</p>
              <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold">
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-foreground"
                  checked={on}
                  onChange={() => toggleSampleService(featured.id, 'hero')}
                  aria-label={`Select ${featured.name}, $${featured.price}`}
                />
                {on ? 'Selected' : 'Not selected'}
              </label>
              <div className="mt-auto border-t border-border pt-3 text-sm">
                <p className="text-muted-foreground">
                  {others.length ? `Also included: ${others.map((s) => `${s.name} ($${s.price})`).join(', ')}` : 'No other services selected'}
                </p>
                <p className="mt-2 flex items-center justify-between font-semibold">
                  Estimate total <span className="text-xl font-extrabold" aria-live="polite">${total}</span>
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
