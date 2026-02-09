import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Star, Zap, ArrowRight, HelpCircle } from 'lucide-react';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
const plans = [{
  name: 'Starter',
  price: '$49',
  period: '/month',
  annualPrice: '$39',
  description: 'Perfect for small operations getting started.',
  features: [{
    text: 'Up to 2 staff users',
    tooltip: 'Add additional users for $15/month each'
  }, {
    text: 'Unlimited rug inspections',
    tooltip: null
  }, {
    text: 'AI-powered analysis',
    tooltip: 'Identifies rug type, origin, and condition'
  }, {
    text: 'Professional estimates',
    tooltip: 'Branded PDF estimates with your logo'
  }, {
    text: 'Client portal access',
    tooltip: 'Clients can approve & pay online'
  }, {
    text: 'Email support',
    tooltip: 'Response within 24 hours'
  }],
  highlighted: false,
  cta: 'Start Free Trial',
  ctaVariant: 'outline' as const,
  savings: null
}, {
  name: 'Pro',
  price: '$129',
  period: '/month',
  annualPrice: '$99',
  description: 'For growing businesses that need more power.',
  features: [{
    text: 'Up to 10 staff users',
    tooltip: 'Add additional users for $10/month each'
  }, {
    text: 'Everything in Starter, plus:',
    tooltip: null
  }, {
    text: 'Analytics dashboard',
    tooltip: 'Revenue, conversions, service popularity'
  }, {
    text: 'Custom email templates',
    tooltip: 'Automated notifications with your branding'
  }, {
    text: 'Advanced pricing rules',
    tooltip: 'Per-type pricing, minimums, tiered rates'
  }, {
    text: 'Priority support',
    tooltip: 'Response within 4 hours + screen sharing'
  }, {
    text: 'Custom branding',
    tooltip: 'White-label client portal'
  }, {
    text: 'API access',
    tooltip: 'Integrate with your existing systems'
  }],
  highlighted: true,
  cta: 'Start Free Trial',
  ctaVariant: 'warm' as const,
  badge: 'Most Popular',
  savings: 'Save $360/year with annual'
}, {
  name: 'Enterprise',
  price: 'Custom',
  period: '',
  annualPrice: null,
  description: 'For large operations with custom needs.',
  features: [{
    text: 'Unlimited staff users',
    tooltip: null
  }, {
    text: 'Everything in Pro, plus:',
    tooltip: null
  }, {
    text: 'White-label solution',
    tooltip: 'Your brand, your domain'
  }, {
    text: 'Custom integrations',
    tooltip: 'Connect to any system you use'
  }, {
    text: 'Dedicated account manager',
    tooltip: 'Personal point of contact'
  }, {
    text: 'SLA guarantee',
    tooltip: '99.9% uptime commitment'
  }, {
    text: 'On-premise option',
    tooltip: 'Host on your own servers'
  }],
  highlighted: false,
  cta: 'Contact Sales',
  ctaVariant: 'outline' as const,
  savings: null
}];
const valueProps = [{
  metric: '5+ hrs',
  label: 'Saved weekly'
}, {
  metric: '$12,400',
  label: 'Avg. revenue increase'
}, {
  metric: '847%',
  label: 'Average ROI'
}];
export default function LandingPricing() {
  const {
    ref: cardsRef,
    isVisible: cardsVisible,
    getDelay
  } = useStaggeredAnimation(plans.length, 150);
  return;
}