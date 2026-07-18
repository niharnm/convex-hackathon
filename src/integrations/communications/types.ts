import type { CommunicationStatus } from "@/contracts/domain";

export const communicationTemplates = [
  "request_confirmation",
  "provider_offer",
  "match_confirmation",
  "status_update",
  "outcome_follow_up",
] as const;

export type CommunicationTemplate = (typeof communicationTemplates)[number];
export type CommunicationChannel = "sms" | "voice";
export type MockBehavior = "success" | "failure" | "delay";

export type CommunicationPayload =
  | {
      template: "request_confirmation";
      data: { trackingUrl: string };
    }
  | {
      template: "provider_offer";
      data: {
        categoryName: string;
        serviceAreaName: string;
        offerUrl: string;
        expiresInMinutes: number;
      };
    }
  | {
      template: "match_confirmation";
      data: { providerName: string; trackingUrl: string };
    }
  | {
      template: "status_update";
      data: { statusLabel: string; trackingUrl: string };
    }
  | {
      template: "outcome_follow_up";
      data: { feedbackUrl: string };
    };

export type CommunicationRequest = CommunicationPayload & {
  channel: CommunicationChannel;
  recipient: string;
  transactionalSmsConsent: boolean;
  idempotencyKey: string;
  behavior?: MockBehavior;
};

export interface CommunicationRecord {
  id: string;
  channel: CommunicationChannel;
  template: CommunicationTemplate;
  recipientMasked: string;
  status: CommunicationStatus;
  attemptCount: number;
  createdAt: number;
  updatedAt: number;
  lastError: string | null;
  mode: "MOCK_SIMULATED";
  idempotencyFingerprint: string;
  externalReference: string | null;
  readyAt: number | null;
}

export interface CommunicationResult {
  record: CommunicationRecord;
  duplicate: boolean;
}

export interface MockCallback {
  callbackId: string;
  communicationId: string;
  status: "simulated_sent" | "simulated_failed";
  error?: string;
}

export interface MockCallbackResult {
  record: CommunicationRecord;
  duplicate: boolean;
}

export interface CommunicationsAdapter {
  readonly mode: "mock" | "unavailable";
  send(request: CommunicationRequest): Promise<CommunicationResult>;
  retry(
    communicationId: string,
    behavior?: MockBehavior,
  ): Promise<CommunicationRecord>;
  list(): Promise<CommunicationRecord[]>;
}

export interface TwilioMessageRequest {
  To: string;
  From: string;
  Body: string;
  StatusCallback?: string;
}

export interface TwilioCallRequest {
  To: string;
  From: string;
  Twiml: string;
  StatusCallback?: string;
}

export interface TwilioShapedResult {
  sid: string;
  status: "queued" | "sent" | "failed";
  errorCode: string | null;
  errorMessage: string | null;
}
