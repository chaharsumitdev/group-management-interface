import { describe, expect, it } from "vitest";
import { getAvatarUrl } from "./avatar";

describe("getAvatarUrl", () => {
  it("returns DB avatar when present, adding leading slash if missing", () => {
    expect(getAvatarUrl("/avatar-1.svg", 1)).toBe("/avatar-1.svg");
    expect(getAvatarUrl("avatar-2.svg", 1)).toBe("/avatar-2.svg");
  });

  it("returns default avatar when avatar is null or empty", () => {
    const url1 = getAvatarUrl(null, 1);
    const url2 = getAvatarUrl(undefined, 1);
    const url3 = getAvatarUrl("", 2);
    expect(["/avatar-1.svg", "/avatar-2.svg", "/periskope-icon.svg"]).toContain(url1);
    expect(["/avatar-1.svg", "/avatar-2.svg", "/periskope-icon.svg"]).toContain(url2);
    expect(["/avatar-1.svg", "/avatar-2.svg", "/periskope-icon.svg"]).toContain(url3);
  });

  it("returns same default for same group id", () => {
    expect(getAvatarUrl(null, 1)).toBe(getAvatarUrl(null, 1));
    expect(getAvatarUrl(undefined, 42)).toBe(getAvatarUrl(undefined, 42));
  });

  it("cycles through defaults by group id", () => {
    const urls = [
      getAvatarUrl(null, 0),
      getAvatarUrl(null, 1),
      getAvatarUrl(null, 2),
      getAvatarUrl(null, 3),
    ];
    expect(urls[0]).toBe(urls[3]);
    expect(new Set(urls).size).toBe(3);
  });
});
