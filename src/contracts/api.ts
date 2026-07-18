import type {
  CommunicationView,
  CreateServiceRequestInput,
  CreateServiceRequestResult,
  ProviderEligibilityResult,
  ProviderOfferView,
  ProviderSummary,
  PublicConfiguration,
  PublicProviderOfferView,
  PublicRequestStatusView,
  RequestOutcome,
  RequestStatus,
  SafetyDisposition,
  StaffRequestDetail,
  StaffRequestSummary,
  SubmitFeedbackInput,
} from "@/contracts/domain";

export interface OneNumberApiContract {
  publicRequests: {
    create(
      input: CreateServiceRequestInput,
    ): Promise<CreateServiceRequestResult>;
    getStatus(trackingToken: string): Promise<PublicRequestStatusView | null>;
    submitFeedback(input: SubmitFeedbackInput): Promise<{ accepted: true }>;
  };
  staffRequests: {
    list(filters: {
      status?: RequestStatus;
      safetyDisposition?: SafetyDisposition;
      serviceAreaId?: string;
      categoryId?: string;
    }): Promise<StaffRequestSummary[]>;
    get(requestId: string): Promise<StaffRequestDetail | null>;
    classify(input: {
      requestId: string;
      serviceAreaId: string | null;
      categoryId: string | null;
      safetyDisposition: SafetyDisposition;
    }): Promise<{ updated: true }>;
    transition(input: {
      requestId: string;
      to: RequestStatus;
      expectedUpdatedAt: number;
      scheduledFor?: string;
    }): Promise<{ updatedAt: number }>;
    createOffer(input: {
      requestId: string;
      providerId: string;
      offerToken: string;
    }): Promise<ProviderOfferView>;
    close(input: {
      requestId: string;
      outcome: RequestOutcome;
      notes: string;
    }): Promise<{ closed: true }>;
  };
  providers: {
    list(): Promise<ProviderSummary[]>;
    get(providerId: string): Promise<ProviderSummary | null>;
    upsert(input: unknown): Promise<{ providerId: string }>;
    setAvailability(input: {
      providerId: string;
      acceptingWork: boolean;
    }): Promise<{ updated: true }>;
    listEligible(requestId: string): Promise<ProviderEligibilityResult[]>;
  };
  providerOffers: {
    get(token: string): Promise<PublicProviderOfferView>;
    respond(input: {
      token: string;
      response: "accepted" | "declined";
    }): Promise<PublicProviderOfferView>;
  };
  config: {
    getPublic(): Promise<PublicConfiguration>;
    listAdmin(): Promise<PublicConfiguration>;
    upsertServiceArea(input: unknown): Promise<{ serviceAreaId: string }>;
    upsertCategory(input: unknown): Promise<{ categoryId: string }>;
  };
  communications: {
    listOutbox(): Promise<CommunicationView[]>;
    retryMock(communicationId: string): Promise<{ queued: true }>;
  };
}
