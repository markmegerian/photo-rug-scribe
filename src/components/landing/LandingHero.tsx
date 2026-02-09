import { Button } from '@/components/ui/button';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import DeviceFrame from '@/components/screenshots/DeviceFrame';
import MockDashboard from '@/components/screenshots/MockDashboard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const quickWins = [
  "14-day free trial",
  "No credit card required", 
  "Setup in under 5 minutes"
];

export default function LandingHero() {
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: mockupRef, isVisible: mockupVisible } = useScrollAnimation({ threshold: 0.2 });
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Scroll to pricing with email context
    const pricingSection = document.querySelector('#pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 pb-8 md:pt-32 md:pb-16 overflow-hidden relative bg-gradient-to-b from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div 
            ref={textRef}
            className={cn(
              "text-center lg:text-left transition-all duration-700 ease-out",
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {/* Social proof badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/80 backdrop-blur-sm text-sm font-medium mb-8 shadow-soft">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[10px] text-primary-foreground font-bold border-2 border-card"
                  >
                    {['A', 'M', 'J'][i-1]}
                  </div>
                ))}
              </div>
              <span className="text-muted-foreground">Trusted by <span className="text-foreground font-semibold">500+</span> rug professionals</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-[1.1] mb-6 tracking-tight">
              Stop losing hours on{' '}
              <span className="relative inline-block">
                <span className="relative z-10">rug inspections</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-primary/20 -rotate-1 rounded" />
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              RugBoost uses AI to analyze rugs, generate estimates, and deliver a client experience that wins referrals—all in <span className="text-foreground font-medium">under 60 seconds</span>.
            </p>
            
            {/* Email signup form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0 mb-6">
              <Input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base bg-card border-border focus:border-primary"
                required
              />
              <Button type="submit" size="lg" variant="warm" className="h-12 px-6 whitespace-nowrap gap-2">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            
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
              "relative flex justify-center lg:justify-end transition-all duration-700 ease-out delay-200",
              mockupVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="relative">
              {/* Soft glow behind device */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/10 to-transparent blur-3xl scale-150" />
              
              <DeviceFrame device="iphone-15-pro" scale={0.65}>
                <MockDashboard />
              </DeviceFrame>
              
              {/* Floating stat card */}
              <div className="absolute -left-4 sm:-left-12 bottom-16 bg-card rounded-xl p-4 shadow-medium border border-border animate-fade-in hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">5h</p>
                    <p className="text-xs text-muted-foreground">Saved per week</p>
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
