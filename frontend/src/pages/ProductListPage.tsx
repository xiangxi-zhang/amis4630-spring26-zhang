import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";
import { useCartContext } from "../context/CartProvider";

function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { cartItemCount } = useCartContext();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={styles.message}>Loading products…</p>;
  }

  if (products.length === 0) {
    return <p style={styles.message}>No products available right now.</p>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Buckeye Marketplace</h1>
        <Link
          to="/cart"
          style={styles.cartButton}
          aria-label={`Shopping cart with ${cartItemCount} items`}
        >
          🛒
          {cartItemCount > 0 && (
            <span style={styles.badge}>{cartItemCount}</span>
          )}
        </Link>
      </div>

      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    maxWidth: "960px",
    margin: "0 auto",
    padding: "24px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  heading: {
    fontSize: "28px",
    margin: 0,
    color: "#bb0000",
  },
  cartButton: {
    position: "relative",
    fontSize: "28px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px 8px",
    textDecoration: "none",
    color: "inherit",
  },
  badge: {
    position: "absolute",
    top: "-4px",
    right: "-4px",
    backgroundColor: "#bb0000",
    color: "#fff",
    borderRadius: "50%",
    fontSize: "12px",
    fontWeight: "bold",
    minWidth: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 4px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },
  message: {
    textAlign: "center",
    marginTop: "60px",
    fontSize: "18px",
    color: "#666",
  },
};

export default ProductListPage;