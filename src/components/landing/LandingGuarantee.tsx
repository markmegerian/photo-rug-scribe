import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Shield, Clock, CreditCard, Headphones, RefreshCw, Lock } from 'lucide-react';

const guarantees = [
  {
    icon: Clock,
    title: '14-Day Free Trial',
    description: 'Full access to all features. No credit card required to start.',
  },
  {
    icon: RefreshCw,
    title: '30-Day Money Back',
    description: "Not satisfied? Get a full refund within 30 days, no questions asked.",
  },
  {
    icon: CreditCard,
    title: 'No Long-Term Contracts',
    description: 'Pay monthly. Cancel anytime. Your data is always exportable.',
  },
  {
    icon: Headphones,
    title: 'Free Onboarding Support',
    description: 'Our team helps you get set up and running within 24 hours.',
  },
  {
    icon: Lock,
    title: 'Bank-Level Security',
    description: 'SOC 2 Type II compliant. Your data is encrypted and protected.',
  },
  {
    icon: Shield,
    title: '99.9% Uptime SLA',
    description: 'Enterprise-grade reliability. Your business never stops.',
  },
];

const objections = [
  {
    objection: '"What if my team struggles with new software?"',
    answer: "RugBoost is designed for technicians, not tech experts. Our guided capture is so intuitive that teams are usually comfortable within hours, not days. Plus, we offer free onboarding support to ensure smooth adoption.",
  },
  {
    objection: '"What if the AI makes mistakes?"',
    answer: "Our AI is trained on thousands of rugs and achieves 95%+ accuracy. But you're always in control—every analysis can be reviewed and adjusted before sending to clients. Most users find it catches things they'd miss.",
  },
  {
    objection: "\"I'm worried about being locked into a contract.\"",
    answer: "We don't believe in lock-ins. Pay monthly, cancel anytime, and export your data whenever you want. We earn your business every month.",
  },
];

export default function LandingGuarantee() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: guaranteesRef, isVisible: guaranteesVisible } = useScrollAnimation();
  const { ref: objectionsRef, isVisible: objectionsVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-16 transition-all duration-700 ease-out",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Risk-Free Guarantee
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Try RugBoost with zero risk
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're confident you'll love RugBoost. That's why we make it easy to try.
          </p>
        </div>

        {/* Guarantees Grid */}
        <div 
          ref={guaranteesRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {guarantees.map((item, index) => (
            <div 
              key={item.title}
              className={cn(
                "flex gap-4 p-5 rounded-xl bg-background border border-border transition-all duration-500",
                guaranteesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: guaranteesVisible ? `${index * 80}ms` : '0ms' }}
            >
              <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Common Concerns */}
        <div 
          ref={objectionsRef}
          className={cn(
            "max-w-3xl mx-auto transition-all duration-700",
            objectionsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h3 className="font-display text-2xl font-bold text-foreground text-center mb-8">
            Common concerns, honest answers
          </h3>
          
          <div className="space-y-6">
            {objections.map((item, index) => (
              <div 
                key={index}
                className={cn(
                  "p-6 rounded-2xl bg-background border border-border transition-all duration-500",
                  objectionsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}
                style={{ transitionDelay: objectionsVisible ? `${index * 100 + 200}ms` : '0ms' }}
              >
                <p className="font-semibold text-foreground mb-3 text-lg">
                  {item.objection}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
