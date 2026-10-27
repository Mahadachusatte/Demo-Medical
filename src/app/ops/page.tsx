"use client";

import { useStore } from "@/lib/store";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function OpsDashboard() {
  const { workers, shifts, timesheets, payRun, events } = useStore();
  
  const openShifts = shifts.filter(s => s.status === "open").length;
  const filledShifts = shifts.filter(s => s.status === "filled").length;
  const fillRate = Math.round((filledShifts / shifts.length) * 100);
  const waitingTimesheets = timesheets.filter(t => t.status === "waiting").length;
  const heldLines = payRun?.lines.filter(l => l.exception?.state === "held").length || 0;
  const remainingToPay = payRun?.lines.reduce((sum, l) => sum + l.net, 0) || 0;
  
  const data = [
    { name: "Mon", rate: 82 },
    { name: "Tue", rate: 85 },
    { name: "Wed", rate: 83 },
    { name: "Thu", rate: 88 },
    { name: "Fri", rate: fillRate },
  ];

  return (
    <div>
      <h1 className="text-page font-bold text-ink mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border-l-3 border-ready pl-3">
          <div className="text-meta text-ink/70">Fill rate</div>
          <div className="text-section font-bold text-ink">{fillRate}%</div>
        </div>
        <div className="border-l-3 border-hold pl-3">
          <div className="text-meta text-ink/70">Open shifts</div>
          <div className="text-section font-bold text-ink">{openShifts}</div>
        </div>
        <div className="border-l-3 border-ink pl-3">
          <div className="text-meta text-ink/70">Timesheets waiting</div>
          <div className="text-section font-bold text-ink">{waitingTimesheets}</div>
        </div>
        <div className="border-l-3 border-stop pl-3">
          <div className="text-meta text-ink/70">Held pay lines</div>
          <div className="text-section font-bold text-ink">{heldLines}</div>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-panel font-medium text-ink mb-2">Fill rate trend</div>
        <div className="h-48 border border-rule p-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Line type="monotone" dataKey="rate" stroke="#15243A" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-panel font-medium text-ink mb-2">Needs you today</div>
        <div className="border border-rule">
          {waitingTimesheets > 0 && (
            <div className="p-3 border-b border-rule border-l-3 border-hold">
              <div className="text-body text-ink">Review timesheets - {waitingTimesheets} waiting</div>
            </div>
          )}
          {heldLines > 0 && (
            <div className="p-3 border-b border-rule border-l-3 border-hold">
              <div className="text-body text-ink">Pay run exceptions - {heldLines} held</div>
            </div>
          )}
          {openShifts > 0 && (
            <div className="p-3 border-l-3 border-hold">
              <div className="text-body text-ink">Fill {openShifts} open shifts</div>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="text-panel font-medium text-ink mb-2">Latest margin note</div>
        <div className="border-l-3 border-agent pl-3 py-2">
          <div className="text-meta text-agent font-medium">ledger agent</div>
          <div className="text-body text-ink">Remaining to pay: £{remainingToPay.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
