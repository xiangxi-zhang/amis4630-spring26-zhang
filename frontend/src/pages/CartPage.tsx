import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { useCart } from "../context/CartContext";

function CartPage() {
  const { cart, loading, error, successMessage, updateItem, removeItem, clearAll } = useCart();

  if (loading) {
    return <p style={styles.message}>Loading cart…</p>;
  }

  if (!cart) {
    return <p style={styles.message}>Cart unavailable.</p>;
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Your Shopping Cart</h1>

      {error && <p style={styles.error}>{error}</p>}
      {successMessage && <p style={styles.success}>{successMessage}</p>}

      {cart.items.length === 0 ? (
        <div style={styles.empty}>
          <p>Your cart is empty.</p>
          <Link to="/" style={styles.browseLink}>
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          {cart.items.map((item) => (
            <div key={item.cartItemId} style={styles.cartItem}>
              <img src={item.imageUrl} alt={item.title} style={styles.image} />

              <div style={styles.itemInfo}>
                <h3 style={styles.itemTitle}>{item.title}</h3>
                <p style={styles.itemPrice}>${item.price.toFixed(2)}</p>

                <div style={styles.quantityRow}>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => updateItem(item.cartItemId, Math.max(1, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>

                  <span style={styles.qtyText}>{item.quantity}</span>

                  <button
                    style={styles.qtyBtn}
                    onClick={() => updateItem(item.cartItemId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <p style={styles.lineTotal}>Subtotal: ${item.lineTotal.toFixed(2)}</p>
              </div>

              <button style={styles.removeBtn} onClick={() => removeItem(item.cartItemId)}>
                Remove
              </button>
            </div>
          ))}

          <div style={styles.summary}>
            <p style={styles.totalText}>
              Total ({cart.totalItems} items): <strong>${cart.totalAmount.toFixed(2)}</strong>
            </p>

            <button style={styles.clearBtn} onClick={clearAll}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "24px",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "24px",
    color: "#bb0000",
  },
  message: {
    textAlign: "center",
    marginTop: "60px",
    fontSize: "18px",
    color: "#666",
  },
  error: {
    color: "#b00020",
    marginBottom: "12px",
  },
  success: {
    color: "#2e7d32",
    marginBottom: "12px",
  },
  empty: {
    textAlign: "center",
    marginTop: "40px",
    color: "#666",
  },
  browseLink: {
    display: "inline-block",
    marginTop: "12px",
    color: "#bb0000",
    textDecoration: "none",
    fontWeight: "bold",
  },
  cartItem: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    padding: "16px 0",
    borderBottom: "1px solid #eee",
  },
  image: {
    width: "90px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    margin: "0 0 8px 0",
    fontSize: "18px",
  },
  itemPrice: {
    margin: "0 0 8px 0",
    color: "#666",
  },
  quantityRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "8px",
  },
  qtyBtn: {
    width: "32px",
    height: "32px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    cursor: "pointer",
    borderRadius: "4px",
  },
  qtyText: {
    minWidth: "24px",
    textAlign: "center",
    fontWeight: "bold",
  },
  lineTotal: {
    margin: 0,
    fontWeight: "bold",
  },
  removeBtn: {
    padding: "8px 12px",
    border: "1px solid #bb0000",
    backgroundColor: "#fff",
    color: "#bb0000",
    borderRadius: "4px",
    cursor: "pointer",
  },
  summary: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "24px",
    paddingTop: "16px",
  },
  totalText: {
    fontSize: "20px",
  },
  clearBtn: {
    padding: "10px 16px",
    border: "none",
    backgroundColor: "#bb0000",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default CartPage;