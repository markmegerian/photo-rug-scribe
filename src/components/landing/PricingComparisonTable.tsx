import { Check, Minus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type FeatureValue = boolean | string;

interface Feature {
  name: string;
  starter: FeatureValue;
  growth: FeatureValue;
  pro: FeatureValue;
}

interface FeatureCategory {
  category: string;
  features: Feature[];
}

const comparisonData: FeatureCategory[] = [
  {
    category: 'Core Features',
    features: [
      { name: 'Workflow management', starter: true, growth: true, pro: true },
      { name: 'Client portal', starter: true, growth: true, pro: true },
      { name: 'Online payments', starter: true, growth: true, pro: true },
      { name: 'Professional estimates', starter: true, growth: true, pro: true },
    ],
  },
  {
    category: 'Team & Users',
    features: [
      { name: 'Staff users', starter: '1', growth: 'Up to 5', pro: 'Unlimited' },
    ],
  },
  {
    category: 'Operations',
    features: [
      { name: 'Operations checklist', starter: false, growth: true, pro: true },
      { name: 'AR damage documentation', starter: false, growth: true, pro: true },
      { name: 'Workflow automation', starter: false, growth: false, pro: true },
    ],
  },
  {
    category: 'Analytics & Growth',
    features: [
      { name: 'Analytics dashboard', starter: false, growth: true, pro: true },
      { name: 'AI upsell recommendations', starter: false, growth: true, pro: true },
      { name: 'Customer retention tools', starter: false, growth: false, pro: true },
    ],
  },
  {
    category: 'Support',
    features: [
      { name: 'Email support', starter: true, growth: true, pro: true },
      { name: 'Priority support', starter: false, growth: true, pro: true },
      { name: 'Dedicated account manager', starter: false, growth: false, pro: true },
    ],
  },
  {
    category: 'Admin & Integrations',
    features: [
      { name: 'Admin controls', starter: false, growth: false, pro: true },
      { name: 'Custom integrations', starter: false, growth: false, pro: true },
    ],
  },
];

const plans = [
  { name: 'Starter', price: '$79' },
  { name: 'Growth', price: '$199', highlighted: true },
  { name: 'Pro', price: '$399' },
];

function FeatureCell({ value, highlighted }: { value: FeatureValue; highlighted?: boolean }) {
  if (typeof value === 'string') {
    return (
      <span className={cn('text-sm font-medium', highlighted && 'text-primary')}>
        {value}
      </span>
    );
  }

  if (value) {
    return <Check className={cn('h-5 w-5', highlighted ? 'text-primary' : 'text-primary/80')} />;
  }

  return <Minus className="h-5 w-5 text-muted-foreground/50" />;
}

export default function PricingComparisonTable() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-[280px] font-semibold text-foreground">Features</TableHead>
              {plans.map((plan) => (
                <TableHead
                  key={plan.name}
                  className={cn(
                    'text-center font-semibold',
                    plan.highlighted && 'bg-primary/5 text-primary'
                  )}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-base">{plan.name}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {plan.price}/mo
                    </span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisonData.map((category, categoryIndex) => (
              <>
                <TableRow
                  key={category.category}
                  className="bg-muted/30 hover:bg-muted/30"
                >
                  <TableCell
                    colSpan={4}
                    className="font-semibold text-foreground text-sm uppercase tracking-wide py-3"
                  >
                    {category.category}
                  </TableCell>
                </TableRow>
                {category.features.map((feature, featureIndex) => (
                  <TableRow
                    key={feature.name}
                    className={cn(
                      featureIndex % 2 === 0 ? 'bg-background' : 'bg-muted/10',
                      'hover:bg-muted/20'
                    )}
                  >
                    <TableCell className="font-medium text-foreground">
                      {feature.name}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <FeatureCell value={feature.starter} />
                      </div>
                    </TableCell>
                    <TableCell className={cn('text-center bg-primary/5')}>
                      <div className="flex justify-center">
                        <FeatureCell value={feature.growth} highlighted />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <FeatureCell value={feature.pro} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Scrollable Table */}
      <div className="md:hidden overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <Table className="min-w-[500px]">
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="sticky left-0 bg-muted/50 w-[160px] font-semibold text-foreground z-10">
                  Features
                </TableHead>
                {plans.map((plan) => (
                  <TableHead
                    key={plan.name}
                    className={cn(
                      'text-center font-semibold min-w-[100px]',
                      plan.highlighted && 'bg-primary/5 text-primary'
                    )}
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-sm">{plan.name}</span>
                      <span className="text-xs font-normal text-muted-foreground">
                        {plan.price}
                      </span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((category) => (
                <>
                  <TableRow
                    key={category.category}
                    className="bg-muted/30 hover:bg-muted/30"
                  >
                    <TableCell
                      colSpan={4}
                      className="sticky left-0 bg-muted/30 font-semibold text-foreground text-xs uppercase tracking-wide py-2 z-10"
                    >
                      {category.category}
                    </TableCell>
                  </TableRow>
                  {category.features.map((feature, featureIndex) => (
                    <TableRow
                      key={feature.name}
                      className={cn(
                        featureIndex % 2 === 0 ? 'bg-background' : 'bg-muted/10',
                        'hover:bg-muted/20'
                      )}
                    >
                      <TableCell className="sticky left-0 bg-inherit font-medium text-foreground text-sm z-10">
                        {feature.name}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <FeatureCell value={feature.starter} />
                        </div>
                      </TableCell>
                      <TableCell className={cn('text-center bg-primary/5')}>
                        <div className="flex justify-center">
                          <FeatureCell value={feature.growth} highlighted />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <FeatureCell value={feature.pro} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-muted-foreground text-center py-2 border-t border-border">
          Swipe to see all plans →
        </p>
      </div>
    </div>
  );
}
