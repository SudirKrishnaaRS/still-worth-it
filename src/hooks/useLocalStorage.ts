"use client";

import { useCallback, useSyncExternalStore } from "react";

type SetValue<T> = (value: T | ((previous: T) => T)) => void;

// One shared subscriber list per storage key, at module scope. This is what
// lets two different components reading the same key see each other's
// updates immediately, in the same tab — a plain per-hook useState couldn't
// do that, since each instance would own its own isolated copy.
const listenersByKey = new Map<string, Set<() => void>>();

function notify(key: string) {
  listenersByKey.get(key)?.forEach((listener) => listener());
}

function readValue<T>(key: string, initialValue: T): T {
  try {
    const stored = window.localStorage.getItem(key);
    return stored !== null ? (JSON.parse(stored) as T) : initialValue;
  } catch {
    return initialValue; // Unreadable storage (private browsing, corrupted value, etc.)
  }
}

/**
 * Persists a piece of state to `localStorage` under `key`, staying in sync
 * across every component reading that key — in this tab (via the shared
 * listener registry above) and in other tabs/windows (via the native
 * "storage" event).
 *
 * Built on `useSyncExternalStore`, React's dedicated hook for reading from
 * something that lives outside React (here, the browser's storage) without
 * the render-then-immediately-setState dance a `useEffect` version would
 * need — which also means it's safe to call during server rendering:
 * `getServerSnapshot` supplies `initialValue` there, and React swaps over to
 * the real stored value as soon as the client mounts.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!listenersByKey.has(key)) listenersByKey.set(key, new Set());
      listenersByKey.get(key)!.add(onStoreChange);

      const handleStorageEvent = (event: StorageEvent) => {
        if (event.key === key) onStoreChange();
      };
      window.addEventListener("storage", handleStorageEvent);

      return () => {
        listenersByKey.get(key)?.delete(onStoreChange);
        window.removeEventListener("storage", handleStorageEvent);
      };
    },
    [key],
  );

  const getSnapshot = useCallback(() => readValue(key, initialValue), [key, initialValue]);
  const getServerSnapshot = useCallback(() => initialValue, [initialValue]);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setStoredValue = useCallback<SetValue<T>>(
    (next) => {
      const resolved = next instanceof Function ? next(readValue(key, initialValue)) : next;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // Storage full, disabled, or otherwise unwritable — listeners are still
        // notified below so in-memory state stays consistent for this session.
      }
      notify(key);
    },
    [key, initialValue],
  );

  return [value, setStoredValue];
}
