"use client";

import { useStore } from "@/lib/store";
import { useState } from "react";

export default function LedgerPage() {
  const { payRun } = useStore();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<any>(null);
  
  const handleAsk = async () => {
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data);
    } catch (e) {
      setAnswer({ answer: "Error getting answer", chips: [] });
    }
  };
  
  const remainingToPay = payRun?.lines.reduce((sum, l) => sum + l.net, 0) || 41280;
  
  return (
    <div>
      <h1 className="text-page font-bold text-ink mb-6">Ledger</h1>
      
      <div className="mb-6 border-l-3 border-agent pl-3 py-2">
        <div className="text-meta text-agent font-medium">ledger agent</div>
        <div className="text-body text-ink">Remaining to pay: £{remainingToPay.toLocaleString()} across open lines</div>
      </div>
      
      <div className="mb-6">
        <div className="text-panel font-medium mb-3">Ask the ledger</div>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What is paid and what remains?"
            className="flex-1 p-2 border border-rule bg-paper text-body"
          />
          <button onClick={handleAsk} className="px-4 py-2 bg-ink text-paper text-body">
            Ask
          </button>
        </div>
        {answer && (
          <div className="border border-rule p-4">
            <div className="text-body mb-2">{answer.answer}</div>
            {answer.chips && answer.chips.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {answer.chips.map((chip: string) => (
                  <span key={chip} className="px-2 py-1 border border-agent text-agent text-meta">
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
