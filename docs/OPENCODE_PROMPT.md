# OpenCode build prompt

Paste everything below the line into OpenCode as the first instruction.

---

You are building **Ops Desk**, a frontend-only demo of an AI-assisted operations desk for UK healthcare umbrella companies. It will be deployed on Vercel. The product is fictional, the data is fictional, and nothing sends real messages or moves real money.

## Step 0: read the plan before writing code

Read these files in order. They are the specification. If something in the code conflicts with them, the documents win, and you should say so.

1. `docs/PRODUCT_BRIEF.md`
2. `docs/DESIGN_SYSTEM.md`
3. `docs/SCREENS.md`
4. `docs/DATA_MOCKS.md`
5. `docs/AI_AGENTS.md`
6. `docs/TECH_AND_DEPLOY.md`

## Step 1: write a short design plan and review it

Before any component code, write a short plan in `docs/DESIGN_PLAN_NOTES.md`:

- The palette, as named hex values from `DESIGN_SYSTEM.md`, and how each token is used.
- The type setup and scale.
- The layout for the ops shell and the worker phone view, as an ASCII wireframe each.
- Three principles that make this product look like itself and not like a generic SaaS dashboard.

Then review the plan against the "Avoid these" list in `DESIGN_SYSTEM.md`. If any part is a common default, change it and note what you changed and why. Only then start building.

## Step 2: build in milestones

Build in the order below. After each milestone, run `npm run lint`, `npm run test`, and `npm run build`, and fix any failures before moving on. Commit after each milestone with a message that names it.

**M0. Shell and tokens.** Scaffold the Next.js app and install the stack in `TECH_AND_DEPLOY.md`. Set the design tokens in `globals.css`. Build the root layout with the demo banner, the font, and the `noindex` tag. Build the ops layout with the left rail, top bar, main column, and margin column. Build the entry page.
*Done when:* the entry page and an empty `/ops` render at 1280px and 390px, and the banner shows on every page.

**M1. Data and store.** Write the types, seed data (40 workers, 3 clients, 12 wards, 34 shifts, 6 timesheets, one pay run with 112 lines), the event log with its approval rule, and the Zustand store. Write the Friday night scenario engine as a stoppable, replayable script with pauses at steps 4, 7, and 8. Add "Reset demo".
*Done when:* unit tests pass for the scenario order, the matching score, and the approval rule (an event with a money or message action and no approver must throw).

**M2. Dashboard and activity log.** Build `/ops` with the summary lines, the fill-rate chart, "Needs you today", and the latest margin note. Build `/ops/activity` with filters and the export button.
*Done when:* every summary number matches the seed, and playing the scenario updates both pages without a reload.

**M3. Shift matching and worker offers.** Build `/ops/shifts` with the ranked table and reasons. Build `/worker` with the offer card, the accept flow, and the confirmation. Connect them, so accepting on `/worker` marks the shift as filled on `/ops/shifts`.
*Done when:* the ranking is identical on every run, and "Send offers to top 5" opens the confirm sheet.

**M4. Timesheet intake.** Build `/ops/timesheets` with the queue, the timesheet illustration (SVG), the extracted fields with confidence bars, Accept, Edit, and Reject. Connect the worker's photo button to this queue.
*Done when:* the Friday night timesheet shows 14.0 hours with confidence 0.62 and the Check this label, and a person can change it to 12.0 and accept.

**M5. CSV import with diff.** Build `/ops/imports` as the four steps. Use Papa Parse in the browser. Load `public/samples/ward4-october.csv` from the sample link. Column matching shows the agent's guess. The diff step shows added, changed, and rejected rows with reasons.
*Done when:* the sample imports 109 rows, with 9 rejected and listed with reasons, and going back keeps the mapping.

**M6. Pay-run exceptions and release.** Build `/ops/pay-runs` with the run header, tabs, exception rows, and actions. The "Release run" button stays disabled while any line is held. Release opens the confirm sheet and downloads `DEMO-payment-file-october.csv` with the banner row "DEMO FILE. NOT FOR BANK SUBMISSION."
*Done when:* a held line blocks release, and the downloaded file carries the demo banner.

**M7. Compliance monitor.** Build `/ops/compliance` with the filters, the status rules, Draft reminder, and the confirm sheet for Send reminder. Use the reminder template in `AI_AGENTS.md`.
*Done when:* the Priya Nair DBS reminder can be drafted, approved, and logged as "sent (demo)".

**M8. Ask the ledger and the worker assistant.** Build `/api/ask` as a route handler with Zod validation, the in-memory rate limit, and the two system prompts. Build the chat UI and the record chips on `/ops/ledger`, and the short assistant on `/worker`. Write `prepared-answers.ts` and use it when `ANTHROPIC_API_KEY` is missing.
*Done when:* the app works with no key set, every answer shows record chips, and an out-of-scope question gets the "not in the demo ledger" answer.

**M9. Plans, polish, and checks.** Build `/plans` with the tier control. Run an accessibility pass: focus outlines, labels, keyboard use, reduced motion. Check the phone layout on `/worker` and the under-768px notice on `/ops`. Confirm the margin notes write in once on scenario playback and appear at once when reduced motion is set.
*Done when:* the axe checks report no violations on every route, and the Lighthouse accessibility score is 90 or higher.

## Constraints (apply throughout)

- No backend, database, or authentication beyond a demo role switch. State lives in the browser.
- Use only fictional people and companies. Do not add real company names, real NI numbers, or real bank details.
- Do not implement tax, National Insurance, or pension calculations. Use the demo deduction rule from `DATA_MOCKS.md`, and label it.
- No code path may call an SMS, WhatsApp, email, or payment API.
- The Anthropic key is read only in the route handler. Never import the SDK in a client component.
- Use the copy voice in `DESIGN_SYSTEM.md`: sentence case, active verbs, buttons named for their action, toasts that repeat the button's verb, and "(demo)" wherever a real action would have happened.
- Do not use the avoided defaults in `DESIGN_SYSTEM.md`: no all-caps eyebrows, no middle-dot meta strings, no arrows on links, no card grids with shadows, no gradients, no numbered markers unless the content is a sequence.
- One orchestrated motion moment only: the margin notes during scenario playback. Respect reduced motion.
- Keep dependencies to the list in `TECH_AND_DEPLOY.md`. Ask before adding any other package.

## Definition of done

The work is done when all of these are true:

1. `npm run lint`, `npm run test`, and `npm run build` all pass.
2. Pressing "Play the Friday night scenario" from the entry page runs all nine steps, pauses at the three human steps, and finishes with Sam Reyes's Saturday shift filled.
3. Every agent action in that run appears in `/ops/activity`, with status and approver.
4. The release button cannot release a run that has a held line.
5. The app works with no `ANTHROPIC_API_KEY` set.
6. No screen sends a real message or moves real money, and every demo output is labelled.
7. Each route in `SCREENS.md` meets its acceptance criteria.
8. The app builds and runs on Vercel using `TECH_AND_DEPLOY.md`.

## Final report

When you finish, write `docs/BUILD_REPORT.md` with:

- The routes built, and any route that differs from `SCREENS.md`, with the reason.
- Each acceptance criterion marked as met, partly met, or not met.
- The design choices you made beyond the spec, and the avoided defaults you checked for.
- Any place where the spec was unclear, and what you assumed.
- The commands you ran to verify the build, and their results.
- The exact steps to deploy, in the order a non-developer would follow them.

Do not stop at a partial build. If you cannot finish a milestone, say which part is missing and why in the build report.
