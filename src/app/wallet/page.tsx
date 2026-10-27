import Link from "next/link";
import { planPrizePurse } from "@/lib/wallet";
import { formatKrw } from "@/lib/utils";
import { octetConfigured } from "@/lib/octet";

export const dynamic = "force-dynamic";

export default function WalletPage() {
  const plan = planPrizePurse();
  const live = octetConfigured();

  return (
    <main className="min-h-screen bg-[#050a08] px-5 py-10 text-[var(--ink)] sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.16em] text-[var(--muted)] hover:text-[var(--ink)]"
        >
          ← HUNT
        </Link>
        <h1
          className="mt-6 text-4xl font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          HUNT Purse
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          공모전 상금·응모 예산을 위한 월렛 코파일럿 (Hecto HAI · Octet/오하이
          연동 준비). {live ? "Octet 키 감지됨." : "현재 스텁 모드."}
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Stat label="목표" value={formatKrw(plan.goalKrw)} />
          <Stat label="실현" value={formatKrw(plan.realizedKrw)} />
          <Stat label="잔여" value={formatKrw(plan.remainingKrw)} />
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-[var(--mint)]"
            style={{ width: `${plan.progressPct}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-[var(--muted)]">
          진행 {plan.progressPct}% · {plan.note}
        </p>

        <h2
          className="mt-10 text-2xl font-bold"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          이번 사냥 예산 배분
        </h2>
        <ul className="mt-4 space-y-3">
          {plan.allocations.map((a) => (
            <li
              key={a.contestId}
              className="rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3"
            >
              <div className="font-semibold">{a.name}</div>
              <div className="mt-1 text-[var(--signal)]">
                {formatKrw(a.suggestedBudgetKrw)}
              </div>
              <div className="mt-1 text-xs text-[var(--muted)]">{a.reason}</div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-4">
      <div className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
        {label}
      </div>
      <div
        className="mt-2 text-xl font-bold"
        style={{ fontFamily: "var(--font-display), sans-serif" }}
      >
        {value}
      </div>
    </div>
  );
}
