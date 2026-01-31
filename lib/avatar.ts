/**
 * Default avatar paths (in public folder). Used when a group has no avatar set in the DB.
 */
const DEFAULT_AVATARS = ["/avatar-1.svg", "/avatar-2.svg", "/periskope-icon.svg"] as const;

/**
 * Returns the avatar URL for a group. If the group has an avatar path in the database,
 * that is returned (with a leading / if missing). Otherwise returns one of the three
 * default avatars deterministically based on group id so the same group always gets
 * the same fallback avatar.
 */
export function getAvatarUrl(avatar: string | null | undefined, groupId: number): string {
  if (avatar != null && avatar.trim() !== "") {
    return avatar.startsWith("/") ? avatar : `/${avatar}`;
  }
  const index = Math.abs(groupId) % DEFAULT_AVATARS.length;
  return DEFAULT_AVATARS[index];
}
