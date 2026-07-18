# One Number

One Number is a human-backed dispatch workflow for urgent, non-emergency household problems. A customer describes the issue once, a staff operator reviews it, and an eligible local provider can accept a time-limited offer.

This repository contains the responsive web MVP. It does **not** send real calls or messages, process payments, automate dispatch, or include iOS code.

## Local setup

1. Install dependencies with `npm install`.
2. Provision the anonymous local Convex backend with `CONVEX_AGENT_MODE=anonymous npx convex dev --once`.
3. Copy the Clerk and Convex values described in `.env.example` into `.env.local`.
4. Run `npm run dev` to start Convex and Next.js together.

Without Clerk keys, public routes still render and `/ops/**` redirects to `/setup`. Staff functions remain protected server-side once the backend is implemented.

## Checks

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run test:e2e`
- `npm run build`

## Product boundaries

| Area                   | MVP behavior                                          |
| ---------------------- | ----------------------------------------------------- |
| Customer intake/status | Real Convex-backed web flow, no account               |
| Staff operations       | Clerk-protected manual review and dispatch            |
| Provider response      | Expiring capability link, no account                  |
| Communications         | Deterministic simulator only                          |
| Payments               | Not included                                          |
| Voice/SMS provider     | Twilio-shaped interface only; no SDK or network calls |
| Mobile                 | Responsive web only; no PWA or native iOS work        |

Service areas, categories, operating hours, and verification requirements are data-driven. No geography is presented as a committed launch market.
