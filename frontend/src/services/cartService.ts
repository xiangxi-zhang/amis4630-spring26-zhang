import { authorizedFetch } from "./authService";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export interface CartItem {
  cartItemId: number;
  productId: number;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  lineTotal: number;
}

export interface Cart {
  cartId: number;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

export async function getCart(): Promise<Cart> {
  const response = await authorizedFetch(`${API_BASE}/cart`);
  if (!response.ok) {
    throw new Error("Failed to load cart");
  }
  return response.json();
}

export async function addToCart(productId: number, quantity = 1): Promise<Cart> {
  const response = await authorizedFetch(`${API_BASE}/cart`, {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });

  if (!response.ok) {
    throw new Error("Failed to add item to cart");
  }

  return response.json();
}

export async function updateCartItem(
  cartItemId: number,
  quantity: number
): Promise<Cart> {
  const response = await authorizedFetch(`${API_BASE}/cart/${cartItemId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error("Failed to update cart item");
  }

  return response.json();
}

export async function removeCartItem(cartItemId: number): Promise<Cart> {
  const response = await authorizedFetch(`${API_BASE}/cart/${cartItemId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to remove cart item");
  }

  return response.json();
}

export async function clearCart(): Promise<Cart> {
  const response = await authorizedFetch(`${API_BASE}/cart/clear`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to clear cart");
  }

  return response.json();
}