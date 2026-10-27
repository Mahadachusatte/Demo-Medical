# Product brief

## Working name

Ops Desk, built by Gyraq. The name is a placeholder. Keep it in one config file so it can be changed later.

## One sentence

An operations desk for UK healthcare umbrella companies, where AI agents handle timesheets, CSV imports, pay-run checks, and compliance reminders, and people approve every action that moves money or sends a message.

## Users

| User | Device | What they need |
|---|---|---|
| Payroll administrator | Desktop | Import client hours, clear pay-run exceptions, release payments |
| Operations manager | Desktop | Fill shifts, see what needs attention today |
| Compliance officer | Desktop | Track expiring credentials, approve reminders, read the audit trail |
| Locum worker | Phone, WhatsApp | Accept shifts, send timesheet photos, ask payslip questions |

Hospitals and staffing agencies are clients of the umbrella. They are out of scope for this demo.

## The problem

- Timesheets arrive as paper, email attachments, and WhatsApp photos, and someone re-keys them.
- Every client sends a spreadsheet with different column names.
- Before each pay run, someone checks hours by hand against shifts.
- "What is paid, and what remains?" needs a spreadsheet and a phone call to answer.
- Credential expiry dates live in trackers that nobody reads until something lapses.

## What the demo must prove

Viewers should leave believing three things:

1. **The AI does the tedious intake.** A photo becomes structured hours in seconds, with each field's confidence visible.
2. **People control the money.** Nothing is paid or sent until a named person approves it.
3. **Everything is traceable.** Every agent action appears in one activity log, with its input, output, and approver.

If a screen does not support one of these three points, cut it or simplify it.

## Scope

In scope: the ten screens in `SCREENS.md`, the five simulated agents in `AI_AGENTS.md`, the "Ask the ledger" assistant, the worker phone view, and the Friday night scenario.

Out of scope: real integrations, authentication beyond a fake role switch, payroll calculations, client invoicing screens, and mobile apps.

## Pricing tiers (shown on `/plans`)

These figures come from the pricing plan. Show them as "from" prices. Confirm the currency before anything is published.

| Tier | Price from | Modules included |
|---|---|---|
| Basic | $800 per month | Worker WhatsApp notifications, compliance alerts |
| Standard | $2,000 per month | Everything in Basic, shift matching, timesheet intake |
| Enterprise | $5,000 per month | Everything in Standard, CSV imports, pay-run checks, payment file preparation, invoicing, activity audit export |

Modules outside the tier appear greyed out with the label "Not in this plan."

## Glossary (use these words in the UI, and explain them on hover where needed)

- **Umbrella company:** the employer of record for a temporary worker. It runs payroll and compliance for them.
- **Locum:** a temporary doctor or nurse who works shifts through an agency or umbrella.
- **Timesheet:** the record of hours worked on a shift, approved by the client.
- **Pay run:** one batch of payments for a period, prepared, checked, approved, and released.
- **Exception:** a pay line that needs a human decision before release.
- **Credential:** a document a worker must keep current, such as DBS check, training, or professional registration.
- **DBS:** the criminal records check required for most healthcare roles in England and Wales.

## The demo fiction

- Umbrella: **Northwind Healthcare Umbrella Ltd (demo)**
- Clients: **Riverside General (demo)**, **Harbour Park Hospital (demo)**, **Millbrook Community (demo)**
- Locums: 40 invented people, generated in `DATA_MOCKS.md`
- Every screen carries a visible "Demo: fictional data" label.
