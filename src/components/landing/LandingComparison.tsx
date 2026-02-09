import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Check, X, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const comparisonData = [{
  feature: 'Rug condition assessment',
  traditional: '15-30 minutes manual inspection',
  rugboost: '2 minutes with AI-powered analysis'
}, {
  feature: 'Pricing accuracy',
  traditional: 'Varies by employee experience',
  rugboost: '99.2% consistent pricing every time'
}, {
  feature: 'Client communication',
  traditional: 'Phone calls & paper receipts',
  rugboost: 'Real-time portal with photo updates'
}, {
  feature: 'Documentation',
  traditional: 'Handwritten notes, lost paperwork',
  rugboost: 'Complete digital history forever'
}, {
  feature: 'Revenue tracking',
  traditional: 'Spreadsheets & guesswork',
  rugboost: 'Live analytics dashboard'
}, {
  feature: 'Dispute resolution',
  traditional: 'He said, she said arguments',
  rugboost: 'Photo evidence & signed approvals'
}];
const benefits = [{
  label: 'Save 5+ hours every week',
  icon: '⏱️'
}, {
  label: 'Eliminate pricing disputes',
  icon: '💰'
}, {
  label: 'Delight clients with transparency',
  icon: '😊'
}, {
  label: 'Grow referrals organically',
  icon: '📈'
}];
export default function LandingComparison() {
  const {
    ref: headerRef,
    isVisible: headerVisible
  } = useScrollAnimation();
  const {
    ref: tableRef,
    isVisible: tableVisible
  } = useScrollAnimation();
  return <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className={cn("text-center mb-12 transition-all duration-700 ease-out", headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Sparkles className="h-4 w-4" />
            Why Choose RugBoost
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            The smarter way to run your{' '}
            <span className="text-primary">rug business</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See exactly how RugBoost transforms every aspect of your operation.
          </p>
        </div>

        {/* Comparison Table */}
        <div ref={tableRef} className={cn("rounded-3xl border border-border overflow-hidden shadow-card mb-12 transition-all duration-700", tableVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-muted/50">
            <div className="p-4 md:p-6 font-semibold text-muted-foreground">
              Feature
            </div>
            <div className="p-4 md:p-6 font-semibold text-center text-muted-foreground border-l border-border">
              <div className="flex items-center justify-center gap-2">
                <X className="h-4 w-4 text-destructive" />
                Traditional Method
              </div>
            </div>
            <div className="p-4 md:p-6 font-semibold text-center bg-primary/5 border-l border-border">
              <div className="flex items-center justify-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-primary">RugBoost</span>
              </div>
            </div>
          </div>

          {/* Table Rows */}
          {comparisonData.map((row, index) => <div key={row.feature} className={cn("grid grid-cols-3 transition-all duration-500", index % 2 === 0 ? 'bg-background' : 'bg-muted/30', tableVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4")} style={{
          transitionDelay: tableVisible ? `${index * 50}ms` : '0ms'
        }}>
              <div className="p-4 md:p-6 font-medium text-foreground">
                {row.feature}
              </div>
              <div className="p-4 md:p-6 text-center text-muted-foreground border-l border-border text-sm md:text-base">
                {row.traditional}
              </div>
              <div className="p-4 md:p-6 text-center text-foreground bg-primary/5 border-l border-border font-medium text-sm md:text-base">
                {row.rugboost}
              </div>
            </div>)}
        </div>

        {/* Benefits Grid */}
        <div className={cn("grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 transition-all duration-700 delay-300", tableVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
          {benefits.map(benefit => {})}
        </div>

        {/* CTA */}
        <div className={cn("text-center transition-all duration-700 delay-500", tableVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
          <Button variant="warm" size="xl" asChild className="gap-2">
            <Link to="/support">
              Start Your Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required • Setup in 5 minutes
          </p>
        </div>
      </div>
    </section>;
}