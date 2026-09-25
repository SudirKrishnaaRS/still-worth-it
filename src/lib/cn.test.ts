import { describe, expect, it } from "vitest";

import { cn } from "./cn";

describe("cn", () => {
  it("joins plain class strings with a space", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("drops falsy values instead of including them literally", () => {
    expect(cn("a", undefined, null, false, "", "b")).toBe("a b");
  });

  it("supports clsx's conditional object syntax", () => {
    expect(cn("base", { active: true, hidden: false })).toBe("base active");
  });

  it("resolves conflicting Tailwind utilities so the last one wins", () => {
    expect(cn("bg-cta", "bg-red-500")).toBe("bg-red-500");
  });
});
