import { Worker, Client, Shift, Timesheet, PayRun, ComplianceItem, AgentEvent, Role } from "./types";
import { workerFirstNames, workerLastNames } from "./seed-names";

const roles: Role[] = ["Registered nurse", "Healthcare assistant", "Locum doctor", "Paramedic"];
const clients: Client[] = [
  { id: "C-01", name: "Riverside General (demo)" },
  { id: "C-02", name: "Harbour Park Hospital (demo)" },
  { id: "C-03", name: "Millbrook Community (demo)" },
];

const wards = ["Ward 4 Medicine", "ICU", "A&E", "Ward 2 Surgery", "Ward 3 Paediatrics", "Maternity", "Oncology", "Theatre Recovery", "CCU", "Ward 1 Elderly Care", "Day Surgery", "Community Hub"];

export const seedClients = clients;

export function generateSeedWorkers(): Worker[] {
  const workers: Worker[] = [];
  for (let i = 0; i < 40; i++) {
    const firstName = workerFirstNames[i % workerFirstNames.length];
    const lastName = workerLastNames[i % workerLastNames.length];
    const name = `${firstName} ${lastName}`;
    // Make sure Sam Reyes (W-1007) and Priya Nair exist as specified
    let actualName = name;
    if (i === 6) actualName = "Sam Reyes"; // roughly position for W-1007
    if (i === 1) actualName = "Priya Nair";
    
    const credentials = [];
    // Priya Nair has DBS expiring soon
    if (i === 1) {
      credentials.push({
        kind: "DBS" as const,
        expires: "2026-11-04", // 5 days from Oct 30 2026
      });
      credentials.push({
        kind: "Mandatory training" as const,
        expires: "2027-03-15",
      });
    } else if (i % 5 === 0) {
      // Some expiring within 14 days
      const days = (i % 14) + 1;
      const date = new Date("2026-10-30");
      date.setDate(date.getDate() + days);
      credentials.push({
        kind: "DBS" as const,
        expires: date.toISOString().split('T')[0],
      });
    } else {
      credentials.push({
        kind: "DBS" as const,
        expires: "2027-06-20",
      });
      credentials.push({
        kind: "Mandatory training" as const,
        expires: "2027-09-10",
      });
    }
    
    workers.push({
      id: `W-${1001 + i}`,
      name: actualName,
      role: roles[i % roles.length],
      homeArea: ["Milton Keynes", "Northampton", "Bedford", "Oxford", "Cambridge"][i % 5],
      milesFromCityCentre: (i % 20) + 1,
      bankVerified: true,
      bankChangedDaysAgo: null,
      credentials,
      hourlyRate: 18 + (i % 15),
    });
  }
  return workers;
}

export const seedWorkers = generateSeedWorkers();

export function generateSeedShifts(): Shift[] {
  const shifts: Shift[] = [];
  let shiftId = 2201;
  // 34 shifts today, 28 filled, 6 open
  for (let i = 0; i < 28; i++) {
    shifts.push({
      id: `S-${shiftId++}`,
      clientId: clients[i % 3].id,
      ward: wards[i % wards.length],
      start: "2026-10-30T20:00:00Z",
      end: "2026-10-31T08:00:00Z",
      requiredRole: roles[i % roles.length],
      status: "filled",
      filledBy: seedWorkers[i % seedWorkers.length].id,
    });
  }
  // 6 open shifts
  for (let i = 0; i < 6; i++) {
    shifts.push({
      id: `S-${shiftId++}`,
      clientId: clients[i % 3].id,
      ward: i < 2 ? "Ward 4 Medicine" : wards[i % wards.length],
      start: i < 2 ? "2026-10-31T20:00:00Z" : "2026-10-30T08:00:00Z",
      end: i < 2 ? "2026-11-01T08:00:00Z" : "2026-10-30T20:00:00Z",
      requiredRole: roles[i % roles.length],
      status: "open",
    });
  }
  return shifts;
}

export const seedShifts = generateSeedShifts();

