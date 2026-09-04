import { Link } from 'react-router-dom';
import { Check, Minus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingFooter from '@/components/landing/LandingFooter';
import LandingPricing from '@/components/landing/LandingPricing';
import { comparisonRows, plans } from '@/data/plans';

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="h-4 w-4 mx-auto text-foreground" aria-label="Included" />;
  if (value === false) return <Minus className="h-4 w-4 mx-auto text-muted-foreground" aria-label="Not included" />;
  return <span className="text-sm text-foreground">{value}</span>;
}

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main>
        <section className="pt-28 pb-4 px-4 text-center">
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            Pricing built around your estimate volume
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three plans, no hidden fees. Start at 25 rug inspection estimates a month and scale up
            whenever your shop needs more.
          </p>
        </section>

        <LandingPricing />

        <section className="pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground text-center mb-8">
              Compare plans
            </h2>

            <div className="overflow-x-auto border border-border">
              <table className="w-full min-w-[640px] text-left">
                <caption className="sr-only">Feature comparison across Rugboost plans</caption>
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th scope="col" className="p-4 text-sm font-semibold text-foreground">Feature</th>
                    {plans.map((p) => (
                      <th key={p.id} scope="col" className="p-4 text-sm font-semibold text-foreground text-center">
                        {p.name}
                        <span className="block text-xs font-normal text-muted-foreground">
                          {p.price}
                          {p.period}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-b border-border last:border-0">
                      <th scope="row" className="p-4 text-sm font-normal text-foreground">{row.feature}</th>
                      <td className="p-4 text-center"><Cell value={row.starter} /></td>
                      <td className="p-4 text-center"><Cell value={row.pro} /></td>
                      <td className="p-4 text-center"><Cell value={row.enterprise} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-10">
              <Button size="lg" asChild className="gap-2">
                <Link to="/request-demo">
                  Request a Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
