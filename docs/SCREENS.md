# Screens

Every route below uses the shell: left rail, top bar, demo banner, main column, and margin column. The top bar holds the page title, a "Play the Friday night scenario" button, and a "Reset demo" button.

## Route map

| Route | Screen | Viewport |
|---|---|---|
| `/` | Entry | Desktop and phone |
| `/ops` | Dashboard | Desktop and tablet |
| `/ops/shifts` | Shift matching | Desktop and tablet |
| `/ops/timesheets` | Timesheet intake | Desktop and tablet |
| `/ops/imports` | CSV import with diff | Desktop and tablet |
| `/ops/pay-runs` | Pay-run exceptions | Desktop and tablet |
| `/ops/compliance` | Compliance monitor | Desktop and tablet |
| `/ops/ledger` | Ask the ledger | Desktop and tablet |
| `/ops/activity` | Agent activity log | Desktop and tablet |
| `/worker` | Worker phone view | Phone first |
| `/plans` | Pricing tiers | Desktop and phone |

Under 768px, every `/ops` route shows a short notice: "Open the ops desk on a larger screen. The worker view works on your phone." The dashboard and the activity log remain readable.

---

## `/` Entry

**Purpose:** frame the demo in one screen and let the viewer choose where to start.

**Layout:** a left-aligned headline, two sentences of explanation, and three actions in a row.

- Headline: "Payroll and shifts, handled by agents. Money moved by people."
- Body: "Ops Desk shows how an umbrella company's team and its workers use AI agents day to day. Every action waits for a person before it changes money or sends a message."
- Actions: "Open the ops desk" (to `/ops`), "Open the worker phone" (to `/worker`), and "Play the Friday night scenario" (starts the scenario and opens `/ops`).
- Banner: "Demo: fictional company and workers. No real messages or payments."

**Acceptance:** all three actions work. The page loads in under two seconds on a mid-range phone.

---

## `/ops` Dashboard

**Purpose:** show what needs attention today, in one glance.

**Layout:** a ledger-style summary at the top, then a list of today's open items, then the last eight agent events.

Summary lines (not cards):
- Shifts filled today: 28 of 34
- Timesheets to review: 6
- Credentials expiring in 14 days: 9
- Remaining to pay this run: £41,280 (demo figure)

Below the summary: a single line chart of the weekly fill rate for the past 8 weeks (Recharts, one series, no legend box). Then "Needs you today": a list of 3 to 5 items, each with a status rule and an action button.

Margin column: the most recent agent note, plus a link "See all in activity".

**Interactions:**
- Clicking a summary line opens the relevant screen.
- "Approve" on a "Needs you" item works the same way as on its own screen.

**States:** loading shows a plain text line "Loading the ledger…" with no spinner. Empty shows "Nothing needs you right now. The agents will keep watching."

**Acceptance:** every summary number matches the seed data. Changing data on another screen updates the dashboard without a reload.

---

## `/ops/shifts` Shift matching

**Purpose:** show how the matching agent ranks workers for an open shift, and let a person send offers.

**Layout:** two columns on desktop. Left: the list of open shifts (hospital, ward, date, role, rate). Right: the ranked worker table for the selected shift.

Ranked table columns: worker, match score (0 to 100), and reasons. Reasons are text chips with a leading tick or cross, for example "✓ Credentials valid", "✓ 11 miles", "✗ Rest period: finishes 02:00 Thursday". A tick and a cross must appear in text, not just colour.

Actions:
- "Send offer" on a single row.
- "Send offers to top 5" in the approval bar. This opens the confirm sheet, which lists the five names and the shift.

Margin note from the matching agent: a one-sentence explanation of the ranking, for example "Ranked by credentials, distance, and rest period. Two workers were skipped for a rest-period conflict."

**Interactions:** sending an offer creates an activity event, marks the offer "Sent (demo)" in the row, and does nothing else. Accepting an offer happens on `/worker`, and the shift then shows "Filled" here.

