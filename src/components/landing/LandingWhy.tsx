import { MessageSquare, PhoneOff, BadgeCheck, Store } from 'lucide-react';

const cards = [
  {
    icon: MessageSquare,
    title: 'Recommend with confidence',
    body: 'Newer staff can spot fringe wear, moth damage, or a rug that needs protection, and explain it the way a veteran would.',
  },
  {
    icon: PhoneOff,
    title: "Fewer 'why does it cost that?' calls",
    body: 'Clients see the photo, the reason, and the price together, before they have to ask.',
  },
  {
    icon: BadgeCheck,
    title: 'More of the right services approved',
    body: 'When the work is understood, clients say yes to what the rug actually needs.',
  },
  {
    icon: Store,
    title: 'Your services, your rates, your brand',
    body: 'Proposals are built from your own price list and carry your branding.',
  },
];

export default function LandingWhy() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1120px] px-6 lg:px-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">Why RugBoost</p>
        <h2 className="font-serif font-normal text-[30px] leading-[1.1] tracking-[-0.01em] text-foreground lg:text-[40px]">
          Built for the conversation, not just the cleaning.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {cards.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-[12px] border border-border bg-card p-6 sm:p-8">
              <Icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-[13px] leading-7 text-muted-foreground">
          Works for rug cleaning plants, and for rug retailers who offer cleaning and repair.
        </p>
      </div>
    </section>
  );
}
