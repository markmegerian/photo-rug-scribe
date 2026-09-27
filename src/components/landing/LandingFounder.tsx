import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingFounder() {
  return (
    <section className="border-b border-border bg-muted/40 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-start md:gap-16">
          <h2 className="text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">Built for rug professionals. Built by one.</h2>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Created by Mark Megerian, a rug care professional who knows the daily work of inspections, estimates, and customer communication.
            </p>
            <Link to="/about" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground underline underline-offset-4">
              About RugBoost
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}