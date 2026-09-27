# Project Architecture

- Keep the marketing homepage as a short composition of focused landing-section components; this preserves clarity while shared navigation and footer remain reusable across public pages.
- Handle URL hash scrolling at the application router level so homepage section links work from every public route, including lazy-loaded pages.- Homepage sample proposal is one component (ProposalDemo) with compact and expanded views sharing a single local store; it never submits real approvals.
