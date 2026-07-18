export const routes = {
  home: "/",
  request: "/request",
  tracking: (trackingToken: string) => `/r/${trackingToken}`,
  offer: (offerToken: string) => `/offer/${offerToken}`,
  opsRequests: "/ops/requests",
  opsRequest: (requestId: string) => `/ops/requests/${requestId}`,
  opsProviders: "/ops/providers",
  opsProvider: (providerId: string) => `/ops/providers/${providerId}`,
  opsConfig: "/ops/config",
  opsCommunications: "/ops/comms",
} as const;
