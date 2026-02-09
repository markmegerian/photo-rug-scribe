import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingHowItWorks from '@/components/landing/LandingHowItWorks';
import LandingGetStarted from '@/components/landing/LandingGetStarted';
import LandingFooter from '@/components/landing/LandingFooter';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main className="pt-16">
        <LandingHowItWorks />
        <LandingGetStarted />
      </main>
      <LandingFooter />
    </div>
  );
}
