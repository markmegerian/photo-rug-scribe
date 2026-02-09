import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Clock, Gift, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const bonuses = [
  {
    icon: '🎁',
    title: 'Free Onboarding Call',
    value: '$200 value',
    description: '30-minute 1-on-1 setup session with our team',
  },
  {
    icon: '📚',
    title: 'Training Library Access',
    value: '$150 value',
    description: 'Complete video training for your entire team',
  },
  {
    icon: '📝',
    title: 'Custom Report Templates',
    value: '$100 value',
    description: '5 professional templates branded for your business',
  },
];

export default function LandingUrgency() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-accent via-primary to-accent overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div 
        ref={ref}
        className={cn(
          "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="text-center mb-10">
          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-bold mb-6 animate-pulse">
            <Zap className="h-4 w-4" />
            Limited Time Offer
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Start today and get{' '}
            <span className="underline decoration-wavy decoration-2 underline-offset-4">
              $450 in bonuses
            </span>
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Sign up for your free trial this week and unlock exclusive onboarding perks—at no extra cost.
          </p>
        </div>

        {/* Bonus Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {bonuses.map((bonus, index) => (
            <div 
              key={bonus.title}
              className={cn(
                "relative p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isVisible ? `${index * 100 + 200}ms` : '0ms' }}
            >
              <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-primary-foreground text-primary text-xs font-bold">
                {bonus.value}
              </div>
              <span className="text-3xl mb-3 block">{bonus.icon}</span>
              <h3 className="text-lg font-semibold text-primary-foreground mb-1">
                {bonus.title}
              </h3>
              <p className="text-sm text-primary-foreground/70">
                {bonus.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={cn(
          "text-center transition-all duration-700 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <Button 
            size="xl" 
            variant="secondary"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg gap-2 text-lg px-10"
            asChild
          >
            <Link to="/support">
              Request a Demo
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-primary-foreground/70">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Offer ends soon
            </span>
            <span className="hidden sm:inline">•</span>
            <span>No credit card required</span>
            <span className="hidden sm:inline">•</span>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
