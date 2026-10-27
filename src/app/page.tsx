"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-landing font-bold text-ink mb-4">Ops Desk</h1>
        <p className="text-body text-ink mb-8 max-w-[72ch] mx-auto">
          An operations desk for UK healthcare umbrella companies, where AI agents handle timesheets, CSV imports, pay-run checks, and compliance reminders, and people approve every action that moves money or sends a message.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/ops"
            className="px-6 py-3 bg-ink text-paper text-body font-medium hover:opacity-90"
          >
            Enter Ops Desk
          </Link>
          <Link
            href="/worker"
            className="px-6 py-3 border border-ink text-ink text-body font-medium hover:bg-rule/20"
          >
            Worker View
          </Link>
          <Link
            href="/plans"
            className="px-6 py-3 border border-ink text-ink text-body font-medium hover:bg-rule/20"
          >
            Plans
          </Link>
        </div>
        <div className="mt-8">
          <button
            onClick={() => {
              window.location.href = "/ops?scenario=play";
            }}
            className="px-6 py-3 border-3 border-hold text-ink text-body font-medium"
          >
            Play the Friday night scenario
          </button>
        </div>
      </div>
    </main>
  );
}
export const dynamic = 'force-dynamic';
