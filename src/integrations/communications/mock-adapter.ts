import { fingerprint, maskRecipient } from "./redaction";
import type {
  CommunicationRecord,
  CommunicationRequest,
  CommunicationResult,
  CommunicationsAdapter,
  MockBehavior,
  MockCallback,
  MockCallbackResult,
} from "./types";

const CONSENT_ERROR = "RECORDED_TRANSACTIONAL_CONSENT_REQUIRED";
const SIMULATED_FAILURE = "SIMULATED_PROVIDER_FAILURE";

type Clock = () => number;

export class MockCommunicationsAdapter implements CommunicationsAdapter {
  readonly mode = "mock" as const;
  private readonly records = new Map<string, CommunicationRecord>();
  private readonly communicationByIdempotency = new Map<string, string>();
  private readonly callbackIds = new Set<string>();

  constructor(private readonly clock: Clock = Date.now) {}

  async send(request: CommunicationRequest): Promise<CommunicationResult> {
    const existingId = this.communicationByIdempotency.get(
      request.idempotencyKey,
    );
    const existing = existingId ? this.records.get(existingId) : undefined;

    if (existing) {
      return { record: { ...existing }, duplicate: true };
    }

    const now = this.clock();
    const idempotencyFingerprint = fingerprint(request.idempotencyKey);
    const id = `mock_${idempotencyFingerprint}`;
    const behavior = request.behavior ?? "success";
    const consentMissing =
      request.channel === "sms" && !request.transactionalSmsConsent;
    const status = consentMissing
      ? "simulated_failed"
      : behavior === "failure"
        ? "simulated_failed"
        : behavior === "delay"
          ? "queued"
          : "simulated_sent";

    const record: CommunicationRecord = {
      id,
      channel: request.channel,
      template: request.template,
      recipientMasked: maskRecipient(request.recipient),
      status,
      attemptCount: 1,
      createdAt: now,
      updatedAt: now,
      lastError: consentMissing
        ? CONSENT_ERROR
        : behavior === "failure"
          ? SIMULATED_FAILURE
          : null,
      mode: "MOCK_SIMULATED",
      idempotencyFingerprint,
      externalReference:
        status === "simulated_sent"
          ? `SM_MOCK_${idempotencyFingerprint}`
          : null,
      readyAt: behavior === "delay" ? now + 2_000 : null,
    };

    this.records.set(id, record);
    this.communicationByIdempotency.set(request.idempotencyKey, id);
    return { record: { ...record }, duplicate: false };
  }

  async retry(
    communicationId: string,
    behavior: MockBehavior = "success",
  ): Promise<CommunicationRecord> {
    const existing = this.records.get(communicationId);
    if (!existing) {
      throw new Error("COMMUNICATION_NOT_FOUND");
    }

    if (existing.lastError === CONSENT_ERROR) {
      return { ...existing };
    }

    if (existing.status === "simulated_sent") {
      return { ...existing };
    }

    const now = this.clock();
    const updated: CommunicationRecord = {
      ...existing,
      attemptCount: existing.attemptCount + 1,
      updatedAt: now,
      status:
        behavior === "failure"
          ? "simulated_failed"
          : behavior === "delay"
            ? "queued"
            : "simulated_sent",
      lastError: behavior === "failure" ? SIMULATED_FAILURE : null,
      externalReference:
        behavior === "success"
          ? `SM_MOCK_${existing.idempotencyFingerprint}`
          : null,
      readyAt: behavior === "delay" ? now + 2_000 : null,
    };
    this.records.set(communicationId, updated);
    return { ...updated };
  }

  async flush(communicationId: string): Promise<CommunicationRecord> {
    const existing = this.records.get(communicationId);
    if (!existing) {
      throw new Error("COMMUNICATION_NOT_FOUND");
    }

    if (existing.status !== "queued") {
      return { ...existing };
    }

    const updated: CommunicationRecord = {
      ...existing,
      status: "simulated_sent",
      updatedAt: this.clock(),
      readyAt: null,
      externalReference: `SM_MOCK_${existing.idempotencyFingerprint}`,
    };
    this.records.set(communicationId, updated);
    return { ...updated };
  }

  async receiveCallback(callback: MockCallback): Promise<MockCallbackResult> {
    const existing = this.records.get(callback.communicationId);
    if (!existing) {
      throw new Error("COMMUNICATION_NOT_FOUND");
    }

    if (existing.lastError === CONSENT_ERROR) {
      throw new Error(CONSENT_ERROR);
    }

    if (this.callbackIds.has(callback.callbackId)) {
      return { record: { ...existing }, duplicate: true };
    }

    this.callbackIds.add(callback.callbackId);
    const updated: CommunicationRecord = {
      ...existing,
      status: callback.status,
      updatedAt: this.clock(),
      lastError:
        callback.status === "simulated_failed"
          ? (callback.error ?? SIMULATED_FAILURE)
          : null,
    };
    this.records.set(existing.id, updated);
    return { record: { ...updated }, duplicate: false };
  }

  async list(): Promise<CommunicationRecord[]> {
    return [...this.records.values()]
      .sort((left, right) => right.createdAt - left.createdAt)
      .map((record) => ({ ...record }));
  }
}

export { CONSENT_ERROR, SIMULATED_FAILURE };
