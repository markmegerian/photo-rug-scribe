import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { trackCTAClick } from '@/lib/analytics';

const benefits = [
  "Live walkthrough with your rugs",
  "Setup help included",
  "No commitment"
];


export default function LandingCTA() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-foreground overflow-hidden relative">
      {/* Hairline grid */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }} />
      </div>


      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={ref}
          className={cn(
            "text-center transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-background mb-6 leading-[1.05]">
            Get your next inspection done in 60 seconds
          </h2>

          <p className="text-lg sm:text-xl text-background/80 mb-8 max-w-2xl mx-auto">
            See Rugboost run on your own rugs, your own pricing, and your own workflow. A 20-minute demo is all it takes.
          </p>

          {/* Benefits row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-background/90">
                <CheckCircle2 className="h-4 w-4" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Single primary CTA */}
          <div className="flex justify-center">
            <Button 
              size="xl" 
              variant="secondary"
              className="bg-background text-foreground hover:bg-background/85 gap-2 w-full sm:w-auto"
              asChild
            >
              <Link to="/request-demo" onClick={() => trackCTAClick('Request a Demo', 'bottom_cta')}>
                Request a Demo
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>


          <p className="mt-8 text-sm text-background/60">
            Questions? <Link to="/support" className="underline hover:text-background/80 transition-colors">Talk to our team</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
