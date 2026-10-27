export type ContestStatus = "open" | "closing_soon" | "submitted" | "won" | "lost";

export type Contest = {
  id: string;
  name: string;
  organizer: string;
  url: string;
  deadline: string; // ISO date (UTC)
  prizePoolKrw: number;
  topPrizeKrw: number;
  region: "KR" | "GLOBAL";
  track: string;
  fitScore: number; // 0-100 how well an AI coding agent can compete
  effortDays: number;
  winProb: number; // estimated 0-1
  status: ContestStatus;
  why: string;
  sources: string[];
  action: string;
};

/** FX snapshot for EV math — update when rates move hard */
export const USD_KRW = 1400;

export const CONTESTS: Contest[] = [
  {
    id: "open-agent-2026",
    name: "Open Agent Hackathon 2026",
    organizer: "GenAI Works",
    url: "https://hackathon.genai.works/event/open-agent-hackathon-2026",
    deadline: "2026-10-27T23:45:00.000Z",
    prizePoolKrw: 20_000 * USD_KRW,
    topPrizeKrw: 1_600 * USD_KRW,
    region: "GLOBAL",
    track: "Track 01 · Fragmented Intelligence / Track 02 · Explain Why",
    fitScore: 96,
    effortDays: 1,
    winProb: 0.08,
    status: "closing_soon",
    why: "오늘 마감. 에이전트가 실제 업무를 하는 트랙이며 HUNT 자체가 Track 01+02에 정면으로 맞음.",
    sources: ["genai.works", "discord announcements"],
    action: "HUNT 데모 제출 + 등록(사용자 계정)",
  },
  {
    id: "nebius-nvidia-2026",
    name: "Nebius × NVIDIA Global AI Hackathon",
    organizer: "Nebius / NVIDIA",
    url: "https://nebiusglobalaihackathon.devpost.com/",
    deadline: "2026-10-30T17:00:00.000Z",
    prizePoolKrw: 50_000 * USD_KRW,
    topPrizeKrw: 20_000 * USD_KRW,
    region: "GLOBAL",
    track: "Apps & Agents / Agentic Engineering",
    fitScore: 90,
    effortDays: 3,
    winProb: 0.04,
    status: "open",
    why: "대상 $20k. 오픈 인프라 위 실동작 AI 시스템 요구 — HUNT 코어를 Nebius 모델로 이식 가능.",
    sources: ["devpost"],
    action: "Devpost 등록 후 GPU 에이전트 빌드",
  },
  {
    id: "codex-twitchcon-2026",
    name: "Codex × TwitchCon Hackathon",
    organizer: "Twitch / OpenAI",
    url: "https://devgrantsdaily.com/items/2026-10-25-codex-x-twitchcon-hackathon/",
    deadline: "2026-11-02T22:00:00.000Z",
    prizePoolKrw: 25_000 * USD_KRW,
    topPrizeKrw: 10_000 * USD_KRW,
    region: "GLOBAL",
    track: "Streamer tools via Twitch API",
    fitScore: 78,
    effortDays: 4,
    winProb: 0.05,
    status: "open",
    why: "1등 $10k. Twitch API + Codex 세션 ID 필수. 신규 프로젝트만 허용.",
    sources: ["devpost", "devgrantsdaily"],
    action: "스트리머용 헌트형 챗 도구 신규 빌드",
  },
  {
    id: "hecto-hai-2026",
    name: "HAI · Hecto AI × Wallet Service Challenge",
    organizer: "Hecto / DAKER",
    url: "https://daker.ai/public/hackathons/2026-hai-hecto-ai-challenge",
    deadline: "2026-12-21T01:00:00.000Z",
    prizePoolKrw: 26_000_000,
    topPrizeKrw: 10_000_000,
    region: "KR",
    track: "Octet API + Ohai Wallet AI web service",
    fitScore: 88,
    effortDays: 14,
    winProb: 0.12,
    status: "open",
    why: "국내 총상금 2,600만. 월렛+AI 웹서비스 — 중기 주력 타깃.",
    sources: ["daker.ai", "linkareer", "thinkyou"],
    action: "DAKER 참가·HUNT Purse(/wallet)·Octet/오하이 키 연동",
  },
  {
    id: "open-harbor-2026",
    name: "OPEN HARBOR 2026 글로벌 창업 AI 해커톤",
    organizer: "글로컬대학30",
    url: "https://wecanscaleup.com",
    deadline: "2026-10-28T14:59:00.000Z",
    prizePoolKrw: 3_200_000,
    topPrizeKrw: 1_000_000,
    region: "KR",
    track: "비즈니스톤 / 아이디어톤",
    fitScore: 70,
    effortDays: 2,
    winProb: 0.15,
    status: "open",
    why: "마감 임박·상금은 작지만 사업계획서 1종으로 빠른 응모 가능.",
    sources: ["linkareer", "wecanscaleup"],
    action: "사업계획서 PDF 제출",
  },
  {
    id: "meta-global-ai-2026",
    name: "Meta Global AI Developer Hackathon",
    organizer: "Meta",
    url: "https://dev.meta.ai/events/global-hackathon",
    deadline: "2026-11-05T02:00:00.000Z",
    prizePoolKrw: 1_000_000 * USD_KRW,
    topPrizeKrw: 100_000 * USD_KRW,
    region: "GLOBAL",
    track: "Indie / Startup · Muse models",
    fitScore: 85,
    effortDays: 8,
    winProb: 0.01,
    status: "open",
    why: "총상금 $1M. 지원 선발제(최대 2만명). 선발되면 EV 폭증.",
    sources: ["dev.meta.ai"],
    action: "선발 여부 확인·제출 준비",
  },
  {
    id: "seoul-ai-youth-2026",
    name: "2026 서울 AI 디지털 배움터 청년 해커톤",
    organizer: "서울시 / 구름",
    url: "https://forms.gle/HNx9CiyYZS3sXuwj9",
    deadline: "2026-11-08T14:59:00.000Z",
    prizePoolKrw: 3_000_000,
    topPrizeKrw: 1_000_000,
    region: "KR",
    track: "서울 사회문제 AI 서비스 (6시간)",
    fitScore: 65,
    effortDays: 1,
    winProb: 0.1,
    status: "open",
    why: "상금 소액·팀(5~6인)·오프라인. 보조 타깃.",
    sources: ["linkareer", "notion"],
    action: "팀 구성 후 신청서",
  },
  {
    id: "pps-ai-content-2026",
    name: "조달청 AI 게임·콘텐츠 공모전",
    organizer: "조달청",
    url: "https://thinkyou.co.kr/info_room/6823/",
    deadline: "2026-11-22T14:59:00.000Z",
    prizePoolKrw: 5_500_000,
    topPrizeKrw: 2_000_000,
    region: "KR",
    track: "AI 게임 / 시나리오 / 영상",
    fitScore: 55,
    effortDays: 7,
    winProb: 0.08,
    status: "open",
    why: "콘텐츠 중심. 영상·시나리오 파이프라인으로 병행 가능.",
    sources: ["thinkyou"],
    action: "시나리오+짧은 영상 제작",
  },
  {
    id: "ai-life-solution-2026",
    name: "AI 라이프 솔루션 챌린지",
    organizer: "산업통상부 / KEIT",
    url: "https://www.motir.go.kr/kor/article/ATCL3518f7523/213669/view",
    deadline: "2026-10-31T15:00:00.000Z",
    prizePoolKrw: 13_000_000,
    topPrizeKrw: 3_000_000,
    region: "KR",
    track: "생활밀착 AI 시제품 · 이메일 접수",
    fitScore: 92,
    effortDays: 4,
    winProb: 0.1,
    status: "open",
    why: "총 1,300만·장관상 300만. HUNT가 사회문제(정보 파편화·기회 접근) AI 솔루션으로 정면 부합. 메일 접수라 에이전트가 발송 가능.",
    sources: ["motir.go.kr", "univ20", "keit.re.kr"],
    action: "성과보고서+데모URL을 relations2@keit.re.kr로 제출",
  },
  {
    id: "elice-ai-challenge-2026",
    name: "과기부 × 엘리스 AI 챌린지",
    organizer: "과기정통부 / 엘리스",
    url: "https://eli.so/apply_form",
    deadline: "2026-11-13T14:59:00.000Z",
    prizePoolKrw: 1_000_000,
    topPrizeKrw: 1_000_000,
    region: "KR",
    track: "일상 문제 AI PoC",
    fitScore: 80,
    effortDays: 5,
    winProb: 0.08,
    status: "open",
    why: "접수 폼 온라인. HUNT PoC 재사용. 상금은 작지만 파이프라인 확장용.",
    sources: ["eli.so", "linkareer"],
    action: "eli.so 신청 폼 에이전트 작성·제출",
  },
];

