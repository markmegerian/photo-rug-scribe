import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/analytics';
import ProposalDemo from './ProposalDemo';

export default function LandingHero() {
  const [open, setOpen] = useState(false);

  return (
    <section id="top" className="border-b border-border pt-20 sm:pt-24">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14 lg:px-8 lg:py-14">
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            For cleaning companies &amp; rug retailers
          </p>
          <h1 className="max-w-xl text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl">
            Rug care expertise that builds client confidence.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            An AI-assisted platform that helps your team recommend rug care services and present their value through annotated photos, clear explanations, and transparent pricing.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button size="lg" asChild id="hero-cta">
              <Link to="/request-demo" onClick={() => trackCTAClick('Request a demo', 'hero')}>
                Request a demo
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <button
              type="button"
              onClick={() => { setOpen(true); trackCTAClick('Explore the sample proposal', 'hero'); }}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4"
            >
              Explore the sample proposal
            </button>
          </div>
        </div>

        <div id="sample-proposal" className="scroll-mt-20">
          <ProposalDemo open={open} onOpenChange={setOpen} />
        </div>
      </div>
    </section>
  );
}
