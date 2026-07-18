import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { CustomerIntake } from "@/components/customer-intake";
import { requestDraftStorageKey } from "@/lib/request-draft";

describe("CustomerIntake", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("requires the emergency screen before any later request state", async () => {
    const user = userEvent.setup();
    render(<CustomerIntake />);

    expect(
      screen.getByRole("heading", { name: "Is anyone in immediate danger?" }),
    ).toBeVisible();
    expect(
      screen.queryByText("Online requests are not open yet"),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(
      screen.getByText("Choose the option that matches the situation."),
    ).toBeVisible();
  });

  it("stops emergency requests without asking for personal details", async () => {
    const user = userEvent.setup();
    render(<CustomerIntake />);

    await user.click(screen.getByLabelText(/^Yes, there is immediate danger/));
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(
      screen.getByRole("heading", { name: "Contact emergency services now" }),
    ).toBeVisible();
    expect(
      screen.getByText(/No personal details were requested/),
    ).toBeVisible();
  });

  it("keeps the draft local and reports that no request was submitted", async () => {
    const user = userEvent.setup();
    window.sessionStorage.setItem(
      requestDraftStorageKey,
      JSON.stringify({
        need: "Water under the sink",
        postalCode: "94582",
        version: 1,
      }),
    );
    render(<CustomerIntake />);

    await user.click(screen.getByLabelText(/^No immediate danger/));
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(
      screen.getByRole("heading", { name: "Online requests are not open yet" }),
    ).toBeVisible();
    expect(screen.getByText("Water under the sink")).toBeVisible();
    expect(
      screen.getByText(
        /No provider was contacted and no request was created\./,
      ),
    ).toBeVisible();
  });
});
