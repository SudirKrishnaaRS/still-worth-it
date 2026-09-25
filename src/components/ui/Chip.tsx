"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type ChipProps = {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

const baseClasses =
  "inline-flex items-center rounded-full border px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

/**
 * A small rounded pill. Give it an onClick and it becomes a real, clickable
 * toggle button (e.g. for preset options). Leave onClick out and it's just
 * a plain label with nothing to click (e.g. for showing a status).
 *
 * @example
 * <Chip onClick={() => setAmount(5)} selected={amount === 5}>Coffee - $5</Chip>
 * <Chip>≈ 2 workdays</Chip>
 */
export function Chip({ children, selected = false, onClick, className }: ChipProps) {
  const stateClasses = selected
    ? "border-accent bg-accent/10 text-accent"
    : "border-line bg-surface text-ink";
  const classes = cn(baseClasses, stateClasses, className);

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-pressed={selected} className={classes}>
        {children}
      </button>
    );
  }

  return <span className={classes}>{children}</span>;
}
