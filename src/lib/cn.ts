import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines conditional class names (via clsx) and resolves conflicting
 * Tailwind utilities so the last one wins (via tailwind-merge) - e.g. a
 * caller passing className="bg-red-500" cleanly overrides a component's own
 * bg-cta, instead of both classes landing in the DOM and leaving the result
 * to depend on unpredictable CSS cascade order.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
