/**
 * Formats a timestamp into a short time ago string.
 *
 * - Returns minutes ago if less than 60 minutes (e.g., "5m ago")
 * - Returns hours ago if less than 24 hours (e.g., "3h ago")
 * - Returns days ago if 24 hours or more (e.g., "2d ago")
 *
 * @param timeStamp - Unix timestamp in milliseconds
 * @returns Formatted time ago string
 */
export const getShortTimeAgo = (timeStamp: number): string => {
  const diffMs = Date.now() - timeStamp;

  const diffMins = Math.floor(diffMs / (1000 * 60));
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};
