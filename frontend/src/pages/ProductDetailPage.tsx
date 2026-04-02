import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { CSSProperties } from "react";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem, successMessage, error } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          setNotFound(true);
          setLoading(false);
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setProduct(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch product:", error);
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      await addItem(product.id, 1);
    }
  };

  if (loading) {
    return <p style={styles.message}>Loading product…</p>;
  }

  if (notFound || !product) {
    return (
      <div style={styles.page}>
        <p style={styles.message}>Product not found.</p>
        <Link to="/" style={styles.backLink}>← Back to all products</Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Link to="/" style={styles.backLink}>← Back to all products</Link>

      <div style={styles.detailCard}>
        <img
          src={product.imageUrl}
          alt={product.title}
          style={styles.image}
        />

        <div style={styles.info}>
          <h1 style={styles.title}>{product.title}</h1>

          <p style={styles.price}>${product.price.toFixed(2)}</p>

          <p style={styles.label}>
            Category: <span style={styles.value}>{product.category}</span>
          </p>

          <p style={styles.label}>
            Seller: <span style={styles.value}>{product.sellerName}</span>
          </p>

          <p style={styles.label}>
            Posted:{" "}
            <span style={styles.value}>
              {new Date(product.postedDate).toLocaleDateString()}
            </span>
          </p>

          <p style={styles.description}>{product.description}</p>

          <button style={styles.button} onClick={handleAddToCart}>
            Add to Cart
          </button>

          {successMessage && <p style={styles.success}>{successMessage}</p>}
          {error && <p style={styles.error}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    maxWidth: "720px",
    margin: "0 auto",
    padding: "24px",
  },
  backLink: {
    display: "inline-block",
    marginBottom: "20px",
    color: "#bb0000",
    textDecoration: "none",
    fontSize: "14px",
  },
  detailCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    maxHeight: "360px",
    objectFit: "cover",
  },
  info: {
    padding: "20px",
  },
  title: {
    margin: "0 0 12px 0",
    fontSize: "24px",
  },
  price: {
    margin: "0 0 16px 0",
    fontSize: "22px",
    fontWeight: "bold",
    color: "#bb0000",
  },
  label: {
    margin: "0 0 6px 0",
    fontSize: "14px",
    color: "#666",
  },
  value: {
    color: "#333",
  },
  description: {
    marginTop: "16px",
    marginBottom: "20px",
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#444",
  },
  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#bb0000",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
  },
  success: {
    marginTop: "12px",
    color: "#2e7d32",
  },
  error: {
    marginTop: "12px",
    color: "#b00020",
  },
  message: {
    textAlign: "center",
    marginTop: "60px",
    fontSize: "18px",
    color: "#666",
  },
};

export default ProductDetailPage;