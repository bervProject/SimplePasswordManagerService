import app from "../../src/app";

describe("'emails' service", () => {
  it("registered the service", () => {
    const service = app.service("emails");
    expect(service).toBeTruthy();
  });
});
