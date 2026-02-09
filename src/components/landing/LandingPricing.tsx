import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Star, Zap } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    price: '$49',
    period: '/month',
    description: 'Perfect for small operations getting started with AI inspection.',
    features: [
      'Up to 2 staff users',
      'AI-powered rug analysis',
      'Guided photo capture',
      'Professional estimates',
      'Client portal',
      'Email support',
    ],
    highlighted: false,
    cta: 'Start Free Trial',
    ctaVariant: 'outline' as const,
  },
  {
    name: 'Pro',
    price: '$129',
    period: '/month',
    description: 'For growing businesses that need advanced features and insights.',
    features: [
      'Up to 10 staff users',
      'Everything in Starter, plus:',
      'Analytics dashboard',
      'Custom email templates',
      'Advanced pricing rules',
      'Priority support',
      'Custom branding',
      'API access',
    ],
    highlighted: true,
    cta: 'Start Free Trial',
    ctaVariant: 'warm' as const,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large operations with custom requirements and integrations.',
    features: [
      'Unlimited staff users',
      'Everything in Pro, plus:',
      'White-label solution',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
      'On-premise option',
    ],
    highlighted: false,
    cta: 'Contact Sales',
    ctaVariant: 'outline' as const,
  },
];

export default function LandingPricing() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible, getDelay } = useStaggeredAnimation(plans.length, 150);

  return (
    <section id="pricing" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-12 transition-all duration-700 ease-out",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Pricing
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Start free, upgrade when ready
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Try RugBoost free for 14 days. No credit card required.
          </p>
        </div>

        {/* Trial banner */}
        <div className={cn(
          "max-w-2xl mx-auto mb-12 p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center gap-3 text-center transition-all duration-700",
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <Zap className="h-5 w-5 text-primary flex-shrink-0" />
          <p className="text-sm">
            <span className="font-semibold text-foreground">14-day free trial</span>
            <span className="text-muted-foreground"> on all plans • Full access to all features • Cancel anytime</span>
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={cn(
                "relative flex flex-col transition-all duration-700 ease-out",
                plan.highlighted
                  ? 'border-primary shadow-lg ring-1 ring-primary/20 scale-[1.02]'
                  : 'border-border shadow-card',
                cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={cardsVisible ? getDelay(index) : {}}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-xs font-semibold text-primary-foreground shadow-md">
                    <Star className="h-3 w-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="font-display text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="mt-3">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.ctaVariant}
                  size="lg"
                  className="w-full"
                  asChild
                >
                  {plan.name === 'Enterprise' ? (
                    <a href="mailto:sales@rugboost.com">
                      {plan.cta}
                    </a>
                  ) : (
                    <Link to="/support">
                      {plan.cta}
                    </Link>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className={cn(
          "mt-12 text-center text-sm text-muted-foreground transition-all duration-700 delay-500",
          cardsVisible ? "opacity-100" : "opacity-0"
        )}>
          All prices in USD. Annual billing available with 2 months free.
        </p>
      </div>
    </section>
  );
}
