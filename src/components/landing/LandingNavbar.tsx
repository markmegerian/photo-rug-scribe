import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import rugboostLogo from '@/assets/rugboost-horizontal.svg';
import { trackCTAClick, trackNavClick } from '@/lib/analytics';

const navLinks = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
];

export default function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (mobileOpen) firstMobileLinkRef.current?.focus();
  }, [mobileOpen]);

  const closeMobileMenu = (returnFocus = false) => {
    setMobileOpen(false);
    if (returnFocus) requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  const handleMobileMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    closeMobileMenu(true);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md" aria-label="Primary navigation">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link to="/" className="flex min-h-11 shrink-0 items-center" aria-label="RugBoost home">
            <img src={rugboostLogo} alt="RugBoost" className="h-5 w-auto sm:h-6" />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => trackNavClick(link.label)}
                className="inline-flex min-h-11 items-center text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button size="sm" asChild className="h-11 px-3 sm:px-5">
              <Link to="/request-demo" onClick={() => trackCTAClick('Book a demo', 'navbar')}>Book a demo</Link>
            </Button>
            <Button
              ref={menuButtonRef}
              type="button"
              variant="outline"
              size="icon"
              className="flex h-11 w-11 items-center justify-center border border-border lg:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div id="mobile-navigation" className="border-t border-border py-3 lg:hidden" onKeyDown={handleMobileMenuKeyDown}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                ref={link === navLinks[0] ? firstMobileLinkRef : undefined}
                href={link.href}
                onClick={() => { closeMobileMenu(); trackNavClick(link.label); }}
                className="flex min-h-11 items-center px-2 text-base font-semibold text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}