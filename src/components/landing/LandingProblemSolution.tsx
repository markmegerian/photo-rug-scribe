import { Clock, FileText, Users, Zap, CheckCircle, TrendingUp, X, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const problems = [
  {
    icon: Clock,
    title: '30+ minutes per inspection',
    description: 'Manually documenting conditions and calculating estimates eats your day.',
  },
  {
    icon: FileText,
    title: 'Pricing errors cost you money',
    description: 'Without standardized processes, you leave revenue on the table.',
  },
  {
    icon: Users,
    title: 'Clients feel out of the loop',
    description: 'Phone tag and paper estimates create friction and lose referrals.',
  },
];

const solutions = [
  {
    icon: Zap,
    title: 'Under 3 minutes total',
    description: 'AI analyzes photos and generates complete reports instantly.',
  },
  {
    icon: CheckCircle,
    title: 'Automated, accurate pricing',
    description: 'Your rules + AI analysis = consistent estimates every time.',
  },
  {
    icon: TrendingUp,
    title: 'Clients love the experience',
    description: 'Digital portal for approvals, payments, and real-time tracking.',
  },
];

export default function LandingProblemSolution() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-16 transition-all duration-700 ease-out",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            The Problem
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Traditional rug inspection is broken
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manual processes slow you down, cost you money, and frustrate your clients. 
            There's a better way.
          </p>
        </div>

        <div 
          ref={contentRef}
          className={cn(
            "grid lg:grid-cols-2 gap-8 lg:gap-12 items-start transition-all duration-700 ease-out",
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Problems Column */}
          <div className="relative">
            <div className="absolute -inset-4 bg-destructive/5 rounded-3xl -z-10" />
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">The Old Way</h3>
                  <p className="text-sm text-muted-foreground">Slow, inconsistent, frustrating</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {problems.map((item, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "flex gap-4 p-4 rounded-xl bg-card border border-destructive/20 transition-all duration-500",
                      contentVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    )}
                    style={{ transitionDelay: contentVisible ? `${index * 100 + 100}ms` : '0ms' }}
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl -z-10" />
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">The RugBoost Way</h3>
                  <p className="text-sm text-muted-foreground">Fast, accurate, delightful</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {solutions.map((item, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "flex gap-4 p-4 rounded-xl bg-card border border-primary/20 transition-all duration-500",
                      contentVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    )}
                    style={{ transitionDelay: contentVisible ? `${index * 100 + 300}ms` : '0ms' }}
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transition arrow (desktop) */}
        <div className="hidden lg:flex justify-center -mt-8 relative z-10">
          <div className={cn(
            "flex items-center justify-center h-16 w-16 rounded-full bg-card border border-border shadow-medium transition-all duration-700 delay-500",
            contentVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}>
            <ArrowRight className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
