import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Select } from "./Select";

const currencyOptions = [
  { value: "USD", label: "$ USD" },
  { value: "EUR", label: "€ EUR" },
];

describe("Select", () => {
  it("exposes an accessible name via its label", () => {
    render(<Select label="Currency" options={currencyOptions} value="USD" onChange={() => {}} />);

    expect(screen.getByRole("combobox", { name: "Currency" })).toBeInTheDocument();
  });

  it("renders every option", () => {
    render(<Select label="Currency" options={currencyOptions} value="USD" onChange={() => {}} />);

    expect(screen.getByRole("option", { name: "$ USD" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "€ EUR" })).toBeInTheDocument();
  });

  it("calls onChange when a new option is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select label="Currency" options={currencyOptions} value="USD" onChange={onChange} />);

    await user.selectOptions(screen.getByRole("combobox", { name: "Currency" }), "EUR");

    expect(onChange).toHaveBeenCalled();
  });
});
