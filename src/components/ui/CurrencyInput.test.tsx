import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CurrencyInput } from "./CurrencyInput";

describe("CurrencyInput", () => {
  it("exposes an accessible name via its label, even though the label is visually hidden", () => {
    render(<CurrencyInput label="Hourly wage" currencySymbol="$" value="" onChange={() => {}} />);

    expect(screen.getByRole("spinbutton", { name: "Hourly wage" })).toBeInTheDocument();
  });

  it("displays the currency symbol", () => {
    render(<CurrencyInput label="Hourly wage" currencySymbol="€" value="" onChange={() => {}} />);

    expect(screen.getByText("€")).toBeInTheDocument();
  });

  it("calls onChange as the user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<CurrencyInput label="Hourly wage" currencySymbol="$" value="" onChange={onChange} />);

    await user.type(screen.getByRole("spinbutton", { name: "Hourly wage" }), "25");

    expect(onChange).toHaveBeenCalled();
  });
});
