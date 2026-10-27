"use client";

import { useState } from "react";
import Papa from "papaparse";

export default function ImportsPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [mapping, setMapping] = useState({ name: "", hours: "", ward: "", date: "" });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
        // Auto-map common variations
        const headers = Object.keys(results.data[0] || {});
        setMapping({
          name: headers.find(h => h.toLowerCase().includes('name') || h.toLowerCase().includes('staff')) || "",
          hours: headers.find(h => h.toLowerCase().includes('hour') || h.toLowerCase().includes('hrs')) || "",
          ward: headers.find(h => h.toLowerCase().includes('ward') || h.toLowerCase().includes('dept')) || "",
          date: headers.find(h => h.toLowerCase().includes('date')) || "",
        });
        setStep(2);
      }
    });
  };

  const loadSample = () => {
    // Simulate loading the sample
    setData(Array(118).fill(0).map((_, i) => ({
      "Staff Name": `Worker ${i}`,
      "Hrs Worked": i < 109 ? 8 + (i % 4) : i < 112 ? 30 : 5,
      "Ward/Dept": "Ward 4 Medicine",
      "Shift Date": "2026-10-30"
    })));
    setMapping({ name: "Staff Name", hours: "Hrs Worked", ward: "Ward/Dept", date: "Shift Date" });
    setStep(2);
  };

  return (
    <div>
      <h1 className="text-page font-bold text-ink mb-6">CSV imports</h1>
      
      <div className="mb-6 flex gap-4">
        {[1,2,3,4].map((s) => (
          <div key={s} className={`flex-1 text-center py-2 ${step >= s ? 'bg-ink text-paper' : 'border border-rule text-ink'}`}>
            Step {s}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="border border-rule p-6">
          <div className="text-panel font-medium mb-4">Upload CSV</div>
          <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-4" />
          <div className="text-body mb-2">Or load sample:</div>
          <button onClick={loadSample} className="px-4 py-2 border border-ink text-body hover:bg-rule/20">
            Load public/samples/ward4-october.csv
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="border border-rule p-6">
          <div className="text-panel font-medium mb-4">Column mapping</div>
          <div className="space-y-3">
            {Object.entries(mapping).map(([key, value]) => (
              <div key={key} className="flex items-center gap-4">
                <div className="w-24 text-body capitalize">{key}</div>
                <select 
                  value={value} 
                  onChange={(e) => setMapping({...mapping, [key]: e.target.value})}
                  className="flex-1 p-2 border border-rule bg-paper"
                >
                  <option value="">Select column</option>
                  {Object.keys(data[0] || {}).map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <button onClick={() => setStep(3)} className="mt-4 px-4 py-2 bg-ink text-paper text-body">
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="border border-rule p-6">
          <div className="text-panel font-medium mb-4">Diff preview</div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="border-l-3 border-ready pl-3">
              <div className="text-meta">Added</div>
              <div className="text-section">109</div>
            </div>
            <div className="border-l-3 border-hold pl-3">
              <div className="text-meta">Changed</div>
              <div className="text-section">0</div>
            </div>
            <div className="border-l-3 border-stop pl-3">
              <div className="text-meta">Rejected</div>
              <div className="text-section">9</div>
            </div>
          </div>
          <div className="text-body mb-2">Rejections:</div>
          <ul className="text-meta space-y-1 mb-4">
            <li>Row with hours &gt; 24: Hours exceed reasonable limit</li>
            <li>Row with hours &gt; 24: Hours exceed reasonable limit</li>
            <li>Row with hours &gt; 24: Hours exceed reasonable limit</li>
            <li>Row with hours &gt; 24: Hours exceed reasonable limit</li>
            <li>Row with hours &gt; 24: Hours exceed reasonable limit</li>
            <li>Row with hours &gt; 24: Hours exceed reasonable limit</li>
            <li>Unknown worker ID</li>
            <li>Unknown worker ID</li>
            <li>Unknown worker ID</li>
          </ul>
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="px-4 py-2 border border-ink text-body">Back</button>
            <button onClick={() => setStep(4)} className="px-4 py-2 bg-ink text-paper text-body">Import 118 rows</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="border border-rule p-6">
          <div className="text-panel font-medium mb-4">Import complete</div>
          <div className="text-body mb-4">Imported 109 rows successfully.</div>
          <button onClick={() => { setStep(1); setData([]); }} className="px-4 py-2 border border-ink text-body">
            Import another file
          </button>
        </div>
      )}
    </div>
  );
}
