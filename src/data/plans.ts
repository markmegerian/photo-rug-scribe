export interface PlanFeature {
  text: string;
  tooltip: string | null;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  highlighted: boolean;
  badge?: string;
  cta: string;
}

export const usageTiers = [
  { label: '25 rug inspection estimates per month', count: 25, price: '$200' },
  { label: '50 rug inspection estimates per month', count: 50, price: '$275' },
  { label: '100 rug inspection estimates per month', count: 100, price: '$400' },
  { label: '250 rug inspection estimates per month', count: 250, price: '$650' },
];

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$200',
    period: '/month',
    description: 'For single-location rug care businesses.',
    features: [
      { text: '25 rug inspection estimates per month', tooltip: 'Choose up to 250 per month with the usage selector' },
      { text: 'AI-powered analysis', tooltip: 'Identifies rug type, origin, and condition' },
      { text: 'Professional estimates', tooltip: 'Branded PDF estimates with your logo' },
      { text: 'Client portal access', tooltip: 'Clients review and approve recommended services' },
      { text: 'Email support', tooltip: null },
    ],
    highlighted: false,
    cta: 'Request a demo',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$500',
    period: '/month',
    description: 'For growing teams that need more power.',
    features: [
      { text: 'Monthly estimate allowance: ask us for details', tooltip: null },
      { text: 'Everything in Starter, plus:', tooltip: null },
      { text: 'Analytics dashboard', tooltip: 'Revenue, conversions, service popularity' },
      { text: 'Custom email templates', tooltip: 'Automated notifications with your branding' },
      { text: 'Advanced pricing rules', tooltip: 'Per-type pricing, minimums, tiered rates' },
      { text: 'Priority support', tooltip: null },
      { text: 'Custom branding', tooltip: 'White-label client portal' },
    ],
    highlighted: true,
    badge: 'Most Popular',
    cta: 'Request a demo',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For multi-location operations with custom needs.',
    features: [
      { text: 'Custom usage allowance', tooltip: 'Volume and team size set per agreement' },
      { text: 'Everything in Pro, plus:', tooltip: null },
      { text: 'White-label solution', tooltip: 'Your brand, your domain' },
      { text: 'Custom integrations', tooltip: 'Connect to any system you use' },
    ],
    highlighted: false,
    cta: 'Talk to Sales',
  },
];

export interface ComparisonRow {
  feature: string;
  starter: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
}

export const comparisonRows: ComparisonRow[] = [
  { feature: 'Monthly rug inspection estimates', starter: '25–250 (by usage tier)', pro: 'Ask us for details', enterprise: 'Custom' },
  { feature: 'AI photo analysis', starter: true, pro: true, enterprise: true },
  { feature: 'Branded PDF estimates', starter: true, pro: true, enterprise: true },
  { feature: 'Client portal & online approval', starter: true, pro: true, enterprise: true },
  { feature: 'Analytics dashboard', starter: false, pro: true, enterprise: true },
  { feature: 'Custom email templates', starter: false, pro: true, enterprise: true },
  { feature: 'Advanced pricing rules', starter: false, pro: true, enterprise: true },
  { feature: 'White-label / custom domain', starter: false, pro: 'Portal branding', enterprise: true },
  { feature: 'Support', starter: 'Email', pro: 'Priority', enterprise: 'Per agreement' },
];
