# Project Architecture

- Keep the marketing homepage as a short composition of focused landing-section components; this preserves clarity while shared navigation and footer remain reusable across public pages.
- Handle URL hash scrolling at the application router level so homepage section links work from every public route, including lazy-loaded pages.- Homepage sample proposal is one component (ProposalDemo) with compact and expanded views sharing a single local store; it never submits real approvals.
- Warm-neutral palette lives ONLY as global design tokens in `src/index.css` (background #FBFAF8, ink #16150F, muted #F4F2EE, border #E6E2DB); every page picks them up — never hardcode hex values in components; no accent colors (the rug photo is the only strong color).
- Landing-only shape and typography rules (Instrument Serif h1/h2 at 400 weight, 12px card radius, 48px/8px buttons, 17px body via the `.landing` class) are scoped to the landing composition — other pages keep Inter and the default shadcn shapes; Instrument Serif must never be paired with a bold weight.

