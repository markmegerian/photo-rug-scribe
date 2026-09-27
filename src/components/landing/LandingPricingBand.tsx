import { Link } from 'react-router-dom';

export default function LandingPricingBand() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1120px] px-6 text-center lg:px-8">
        <p className="text-sm leading-7 text-muted-foreground sm:text-base">
          Plans start at $200 per month for 25 rug inspection estimates. Scale up as your volume grows.{' '}
          <Link
            to="/pricing"
            className="font-semibold text-foreground underline-offset-4 transition-colors duration-150 hover:underline"
          >
            See pricing
          </Link>
        </p>
      </div>
    </section>
  );
}
