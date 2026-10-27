# Open Agent Hackathon — 붙여넣기용 제출본

Dashboard: https://hackathon.genai.works/dashboard  
마감: 2026-10-27 23:45 UTC (KST 10/28 08:45)

## Project title
HUNT — Contest Hunter Agent

## Track
Track 01: Solving Fragmented Intelligence  
(가능하면 Track 02 Explain Why도 명시)

## One-liner
Fragments contest feeds into one radar, ranks by expected prize value, and explains every recommendation with sources.

## Description
HUNT is an agent that does real money-seeking work: it ingests fragmented contest/hackathon listings, normalizes prize/deadline/fit, ranks targets by expected value × urgency, and answers “what should I enter and why?” with cited sources.

Users: builders hunting cash prizes and grant-like contests.  
Problem: listings are scattered; people chase headline prize pools and miss EV.  
Solution: multi-source ingest → scoring state machine → explainable next moves → live board + Ask API.

Tech: Next.js, TypeScript, `/api/hunt`, `/api/hunt/[id]`, `/api/ask`.  
Architecture: `docs/ARCHITECTURE.md`.

## Demo URL
https://starting-acting-jon-cigarette.trycloudflare.com  
(backup local during build: http://127.0.0.1:43127)

## Repo URL
(이 Origin/Git 저장소 URL — 공개 저장소로 전환 후 기입)

## Demo script
1. Open demo → HUNT hero  
2. Board: Open Agent marked CRITICAL on top  
3. Click target → Why + sources  
4. Ask: “지금 뭐부터 응모해야 해? 왜?”  
5. Show `/api/hunt` JSON
