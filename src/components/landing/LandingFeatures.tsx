import { ArrowRight, Sparkles, Store } from 'lucide-react';

const steps = [
  { title: 'Capture the rug.', description: 'Staff photograph the rug. RugBoost flags areas that may need attention and suggests relevant services.' },
  { title: 'Review recommendations and pricing.', description: 'Your team checks every suggested service, explanation, and price, and adjusts anything before it is sent.' },
  { title: 'Send for client approval.', description: 'The client receives annotated photos, explanations, and itemized pricing, and approves the services they choose.' },
];

const audiences = [
  {
    icon: Sparkles,
    title: 'Cleaning companies',
    description:
      'Help staff notice when a rug needs more than routine cleaning, such as fringe repair or a protective treatment, and give clients a written explanation of each recommendation.',
  },
  {
    icon: Store,
    title: 'Rug retailers',
    description:
      'Equip your retail team to discuss cleaning and repair services with confidence, supported by clear recommendations and professional client proposals.',
  },
];

export default function LandingFeatures() {
  return (
    <>
      <section id="how-it-works" className="scroll-mt-16 border-b border-border py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">How it works</p>
          <h2 className="max-w-2xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">Three steps, with your team in control.</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
            {steps.map((step, i) => (
              <li key={step.title} className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-extrabold text-background">{i + 1}</span>
                  {i < steps.length - 1 && <ArrowRight className="hidden h-4 w-4 text-muted-foreground md:block md:ml-auto md:mr-4" aria-hidden="true" />}
                </div>
                <h3 className="mt-4 text-lg font-extrabold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="audience-heading" className="border-b border-border bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Who it supports</p>
          <h2 id="audience-heading" className="sr-only">Who RugBoost supports</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {audiences.map((a) => (
              <div key={a.title} className="border border-border bg-background p-6 sm:p-8">
                <a.icon className="h-5 w-5" aria-hidden="true" />
                <h3 className="mt-4 text-2xl font-extrabold text-foreground">{a.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted-foreground">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
