"use client";

import { useCallback, useState } from "react";
import { HOURLY_WAGE_STORAGE_KEY } from "@/lib/constants";
import { useLocalStorage } from "./useLocalStorage";

type UseHourlyWageResult = {
  /** The confirmed hourly wage, or `null` before the visitor has set one. */
  wage: number | null;
  /** The raw text of the (unconfirmed) wage input field. */
  wageInput: string;
  setWageInput: (value: string) => void;
  /** Parses `wageInput` and, if it's a positive number, confirms it as `wage`. */
  confirmWage: () => void;
  /** Clears the confirmed wage, prefilling the input with it for easy editing. */
  resetWage: () => void;
};

/**
 * Tracks the visitor's hourly wage across two pieces of state: the
 * confirmed `wage` (persisted to `localStorage`, so a returning visitor
 * doesn't have to re-enter it) and the free-typed `wageInput` they haven't
 * confirmed yet (deliberately not persisted - it's just a draft).
 */
export function useHourlyWage(): UseHourlyWageResult {
  const [wage, setWage] = useLocalStorage<number | null>(HOURLY_WAGE_STORAGE_KEY, null);
  const [wageInput, setWageInput] = useState("");

  const confirmWage = useCallback(() => {
    const parsed = parseFloat(wageInput);
    if (parsed > 0) setWage(parsed);
  }, [wageInput, setWage]);

  const resetWage = useCallback(() => {
    setWageInput(wage !== null ? String(wage) : "");
    setWage(null);
  }, [wage, setWage]);

  return { wage, wageInput, setWageInput, confirmWage, resetWage };
}
