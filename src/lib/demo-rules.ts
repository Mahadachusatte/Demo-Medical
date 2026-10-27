export const DEMO_DEDUCTION_RATE = 0.22;

export function calculateDemoDeduction(gross: number): number {
  return Math.round(gross * DEMO_DEDUCTION_RATE);
}

export function isHoursOverLimit(hours: number): boolean {
  return hours > 12;
}

export function getExceptionReason(hours: number, scheduledHours?: number): string | undefined {
  if (hours > 12) {
    return `Hours ${hours.toFixed(1)} is over the 12-hour limit. The shift record shows ${scheduledHours?.toFixed(1) || "12.0"} scheduled.`;
  }
  return undefined;
}
