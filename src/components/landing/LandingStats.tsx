import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const stats = [
  {
    value: '50,000+',
    label: 'Rugs Inspected',
    description: 'by RugBoost-powered businesses',
  },
  {
    value: '5 hrs',
    label: 'Saved Weekly',
    description: 'average time saved per user',
  },
  {
    value: '94%',
    label: 'Faster Estimates',
    description: 'compared to manual methods',
  },
  {
    value: '3x',
    label: 'More Referrals',
    description: 'from improved client experience',
  },
];

export default function LandingStats() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="py-12 md:py-16 border-y border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={cn(
            "grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center"
              style={{ 
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
              }}
            >
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-base font-semibold text-foreground mb-0.5">
                {stat.label}
              </p>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
