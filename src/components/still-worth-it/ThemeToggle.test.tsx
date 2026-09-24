import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { ThemeProvider } from "@/hooks/useTheme";

import { ThemeToggle } from "./ThemeToggle";

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("starts labeled for switching to dark mode when the theme is light", () => {
    renderToggle();

    expect(screen.getByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument();
  });

  it("flips its label and the document's dark class when clicked", async () => {
    const user = userEvent.setup();
    renderToggle();

    await user.click(screen.getByRole("button", { name: "Switch to dark mode" }));

    expect(screen.getByRole("button", { name: "Switch to light mode" })).toBeInTheDocument();
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    await user.click(screen.getByRole("button", { name: "Switch to light mode" }));

    expect(screen.getByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
