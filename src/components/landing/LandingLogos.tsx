import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

// Placeholder logos - in production these would be real customer logos
const logos = [
  { name: 'Pacific Rug Care', initials: 'PRC' },
  { name: 'Heritage Rugs', initials: 'HR' },
  { name: 'Thompson Oriental', initials: 'TO' },
  { name: 'Elite Rug Services', initials: 'ERS' },
  { name: 'Premier Cleaning Co', initials: 'PCC' },
  { name: 'Artisan Rug Works', initials: 'ARW' },
];

export default function LandingLogos() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="py-12 border-b border-border bg-muted/30">
      <div 
        ref={ref}
        className={cn(
          "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <p className="text-center text-sm font-medium text-muted-foreground mb-8">
          Trusted by leading rug cleaning businesses across North America
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo, index) => (
            <div 
              key={logo.name}
              className={cn(
                "flex items-center gap-2 transition-all duration-500",
                isVisible ? "opacity-100" : "opacity-0"
              )}
              style={{ transitionDelay: isVisible ? `${index * 80}ms` : '0ms' }}
            >
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                {logo.initials}
              </div>
              <span className="text-sm font-medium text-muted-foreground hidden sm:block">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
