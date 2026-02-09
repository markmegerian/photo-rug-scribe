import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const benefits = [
  "14-day free trial",
  "No credit card required",
  "Full feature access",
  "Cancel anytime"
];

export default function LandingCTA() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-accent overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
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
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
            Ready to transform your{' '}
            <span className="relative inline-block">
              rug business?
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-primary-foreground/30 rounded-full" />
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join 500+ rug cleaning professionals who save 5+ hours every week with RugBoost. 
            Start your free trial today.
          </p>

          {/* Benefits row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-primary-foreground/90">
                <CheckCircle2 className="h-4 w-4" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl" 
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg gap-2"
              asChild
            >
              <Link to="/support">
                Start Your Free Trial
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="xl" 
              variant="ghost"
              className="text-primary-foreground border-2 border-primary-foreground/30 hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Watch Demo
            </Button>
          </div>

          <p className="mt-8 text-sm text-primary-foreground/60">
            Questions? <Link to="/support" className="underline hover:text-primary-foreground/80 transition-colors">Talk to our team</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
