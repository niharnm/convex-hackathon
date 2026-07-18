export function parseStaffUserIds(rawValue: string | undefined): Set<string> {
  return new Set(
    (rawValue ?? "")
      .split(",")
      .map((userId) => userId.trim())
      .filter(Boolean),
  );
}

export function isStaffUserId(
  userId: string | null,
  rawValue = process.env.VUN_STAFF_USER_IDS,
): boolean {
  if (!userId) {
    return false;
  }

  return parseStaffUserIds(rawValue).has(userId);
}
