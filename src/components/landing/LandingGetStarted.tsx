import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckCircle2, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    title: 'Create your free account',
    description: 'Enter your email and choose a password. Takes 30 seconds, no credit card needed.',
    time: '30 seconds',
    details: ['Instant account creation', 'No verification hoops', 'Start exploring immediately'],
  },
  {
    number: '02',
    title: 'Import or add your first rug',
    description: 'Snap a photo of any rug. Our AI identifies type, size, and condition automatically.',
    time: '2 minutes',
    details: ['Guided photo capture', 'AI does the heavy lifting', 'Edit details if needed'],
  },
  {
    number: '03',
    title: 'Send your first estimate',
    description: 'Review the auto-generated pricing and send a professional estimate to your client.',
    time: '1 minute',
    details: ['Professional PDF format', 'Client approval tracking', 'Payment link included'],
  },
  {
    number: '04',
    title: "You're in business!",
    description: "That's it. You're ready to process rugs faster and delight clients with transparency.",
    time: 'Ongoing',
    details: ['Full feature access', 'Support team ready to help', 'Watch your business grow'],
  },
];

const reassurances = [
  'No technical skills required',
  'Works on any device with a camera',
  'Your data is secure and private',
  'Cancel anytime—no questions asked',
];

export default function LandingGetStarted() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: stepsRef, isVisible: stepsVisible, getDelay } = useStaggeredAnimation(4, 150);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-16 transition-all duration-700 ease-out",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Sparkles className="h-4 w-4" />
            Getting Started is Easy
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Up and running in{' '}
            <span className="text-primary">under 5 minutes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No complex setup, no IT department needed. If you can take a photo, you can use RugBoost.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary to-primary/50 hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className={cn(
                  "relative md:grid md:grid-cols-2 md:gap-8 md:items-center transition-all duration-700",
                  stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  index % 2 === 1 && "md:[direction:rtl]"
                )}
                style={stepsVisible ? getDelay(index) : {}}
              >
                {/* Content */}
                <div className={cn(
                  "relative pl-16 md:pl-0 md:[direction:ltr]",
                  index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"
                )}>
                  {/* Mobile number circle */}
                  <div className="absolute left-0 top-0 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg md:hidden">
                    {step.number}
                  </div>

                  <div className="inline-flex items-center gap-2 text-sm text-primary font-semibold mb-2">
                    <Clock className="h-4 w-4" />
                    {step.time}
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {step.description}
                  </p>
                  <ul className={cn(
                    "space-y-2",
                    index % 2 === 0 ? "md:ml-auto md:max-w-xs" : "md:max-w-xs"
                  )}>
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Desktop number circle */}
                <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
                  <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-lg border-4 border-background">
                    {step.number}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Reassurances */}
        <div className={cn(
          "mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 transition-all duration-700 delay-500",
          stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {reassurances.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              {item}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={cn(
          "mt-12 text-center transition-all duration-700 delay-700",
          stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <Button variant="warm" size="xl" asChild className="gap-2">
            <Link to="/support">
              Start Your Free Trial Now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Join 500+ professionals who made the switch this month
          </p>
        </div>
      </div>
    </section>
  );
}
