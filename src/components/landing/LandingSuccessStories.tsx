import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { TrendingUp, Clock, Star, ArrowRight, Quote, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const successStories = [
  {
    name: 'John Richardson',
    company: 'Richardson Rug Restoration',
    location: 'Boston, MA',
    avatar: 'JR',
    image: '/placeholder.svg',
    headline: 'Increased referrals by 300%',
    quote: "The client portal changed everything. Customers love seeing their rug's progress, and they share it with friends. My referrals tripled in 6 months.",
    metrics: [
      { label: 'Referral Increase', value: '+300%', icon: TrendingUp },
      { label: 'Monthly Revenue', value: '+$8,200', icon: TrendingUp },
      { label: 'Time Saved', value: '12 hrs/week', icon: Clock },
    ],
    tags: ['Referrals', 'Client Experience'],
    videoAvailable: true,
  },
  {
    name: 'Sarah Chen',
    company: 'Oriental Rug Masters',
    location: 'Los Angeles, CA',
    avatar: 'SC',
    image: '/placeholder.svg',
    headline: 'Saves 8 hours every week',
    quote: "I used to spend half my day on inspections and estimates. Now I spend that time growing my business. RugBoost paid for itself in the first month.",
    metrics: [
      { label: 'Weekly Hours Saved', value: '8 hours', icon: Clock },
      { label: 'Pricing Accuracy', value: '100%', icon: Star },
      { label: 'Client Disputes', value: '0', icon: Star },
    ],
    tags: ['Efficiency', 'Accuracy'],
    videoAvailable: true,
  },
  {
    name: 'Marcus Williams',
    company: 'Elite Carpet Care',
    location: 'Atlanta, GA',
    avatar: 'MW',
    image: '/placeholder.svg',
    headline: 'Scaled from 2 to 8 employees',
    quote: "Training new staff used to take weeks. With RugBoost's guided workflows, new hires are productive on day one. We scaled our team 4x this year.",
    metrics: [
      { label: 'Team Growth', value: '4x', icon: TrendingUp },
      { label: 'Training Time', value: '1 day', icon: Clock },
      { label: 'Revenue Growth', value: '+180%', icon: TrendingUp },
    ],
    tags: ['Scaling', 'Training'],
    videoAvailable: false,
  },
];

export default function LandingSuccessStories() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: storiesRef, isVisible: storiesVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
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
            Success Stories
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Real results from real businesses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. See how RugBoost has transformed these businesses.
          </p>
        </div>

        {/* Stories */}
        <div ref={storiesRef} className="space-y-8 lg:space-y-12">
          {successStories.map((story, index) => (
            <div 
              key={story.name}
              className={cn(
                "relative bg-card rounded-3xl border border-border overflow-hidden shadow-card transition-all duration-700",
                storiesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                index % 2 === 1 && "lg:flex-row-reverse"
              )}
              style={{ transitionDelay: storiesVisible ? `${index * 150}ms` : '0ms' }}
            >
              <div className={cn(
                "grid lg:grid-cols-2 gap-0",
                index % 2 === 1 && "lg:[direction:rtl]"
              )}>
                {/* Image/Video Side */}
                <div className="relative aspect-video lg:aspect-auto bg-gradient-to-br from-primary/10 to-accent/10 lg:[direction:ltr]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {story.videoAvailable ? (
                      <button className="group flex items-center justify-center h-20 w-20 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 ml-1" />
                      </button>
                    ) : (
                      <div className="text-center p-8">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-primary-foreground mx-auto mb-4">
                          {story.avatar}
                        </div>
                        <p className="font-semibold text-foreground">{story.name}</p>
                        <p className="text-sm text-muted-foreground">{story.company}</p>
                      </div>
                    )}
                  </div>
                  {story.videoAvailable && (
                    <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                      Watch {story.name.split(' ')[0]}'s Story
                    </div>
                  )}
                </div>

                {/* Content Side */}
                <div className="p-6 md:p-10 lg:[direction:ltr]">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {story.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Headline */}
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold text-foreground mb-4">
                    {story.headline}
                  </h3>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                    <blockquote className="text-muted-foreground leading-relaxed pl-6">
                      "{story.quote}"
                    </blockquote>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
                      {story.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{story.name}</p>
                      <p className="text-sm text-muted-foreground">{story.company} • {story.location}</p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-muted/50">
                    {story.metrics.map((metric) => (
                      <div key={metric.label} className="text-center">
                        <metric.icon className="h-5 w-5 text-primary mx-auto mb-1" />
                        <p className="text-xl font-bold text-foreground">{metric.value}</p>
                        <p className="text-xs text-muted-foreground">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={cn(
          "mt-12 text-center transition-all duration-700 delay-500",
          storiesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <p className="text-muted-foreground mb-4">
            Ready to write your success story?
          </p>
          <Button variant="warm" size="xl" asChild className="gap-2">
            <Link to="/support">
              Start Your Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
