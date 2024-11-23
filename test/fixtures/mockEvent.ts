import { Event } from "../../src/types/Event";

export const mockEvent = (url: string | undefined): Event => {
  return {
    request: {
      uri: url,
      querystring: {},
      cookies: {},
      headers: {
        "user-agent": { value: "test-agent" },
      },
      method: "GET",
    },
    context: {
      distributionDomainName: "distribution.cloudfront.net",
      distributionId: "DISTRIBUTION123",
      eventType: "viewer-request",
      requestId: "request-id",
    },
    version: "1.0",
    viewer: {
      ip: "1.2.3.4",
    },
    response: {
      statusCode: 200,
    },
  } as Event;
};
