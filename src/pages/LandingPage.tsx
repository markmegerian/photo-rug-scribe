import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingHero from '@/components/landing/LandingHero';
import LandingLogos from '@/components/landing/LandingLogos';
import LandingStats from '@/components/landing/LandingStats';
import LandingProblemSolution from '@/components/landing/LandingProblemSolution';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingHowItWorks from '@/components/landing/LandingHowItWorks';
import LandingResults from '@/components/landing/LandingResults';
import LandingTestimonials from '@/components/landing/LandingTestimonials';
import LandingGuarantee from '@/components/landing/LandingGuarantee';
import LandingPricing from '@/components/landing/LandingPricing';
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
        
        {/* Desire: Features and proof */}
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingResults />
        <LandingTestimonials />
        
        {/* Action: Remove friction and close */}
        <LandingGuarantee />
        <LandingPricing />
        <LandingFAQ />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
