import { Link } from 'react-router-dom';
import rugboostLogo from '@/assets/rugboost-horizontal.svg';

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
    <footer className="bg-muted">
      <div className="mx-auto max-w-[1120px] px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-8 border-b border-border pb-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <img src={rugboostLogo} alt="RugBoost" className="h-6 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Rug care recommendations, professional proposals, and client approvals for cleaning companies and rug retailers.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-8 gap-y-1 sm:flex sm:flex-wrap sm:justify-end">
            {links.map((link) => (
              <Link key={link.href} to={link.href} className="inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="pt-6 text-sm text-muted-foreground">© {new Date().getFullYear()} RugBoost. All rights reserved.</p>
      </div>
    </footer>
  );
}
