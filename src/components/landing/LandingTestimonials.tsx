import { Star, Quote, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    quote: "RugBoost cut our inspection time by 80%. What used to take 30 minutes now takes 5. Our clients love the professional reports, and we've eliminated nearly all pricing disputes.",
    author: "Michael Chen",
    role: "Owner",
    company: "Pacific Rug Care",
    location: "San Francisco, CA",
    avatar: "MC",
    metric: "80% time saved",
    category: "Efficiency",
  },
  {
    quote: "I was skeptical about AI accuracy, but RugBoost identifies rug types and conditions better than most of my staff. It catches things we sometimes miss, and the estimates are spot-on.",
    author: "Sarah Martinez",
    role: "Operations Manager",
    company: "Heritage Rugs",
    location: "Austin, TX",
    avatar: "SM",
    metric: "Zero pricing errors",
    category: "Accuracy",
  },
  {
    quote: "Our clients rave about the portal. They can see their rug's condition, approve work, and pay online. It's transformed our customer experience and tripled our referrals.",
    author: "David Thompson",
    role: "Founder",
    company: "Thompson's Oriental Rugs",
    location: "Seattle, WA",
    avatar: "DT",
    metric: "3x more referrals",
    category: "Client Experience",
  },
  {
    quote: "We tried other software but nothing stuck. RugBoost was different—my team actually uses it because it saves them time instead of adding work. Setup took 20 minutes.",
    author: "Jennifer Walsh",
    role: "Owner",
    company: "Elite Rug Services",
    location: "Denver, CO",
    avatar: "JW",
    metric: "20 min setup",
    category: "Ease of Use",
  },
  {
    quote: "The analytics dashboard alone is worth the subscription. I finally understand which services are most profitable and where we're losing money. Revenue is up 23% this quarter.",
    author: "Robert Kim",
    role: "CEO",
    company: "Premier Cleaning Co",
    location: "Chicago, IL",
    avatar: "RK",
    metric: "23% revenue increase",
    category: "Business Growth",
  },
  {
    quote: "I was worried about the learning curve for my older technicians. Turns out the guided photo capture is so intuitive, everyone was comfortable within a day. No training needed.",
    author: "Maria Gonzalez",
    role: "Operations Director",
    company: "Artisan Rug Works",
    location: "Miami, FL",
    avatar: "MG",
    metric: "1-day adoption",
    category: "Team Adoption",
  },
];

export default function LandingTestimonials() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible, getDelay } = useStaggeredAnimation(6, 100);
  const [showAll, setShowAll] = useState(false);

  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-12 transition-all duration-700 ease-out",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Customer Stories
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Loved by rug professionals everywhere
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say.
          </p>
        </div>

        {/* Testimonial categories */}
        <div className={cn(
          "flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700",
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {['Efficiency', 'Accuracy', 'Client Experience', 'Business Growth'].map((cat) => (
            <span 
              key={cat} 
              className="px-3 py-1 rounded-full bg-card border border-border text-sm text-muted-foreground"
            >
              {cat}
            </span>
          ))}
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className={cn(
                "relative bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-medium transition-all duration-700 ease-out group",
                cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={cardsVisible ? getDelay(index) : {}}
            >
              {/* Category badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {testimonial.category}
                </span>
                <span className="text-sm font-bold text-primary">{testimonial.metric}</span>
              </div>

              {/* Quote */}
              <blockquote className="text-foreground leading-relaxed mb-6 group-hover:text-foreground/90">
                "{testimonial.quote}"
              </blockquote>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {testimonial.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show more / Show less */}
        {testimonials.length > 3 && (
          <div className="mt-10 text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="gap-2"
            >
              {showAll ? 'Show less' : `Show ${testimonials.length - 3} more reviews`}
              <ChevronRight className={cn("h-4 w-4 transition-transform", showAll && "rotate-90")} />
            </Button>
          </div>
        )}

        {/* CTA */}
        <div className={cn(
          "mt-12 text-center transition-all duration-700 delay-500",
          cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <p className="text-muted-foreground mb-4">
            Ready to join them?
          </p>
          <Button variant="warm" size="lg" asChild className="gap-2">
            <Link to="/support">
              Start Your Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
