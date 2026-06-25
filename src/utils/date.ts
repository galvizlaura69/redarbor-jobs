/**
 * Formats an ISO date string into a localised, human-readable date.
 */
export function formatDate(
  dateString: string,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
): string {
  return new Date(dateString).toLocaleDateString(locale, options);
}
