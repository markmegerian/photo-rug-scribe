import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/analytics';

export default function LandingCTA() {
  return (
    <section className="bg-foreground py-16 text-background sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">See RugBoost in action.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-background/75 sm:text-lg">
          A personal walkthrough of how your team goes from rug photos to reviewed recommendations and a client proposal. Share your details and we’ll contact you to arrange a time.
        </p>
        <Button size="lg" variant="secondary" asChild className="mt-8">
          <Link to="/request-demo" onClick={() => trackCTAClick('Request a demo', 'bottom_cta')}>
            Request a demo
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}