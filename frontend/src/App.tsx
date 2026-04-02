import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import type { CSSProperties } from "react";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import { CartProvider, useCart } from "./context/CartContext";

function Header() {
  const { cart } = useCart();

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        Buckeye Marketplace
      </Link>

      <Link to="/cart" style={styles.cartLink}>
        Cart ({cart?.totalItems ?? 0})
      </Link>
    </header>
  );
}

function AppContent() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

const styles: Record<string, CSSProperties> = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#bb0000",
    textDecoration: "none",
  },
  cartLink: {
    color: "#bb0000",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default App;