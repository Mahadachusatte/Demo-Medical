import { create } from "zustand";
import { Worker, Client, Shift, Timesheet, PayRun, ComplianceItem, AgentEvent } from "@/data/types";
import { seedWorkers, seedClients, seedShifts, seedTimesheets, seedPayRun, seedCompliance, seedEvents } from "@/data/seed";

interface AppState {
  workers: Worker[];
  clients: Client[];
  shifts: Shift[];
  timesheets: Timesheet[];
  payRun: PayRun | null;
  compliance: ComplianceItem[];
  events: AgentEvent[];
  scenarioPlaying: boolean;
  scenarioStep: number;
  resetDemo: () => void;
  updateTimesheet: (id: string, updates: Partial<Timesheet>) => void;
  updateShift: (id: string, updates: Partial<Shift>) => void;
  updatePayLine: (payRunId: string, lineId: string, updates: any) => void;
  addEvent: (event: Omit<AgentEvent, "id" | "time">) => void;
  updateCompliance: (id: string, updates: Partial<ComplianceItem>) => void;
  setScenarioPlaying: (playing: boolean) => void;
  setScenarioStep: (step: number) => void;
}

export const useStore = create<AppState>((set, get) => ({
  workers: seedWorkers,
  clients: seedClients,
  shifts: seedShifts,
  timesheets: seedTimesheets,
  payRun: seedPayRun,
  compliance: seedCompliance,
  events: seedEvents,
  scenarioPlaying: false,
  scenarioStep: 0,
  resetDemo: () => set({
    workers: seedWorkers,
    clients: seedClients,
    shifts: seedShifts,
    timesheets: seedTimesheets,
    payRun: seedPayRun,
    compliance: seedCompliance,
    events: seedEvents,
    scenarioPlaying: false,
    scenarioStep: 0,
  }),
  updateTimesheet: (id, updates) => set((state) => ({
    timesheets: state.timesheets.map((t) => t.id === id ? { ...t, ...updates } : t)
  })),
  updateShift: (id, updates) => set((state) => ({
    shifts: state.shifts.map((s) => s.id === id ? { ...s, ...updates } : s)
  })),
  updatePayLine: (payRunId, lineId, updates) => set((state) => {
    if (!state.payRun) return state;
    return {
      payRun: {
        ...state.payRun,
        lines: state.payRun.lines.map((l) => l.id === lineId ? { ...l, ...updates } : l)
      }
    };
  }),
  addEvent: (event) => set((state) => {
    const newEvent: AgentEvent = {
      ...event,
      id: `EV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      time: new Date().toISOString(),
    };
    return { events: [...state.events, newEvent] };
  }),
  updateCompliance: (id, updates) => set((state) => ({
    compliance: state.compliance.map((c) => c.id === id ? { ...c, ...updates } : c)
  })),
  setScenarioPlaying: (playing) => set({ scenarioPlaying: playing }),
  setScenarioStep: (step) => set({ scenarioStep: step }),
}));
