import { KeyboardEvent, useRef, useState } from 'react';
import { ArrowRight, Check, ClipboardCheck, ScanSearch, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackCTAClick, trackEvent } from '@/lib/analytics';
import rugPhoto from '@/assets/demo-rug-1.jpg';

type WorkflowTab = 'inspect' | 'estimate' | 'approve';

const tabs: { id: WorkflowTab; label: string }[] = [
  { id: 'inspect', label: 'Inspect' },
  { id: 'estimate', label: 'Estimate' },
  { id: 'approve', label: 'Approve' },
];

export default function LandingHero() {
  const [activeTab, setActiveTab] = useState<WorkflowTab>('estimate');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectTab = (tab: WorkflowTab) => {
    setActiveTab(tab);
    trackEvent('sample_workflow_tab', { tab });
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    const nextTab = tabs[nextIndex];
    if (!nextTab) return;
    setActiveTab(nextTab.id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section id="top" className="border-b border-border pt-24 sm:pt-28 lg:pt-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-12 sm:px-6 sm:pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-20">
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Software built for rug cleaners
          </p>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.02] text-foreground sm:text-5xl lg:text-6xl">
            Turn rug inspections into approved work.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Document each rug, create an estimate with your pricing, and let customers approve the work from their phone.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button size="lg" asChild>
              <Link to="/request-demo" onClick={() => trackCTAClick('Book a demo', 'hero')}>
                Book a demo
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <a className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4" href="#how-it-works">
              See how it works
            </a>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">A personal walkthrough. No obligation.</p>
        </div>

        <div className="border border-border bg-card shadow-medium" aria-label="Sample Rugboost workflow">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 sm:px-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Sample workflow · illustrative data
            </p>
            <span className="text-xs text-muted-foreground">8' × 10' hand-knotted rug</span>
          </div>

          <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-56 border-b border-border sm:min-h-[410px] sm:border-b-0 sm:border-r">
              <img
                src={rugPhoto}
                alt="Sample hand-knotted rug being documented for an inspection"
                className="absolute inset-0 h-full w-full object-cover"
                fetchPriority="high"
              />
              <div className="absolute bottom-3 left-3 bg-background px-3 py-2 shadow-soft">
                <p className="text-xs font-semibold text-foreground">Rug 1048</p>
                <p className="text-[11px] text-muted-foreground">Photos and condition record</p>
              </div>
            </div>

            <div className="flex min-h-[410px] flex-col p-4 sm:p-5">
              <div className="grid grid-cols-3 border border-border" role="tablist" aria-label="Sample workflow stages">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    ref={(element) => { tabRefs.current[index] = element; }}
                    type="button"
                    role="tab"
                    id={`workflow-tab-${tab.id}`}
                    aria-selected={activeTab === tab.id}
                    aria-controls={`workflow-panel-${tab.id}`}
                    tabIndex={activeTab === tab.id ? 0 : -1}
                    onClick={() => selectTab(tab.id)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    className={`min-h-11 border-r border-border px-2 text-sm font-semibold last:border-r-0 ${
                      activeTab === tab.id ? 'bg-foreground text-background' : 'bg-background text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div
                className="flex flex-1 flex-col pt-5"
                role="tabpanel"
                id={`workflow-panel-${activeTab}`}
                aria-labelledby={`workflow-tab-${activeTab}`}
                tabIndex={0}
              >
                {activeTab === 'inspect' && (
                  <div>
                    <div className="mb-4 flex items-center gap-2">
                      <ScanSearch className="h-5 w-5" aria-hidden="true" />
                      <h2 className="text-lg font-extrabold">Inspection findings</h2>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      AI-assisted recommendations, reviewed by your business before sharing.
                    </p>
                    <ul className="divide-y divide-border border-y border-border text-sm">
                      <li className="flex justify-between gap-3 py-3"><span>Ground-in soil</span><span className="text-muted-foreground">General</span></li>
                      <li className="flex justify-between gap-3 py-3"><span>Fringe wear</span><span className="text-muted-foreground">Both ends</span></li>
                      <li className="flex justify-between gap-3 py-3"><span>Color stability</span><span className="text-muted-foreground">Review</span></li>
                    </ul>
                  </div>
                )}

                {activeTab === 'estimate' && (
                  <div>
                    <div className="mb-4 flex items-center gap-2">
                      <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
                      <h2 className="text-lg font-extrabold">Recommended services</h2>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      Your services and rates, itemized for review before sending.
                    </p>
                    <dl className="divide-y divide-border border-y border-border text-sm">
                      <div className="flex justify-between gap-3 py-3"><dt>Deep cleaning</dt><dd className="font-semibold">$440</dd></div>
                      <div className="flex justify-between gap-3 py-3"><dt>Fringe repair</dt><dd className="font-semibold">$180</dd></div>
                      <div className="flex justify-between gap-3 py-4 text-base font-extrabold"><dt>Total</dt><dd>$620</dd></div>
                    </dl>
                  </div>
                )}

                {activeTab === 'approve' && (
                  <div className="flex flex-1 flex-col">
                    <div className="mb-4 flex items-center gap-2">
                      <Send className="h-5 w-5" aria-hidden="true" />
                      <h2 className="text-lg font-extrabold">Customer review</h2>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      One phone-friendly link shows the rug, findings, recommended work, and $620 estimate.
                    </p>
                    <div className="mt-6 border border-border bg-muted/50 p-4">
                      <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-foreground text-background"><Check className="h-4 w-4" aria-hidden="true" /></span>
                        <div>
                          <p className="text-sm font-semibold">Ready for customer review</p>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">No message has been sent and no approval has been recorded in this sample.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}