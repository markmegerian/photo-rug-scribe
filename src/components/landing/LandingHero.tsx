import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import GradientMeshBackground from './GradientMeshBackground';
import appstoreMockup from '@/assets/appstore-mockup-1.png';

export default function LandingHero() {
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: mockupRef, isVisible: mockupVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden relative">
      {/* Gradient mesh background */}
      <GradientMeshBackground />
      
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              AI-Powered Rug Inspection
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Transform Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Rug Business
              </span>{' '}
              with AI
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Automate inspections, generate professional estimates in seconds, and delight clients 
              with a seamless digital experience. Built for modern rug cleaning professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="xl" variant="warm" asChild>
                <a href="mailto:info@rugboost.com" className="gap-2">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button size="xl" variant="outline" className="gap-2" asChild>
                <Link to="/blog">
                  <Play className="h-5 w-5" />
                  Learn More
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Cancel anytime
              </div>
            </div>
          </div>

          {/* Device Mockup */}
          <div 
            ref={mockupRef}
            className={cn(
              "relative flex justify-center lg:justify-end transition-all duration-700 ease-out delay-200",
              mockupVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl scale-150 opacity-50" />
              
              {/* App mockup image */}
              <div className="relative w-[280px] sm:w-[320px] md:w-[360px]">
                <img 
                  src={appstoreMockup} 
                  alt="RugBoost App" 
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
