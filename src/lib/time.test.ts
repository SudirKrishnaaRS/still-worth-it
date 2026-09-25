import { describe, expect, it } from "vitest";

import { contextLine, formatDuration } from "./time";

describe("formatDuration", () => {
  it.each([
    [0, "0 minutes"],
    [-1, "0 minutes"],
    [1 / 60, "1 minute"],
    [0.75, "45 minutes"], // 45 min
    [59 / 60, "59 minutes"],
    [1, "1 hour"],
    [1.5, "1 hour 30 min"],
    [2, "2 hours"],
    [3.5, "3 hours 30 min"], // 3 hrs 30 min
    [23.5, "23 hours 30 min"],
    [24, "1 day"], // 2 days boundary
    [25, "1 day 1 hr"],
    [48, "2 days"], // 2 days
    [50, "2 days 2 hrs"],
  ])("formats %s hours as %s", (hours, expected) => {
    expect(formatDuration(hours)).toBe(expected);
  });

  it("rounds to the nearest minute before choosing a unit", () => {
    expect(formatDuration(59.6 / 60)).toBe("1 hour");
  });
});

describe("contextLine", () => {
  it.each([
    [1, "barely a blink"], // 0.125 workdays
    [2, "a coffee break"], // 0.25 workdays
    [6, "a chunk of a workday"], // 0.75 workdays
    [8, "a full workday"], // 1 workday
    [10, "a full workday"], // 1.25 workdays
    [16, "2 workdays"], // 2 workdays
    [40, "1 work weeks"], // 5 workdays -> 1 work week
    [100, "2.5 work weeks"], // 12.5 workdays
    [200, "1.3 work months"], // 25 workdays -> 1.25 work months, rounded to one decimal
  ])("describes %s hours as %s", (hours, expected) => {
    expect(contextLine(hours)).toBe(expected);
  });
});
