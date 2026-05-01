import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import type { CSSProperties } from "react";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider, useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";

function Header() {
  const { cart } = useCart();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        Buckeye Marketplace
      </Link>

      <div style={styles.nav}>
        <Link to="/" style={styles.navLink}>
          Products
        </Link>

        <Link to="/cart" style={styles.navLink}>
          Cart ({cart?.totalItems ?? 0})
        </Link>

        {isAuthenticated ? (
          <>
            <Link to="/orders" style={styles.navLink}>
              My Orders
            </Link>
            <Link to="/admin" style={styles.navLink}>
              Admin
            </Link>
            <button onClick={logout} style={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.navLink}>
              Login
            </Link>
            <Link to="/register" style={styles.navLink}>
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

function AppContent() {
  return (
    <BrowserRouter basename="/amis4630-spring26-zhang">
      <Header />
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-confirmation"
          element={
            <ProtectedRoute>
              <OrderConfirmationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
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
    gap: "16px",
    flexWrap: "wrap",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#bb0000",
    textDecoration: "none",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  navLink: {
    color: "#bb0000",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
  },
  logoutButton: {
    border: "none",
    backgroundColor: "#bb0000",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default App;