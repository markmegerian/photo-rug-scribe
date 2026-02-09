import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const stats = [
  {
    value: '50,000+',
    label: 'Rugs Inspected',
    description: 'by RugBoost users',
  },
  {
    value: '5.2 hrs',
    label: 'Saved Weekly',
    description: 'per employee average',
  },
  {
    value: '94%',
    label: 'Faster Estimates',
    description: 'vs. manual methods',
  },
  {
    value: '3x',
    label: 'More Referrals',
    description: 'from better experience',
  },
];

export default function LandingStats() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="py-10 md:py-14 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={cn(
            "grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className={cn(
                "text-center p-4 rounded-xl transition-all duration-500",
                isVisible ? "opacity-100" : "opacity-0"
              )}
              style={{ transitionDelay: isVisible ? `${index * 80}ms` : '0ms' }}
            >
              <p className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-sm font-semibold text-foreground mb-0.5">
                {stat.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
