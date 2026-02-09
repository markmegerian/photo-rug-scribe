import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Shield, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const highlights = [
  'SOC 2 Type II Certified',
  'GDPR & CCPA Compliant',
  '256-bit Encryption',
  '99.99% Uptime SLA',
];

export default function LandingSecurity() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={cn(
            "relative rounded-3xl bg-gradient-to-br from-primary/5 via-background to-accent/5 border border-border p-8 md:p-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Shield className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                Enterprise-grade security, built in
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                Your data is protected by industry-leading security measures. We take privacy seriously so you can focus on your business.
              </p>
              
              {/* Highlights */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                {highlights.map((item) => (
                  <div 
                    key={item}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" size="sm" asChild className="gap-2">
                <Link to="/security">
                  Learn more about our security
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Decorative */}
            <div className="hidden xl:flex items-center">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
