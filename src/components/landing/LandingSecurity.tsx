import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Shield, Lock, Eye, Server, FileCheck, Award, CheckCircle2 } from 'lucide-react';

const securityFeatures = [
  {
    icon: Lock,
    title: '256-bit Encryption',
    description: 'Bank-level encryption for all data in transit and at rest. Your data is protected by the same security used by major financial institutions.',
  },
  {
    icon: Shield,
    title: 'SOC 2 Type II Certified',
    description: 'We undergo rigorous annual audits to ensure our security controls meet the highest standards in the industry.',
  },
  {
    icon: Server,
    title: 'Secure Cloud Infrastructure',
    description: 'Hosted on enterprise-grade cloud infrastructure with 99.99% uptime SLA and automatic backups.',
  },
  {
    icon: Eye,
    title: 'Privacy First',
    description: "We never sell or share your data. Your client information stays yours—we're just the custodian.",
  },
  {
    icon: FileCheck,
    title: 'GDPR & CCPA Compliant',
    description: 'Full compliance with international privacy regulations. Request data deletion anytime.',
  },
  {
    icon: Award,
    title: 'Regular Security Audits',
    description: 'Third-party penetration testing and vulnerability assessments keep your data safe.',
  },
];

const badges = [
  { name: 'SOC 2', description: 'Type II Certified' },
  { name: 'GDPR', description: 'Compliant' },
  { name: 'CCPA', description: 'Compliant' },
  { name: 'SSL', description: 'Secured' },
  { name: '99.99%', description: 'Uptime SLA' },
];

const dataPromises = [
  'Your data is never sold to third parties',
  'You own 100% of your data, always',
  'Export your data anytime in standard formats',
  'Delete your account and data with one click',
  'No hidden data collection or tracking',
];

export default function LandingSecurity() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation();
  const { ref: promisesRef, isVisible: promisesVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-12 transition-all duration-700 ease-out",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Shield className="h-4 w-4" />
            Your Privacy Matters
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Enterprise-grade security,{' '}
            <span className="text-primary">built in</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We take security seriously so you can focus on your business. Your data is protected by industry-leading security measures.
          </p>
        </div>

        {/* Trust Badges */}
        <div className={cn(
          "flex flex-wrap justify-center gap-4 mb-16 transition-all duration-700 delay-100",
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {badges.map((badge) => (
            <div 
              key={badge.name}
              className="flex flex-col items-center px-6 py-4 rounded-xl bg-card border border-border shadow-sm"
            >
              <span className="text-lg font-bold text-foreground">{badge.name}</span>
              <span className="text-xs text-muted-foreground">{badge.description}</span>
            </div>
          ))}
        </div>

        {/* Security Features Grid */}
        <div 
          ref={featuresRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {securityFeatures.map((feature, index) => (
            <div 
              key={feature.title}
              className={cn(
                "p-6 rounded-2xl bg-card border border-border shadow-card transition-all duration-700 hover:shadow-medium hover:-translate-y-1",
                featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: featuresVisible ? `${index * 75}ms` : '0ms' }}
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Data Promise */}
        <div 
          ref={promisesRef}
          className={cn(
            "relative rounded-3xl bg-gradient-to-br from-primary/5 via-background to-accent/5 border border-border p-8 md:p-12 transition-all duration-700",
            promisesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Data Promise
              </h3>
              <p className="text-muted-foreground mb-6">
                We believe your data belongs to you. Here's our commitment to protecting your privacy and giving you complete control.
              </p>
              <ul className="space-y-3">
                {dataPromises.map((promise, index) => (
                  <li 
                    key={promise}
                    className={cn(
                      "flex items-start gap-3 transition-all duration-500",
                      promisesVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    )}
                    style={{ transitionDelay: promisesVisible ? `${index * 75 + 200}ms` : '0ms' }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{promise}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="h-48 w-48 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="h-36 w-36 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Shield className="h-12 w-12 text-primary-foreground" />
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <Lock className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-2 -left-2 h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
