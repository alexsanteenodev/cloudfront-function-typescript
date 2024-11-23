/**
 * Type definitions copied from @types/aws-cloudfront-function
 * Original source: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-cloudfront-function
 * License: MIT
 */

export interface Event {
  version: "1.0";
  context: Context;
  viewer: Viewer;
  request: CfRequest;
  response: CfResponse;
}

interface Context {
  distributionDomainName: string;
  distributionId: string;
  eventType: "viewer-request" | "viewer-response";
  requestId: string;
}

interface Viewer {
  ip: string;
}

export interface CfRequest {
  method: string;
  uri: string;
  querystring: ValueObject;
  headers: ValueObject;
  cookies: ValueObject;
}

export interface CfResponse {
  statusCode: number;
  statusDescription?: string;
  headers?: ValueObject;
  cookies?: ResponseCookie;
}

interface ValueObject {
  [name: string]: {
    value: string;
    multiValue?: Array<{
      value: string;
    }>;
  };
}

interface ResponseCookie {
  [name: string]: {
    value: string;
    attributes: string;
    multiValue?: Array<{
      value: string;
      attributes: string;
    }>;
  };
}
