import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    await addItem(product.id, 1);
  };

  return (
    <Link to={`/products/${product.id}`} style={styles.link}>
      <div style={styles.card}>
        <img
          src={product.imageUrl}
          alt={product.title}
          style={styles.image}
        />

        <div style={styles.body}>
          <h3 style={styles.title}>{product.title}</h3>
          <p style={styles.price}>${product.price.toFixed(2)}</p>
          <p style={styles.meta}>{product.category}</p>
          <p style={styles.meta}>Sold by {product.sellerName}</p>

          <button style={styles.button} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}

const styles: Record<string, CSSProperties> = {
  link: {
    textDecoration: "none",
    color: "inherit",
    display: "block",
    width: "100%",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#fff",
    transition: "box-shadow 0.2s",
    cursor: "pointer",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  body: {
    padding: "12px",
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "16px",
  },
  price: {
    margin: "0 0 6px 0",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#bb0000",
  },
  meta: {
    margin: "0 0 4px 0",
    fontSize: "13px",
    color: "#666",
  },
  button: {
    marginTop: "12px",
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#bb0000",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default ProductCard;