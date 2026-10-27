import {
  CONTESTS,
  portfolioSummary,
  rankContests,
  type RankedContest,
} from "@/lib/contests";

export type HuntBrief = {
  goalKrw: number;
  generatedAt: string;
  thesis: string;
  nextMoves: string[];
  ranked: RankedContest[];
  summary: ReturnType<typeof portfolioSummary>;
  evidence: { claim: string; sources: string[] }[];
  pathToGoal: { path: string; dealsOrWinsNeeded: string; note: string }[];
};

/**
 * Contest-hunter agent: ingests fragmented contest feeds, ranks by
 * expected-value density, and explains recommendations with sources.
 */
export function runHunt(goalKrw = 100_000_000): HuntBrief {
  const ranked = rankContests(CONTESTS);
  const summary = portfolioSummary(ranked);
  const top = ranked.filter((c) => c.hoursLeft > 0).slice(0, 5);

  const nextMoves = top.map((c, i) => {
    const hrs =
      c.hoursLeft < 48
        ? `${Math.max(0, Math.round(c.hoursLeft))}시간 남음`
        : `${Math.round(c.hoursLeft / 24)}일 남음`;
    return `${i + 1}. [${c.urgency.toUpperCase()}] ${c.name} — EV 약 ${c.expectedValueKrw.toLocaleString("ko-KR")}원 · ${hrs} · ${c.action}`;
  });

  const evidence = top.map((c) => ({
    claim: `${c.name}을(를) 우선하는 이유: ${c.why} (적합도 ${c.fitScore}, 추정 승률 ${(c.winProb * 100).toFixed(0)}%, 1등 상금 ${c.topPrizeKrw.toLocaleString("ko-KR")}원)`,
    sources: c.sources.concat([c.url]),
  }));

  const pathToGoal = [
    {
      path: "글로벌 해커톤 연속 타격",
      dealsOrWinsNeeded: "Nebius 대상급 1회($20k≈2,800만) + Codex/Open Agent 중상위 복수",
      note: "단기 EV. 등록·제출 병행으로 분산 베팅.",
    },
    {
      path: "국내 고액 챌린지",
      dealsOrWinsNeeded: "Hecto HAI 상위권(총 2,600만 풀) + 조달청·지자체 병행",
      note: "중기 주력. 월렛/콘텐츠 파이프라인 재사용.",
    },
    {
      path: "상금 → 제품화 재투자",
      dealsOrWinsNeeded: "수상작을 SaaS/대행으로 전환해 계약 매출로 잔여 목표 채움",
      note: "공모전만으로 1억은 분산 필요. 상금을 영업 자본으로 전환.",
    },
  ];

  return {
    goalKrw,
    generatedAt: new Date().toISOString(),
    thesis:
      "공모전 사냥꾼은 ‘상금 풀 × 적합도 × 마감 긴급도 ÷ 투입일수’로 타깃을 고른다. 단발 대박보다 병렬 응모와 증거 기반 우선순위가 누적 수익을 만든다.",
    nextMoves,
    ranked,
    summary,
    evidence,
    pathToGoal,
  };
}

export function explainContest(id: string) {
  const ranked = rankContests(CONTESTS);
  const hit = ranked.find((c) => c.id === id);
  if (!hit) return null;
  return {
    contest: hit,
    explanation: [
      `마감까지 ${hit.hoursLeft.toFixed(1)}시간.`,
      `기대값(1등×추정승률) ≈ ${hit.expectedValueKrw.toLocaleString("ko-KR")}원.`,
      `적합도 ${hit.fitScore}/100 · 예상 투입 ${hit.effortDays}일.`,
      hit.why,
      `다음 행동: ${hit.action}`,
    ].join(" "),
    sources: hit.sources.concat([hit.url]),
  };
}
