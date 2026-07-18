import { expect, test } from "@playwright/test";

test("public home explains the human-backed handoff", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "One request. A clearer path to local help." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Request help" }).first()).toBeVisible();
  await expect(page.getByText("This is not an emergency line.")).toBeVisible();
});

test("unconfigured staff routes do not expose operations", async ({ page }) => {
  await page.goto("/ops/requests");

  await expect(page).toHaveURL(/\/setup$/);
  await expect(page.getByText("Operations stay locked")).toBeVisible();
});
