"use client";

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "link";

type ButtonProps = {
  variant?: ButtonVariant;
} & ComponentPropsWithoutRef<"button">;

const baseClasses =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

// "primary" mirrors the sticker-style button from the original design: a
// hard offset shadow in the current accent color that tucks in on
// hover/active. "secondary" is a lower-emphasis button for actions that
// shouldn't compete with the primary one - same border/padding shape, but
// a neutral fill instead of a solid color or shadow.
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "rounded-2xl border-2 border-ink bg-primary px-6 py-3 font-semibold text-primary-fg shadow-[4px_4px_0_0_var(--accent)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0",
  secondary:
    "rounded-lg border border-line bg-surface px-4 py-2 text-ink transition-colors hover:border-muted",
  link: "text-muted underline underline-offset-2 transition-colors hover:text-ink",
};

// Defaults to type="button" so a Button never accidentally submits a form
// it happens to live inside - only pass type="submit" when that's intended.
export function Button({ variant = "primary", type = "button", className, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  );
}
