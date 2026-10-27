# Data mocks

All data is fictional and lives in `src/data/`. No file here may contain a real person's name, a real NI number, a real bank sort code, or a real company. Generate names from a fixed list in `seed-names.ts` so the output is repeatable.

## Entity shapes

Put these in `src/data/types.ts`.

```ts
export type Role = "Registered nurse" | "Healthcare assistant" | "Locum doctor" | "Paramedic";

export interface Worker {
  id: string;              // "W-1001"
  name: string;            // fictional
  role: Role;
  homeArea: string;        // town name only, e.g. "Milton Keynes"
  milesFromCityCentre: number;
  bankVerified: boolean;
  bankChangedDaysAgo: number | null;
  credentials: Credential[];
  hourlyRate: number;      // GBP, illustrative
}

export interface Credential {
  kind: "DBS" | "Mandatory training" | "Professional registration";
  expires: string;         // ISO date
}

export interface Client {
  id: string;              // "C-01"
  name: string;            // one of the three demo clients
}

export interface Shift {
  id: string;              // "S-2201"
  clientId: string;
  ward: string;            // "Ward 4 Medicine"
  start: string;           // ISO datetime
  end: string;
  requiredRole: Role;
  status: "open" | "offered" | "filled";
  filledBy?: string;       // worker id
}

export interface Timesheet {
  id: string;              // "TS-0412"
  workerId: string;
  shiftId: string;
  source: "whatsapp_photo" | "csv_import" | "portal";
  status: "waiting" | "staged" | "ready" | "rejected";
  fields: {
    hours: ExtractedField<number>;
    ward: ExtractedField<string>;
    date: ExtractedField<string>;
  };
}

export interface ExtractedField<T> {
  value: T;
  confidence: number;      // 0 to 1
  checkedByHuman: boolean;
}

export interface PayRun {
  id: string;              // "PR-2401"
  period: string;          // "1 to 31 October 2026"
  status: "draft" | "released";
  lines: PayLine[];
}

export interface PayLine {
  id: string;              // "PL-88310"
  workerId: string;
  hours: number;
  gross: number;
  demoDeduction: number;   // see rule below
  net: number;
  exception?: { reason: string; state: "open" | "accepted" | "held" };
}

export interface ComplianceItem {
  id: string;
  workerId: string;
  kind: Credential["kind"];
  expires: string;
  reminderState: "none" | "drafted" | "approved" | "sent_demo";
}

export interface AgentEvent {
  id: string;
  time: string;            // ISO datetime
  agent: "intake" | "matching" | "ledger" | "exceptions" | "compliance" | "worker_assistant" | "human";
  action: string;          // short verb phrase, e.g. "Extracted timesheet fields"
  inputSummary: string;
  outputSummary: string;
  status: "proposed" | "approved" | "rejected" | "automatic";
  approver: string | null; // a demo admin name, or null for automatic events
  recordIds: string[];     // e.g. ["TS-0412", "PL-88310"]
}
```

## Seed counts

| Entity | Count | Notes |
|---|---|---|
| Workers | 40 | Mixed roles. About 9 have a credential expiring within 14 days. |
| Clients | 3 | Riverside General (demo), Harbour Park Hospital (demo), Millbrook Community (demo) |
| Wards | 12 | Ward 4 Medicine, ICU, A&E, and others |
| Shifts today | 34 | 28 filled, 6 open |
| Timesheets waiting | 6 | Including the Friday night one |
| Pay run | 1 | PR-2401, October 2026, status draft, 112 lines |
| Activity events | 20 | Pre-seeded so the log is not empty on first load |

## Demo deduction rule

Deductions in the demo are a flat 22% of gross, labelled `demoDeduction`. Show them with the label "Demo deduction, not a tax calculation." Never implement PAYE, National Insurance, or pension rules in the demo. A real rules engine is a separate, reviewed component, outside this pack.

Figures to hit on the dashboard: remaining to pay is £41,280 across the open lines.

## The Friday night scenario

Scenario date: Friday 30 October 2026, evening. Times are shown in the activity log in local time. The scenario is a fixed script in `src/lib/scenario.ts`. Each step has a delay, an event, and a screen change.

| Step | Time | Who | What happens | Screen affected |
|---|---|---|---|---|
| 1 | 18:02 | Worker Sam Reyes (W-1007) | Sends a photo of the timesheet for the Thursday 29 October Ward 4 night shift (20:00 to 08:00) | `/worker`, `/ops/timesheets` |
| 2 | 18:02 | Intake agent | Reads hours as 14.0 (confidence 0.62), ward as "Ward 4 Medicine" (0.97), date as 29 October (0.94). Marks hours as Check this. | `/ops/timesheets` |
| 3 | 18:03 | Exceptions agent | Flags: "Hours 14.0 is over the 12-hour limit. The shift record shows 12.0 scheduled." Adds to the review queue. | `/ops/pay-runs`, dashboard |
| 4 | 18:06 | Human (payroll admin, demo name "Hannah Clarke") | Opens the timesheet, checks the shift record, edits hours to 12.0, and accepts. The edit is logged with the old and new values. | `/ops/timesheets`, `/ops/activity` |
| 5 | 18:07 | Ledger agent | Recalculates Ward 4 remaining to pay. The line for Sam Reyes moves from held to ready. | `/ops/ledger`, `/ops/pay-runs` |
| 6 | 18:08 | Compliance agent | Finds Priya Nair's DBS expires 4 November (5 days). Drafts a reminder. | `/ops/compliance` |
| 7 | 18:09 | Human (Hannah Clarke) | Reviews the reminder text in the confirm sheet and approves it. Shows "Reminder sent (demo)." | `/ops/compliance`, `/ops/activity` |
| 8 | 18:10 | Matching agent | Ranks workers for two open Saturday 31 October Ward 4 night shifts. Human approves offers to the top five. | `/ops/shifts`, `/worker` |
| 9 | 18:12 | Worker Sam Reyes | Accepts the Saturday shift on `/worker`. The shift shows "Filled". | `/worker`, `/ops/shifts`, dashboard |

Playback rules:
- Steps 4, 7, and 8 wait for a human click. The scenario pauses and shows the message "Waiting for you: approve or edit to continue." A "Continue scenario" button is then active.
- Each step can be replayed alone from the activity log.
- "Reset demo" returns every entity to its seed state.

## Sample files

Put these in `public/samples/`:

- `ward4-october.csv`: 118 rows, column headings that differ from the standard ("Staff Name", "Hrs Worked", "Ward/Dept", "Shift Date"). Include 6 rows with hours above 24 and 3 rows with unknown worker IDs, so the diff step has rejections to show.
- `timesheet-sample.svg`: an illustrated paper timesheet with a smudged hours figure. Draw it in SVG, not as a photo.
