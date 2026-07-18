import { describe, expect, it } from "vitest";

import { isStaffUserId, parseStaffUserIds } from "@/lib/staff-access";

describe("staff access allowlist", () => {
  it("normalizes a comma-separated Clerk user ID list", () => {
    expect([
      ...parseStaffUserIds(" user_staff_1, user_staff_2, user_staff_1 "),
    ]).toEqual(["user_staff_1", "user_staff_2"]);
  });

  it("fails closed when the allowlist or current user is missing", () => {
    expect(isStaffUserId("user_customer", "")).toBe(false);
    expect(isStaffUserId(null, "user_staff_1")).toBe(false);
  });

  it("does not treat a public account as staff", () => {
    expect(isStaffUserId("user_customer", "user_staff_1,user_staff_2")).toBe(
      false,
    );
    expect(isStaffUserId("user_staff_2", "user_staff_1,user_staff_2")).toBe(
      true,
    );
  });
});
