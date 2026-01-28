import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { formatLastActive } from "./format";

describe("formatLastActive", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-28T15:30:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("formats same-day time as HH:mm", () => {
    const out = formatLastActive("2025-01-28T12:17:00Z");
    expect(out).toMatch(/^12:17/);
  });

  it("formats yesterday as Yesterday", () => {
    expect(formatLastActive("2025-01-27T10:00:00Z")).toBe("Yesterday");
  });

  it("formats older dates as day month", () => {
    expect(formatLastActive("2025-01-15T10:00:00Z")).toBe("15 Jan");
  });
});
