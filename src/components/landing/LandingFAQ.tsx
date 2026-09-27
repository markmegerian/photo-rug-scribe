import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const faqs = [
  {
    question: 'Does AI make the final decisions?',
    answer: 'No. AI suggests findings and services. Your team reviews every recommendation and price before a proposal is sent.',
  },
  {
    question: 'Can I use my own service pricing?',
    answer: 'Yes. Proposals use your own services and rates, and your team can adjust any price before sending.',
  },
  {
    question: 'What does my customer see?',
    answer: 'Clients see annotated rug photos, an explanation of each recommended service, and itemized pricing. They can approve selected services and decline others.',
  },
];

export default function LandingFAQ() {
  return (
    <section id="faq" className="border-b border-border py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 md:grid-cols-[0.65fr_1.35fr] lg:gap-20 lg:px-8">
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Questions</p>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">Common questions.</h2>
        </div>
        <Accordion type="single" collapsible className="border-t border-border">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`} className="border-b border-border">
              <AccordionTrigger className="min-h-14 py-4 text-left text-base font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 pr-8 text-sm leading-7 text-muted-foreground sm:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}