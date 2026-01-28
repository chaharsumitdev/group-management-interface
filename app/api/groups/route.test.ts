import { describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";
import { GET } from "./route";

vi.mock("@/lib/groups", () => ({
  fetchGroupsList: vi.fn(() =>
    Promise.resolve({
      groups: [],
      total: 256,
      page: 1,
      page_size: 50,
      total_pages: 6,
    })
  ),
}));

describe("GET /api/groups", () => {
  it("returns paginated list shape", async () => {
    const req = new Request("http://localhost/api/groups?page=1") as NextRequest;
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty("groups");
    expect(data).toHaveProperty("total", 256);
    expect(data).toHaveProperty("page", 1);
    expect(data).toHaveProperty("page_size", 50);
    expect(data).toHaveProperty("total_pages", 6);
  });

  it("returns 500 on fetch error", async () => {
    const { fetchGroupsList } = await import("@/lib/groups");
    vi.mocked(fetchGroupsList).mockRejectedValueOnce(new Error("db error"));
    const req = new Request("http://localhost/api/groups") as NextRequest;
    const res = await GET(req);
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data).toHaveProperty("error", "Failed to fetch groups");
  });
});
