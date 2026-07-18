export const requestStatuses = [
  "needs_review",
  "ready_to_dispatch",
  "dispatching",
  "matched",
  "scheduled",
  "closed",
] as const;

export type RequestStatus = (typeof requestStatuses)[number];

export const requestOutcomes = [
  "resolved",
  "unresolved",
  "unfulfilled",
  "cancelled",
  "emergency_redirected",
] as const;

export type RequestOutcome = (typeof requestOutcomes)[number];

export const safetyDispositions = [
  "human_review",
  "clear",
  "emergency_redirect",
  "unsupported",
] as const;

export type SafetyDisposition = (typeof safetyDispositions)[number];

export const offerStatuses = [
  "pending",
  "accepted",
  "declined",
  "expired",
  "cancelled",
] as const;

export type OfferStatus = (typeof offerStatuses)[number];

export const verificationStatuses = [
  "not_checked",
  "pending",
  "verified",
  "expired",
  "failed",
  "not_applicable",
] as const;

export type VerificationStatus = (typeof verificationStatuses)[number];

export const communicationStatuses = [
  "queued",
  "simulated_sent",
  "simulated_failed",
  "cancelled",
] as const;

export type CommunicationStatus = (typeof communicationStatuses)[number];

export const allowedRequestTransitions: Readonly<
  Record<RequestStatus, readonly RequestStatus[]>
> = {
  needs_review: ["ready_to_dispatch", "closed"],
  ready_to_dispatch: ["dispatching", "closed"],
  dispatching: ["matched", "ready_to_dispatch", "closed"],
  matched: ["scheduled", "closed"],
  scheduled: ["closed"],
  closed: [],
};

export function canTransitionRequest(
  from: RequestStatus,
  to: RequestStatus,
): boolean {
  return allowedRequestTransitions[from].includes(to);
}

export interface ServiceAreaSummary {
  id: string;
  name: string;
  postalCodes: string[];
  timezone: string;
  active: boolean;
  operatingHoursLabel: string;
}

export interface ServiceCategorySummary {
  id: string;
  name: string;
  description: string;
  active: boolean;
  requiredVerificationKinds: string[];
}

export interface PublicConfiguration {
  configured: boolean;
  serviceAreas: ServiceAreaSummary[];
  categories: ServiceCategorySummary[];
}

export interface CreateServiceRequestInput {
  idempotencyKey: string;
  trackingToken: string;
  customerName: string;
  callbackNumber: string;
  transactionalSmsConsent: boolean;
  serviceAreaId: string;
  categoryId: string;
  postalCode: string;
  locationType: "house" | "apartment" | "condo" | "other";
  issueDescription: string;
  urgency: "today" | "within_48_hours" | "this_week" | "flexible";
  availability: string;
}

export interface CreateServiceRequestResult {
  requestId: string;
  trackingToken: string;
  status: "created" | "duplicate";
}

export interface PublicProviderView {
  businessName: string;
  dispatchPhone: string;
  verificationSummary: Array<{
    kind: string;
    status: VerificationStatus;
    expiresAt: number | null;
  }>;
}

export interface PublicRequestStatusView {
  requestId: string;
  status: RequestStatus;
  outcome: RequestOutcome | null;
  categoryName: string;
  serviceAreaName: string;
  issueSummary: string;
  createdAt: number;
  scheduledFor: string | null;
  provider: PublicProviderView | null;
  timeline: Array<{
    status: RequestStatus;
    label: string;
    occurredAt: number;
  }>;
  canSubmitFeedback: boolean;
}

export interface SubmitFeedbackInput {
  trackingToken: string;
  resolved: boolean;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
}

export interface ProviderSummary {
  id: string;
  businessName: string;
  acceptingWork: boolean;
  suspended: boolean;
  probation: boolean;
  categoryNames: string[];
  serviceAreaNames: string[];
  verificationState: "current" | "attention" | "incomplete";
}

export interface ProviderEligibilityResult {
  provider: ProviderSummary;
  eligible: boolean;
  reasonCodes: string[];
}

export interface StaffRequestSummary {
  id: string;
  customerName: string;
  callbackNumber: string;
  status: RequestStatus;
  safetyDisposition: SafetyDisposition;
  categoryName: string | null;
  serviceAreaName: string | null;
  issueDescription: string;
  createdAt: number;
  updatedAt: number;
}

export interface StaffRequestDetail extends StaffRequestSummary {
  transactionalSmsConsent: boolean;
  postalCode: string;
  locationType: string;
  urgency: string;
  availability: string;
  scheduledFor: string | null;
  outcome: RequestOutcome | null;
  eligibleProviders: ProviderEligibilityResult[];
  offers: ProviderOfferView[];
  events: RequestEventView[];
  communications: CommunicationView[];
}

export interface ProviderOfferView {
  id: string;
  providerName: string;
  status: OfferStatus;
  expiresAt: number;
  respondedAt: number | null;
}

export interface PublicProviderOfferView {
  status: OfferStatus | "invalid";
  categoryName: string | null;
  serviceAreaName: string | null;
  issueSummary: string | null;
  urgency: string | null;
  requestedWindow: string | null;
  expiresAt: number | null;
  customerContact: {
    name: string;
    callbackNumber: string;
  } | null;
}

export interface RequestEventView {
  id: string;
  type: string;
  label: string;
  actorLabel: string;
  occurredAt: number;
}

export interface CommunicationView {
  id: string;
  channel: "sms" | "voice";
  template: string;
  recipientMasked: string;
  status: CommunicationStatus;
  attemptCount: number;
  createdAt: number;
  lastError: string | null;
}

export interface OperatorContext {
  operatorId: string;
  displayName: string;
  role: "dispatcher" | "admin";
}
