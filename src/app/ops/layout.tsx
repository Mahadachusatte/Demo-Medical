import Link from "next/link";

export default function OpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper">
      <div className="flex">
        <aside className="w-[220px] border-r border-rule min-h-screen p-4">
          <div className="mb-6">
            <div className="text-panel font-bold text-ink">Ops Desk</div>
            <div className="text-meta text-ink/70">Northwind Healthcare Umbrella Ltd (demo)</div>
          </div>
          <nav className="space-y-2">
            <Link href="/ops" className="block text-body text-ink hover:underline">Dashboard</Link>
            <Link href="/ops/activity" className="block text-body text-ink hover:underline">Activity log</Link>
            <Link href="/ops/shifts" className="block text-body text-ink hover:underline">Shift matching</Link>
            <Link href="/ops/timesheets" className="block text-body text-ink hover:underline">Timesheet intake</Link>
            <Link href="/ops/imports" className="block text-body text-ink hover:underline">CSV imports</Link>
            <Link href="/ops/pay-runs" className="block text-body text-ink hover:underline">Pay runs</Link>
            <Link href="/ops/compliance" className="block text-body text-ink hover:underline">Compliance</Link>
            <Link href="/ops/ledger" className="block text-body text-ink hover:underline">Ledger</Link>
            <Link href="/plans" className="block text-body text-ink hover:underline">Plans</Link>
          </nav>
        </aside>
        <main className="flex-1">
          <header className="border-b border-rule p-4">
            <div className="flex justify-between items-center">
              <div className="text-body text-ink">Role: Payroll administrator (demo)</div>
              <button className="text-body text-ink hover:underline">Reset demo</button>
            </div>
          </header>
          <div className="flex">
            <div className="flex-1 p-6 max-w-4xl">
              {children}
            </div>
            <aside className="w-[300px] border-l border-rule p-4 hidden lg:block">
              <div className="text-panel font-medium text-ink mb-4">Margin notes</div>
              <div className="text-meta text-ink/70">Agent notes appear here during scenario playback</div>
            </aside>
          </div>
        </main>
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-hold/10 border-t border-hold p-2 text-center text-meta">
        Open ops screens on a larger screen for the full experience
      </div>
    </div>
  );
}
