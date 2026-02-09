import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingHero from '@/components/landing/LandingHero';
import LandingStats from '@/components/landing/LandingStats';
import LandingProblemSolution from '@/components/landing/LandingProblemSolution';
import LandingComparison from '@/components/landing/LandingComparison';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingPricing from '@/components/landing/LandingPricing';
import LandingFAQ from '@/components/landing/LandingFAQ';
import LandingCTA from '@/components/landing/LandingCTA';
import LandingFooter from '@/components/landing/LandingFooter';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main>
        {/* Attention: Hook with hero */}
        <LandingHero />
        
        {/* Interest: Show the problem and metrics */}
        <LandingStats />
        <LandingProblemSolution />
        <LandingComparison />
        
        {/* Desire: Features */}
        <LandingFeatures />
        
        {/* Action: Remove friction and close */}
        <LandingPricing />
        
        {/* Action: Remove friction and close */}
        <LandingPricing />
        <LandingFAQ />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
