/**
 * Turns a duration in hours into a short, human-readable string, choosing
 * the coarsest unit that still reads naturally - minutes under an hour,
 * hours (plus leftover minutes) under a day, then days (plus leftover
 * hours) beyond that.
 *
 * @example formatDuration(0.75) // "45 minutes"
 * @example formatDuration(3.5) // "3 hours 30 min"
 * @example formatDuration(50) // "2 days 2 hrs"
 */
export function formatDuration(hours: number): string {
  if (!hours || hours <= 0) return "0 minutes";

  const totalMinutes = Math.round(hours * 60);
  if (totalMinutes < 60) {
    return `${totalMinutes} ${totalMinutes === 1 ? "minute" : "minutes"}`;
  }

  const wholeHours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (wholeHours < 24) {
    const result = `${wholeHours} ${wholeHours === 1 ? "hour" : "hours"}`;
    return minutes > 0 ? `${result} ${minutes} min` : result;
  }

  const days = Math.floor(wholeHours / 24);
  const remainingHours = wholeHours % 24;
  const result = `${days} ${days === 1 ? "day" : "days"}`;
  return remainingHours > 0
    ? `${result} ${remainingHours} ${remainingHours === 1 ? "hr" : "hrs"}`
    : result;
}

/**
 * Places a duration in hours against a familiar reference point - a coffee
 * break, a workday, a work week - assuming an 8 hour workday. Gives the
 * "of your life" number in the app some relatable context, rather than
 * just a raw hour count.
 *
 * @example contextLine(1) // "barely a blink"
 * @example contextLine(8) // "a full workday"
 * @example contextLine(100) // "2.5 work weeks"
 */
export function contextLine(hours: number): string {
  const workdays = hours / 8;

  if (workdays < 0.15) return "barely a blink";
  if (workdays < 0.5) return "a coffee break";
  if (workdays < 1) return "a chunk of a workday";
  if (workdays < 1.5) return "a full workday";
  if (workdays < 5) return `${roundToOneDecimal(workdays)} workdays`;
  if (workdays < 20) return `${roundToOneDecimal(workdays / 5)} work weeks`;
  return `${roundToOneDecimal(workdays / 20)} work months`;
}

function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}
