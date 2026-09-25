import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders its children as an accessible button", () => {
    render(<Button>Start converting</Button>);

    expect(screen.getByRole("button", { name: "Start converting" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Save
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("defaults to type=button so it never accidentally submits a form", () => {
    render(<Button>Go</Button>);

    expect(screen.getByRole("button", { name: "Go" })).toHaveAttribute("type", "button");
  });

  it("lets a caller opt into type=submit explicitly", () => {
    render(<Button type="submit">Confirm</Button>);

    expect(screen.getByRole("button", { name: "Confirm" })).toHaveAttribute("type", "submit");
  });
});
