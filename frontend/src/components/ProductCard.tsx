import { useState } from "react";
import { Link } from "react-router-dom";
import type { CSSProperties, MouseEvent } from "react";
import type { Product } from "../types";
import { useCartContext } from "../context/CartProvider";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCartContext();
  const [added, setAdded] = useState(false);

  function handleAddToCart(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    dispatch({
      type: "ADD_TO_CART",
      productId: product.id,
      productName: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

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
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
            style={styles.button}
          >
            {added ? "Added!" : "Add to Cart"}
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
    marginTop: "8px",
    padding: "8px 16px",
    backgroundColor: "#bb0000",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    fontSize: "14px",
  },
};

export default ProductCard;