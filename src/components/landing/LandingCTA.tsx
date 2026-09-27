import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/analytics';

export default function LandingCTA() {
  return (
    <section className="bg-foreground py-14 text-background sm:py-20">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">See it with your own rug.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-background/75 sm:text-lg">
          Upload a photo for an instant sample assessment, or book a walkthrough with our team.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
            <Link to="/live-demo" onClick={() => trackCTAClick('Try it with a rug photo', 'bottom_cta')}>
              Try it with a rug photo
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button
            size="lg"
            asChild
            className="w-full border border-background bg-transparent text-background hover:bg-background hover:text-foreground sm:w-auto"
          >
            <Link to="/request-demo" onClick={() => trackCTAClick('Request a demo', 'bottom_cta')}>
              Request a demo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
