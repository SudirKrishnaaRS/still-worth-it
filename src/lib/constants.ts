/**
 * Every constant and configurable value used across the app, in one place.
 * If a value could reasonably be tweaked (a localStorage key, a default,
 * a lookup table) it belongs here rather than inline in the file that
 * happens to use it first - so a dev can scan this single file to see
 * everything that's configurable, instead of hunting through components
 * and hooks for magic strings/numbers.
 */

import type { CurrencyCode } from "./currency";

// --- localStorage keys ---
// Prefixed with "swi-" (Still Worth It) to avoid colliding with keys from
// other apps that might share the same origin (e.g. on GitHub Pages).

/** Stores the visitor's light/dark theme choice. See `useTheme`. */
export const THEME_STORAGE_KEY = "swi-theme";

/** Stores the visitor's confirmed hourly wage. See `useHourlyWage`. */
export const HOURLY_WAGE_STORAGE_KEY = "swi-hourly-wage";

/** Stores the visitor's chosen currency. See `useCurrency`. */
export const CURRENCY_STORAGE_KEY = "swi-currency";

// --- Currency ---

/** The currency assumed when nothing is stored and locale detection fails. */
export const DEFAULT_CURRENCY: CurrencyCode = "USD";

/** Display symbol for each currency this app's picker offers. */
export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  JPY: "¥",
  AUD: "A$",
  CAD: "CA$",
  SGD: "S$",
  CNY: "¥",
  AED: "د.إ",
};

/**
 * Maps a browser locale's region to a currency, for `detectCurrencyCode`.
 * Deliberately small - just enough countries to cover the currencies this
 * app actually offers above
 */
export const COUNTRY_TO_CURRENCY: Record<string, CurrencyCode> = {
  US: "USD",
  GB: "GBP",
  IN: "INR",
  JP: "JPY",
  CN: "CNY",
  CA: "CAD",
  AU: "AUD",
  SG: "SGD",
  AE: "AED",
  DE: "EUR",
  FR: "EUR",
  ES: "EUR",
  IT: "EUR",
  NL: "EUR",
  PT: "EUR",
  IE: "EUR",
  AT: "EUR",
  BE: "EUR",
  FI: "EUR",
  GR: "EUR",
  LU: "EUR",
};
