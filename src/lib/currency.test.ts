import { afterEach, describe, expect, it, vi } from "vitest";

import { currencySymbol, detectCurrencyCode } from "./currency";

function mockLocale(language: string, languages: readonly string[] = [language]) {
  vi.spyOn(window.navigator, "language", "get").mockReturnValue(language);
  vi.spyOn(window.navigator, "languages", "get").mockReturnValue(languages);
}

describe("currencySymbol", () => {
  it("returns the symbol for a known currency code", () => {
    expect(currencySymbol("USD")).toBe("$");
    expect(currencySymbol("INR")).toBe("₹");
    expect(currencySymbol("AED")).toBe("د.إ");
  });
});

describe("detectCurrencyCode", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    ["en-US", "USD"],
    ["en-GB", "GBP"],
    ["en-IN", "INR"],
    ["ja-JP", "JPY"],
    ["de-DE", "EUR"],
    ["fr-FR", "EUR"],
    ["en-SG", "SGD"],
    ["ar-AE", "AED"],
  ] as const)("maps locale %s to currency %s", (locale, expected) => {
    mockLocale(locale);

    expect(detectCurrencyCode()).toBe(expected);
  });

  it("prefers the first entry in navigator.languages over navigator.language", () => {
    mockLocale("en-US", ["en-GB", "en-US"]);

    expect(detectCurrencyCode()).toBe("GBP");
  });

  it("falls back to USD for a region it doesn't recognize", () => {
    mockLocale("pt-BR");

    expect(detectCurrencyCode()).toBe("USD");
  });

  it("falls back to a manual region split when Intl.Locale is unavailable", () => {
    // Cast away the readonly modifier so this test can simulate an
    // environment without Intl.Locale support.
    const mutableIntl = Intl as { Locale?: typeof Intl.Locale };
    const originalLocale = mutableIntl.Locale;
    mutableIntl.Locale = undefined;
    mockLocale("en-GB");

    expect(detectCurrencyCode()).toBe("GBP");

    mutableIntl.Locale = originalLocale;
  });

  it("resolves a region-less locale via Intl.Locale's maximize()", () => {
    mockLocale("en");

    // "en" maximizes to "en-Latn-US" in every modern JS engine.
    expect(detectCurrencyCode()).toBe("USD");
  });
});
