import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingHero from "@/components/landing/LandingHero";
import LandingValueProp from "@/components/landing/LandingValueProp";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingFAQ from "@/components/landing/LandingFAQ";
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
        <LandingFAQ />
        <LandingCTA />
      </main>
      <LandingFooter />
      <MobileDemoBar />
    </div>
  );
}


