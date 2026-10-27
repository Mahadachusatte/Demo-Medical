import { AgentEvent } from "@/data/types";

export function appendEvent(
  events: AgentEvent[],
  event: Omit<AgentEvent, "id" | "time">
): AgentEvent[] {
  const newEvent: AgentEvent = {
    ...event,
    id: `EV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    time: new Date().toISOString(),
  };
  return [...events, newEvent];
}

export function validateEventApproval(event: Partial<AgentEvent>): boolean {
  if (event.action && (event.action.toLowerCase().includes("pay") || event.action.toLowerCase().includes("send") || event.action.toLowerCase().includes("release"))) {
    if (!event.approver && event.status !== "automatic") {
      throw new Error("Event with money or message action requires an approver");
    }
  }
  return true;
}
