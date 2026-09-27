import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function LandingFounder() {
  return (
    <section className="border-t border-border bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div
            className="mx-auto aspect-square w-full max-w-[240px] rounded-lg bg-muted/60"
            role="img"
            aria-label="Founder photo placeholder"
          />
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Who built it</p>
            <h2 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
              Built inside a working rug cleaning plant.
            </h2>
            <p className="mt-4 max-w-[36em] text-sm leading-7 text-muted-foreground sm:text-base">
              RugBoost was created by Mark Megerian, a rug care professional in Brooklyn, NY. It grew out of a daily
              problem: recognizing what a rug needs is one skill, and explaining why a service is worth it is another.
              RugBoost helps every member of your team do both.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
              onClick={() => {
                import('@/lib/analytics').then(({ trackCTAClick }) =>
                  trackCTAClick('About RugBoost', 'founder'),
                );
              }}
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
