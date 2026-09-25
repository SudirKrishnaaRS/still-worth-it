import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CURRENCY_STORAGE_KEY } from "@/lib/constants";
import { useCurrency } from "./useCurrency";

function mockLocale(language: string) {
  vi.spyOn(window.navigator, "language", "get").mockReturnValue(language);
  vi.spyOn(window.navigator, "languages", "get").mockReturnValue([language]);
}

describe("useCurrency", () => {
  beforeEach(() => {
    window.localStorage.clear();
    mockLocale("en-US");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("adopts the locale-detected currency on first visit (nothing stored yet)", () => {
    mockLocale("en-GB");

    const { result } = renderHook(() => useCurrency());

    expect(result.current.currencyCode).toBe("GBP");
  });

  it("prefers a previously saved choice over the current locale", () => {
    window.localStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify("INR"));
    mockLocale("en-GB"); // Locale says GBP, but the visitor already chose INR.

    const { result } = renderHook(() => useCurrency());

    expect(result.current.currencyCode).toBe("INR");
  });

  it("setCurrencyCode updates the value and persists the choice", () => {
    const { result } = renderHook(() => useCurrency());

    act(() => {
      result.current.setCurrencyCode("JPY");
    });

    expect(result.current.currencyCode).toBe("JPY");
    expect(window.localStorage.getItem(CURRENCY_STORAGE_KEY)).toBe(JSON.stringify("JPY"));
  });
});
