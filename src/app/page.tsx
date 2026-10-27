import { RadarHero } from "@/components/radar-hero";
import { HuntBoard } from "@/components/hunt-board";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <section className="relative isolate min-h-[100svh]">
        <RadarHero />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col px-5 pb-16 pt-8 sm:px-8">
          <header className="flex items-center justify-between">
            <div
              className="text-2xl font-extrabold tracking-[0.18em] text-[var(--ink)] sm:text-3xl"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              HUNT
            </div>
            <a
              href="#board"
              className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)] hover:text-[var(--ink)]"
            >
              Live board
            </a>
          </header>

          <div className="mt-auto max-w-3xl pb-10 pt-24 sm:pt-32">
            <p className="animate-rise text-sm font-medium uppercase tracking-[0.22em] text-[var(--mint)]">
              Contest Hunter Agent
            </p>
            <h1
              className="animate-rise-delay mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              흩어진 상금을
              <br />
              한 번에 조준한다.
            </h1>
            <p className="animate-rise-delay-2 mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              여러 공모전 소스를 모아 기대값·적합도·마감으로 순위를 매기고,
              왜 그 타깃인지 근거까지 제시하는 공모전 사냥꾼 에이전트.
            </p>
            <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#board">타깃 보드 열기</a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a
                  href="https://hackathon.genai.works/event/open-agent-hackathon-2026"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Agent 공고
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="board"
        className="relative border-t border-[var(--line)] bg-[#070f0c] px-5 py-16 sm:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <HuntBoard />
        </div>
      </section>

      <footer className="border-t border-[var(--line)] px-5 py-8 text-center text-xs text-[var(--muted)] sm:px-8">
        HUNT · 공모전 사냥꾼 · 목표 실현 수익 ₩100,000,000
      </footer>
    </main>
  );
}