**States:** if no worker meets the requirements, show "No one matches this shift yet. Widen the distance or check the role." and a button "Widen to 25 miles".

**Acceptance:** scores and reasons are reproducible; the same shift always gives the same ranking.

---

## `/ops/timesheets` Timesheet intake

**Purpose:** show the most valuable AI step: a messy photo turned into structured hours, with each field's confidence visible.

**Layout:** a queue on the left (worker name, shift date, source "WhatsApp photo", status). The selected item fills the main column.

Main column, top to bottom:
1. The photo placeholder: an illustrated paper timesheet drawn in SVG (no stock images). Label it "Photo sent by worker (demo illustration)".
2. Extracted fields: Hours, Ward, Date, Matched shift. Each has the agent's value, a confidence bar, and a status rule. Under 0.85 confidence, the field turns `hold` and reads "Check this".
3. Actions: "Accept extracted", "Edit", and "Reject". Accepting writes the record to staging, not to the ledger.

Margin note: the intake agent's summary, for example "Hours read as 14.0 with 62% confidence. The photo shows a smudged figure."

**Interactions:**
- "Edit" makes the hours field an input and records the human edit in the activity log with the old and new values.
- "Accept extracted" moves the item to "Ready for the pay run" and updates the exceptions queue if the exceptions agent flags it.

**States:** empty queue shows "No timesheets waiting. New photos from workers appear here."

**Acceptance:** the Friday night timesheet (14.0 hours, low confidence) appears here, is flagged, and can be corrected to 12.0 by a person.

---

## `/ops/imports` CSV import with diff

**Purpose:** show how messy client spreadsheets are mapped and checked before they touch the ledger.

**Layout:** four steps shown as a horizontal sequence of text labels, with the current step in bold. Steps: "Choose file", "Match columns", "Review changes", "Import".

1. **Choose file.** A file input plus a "Use the sample file" link that loads `public/samples/ward4-october.csv` (118 rows, with column names that differ from the standard, such as "Staff Name", "Hrs Worked", "Ward/Dept").
2. **Match columns.** A two-column table: the file's column on the left, the Ops Desk field on the right, with a dropdown. The margin note shows the matching agent's guess and confidence for each mapping. Any unmatched column shows "Choose a field".
3. **Review changes.** A diff summary: rows added, rows changed, rows rejected, with reasons. Changed rows show before and after values side by side. Rejected rows explain the problem: "Hours 26.0 is above the 24-hour limit. Check the source row."
4. **Import.** The approval bar shows "Import 109 rows" (118 rows minus 9 rejected), with "Import" and "Back". On import, a toast appears and the activity log gets one event with the row count.

**Acceptance:** the sample file imports with exactly the rejected rows the seed data predicts. Going back to step 2 keeps the column mapping.

---

## `/ops/pay-runs` Pay-run exceptions

**Purpose:** show that people check exceptions before money is released.

**Layout:** a header row for the run: period "1 to 31 October 2026", status "Draft", total gross, total net, and count of lines. Below it, tabs: "Needs review", "Ready", "All". The default tab is "Needs review".

Each exception row shows the worker, the reason (for example "14-hour shift, policy limit is 12", "Timesheet missing", "Bank details changed 2 days ago"), the amount, and three actions: "Accept", "Hold", "Ask worker". The exceptions agent's reason appears in the margin note.

"Ask worker" creates a demo message in `/worker` and logs it. It does not send anything real.

**Release:** the "Release run" button is disabled while any line is on hold. When enabled, pressing it opens the confirm sheet, which lists the line count and total net. Confirming generates a downloadable file named `DEMO-payment-file-october.csv` with a banner row reading "DEMO FILE. NOT FOR BANK SUBMISSION." This screen does not build a real BACS file format.

**Acceptance:** you cannot release a run with a held line. The released run shows "Released (demo)" and each line moves to "Remaining: none".

---

## `/ops/compliance` Compliance monitor

**Purpose:** show expiring credentials, and show the approval step before any reminder is sent.

