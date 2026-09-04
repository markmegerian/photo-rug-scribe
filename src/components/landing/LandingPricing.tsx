import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Star, Zap, ArrowRight, HelpCircle, Shield, Lock, CreditCard } from 'lucide-react';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { trackPricingView, trackPricingPlanClick } from '@/lib/analytics';
import { useEffect, useRef } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const usageTiers = [
  { label: '25 estimates / month', price: '$200' },
  { label: '50 estimates / month', price: '$275' },
  { label: '100 estimates / month', price: '$400' },
  { label: '250 estimates / month', price: '$650' },
];

const plans = [
  {
    name: 'Starter',
    price: '$200',
    period: '/month',
    annualPrice: null,
    description: 'For single-location rug care businesses.',
    features: [
      { text: '25 rug inspection estimates / month', tooltip: 'Add more monthly estimates from the dropdown above' },
      { text: 'AI-powered analysis', tooltip: 'Identifies rug type, origin, and condition' },
      { text: 'Professional estimates', tooltip: 'Branded PDF estimates with your logo' },
      { text: 'Client portal access', tooltip: 'Clients can approve & pay online' },
      { text: 'Email support', tooltip: 'Response within 24 hours' },
    ],
    highlighted: false,
    cta: 'Request a Demo',
    ctaVariant: 'outline' as const,
    savings: null,
  },
  {
    name: 'Pro',
    price: '$500',
    period: '/month',
    annualPrice: null,
    description: 'For growing teams that need more power.',
    features: [
      { text: 'High-volume estimate allowance', tooltip: 'Monthly volume set with you during onboarding' },
      { text: 'Everything in Starter, plus:', tooltip: null },

      { text: 'Analytics dashboard', tooltip: 'Revenue, conversions, service popularity' },
      { text: 'Custom email templates', tooltip: 'Automated notifications with your branding' },
      { text: 'Advanced pricing rules', tooltip: 'Per-type pricing, minimums, tiered rates' },
      { text: 'Priority support', tooltip: 'Response within 4 hours + screen sharing' },
      { text: 'Custom branding', tooltip: 'White-label client portal' },
      { text: 'API access', tooltip: 'Integrate with your existing systems' },
    ],
    highlighted: true,
    cta: 'Request a Demo',
    ctaVariant: 'warm' as const,
    badge: 'Most Popular',
    savings: null,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    annualPrice: null,
    description: 'For multi-location operations with custom needs.',
    features: [
      { text: 'Custom usage allowance', tooltip: 'Volume and team size set per agreement' },
      { text: 'Everything in Pro, plus:', tooltip: null },
      { text: 'White-label solution', tooltip: 'Your brand, your domain' },
      { text: 'Custom integrations', tooltip: 'Connect to any system you use' },
      { text: 'Dedicated account manager', tooltip: 'Personal point of contact' },
      { text: 'SLA guarantee', tooltip: '99.9% uptime commitment' },
      { text: 'On-premise option', tooltip: 'Host on your own servers' },
    ],
    highlighted: false,
    cta: 'Contact Sales',
    ctaVariant: 'outline' as const,
    savings: null,
  },
];


const valueProps = [
  { metric: '5+ hrs', label: 'Saved weekly' },
  { metric: '$12,400', label: 'Avg. revenue increase' },
  { metric: '847%', label: 'Average ROI' },
];

export default function LandingPricing() {
  const { ref: cardsRef, isVisible: cardsVisible, getDelay } = useStaggeredAnimation(plans.length, 150);
  const pricingTracked = useRef(false);

  useEffect(() => {
    if (cardsVisible && !pricingTracked.current) {
      pricingTracked.current = true;
      trackPricingView();
    }
  }, [cardsVisible]);

  return (
    <section id="pricing" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Billing note */}
        <div className="max-w-2xl mx-auto mb-12 p-4 rounded-none bg-muted border border-border flex items-center justify-center gap-3 text-center">
          <Zap className="h-5 w-5 text-primary flex-shrink-0" />
          <p className="text-sm">
            <span className="font-semibold text-foreground">Team-based pricing</span>
            <span className="text-muted-foreground"> • Each additional user beyond your plan's included seats is an added monthly cost</span>
          </p>
        </div>


        <TooltipProvider>
          <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={cn(
                  "relative flex flex-col transition-all duration-700 ease-out",
                  plan.highlighted
                    ? 'border-foreground border-2 z-10'
                    : 'border-border ',
                  cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={cardsVisible ? getDelay(index) : {}}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-foreground text-xs font-semibold text-primary-foreground ">
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
                    onClick={() => trackPricingPlanClick(plan.name)}
                  >
                    {plan.name === 'Enterprise' ? (
                      <a href="mailto:sales@rugboost.com">
                        {plan.cta}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link to="/support">
                        {plan.cta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TooltipProvider>

        {/* Trust badges */}
        <div className={cn(
          "mt-12 transition-all duration-700 delay-500",
          cardsVisible ? "opacity-100" : "opacity-0"
        )}>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Badge variant="outline" className="gap-2 px-4 py-2 text-sm">
              <Shield className="h-4 w-4 text-primary" />
              SOC 2 Type II
            </Badge>
            <Badge variant="outline" className="gap-2 px-4 py-2 text-sm">
              <Lock className="h-4 w-4 text-primary" />
              256-bit Encryption
            </Badge>
            <Badge variant="outline" className="gap-2 px-4 py-2 text-sm">
              <CreditCard className="h-4 w-4 text-primary" />
              30-Day Money Back
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground text-center mb-2">
            All prices in USD. Additional users are billed at an added monthly cost per seat.

          </p>
          <p className="text-sm text-muted-foreground text-center">
            Need a custom solution? <Link to="/support" className="text-primary hover:underline">Talk to sales</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
