import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Home from "./page";

// A deliberately trivial first test: it exists only to prove the pipeline
// (Vitest + jsdom + React Testing Library + the "@/*" path alias) actually
// works end to end, before we build anything real on top of it.
describe("Home", () => {
  it("renders the placeholder text", () => {
    render(<Home />);

    expect(screen.getByText("Hello world!")).toBeInTheDocument();
  });
});
