import { Camera, Sparkles, FileCheck, Send } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const steps = [
  {
    icon: Camera,
    number: '1',
    title: 'Capture',
    description: 'Use our guided photo capture to document rugs consistently. Your team follows simple prompts for each angle.',
    time: '2 min',
  },
  {
    icon: Sparkles,
    number: '2',
    title: 'Analyze',
    description: 'AI instantly identifies rug type, origin, and condition issues. Service recommendations generate automatically.',
    time: '30 sec',
  },
  {
    icon: FileCheck,
    number: '3',
    title: 'Estimate',
    description: 'Professional, itemized estimates are created based on AI findings. Adjust pricing with a tap if needed.',
    time: '15 sec',
  },
  {
    icon: Send,
    number: '4',
    title: 'Deliver',
    description: 'Send estimates to clients via their personal portal. They approve, pay, and track their rugs online.',
    time: 'Instant',
  },
];

export default function LandingHowItWorks() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: stepsRef, isVisible: stepsVisible, getDelay } = useStaggeredAnimation(steps.length, 100);

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-16 transition-all duration-700 ease-out",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Simple Process
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            From drop-off to estimate in minutes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A streamlined workflow that saves you hours every week.
          </p>
        </div>

        <div ref={stepsRef} className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div 
                key={step.number} 
                className={cn(
                  "relative text-center transition-all duration-700 ease-out",
                  stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={stepsVisible ? getDelay(index) : {}}
              >
                {/* Step circle */}
                <div className="relative mx-auto mb-6">
                  <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-medium">
                    <step.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  {/* Step number */}
                  <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-card border-2 border-primary flex items-center justify-center text-sm font-bold text-primary">
                    {step.number}
                  </div>
                </div>
                
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {step.description}
                </p>
                
                {/* Time indicator */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-sm font-medium text-muted-foreground">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {step.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom summary */}
        <div className={cn(
          "mt-16 text-center transition-all duration-700 delay-500",
          stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-muted/50 border border-border">
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Total time</p>
              <p className="text-2xl font-bold text-foreground">Under 3 minutes</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Previous method</p>
              <p className="text-2xl font-bold text-muted-foreground line-through decoration-primary">30+ minutes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
