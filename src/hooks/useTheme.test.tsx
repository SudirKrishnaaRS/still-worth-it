import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { THEME_STORAGE_KEY } from "@/lib/constants";
import { ThemeProvider, useTheme } from "./useTheme";

function mockSystemPreference(prefersDark: boolean) {
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        matches: query === "(prefers-color-scheme: dark)" && prefersDark,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList,
  );
}

describe("useTheme", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
    mockSystemPreference(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("throws when used outside a ThemeProvider", () => {
    expect(() => renderHook(() => useTheme())).toThrow(/ThemeProvider/);
  });

  it("defaults to light when there is no stored preference and no system preference", () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    expect(result.current.theme).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("adopts the OS dark preference on first visit (nothing stored yet)", () => {
    mockSystemPreference(true);

    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    expect(result.current.theme).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("prefers a previously saved choice over the current OS preference", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify("light"));
    mockSystemPreference(true); // OS says dark, but the visitor already chose light.

    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    expect(result.current.theme).toBe("light");
  });

  it("toggleTheme flips the theme, updates <html>, and persists the choice", () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe(JSON.stringify("dark"));

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
