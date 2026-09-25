"use client";

import { useId, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  /** Accessible name for the select. Visually hidden, same as CurrencyInput. */
  label: string;
  options: SelectOption[];
} & Omit<ComponentPropsWithoutRef<"select">, "children">;

/**
 * A dropdown built from a plain list of options. Same hidden-label pattern
 * as CurrencyInput - accessible name via the label prop, no visible text
 * unless you add your own next to it.
 *
 * @example
 * <Select
 *   label="Currency"
 *   options={[
 *     { value: "USD", label: "$ USD" },
 *     { value: "EUR", label: "€ EUR" },
 *   ]}
 *   value={currency}
 *   onChange={(e) => setCurrency(e.target.value)}
 * />
 */
export function Select({ label, options, id, className, ...props }: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <>
      <label htmlFor={selectId} className="sr-only">
        {label}
      </label>
      <select
        id={selectId}
        className={cn(
          "rounded-lg border border-line bg-surface px-2 py-1 text-sm text-ink outline-none focus-visible:border-accent",
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
