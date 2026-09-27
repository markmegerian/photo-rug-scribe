import { Store, Sparkles } from 'lucide-react';

const benefits = [
  {
    number: '01',
    title: 'Recognize opportunities your team might miss.',
    description:
      'A rug may need more than cleaning. Help your staff identify potential repair and restoration needs and understand which of your services may be appropriate.',
  },
  {
    number: '02',
    title: 'Know what to recommend—and how to explain it.',
    description:
      'Support your staff with inspection findings, service recommendations, and estimates using your pricing. Give them a clear starting point for the customer conversation.',
  },
  {
    number: '03',
    title: 'Make it easier for customers to say yes.',
    description:
      'Present rug photos, recommended services, and itemized pricing together. Help customers understand the proposed work and approve it from their phone.',
  },
];

const audiences = [
  {
    icon: Sparkles,
    title: 'For cleaning companies',
    description:
      'Help your team recognize service opportunities beyond routine cleaning and present a more complete care recommendation.',
  },
  {
    icon: Store,
    title: 'For rug retailers',
    description:
      'Give your sales staff the guidance to discuss cleaning and repairs with the same confidence they bring to selling rugs.',
  },
];

export default function LandingFeatures() {
  return (
    <>
      <section id="how-it-works" className="scroll-mt-16 border-b border-border py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">How it works</p>
            <h2 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
              Guidance for your staff. Clarity for your customers.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Photos, AI-assisted findings, estimates, and a customer link support your team's judgment at every step.
            </p>
          </div>

          <ol className="mt-10 grid border-y border-border md:grid-cols-3 md:divide-x md:divide-border">
            {benefits.map((step) => (
              <li key={step.number} className="border-b border-border py-7 last:border-b-0 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0 lg:py-9">
                <span className="text-xs font-semibold text-muted-foreground">{step.number}</span>
                <h3 className="mt-4 text-xl font-extrabold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="audience-heading" className="border-b border-border bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <h2 id="audience-heading" className="max-w-2xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Built for the people already talking to your customers.
          </h2>
          <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2">
            {audiences.map((a) => (
              <div key={a.title} className="bg-background p-6 sm:p-8">
                <a.icon className="h-5 w-5" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-extrabold text-foreground">{a.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
