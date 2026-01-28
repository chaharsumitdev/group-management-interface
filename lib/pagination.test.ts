import { describe, expect, it } from "vitest";
import { getTotalPages, getOffset } from "./pagination";

describe("pagination", () => {
  describe("getTotalPages", () => {
    it("returns 1 when total is 0", () => {
      expect(getTotalPages(0, 50)).toBe(1);
    });

    it("returns 1 when total < pageSize", () => {
      expect(getTotalPages(25, 50)).toBe(1);
    });

    it("returns 1 when total equals pageSize", () => {
      expect(getTotalPages(50, 50)).toBe(1);
    });

    it("returns 2 when total is 51", () => {
      expect(getTotalPages(51, 50)).toBe(2);
    });

    it("returns 6 for 256 rows and pageSize 50", () => {
      expect(getTotalPages(256, 50)).toBe(6);
    });
  });

  describe("getOffset", () => {
    it("returns 0 for page 1", () => {
      expect(getOffset(1, 50)).toBe(0);
    });

    it("returns pageSize for page 2", () => {
      expect(getOffset(2, 50)).toBe(50);
    });

    it("returns 100 for page 3, pageSize 50", () => {
      expect(getOffset(3, 50)).toBe(100);
    });
  });
});
