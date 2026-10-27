import { readFileSync } from "fs";
import path from "path";
import { CONTESTS, USD_KRW, rankContests } from "@/lib/contests";

export type WalletPlan = {
  goalKrw: number;
  realizedKrw: number;
  remainingKrw: number;
  progressPct: number;
  allocations: {
    contestId: string;
    name: string;
    suggestedBudgetKrw: number;
    reason: string;
  }[];
  note: string;
};

function readLedger() {
  try {
    const raw = readFileSync(
      path.join(process.cwd(), "data", "revenue-ledger.json"),
      "utf8"
    );
    return JSON.parse(raw) as { goalKrw?: number; realizedKrw?: number };
  } catch {
    return { goalKrw: 100_000_000, realizedKrw: 0 };
  }
}

/**
 * Prize-purse planner for Hecto HAI: maps hunt targets into wallet budgets.
 * Octet / Ohai wiring lives behind env keys (see src/lib/octet.ts).
 */
export function planPrizePurse(): WalletPlan {
  const ledger = readLedger();
  const goalKrw = ledger.goalKrw || 100_000_000;
  const realizedKrw = ledger.realizedKrw || 0;
  const remainingKrw = Math.max(goalKrw - realizedKrw, 0);
  const ranked = rankContests(CONTESTS).filter((c) => c.hoursLeft > 0);

  const pool = Math.max(Math.round(remainingKrw * 0.08), 500_000);
  const allocations = ranked.slice(0, 4).map((c, i) => {
    const weight = [0.4, 0.3, 0.2, 0.1][i] || 0.1;
    const suggestedBudgetKrw = Math.round(pool * weight);
    return {
      contestId: c.id,
      name: c.name,
      suggestedBudgetKrw,
      reason: `EV ${c.expectedValueKrw.toLocaleString("ko-KR")}원 · urgency ${c.urgency} · 적합도 ${c.fitScore}`,
    };
  });

  return {
    goalKrw,
    realizedKrw,
    remainingKrw,
    progressPct: Math.min(100, Math.round((realizedKrw / goalKrw) * 100)),
    allocations,
    note: `예산 풀은 잔여 목표의 8%를 사냥 운영비로 가정. USD 환산 기준 ${USD_KRW}원/$ (스냅샷). Octet·오하이 연동 시 실제 이체로 집행.`,
  };
}
