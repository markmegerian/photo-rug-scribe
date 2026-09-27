import { KeyboardEvent, useRef, useState } from 'react';
import { ArrowRight, Check, ClipboardCheck, ScanSearch, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackCTAClick, trackEvent } from '@/lib/analytics';
import rugPhoto from '@/assets/demo-rug-1.jpg';

type WorkflowTab = 'needs' | 'recommend' | 'approve';

const tabs: { id: WorkflowTab; label: string }[] = [
  { id: 'needs', label: 'Staff view' },
  { id: 'recommend', label: 'Proposal' },
  { id: 'approve', label: 'Approve' },
];

export default function LandingHero() {
  const [activeTab, setActiveTab] = useState<WorkflowTab>('recommend');
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
            For cleaning companies &amp; rug retailers
          </p>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.02] text-foreground sm:text-5xl lg:text-6xl">
            Help your team sell more rug care.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            RugBoost helps your staff identify service opportunities, explains the value of the recommended work to your customers, and presents clear estimates ready for approval.
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
          <p className="mt-3 text-sm text-muted-foreground">Guidance for your team. A compelling proposal for your customer.</p>
        </div>

        <div className="border border-border bg-card shadow-medium" aria-label="Sample RugBoost workflow">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 sm:px-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Sample customer proposal · illustrative data
            </p>
            <span className="text-xs text-muted-foreground">8' × 10' hand-knotted rug</span>
          </div>

          <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-56 border-b border-border sm:min-h-[410px] sm:border-b-0 sm:border-r">
              <img
                src={rugPhoto}
                alt="Sample hand-knotted rug photographed by staff, showing soiling and worn fringe"
                className="absolute inset-0 h-full w-full object-cover"
                fetchPriority="high"
              />
              <div className="absolute bottom-3 left-3 bg-background px-3 py-2 shadow-soft">
                <p className="text-xs font-semibold text-foreground">Rug 1048</p>
                <p className="text-[11px] text-muted-foreground">Rug photo</p>
              </div>
            </div>

            <div className="flex min-h-[410px] flex-col p-4 sm:p-5">
              <div className="grid grid-cols-3 border border-border" role="tablist" aria-label="Sample proposal stages">
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
              >
                {activeTab === 'needs' && (
                  <div>
                    <div className="mb-4 flex items-center gap-2">
                      <ScanSearch className="h-5 w-5" aria-hidden="true" />
                      <h2 className="text-lg font-extrabold">Potential care needs</h2>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      What your staff sees: potential needs flagged for them to confirm, with relevant services suggested.
                    </p>
                    <ul className="divide-y divide-border border-y border-border text-sm">
                      <li className="py-3"><p className="font-semibold">Ground-in soil</p><p className="text-muted-foreground">Dulled color across the field</p></li>
                      <li className="py-3"><p className="font-semibold">Fringe wear</p><p className="text-muted-foreground">Loose and missing knots at both ends</p></li>
                    </ul>
                  </div>
                )}

                {activeTab === 'recommend' && (
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
                      <h2 className="text-lg font-extrabold">Your rug care proposal</h2>
                    </div>
                    <p className="mb-4 text-xs text-muted-foreground">What the customer sees</p>
                    <ul className="space-y-3 text-sm">
                      {[
                        { found: 'Ground-in soil across the field', service: 'Deep cleaning', price: '$440', why: 'Removes embedded grit that grinds down fibers, and brings back the depth of the original colors.' },
                        { found: 'Loose, missing knots at both ends', service: 'Fringe repair', price: '$180', why: 'Secures the ends so wear stops spreading into the rug, protecting its value and appearance.' },
                      ].map((item) => (
                        <li key={item.service} className="border border-border">
                          <div className="flex items-baseline justify-between gap-3 border-b border-border px-3 py-2">
                            <span className="font-extrabold">{item.service}</span>
                            <span className="font-extrabold">{item.price}</span>
                          </div>
                          <div className="px-3 py-2">
                            <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">Found:</span> {item.found}</p>
                            <p className="mt-2 border-l-2 border-foreground pl-2 leading-relaxed"><span className="font-semibold">Why it matters:</span> {item.why}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-extrabold"><span>Estimate total</span><span>$620</span></div>
                  </div>
                )}

                {activeTab === 'approve' && (
                  <div className="flex flex-1 flex-col">
                    <div className="mb-4 flex items-center gap-2">
                      <Send className="h-5 w-5" aria-hidden="true" />
                      <h2 className="text-lg font-extrabold">Customer estimate &amp; approval</h2>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      The customer sees their rug photos, the recommended services and why they matter, and the itemized $620 estimate—then approves from their phone.
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
              <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
                What was found → Recommended service → Why it matters → Price → Approval. Your team reviews every recommendation before it is sent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}