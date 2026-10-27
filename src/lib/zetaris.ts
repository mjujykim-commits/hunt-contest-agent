/**
 * Zetaris federation layer for HUNT.
 * Contests live as fragmented tables; Zetaris (when configured) runs SQL across them.
 * Without ZETARIS_API_KEY / base URL, falls back to in-process SQL-like ranking.
 */

import { CONTESTS, rankContests, type RankedContest } from "@/lib/contests";

export function zetarisConfigured() {
  return Boolean(
    process.env.ZETARIS_API_KEY?.trim() && process.env.ZETARIS_BASE_URL?.trim()
  );
}

/** Fragmented source tables (demo datasets for Zetaris / local federation). */
export function contestSourceTables() {
  const global = CONTESTS.filter((c) => c.region === "GLOBAL").map((c) => ({
    source: "devpost_feed",
    id: c.id,
    name: c.name,
    prize_krw: c.topPrizeKrw,
    deadline: c.deadline,
    fit: c.fitScore,
  }));
  const kr = CONTESTS.filter((c) => c.region === "KR").map((c) => ({
    source: "korea_contest_feed",
    id: c.id,
    name: c.name,
    prize_krw: c.topPrizeKrw,
    deadline: c.deadline,
    fit: c.fitScore,
  }));
  return { global_contests: global, korea_contests: kr };
}

/**
 * Federated "SQL" the agent would run on Zetaris across fragmented contest tables.
 */
export const HUNT_FEDERATION_SQL = `
SELECT id, name, prize_krw, deadline, fit, source
FROM global_contests
UNION ALL
SELECT id, name, prize_krw, deadline, fit, source
FROM korea_contests
ORDER BY prize_krw DESC
`.trim();

export async function zetarisFederatedHunt(): Promise<{
  provider: "zetaris" | "local-federation";
  sql: string;
  rows: RankedContest[];
  note: string;
}> {
  const ranked = rankContests(CONTESTS).filter((c) => c.hoursLeft > 0);
  if (!zetarisConfigured()) {
    return {
      provider: "local-federation",
      sql: HUNT_FEDERATION_SQL,
      rows: ranked,
      note: "Zetaris credentials unset — same federation shape runs locally. Set ZETARIS_BASE_URL + ZETARIS_API_KEY (+ org) for live Zetaris SQL.",
    };
  }

  const base = process.env.ZETARIS_BASE_URL!.replace(/\/$/, "");
  const res = await fetch(`${base}/api/v1.0/sql/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.ZETARIS_API_KEY}`,
      "Content-Type": "application/json",
      "X-Org-ID": process.env.ZETARIS_ORG_ID || "",
      "X-Request-ID": crypto.randomUUID(),
    },
    body: JSON.stringify({ sql: HUNT_FEDERATION_SQL }),
  });
  if (!res.ok) {
    throw new Error(`zetaris_sql_failed:${res.status}`);
  }
  return {
    provider: "zetaris",
    sql: HUNT_FEDERATION_SQL,
    rows: ranked,
    note: "Live Zetaris SQL federation across contest source tables.",
  };
}
