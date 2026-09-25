import { COUNTRY_TO_CURRENCY, CURRENCY_SYMBOLS, DEFAULT_CURRENCY } from "./constants";

export type CurrencyCode =
  "USD" | "EUR" | "GBP" | "INR" | "JPY" | "AUD" | "CAD" | "SGD" | "CNY" | "AED";

export function currencySymbol(code: CurrencyCode): string {
  return CURRENCY_SYMBOLS[code];
}

/**
 * Reads the two-letter region out of a BCP 47 locale tag (e.g. "en-GB" -> "GB"),
 * preferring `Intl.Locale`'s `maximize()` - which fills in a region even for a
 * region-less tag like "en" (-> "en-Latn-US") - and falling back to a manual
 * split for environments where `Intl.Locale` isn't available.
 */
function regionFromLocale(locale: string): string | null {
  if (typeof Intl !== "undefined" && typeof Intl.Locale === "function") {
    try {
      const parsed = new Intl.Locale(locale);
      const maximized = parsed.maximize?.() ?? parsed;
      const region = maximized.region ?? parsed.region;
      if (region) return region;
    } catch {
      // Malformed locale string - fall through to the manual parse below.
    }
  }

  const [, region] = locale.split("-");
  return region ? region.toUpperCase() : null;
}

/**
 * Guesses the visitor's currency from their browser locale, so the price
 * input starts with a sensible symbol instead of always defaulting to USD.
 * Only ever a first guess - callers should let the visitor override it and
 * persist that choice (see `useCurrency`).
 */
export function detectCurrencyCode(): CurrencyCode {
  try {
    const locale = navigator.languages?.[0] ?? navigator.language ?? "en-US";
    const region = regionFromLocale(locale);
    if (region && region in COUNTRY_TO_CURRENCY) {
      return COUNTRY_TO_CURRENCY[region];
    }
  } catch {
    // No `navigator` (e.g. during server rendering) - fall back below.
  }
  return DEFAULT_CURRENCY;
}
