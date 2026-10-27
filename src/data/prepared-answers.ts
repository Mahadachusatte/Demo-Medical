export const preparedAnswers: Record<string, { answer: string; chips: string[] }> = {
  "what is paid and what remains": {
    answer: "From PR-2401 (1 to 31 October 2026), £41,280 remains to pay across open lines. Released lines show as paid; held lines need approval before release.",
    chips: ["PR-2401"],
  },
  "what is the remaining to pay": {
    answer: "Remaining to pay is £41,280 across the open lines in pay run PR-2401.",
    chips: ["PR-2401"],
  },
  "how many exceptions": {
    answer: "There are exceptions in PR-2401 that need review. One held line relates to hours over the limit; others need approval.",
    chips: ["PR-2401"],
  },
  "who is sam reyes": {
    answer: "Sam Reyes (W-1007) is a locum. They sent a timesheet photo for Thursday 29 October Ward 4 night shift (20:00 to 08:00).",
    chips: ["W-1007", "TS-0412"],
  },
  "priya nair": {
    answer: "Priya Nair (W-1002) has a DBS credential expiring 4 November 2026 (5 days). A reminder is being prepared.",
    chips: ["W-1002"],
  },
  "friday night": {
    answer: "The Friday night scenario tracks Sam Reyes' timesheet (TS-0412) - hours were over limit and required human approval to change from 14.0 to 12.0.",
    chips: ["TS-0412", "PR-2401"],
  },
};

export function getPreparedAnswer(question: string): { answer: string; chips: string[] } | null {
  const q = question.toLowerCase();
  for (const key in preparedAnswers) {
    if (q.includes(key)) {
      return preparedAnswers[key];
    }
  }
  return {
    answer: "That question is not in the demo ledger. I can answer about pay runs, timesheets, workers, shifts, compliance, and the Friday night scenario.",
    chips: [],
  };
}
