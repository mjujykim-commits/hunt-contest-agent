# Nebius × NVIDIA Devpost — 붙여넣기용 제출본

Hackathon: https://nebiusglobalaihackathon.devpost.com/  
마감: 2026-10-30 ~10:00 PDT  
Track: **Best Apps and Agents** (또는 Coding and Agentic Engineering)

## Project name
HUNT — Contest Hunter Agent on Nebius

## Tagline
An agent that hunts cash prizes: fragment contest intel, rank by EV, explain why — powered by NVIDIA Nemotron on Nebius Token Factory.

## About the project (What it does)
HUNT aggregates fragmented contest sources, scores expected value under deadline pressure, and answers natural-language questions about what to enter next — with evidence. For this hackathon, Ask/explain paths call **NVIDIA Nemotron** via **Nebius Token Factory** when `NEBIUS_API_KEY` is set.

## How we built it
- Ranking + Why engine in TypeScript (`src/lib/contests.ts`, `src/lib/hunter.ts`)
- Nebius client (`src/lib/nebius.ts`) → Token Factory chat completions
- Next.js board + Ask UI + APIs
- MIT license at repo root (required)

## Challenges
Keeping deadline-critical hunts above larger-but-later prize pools; making Why answers cite real sources instead of vibes.

## Accomplishments
Working demo board, explainable ranking, Nebius/Nemotron hook, dual-track contest strategy toward ₩100M goal.

## What we learned
Prize hunting is an agentic ops problem: fragmented intel + time decay + fit beats raw prize size.

## What's next
Live ingest scrapers, more FX-aware EV, Token Factory for multi-step hunt plans, Tavily for fresh listing discovery (Best Use of Tavily eligible).

## Built with
Next.js, TypeScript, Nebius Token Factory, NVIDIA Nemotron, Tailwind

## Try it / Demo link
https://starting-acting-jon-cigarette.trycloudflare.com

## Demo video
(3분 이하 YouTube — 녹화 후 링크 기입)

## GitHub repo
공개 저장소 URL + LICENSE visible at top

## Feedback (Nebius / NVIDIA)
Token Factory OpenAI-compatible chat API made wiring Nemotron straightforward. Wish list: longer free credits for overnight agent evals; clearer model ID catalog in one page.

## Pre-existing work note
Core hunter concept started during this build sprint for contest strategy; Nebius/Nemotron path added for this hackathon submission period.
