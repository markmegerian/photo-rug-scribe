import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingHero from "@/components/landing/LandingHero";
import LandingStats from "@/components/landing/LandingStats";
import LandingProblemSolution from "@/components/landing/LandingProblemSolution";
import LandingComparison from "@/components/landing/LandingComparison";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingPricing from "@/components/landing/LandingPricing";
import LandingFAQ from "@/components/landing/LandingFAQ";
import LandingCTA from "@/components/landing/LandingCTA";
import LandingFooter from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main>
        {/* Attention: Hook with hero */}
        <LandingHero />

        {/* Interest: Show metrics and features */}
        <LandingStats />
        <LandingFeatures />

        {/* Build trust: Problem/solution and comparison */}
        <LandingProblemSolution />
        <LandingComparison />

        {/* Action: Remove friction and close */}
        <LandingPricing />

        <LandingFAQ />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
