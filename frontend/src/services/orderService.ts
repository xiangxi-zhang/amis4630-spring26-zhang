import { authorizedFetch } from "./authService";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export interface OrderItem {
  orderItemId: number;
  productId: number;
  title: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface Order {
  orderId: number;
  userId: string;
  orderDate: string;
  status: string;
  total: number;
  shippingAddress: string;
  confirmationNumber: string;
  items: OrderItem[];
}

export async function getMyOrders(): Promise<Order[]> {
  const response = await authorizedFetch(`${API_BASE}/Orders/mine`);

  if (!response.ok) {
    throw new Error("Failed to load orders.");
  }

  return response.json();
}

export async function placeOrder(shippingAddress: string): Promise<Order> {
  const response = await authorizedFetch(`${API_BASE}/Orders`, {
    method: "POST",
    body: JSON.stringify({ shippingAddress }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to place order.");
  }

  return response.json();
}