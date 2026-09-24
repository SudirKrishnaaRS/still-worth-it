// Runs once before the test suite. Adds jest-dom's matchers (toBeInTheDocument,
// toHaveTextContent, etc.) to Vitest's `expect`, so component tests can assert
// against the rendered DOM in plain English instead of raw node inspection.
import "@testing-library/jest-dom/vitest";
