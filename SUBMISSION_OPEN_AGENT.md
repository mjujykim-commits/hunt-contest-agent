# Open Agent Hackathon 2026 — HUNT Submission

**Project:** HUNT (Contest Hunter Agent)  
**Tracks:** Track 01 *Solving Fragmented Intelligence* + Track 02 *The Agent That Can Explain Why*  
**Deadline:** 2026-10-27 23:45 UTC  

## Problem

공모전·해커톤 정보는 Linkareer, Thinkyou, Devpost, DAKER, 주최사 사이트에 **파편화**되어 있다. 상금 규모만 보고 들어가면 투입 대비 기대값이 낮고, 마감을 놓친다.

## Solution

HUNT는 여러 소스에서 모은 공고를 하나의 레이더로 합친 뒤:

1. `topPrize × winProb` 기대값
2. AI/에이전트 적합도
3. 마감까지 남은 시간
4. 예상 투입 일수

로 점수를 매겨 **지금 쏠 타깃**을 고른다. 각 추천마다 **왜(Why)** 와 **소스 목록**을 함께 보여 증거 기반 결정을 만든다.

## Demo script (90초)

1. 랜딩: 브랜드 HUNT + 레이더 히어로
2. Live board: Critical 타깃(Open Agent 당일 마감)이 상단
3. 타깃 클릭 → “Why this target”에 근거·소스·원문 링크
4. `GET /api/hunt` JSON으로 동일 브리핑 확인
5. 1억 경로(글로벌 해커톤 / 국내 고액 / 상금 재투자) 제시

## Tech

- Next.js App Router + TypeScript
- Ranking engine: `src/lib/contests.ts`, `src/lib/hunter.ts`
- APIs: `/api/hunt`, `/api/hunt/[id]`

## Sponsor tech note

가능하면 Meterless/Zetaris 연동 레이어를 후속으로 붙인다. 코어 가치(파편 소스 → 설명 가능 순위)는 독립적으로 동작한다.

## What judges should score

- **Impact:** 실제 돈(상금)을 쫓는 사용자 문제
- **Technical:** 투명한 EV 점수·긴급도·API
- **Demo clarity:** 보드에서 왜가 바로 보임
- **Fragmented intelligence:** 다출처 공고 통합
- **Explain why:** 소스 인용형 추천
