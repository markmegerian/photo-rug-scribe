import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How accurate is the AI analysis?',
    answer: 'Our AI has been trained on thousands of rug images and achieves over 95% accuracy in identifying rug types, origins, and common condition issues. For edge cases, you can always make manual adjustments.',
  },
  {
    question: 'Can I customize the pricing for my services?',
    answer: 'Absolutely. You can set custom prices per square foot for each service, create pricing tiers based on rug type, and even set minimum charges. The AI uses your pricing to generate estimates automatically.',
  },
  {
    question: 'How does the client portal work?',
    answer: 'When you are ready, you can invite clients via email. They receive a secure link to view their rug inspections, approve estimates, make payments, and track job progress. No app download required.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. We use bank-level encryption for all data. Your client information and business data are stored securely and never shared with third parties. We are SOC 2 Type II compliant.',
  },
  {
    question: 'Can I integrate RugBoost with my existing software?',
    answer: 'Pro and Enterprise plans include API access for custom integrations. We also offer pre-built integrations with popular accounting and CRM software. Contact us for specific integration needs.',
  },
  {
    question: 'What happens after the free trial?',
    answer: 'After 14 days, you can choose to subscribe to a paid plan. If you do not subscribe, your account will be read-only. You can export your data at any time. We do not auto-charge.',
  },
];

export default function LandingFAQ() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <section id="faq" className="py-12 md:py-24 bg-card border-t border-border">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-12 transition-all duration-700 ease-out",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 sm:mb-3">
            FAQ
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-foreground mb-3 sm:mb-4">
            Frequently asked questions
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Everything you need to know about RugBoost.
          </p>
        </div>

        <div
          ref={contentRef}
          className={cn(
            "transition-all duration-700 ease-out",
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-xl border border-border px-4 sm:px-6 shadow-card data-[state=open]:shadow-medium transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4 sm:py-5 text-sm sm:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 sm:pb-5 leading-relaxed text-sm sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className={cn(
          "mt-10 sm:mt-12 text-center p-6 sm:p-8 rounded-2xl bg-muted/50 border border-border transition-all duration-700 delay-300",
          contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6">
            Our team is here to help you get started.
          </p>
          <Button variant="outline" size="lg" asChild className="gap-2">
            <Link to="/support">
              <MessageCircle className="h-4 w-4" />
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
