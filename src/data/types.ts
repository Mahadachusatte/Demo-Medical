export type Role = "Registered nurse" | "Healthcare assistant" | "Locum doctor" | "Paramedic";

export interface Credential {
  kind: "DBS" | "Mandatory training" | "Professional registration";
  expires: string; // ISO date
}

export interface Worker {
  id: string; // "W-1001"
  name: string;
  role: Role;
  homeArea: string;
  milesFromCityCentre: number;
  bankVerified: boolean;
  bankChangedDaysAgo: number | null;
  credentials: Credential[];
  hourlyRate: number;
}

export interface Client {
  id: string; // "C-01"
  name: string;
}

export interface Shift {
  id: string; // "S-2201"
  clientId: string;
  ward: string;
  start: string; // ISO datetime
  end: string;
  requiredRole: Role;
  status: "open" | "offered" | "filled";
  filledBy?: string;
}

export interface ExtractedField<T> {
  value: T;
  confidence: number;
  checkedByHuman: boolean;
}

export interface Timesheet {
  id: string;
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

export interface PayLine {
  id: string;
  workerId: string;
  hours: number;
  gross: number;
  demoDeduction: number;
  net: number;
  exception?: { reason: string; state: "open" | "accepted" | "held" };
}

export interface PayRun {
  id: string;
  period: string;
  status: "draft" | "released";
  lines: PayLine[];
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
  time: string;
  agent: "intake" | "matching" | "ledger" | "exceptions" | "compliance" | "worker_assistant" | "human";
  action: string;
  inputSummary: string;
  outputSummary: string;
  status: "proposed" | "approved" | "rejected" | "automatic";
  approver: string | null;
  recordIds: string[];
}
