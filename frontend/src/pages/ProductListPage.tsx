import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
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
      <h1 style={styles.heading}>Buckeye Marketplace</h1>

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
  heading: {
    fontSize: "28px",
    marginBottom: "24px",
    color: "#bb0000",
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