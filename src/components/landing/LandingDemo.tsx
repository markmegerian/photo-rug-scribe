import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { trackCTAClick, trackEvent } from '@/lib/analytics';
import { ArrowRight, Check, ImagePlus, Loader2, RotateCcw } from 'lucide-react';
import rugPhoto1 from '@/assets/demo-rug-1.jpg';
import rugPhoto2 from '@/assets/demo-rug-2.jpg';

const photos = [
  { src: rugPhoto1, alt: 'Full view of an antique Persian rug photographed on a floor' },
  { src: rugPhoto2, alt: 'Close-up of a stained, worn rug corner' },
];

const report = {
  type: 'Hand-knotted Persian Tabriz',
  age: 'Est. 40–60 years',
  size: "8' x 10'",
  findings: [
    { issue: 'Pet stain, center field', severity: 'Moderate' },
    { issue: 'Edge fraying, left selvage', severity: 'Minor' },
    { issue: 'Pile wear, high-traffic area', severity: 'Moderate' },
  ],
  services: [
    { name: 'Full immersion wash', price: '$320' },
    { name: 'Pet odor & stain treatment', price: '$145' },
    { name: 'Selvage repair (6 ft)', price: '$180' },
  ],
  total: '$645',
};

type Stage = 'upload' | 'analyzing' | 'report';

export default function LandingDemo() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });
  const [stage, setStage] = useState<Stage>('upload');
  const [added, setAdded] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const addPhoto = () => {
    const next = Math.min(added + 1, photos.length);
    setAdded(next);
    trackEvent('demo_photo_added', { photo_index: next });
    if (next === photos.length) {
      setStage('analyzing');
      timers.current.push(
        window.setTimeout(() => {
          setStage('report');
          trackEvent('demo_report_generated');
        }, 1800)
      );
    }
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setAdded(0);
    setStage('upload');
  };

  return (
    <section id="demo" className="py-14 md:py-24 border-t border-border bg-muted/30">
      <div
        ref={ref}
        className={cn(
          'max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 transition-all duration-700 ease-out',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <div className="text-center mb-8 md:mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground mb-3">
            Interactive Demo
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-3 leading-tight">
            Two photos in. A priced repair report out.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Add the sample rug photos below and watch Rugboost build the report your client sees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-start">
          {/* Upload panel */}
          <div className="border border-border bg-background p-5 sm:p-6">
            <p className="text-sm font-semibold text-foreground mb-4">1. Upload rug photos</p>
            <div className="grid grid-cols-2 gap-3">
              {photos.map((photo, i) => (
                <div
                  key={photo.src}
                  className="relative aspect-square border border-border bg-muted overflow-hidden"
                >
                  {i < added ? (
                    <>
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        width={768}
                        height={768}
                        loading="lazy"
                        className="h-full w-full object-cover animate-fade-in"
                      />
                      <span className="absolute bottom-2 right-2 h-6 w-6 bg-foreground flex items-center justify-center">
                        <Check className="h-3.5 w-3.5 text-background" />
                      </span>
                    </>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                      <ImagePlus className="h-6 w-6" aria-hidden="true" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5">
              {added < photos.length ? (
                <Button variant="warm" className="w-full gap-2" onClick={addPhoto}>
                  <ImagePlus className="h-4 w-4" />
                  {added === 0 ? 'Add first photo' : 'Add second photo'}
                </Button>
              ) : (
                <Button variant="outline" className="w-full gap-2" onClick={reset}>
                  <RotateCcw className="h-4 w-4" />
                  Run it again
                </Button>
              )}
            </div>
          </div>

          {/* Report panel */}
          <div className="border border-border bg-background p-5 sm:p-6 min-h-[360px]">
            <p className="text-sm font-semibold text-foreground mb-4">2. Repair report preview</p>

            {stage === 'upload' && (
              <p className="text-sm text-muted-foreground">
                Waiting for photos. The report generates automatically once both are added.
              </p>
            )}

            {stage === 'analyzing' && (
              <div className="flex items-center gap-3 text-sm text-muted-foreground" role="status">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Analyzing fibers, weave, and damage…
              </div>
            )}

            {stage === 'report' && (
              <div className="animate-fade-in space-y-5">
                <div>
                  <p className="text-base font-bold text-foreground">{report.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {report.age} · {report.size}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Condition findings
                  </p>
                  <ul className="space-y-1.5">
                    {report.findings.map((f) => (
                      <li key={f.issue} className="flex justify-between gap-3 text-sm">
                        <span className="text-foreground">{f.issue}</span>
                        <span className="text-muted-foreground whitespace-nowrap">{f.severity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Recommended services
                  </p>
                  <ul className="space-y-1.5">
                    {report.services.map((s) => (
                      <li key={s.name} className="flex justify-between gap-3 text-sm">
                        <span className="text-foreground">{s.name}</span>
                        <span className="text-foreground font-semibold">{s.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-sm font-semibold text-foreground">Estimate total</span>
                  <span className="text-lg font-extrabold text-foreground">{report.total}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button size="lg" variant="warm" className="gap-2" asChild>
            <a href="/request-demo" onClick={() => trackCTAClick('Request a Demo', 'demo_section')}>
              See it on your own rugs
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
