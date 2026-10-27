"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatKrw } from "@/lib/utils";
import type { HuntBrief } from "@/lib/hunter";

export function HuntBoard() {
  const [brief, setBrief] = useState<HuntBrief | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [detail, setDetail] = useState<{
    explanation: string;
    sources: string[];
  } | null>(null);
  const [pending, startTransition] = useTransition();
  const [leadState, setLeadState] = useState<"idle" | "ok" | "err">("idle");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/hunt", { cache: "no-store" });
        if (!res.ok) throw new Error("hunt_failed");
        const data = (await res.json()) as HuntBrief;
        if (alive) {
          setBrief(data);
          setSelected(data.ranked[0]?.id ?? null);
        }
      } catch {
        if (alive) setError("헌트 브리핑을 불러오지 못했습니다. 잠시 후 다시 시도하세요.");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    let alive = true;
    startTransition(() => {
      (async () => {
        try {
          const res = await fetch(`/api/hunt/${selected}`, { cache: "no-store" });
          if (!res.ok) throw new Error("detail_failed");
          const data = await res.json();
          if (alive) setDetail(data);
        } catch {
          if (alive) setDetail(null);
        }
      })();
    });
    return () => {
      alive = false;
    };
  }, [selected]);

  async function submitLead(formData: FormData) {
    setLeadState("idle");
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        note: formData.get("note"),
        contestId: selected,
      }),
    });
    setLeadState(res.ok ? "ok" : "err");
  }

  if (error) {
    return (
      <div className="rounded-xl border border-[var(--danger)]/40 bg-[var(--danger)]/10 p-5 text-sm">
        {error}
      </div>
    );
  }

  if (!brief) {
    return (
      <div className="animate-pulse space-y-3 py-10">
        <div className="h-4 w-40 rounded bg-white/10" />
        <div className="h-24 rounded-xl bg-white/5" />
        <div className="h-24 rounded-xl bg-white/5" />
      </div>
    );
  }

  const open = brief.ranked.filter((c) => c.hoursLeft > 0);

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="추적 중" value={`${brief.summary.openCount}건`} />
        <Stat
          label="포트폴리오 기대값"
          value={formatKrw(brief.summary.totalEv)}
        />
        <Stat
          label="상금 풀 합계"
          value={formatKrw(brief.summary.totalPool)}
        />
      </div>

      <div>
        <h2
          className="mb-2 text-2xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          지금 쏠 타깃
        </h2>
        <p className="mb-6 max-w-2xl text-sm text-[var(--muted)]">
          {brief.thesis}
        </p>
        <ol className="space-y-2 text-sm text-[var(--ink)]/90">
          {brief.nextMoves.map((m) => (
            <li
              key={m}
              className="border-l-2 border-[var(--signal)]/70 pl-3 leading-relaxed"
            >
              {m}
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-3">
          {open.map((c) => {
            const active = c.id === selected;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelected(c.id)}
                className={`w-full rounded-xl border px-4 py-4 text-left transition ${
                  active
                    ? "border-[var(--signal)] bg-[var(--signal)]/10"
                    : "border-[var(--line)] bg-[var(--panel)] hover:border-white/25"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <UrgencyBadge urgency={c.urgency} />
                  <span className="text-xs text-[var(--muted)]">
                    {c.region} · fit {c.fitScore}
                  </span>
                </div>
                <div
                  className="mt-2 text-lg font-semibold"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {c.name}
                </div>
                <div className="mt-1 text-sm text-[var(--muted)]">
                  1등 {formatKrw(c.topPrizeKrw)} · EV{" "}
                  {formatKrw(c.expectedValueKrw)} ·{" "}
                  {c.hoursLeft < 48
                    ? `${Math.max(0, Math.round(c.hoursLeft))}시간`
                    : `${Math.round(c.hoursLeft / 24)}일`}{" "}
                  남음
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-5">
          <h3
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            Why this target
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/90">
            {pending && !detail
              ? "근거를 모으는 중…"
              : detail?.explanation || "타깃을 선택하세요."}
          </p>
          {detail?.sources?.length ? (
            <ul className="mt-4 space-y-1 text-xs text-[var(--mint)]/90">
              {detail.sources.map((s) => (
                <li key={s} className="truncate">
                  ▸ {s}
                </li>
              ))}
            </ul>
          ) : null}
          {selected ? (
            <a
              href={open.find((c) => c.id === selected)?.url}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex text-sm font-medium text-[var(--signal)] underline-offset-4 hover:underline"
            >
              공고 원문 열기 →
            </a>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3
            className="mb-3 text-xl font-bold"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            1억까지의 경로
          </h3>
          <ul className="space-y-3">
            {brief.pathToGoal.map((p) => (
              <li
                key={p.path}
                className="rounded-xl border border-[var(--line)] bg-black/20 px-4 py-3"
              >
                <div className="font-semibold text-[var(--mint)]">{p.path}</div>
                <div className="mt-1 text-sm">{p.dealsOrWinsNeeded}</div>
                <div className="mt-1 text-xs text-[var(--muted)]">{p.note}</div>
              </li>
            ))}
          </ul>
        </div>

        <form
          className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-5"
          action={async (fd) => {
            await submitLead(fd);
          }}
        >
          <h3
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            같이 사냥하기
          </h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            팀/등록이 필요하면 연락처를 남겨 주세요. 선택 중인 타깃과 함께
            기록됩니다.
          </p>
          <div className="mt-4 space-y-3">
            <Input name="name" placeholder="이름" required />
            <Input name="email" type="email" placeholder="이메일" required />
            <Textarea
              name="note"
              placeholder="가능한 등록 플랫폼 / 팀 역할"
            />
            <Button type="submit" className="w-full">
              합류 요청 보내기
            </Button>
            {leadState === "ok" ? (
              <p className="text-sm text-[var(--mint)]">접수되었습니다.</p>
            ) : null}
            {leadState === "err" ? (
              <p className="text-sm text-[var(--danger)]">
                전송에 실패했습니다. 다시 시도해 주세요.
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-4">
      <div className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
        {label}
      </div>
      <div
        className="mt-2 text-2xl font-bold"
        style={{ fontFamily: "var(--font-display), sans-serif" }}
      >
        {value}
      </div>
    </div>
  );
}

function UrgencyBadge({
  urgency,
}: {
  urgency: "critical" | "high" | "medium" | "low";
}) {
  const map = {
    critical: "bg-[var(--danger)]/20 text-[var(--danger)]",
    high: "bg-[var(--signal)]/20 text-[var(--signal)]",
    medium: "bg-[var(--mint)]/15 text-[var(--mint)]",
    low: "bg-white/10 text-[var(--muted)]",
  } as const;
  return (
    <span
      className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${map[urgency]}`}
    >
      {urgency}
    </span>
  );
}
