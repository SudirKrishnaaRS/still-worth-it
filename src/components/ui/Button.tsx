"use client";

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "link";

type ButtonProps = {
  variant?: ButtonVariant;
} & ComponentPropsWithoutRef<"button">;

const baseClasses =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

// What each variant looks like:
// - primary: solid fill + a bold offset shadow - the main action on screen.
// - secondary: outlined, quieter - for actions next to a primary button.
// - link: no border or fill, just underlined text - the lowest-emphasis option.
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "rounded-2xl border-2 border-ink bg-primary px-6 py-3 font-semibold text-primary-fg shadow-[4px_4px_0_0_var(--accent)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0",
  secondary:
    "rounded-lg border border-line bg-surface px-4 py-2 text-ink transition-colors hover:border-muted",
  link: "text-muted underline underline-offset-2 transition-colors hover:text-ink",
};

/**
 * A clickable button. Renders a real <button>, so every normal button prop
 * (onClick, disabled, etc.) just works.
 *
 * Defaults to type="button" so it never accidentally submits a form it
 * happens to live inside - only pass type="submit" when that's intended.
 *
 * @example
 * <Button onClick={handleSave}>Save</Button>
 * <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
 * <Button variant="link" onClick={handleSkip}>Skip for now</Button>
 */
export function Button({ variant = "primary", type = "button", className, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  );
}
