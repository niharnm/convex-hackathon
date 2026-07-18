# Vun

Vun is a human-backed dispatch workflow for urgent, non-emergency household problems. A customer describes the issue once, a staff operator reviews it, and an eligible local provider can accept a time-limited offer.

This repository contains the responsive web MVP. It does **not** send real calls or messages, process payments, automate dispatch, or include iOS code.

## Local setup

1. Install dependencies with `npm install`.
2. Provision the anonymous local Convex backend with `CONVEX_AGENT_MODE=anonymous npx convex dev --once`.
3. Copy the Clerk and Convex values described in `.env.example` into `.env.local`.
4. Run `npm run dev` to start Convex and Next.js together.

Without Clerk keys, marketing routes still render while customer, business, and staff account routes redirect to `/setup`. Set `VUN_STAFF_USER_IDS` to the comma-separated Clerk user IDs allowed into `/ops/**`; public signup intent never grants staff access. Staff Convex functions must also enforce authorization server-side as they are implemented.

## Checks

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run test:e2e`
- `npm run build`

## Product boundaries

| Area                   | MVP behavior                                          |
| ---------------------- | ----------------------------------------------------- |
| Customer intake/status | Clerk-gated entry; intake/status work in progress     |
| Business onboarding    | Clerk entry; pending-profile workspace shell          |
| Staff operations       | Clerk plus explicit allowlist; manual review/dispatch |
| Provider response      | Expiring capability link; raw tokens remain secret    |
| Communications         | Deterministic simulator only                          |
| Payments               | Not included                                          |
| Voice/SMS provider     | Twilio-shaped interface only; no SDK or network calls |
| Mobile                 | Responsive web only; no PWA or native iOS work        |

Service areas, categories, operating hours, and verification requirements are data-driven. No geography is presented as a committed launch market.
