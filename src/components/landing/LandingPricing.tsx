import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Star, Zap, ArrowRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PricingComparisonTable from './PricingComparisonTable';

const plans = [
  {
    name: 'Starter',
    price: '$79',
    period: '/month',
    annualPrice: '$65',
    description: 'Perfect for solo rug shops getting started.',
    features: [
      { text: 'Basic workflow management', tooltip: 'Track jobs from intake to delivery' },
      { text: 'Client portal', tooltip: 'Clients can view status & approve work' },
      { text: 'Online payments', tooltip: 'Accept payments through the portal' },
      { text: 'Professional estimates', tooltip: 'Branded PDF estimates with your logo' },
      { text: 'Email support', tooltip: 'Response within 24 hours' },
    ],
    highlighted: false,
    cta: 'Request a Demo',
    ctaVariant: 'outline' as const,
    savings: null,
  },
  {
    name: 'Growth',
    price: '$199',
    period: '/month',
    annualPrice: '$165',
    description: 'For small teams ready to scale operations.',
    features: [
      { text: 'Everything in Starter, plus:', tooltip: null },
      { text: 'Up to 5 staff users', tooltip: 'Add additional users for $20/month each' },
      { text: 'Operations checklist', tooltip: 'Standardized processes for quality control' },
      { text: 'AR damage documentation', tooltip: 'Visual condition reports with annotations' },
      { text: 'Analytics dashboard', tooltip: 'Revenue, conversions, service popularity' },
      { text: 'Upsell recommendations', tooltip: 'AI-suggested add-on services' },
      { text: 'Priority support', tooltip: 'Response within 4 hours' },
    ],
    highlighted: true,
    cta: 'Request a Demo',
    ctaVariant: 'warm' as const,
    badge: 'Most Popular',
    savings: 'Save $408/year with annual',
  },
  {
    name: 'Pro',
    price: '$399',
    period: '/month',
    annualPrice: '$329',
    description: 'For multi-location operations with advanced needs.',
    features: [
      { text: 'Everything in Growth, plus:', tooltip: null },
      { text: 'Unlimited staff users', tooltip: null },
      { text: 'Workflow automation', tooltip: 'Auto-notifications, reminders, follow-ups' },
      { text: 'Admin controls', tooltip: 'Role-based permissions & multi-location management' },
      { text: 'Customer retention tools', tooltip: 'Loyalty tracking & re-engagement campaigns' },
      { text: 'Custom integrations', tooltip: 'Connect to your existing systems' },
      { text: 'Dedicated account manager', tooltip: 'Personal point of contact' },
    ],
    highlighted: false,
    cta: 'Request a Demo',
    ctaVariant: 'outline' as const,
    savings: 'Save $840/year with annual',
  },
];

const valueProps = [
  { metric: '5+ hrs', label: 'Saved weekly' },
  { metric: '$12,400', label: 'Avg. revenue increase' },
  { metric: '847%', label: 'Average ROI' },
];

export default function LandingPricing() {
  const [showComparison, setShowComparison] = useState(false);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible, getDelay } = useStaggeredAnimation(plans.length, 150);

  return (
    <section id="pricing" className="py-12 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-12 transition-all duration-700 ease-out",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h1 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 sm:mb-3">
            Pricing
          </h1>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Invest in efficiency. See returns in weeks.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
            Most customers save more in the first month than the annual subscription costs.
          </p>

          {/* Value props */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            {valueProps.map((prop) => (
              <div key={prop.label} className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold text-primary">{prop.metric}</span>
                <span className="text-xs sm:text-sm text-muted-foreground">{prop.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trial banner */}
        <div className={cn(
          "max-w-2xl mx-auto mb-8 sm:mb-12 p-3 sm:p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center gap-2 sm:gap-3 text-center transition-all duration-700",
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
          <p className="text-xs sm:text-sm">
            <span className="font-semibold text-foreground">14-day free trial</span>
            <span className="text-muted-foreground"> • Full access • No credit card</span>
          </p>
        </div>

        <TooltipProvider>
          <div ref={cardsRef} className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={cn(
                  "relative flex flex-col transition-all duration-700 ease-out",
                  plan.highlighted
                    ? 'border-primary shadow-lg ring-2 ring-primary/20 scale-[1.02] z-10'
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

                <CardHeader className="text-center pb-2">
                  <CardTitle className="font-display text-xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  {plan.annualPrice && (
                    <p className="text-sm text-primary font-medium mt-1">
                      or {plan.annualPrice}/mo billed annually
                    </p>
                  )}
                  <CardDescription className="mt-3">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col pt-4">
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground flex items-center gap-1.5">
                          {feature.text}
                          {feature.tooltip && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>{feature.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.savings && (
                    <p className="text-xs text-center text-primary font-medium mb-4">
                      {plan.savings}
                    </p>
                  )}

                  <Button
                    variant={plan.ctaVariant}
                    size="lg"
                    className="w-full gap-2"
                    asChild
                  >
                    <Link to="/support">
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TooltipProvider>

        {/* Compare all features toggle */}
        <div className={cn(
          "mt-12 text-center transition-all duration-700 delay-300",
          cardsVisible ? "opacity-100" : "opacity-0"
        )}>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowComparison(!showComparison)}
            className="gap-2"
          >
            {showComparison ? 'Hide' : 'Compare all features'}
            {showComparison ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Comparison Table */}
        {showComparison && (
          <div className="mt-8">
            <PricingComparisonTable />
          </div>
        )}

        {/* Bottom note */}
        <div className={cn(
          "mt-12 text-center transition-all duration-700 delay-500",
          cardsVisible ? "opacity-100" : "opacity-0"
        )}>
          <p className="text-sm text-muted-foreground mb-2">
            All prices in USD. Annual billing saves you 2 months.
          </p>
          <p className="text-sm text-muted-foreground">
            Need a custom solution? <Link to="/support" className="text-primary hover:underline">Talk to sales</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
