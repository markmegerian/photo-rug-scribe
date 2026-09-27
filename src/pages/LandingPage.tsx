import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingHero from "@/components/landing/LandingHero";
import LandingValueProp from "@/components/landing/LandingValueProp";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingProposal from "@/components/landing/LandingProposal";
import LandingWhy from "@/components/landing/LandingWhy";
import LandingCTA from "@/components/landing/LandingCTA";
import LandingFooter from "@/components/landing/LandingFooter";
import MobileDemoBar from "@/components/landing/MobileDemoBar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main>
        <LandingHero />
        <LandingValueProp />
        <LandingFeatures />
        <LandingProposal />
        <LandingFAQ />
        <LandingCTA />
      </main>
      <LandingFooter />
      <MobileDemoBar />
    </div>
  );
}


