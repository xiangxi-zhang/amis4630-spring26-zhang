import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrderHistoryPage from "../pages/OrderHistoryPage";
import { vi } from "vitest";

vi.mock("../services/orderService", () => ({
  getMyOrders: vi.fn().mockResolvedValue([]),
}));

describe("OrderHistoryPage", () => {
  it('shows "You have no orders yet." when no orders exist', async () => {
    render(
      <MemoryRouter>
        <OrderHistoryPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("You have no orders yet.")).toBeInTheDocument();
    });
  });
});