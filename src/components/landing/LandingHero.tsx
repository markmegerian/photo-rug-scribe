import { Button } from '@/components/ui/button';
import { ArrowRight, Play, CheckCircle2, Sparkles } from 'lucide-react';
import DeviceFrame from '@/components/screenshots/DeviceFrame';
import MockDashboard from '@/components/screenshots/MockDashboard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const quickWins = [
  "14-day free trial",
  "No credit card required", 
  "Setup in 5 minutes"
];

export default function LandingHero() {
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: mockupRef, isVisible: mockupVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="pt-20 pb-8 md:pt-28 md:pb-12 overflow-hidden relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div 
            ref={textRef}
            className={cn(
              "text-center lg:text-left transition-all duration-700 ease-out",
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {/* Social proof badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border bg-card/80 backdrop-blur-sm text-sm mb-6 shadow-soft">
              <div className="flex -space-x-2">
                {['MC', 'SM', 'DT'].map((initials, i) => (
                  <div 
                    key={i} 
                    className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[10px] text-primary-foreground font-bold border-2 border-card"
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
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-bold text-foreground leading-[1.1] mb-5 tracking-tight">
              Rug inspections that take{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">minutes,</span>
              </span>{' '}
              not hours
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              RugBoost uses AI to analyze rugs, generate accurate estimates, and delight clients with a modern digital experience—all in <span className="text-foreground font-medium">under 60 seconds</span>.
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0 mb-5">
              <Button size="lg" variant="warm" className="h-12 px-6 whitespace-nowrap gap-2" asChild>
                <a href="/support">
                  Request a Demo
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6" onClick={() => document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                View Pricing
              </Button>
            </div>
            
            {/* Quick wins */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2">
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
              "relative flex justify-center lg:justify-end transition-all duration-700 ease-out delay-150",
              mockupVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="relative">
              {/* Soft glow behind device */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/10 to-transparent blur-3xl scale-150" />
              
              <DeviceFrame device="iphone-15-pro" scale={0.62}>
                <MockDashboard />
              </DeviceFrame>
              
              {/* Floating stat cards */}
              <div className="absolute -left-4 sm:-left-8 bottom-20 bg-card rounded-xl p-3.5 shadow-medium border border-border animate-fade-in hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">94%</p>
                    <p className="text-xs text-muted-foreground">Faster estimates</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-2 sm:-right-6 top-24 bg-card rounded-xl p-3.5 shadow-medium border border-border animate-fade-in hidden sm:block" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-accent/10 flex items-center justify-center">
                    <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">$12k</p>
                    <p className="text-xs text-muted-foreground">Avg. yearly savings</p>
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
