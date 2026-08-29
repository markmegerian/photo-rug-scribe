import { Button } from '@/components/ui/button';
import { ArrowRight, Play, CheckCircle2, Sparkles } from 'lucide-react';
import DeviceFrame from '@/components/screenshots/DeviceFrame';
import MockDashboard from '@/components/screenshots/MockDashboard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { trackCTAClick } from '@/lib/analytics';

const quickWins = [
  "Inspections in under 60 seconds",
  "Estimates clients approve online",
  "Built for rug care businesses"
];


export default function LandingHero() {
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: mockupRef, isVisible: mockupVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="pt-28 pb-14 md:pt-32 md:pb-20 overflow-hidden relative">
      {/* Hairline grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div 
            ref={textRef}
            className={cn(
              "text-center lg:text-left transition-all duration-700 ease-out",
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {/* Social proof badge - hidden on very small screens */}
            <div className="hidden sm:inline-flex items-center gap-3 px-4 py-2 border border-foreground/15 bg-background text-sm mb-7">
              <div className="flex -space-x-2">
                {['MC', 'SM', 'DT'].map((initials, i) => (
                  <div 
                    key={i} 
                    className="h-7 w-7 rounded-full bg-foreground flex items-center justify-center text-[10px] text-background font-bold border-2 border-background"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <span className="text-foreground font-semibold">500+</span>
                <span className="text-muted-foreground"> rug professionals</span>
              </div>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4rem] font-extrabold text-foreground leading-[1.02] mb-5 sm:mb-6">
              Rug inspections that take{' '}
              <span className="italic font-normal">minutes,</span>{' '}
              not hours
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-7 sm:mb-9 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Rugboost uses AI to analyze rugs, generate accurate estimates, and delight clients with a modern digital experience—all in <span className="text-foreground font-medium">under 60 seconds</span>.
            </p>

            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0 mb-6">
              <Button size="lg" variant="warm" className="h-12 px-6 whitespace-nowrap gap-2 text-base" asChild>
                <a href="/support" onClick={() => trackCTAClick('Request a Demo', 'hero')}>
                  Request a Demo
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 text-base" onClick={() => { trackCTAClick('View Pricing', 'hero'); document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' }); }}>
                View Pricing
              </Button>
            </div>
            
            {/* Quick wins */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2">
              {quickWins.map((win, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>{win}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Device Mockup */}
          <div 
            ref={mockupRef}
            className={cn(
              "relative flex justify-center lg:justify-end transition-all duration-700 ease-out delay-150 mt-4 lg:mt-0",
              mockupVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="relative">
              {/* Soft neutral halo behind device */}
              <div className="absolute inset-0 bg-foreground/[0.06] blur-3xl scale-125" />
              
              {/* Responsive scale wrapper */}
              <div className="transform scale-[0.85] sm:scale-100 origin-top">
                <DeviceFrame device="iphone-15-pro" scale={0.62}>
                  <MockDashboard />
                </DeviceFrame>
              </div>
              
              {/* Floating stat cards - hidden on mobile */}
              <div className="absolute right-full mr-6 bottom-16 z-20 bg-background p-3.5 border border-foreground/15 animate-fade-in hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-foreground flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-background" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">94%</p>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground whitespace-nowrap">Faster estimates</p>
                  </div>
                </div>
              </div>

              <div className="absolute right-full mr-6 top-16 z-20 bg-background p-3.5 border border-foreground/15 animate-fade-in hidden lg:block" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-foreground flex items-center justify-center">
                    <svg className="h-4 w-4 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">$12k</p>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground whitespace-nowrap">Avg. yearly savings</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
