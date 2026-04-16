import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { AuthProvider } from "../context/AuthContext";

describe("LoginPage", () => {
  it("shows an error when submitting empty fields", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(
      screen.getByText("Email and password are required.")
    ).toBeInTheDocument();
  });
});