import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Sidebar } from "./sidebar";

describe("Sidebar", () => {
  it("renders logo and user email", () => {
    render(<Sidebar />);
    expect(screen.getByText("Periskope")).toBeInTheDocument();
    expect(screen.getByText("chahar.sumit888@gmail.com")).toBeInTheDocument();
  });

  it("renders nav items including Groups as current", () => {
    render(<Sidebar />);
    expect(screen.getByRole("link", { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /chats/i })).toBeInTheDocument();
    const groups = screen.getByRole("link", { name: /groups/i });
    expect(groups).toBeInTheDocument();
    expect(groups).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: /contacts/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /logs/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /files/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /settings/i })).toBeInTheDocument();
  });

  it("renders Chats badge", () => {
    render(<Sidebar />);
    expect(screen.getByText("36+")).toBeInTheDocument();
  });

  it("renders Help & Support", () => {
    render(<Sidebar />);
    expect(screen.getByText(/help & support/i)).toBeInTheDocument();
  });
});
