"use client";

import { useEffect } from "react";
import { CURRENCY_STORAGE_KEY, DEFAULT_CURRENCY } from "@/lib/constants";
import { detectCurrencyCode, type CurrencyCode } from "@/lib/currency";
import { useLocalStorage } from "./useLocalStorage";

type UseCurrencyResult = {
  currencyCode: CurrencyCode;
  setCurrencyCode: (code: CurrencyCode) => void;
};

/**
 * Tracks the visitor's chosen currency, defaulting to `DEFAULT_CURRENCY`
 * for the server-rendered pass (browser locale detection needs `navigator`,
 * which doesn't exist during SSR) and swapping to a locale-based guess on
 * mount if the visitor has never picked one themselves - mirrors `useTheme`'s
 * "OS preference on first visit, stored choice after that" pattern.
 */
export function useCurrency(): UseCurrencyResult {
  const [currencyCode, setCurrencyCode] = useLocalStorage<CurrencyCode>(
    CURRENCY_STORAGE_KEY,
    DEFAULT_CURRENCY,
  );

  useEffect(() => {
    const hasStoredPreference = window.localStorage.getItem(CURRENCY_STORAGE_KEY) !== null;
    if (!hasStoredPreference) {
      setCurrencyCode(detectCurrencyCode());
    }
    // Intentionally run once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { currencyCode, setCurrencyCode };
}
