"use client";

import { useStore } from "@/lib/store";
import { useState } from "react";

export default function TimesheetsPage() {
  const { timesheets, workers, updateTimesheet, addEvent } = useStore();
  const [selectedTimesheet, setSelectedTimesheet] = useState<string | null>("TS-0412");
  
  const waiting = timesheets.filter(t => t.status === "waiting" || t.status === "staged");
  const selected = timesheets.find(t => t.id === selectedTimesheet);
  const worker = selected ? workers.find(w => w.id === selected.workerId) : null;

  const handleAccept = () => {
    if (!selected) return;
    updateTimesheet(selected.id, { status: "ready" });
    addEvent({
      agent: "human",
      action: "Accepted timesheet",
      inputSummary: `${selected.id}`,
      outputSummary: "Timesheet accepted",
      status: "approved",
      approver: "Hannah Clarke",
      recordIds: [selected.id],
    });
    alert("Approved. Logged to activity.");
  };

  const handleEdit = () => {
    if (!selected) return;
    // Edit hours to 12.0 as per scenario
    updateTimesheet(selected.id, { 
      status: "ready",
      fields: {
        ...selected.fields,
        hours: { value: 12.0, confidence: 1.0, checkedByHuman: true }
      }
    });
    addEvent({
      agent: "human",
      action: "Edited timesheet hours",
      inputSummary: `${selected.id} hours: 14.0`,
      outputSummary: "Hours changed to 12.0",
      status: "approved",
      approver: "Hannah Clarke",
      recordIds: [selected.id],
    });
    alert("Approved. Logged to activity.");
  };

  return (
    <div>
      <h1 className="text-page font-bold text-ink mb-6">Timesheet intake</h1>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="text-panel font-medium mb-3">Queue</div>
          <div className="border border-rule">
            {waiting.map((ts) => (
              <button
                key={ts.id}
                onClick={() => setSelectedTimesheet(ts.id)}
                className={`w-full text-left p-3 border-b border-rule last:border-b-0 ${
                  selectedTimesheet === ts.id ? 'bg-rule/20' : ''
                }`}
              >
                <div className="text-body font-medium">{ts.id}</div>
                <div className="text-meta">{workers.find(w => w.id === ts.workerId)?.name}</div>
                <div className="text-meta">{ts.source === 'whatsapp_photo' ? 'Photo' : 'Import'}</div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="col-span-2">
          {selected && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-panel font-medium">{selected.id}</div>
                  <div className="text-body">{worker?.name}</div>
                </div>
                <div className="text-meta">Source: {selected.source}</div>
              </div>
              
              <div className="mb-4 p-4 border border-rule bg-rule/5">
                <svg width="200" height="150" viewBox="0 0 200 150" className="mx-auto">
                  <rect width="200" height="150" fill="none" stroke="#C5D0CB"/>
                  <text x="100" y="30" textAnchor="middle" fontSize="12" fill="#15243A">TIMESHEET</text>
                  <line x1="20" y1="40" x2="180" y2="40" stroke="#C5D0CB"/>
                  <text x="30" y="60" fontSize="10" fill="#15243A">Worker: ___________</text>
                  <text x="30" y="80" fontSize="10" fill="#15243A">Date: ___________</text>
                  <text x="30" y="100" fontSize="10" fill="#15243A">Hours: ____</text>
                  <text x="30" y="120" fontSize="10" fill="#15243A">Ward: ___________</text>
                  <text x="120" y="100" fontSize="12" fill="#A86A12" fontWeight="bold">14.0</text>
                </svg>
              </div>
              
              <div className="space-y-3 mb-6">
                <div>
                  <div className="flex justify-between text-body mb-1">
                    <span>Hours</span>
                    <span>{selected.fields.hours.value}</span>
                  </div>
                  <div className="h-2 bg-rule/30">
                    <div 
                      className="h-2 bg-hold" 
                      style={{ width: `${selected.fields.hours.confidence * 100}%` }}
                    />
                  </div>
                  {selected.fields.hours.confidence < 0.85 && (
                    <div className="text-meta text-hold mt-1">Check this</div>
                  )}
                </div>
                <div>
                  <div className="flex justify-between text-body mb-1">
                    <span>Ward</span>
                    <span>{selected.fields.ward.value}</span>
                  </div>
                  <div className="h-2 bg-rule/30">
                    <div 
                      className="h-2 bg-ready" 
                      style={{ width: `${selected.fields.ward.confidence * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-body mb-1">
                    <span>Date</span>
                    <span>{selected.fields.date.value}</span>
                  </div>
                  <div className="h-2 bg-rule/30">
                    <div 
                      className="h-2 bg-ready" 
                      style={{ width: `${selected.fields.date.confidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={handleAccept}
                  className="px-4 py-2 bg-ink text-paper text-body hover:opacity-90"
                >
                  Accept
                </button>
                <button 
                  onClick={handleEdit}
                  className="px-4 py-2 border border-ink text-body hover:bg-rule/20"
                >
                  Edit
                </button>
                <button className="px-4 py-2 border border-stop text-stop text-body hover:bg-stop/10">
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
