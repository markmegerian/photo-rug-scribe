import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/analytics';

export default function LandingCTA() {
  return (
    <section className="bg-foreground py-16 text-background sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">See how RugBoost helps make the sale.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-background/75 sm:text-lg">
          Explore how your team can go from rug photos to service recommendations, customer explanations, and an estimate ready for approval.
        </p>
        <Button size="lg" variant="secondary" asChild className="mt-8">
          <Link to="/request-demo" onClick={() => trackCTAClick('Book a demo', 'bottom_cta')}>
            Book a demo
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
        <p className="mt-3 text-sm text-background/60">A personal walkthrough. No obligation.</p>
      </div>
    </section>
  );
}