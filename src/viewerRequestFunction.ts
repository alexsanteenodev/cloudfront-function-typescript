import { Event, CfRequest } from "./types/Event";
import { modifyUrl } from "./utils/modifyUrl";

export function handler(event: Event): CfRequest {
  const request = event.request;
  if (!request.uri) {
    throw new Error("Invalid request: Missing URI");
  }
  request.uri = modifyUrl(request.uri);
  return request;
}
