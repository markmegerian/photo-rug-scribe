import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { trackCTAClick } from '@/lib/analytics';
import { useEffect, useState } from 'react';

export default function LandingDemo() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    if (isVisible && !hasTracked) {
      trackCTAClick('demo_view', 'landing_demo_section');
      setHasTracked(true);
    }
  }, [isVisible, hasTracked]);

  return (
    <section id="demo" className="py-16 md:py-24 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      <div
        ref={ref}
        className={cn(
          "max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-sm font-semibold text-primary tracking-wide uppercase mb-3">
            Interactive Demo
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            See RugBoost in action
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Try the full experience yourself — snap a photo, get an instant AI analysis, and generate a professional estimate in seconds.
          </p>
        </div>

        {/* Demo iframe centered in a device-like wrapper */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Glow behind */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/10 to-transparent blur-3xl scale-125 pointer-events-none" />
            
            {/* Phone bezel wrapper */}
            <div className="relative bg-foreground/90 rounded-[36px] p-[6px] shadow-medium">
              <div className="rounded-[30px] overflow-hidden bg-background">
                <iframe
                  src="https://id-preview--a955a398-abf7-4e86-8b6f-4d670a014316.lovable.app/demo"
                  className="w-[375px] h-[812px] sm:w-[420px] sm:h-[900px] max-w-[calc(100vw-48px)]"
                  style={{ border: 'none', aspectRatio: '420/900' }}
                  allow="clipboard-write"
                  title="RugBoost Interactive Demo"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
