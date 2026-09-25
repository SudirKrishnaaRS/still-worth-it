import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Chip } from "./Chip";

describe("Chip", () => {
  it("renders as plain text when there's no onClick", () => {
    render(<Chip>≈ 2 workdays</Chip>);

    expect(screen.getByText("≈ 2 workdays")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders as a toggle button when onClick is provided", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Chip onClick={onClick}>Coffee - $5</Chip>);

    const chip = screen.getByRole("button", { name: "Coffee - $5" });
    expect(chip).toHaveAttribute("aria-pressed", "false");

    await user.click(chip);

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("reflects the selected state via aria-pressed", () => {
    render(
      <Chip onClick={() => {}} selected>
        Lunch - $18
      </Chip>,
    );

    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });
});
