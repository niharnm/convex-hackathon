import { expect, test } from "@playwright/test";

test("public home starts a request and explains the managed handoff", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Home problem? Tell Vun once." }),
  ).toBeVisible();
  const requestLink = page.getByRole("link", { name: "Request help" }).first();
  await expect(requestLink).toBeVisible();
  await expect(requestLink).toHaveAttribute("href", "/get-started");
  await expect(
    page.getByText("Vun is not an emergency service.", { exact: true }).first(),
  ).toBeVisible();

  const rail = page
    .getByRole("list", { name: "Vun dispatch progress" })
    .first();
  await expect(rail.getByText("Request received")).toBeVisible();
  await expect(rail.getByText("Human review")).toBeVisible();
  await expect(rail.getByText("Provider contacted")).toBeVisible();
  await expect(rail.getByText("Scheduled")).toBeVisible();
});

test("home request starter validates inline and keeps a local draft", async ({
  page,
}) => {
  await page.goto("/");

  const form = page.locator("form").first();
  await form.getByRole("button", { name: "Request help" }).click();
  await expect(page.getByText("Enter a ZIP or postal code.")).toBeVisible();
  await expect(
    page.getByText("Tell us briefly what needs attention."),
  ).toBeVisible();

  await page.getByLabel("ZIP or postal code").fill("94582");
  await page.getByLabel("What needs fixing?").fill("Water under the sink");
  await form.getByRole("button", { name: "Request help" }).click();

  await expect(page).toHaveURL(/\/get-started$/);
  expect(
    await page.evaluate(() =>
      window.sessionStorage.getItem("vun-request-draft-v1"),
    ),
  ).toContain("Water under the sink");
});

test("service discovery is honest when no categories are configured", async ({
  page,
}) => {
  await page.goto("/#services");

  await expect(
    page.getByRole("heading", {
      name: "No service categories are published yet",
    }),
  ).toBeVisible();
  await expect(page.locator("#services")).not.toContainText("Plumbing");
  await expect(page.locator("#services")).not.toContainText("Electrical");
});

test("mobile navigation remains usable without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Request help" }).first(),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("reduced motion removes smooth scrolling and long transitions", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  const transitionDuration = await page
    .getByRole("link", { name: "Request help" })
    .first()
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(Number.parseFloat(transitionDuration)).toBeLessThan(0.001);
});

test("invalid tracking links fail closed with a helpful state", async ({
  page,
}) => {
  await page.goto("/r/not-a-valid-capability");

  await expect(
    page.getByRole("heading", { name: "This tracking link is not available" }),
  ).toBeVisible();
  await expect(page.getByText("No validated status to display")).toBeVisible();
  await expect(page.locator("body")).not.toContainText(
    "not-a-valid-capability",
  );
});

test("unconfigured staff routes do not expose operations or setup details", async ({
  page,
}) => {
  await page.goto("/ops/requests");

  await expect(page).toHaveURL(/\/setup$/);
  await expect(
    page.getByRole("heading", {
      name: "This account route is not available right now",
    }),
  ).toBeVisible();
  await expect(page.locator("body")).not.toContainText(".env.example");
  await expect(page.locator("body")).not.toContainText("VUN_STAFF_USER_IDS");
});
