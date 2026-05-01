import { authorizedFetch } from "./authService";
import type { Order } from "./orderService";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export interface AdminProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  sellerName: string;
  postedDate: string;
  imageUrl: string;
}

export interface ProductInput {
  title: string;
  description: string;
  price: number;
  category: string;
  sellerName: string;
  postedDate: string;
  imageUrl: string;
}

export async function getAllProducts(): Promise<AdminProduct[]> {
  const response = await authorizedFetch(`${API_BASE}/Products`);

  if (!response.ok) {
    throw new Error("Failed to load products.");
  }

  return response.json();
}

export async function createProduct(product: ProductInput): Promise<AdminProduct> {
  const response = await authorizedFetch(`${API_BASE}/Products`, {
    method: "POST",
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to create product.");
  }

  return response.json();
}

export async function updateProduct(
  id: number,
  product: AdminProduct
): Promise<AdminProduct> {
  const response = await authorizedFetch(`${API_BASE}/Products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to update product.");
  }

  return response.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const response = await authorizedFetch(`${API_BASE}/Products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to delete product.");
  }
}

export async function getAllOrders(): Promise<Order[]> {
  const response = await authorizedFetch(`${API_BASE}/Orders`);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to load admin orders.");
  }

  return response.json();
}

export async function updateOrderStatus(
  orderId: number,
  status: string
): Promise<Order> {
  const response = await authorizedFetch(`${API_BASE}/Orders/${orderId}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to update order status.");
  }

  return response.json();
}