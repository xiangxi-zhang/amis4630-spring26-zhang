import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";

describe("ProtectedRoute", () => {
  it("redirects unauthenticated users to login", () => {
    localStorage.removeItem("token");

    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <div>Secret Cart</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});