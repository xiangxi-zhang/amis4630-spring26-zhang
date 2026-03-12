import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react";
import type { CartState, CartAction } from "../types/cart";
import { cartReducer, initialCartState } from "../reducers/cartReducer";

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  cartItemCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const cartItemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const cartTotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items]
  );

  return (
    <CartContext.Provider value={{ state, dispatch, cartItemCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}