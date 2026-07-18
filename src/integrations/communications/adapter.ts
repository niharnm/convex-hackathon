import { MockCommunicationsAdapter } from "./mock-adapter";
import type {
  CommunicationRecord,
  CommunicationRequest,
  CommunicationResult,
  CommunicationsAdapter,
  MockBehavior,
} from "./types";

export class CommunicationsUnavailableError extends Error {
  constructor() {
    super("No production communications adapter is configured");
    this.name = "CommunicationsUnavailableError";
  }
}

class UnavailableCommunicationsAdapter implements CommunicationsAdapter {
  readonly mode = "unavailable" as const;

  async send(request: CommunicationRequest): Promise<CommunicationResult> {
    void request;
    throw new CommunicationsUnavailableError();
  }

  async retry(
    communicationId: string,
    behavior?: MockBehavior,
  ): Promise<CommunicationRecord> {
    void communicationId;
    void behavior;
    throw new CommunicationsUnavailableError();
  }

  async list(): Promise<CommunicationRecord[]> {
    throw new CommunicationsUnavailableError();
  }
}

export function createCommunicationsAdapter(options?: {
  environment?: "development" | "test" | "production";
  clock?: () => number;
}): CommunicationsAdapter {
  const environment = options?.environment ?? process.env.NODE_ENV;

  if (environment === "production") {
    return new UnavailableCommunicationsAdapter();
  }

  return new MockCommunicationsAdapter(options?.clock);
}
