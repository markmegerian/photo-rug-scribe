import { lazy, Suspense } from 'react';
import DeviceFrame from '@/components/screenshots/DeviceFrame';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Sparkles, Clock, Users, TrendingUp, Camera, FileCheck } from 'lucide-react';

// Lazy load mock components
const MockDashboard = lazy(() => import('@/components/screenshots/MockDashboard'));
const MockAnalysisReport = lazy(() => import('@/components/screenshots/MockAnalysisReport'));
const MockPhotoCapture = lazy(() => import('@/components/screenshots/MockPhotoCapture'));
const MockEstimate = lazy(() => import('@/components/screenshots/MockEstimate'));
const MockClientPortal = lazy(() => import('@/components/screenshots/MockClientPortal'));
const MockAnalytics = lazy(() => import('@/components/screenshots/MockAnalytics'));

const MockLoader = () => (
  <div className="w-full h-full bg-muted animate-pulse rounded-lg" />
);

const features = [
  {
    id: 'analysis',
    icon: Sparkles,
    title: 'AI-Powered Inspections',
    subtitle: 'From 30 minutes to 30 seconds',
    description: 'Photograph a rug and get type, origin, condition issues, and recommended services instantly.',
    highlights: ['Automatic rug identification', 'Condition issue detection'],
    metric: { value: '94%', label: 'faster than manual' },
    MockComponent: MockAnalysisReport,
  },
  {
    id: 'estimate',
    icon: FileCheck,
    title: 'Estimates That Close',
    subtitle: 'One-tap approval',
    description: 'Itemized estimates generate themselves from your pricing rules — clients approve and pay online.',
    highlights: ['Itemized pricing breakdown', 'Online approval and payment'],
    metric: { value: '68%', label: 'higher approval rate' },
    MockComponent: MockEstimate,
  },
  {
    id: 'analytics',
    icon: TrendingUp,
    title: 'Know Your Numbers',
    subtitle: 'Data-driven decisions',
    description: 'Track revenue, conversion rates, and team performance in real time.',
    highlights: ['Revenue & margin tracking', 'Team performance metrics'],
    metric: { value: '23%', label: 'revenue increase avg' },
    MockComponent: MockAnalytics,
  },
];


function FeatureRow({ feature, index }: { feature: typeof features[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={cn(
        "grid lg:grid-cols-2 gap-8 lg:gap-20 items-center",
        isEven ? "" : "lg:flex-row-reverse"
      )}
    >
      {/* Text Content */}
      <div className={cn(
        "transition-all duration-700 ease-out",
        isEven ? "" : "lg:order-2",
        isVisible 
          ? "opacity-100 translate-x-0" 
          : isEven 
            ? "opacity-0 -translate-x-8" 
            : "opacity-0 translate-x-8"
      )}>
        {/* Icon and subtitle */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-none bg-primary/10 flex items-center justify-center">
            <feature.icon className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm font-medium text-primary">{feature.subtitle}</span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-foreground mb-3 sm:mb-4 leading-tight">
          {feature.title}
        </h3>
        <p className="text-base sm:text-lg text-muted-foreground mb-5 sm:mb-6 leading-relaxed">
          {feature.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
          {feature.highlights.map((highlight, i) => (
            <li 
              key={i} 
              className="flex items-center gap-2.5 sm:gap-3 transition-all duration-500"
              style={{ 
                transitionDelay: isVisible ? `${i * 100 + 200}ms` : '0ms',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-10px)'
              }}
            >
              <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <svg className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm sm:text-base text-foreground font-medium">{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Metric callout */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-none bg-muted/50 border border-border">
          <span className="text-xl sm:text-2xl font-bold text-primary">{feature.metric.value}</span>
          <span className="text-xs sm:text-sm text-muted-foreground">{feature.metric.label}</span>
        </div>
      </div>

      {/* Device Mockup */}
      <div className={cn(
        "flex justify-center transition-all duration-700 delay-100",
        isEven ? "lg:justify-end" : "lg:order-1 lg:justify-start",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}>
        <div className="relative">
          {/* Subtle glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 blur-2xl scale-125 opacity-40" />
          
          {/* Responsive scale wrapper */}
          <div className="transform scale-[0.85] sm:scale-100 origin-top">
            <DeviceFrame device="iphone-15-pro" scale={0.55}>
              <Suspense fallback={<MockLoader />}>
                <feature.MockComponent />
              </Suspense>
            </DeviceFrame>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingFeatures() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="features" className="py-12 md:py-24 overflow-x-hidden bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-16 md:mb-24 transition-all duration-700 ease-out",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 sm:mb-3">
            Powerful Features
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-foreground mb-3 sm:mb-4 leading-tight">
            Everything you need to scale
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            From AI-powered inspections to seamless client portals—Rugboost handles every step of your workflow.
          </p>
        </div>

        <div className="space-y-16 md:space-y-32">
          {features.map((feature, index) => (
            <FeatureRow key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
