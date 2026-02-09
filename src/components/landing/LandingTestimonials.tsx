import { Star, Quote } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    quote: "RugBoost cut our inspection time by 80%. What used to take 30 minutes now takes 5. Our clients love the professional reports.",
    author: "Michael Chen",
    role: "Owner, Pacific Rug Care",
    avatar: "MC",
    metric: "80% time saved",
  },
  {
    quote: "The AI analysis is incredibly accurate. It catches things our team sometimes misses, and the automated estimates have eliminated pricing errors.",
    author: "Sarah Martinez",
    role: "Operations Manager, Heritage Rugs",
    avatar: "SM",
    metric: "Zero pricing errors",
  },
  {
    quote: "Our clients rave about the portal. They can see their rugs' condition, approve work, and pay online. It's transformed our customer experience.",
    author: "David Thompson",
    role: "Founder, Thompson's Oriental Rugs",
    avatar: "DT",
    metric: "3x more referrals",
  },
];

export default function LandingTestimonials() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible, getDelay } = useStaggeredAnimation(testimonials.length, 150);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-16 transition-all duration-700 ease-out",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Customer Stories
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by rug professionals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of businesses that have transformed their operations with RugBoost.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "relative bg-card rounded-2xl p-8 border border-border shadow-card hover:shadow-medium transition-all duration-700 ease-out",
                cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={cardsVisible ? getDelay(index) : {}}
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-6">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <Quote className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>

              {/* Metric badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {testimonial.metric}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
