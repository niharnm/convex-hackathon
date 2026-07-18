import type {
  CommunicationRequest,
  TwilioCallRequest,
  TwilioMessageRequest,
} from "./types";

function safeText(value: string): string {
  return value
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, 240);
}

export function renderTemplate(request: CommunicationRequest): string {
  switch (request.template) {
    case "request_confirmation":
      return `MOCK: Vun received your non-emergency request. A person will review it. Track it: ${safeText(request.data.trackingUrl)}`;
    case "provider_offer":
      return `MOCK offer: ${safeText(request.data.categoryName)} in ${safeText(request.data.serviceAreaName)}. Review within ${request.data.expiresInMinutes} minutes: ${safeText(request.data.offerUrl)}`;
    case "match_confirmation":
      return `MOCK: A provider accepted your request: ${safeText(request.data.providerName)}. Details: ${safeText(request.data.trackingUrl)}`;
    case "status_update":
      return `MOCK: Your Vun request changed to ${safeText(request.data.statusLabel)}. Track it: ${safeText(request.data.trackingUrl)}`;
    case "outcome_follow_up":
      return `MOCK: Was your request resolved? Share feedback: ${safeText(request.data.feedbackUrl)}`;
  }
}

export function toTwilioMessageRequest(
  request: CommunicationRequest,
  from: string,
  statusCallback?: string,
): TwilioMessageRequest {
  return {
    To: request.recipient,
    From: from,
    Body: renderTemplate(request),
    ...(statusCallback ? { StatusCallback: statusCallback } : {}),
  };
}

export function toTwilioCallRequest(
  request: CommunicationRequest,
  from: string,
  statusCallback?: string,
): TwilioCallRequest {
  const spokenBody = renderTemplate(request)
    .replaceAll("&", "and")
    .replace(/[<>]/g, "");

  return {
    To: request.recipient,
    From: from,
    Twiml: `<Response><Say>${spokenBody}</Say></Response>`,
    ...(statusCallback ? { StatusCallback: statusCallback } : {}),
  };
}