**Layout:** a ledger table: worker, credential (DBS, mandatory training, professional registration), expiry date, days left, and status rule. Filters: "Expiring in 30 days", "Expired", "All".

Rows with 30 days or fewer left show `hold`. Expired rows show `stop`.

Actions: "Draft reminder" writes a reminder using the compliance agent, which appears in the margin. "Send reminder" opens the confirm sheet, showing the exact text and recipient, and says "Demo: nothing will be sent."

**Acceptance:** the Friday night DBS reminder appears here. Sending it produces an activity event with "Approved by" set to the demo admin name.

---

## `/ops/ledger` Ask the ledger

**Purpose:** let anyone ask "what is paid and what remains?" and get a sourced answer.

**Layout:** a chat column on the left, and a record panel on the right. The record panel lists the ledger records used in the latest answer, as a ruled list. Each record links to its row.

Above the input: three suggested questions as plain text buttons:
- "What is remaining to pay for Ward 4 this month?"
- "Who is paid this week?"
- "Which timesheets are still missing?"

Every answer must end with the record IDs it used, shown as chips. If the question cannot be answered from the ledger, the answer says so and suggests where the information might be. See `AI_AGENTS.md` for the rules.

**States:** while the answer loads, show "Checking the ledger…". If the live model is not configured, the page shows a small notice: "Demo mode: answers come from prepared examples." The three suggested questions still work.

**Acceptance:** every answer includes at least one record chip, and no answer quotes a figure that is not in the seed data.

---

## `/ops/activity` Agent activity log

**Purpose:** the audit trail, and the proof that nothing happens invisibly.

**Layout:** a full-width ledger table. Columns: time, agent, action, status (proposed, approved, rejected, automatic), approver (a demo name or "Agent, no approval needed"), and linked record.

Filters: agent, status, date. Clicking a row expands it to show the input summary and the output summary, both in plain text.

Button: "Export log (demo)" downloads a CSV of the visible rows.

**Acceptance:** every action made anywhere in the demo appears here, in order. Filtering updates the count shown above the table.

---

## `/worker` Worker phone view

**Purpose:** show the worker's side in a WhatsApp-style thread, with the same events as the ops desk.

**Layout:** a single column. A header with the umbrella's name and the worker's first name. A message thread. A message input at the bottom with a camera button and a text field.

Scripted messages, in order, for the Friday night scenario:
1. Agent message with a shift offer card: "Night shift, Ward 4, Saturday 31 October, 20:00 to 08:00. Accept or decline." Buttons: "Accept", "Decline".
2. After "Accept": confirmation card "Booked (demo). See you on Ward 4."
3. A camera button: "Send timesheet photo" uses the SVG illustration and triggers the intake flow.
4. Payslip question: the worker types "Why is my net pay lower this week?" and the assistant answers from the demo ledger (see `AI_AGENTS.md`).
5. "Ask my coordinator" button: logs a request to the ops desk.

Replies and messages are always marked "(demo)" in the footer of the thread.

**Acceptance:** Accept on the offer updates the shift on `/ops/shifts` to "Filled". A photo sent here appears in `/ops/timesheets`.

---

## `/plans` Pricing tiers

**Purpose:** show what each tier includes, so the demo works as a sales tool.

**Layout:** a segmented control with three options: Basic, Standard, Enterprise. Below it, a module list (one row per module) with a status for the selected tier: "Included" or "Not in this plan". Greyed rows still show the module name.

Price shown as "from $800 per month" (or the other tiers). A one-line note under the price: "Prices in USD. Confirm currency before publishing."

**Acceptance:** switching tier updates every row. The Enterprise tier lists every module as included.

---

## Global behaviour

- **Reset demo** restores the seed data and clears all activity events. It asks for confirmation.
- **Play the Friday night scenario** runs the timeline in `DATA_MOCKS.md`. It can be stopped and replayed. During playback, the top bar shows "Scenario: step 4 of 9".
- Every screen shows the demo banner at the top.
- Toasts are short, sentence case, and end with "(demo)" when the action would be real in production.
