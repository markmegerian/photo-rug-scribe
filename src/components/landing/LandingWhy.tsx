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
    <section className="border-b border-border bg-muted/40 py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Why RugBoost</p>
        <h2 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
          Built for the conversation, not just the cleaning.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {cards.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-lg border border-border bg-background p-6 sm:p-8">
              <Icon className="h-6 w-6 text-foreground" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-extrabold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm leading-7 text-muted-foreground">
          Works for rug cleaning plants, and for rug retailers who offer cleaning and repair.
        </p>
      </div>
    </section>
  );
}
