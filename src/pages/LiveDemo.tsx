import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ImagePlus, Loader2, RotateCcw, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { trackEvent } from '@/lib/analytics';
import rugboostLogo from '@/assets/rugboost-horizontal.svg';

const MAX_PHOTOS = 3;
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_DIMENSION = 1400;

interface Finding {
  issue: string;
  severity: string;
}
interface Service {
  name: string;
  price: number;
}
interface Report {
  isRug: boolean;
  type: string;
  age: string;
  size: string;
  material: string;
  condition: string;
  findings: Finding[];
  services: Service[];
}

async function fileToResizedDataUrl(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Could not read the file'));
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Could not read the image'));
    image.src = dataUrl;
  });

  const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) return dataUrl;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.82);
}

export default function LiveDemo() {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const room = MAX_PHOTOS - photos.length;
    const chosen = Array.from(files).slice(0, room);

    for (const file of chosen) {
      if (!file.type.startsWith('image/')) {
        toast({ title: 'Photos only', description: 'Please choose image files.', variant: 'destructive' });
        return;
      }
      if (file.size > MAX_FILE_BYTES) {
        toast({ title: 'Photo too large', description: 'Each photo must be under 8 MB.', variant: 'destructive' });
        return;
      }
    }

    try {
      const encoded = await Promise.all(chosen.map(fileToResizedDataUrl));
      setPhotos((prev) => [...prev, ...encoded].slice(0, MAX_PHOTOS));
      setReport(null);
    } catch {
      toast({ title: 'Could not add photo', description: 'Please try a different image.', variant: 'destructive' });
    } finally {
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const analyze = async () => {
    if (photos.length === 0) return;
    setLoading(true);
    setReport(null);
    trackEvent('live_demo_analyze', { photo_count: photos.length });

    try {
      const { data, error } = await supabase.functions.invoke('analyze-rug', {
        body: { images: photos },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      const result = data.report as Report;
      if (!result?.isRug) {
        toast({
          title: "That doesn't look like a rug",
          description: 'Try a photo showing the full rug or a damaged area.',
          variant: 'destructive',
        });
        return;
      }
      setReport(result);
      trackEvent('live_demo_report_generated');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Please try again.';
      toast({ title: 'Analysis failed', description: message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPhotos([]);
    setReport(null);
  };

  const total = report?.services?.reduce((sum, s) => sum + (Number(s.price) || 0), 0) ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={rugboostLogo} alt="Rugboost" className="h-6 w-auto" />
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </header>

      <main className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground mb-3">
              Live Demo
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              Upload your own rug photos
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Add up to three photos of a real rug and Rugboost will generate an inspection and
              priced repair report, exactly like it does inside the app.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Upload */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-display text-lg font-extrabold text-foreground mb-4">Your photos</h2>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {photos.map((src, i) => (
                    <div key={i} className="relative aspect-square border border-border overflow-hidden">
                      <img src={src} alt={`Uploaded rug photo ${i + 1}`} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setPhotos((prev) => prev.filter((_, idx) => idx !== i))}
                        className="absolute top-1 right-1 bg-foreground text-background p-1"
                        aria-label={`Remove photo ${i + 1}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}

                  {photos.length < MAX_PHOTOS && (
                    <button
                      type="button"
                      onClick={() => inputRef.current?.click()}
                      className="aspect-square border border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                    >
                      <ImagePlus className="h-5 w-5" aria-hidden="true" />
                      <span className="text-xs">Add photo</span>
                    </button>
                  )}
                </div>

                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />

                <p className="text-xs text-muted-foreground mb-5">
                  JPG or PNG, up to 8 MB each. Photos are used only to generate this report.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={analyze} disabled={photos.length === 0 || loading} className="gap-2 flex-1">
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing…
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Generate repair report
                      </>
                    )}
                  </Button>
                  {(photos.length > 0 || report) && (
                    <Button variant="outline" onClick={reset} className="gap-2" disabled={loading}>
                      <RotateCcw className="h-4 w-4" />
                      Reset
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Report */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-display text-lg font-extrabold text-foreground mb-4">Repair report</h2>

                {!report && !loading && (
                  <p className="text-sm text-muted-foreground">
                    Add at least one photo and generate a report to see the analysis here.
                  </p>
                )}

                {loading && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing fibers, weave, and damage…
                  </div>
                )}

                {report && (
                  <div className="space-y-5">
                    <dl className="grid grid-cols-2 gap-3 text-sm">
                      {[
                        ['Type', report.type],
                        ['Material', report.material],
                        ['Age', report.age],
                        ['Size', report.size],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
                          <dd className="text-foreground font-medium">{value}</dd>
                        </div>
                      ))}
                    </dl>

                    <p className="text-sm text-muted-foreground">{report.condition}</p>

                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Findings</h3>
                      <ul className="space-y-2">
                        {report.findings?.map((f, i) => (
                          <li key={i} className="flex items-start justify-between gap-3 text-sm border-b border-border pb-2">
                            <span className="text-foreground">{f.issue}</span>
                            <span className="text-muted-foreground whitespace-nowrap">{f.severity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Recommended services</h3>
                      <ul className="space-y-2">
                        {report.services?.map((s, i) => (
                          <li key={i} className="flex items-start justify-between gap-3 text-sm border-b border-border pb-2">
                            <span className="text-foreground">{s.name}</span>
                            <span className="text-foreground font-medium whitespace-nowrap">
                              ${Number(s.price).toLocaleString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between pt-3 font-display font-extrabold text-foreground">
                        <span>Estimate total</span>
                        <span>${total.toLocaleString()}</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Sample pricing for demonstration. In the app, estimates use your own service rates.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild className="gap-2">
              <Link to="/request-demo">
                Request a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
