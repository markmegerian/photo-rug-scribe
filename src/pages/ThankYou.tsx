import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingFooter from '@/components/landing/LandingFooter';

export default function ThankYou() {
  const location = useLocation();
  const name = (location.state as { name?: string } | null)?.name;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingNavbar />
      <div className="h-16" aria-hidden="true" />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-xl text-center">
          <CheckCircle className="h-12 w-12 mx-auto mb-6 text-foreground" aria-hidden="true" />
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            {name ? `Thanks, ${name}.` : 'Thanks — your request is in.'}
          </h1>
          <p className="text-muted-foreground mb-8">
            We received your demo request. Someone from RugBoost will contact you by email to
            arrange a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild className="gap-2">
              <Link to="/live-demo">
                Try the live demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
