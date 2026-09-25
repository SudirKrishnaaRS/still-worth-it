"use client";

import { useId, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type CurrencyInputProps = {
  /** Accessible name for the input. Visually hidden - the surrounding
   * copy (e.g. a headline) carries the visible context instead. */
  label: string;
  currencySymbol: string;
} & Omit<ComponentPropsWithoutRef<"input">, "type">;

/**
 * A number input with a currency symbol shown next to it (e.g. "$"). The
 * label is only for screen readers - it's hidden visually, so pair this
 * with your own visible heading/copy around it.
 *
 * @example
 * <CurrencyInput
 *   label="Hourly wage"
 *   currencySymbol="$"
 *   value={wage}
 *   onChange={(e) => setWage(e.target.value)}
 * />
 */
export function CurrencyInput({
  label,
  currencySymbol,
  id,
  className,
  ...props
}: CurrencyInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      {/* Decorative: the label above already gives screen readers the real name. */}
      <span aria-hidden="true" className="font-display font-semibold text-ink">
        {currencySymbol}
      </span>
      <input
        id={inputId}
        type="number"
        inputMode="decimal"
        className="border-b-2 border-line bg-transparent font-display text-ink outline-none focus-visible:border-accent"
        {...props}
      />
    </div>
  );
}
