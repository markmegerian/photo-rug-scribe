import { Link } from 'react-router-dom';
import rugboostLogo from '@/assets/rugboost-horizontal-white.svg';

const links = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact & support', href: '/support' },
  { label: 'Live Demo', href: '/live-demo' },
  { label: 'Security', href: '/security' },
  { label: 'Privacy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms-of-service' },
];

export default function LandingFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 border-b border-background/15 pb-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <img src={rugboostLogo} alt="RugBoost" className="h-6 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-background/60">
              Rug care recommendations, professional proposals, and client approvals for cleaning companies and rug retailers.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-8 gap-y-1 sm:flex sm:flex-wrap sm:justify-end">
            {links.map((link) => (
              <Link key={link.href} to={link.href} className="inline-flex min-h-11 items-center text-sm text-background/70 transition-colors hover:text-background">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="pt-6 text-xs text-background/50">© {new Date().getFullYear()} RugBoost. All rights reserved.</p>
      </div>
    </footer>
  );
}