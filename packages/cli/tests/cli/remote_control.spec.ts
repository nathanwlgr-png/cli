import { describe, it } from "vitest";
import { fixture, setupCLITests } from "./testkit/index.js";

describe("remote-control command", () => {
  const t = setupCLITests();

  it("opens the remote-control session URL when in a project", async () => {
    await t.givenLoggedInWithProject(fixture("basic"));

    const result = await t.run("remote-control");

    t.expectResult(result).toSucceed();
    t.expectResult(result).toContain("Remote control session opened");
    t.expectResult(result).toContain("test-app-id");
  });

  it("fails when not in a project directory", async () => {
    await t.givenLoggedIn({ email: "test@example.com", name: "Test User" });

    const result = await t.run("remote-control");

    t.expectResult(result).toFail();
    t.expectResult(result).toContain("No Base44 project found");
  });
});
