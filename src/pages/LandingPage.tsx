import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingHero from '@/components/landing/LandingHero';
import LandingLogos from '@/components/landing/LandingLogos';
import LandingStats from '@/components/landing/LandingStats';
import LandingProblemSolution from '@/components/landing/LandingProblemSolution';
import LandingComparison from '@/components/landing/LandingComparison';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingResults from '@/components/landing/LandingResults';
import LandingSuccessStories from '@/components/landing/LandingSuccessStories';
import LandingTestimonials from '@/components/landing/LandingTestimonials';
import LandingObjections from '@/components/landing/LandingObjections';
import LandingSecurity from '@/components/landing/LandingSecurity';
import LandingGuarantee from '@/components/landing/LandingGuarantee';
import LandingPricing from '@/components/landing/LandingPricing';
import LandingUrgency from '@/components/landing/LandingUrgency';
import LandingFAQ from '@/components/landing/LandingFAQ';
import LandingCTA from '@/components/landing/LandingCTA';
import LandingFooter from '@/components/landing/LandingFooter';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main>
        {/* Attention: Hook with hero + social proof */}
        <LandingHero />
        <LandingLogos />
        
        {/* Interest: Show the problem and metrics */}
        <LandingStats />
        <LandingProblemSolution />
        <LandingComparison />
        
        {/* Desire: Features and proof */}
        <LandingFeatures />
        <LandingResults />
        <LandingSuccessStories />
        <LandingTestimonials />
        
        {/* Trust: Address concerns */}
        <LandingObjections />
        <LandingSecurity />
        <LandingGuarantee />
        
        {/* Action: Remove friction and close */}
        <LandingPricing />
        <LandingUrgency />
        <LandingFAQ />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
