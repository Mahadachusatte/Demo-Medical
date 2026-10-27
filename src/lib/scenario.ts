export interface ScenarioStep {
  step: number;
  time: string;
  who: string;
  description: string;
  screen: string;
  needsHuman: boolean;
  action: () => void;
}

export const scenarioSteps = [
  {
    step: 1,
    time: "18:02",
    who: "Worker Sam Reyes (W-1007)",
    description: "Sends a photo of the timesheet for the Thursday 29 October Ward 4 night shift (20:00 to 08:00)",
    screen: "/worker, /ops/timesheets",
    needsHuman: false,
  },
  {
    step: 2,
    time: "18:02",
    who: "Intake agent",
    description: "Reads hours as 14.0 (confidence 0.62), ward as 'Ward 4 Medicine' (0.97), date as 29 October (0.94). Marks hours as Check this.",
    screen: "/ops/timesheets",
    needsHuman: false,
  },
  {
    step: 3,
    time: "18:03",
    who: "Exceptions agent",
    description: "Flags: 'Hours 14.0 is over the 12-hour limit. The shift record shows 12.0 scheduled.' Adds to the review queue.",
    screen: "/ops/pay-runs, dashboard",
    needsHuman: false,
  },
  {
    step: 4,
    time: "18:06",
    who: "Human (payroll admin, demo name \"Hannah Clarke\")",
    description: "Opens the timesheet, checks the shift record, edits hours to 12.0, and accepts. The edit is logged with the old and new values.",
    screen: "/ops/timesheets, /ops/activity",
    needsHuman: true,
  },
  {
    step: 5,
    time: "18:07",
    who: "Ledger agent",
    description: "Recalculates Ward 4 remaining to pay. The line for Sam Reyes moves from held to ready.",
    screen: "/ops/ledger, /ops/pay-runs",
    needsHuman: false,
  },
  {
    step: 6,
    time: "18:08",
    who: "Compliance agent",
    description: "Finds Priya Nair's DBS expires 4 November (5 days). Drafts a reminder.",
    screen: "/ops/compliance",
    needsHuman: false,
  },
  {
    step: 7,
    time: "18:09",
    who: "Human (Hannah Clarke)",
    description: "Reviews the reminder text in the confirm sheet and approves it. Shows 'Reminder sent (demo).'",
    screen: "/ops/compliance, /ops/activity",
    needsHuman: true,
  },
  {
    step: 8,
    time: "18:10",
    who: "Matching agent",
    description: "Ranks workers for two open Saturday 31 October Ward 4 night shifts. Human approves offers to the top five.",
    screen: "/ops/shifts, /worker",
    needsHuman: true,
  },
  {
    step: 9,
    time: "18:12",
    who: "Worker Sam Reyes",
    description: "Accepts the Saturday shift on /worker. The shift shows 'Filled'.",
    screen: "/worker, /ops/shifts, dashboard",
    needsHuman: false,
  },
];
