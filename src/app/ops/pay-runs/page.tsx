"use client";

import { useStore } from "@/lib/store";
import { useState } from "react";

export default function PayRunsPage() {
  const { payRun, updatePayLine, addEvent } = useStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const [tab, setTab] = useState("all");
  
  if (!payRun) return <div>No pay run</div>;
  
  const heldLines = payRun.lines.filter(l => l.exception?.state === "held");
  const canRelease = heldLines.length === 0;
  
  const handleRelease = () => {
    addEvent({
      agent: "human",
      action: "Released pay run",
      inputSummary: payRun.id,
      outputSummary: "Pay run released",
      status: "approved",
      approver: "Hannah Clarke",
      recordIds: [payRun.id],
    });
    // Download CSV
    const csv = "DEMO FILE. NOT FOR BANK SUBMISSION.\nPayRun,Worker,Hours,Gross,DemoDeduction,Net\n";
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DEMO-payment-file-october.csv';
    a.click();
    setShowConfirm(false);
    alert("Approved. Logged to activity.");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-page font-bold text-ink">{payRun.id}</h1>
          <div className="text-body">{payRun.period} - {payRun.status}</div>
        </div>
        <button 
          onClick={() => setShowConfirm(true)}
          disabled={!canRelease}
          className={`px-4 py-2 text-body ${
            canRelease 
              ? 'bg-ink text-paper hover:opacity-90' 
              : 'bg-rule text-ink/50 cursor-not-allowed'
          }`}
        >
          Release run
        </button>
      </div>
      
      <div className="mb-4 flex gap-4 border-b border-rule">
        {["all", "exceptions"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 px-1 text-body capitalize ${tab === t ? 'border-b-2 border-ink' : ''}`}
          >
            {t}
          </button>
        ))}
      </div>
      
      <div className="border border-rule">
        <div className="grid grid-cols-6 gap-4 p-3 bg-rule/10 border-b border-rule text-meta font-medium">
          <div>Line</div>
          <div>Worker</div>
          <div className="text-right">Hours</div>
          <div className="text-right">Gross</div>
          <div className="text-right">Net</div>
          <div>Status</div>
        </div>
        {payRun.lines.filter(l => tab === "all" || l.exception).slice(0, 20).map((line) => (
          <div key={line.id} className={`grid grid-cols-6 gap-4 p-3 border-b border-rule last:border-b-0 text-body ${
            line.exception?.state === 'held' ? 'border-l-3 border-hold' : 
            line.exception ? 'border-l-3 border-hold' : ''
          }`}>
            <div className="text-meta">{line.id}</div>
            <div>{line.workerId}</div>
            <div className="text-right">{line.hours}</div>
            <div className="text-right">£{line.gross}</div>
            <div className="text-right">£{line.net}</div>
            <div className="text-meta">
              {line.exception ? line.exception.state : 'ok'}
              {line.exception?.state === 'held' && (
                <button className="ml-2 text-ink hover:underline">Review</button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {heldLines.length > 0 && (
        <div className="mt-4 p-3 border border-hold bg-hold/5 text-body">
          {heldLines.length} line(s) held - release button disabled until resolved
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-ink/50 flex items-center justify-center p-4">
          <div className="bg-paper border border-rule max-w-md w-full p-6">
            <div className="text-panel font-medium mb-4">Confirm release</div>
            <div className="text-body mb-4">Release pay run {payRun.id}? This will download DEMO-payment-file-october.csv (demo file, not for bank submission).</div>
            <div className="flex gap-3">
              <button onClick={handleRelease} className="px-4 py-2 bg-ink text-paper text-body">
                Release run
              </button>
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 border border-ink text-body">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
