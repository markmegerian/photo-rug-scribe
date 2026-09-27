import { ArrowDown, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/analytics';
import SampleRugPhoto from './SampleRugPhoto';
import { sampleServices } from './sampleProposal';

const SELECTED_TOTAL = 620;

export default function LandingHero() {
  return (
    <section id="top" className="pb-16 pt-24 lg:pb-24 lg:pt-28">
      <div className="mx-auto grid max-w-[1120px] gap-10 px-6 lg:grid-cols-[0.82fr_1fr] lg:items-center lg:gap-12 lg:px-8">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
            For rug cleaning companies and rug retailers
          </p>
          <h1 className="max-w-xl font-serif font-normal text-[42px] leading-[1.02] tracking-[-0.01em] text-foreground lg:text-[64px]">
            Rug care expertise that builds client confidence.
          </h1>
          <p className="mt-5 max-w-[34em] text-base leading-relaxed text-muted-foreground sm:text-lg">
            Your staff photograph the rug. RugBoost flags what it needs, explains why, and prices it using your rates. Clients review and approve online.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              asChild
              id="hero-cta"
              className="h-12 w-full rounded-[8px] px-[22px] text-[15px] font-medium sm:w-auto"
            >
              <Link to="/live-demo" onClick={() => trackCTAClick('Try it with a rug photo', 'hero')}>
                Try it with a rug photo
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 w-full rounded-[8px] border-foreground px-[22px] text-[15px] font-medium hover:bg-muted hover:text-foreground sm:w-auto"
            >
              <Link to="/request-demo" onClick={() => trackCTAClick('Request a demo', 'hero')}>
                Request a demo
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
            No account needed for the live demo. Photos are used only to generate your sample report.
          </p>
        </div>

        <div id="sample-proposal" className="scroll-mt-20">
          <div aria-label="From rug photo to client proposal" className="overflow-hidden rounded-[12px] border border-border bg-card shadow-hero">
            <div className="grid sm:grid-cols-[1fr_auto_1fr]">
              <div className="p-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                  Your team captures
                </p>
                <SampleRugPhoto priority />
              </div>
              <div className="flex items-center justify-center px-1 py-2 sm:py-0" aria-hidden="true">
                <ArrowRight className="hidden h-5 w-5 text-muted-foreground sm:block" />
                <ArrowDown className="h-5 w-5 text-muted-foreground sm:hidden" />
              </div>
              <div className="flex flex-col p-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                  Your client receives
                </p>
                <ul className="flex-1">
                  {sampleServices.map((s, i) => (
                    <li key={s.id} className="flex items-center gap-3 border-b border-border py-2.5 last:border-b-0">
                      <span
                        aria-hidden="true"
                        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border ${
                          i < 2 ? 'border-foreground bg-foreground text-background' : 'border-foreground bg-background'
                        }`}
                      >
                        {i < 2 && <Check className="h-3 w-3" strokeWidth={3} />}
                      </span>
                      <span className="flex flex-1 items-center gap-2 text-sm font-semibold">
                        <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full border border-foreground text-[11px]">{s.marker}</span>
                        {s.name}
                        {s.optional && (
                          <span className="border border-border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Optional</span>
                        )}
                      </span>
                      <span className="text-sm font-semibold tabular-nums">${s.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 border-t border-border pt-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium">Selected total</span>
                    <span className="text-2xl font-semibold tabular-nums">${SELECTED_TOTAL}</span>
                  </div>
                  <Button className="mt-3 h-12 w-full rounded-[8px] text-[15px] font-medium" disabled tabIndex={-1} aria-hidden="true">
                    Approve selected services
                  </Button>
                </div>
              </div>
            </div>
            <p className="border-t border-border px-4 py-2.5 text-[13px] text-muted-foreground">
              Sample proposal. 8' × 10' wool rug. Illustrative pricing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
