import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GroupRow } from "./group-row";
import type { Group, Label, Project } from "@/types/groups";

const mockProject: Project = {
  id: 1,
  name: "Demo",
  color: "#3b82f6",
};

const mockLabels: Label[] = [
  { id: 1, name: "Priority", color: "#22c55e" },
  { id: 2, name: "Warm", color: "#ef4444" },
];

const mockGroup: Group = {
  id: 42,
  name: "Evoke <> Skope",
  project_id: 1,
  project: mockProject,
  labels: mockLabels,
  members_count: 3,
  unread_messages: 10,
  last_active: "2025-01-28T12:17:00Z",
  disappearing_messages: false,
  send_message_permission: "all",
};

function renderRow(props: {
  group: Group;
  selected?: boolean;
  onSelect: (id: number) => void;
}) {
  return render(
    <table>
      <tbody>
        <GroupRow {...props} onSelect={vi.fn()} onCheck={vi.fn()} />
      </tbody>
    </table>
  );
}

describe("GroupRow", () => {
  it("renders group name, project, labels, members, last active", () => {
    const onSelect = vi.fn();
    renderRow({ group: mockGroup, onSelect });
    expect(screen.getByText("Evoke <> Skope")).toBeInTheDocument();
    expect(screen.getByText(/# Demo/i)).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("calls onSelect when row is clicked", () => {
    const onSelect = vi.fn();
    renderRow({ group: mockGroup, onSelect });
    fireEvent.click(screen.getByRole("button"));
    expect(onSelect).toHaveBeenCalledWith(42);
  });

  it("shows selected styling when selected", () => {
    const onSelect = vi.fn();
    renderRow({ group: mockGroup, selected: true, onSelect });
    const row = screen.getByRole("button");
    expect(row).toHaveAttribute("data-selected", "true");
    expect(row).toHaveAttribute("aria-current", "true");
  });
});
