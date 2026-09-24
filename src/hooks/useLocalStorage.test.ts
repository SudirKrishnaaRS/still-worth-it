import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns the initial value when nothing is stored yet", () => {
    const { result } = renderHook(() => useLocalStorage("wage", 25));

    expect(result.current[0]).toBe(25);
  });

  it("reads a previously stored value on mount", () => {
    window.localStorage.setItem("wage", JSON.stringify(50));

    const { result } = renderHook(() => useLocalStorage("wage", 25));

    expect(result.current[0]).toBe(50);
  });

  it("persists updates to localStorage and updates the returned value", () => {
    const { result } = renderHook(() => useLocalStorage("wage", 25));

    act(() => {
      result.current[1](40);
    });

    expect(result.current[0]).toBe(40);
    expect(window.localStorage.getItem("wage")).toBe(JSON.stringify(40));
  });

  it("supports a functional updater, like useState", () => {
    const { result } = renderHook(() => useLocalStorage("count", 1));

    act(() => {
      result.current[1]((previous) => previous + 1);
    });

    expect(result.current[0]).toBe(2);
  });

  it("falls back to the initial value when the stored value is malformed", () => {
    window.localStorage.setItem("wage", "{not valid json");

    const { result } = renderHook(() => useLocalStorage("wage", 25));

    expect(result.current[0]).toBe(25);
  });

  it("keeps two hooks reading the same key in sync within the same tab", () => {
    const first = renderHook(() => useLocalStorage("wage", 25));
    const second = renderHook(() => useLocalStorage("wage", 25));

    act(() => {
      first.result.current[1](60);
    });

    expect(first.result.current[0]).toBe(60);
    expect(second.result.current[0]).toBe(60);
  });
});
