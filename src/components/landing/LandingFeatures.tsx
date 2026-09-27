import { Store, Sparkles } from 'lucide-react';

const benefits = [
  {
    number: '01',
    title: 'Recognize the opportunity.',
    description:
      'Help your staff spot potential care needs and identify relevant services—even when rug cleaning and repair aren’t their specialty.',
  },
  {
    number: '02',
    title: 'Make the case for the work.',
    description:
      'RugBoost turns inspection findings into customer-facing recommendations that explain what is being proposed, why it matters, and what the customer gains.',
  },
  {
    number: '03',
    title: 'Move the sale toward approval.',
    description:
      'Bring photos, service explanations, and itemized pricing together in a professional proposal customers can review and approve from their phone.',
  },
];

const audiences = [
  {
    icon: Sparkles,
    title: 'For cleaning companies',
    description:
      'Help your team recognize relevant services beyond routine cleaning, and explain them clearly to every customer.',
  },
  {
    icon: Store,
    title: 'For rug retailers',
    description:
      'Support employees who sell rugs but may have limited cleaning and repair knowledge, with clear recommendations and a professional customer proposal.',
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
              Build understanding. Earn trust. Make approval easier.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Customers feel more comfortable deciding when they can see what you found, understand the recommended care, and know exactly what it costs. RugBoost brings that information together in a professional proposal they can review at their own pace.
            </p>
            <p className="mt-4 text-sm font-semibold text-foreground">Clear recommendations. Transparent prices. Customer choice.</p>
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
            More support for your staff. More opportunity for your business.
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
