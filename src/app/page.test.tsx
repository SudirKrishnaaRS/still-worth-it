import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ThemeProvider } from "@/hooks/useTheme";

import Home from "./page";

// A deliberately trivial first test: it exists only to prove the pipeline
// (Vitest + jsdom + React Testing Library + the "@/*" path alias) actually
// works end to end, before we build anything real on top of it. Wrapped in
// ThemeProvider because that's how RootLayout renders this page for real —
// Home itself pulls in ThemeToggle, which needs that context.
describe("Home", () => {
  it("renders the placeholder text", () => {
    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>,
    );

    expect(screen.getByText("Hello world!")).toBeInTheDocument();
  });
});
