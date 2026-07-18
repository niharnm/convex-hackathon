import { expect, test } from "@playwright/test";

test.describe("account entry", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/get-started");
  });

  test("keeps the customer path primary and the business path secondary", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "How are you using Vun?" }),
    ).toBeVisible();

    const userAction = page.getByTestId("continue-as-user");
    const businessAction = page.getByTestId("continue-as-business");

    await expect(userAction).toHaveAccessibleName("Continue as a user");
    await expect(businessAction).toHaveAccessibleName("Continue as a business");

    const userBox = await userAction.boundingBox();
    const businessBox = await businessAction.boundingBox();

    expect(userBox).not.toBeNull();
    expect(businessBox).not.toBeNull();
    expect(userBox!.width).toBeGreaterThan(businessBox!.width);
    expect(userBox!.height).toBeGreaterThan(businessBox!.height);
  });

  test("is keyboard ordered, non-emergency, and usable at 375px", async ({
    page,
  }, testInfo) => {
    const userAction = page.getByTestId("continue-as-user");
    const businessAction = page.getByTestId("continue-as-business");

    const actionOrder = await page
      .locator('[data-testid^="continue-as-"]')
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("data-testid")),
      );
    expect(actionOrder).toEqual(["continue-as-user", "continue-as-business"]);

    if (testInfo.project.name === "desktop") {
      await userAction.focus();
      await expect(userAction).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(businessAction).toBeFocused();
    }

    await expect(
      page.getByText("Vun is not an emergency service."),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });
});
