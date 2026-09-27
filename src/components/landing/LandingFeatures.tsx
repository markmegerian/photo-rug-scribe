import { ArrowRight } from 'lucide-react';

const steps = [
  {
    title: 'Photograph the rug',
    description: 'Staff take a few photos on a phone or tablet. RugBoost flags areas that need attention and suggests services from your own list.',
  },
  {
    title: 'Review and adjust',
    description: 'Your team checks every finding, explanation, and price before anything is sent. AI suggests. Your experts decide.',
  },
  {
    title: 'Client approves online',
    description: 'The client receives annotated photos, plain-language explanations, and itemized pricing, and approves the services they want.',
  },
];

export default function LandingFeatures() {
  return (
    <section id="how-it-works" className="scroll-mt-16 py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">How it works</p>
        <h2 className="max-w-2xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">Three steps. Your team stays in control.</h2>
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
  );
}
