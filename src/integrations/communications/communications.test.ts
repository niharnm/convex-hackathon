import { describe, expect, it } from "vitest";

import {
  CommunicationsUnavailableError,
  createCommunicationsAdapter,
} from "./adapter";
import {
  CONSENT_ERROR,
  MockCommunicationsAdapter,
  SIMULATED_FAILURE,
} from "./mock-adapter";
import {
  renderTemplate,
  toTwilioCallRequest,
  toTwilioMessageRequest,
} from "./templates";
import type { CommunicationRequest } from "./types";

const confirmationRequest: CommunicationRequest = {
  template: "request_confirmation",
  data: { trackingUrl: "https://example.test/r/request-1" },
  channel: "sms",
  recipient: "+1 (925) 555-0112",
  transactionalSmsConsent: true,
  idempotencyKey: "request-1:confirmation",
};

describe("mock communications adapter", () => {
  it("deduplicates sends and never stores a raw recipient", async () => {
    const adapter = new MockCommunicationsAdapter(() => 1_000);

    const first = await adapter.send(confirmationRequest);
    const duplicate = await adapter.send(confirmationRequest);

    expect(first.duplicate).toBe(false);
    expect(first.record.recipientMasked).toBe("••• ••• ••12");
    expect(JSON.stringify(first.record)).not.toContain("925");
    expect(duplicate).toEqual({ record: first.record, duplicate: true });
    expect(await adapter.list()).toEqual([first.record]);
  });

  it("does not let a retry bypass missing SMS consent", async () => {
    const adapter = new MockCommunicationsAdapter(() => 1_000);
    const result = await adapter.send({
      ...confirmationRequest,
      idempotencyKey: "request-2:confirmation",
      transactionalSmsConsent: false,
    });

    expect(result.record.status).toBe("simulated_failed");
    expect(result.record.lastError).toBe(CONSENT_ERROR);
    await expect(
      adapter.receiveCallback({
        callbackId: "invalid-consent-callback",
        communicationId: result.record.id,
        status: "simulated_sent",
      }),
    ).rejects.toThrow(CONSENT_ERROR);
    await expect(adapter.retry(result.record.id)).resolves.toEqual(
      result.record,
    );
  });

  it("supports delayed sends and idempotent simulated callbacks", async () => {
    let now = 1_000;
    const adapter = new MockCommunicationsAdapter(() => now);
    const delayed = await adapter.send({
      ...confirmationRequest,
      channel: "voice",
      behavior: "delay",
      idempotencyKey: "request-3:follow-up",
    });

    expect(delayed.record.status).toBe("queued");
    expect(delayed.record.readyAt).toBe(3_000);

    now = 4_000;
    const flushed = await adapter.flush(delayed.record.id);
    expect(flushed.status).toBe("simulated_sent");

    const callback = {
      callbackId: "callback-1",
      communicationId: delayed.record.id,
      status: "simulated_failed" as const,
    };
    const firstCallback = await adapter.receiveCallback(callback);
    const duplicateCallback = await adapter.receiveCallback(callback);

    expect(firstCallback.record.lastError).toBe(SIMULATED_FAILURE);
    expect(firstCallback.duplicate).toBe(false);
    expect(duplicateCallback.duplicate).toBe(true);
  });

  it("fails closed in production", async () => {
    const adapter = createCommunicationsAdapter({
      environment: "production",
    });

    expect(adapter.mode).toBe("unavailable");
    await expect(adapter.send(confirmationRequest)).rejects.toBeInstanceOf(
      CommunicationsUnavailableError,
    );
  });
});

describe("communication templates", () => {
  const requests: CommunicationRequest[] = [
    confirmationRequest,
    {
      ...confirmationRequest,
      template: "provider_offer",
      data: {
        categoryName: "Plumbing",
        serviceAreaName: "San Ramon",
        offerUrl: "https://example.test/offer/1",
        expiresInMinutes: 15,
      },
    },
    {
      ...confirmationRequest,
      template: "match_confirmation",
      data: {
        providerName: "Example Plumbing",
        trackingUrl: "https://example.test/r/request-1",
      },
    },
    {
      ...confirmationRequest,
      template: "status_update",
      data: {
        statusLabel: "scheduled",
        trackingUrl: "https://example.test/r/request-1",
      },
    },
    {
      ...confirmationRequest,
      template: "outcome_follow_up",
      data: { feedbackUrl: "https://example.test/r/request-1/feedback" },
    },
  ];

  it("visibly labels every generated communication as a mock", () => {
    for (const request of requests) {
      expect(renderTemplate(request)).toMatch(/^MOCK\b/);
      expect(toTwilioMessageRequest(request, "+15550100").Body).toMatch(
        /^MOCK\b/,
      );
      expect(toTwilioCallRequest(request, "+15550100").Twiml).toContain(
        "<Say>MOCK",
      );
    }
  });
});
