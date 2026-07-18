import { expect, test } from "@playwright/test";

test("public home explains the human-backed handoff", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "One request. A clearer path to local help.",
    }),
  ).toBeVisible();
  const requestLink = page.getByRole("link", { name: "Request help" }).first();
  await expect(requestLink).toBeVisible();
  await expect(requestLink).toHaveAttribute("href", "/get-started");
  await expect(page.getByText("This is not an emergency line.")).toBeVisible();
});

test("unconfigured staff routes do not expose operations", async ({ page }) => {
  await page.goto("/ops/requests");

  await expect(page).toHaveURL(/\/setup$/);
  await expect(page.getByText("Account access stays locked")).toBeVisible();
});
