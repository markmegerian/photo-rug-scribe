import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { TrendingUp, Clock, DollarSign, Users, ArrowUpRight } from 'lucide-react';

const results = [
  {
    metric: '847%',
    label: 'Average ROI',
    description: 'Return on investment in the first year',
    icon: TrendingUp,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    metric: '5.2 hrs',
    label: 'Time Saved Weekly',
    description: 'Per employee on inspection tasks',
    icon: Clock,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    metric: '$12,400',
    label: 'Revenue Recovered',
    description: 'Average annual increase per business',
    icon: DollarSign,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    metric: '94%',
    label: 'Client Satisfaction',
    description: 'Clients prefer digital experience',
    icon: Users,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
];

const caseStudy = {
  company: 'Pacific Rug Care',
  location: 'San Francisco, CA',
  quote: "We went from spending 4 hours a day on inspections and estimates to under 30 minutes. Our clients love the portal, and we've seen a 40% increase in referrals since switching to RugBoost.",
  author: 'Michael Chen',
  role: 'Owner',
  results: [
    { label: 'Time savings', before: '4 hrs/day', after: '30 min/day' },
    { label: 'Referral increase', before: 'Baseline', after: '+40%' },
    { label: 'Pricing errors', before: '~8/month', after: '0' },
  ],
};

export default function LandingResults() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: metricsRef, isVisible: metricsVisible } = useScrollAnimation();
  const { ref: caseStudyRef, isVisible: caseStudyVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24 bg-foreground text-background overflow-hidden">
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
            Real Results
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            The numbers speak for themselves
          </h2>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            See the measurable impact RugBoost has on businesses like yours.
          </p>
        </div>

        {/* Metrics Grid */}
        <div 
          ref={metricsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {results.map((result, index) => (
            <div 
              key={result.label}
              className={cn(
                "relative p-6 rounded-2xl bg-background/5 border border-background/10 backdrop-blur-sm transition-all duration-700 hover:bg-background/10",
                metricsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: metricsVisible ? `${index * 100}ms` : '0ms' }}
            >
              <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center mb-4", result.bgColor)}>
                <result.icon className={cn("h-6 w-6", result.color)} />
              </div>
              <p className="font-display text-4xl font-bold text-background mb-1">
                {result.metric}
              </p>
              <p className="font-semibold text-background mb-1">
                {result.label}
              </p>
              <p className="text-sm text-background/60">
                {result.description}
              </p>
            </div>
          ))}
        </div>

        {/* Case Study */}
        <div 
          ref={caseStudyRef}
          className={cn(
            "relative rounded-3xl bg-background/5 border border-background/10 p-8 md:p-12 transition-all duration-700",
            caseStudyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="absolute top-6 right-6 flex items-center gap-1 text-sm text-primary font-medium">
            <span>Case Study</span>
            <ArrowUpRight className="h-4 w-4" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Quote side */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg font-bold text-primary-foreground">
                  MC
                </div>
                <div>
                  <p className="font-semibold text-background">{caseStudy.author}</p>
                  <p className="text-sm text-background/60">{caseStudy.role}, {caseStudy.company}</p>
                  <p className="text-xs text-background/40">{caseStudy.location}</p>
                </div>
              </div>
              
              <blockquote className="text-xl md:text-2xl leading-relaxed text-background/90 font-medium">
                "{caseStudy.quote}"
              </blockquote>
            </div>

            {/* Results side */}
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">
                Their Results
              </p>
              <div className="space-y-4">
                {caseStudy.results.map((item, index) => (
                  <div 
                    key={item.label}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl bg-background/5 transition-all duration-500",
                      caseStudyVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    )}
                    style={{ transitionDelay: caseStudyVisible ? `${index * 100 + 300}ms` : '0ms' }}
                  >
                    <span className="text-background/70">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-background/40 line-through">{item.before}</span>
                      <span className="text-lg font-bold text-primary">{item.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
