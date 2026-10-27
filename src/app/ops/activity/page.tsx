"use client";

import { useStore } from "@/lib/store";

export default function ActivityPage() {
  const { events } = useStore();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-page font-bold text-ink">Activity log</h1>
        <button className="px-4 py-2 border border-ink text-body text-ink hover:bg-rule/20">
          Export
        </button>
      </div>
      
      <div className="border border-rule">
        <div className="grid grid-cols-5 gap-4 p-3 bg-rule/10 border-b border-rule text-meta font-medium">
          <div>Time</div>
          <div>Agent</div>
          <div>Action</div>
          <div>Status</div>
          <div>Approver</div>
        </div>
        {events.slice().reverse().map((event) => (
          <div key={event.id} className="grid grid-cols-5 gap-4 p-3 border-b border-rule last:border-b-0 text-body">
            <div className="text-meta">{new Date(event.time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</div>
            <div>{event.agent}</div>
            <div>{event.action}</div>
            <div>
              <span className={`border-l-3 pl-2 ${
                event.status === 'approved' ? 'border-ready' :
                event.status === 'proposed' ? 'border-hold' :
                event.status === 'rejected' ? 'border-stop' :
                'border-ink'
              }`}>
                {event.status}
              </span>
            </div>
            <div>{event.approver || '-'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
