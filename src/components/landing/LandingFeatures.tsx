import { Store, Sparkles } from 'lucide-react';

const benefits = [
  { number: '01', title: 'Upload rug photos.', description: 'Your team photographs the rug. RugBoost flags areas that may need attention and suggests relevant services.' },
  { number: '02', title: 'Review recommendations and pricing.', description: 'Your team checks every suggested service and price, adjusting anything before it reaches the client.' },
  { number: '03', title: 'Send a proposal for client approval.', description: 'Clients see annotated photos and clear explanations, then approve the services they want and decline the rest.' },
];

const audiences = [
  {
    icon: Sparkles,
    title: 'For cleaning companies',
    description:
      'Help staff identify relevant services beyond routine cleaning, such as repairs and protective treatments, and explain each one clearly to clients.',
  },
  {
    icon: Store,
    title: 'For rug retailers',
    description:
      'Equip your retail team to discuss cleaning and repair services with confidence, supported by clear recommendations and professional client proposals.',
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
              From photos to an approved proposal.
            </h2>
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
