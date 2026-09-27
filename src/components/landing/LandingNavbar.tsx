import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import rugboostLogo from '@/assets/rugboost-horizontal.svg';
import { trackCTAClick, trackNavClick } from '@/lib/analytics';

const navLinks = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Live demo', href: '/live-demo' },
];

export default function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) firstMobileLinkRef.current?.focus();
  }, [mobileOpen]);

  const closeMobileMenu = (returnFocus = false) => {
    if (returnFocus) menuButtonRef.current?.focus();
    setMobileOpen(false);
  };

  const handleMobileMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    closeMobileMenu(true);
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b bg-background/90 backdrop-blur-md transition-colors duration-150 ${
        scrolled ? 'border-border' : 'border-transparent'
      }`}
      aria-label="Primary navigation"
    >
      <div className="mx-auto max-w-[1120px] px-6 lg:px-8">
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
                className="inline-flex min-h-11 items-center text-[15px] font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button asChild className="h-12 rounded-[8px] px-[22px] text-[15px] font-medium">
              <Link to="/request-demo" onClick={() => trackCTAClick('Request a demo', 'navbar')}>Request a demo</Link>
            </Button>
            <Button
              ref={menuButtonRef}
              type="button"
              variant="outline"
              size="icon"
              className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-border bg-transparent text-foreground hover:bg-muted hover:text-foreground lg:hidden"
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
                className="flex min-h-11 items-center px-2 text-base font-medium text-foreground"
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
