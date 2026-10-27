"use client";

import { useStore } from "@/lib/store";
import { useState } from "react";

export default function ShiftsPage() {
  const { shifts, workers } = useStore();
  const [showConfirm, setShowConfirm] = useState(false);
  
  const openShifts = shifts.filter(s => s.status === "open");
  
  const getWorkerMatch = (shift: any) => {
    const candidates = workers.filter(w => w.role === shift.requiredRole).slice(0, 5);
    return candidates.map((w, idx) => ({
      worker: w,
      score: Math.round((90 - idx * 5 + Math.random() * 5) * 10) / 10,
      reasons: ["Role match", idx === 0 ? "Available nearby" : "Available"],
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-page font-bold text-ink">Shift matching</h1>
        <button 
          onClick={() => setShowConfirm(true)}
          className="px-4 py-2 bg-ink text-paper text-body hover:opacity-90"
        >
          Send offers to top 5
        </button>
      </div>
      
      {openShifts.map((shift) => (
        <div key={shift.id} className="mb-6 border border-rule">
          <div className="p-3 bg-rule/10 border-b border-rule">
            <div className="text-body font-medium">{shift.ward} - {shift.requiredRole}</div>
            <div className="text-meta">{new Date(shift.start).toLocaleString('en-GB')} to {new Date(shift.end).toLocaleString('en-GB')}</div>
          </div>
          <div className="p-3">
            <div className="text-meta font-medium mb-2">Ranked candidates</div>
            {getWorkerMatch(shift).map((match, idx) => (
              <div key={match.worker.id} className="flex justify-between items-center py-2 border-b border-rule last:border-b-0">
                <div>
                  <div className="text-body">{match.worker.name} ({match.worker.id})</div>
                  <div className="text-meta">{match.reasons.join(", ")}</div>
                </div>
                <div className="text-body font-medium">{match.score}%</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showConfirm && (
        <div className="fixed inset-0 bg-ink/50 flex items-center justify-center p-4">
          <div className="bg-paper border border-rule max-w-md w-full p-6">
            <div className="text-panel font-medium mb-4">Confirm sending offers</div>
            <div className="text-body mb-4">Send offers to top 5 workers for {openShifts.length} open shift(s)?</div>
            <div className="flex gap-3">
              <button 
                onClick={() => { setShowConfirm(false); alert("Offers sent (demo)"); }}
                className="px-4 py-2 bg-ink text-paper text-body"
              >
                Send offer
              </button>
              <button 
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border border-ink text-body"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