export type RankedContest = Contest & {
  expectedValueKrw: number;
  hoursLeft: number;
  urgency: "critical" | "high" | "medium" | "low";
  score: number;
};

export function rankContests(
  contests: Contest[] = CONTESTS,
  now = new Date()
): RankedContest[] {
  return contests
    .map((c) => {
      const deadline = new Date(c.deadline).getTime();
      const hoursLeft = (deadline - now.getTime()) / 3_600_000;
      const expectedValueKrw = Math.round(c.topPrizeKrw * c.winProb);
      const urgency: RankedContest["urgency"] =
        hoursLeft < 24
          ? "critical"
          : hoursLeft < 72
            ? "high"
            : hoursLeft < 24 * 14
              ? "medium"
              : "low";
      // Score: EV density (EV per effort day) × fit × urgency boost
      const density = expectedValueKrw / Math.max(c.effortDays, 0.5);
      // Critical deadlines dominate: a contest dying in <24h beats larger EV farther out.
      const urgencyBoost =
        urgency === "critical" ? 6 : urgency === "high" ? 2 : 1;
      const openBoost = c.status === "won" || c.status === "lost" ? 0 : 1;
      const score =
        density * (c.fitScore / 100) * urgencyBoost * openBoost *
        (hoursLeft < 0 ? 0 : 1);
      return { ...c, expectedValueKrw, hoursLeft, urgency, score };
    })
    .sort((a, b) => {
      const rank = { critical: 0, high: 1, medium: 2, low: 3 } as const;
      if (a.hoursLeft <= 0 && b.hoursLeft > 0) return 1;
      if (b.hoursLeft <= 0 && a.hoursLeft > 0) return -1;
      if (rank[a.urgency] !== rank[b.urgency]) {
        return rank[a.urgency] - rank[b.urgency];
      }
      return b.score - a.score;
    });
}

export function portfolioSummary(ranked: RankedContest[]) {
  const open = ranked.filter((c) => c.hoursLeft > 0 && c.status !== "lost");
  const totalEv = open.reduce((s, c) => s + c.expectedValueKrw, 0);
  const totalPool = open.reduce((s, c) => s + c.prizePoolKrw, 0);
  const critical = open.filter((c) => c.urgency === "critical");
  return { openCount: open.length, totalEv, totalPool, critical };
}
