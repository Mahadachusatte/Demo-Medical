"use client";

import { useState } from "react";

export default function WorkerPage() {
  const [accepted, setAccepted] = useState(false);
  
  const handleAccept = () => {
    setAccepted(true);
    alert("Shift accepted");
  };
  
  return (
    <div className="min-h-screen bg-paper p-4">
      <div className="max-w-sm mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-page font-bold text-ink">Worker</h1>
          <div className="text-body">Sam Reyes</div>
        </div>
        
        {!accepted ? (
          <div className="border border-rule p-4 mb-4">
            <div className="text-panel font-medium mb-2">Shift offer</div>
            <div className="text-body mb-1">Ward 4 Medicine</div>
            <div className="text-body mb-1">Saturday 31 October 2026</div>
            <div className="text-body mb-3">Night shift 20:00 - 08:00</div>
            <div className="text-meta mb-4">Role: Registered nurse</div>
            <button 
              onClick={handleAccept}
              className="w-full px-4 py-3 bg-ink text-paper text-body hover:opacity-90"
            >
              Accept shift
            </button>
          </div>
        ) : (
          <div className="border border-ready p-4 mb-4 border-l-3">
            <div className="text-panel font-medium mb-2 text-ready">Shift accepted</div>
            <div className="text-body mb-1">Ward 4 Medicine</div>
            <div className="text-body mb-1">Saturday 31 October 2026</div>
            <div className="text-body">Night shift 20:00 - 08:00</div>
          </div>
        )}
        
        <div className="border border-rule p-4 mb-4">
          <div className="text-panel font-medium mb-2">Send timesheet</div>
          <button className="w-full px-4 py-3 border border-ink text-body hover:bg-rule/20">
            Send photo
          </button>
        </div>
        
        <div className="border border-rule p-4">
          <div className="text-panel font-medium mb-2">Ask assistant</div>
          <input 
            type="text" 
            placeholder="Ask about payslip..."
            className="w-full p-2 border border-rule bg-paper text-body mb-2"
          />
          <button className="px-4 py-2 border border-ink text-body text-meta">
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
