import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/analytics';

export default function MobileDemoBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('#top');
    const footer = document.querySelector('footer');
    if (!hero) return;

    let heroVisible = true;
    let footerVisible = false;
    const update = () => setVisible(!heroVisible && !footerVisible);
    const heroObserver = new IntersectionObserver(([entry]) => {
      heroVisible = Boolean(entry?.isIntersecting);
      update();
    }, { threshold: 0.05 });
    const footerObserver = new IntersectionObserver(([entry]) => {
      footerVisible = Boolean(entry?.isIntersecting);
      update();
    }, { threshold: 0.01 });

    heroObserver.observe(hero);
    if (footer) footerObserver.observe(footer);
    return () => { heroObserver.disconnect(); footerObserver.disconnect(); };
  }, []);

  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-md transition-transform duration-200 sm:hidden fixed-bottom ${visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'}`} aria-hidden={!visible}>
      <Button className="w-full" asChild tabIndex={visible ? undefined : -1}>
        <Link to="/request-demo" onClick={() => trackCTAClick('Book a demo', 'mobile_sticky')}>Book a demo</Link>
      </Button>
    </div>
  );
}