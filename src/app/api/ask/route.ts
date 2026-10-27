import { NextResponse } from "next/server";
import { explainContest, runHunt } from "@/lib/hunter";
import { rankContests } from "@/lib/contests";
import { nebiusChat, nebiusConfigured } from "@/lib/nebius";

export const dynamic = "force-dynamic";

type Body = { question?: string };

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const question = (body.question || "").trim();
  if (!question) {
    return NextResponse.json({ error: "empty" }, { status: 400 });
  }

  const brief = runHunt();
  const ranked = rankContests();
  const q = question.toLowerCase();

  const byName = ranked.find((c) =>
    q.includes(c.name.toLowerCase().slice(0, 12).toLowerCase())
  );
  const byId = ranked.find((c) => q.includes(c.id));
  const target = byId || byName || ranked.find((c) => c.hoursLeft > 0);

  if (!target) {
    return NextResponse.json({
      answer: "현재 추적 중인 오픈 공모전이 없습니다.",
      sources: [],
      briefTop: brief.nextMoves.slice(0, 3),
    });
  }

  const detail = explainContest(target.id);
  const wantsWhy = /why|왜|이유|근거|설명/.test(q);
  const wantsNext = /next|다음|지금|오늘|우선|뭐|무엇|which|recommend/.test(q);

  let answer: string;
  if (wantsNext || !wantsWhy) {
    answer = [
      `지금 최우선은 **${target.name}** 입니다.`,
      detail?.explanation,
      `포트폴리오 기대값 합계 약 ${brief.summary.totalEv.toLocaleString("ko-KR")}원, 열린 타깃 ${brief.summary.openCount}건.`,
      brief.nextMoves[0],
    ]
      .filter(Boolean)
      .join(" ");
  } else {
    answer = detail?.explanation || target.why;
  }

  let provider: "local" | "nebius" = "local";
  let model = "local-hunter";
  if (nebiusConfigured()) {
    try {
      const llm = await nebiusChat(
        "You are HUNT, a contest-hunter agent. Use only the provided facts. Reply in Korean, concise, cite sources by name.",
        `Question: ${question}\nFacts:\n${answer}\nSources: ${(detail?.sources || []).join(", ")}\nNext moves:\n${brief.nextMoves.slice(0, 3).join("\n")}`
      );
      if (llm.text) {
        answer = llm.text;
        provider = "nebius";
        model = llm.model;
      }
    } catch {
      // keep deterministic local answer
    }
  }

  return NextResponse.json({
    answer,
    targetId: target.id,
    sources: detail?.sources || target.sources.concat([target.url]),
    nextMoves: brief.nextMoves.slice(0, 3),
    provider,
    model,
  });
}
