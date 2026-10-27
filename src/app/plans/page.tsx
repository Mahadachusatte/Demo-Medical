export default function PlansPage() {
  const tiers = [
    {
      name: "Basic",
      price: "$800",
      modules: ["Worker WhatsApp notifications", "compliance alerts"],
      included: [true, true],
    },
    {
      name: "Standard", 
      price: "$2,000",
      modules: ["Worker WhatsApp notifications", "compliance alerts", "shift matching", "timesheet intake"],
      included: [true, true, true, true],
    },
    {
      name: "Enterprise",
      price: "$5,000",
      modules: ["Worker WhatsApp notifications", "compliance alerts", "shift matching", "timesheet intake", "CSV imports", "pay-run checks", "payment file preparation", "invoicing", "activity audit export"],
      included: [true, true, true, true, true, true, true, true, true],
    },
  ];

  return (
    <div className="min-h-screen bg-paper p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-page font-bold text-ink mb-6">Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier, idx) => (
            <div key={tier.name} className="border border-rule p-4">
              <div className="text-panel font-bold text-ink mb-2">{tier.name}</div>
              <div className="text-section font-bold text-ink mb-4">{tier.price} per month</div>
              <div className="space-y-2">
                {tier.modules.map((mod, midx) => (
                  <div key={mod} className={`text-body ${tier.included[midx] ? 'text-ink' : 'text-ink/40'}`}>
                    {tier.included[midx] ? '•' : '○'} {mod}
                    {!tier.included[midx] && <span className="text-meta"> (Not in this plan)</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
