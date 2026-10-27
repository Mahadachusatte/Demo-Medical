"use client";

import { useStore } from "@/lib/store";
import { useState } from "react";

export default function CompliancePage() {
  const { compliance, workers, updateCompliance, addEvent } = useStore();
  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  
  const handleDraft = (id: string) => {
    updateCompliance(id, { reminderState: "drafted" });
  };
  
  const handleSend = (id: string) => {
    updateCompliance(id, { reminderState: "sent_demo" });
    addEvent({
      agent: "human",
      action: "Sent reminder",
      inputSummary: id,
      outputSummary: "Reminder sent (demo)",
      status: "approved",
      approver: "Hannah Clarke",
      recordIds: [id],
    });
    setShowConfirm(null);
    alert("Reminder sent (demo).");
  };

  return (
    <div>
      <h1 className="text-page font-bold text-ink mb-6">Compliance monitor</h1>
      
      <div className="border border-rule">
        <div className="grid grid-cols-5 gap-4 p-3 bg-rule/10 border-b border-rule text-meta font-medium">
          <div>Worker</div>
          <div>Credential</div>
          <div>Expires</div>
          <div>Status</div>
          <div>Action</div>
        </div>
        {compliance.map((item) => {
          const worker = workers.find(w => w.id === item.workerId);
          const daysUntil = Math.ceil((new Date(item.expires).getTime() - new Date("2026-10-30").getTime()) / (1000 * 3600 * 24));
          return (
            <div key={item.id} className="grid grid-cols-5 gap-4 p-3 border-b border-rule last:border-b-0 text-body">
              <div>{worker?.name} ({item.workerId})</div>
              <div>{item.kind}</div>
              <div>{item.expires} ({daysUntil} days)</div>
              <div>
                <span className={`border-l-3 pl-2 ${
                  daysUntil <= 5 ? 'border-stop' :
                  daysUntil <= 14 ? 'border-hold' :
                  'border-ready'
                }`}>
                  {daysUntil <= 5 ? 'expiring soon' : daysUntil <= 14 ? 'due soon' : 'ok'}
                </span>
              </div>
              <div>
                {item.reminderState === "none" && (
                  <button onClick={() => handleDraft(item.id)} className="text-ink hover:underline">Draft reminder</button>
                )}
                {item.reminderState === "drafted" && (
                  <button onClick={() => setShowConfirm(item.id)} className="text-ink hover:underline">Send reminder</button>
                )}
                {item.reminderState === "sent_demo" && (
                  <span className="text-ready">sent (demo)</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-ink/50 flex items-center justify-center p-4">
          <div className="bg-paper border border-rule max-w-md w-full p-6">
            <div className="text-panel font-medium mb-4">Confirm reminder</div>
            <div className="text-body mb-3">Send reminder to:</div>
            <div className="text-body mb-4 p-3 bg-rule/10">
              {workers.find(w => w.id === compliance.find(c => c.id === showConfirm)?.workerId)?.name}
            </div>
            <div className="text-body mb-4">Message: &quot;Your DBS check expires soon. Please renew it.&quot; (demo)</div>
            <div className="flex gap-3">
              <button onClick={() => handleSend(showConfirm)} className="px-4 py-2 bg-ink text-paper text-body">
                Send reminder
              </button>
              <button onClick={() => setShowConfirm(null)} className="px-4 py-2 border border-ink text-body">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
