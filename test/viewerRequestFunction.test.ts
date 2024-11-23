import { handler } from "../src/viewerRequestFunction";
import { mockEvent } from "./fixtures/mockEvent";

describe("viewerRequestFunction", () => {
  it("should modify the URI of a valid request", () => {
    const result = handler(mockEvent("/old-path"));

    expect(result.uri).toBeDefined();
    expect(result.uri).toBe("/new-path");
  });

  it("should throw an error when URI is missing", () => {
    expect(() => handler(mockEvent(undefined))).toThrow(
      "Invalid request: Missing URI"
    );
  });

  it("should preserve other request properties while modifying URI", () => {
    const result = handler(mockEvent("/old-path"));

    expect(result.headers).toEqual(mockEvent("/old-path").request.headers);
    expect(result.method).toBe(mockEvent("/old-path").request.method);
  });
});
