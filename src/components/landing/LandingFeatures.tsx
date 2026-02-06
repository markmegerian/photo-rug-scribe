import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Camera, 
  FileText, 
  CreditCard, 
  BarChart3, 
  Sparkles 
} from 'lucide-react';

const features = [
  {
    id: 'dashboard',
    title: 'Manage Jobs Effortlessly',
    description: 'Track every job from intake to delivery in one unified dashboard. See status at a glance, search clients, and never lose track of a rug again.',
    highlights: ['Real-time status updates', 'Client search & filters', 'Batch operations'],
    icon: LayoutDashboard,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'analysis',
    title: 'AI-Powered Inspections',
    description: 'Our AI analyzes rug photos to identify type, origin, condition issues, and recommended services. What took 30 minutes now takes 30 seconds.',
    highlights: ['Rug type identification', 'Condition detection', 'Service recommendations'],
    icon: Sparkles,
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    id: 'photo',
    title: 'Guided Photo Capture',
    description: 'Step-by-step guidance ensures your team captures the right angles every time. Consistent documentation across all jobs.',
    highlights: ['Built-in photo guide', 'Issue annotation', 'Cloud storage'],
    icon: Camera,
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'estimate',
    title: 'Professional Estimates',
    description: 'Generate detailed, itemized estimates automatically based on AI analysis. Adjust pricing, add services, and approve with one tap.',
    highlights: ['Itemized pricing', 'Required vs optional services', 'One-tap approval'],
    icon: FileText,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'portal',
    title: 'Seamless Client Experience',
    description: 'Clients receive a personalized portal to view inspections, approve estimates, make payments, and track their rugs.',
    highlights: ['Estimate approval', 'Online payments', 'Job tracking'],
    icon: CreditCard,
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'analytics',
    title: 'Business Insights',
    description: 'Understand your business with real-time analytics. Track revenue, conversion rates, popular services, and team performance.',
    highlights: ['Revenue tracking', 'Conversion funnels', 'Service popularity'],
    icon: BarChart3,
    gradient: 'from-indigo-500 to-blue-500',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={cn(
        "group relative bg-card rounded-2xl border border-border p-8 transition-all duration-500",
        "hover:shadow-lg hover:border-primary/20",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className={cn(
        "inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6",
        "bg-gradient-to-br",
        feature.gradient,
        "shadow-lg"
      )}>
        <Icon className="h-7 w-7 text-white" />
      </div>

      {/* Content */}
      <h3 className="font-display text-xl font-bold text-foreground mb-3">
        {feature.title}
      </h3>
      <p className="text-muted-foreground mb-6">
        {feature.description}
      </p>
      
      <ul className="space-y-2">
        {feature.highlights.map((highlight, i) => (
          <li 
            key={i} 
            className="flex items-center gap-2 text-sm"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
            <span className="text-foreground/80">{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LandingFeatures() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="features" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-16 transition-all duration-700 ease-out",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Run a Modern Rug Business
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From inspection to payment, RugBoost handles every step of your workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
