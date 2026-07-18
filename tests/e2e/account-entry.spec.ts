import { expect, test } from "@playwright/test";

test.describe("account entry", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/get-started");
  });

  test("keeps the customer path primary and the provider path secondary", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "What do you need from Vun?" }),
    ).toBeVisible();

    const customerAction = page.getByTestId("request-help");
    const providerAction = page.getByTestId("apply-as-provider");

    await expect(customerAction).toHaveAccessibleName("Request help");
    await expect(providerAction).toHaveAccessibleName("Apply as a provider");

    const customerBox = await customerAction.boundingBox();
    const providerBox = await providerAction.boundingBox();

    expect(customerBox).not.toBeNull();
    expect(providerBox).not.toBeNull();
    expect(customerBox!.width).toBeGreaterThan(providerBox!.width);
    expect(customerBox!.height).toBeGreaterThan(providerBox!.height);
  });

  test("is keyboard ordered, non-emergency, and usable at 375px", async ({
    page,
  }, testInfo) => {
    const customerAction = page.getByTestId("request-help");
    const providerAction = page.getByTestId("apply-as-provider");

    const actionOrder = await page
      .locator("[data-testid]")
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("data-testid")),
      );
    expect(actionOrder).toEqual(["request-help", "apply-as-provider"]);

    if (testInfo.project.name === "desktop") {
      await customerAction.focus();
      await expect(customerAction).toBeFocused();
      expect(
        await customerAction.evaluate((element) => {
          const style = getComputedStyle(element);
          return style.outlineStyle !== "none" || style.boxShadow !== "none";
        }),
      ).toBe(true);
      await page.keyboard.press("Tab");
      await expect(providerAction).toBeFocused();
    }

    await expect(
      page
        .getByText("Vun is not an emergency service.", { exact: true })
        .first(),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });

  test("unconfigured entry gives safe guidance without developer setup details", async ({
    page,
  }) => {
    await page.getByTestId("request-help").click();

    await expect(page).toHaveURL(/\/setup\?intent=request$/);
    await expect(
      page.getByRole("heading", {
        name: "This account route is not available right now",
      }),
    ).toBeVisible();
    await expect(page.locator("body")).not.toContainText(".env.example");
    await expect(page.locator("body")).not.toContainText("Clerk");
    await expect(page.locator("body")).not.toContainText("issuer");
    await expect(page.locator("body")).not.toContainText("allowlist");
  });
});
