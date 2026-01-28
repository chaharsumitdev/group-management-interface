import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pagination } from "./pagination";

describe("Pagination", () => {
  it("renders page X of Y and total rows", () => {
    render(<Pagination page={2} totalPages={6} total={256} />);
    expect(screen.getByText("2 of 6")).toBeInTheDocument();
    expect(screen.getByText("256 rows")).toBeInTheDocument();
  });

  it("renders Previous disabled on page 1", () => {
    render(<Pagination page={1} totalPages={6} total={256} />);
    const prev = screen.getByLabelText("Previous page");
    expect(prev).toBeInTheDocument();
    const prevParent = prev.closest("span");
    expect(prevParent).toHaveAttribute("aria-disabled", "true");
  });

  it("renders Next as link when not on last page", () => {
    render(<Pagination page={1} totalPages={6} total={256} />);
    const next = screen.getByLabelText("Next page");
    expect(next).toBeInTheDocument();
    expect(next).toHaveAttribute("href", "/?page=2");
  });

  it("uses basePath for links", () => {
    render(<Pagination page={2} totalPages={6} total={256} basePath="/groups" />);
    expect(screen.getByLabelText("Previous page")).toHaveAttribute("href", "/groups?page=1");
    expect(screen.getByLabelText("Next page")).toHaveAttribute("href", "/groups?page=3");
  });
});
