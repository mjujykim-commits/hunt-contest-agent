# HUNT — Contest Hunter Agent

분산된 공모전·해커톤 공고를 모아 **기대값(상금×추정승률) · 적합도 · 마감 긴급도 · 투입일수**로 순위를 매기고, 왜 그 타깃인지 **근거(소스)와 다음 행동**까지 제시하는 에이전트입니다.

1억 원 수익 목표의 1차 전략: **공모전 사냥꾼**.

## 실행

```bash
npm install
npm run dev -- -p 43127
```

[HUNT](http://127.0.0.1:43127) 에서 타깃 보드를 엽니다.

## API

- `GET /api/hunt` — 전체 헌트 브리핑 (순위·EV·경로)
- `GET /api/hunt/:id` — 단일 타깃 Why 설명
- `POST /api/leads` — 합류/등록 연락처 기록 (`data/leads.jsonl`)

## 현재 우선순위 (자동 산출)

1. **Open Agent Hackathon 2026** — 마감 `2026-10-27 23:45 UTC` (KST 10/28 08:45)
2. **Nebius × NVIDIA** — 대상 $20,000
3. **Codex × TwitchCon** — 1등 $10,000
4. **Hecto HAI** — 총상금 ₩26,000,000
5. **OPEN HARBOR** 등 국내 단기전

## 계정 상태

| 플랫폼 | 상태 | 제출 초안 |
| --- | --- | --- |
| Open Agent (genai.works) | 가입 완료 | `docs/SUBMIT_OPEN_AGENT.md` |
| Nebius (Devpost) | 가입 완료 | `docs/SUBMIT_NEBIUS_DEVPOST.md` |
| Dacon / Hecto HAI (DAKER) | dacon.io 가입 완료 | `docs/SUBMIT_HECTO_HAI.md` |

데모: http://127.0.0.1:43127 · Purse: http://127.0.0.1:43127/wallet  
공개 터널(변동 가능): https://starting-acting-jon-cigarette.trycloudflare.com

추가 키(사용자 발급): `NEBIUS_API_KEY`, `OCTET_API_KEY`, `OHAI_WALLET_ID`

## 매출 증빙

`data/revenue-ledger.json` — 실현 수익이 ₩100,000,000에 도달하면 목표 완료.

## Open Agent 제출 노트

자세한 트랙 매핑·데모 스크립트는 [`SUBMISSION_OPEN_AGENT.md`](./SUBMISSION_OPEN_AGENT.md).
