# Tech stack and deployment

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (latest stable, App Router) | Native on Vercel, with server route handlers for the AI call |
| Language | TypeScript, strict mode | Catches shape mismatches in the seed data |
| Styling | Tailwind CSS, with design tokens in `globals.css` | Matches the token set in `DESIGN_SYSTEM.md` |
| Components | Hand-built, using Radix primitives only for dialogs, tabs, and menus | Avoids stock component looks |
| State | Zustand, one store for entities and events | Simple, no backend |
| Validation | Zod, for the chat request and for CSV column mapping | Clear errors |
| Charts | Recharts, one line chart on the dashboard | Small and well known |
| Icons | lucide-react, icons only, always with a text label or an accessible name | Consistent |
| CSV | Papa Parse, in the browser | No upload to a server |
| AI | `@anthropic-ai/sdk`, in the route handler only | Key stays on the server |
| Font | Schibsted Grotesk via `next/font/google` | One family, see `DESIGN_SYSTEM.md` |
| Tests | Vitest for scenario order, scoring, CSV mapping, and the approval rule | Fast |

Node 20 or later. Use the package manager you prefer; the instructions below use npm.

## Folder structure

```
ops-desk/
├── docs/                         # this plan pack
├── public/
│   └── samples/
│       ├── ward4-october.csv
│       └── timesheet-sample.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx            # shell, demo banner, font, noindex meta
│   │   ├── globals.css           # design tokens
│   │   ├── page.tsx              # entry screen
│   │   ├── plans/page.tsx
│   │   ├── worker/page.tsx
│   │   ├── ops/
│   │   │   ├── layout.tsx        # rail, top bar, margin column
│   │   │   ├── page.tsx          # dashboard
│   │   │   ├── shifts/page.tsx
│   │   │   ├── timesheets/page.tsx
│   │   │   ├── imports/page.tsx
│   │   │   ├── pay-runs/page.tsx
│   │   │   ├── compliance/page.tsx
│   │   │   ├── ledger/page.tsx
│   │   │   └── activity/page.tsx
│   │   └── api/ask/route.ts      # the only server code
│   ├── components/
│   │   ├── ledger-table.tsx
│   │   ├── status-rule.tsx
│   │   ├── margin-note.tsx
│   │   ├── approval-bar.tsx
│   │   ├── diff-view.tsx
│   │   ├── confidence-bar.tsx
│   │   ├── phone-frame.tsx
│   │   ├── record-chips.tsx
│   │   ├── confirm-sheet.tsx
│   │   └── toast.tsx
│   ├── data/
│   │   ├── types.ts
│   │   ├── seed.ts
│   │   ├── seed-names.ts
│   │   └── prepared-answers.ts
│   ├── lib/
│   │   ├── store.ts              # Zustand store
│   │   ├── events.ts             # append-only event log
│   │   ├── scenario.ts           # Friday night script
│   │   ├── demo-rules.ts         # the 22% demo deduction, exception rule
│   │   ├── csv-mapping.ts
│   │   └── agents/
│   │       ├── intake.ts
│   │       ├── matching.ts
│   │       ├── ledger.ts
│   │       ├── exceptions.ts
│   │       └── compliance.ts
│   └── test/
│       ├── scenario.test.ts
│       ├── matching.test.ts
│       ├── csv-mapping.test.ts
│       └── approval-rule.test.ts
├── .env.example
├── package.json
└── README.md
```

## Environment variables

Put these in `.env.example`, with empty values. Never commit a real `.env.local`.

| Name | Required | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | No | Enables the live assistant. Without it, prepared answers are used. |
| `ANTHROPIC_MODEL` | No | Defaults to `claude-haiku-5-5`. |
| `NEXT_PUBLIC_DEMO_LABEL` | No | Text for the demo banner. Defaults to "Demo: fictional data, no real messages or payments." |

Do not create any variable with a `NEXT_PUBLIC_` prefix that holds a secret.

## Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "vitest run"
}
```

Before every deploy, run `npm run lint`, `npm run test`, and `npm run build`. All three must pass.

## Local setup

```bash
npm install
cp .env.example .env.local     # optional: add ANTHROPIC_API_KEY
npm run dev
```

Open `http://localhost:3000`. Press "Play the Friday night scenario" to test the full flow.

## Deploy to Vercel

1. **Create the repository.** Push the project to a private GitHub repository. Keep `docs/` in the repo so the plan stays with the code.

2. **Import the project.** In Vercel, choose "Add New", then "Project", then import the repository. Vercel detects Next.js. Leave the root directory as the repository root and keep the default build settings (`next build`, output managed by Next.js).

3. **Add environment variables.** Under Project Settings, then Environment Variables, add `ANTHROPIC_API_KEY` and `ANTHROPIC_MODEL`. Set each for Production and Preview. Do not add them to the browser-visible list.

4. **Deploy.** Start the deployment. Wait for the build log to finish. If it fails, read the first error, not the last.

5. **Check the live site.** Open the production URL and test in this order: the entry screen, the Friday night scenario from start to finish, the CSV import with the sample file, the release button being disabled while a line is held, the worker view, and one question in "Ask the ledger".

6. **Keep the demo private.**
   - Turn on Vercel Deployment Protection (password or Vercel Authentication) for preview and production if your plan includes it. Check the current option names in Vercel's settings, as they change.
   - The layout already sends a `noindex` robots tag, so search engines do not list the demo.

7. **Optional custom domain.** Under Domains, add a subdomain such as `demo.gyraq.com` and follow Vercel's DNS instructions.

8. **Set a spending limit on the AI key.** In the Anthropic console, set a monthly usage limit on the key used for the demo. Keep the in-memory rate limit in the route handler as well.

## Vercel plan note

Vercel's Hobby plan is intended for personal, non-commercial projects. A demo used in client sales conversations for a company may fall under commercial use. Check Vercel's current terms before using Hobby for this, and move to a paid plan if the terms require it.

## Before sharing the link with anyone

- Confirm every screen shows the demo banner.
- Confirm the seed data contains no real names, identifiers, or company details.
- Confirm no button sends a message or moves money.
- Confirm the protection setting is on, or the link is only shared with people you choose.
