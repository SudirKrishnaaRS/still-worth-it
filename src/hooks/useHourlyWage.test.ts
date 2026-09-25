import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { HOURLY_WAGE_STORAGE_KEY } from "@/lib/constants";
import { useHourlyWage } from "./useHourlyWage";

describe("useHourlyWage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("starts with no wage and an empty input when nothing is stored", () => {
    const { result } = renderHook(() => useHourlyWage());

    expect(result.current.wage).toBeNull();
    expect(result.current.wageInput).toBe("");
  });

  it("reads a previously confirmed wage from localStorage on mount", () => {
    window.localStorage.setItem(HOURLY_WAGE_STORAGE_KEY, JSON.stringify(25));

    const { result } = renderHook(() => useHourlyWage());

    expect(result.current.wage).toBe(25);
  });

  it("confirms a positive numeric input as the wage and persists it", () => {
    const { result } = renderHook(() => useHourlyWage());

    act(() => {
      result.current.setWageInput("40");
    });
    act(() => {
      result.current.confirmWage();
    });

    expect(result.current.wage).toBe(40);
    expect(window.localStorage.getItem(HOURLY_WAGE_STORAGE_KEY)).toBe(JSON.stringify(40));
  });

  it.each(["0", "-10", "", "not a number"])(
    "ignores an invalid wage input (%s)",
    (invalidInput) => {
      const { result } = renderHook(() => useHourlyWage());

      act(() => {
        result.current.setWageInput(invalidInput);
      });
      act(() => {
        result.current.confirmWage();
      });

      expect(result.current.wage).toBeNull();
    },
  );

  it("parses a leading number out of an input like '40/hr'", () => {
    const { result } = renderHook(() => useHourlyWage());

    act(() => {
      result.current.setWageInput("40/hr");
    });
    act(() => {
      result.current.confirmWage();
    });

    expect(result.current.wage).toBe(40);
  });

  it("resetWage clears the confirmed wage and prefills the input with it", () => {
    const { result } = renderHook(() => useHourlyWage());

    act(() => {
      result.current.setWageInput("30");
    });
    act(() => {
      result.current.confirmWage();
    });
    act(() => {
      result.current.resetWage();
    });

    expect(result.current.wage).toBeNull();
    expect(result.current.wageInput).toBe("30");
  });
});
