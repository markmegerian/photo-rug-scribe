import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingFooter from '@/components/landing/LandingFooter';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Shield, Lock, Eye, Server, FileCheck, Award, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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

export default function Security() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation();
  const { ref: promisesRef, isVisible: promisesVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div 
            ref={headerRef}
            className={cn(
              "text-center mb-16 transition-all duration-700 ease-out",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <Shield className="h-4 w-4" />
              Security & Privacy
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Enterprise-grade security,{' '}
              <span className="text-primary">built in</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We take security seriously so you can focus on your business. Your data is protected by industry-leading security measures.
            </p>
          </div>

          {/* Trust Badges */}
          <div className={cn(
            "flex flex-wrap justify-center gap-4 mb-20 transition-all duration-700 delay-100",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {badges.map((badge) => (
              <div 
                key={badge.name}
                className="flex flex-col items-center px-8 py-5 rounded-xl bg-card border border-border shadow-sm"
              >
                <span className="text-xl font-bold text-foreground">{badge.name}</span>
                <span className="text-sm text-muted-foreground">{badge.description}</span>
              </div>
            ))}
          </div>

          {/* Security Features Grid */}
          <div 
            ref={featuresRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            {securityFeatures.map((feature, index) => (
              <div 
                key={feature.title}
                className={cn(
                  "p-8 rounded-2xl bg-card border border-border shadow-card transition-all duration-700 hover:shadow-medium hover:-translate-y-1",
                  featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: featuresVisible ? `${index * 75}ms` : '0ms' }}
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Data Promise */}
          <div 
            ref={promisesRef}
            className={cn(
              "relative rounded-3xl bg-gradient-to-br from-primary/5 via-background to-accent/5 border border-border p-10 md:p-16 transition-all duration-700",
              promisesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Data Promise
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We believe your data belongs to you. Here's our commitment to protecting your privacy and giving you complete control.
                </p>
                <ul className="space-y-4">
                  {dataPromises.map((promise, index) => (
                    <li 
                      key={promise}
                      className={cn(
                        "flex items-start gap-3 transition-all duration-500",
                        promisesVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      )}
                      style={{ transitionDelay: promisesVisible ? `${index * 75 + 200}ms` : '0ms' }}
                    >
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-lg text-foreground">{promise}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative">
                  <div className="h-56 w-56 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="h-44 w-44 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                      <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Shield className="h-16 w-16 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                    <Lock className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Ready to get started with enterprise-grade security?
            </p>
            <Button variant="warm" size="lg" asChild>
              <Link to="/support">
                Start Your Free Trial
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
