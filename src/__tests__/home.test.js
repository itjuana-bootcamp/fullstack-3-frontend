import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages/index";

jest.mock("next/router", () => require("next-router-mock"));

describe("Home page", () => {
  it("renders a heading with the portfolio owner name", () => {
    render(<Home name="John Doe" />);

    const heading = screen.getByRole("heading", {
      name: "John Doe",
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders a summary with the portfolio owner summary", () => {
    render(<Home summary="Other value" />);

    const summary = screen.getByText("My summary");

    expect(summary).toBeInTheDocument();
  });

  // it should reander a name when something happend
});
