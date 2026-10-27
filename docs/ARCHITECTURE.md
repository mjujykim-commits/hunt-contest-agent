# HUNT Architecture

```
┌──────────────┐    ┌─────────────────┐    ┌──────────────────┐
│ Contest      │───▶│ Normalizer      │───▶│ Ranking Engine   │
│ Sources      │    │ (fields+FX)     │    │ EV×fit×urgency   │
│ (fragmented) │    └─────────────────┘    └────────┬─────────┘
└──────────────┘                                   │
       ▲                                           ▼
       │                                  ┌──────────────────┐
       │                                  │ Explain / Why    │
       │                                  │ + source cites   │
       │                                  └────────┬─────────┘
       │                                           ▼
       │                                  ┌──────────────────┐
       └──── feedback / re-hunt ──────────│ Board + Ask API  │
                                          └──────────────────┘
```

## State machine

1. **Ingest** — load fragmented contest records (`src/lib/contests.ts`)
2. **Score** — `expectedValue = topPrize × winProb`; urgency from hours-to-deadline; fit for agent builders
3. **Rank** — critical deadlines first, then score density
4. **Explain** — emit Why text + source list (`src/lib/hunter.ts`)
5. **Act** — nextMoves + path-to-₩100M portfolio advice

## APIs

| Endpoint | Role |
| --- | --- |
| `GET /api/hunt` | Full brief: ranked list, EV, next moves, evidence |
| `GET /api/hunt/[id]` | Single-target Why with sources |
| `POST /api/ask` | Natural-language question → evidence-backed answer |
| `POST /api/leads` | Hunt-together intake |

## Tracks mapping (Open Agent 2026)

- **Track 01 Fragmented Intelligence** — multi-source contest feeds → one radar
- **Track 02 Explain Why** — every recommendation cites sources and score factors
