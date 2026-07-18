<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->

## One Number project rules

- This is a responsive web MVP. Do not add iOS, payments, live Twilio, customer accounts, provider accounts, bidding, or autonomous dispatch.
- `src/contracts/**` is the shared interface boundary. Feature branches must not change it without an integration-level review.
- All dispatch decisions require a staff action. Emergency or unsupported requests must never become dispatchable.
- Customer and provider capability tokens are secrets. Store only hashes and never log or display raw tokens inside staff views.
- Any communication in this repository is simulated and must be labeled `MOCK` or `SIMULATED`.
- Do not claim a provider is "fully vetted." Display the individual verification checks and their dates/statuses.
- The public interface must remain keyboard accessible, usable at 375px, and clear that One Number is not an emergency service.
