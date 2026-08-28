import React, { forwardRef } from 'react';
import { demoRugs } from '@/data/demoData';
import { FileText, CheckCircle, AlertTriangle, Sparkles, ArrowLeft, ChevronDown } from 'lucide-react';

const MockAnalysisReport = forwardRef<HTMLDivElement>((_, ref) => {
  const rug = demoRugs[0]; // Antique Persian Tabriz
  
  return (
    <div ref={ref} className="w-full h-full bg-background overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card px-5 py-4">
        <div className="flex items-center gap-3">
          <button className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center" aria-label="Go back">
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          </button>
          <div className="flex-1">
            <p className="font-display text-lg font-bold text-foreground">{rug.rug_number}</p>
            <p className="text-xs text-muted-foreground">{rug.rug_type}</p>
          </div>
          <button className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center" aria-label="More options">
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </header>

      <div className="p-5 space-y-4 pb-20 overflow-auto">
        {/* AI Analysis Badge */}
        <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-xl border border-primary/20">
          <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">AI-Powered Analysis</p>
            <p className="text-xs text-muted-foreground">Expert inspection completed</p>
          </div>
        </div>

        {/* At-a-Glance Card */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <h2 className="font-display text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            At-a-Glance
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Type</p>
              <p className="text-sm font-medium text-foreground">Persian Tabriz</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Dimensions</p>
              <p className="text-sm font-medium text-foreground">{rug.width}' × {rug.length}'</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Age</p>
              <p className="text-sm font-medium text-foreground">Circa 1920s</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Origin</p>
              <p className="text-sm font-medium text-foreground">Tabriz, Iran</p>
            </div>
          </div>
        </div>

        {/* Condition Assessment */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-foreground">Very Good</h2>
              <p className="text-xs text-muted-foreground">Overall Condition</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This exquisite antique displays exceptional craftsmanship with vibrant traditional indigo, madder red, and ivory tones remaining beautifully preserved.
          </p>
        </div>

        {/* Issues Identified */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <h2 className="font-display text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-foreground" />
            Issues Identified
          </h2>
          <div className="space-y-3">
            {[
              'Light surface soiling in high-traffic areas',
              'Minor fringe deterioration (3 inches)',
              'Two small moth nibbles requiring reweaving',
              'Original selvedge showing slight wear',
            ].map((issue, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-muted rounded-lg border border-border">
                <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 flex-shrink-0" />
                <p className="text-sm text-foreground">{issue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

MockAnalysisReport.displayName = 'MockAnalysisReport';

export default MockAnalysisReport;
