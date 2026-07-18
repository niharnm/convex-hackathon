import { describe, expect, it } from "vitest";

import { canTransitionRequest } from "@/contracts/domain";

describe("request state contract", () => {
  it("allows the manual fulfillment path", () => {
    expect(canTransitionRequest("needs_review", "ready_to_dispatch")).toBe(
      true,
    );
    expect(canTransitionRequest("ready_to_dispatch", "dispatching")).toBe(true);
    expect(canTransitionRequest("dispatching", "matched")).toBe(true);
    expect(canTransitionRequest("matched", "scheduled")).toBe(true);
    expect(canTransitionRequest("scheduled", "closed")).toBe(true);
  });

  it("never reopens a closed request", () => {
    expect(canTransitionRequest("closed", "needs_review")).toBe(false);
  });
});
