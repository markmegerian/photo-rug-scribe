import { Camera, FileText, Smartphone } from 'lucide-react';

const benefits = [
  { icon: Camera, label: 'Photos and findings together' },
  { icon: FileText, label: 'Estimates using your rates' },
  { icon: Smartphone, label: 'Customer approval by phone' },
];

const steps = [
  {
    number: '01',
    title: 'Capture what you see.',
    description: 'Photograph the rug and document its condition. AI-assisted inspection notes help you prepare the report, with your team in control.',
  },
  {
    number: '02',
    title: 'Put a price to the work.',
    description: 'Build a clear, itemized estimate using your services and rates. Review the recommendations before sharing them.',
  },
  {
    number: '03',
    title: 'Make approval easy.',
    description: 'Send one link. Customers can see their rug, understand the recommended care, and approve the work from their phone.',
  },
];

export default function LandingFeatures() {
  return (
    <>
      <section aria-label="RugBoost benefits" className="border-b border-border bg-muted/40">
        <div className="mx-auto grid max-w-7xl divide-y divide-border px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
          {benefits.map((benefit) => (
            <div key={benefit.label} className="flex min-h-20 items-center gap-3 py-5 sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <benefit.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <p className="text-sm font-semibold text-foreground">{benefit.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-16 border-b border-border py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">How it works</p>
            <h2 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">One rug. One record. A clear next step.</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Keep the inspection, the estimate, and the customer’s decision connected. So your team can move the work forward.
            </p>
          </div>

          <ol className="mt-10 grid border-y border-border md:grid-cols-3 md:divide-x md:divide-border">
            {steps.map((step) => (
              <li key={step.number} className="border-b border-border py-7 last:border-b-0 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0 lg:py-9">
                <span className="text-xs font-semibold text-muted-foreground">{step.number}</span>
                <h3 className="mt-4 text-xl font-extrabold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}