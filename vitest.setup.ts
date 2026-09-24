// Runs once before the test suite. Adds jest-dom's matchers (toBeInTheDocument,
// toHaveTextContent, etc.) to Vitest's `expect`, so component tests can assert
// against the rendered DOM in plain English instead of raw node inspection.
import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement window.matchMedia at all — anything that reads
// the OS color-scheme preference (useTheme) would throw without this.
// Defaults to "no system preference matched"; individual tests override
// it with vi.spyOn when they need to simulate a specific preference.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}
