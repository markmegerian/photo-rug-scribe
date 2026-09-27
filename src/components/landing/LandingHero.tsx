import { ArrowDown, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/analytics';
import SampleRugPhoto from './SampleRugPhoto';
import { sampleServices } from './sampleProposal';

const SELECTED_TOTAL = 620;

export default function LandingHero() {
  return (
    <section id="top" className="border-b border-border pt-20 sm:pt-24">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 pb-14 sm:px-6 sm:pb-20 lg:grid-cols-[0.82fr_1fr] lg:items-center lg:gap-12 lg:px-8">
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            For rug cleaning companies and rug retailers
          </p>
          <h1 className="max-w-xl text-[38px] font-extrabold leading-[1.05] text-foreground lg:text-[56px]">
            Rug care expertise that builds client confidence.
          </h1>
          <p className="mt-5 max-w-[34em] text-base leading-relaxed text-muted-foreground sm:text-lg">
            Your staff photograph the rug. RugBoost flags what it needs, explains why, and prices it using your rates. Clients review and approve online.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" asChild id="hero-cta" className="w-full sm:w-auto">
              <Link to="/live-demo" onClick={() => trackCTAClick('Try it with a rug photo', 'hero')}>
                Try it with a rug photo
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full border-foreground sm:w-auto">
              <Link to="/request-demo" onClick={() => trackCTAClick('Request a demo', 'hero')}>
                Request a demo
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            No account needed for the live demo. Photos are used only to generate your sample report.
          </p>
        </div>

        <div id="sample-proposal" className="scroll-mt-20">
          <div aria-label="From rug photo to client proposal" className="rounded-lg border border-border bg-card shadow-medium">
            <div className="grid sm:grid-cols-[1fr_auto_1fr]">
              <div className="p-4">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Your team captures
                </p>
                <SampleRugPhoto priority />
              </div>
              <div className="flex items-center justify-center px-1 py-2 sm:py-0" aria-hidden="true">
                <ArrowRight className="hidden h-5 w-5 text-muted-foreground sm:block" />
                <ArrowDown className="h-5 w-5 text-muted-foreground sm:hidden" />
              </div>
              <div className="flex flex-col p-4">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Your client receives
                </p>
                <ul className="flex-1">
                  {sampleServices.map((s, i) => (
                    <li key={s.id} className="flex items-center gap-3 border-b border-border py-2.5 last:border-b-0">
                      <span
                        aria-hidden="true"
                        className={`flex h-5 w-5 shrink-0 items-center justify-center border ${i < 2 ? 'border-foreground bg-foreground text-background' : 'border-foreground bg-background'}`}
                      >
                        {i < 2 && <Check className="h-3.5 w-3.5" />}
                      </span>
                      <span className="flex flex-1 items-center gap-2 text-sm font-bold">
                        <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full border border-foreground text-[11px]">{s.marker}</span>
                        {s.name}
                        {s.optional && (
                          <span className="border border-border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Optional</span>
                        )}
                      </span>
                      <span className="text-sm font-extrabold tabular-nums">${s.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 border-t border-border pt-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold">Selected total</span>
                    <span className="text-2xl font-extrabold tabular-nums">${SELECTED_TOTAL}</span>
                  </div>
                  <Button className="mt-3 w-full" disabled tabIndex={-1} aria-hidden="true">
                    Approve selected services
                  </Button>
                </div>
              </div>
            </div>
            <p className="border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
              Sample proposal. 8' × 10' wool rug. Illustrative pricing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
