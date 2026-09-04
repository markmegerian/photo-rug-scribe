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
  { label: '25 estimates / month', price: '$200' },
  { label: '50 estimates / month', price: '$275' },
  { label: '100 estimates / month', price: '$400' },
  { label: '250 estimates / month', price: '$650' },
];

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$200',
    period: '/month',
    description: 'For single-location rug care businesses.',
    features: [
      { text: '25 rug inspection estimates / month', tooltip: 'Add more monthly estimates from the usage dropdown' },
      { text: 'AI-powered analysis', tooltip: 'Identifies rug type, origin, and condition' },
      { text: 'Professional estimates', tooltip: 'Branded PDF estimates with your logo' },
      { text: 'Client portal access', tooltip: 'Clients can approve & pay online' },
      { text: 'Email support', tooltip: 'Response within 24 hours' },
    ],
    highlighted: false,
    cta: 'Request a Demo',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$500',
    period: '/month',
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
    badge: 'Most Popular',
    cta: 'Request a Demo',
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
      { text: 'Dedicated account manager', tooltip: 'Personal point of contact' },
      { text: 'SLA guarantee', tooltip: '99.9% uptime commitment' },
      { text: 'On-premise option', tooltip: 'Host on your own servers' },
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
  { feature: 'Monthly rug inspection estimates', starter: '25 (upgradeable)', pro: 'High volume', enterprise: 'Custom' },
  { feature: 'AI photo analysis', starter: true, pro: true, enterprise: true },
  { feature: 'Branded PDF estimates', starter: true, pro: true, enterprise: true },
  { feature: 'Client portal & online approval', starter: true, pro: true, enterprise: true },
  { feature: 'Online payments', starter: true, pro: true, enterprise: true },
  { feature: 'Analytics dashboard', starter: false, pro: true, enterprise: true },
  { feature: 'Custom email templates', starter: false, pro: true, enterprise: true },
  { feature: 'Advanced pricing rules', starter: false, pro: true, enterprise: true },
  { feature: 'API access', starter: false, pro: true, enterprise: true },
  { feature: 'White-label / custom domain', starter: false, pro: 'Portal branding', enterprise: true },
  { feature: 'Dedicated account manager', starter: false, pro: false, enterprise: true },
  { feature: 'SLA guarantee', starter: false, pro: false, enterprise: true },
  { feature: 'Support', starter: 'Email, 24h', pro: 'Priority, 4h', enterprise: 'Dedicated' },
];
