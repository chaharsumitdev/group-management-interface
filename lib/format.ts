/**
 * Format last_active (ISO timestamp) for display: "03:17", "Yesterday", or "Dec 22".
 */
export function formatLastActive(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  if (dayStart.getTime() === today.getTime()) {
    return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  }
  if (dayStart.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
