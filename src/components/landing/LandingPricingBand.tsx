import { Link } from 'react-router-dom';

export default function LandingPricingBand() {
  return (
    <section className="bg-muted/40 py-14 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-5 text-center sm:px-6 lg:px-8">
        <p className="text-sm leading-7 text-muted-foreground sm:text-base">
          Plans start at $200 per month for 25 rug inspection estimates. Scale up as your volume grows.{' '}
          <Link
            to="/pricing"
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            See pricing
          </Link>
        </p>
      </div>
    </section>
  );
}
