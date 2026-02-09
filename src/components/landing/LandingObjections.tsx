import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const objections = [{
  objection: "I'm not tech-savvy enough",
  response: "If you can take a photo with your phone, you can use RugBoost. Our guided workflows walk you through every step. Plus, we offer free onboarding calls to get you comfortable.",
  proof: "Average user age: 52 • Adoption time: 1 day"
}, {
  objection: "My team won't use new software",
  response: "Unlike clunky enterprise software, RugBoost saves your team time from day one. When tools make their jobs easier, people actually use them. We've seen 95% adoption rates.",
  proof: "95% team adoption rate • No training required"
}, {
  objection: "It's too expensive for my small business",
  response: "At $79/month, you need to save just 2 hours of work to break even. Our average user saves 5+ hours per week. Most businesses see positive ROI within the first week.",
  proof: "847% average ROI • Pays for itself in 1 week"
}, {
  objection: "What if the AI makes mistakes?",
  response: "You're always in control. The AI generates suggestions that you review and approve before anything goes to clients. Think of it as a smart assistant, not an autopilot.",
  proof: "99.2% accuracy rate • Human-in-the-loop always"
}, {
  objection: "I'm locked into my current system",
  response: "We'll help you migrate for free. Export your data from any system, and our team will import it into RugBoost at no cost. Most migrations take less than 24 hours.",
  proof: "Free migration assistance • 24-hour average turnaround"
}, {
  objection: "What if I need to cancel?",
  response: "No contracts, no commitments. Cancel anytime with one click. We'll even help you export all your data. We're confident you'll want to stay, but the choice is always yours.",
  proof: "Cancel anytime • Export all data • No penalties"
}];
export default function LandingObjections() {
  const {
    ref: headerRef,
    isVisible: headerVisible
  } = useScrollAnimation();
  const {
    ref: objectionsRef,
    isVisible: objectionsVisible
  } = useScrollAnimation();
  return <section className="py-16 md:py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className={cn("text-center mb-12 transition-all duration-700 ease-out", headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <MessageCircle className="h-4 w-4" />
            Common Questions
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Still on the fence?{' '}
            <span className="text-primary">Let's address that.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We hear these concerns all the time. Here's the truth.
          </p>
        </div>

        {/* Objections Grid */}
        <div ref={objectionsRef} className="space-y-4">
          {objections.map((item, index) => <div key={item.objection} className={cn("group relative rounded-2xl border border-border bg-card p-6 md:p-8 transition-all duration-700 hover:shadow-card hover:border-primary/20", objectionsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")} style={{
          transitionDelay: objectionsVisible ? `${index * 75}ms` : '0ms'
        }}>
              <div className="grid md:grid-cols-[1fr,2fr] gap-4 md:gap-8">
                {/* Objection */}
                <div className="flex items-start gap-3">
                  <span className="text-2xl">
              </span>
                  <p className="font-semibold text-foreground text-lg leading-snug">
                    "{item.objection}"
                  </p>
                </div>

                {/* Response */}
                <div>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    {item.response}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-primary font-medium">{item.proof}</span>
                  </div>
                </div>
              </div>
            </div>)}
        </div>

        {/* CTA */}
        <div className={cn("mt-12 text-center transition-all duration-700 delay-500", objectionsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="warm" size="lg" asChild className="gap-2">
              <Link to="/support">
                Start Your Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/support">
                Talk to Our Team
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>;
}