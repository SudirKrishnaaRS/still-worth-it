"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react";
import { THEME_STORAGE_KEY } from "@/lib/constants";
import { useLocalStorage } from "./useLocalStorage";

export type Theme = "light" | "dark";

/**
 * Sets the `.dark` class on `<html>` synchronously, before React hydrates
 * or paints — otherwise a returning dark-mode visitor sees a flash of the
 * light theme every time the page loads. Injected as a raw inline
 * <script> in the root layout's <head> (see layout.tsx); kept as a plain
 * string, framework-free, because it runs before any of our JS bundle does.
 */
export const themeInitScript = `(function () {
  try {
    var stored = window.localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    var isDark = stored
      ? JSON.parse(stored) === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", isDark);
  } catch (e) {}
})();`;

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>(THEME_STORAGE_KEY, "light");

  // useLocalStorage's initialValue ("light") is only a placeholder for the
  // server-rendered pass. If the visitor has never chosen a theme before,
  // adopt their OS preference instead of silently forcing light mode.
  useEffect(() => {
    const hasStoredPreference = window.localStorage.getItem(THEME_STORAGE_KEY) !== null;
    if (!hasStoredPreference) {
      setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
    // Intentionally run once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((previous) => (previous === "dark" ? "light" : "dark"));
  }, [setTheme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return context;
}
