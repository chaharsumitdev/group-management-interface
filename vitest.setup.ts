import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [k: string]: unknown;
  }) =>
    React.createElement("a", { href, ...props }, children),
}));
