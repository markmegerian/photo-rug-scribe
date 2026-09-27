import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { trackCTAClick } from '@/lib/analytics';

export default function LandingFounder() {
  return (
    <section className="bg-muted py-16 lg:py-24">
      <div className="mx-auto max-w-[1120px] px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div
            className="mx-auto aspect-square w-full max-w-[240px] rounded-[12px] border border-border bg-card"
            role="img"
            aria-label="Founder photo placeholder"
          />
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">Who built it</p>
            <h2 className="font-serif font-normal text-[30px] leading-[1.1] tracking-[-0.01em] text-foreground lg:text-[40px]">
              Built inside a working rug cleaning plant.
            </h2>
            <p className="mt-4 max-w-[36em] text-sm leading-7 text-muted-foreground sm:text-base">
              RugBoost was created by Mark Megerian, a rug care professional in Brooklyn, NY. It grew out of a daily
              problem: recognizing what a rug needs is one skill, and explaining why a service is worth it is another.
              RugBoost helps every member of your team do both.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-foreground underline-offset-4 transition-colors duration-150 hover:underline"
              onClick={() => trackCTAClick('About RugBoost', 'founder')}
            >
              About RugBoost
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
