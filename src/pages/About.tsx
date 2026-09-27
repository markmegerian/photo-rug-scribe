import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingFooter from '@/components/landing/LandingFooter';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Camera, FileText, Lock, Database, Trash2, UserCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { trackCTAClick } from '@/lib/analytics';

const values = [
  {
    icon: Camera,
    title: 'Grounded in rug care',
    description:
      'RugBoost is shaped by hands-on rug care experience. It focuses on the moments that matter most: spotting what a rug needs, recommending the right service, and explaining it to the client.',
  },
  {
    icon: FileText,
    title: 'Clarity for every client',
    description:
      'Clients decide with confidence when they understand the work. RugBoost presents annotated photos, service explanations, and itemized pricing, and lets clients approve the services they choose.',
  },
  {
    icon: UserCheck,
    title: 'Your business, your data',
    description:
      'Your client lists, inspection history, and pricing belong to you. We store them securely, we never sell them, and you can export or delete them at any time.',
  },
];

const dataPractices = [
  {
    icon: Lock,
    title: 'Encrypted in transit',
    description:
      'Rug photos and client details travel over encrypted HTTPS connections. Access is limited to your account and the people you invite.',
  },
  {
    icon: Database,
    title: 'Used only to serve you',
    description:
      'Photos you upload are used to prepare your recommendations and proposals and nothing else. We do not sell, share, or mine your rug or client data for advertising.',
  },
  {
    icon: Trash2,
    title: 'You control retention',
    description:
      'Delete an inspection, a client, or your entire account and the data goes with it. Demo photos on this site are used only to produce the report you see and are not retained.',
  },
];

export default function About() {
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();
  const { ref: dataRef, isVisible: dataVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />

      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 md:py-24 px-5 sm:px-6 lg:px-8 border-b border-border">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground mb-4">
              About RugBoost
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-5">
              Modern tools for a centuries-old craft
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Rug care is a skilled trade built on trust. RugBoost helps cleaning companies and rug
              retailers share that expertise: supporting staff as they recommend services, and giving
              clients the information they need to make informed decisions.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-14 md:py-20 px-5 sm:px-6 lg:px-8">
          <div
            ref={missionRef}
            className={cn(
              'max-w-3xl mx-auto transition-all duration-700 ease-out',
              missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mb-5">
              Our mission
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              RugBoost was created by Mark Megerian, a rug care professional. In that work, a recurring
              challenge is not the cleaning itself but the conversation around it: recognizing what a rug
              needs, and explaining why a service is worth it. A price without an explanation is hard for
              any client to approve.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              RugBoost supports staff at cleaning companies and rug retailers in recommending relevant
              services, then turns those recommendations into a professional proposal with annotated
              photos, clear explanations, and transparent pricing. Your team reviews everything before
              it is sent, and clients choose which services to approve.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-14 md:py-20 px-5 sm:px-6 lg:px-8 bg-card border-y border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mb-10 text-center">
              What we stand for
            </h2>
            <div
              ref={valuesRef}
              className={cn(
                'grid md:grid-cols-3 gap-6 transition-all duration-700 ease-out',
                valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              {values.map((v) => (
                <div key={v.title} className="bg-background border border-border p-6 sm:p-8">
                  <v.icon className="h-6 w-6 text-foreground mb-4" aria-hidden="true" />
                  <h3 className="font-display text-lg font-extrabold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data handling */}
        <section className="py-14 md:py-20 px-5 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div
              ref={dataRef}
              className={cn(
                'transition-all duration-700 ease-out',
                dataVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="max-w-3xl mb-10">
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                  How we handle your rug and repair data
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Inspections include photos of clients' homes and valuables, so we treat that data
                  with the same care you treat the rugs themselves.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {dataPractices.map((d) => (
                  <div key={d.title} className="border border-border p-6 sm:p-8">
                    <d.icon className="h-6 w-6 text-foreground mb-4" aria-hidden="true" />
                    <h3 className="font-display text-lg font-extrabold text-foreground mb-2">{d.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-8">
                Want the full technical detail? Read our{' '}
                <Link to="/security" className="underline underline-offset-4 text-foreground">
                  Security page
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" className="underline underline-offset-4 text-foreground">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 md:py-20 px-5 sm:px-6 lg:px-8 bg-card border-t border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
              See RugBoost in action
            </h2>
            <p className="text-muted-foreground mb-8">
              Book a personalized demo and we will walk through recommendations and a client proposal together.
            </p>
            <Button size="lg" asChild className="gap-2">
              <Link to="/request-demo" onClick={() => trackCTAClick('Request a Demo', 'about_page')}>
                Request a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
