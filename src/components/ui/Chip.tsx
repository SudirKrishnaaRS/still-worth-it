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

// Renders as a real toggle <button> when it's clickable (presets), or a
// plain <span> when it's just a status display (the duration context pill)
// - decided by whether an onClick was passed, not a separate "interactive"
// flag a caller could forget to set correctly.
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