export function generateSeedTimesheets(): Timesheet[] {
  return [
    {
      id: "TS-0412",
      workerId: "W-1007", // Sam Reyes
      shiftId: "S-2201",
      source: "whatsapp_photo",
      status: "waiting",
      fields: {
        hours: { value: 14.0, confidence: 0.62, checkedByHuman: false },
        ward: { value: "Ward 4 Medicine", confidence: 0.97, checkedByHuman: false },
        date: { value: "2026-10-29", confidence: 0.94, checkedByHuman: false },
      },
    },
    {
      id: "TS-0413",
      workerId: seedWorkers[2].id,
      shiftId: seedShifts[1].id,
      source: "whatsapp_photo",
      status: "waiting",
      fields: {
        hours: { value: 12.0, confidence: 0.91, checkedByHuman: false },
        ward: { value: "ICU", confidence: 0.88, checkedByHuman: false },
        date: { value: "2026-10-30", confidence: 0.95, checkedByHuman: false },
      },
    },
    {
      id: "TS-0414",
      workerId: seedWorkers[3].id,
      shiftId: seedShifts[2].id,
      source: "csv_import",
      status: "staged",
      fields: {
        hours: { value: 10.5, confidence: 0.89, checkedByHuman: false },
        ward: { value: "A&E", confidence: 0.92, checkedByHuman: false },
        date: { value: "2026-10-30", confidence: 0.93, checkedByHuman: false },
      },
    },
    {
      id: "TS-0415",
      workerId: seedWorkers[4].id,
      shiftId: seedShifts[3].id,
      source: "whatsapp_photo",
      status: "waiting",
      fields: {
        hours: { value: 8.0, confidence: 0.94, checkedByHuman: false },
        ward: { value: "Ward 2 Surgery", confidence: 0.96, checkedByHuman: false },
        date: { value: "2026-10-30", confidence: 0.97, checkedByHuman: false },
      },
    },
    {
      id: "TS-0416",
      workerId: seedWorkers[5].id,
      shiftId: seedShifts[4].id,
      source: "whatsapp_photo",
      status: "waiting",
      fields: {
        hours: { value: 11.5, confidence: 0.90, checkedByHuman: false },
        ward: { value: "Maternity", confidence: 0.91, checkedByHuman: false },
        date: { value: "2026-10-30", confidence: 0.92, checkedByHuman: false },
      },
    },
    {
      id: "TS-0417",
      workerId: seedWorkers[6].id,
      shiftId: seedShifts[5].id,
      source: "whatsapp_photo",
      status: "waiting",
      fields: {
        hours: { value: 12.0, confidence: 0.93, checkedByHuman: false },
        ward: { value: "Oncology", confidence: 0.95, checkedByHuman: false },
        date: { value: "2026-10-30", confidence: 0.96, checkedByHuman: false },
      },
    },
  ];
}

export const seedTimesheets = generateSeedTimesheets();

export function generateSeedPayRun(): PayRun {
  const lines = [];
  // Generate 112 lines
  for (let i = 0; i < 112; i++) {
    const worker = seedWorkers[i % seedWorkers.length];
    const hours = 8 + (i % 8);
    const gross = hours * worker.hourlyRate;
    const demoDeduction = Math.round(gross * 0.22);
    const net = gross - demoDeduction;
    let exception = undefined;
    // Add some exceptions - one held line like for Sam Reyes in scenario
    if (i === 6 || i % 20 === 0) {
      exception = { reason: i === 6 ? "Hours 14.0 is over the 12-hour limit. The shift record shows 12.0 scheduled." : "Missing approval", state: i === 6 ? "held" as const : "open" as const };
    }
    lines.push({
      id: `PL-${88310 + i}`,
      workerId: worker.id,
      hours,
      gross,
      demoDeduction,
      net,
      exception,
    });
  }
  return {
    id: "PR-2401",
    period: "1 to 31 October 2026",
    status: "draft",
    lines,
  };
}

export const seedPayRun = generateSeedPayRun();

export function generateSeedCompliance(): ComplianceItem[] {
  const items: ComplianceItem[] = [];
  seedWorkers.forEach((worker, idx) => {
    worker.credentials.forEach((cred, cidx) => {
      const expiresDate = new Date(cred.expires);
      const today = new Date("2026-10-30");
      const daysUntil = Math.ceil((expiresDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
      if (daysUntil <= 30) {
        items.push({
          id: `CI-${idx}-${cidx}`,
          workerId: worker.id,
          kind: cred.kind,
          expires: cred.expires,
          reminderState: daysUntil <= 5 && worker.id === "W-1002" ? "none" : daysUntil <= 10 ? "none" : "none",
        });
      }
    });
  });
  return items;
}

export const seedCompliance = generateSeedCompliance();

export function generateSeedEvents(): AgentEvent[] {
  return [
    {
      id: "EV-001",
      time: "2026-10-30T09:15:00Z",
      agent: "matching",
      action: "Ranked workers for Ward 4",
      inputSummary: "6 open shifts",
      outputSummary: "Top 5 candidates identified",
      status: "automatic",
      approver: null,
      recordIds: ["S-2210"],
    },
    {
      id: "EV-002",
      time: "2026-10-30T10:22:00Z",
      agent: "intake",
      action: "Processed CSV import",
      inputSummary: "ward4-october.csv",
      outputSummary: "109 rows parsed, 9 rejected",
      status: "automatic",
      approver: null,
      recordIds: [],
    },
    {
      id: "EV-003",
      time: "2026-10-30T11:05:00Z",
      agent: "exceptions",
      action: "Checked pay run",
      inputSummary: "PR-2401",
      outputSummary: "12 exceptions found",
      status: "automatic",
      approver: null,
      recordIds: ["PR-2401"],
    },
    {
      id: "EV-004",
      time: "2026-10-30T12:30:00Z",
      agent: "compliance",
      action: "Scanned credentials",
      inputSummary: "40 workers",
      outputSummary: "9 expiring within 14 days",
      status: "automatic",
      approver: null,
      recordIds: [],
    },
    {
      id: "EV-005",
      time: "2026-10-30T14:18:00Z",
      agent: "ledger",
      action: "Updated remaining to pay",
      inputSummary: "Pay run lines",
      outputSummary: "£41,280 remaining",
      status: "automatic",
      approver: null,
      recordIds: ["PR-2401"],
    },
  ];
}

export const seedEvents = generateSeedEvents();
