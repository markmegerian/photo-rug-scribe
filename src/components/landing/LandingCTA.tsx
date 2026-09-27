import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/analytics';

export default function LandingCTA() {
  return (
    <section className="bg-foreground py-16 text-background lg:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="font-serif font-normal text-[30px] leading-[1.1] tracking-[-0.01em] lg:text-[40px]">See it with your own rug.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-background/75 sm:text-lg">
          Upload a photo for an instant sample assessment, or book a walkthrough with our team.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="h-12 w-full rounded-[8px] px-[22px] text-[15px] font-medium hover:bg-secondary/90 sm:w-auto"
          >
            <Link to="/live-demo" onClick={() => trackCTAClick('Try it with a rug photo', 'bottom_cta')}>
              Try it with a rug photo
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button
            size="lg"
            asChild
            className="h-12 w-full rounded-[8px] border border-background bg-transparent px-[22px] text-[15px] font-medium text-background hover:bg-background hover:text-foreground sm:w-auto"
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
