import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProposalDemo from './ProposalDemo';
import { trackCTAClick } from '@/lib/analytics';

const bullets = [
  {
    lead: 'Annotated photos.',
    text: 'Numbered markers tie each recommendation to a spot on the rug.',
  },
  {
    lead: 'Plain-language explanations.',
    text: 'Written for the client, not the technician.',
  },
  {
    lead: 'Itemized, optional services.',
    text: 'Clients approve what they choose and see a running total.',
  },
];

export default function LandingProposal() {
  const [open, setOpen] = useState(false);

  return (
    <section id="proposal" className="scroll-mt-16 bg-muted py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1120px] gap-10 px-6 lg:grid-cols-[0.4fr_0.6fr] lg:items-center lg:gap-14 lg:px-8">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">The proposal</p>
          <h2 className="font-serif font-normal text-[30px] leading-[1.1] tracking-[-0.01em] text-foreground lg:text-[40px]">A proposal that explains itself.</h2>
          <p className="mt-5 max-w-[34em] text-base leading-7 text-muted-foreground">
            Every recommended service arrives with what your team observed, why it matters, and what the client gets. Clients choose what to approve.
          </p>
          <ul className="mt-7 space-y-4">
            {bullets.map((b) => (
              <li key={b.lead} className="text-sm leading-7 text-muted-foreground sm:text-base">
                <span className="font-semibold text-foreground">{b.lead}</span> {b.text}
              </li>
            ))}
          </ul>
          <Link
            to="/live-demo"
            onClick={() => trackCTAClick('Try it with your own rug photo', 'proposal')}
            className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground underline underline-offset-4 transition-colors duration-150 hover:text-muted-foreground focus-visible:outline-none focus-visible:underline"
          >
            Try it with your own rug photo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div>
          <ProposalDemo open={open} onOpenChange={setOpen} />
        </div>
      </div>
    </section>
  );
}
