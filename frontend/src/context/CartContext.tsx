import { createContext, useContext, useEffect, useReducer, type ReactNode } from "react";
import {
  getCart,
  addToCart as addToCartApi,
  updateCartItem as updateCartItemApi,
  removeCartItem as removeCartItemApi,
  clearCart as clearCartApi,
  type Cart,
} from "../services/cartService";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string;
  successMessage: string;
}

type CartAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Cart }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "SET_SUCCESS"; payload: string }
  | { type: "CLEAR_MESSAGES" };

const initialState: CartState = {
  cart: null,
  loading: true,
  error: "",
  successMessage: "",
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        cart: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SET_SUCCESS":
      return {
        ...state,
        successMessage: action.payload,
      };
    case "CLEAR_MESSAGES":
      return {
        ...state,
        error: "",
        successMessage: "",
      };
    default:
      return state;
  }
}

interface CartContextValue {
  cart: Cart | null;
  loading: boolean;
  error: string;
  successMessage: string;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  updateItem: (cartItemId: number, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  clearAll: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    async function loadCart() {
      dispatch({ type: "FETCH_START" });
      try {
        const cart = await getCart();
        dispatch({ type: "FETCH_SUCCESS", payload: cart });
      } catch {
        dispatch({ type: "FETCH_ERROR", payload: "Failed to load cart." });
      }
    }

    loadCart();
  }, []);

  const addItem = async (productId: number, quantity = 1) => {
    try {
      const cart = await addToCartApi(productId, quantity);
      dispatch({ type: "FETCH_SUCCESS", payload: cart });
      dispatch({ type: "SET_SUCCESS", payload: "Item added to cart." });
    } catch {
      dispatch({ type: "FETCH_ERROR", payload: "Failed to add item to cart." });
    }
  };

  const updateItem = async (cartItemId: number, quantity: number) => {
    try {
      const cart = await updateCartItemApi(cartItemId, quantity);
      dispatch({ type: "FETCH_SUCCESS", payload: cart });
      dispatch({ type: "SET_SUCCESS", payload: "Cart updated." });
    } catch {
      dispatch({ type: "FETCH_ERROR", payload: "Failed to update cart item." });
    }
  };

  const removeItem = async (cartItemId: number) => {
    try {
      const cart = await removeCartItemApi(cartItemId);
      dispatch({ type: "FETCH_SUCCESS", payload: cart });
      dispatch({ type: "SET_SUCCESS", payload: "Item removed from cart." });
    } catch {
      dispatch({ type: "FETCH_ERROR", payload: "Failed to remove item." });
    }
  };

  const clearAll = async () => {
    try {
      const cart = await clearCartApi();
      dispatch({ type: "FETCH_SUCCESS", payload: cart });
      dispatch({ type: "SET_SUCCESS", payload: "Cart cleared." });
    } catch {
      dispatch({ type: "FETCH_ERROR", payload: "Failed to clear cart." });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        loading: state.loading,
        error: state.error,
        successMessage: state.successMessage,
        addItem,
        updateItem,
        removeItem,
        clearAll,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}