import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { GroupSidePanel } from "./group-side-panel";

const mockDetail = {
  id: 1,
  name: "Evoke <> Skope",
  project_id: 1,
  project: { id: 1, name: "Demo", color: "#3b82f6" },
  labels: [
    { id: 1, name: "Priority", color: "#22c55e" },
    { id: 2, name: "Warm", color: "#ef4444" },
  ],
  members_count: 3,
  unread_messages: 10,
  last_active: "2025-01-28T12:17:00Z",
  disappearing_messages: false,
  send_message_permission: "all",
  issue: {
    id: 1,
    group_id: 1,
    code: "PER-011",
    title: "Issues with mentions on groups",
    context_type: "client",
    occurred_at: "2025-12-22",
  },
};

describe("GroupSidePanel", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockDetail),
        })
      )
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders header with group name and refresh", () => {
    render(<GroupSidePanel groupId={1} groupName="Evoke <> Skope" />);
    expect(screen.getByText("Evoke <> Skope")).toBeInTheDocument();
    expect(screen.getByLabelText("Refresh")).toBeInTheDocument();
  });

  it("renders Overview, Members, Logs tabs", () => {
    render(<GroupSidePanel groupId={1} groupName="Evoke <> Skope" />);
    expect(screen.getByRole("tab", { name: /overview/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /members/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /logs/i })).toBeInTheDocument();
  });

  it("fetches and shows overview when loaded", async () => {
    render(<GroupSidePanel groupId={1} groupName="Evoke <> Skope" />);
    await waitFor(() => {
      expect(screen.getByText("Issues with mentions on groups")).toBeInTheDocument();
    });
    expect(screen.getByText("PER-011")).toBeInTheDocument();
  });
});
