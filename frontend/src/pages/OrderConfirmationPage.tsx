import { Link, Navigate, useLocation } from "react-router-dom";
import type { CSSProperties } from "react";
import type { Order } from "../services/orderService";

type LocationState = {
  order?: Order;
};

function OrderConfirmationPage() {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const order = state?.order;

  if (!order) {
    return <Navigate to="/orders" replace />;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Order Confirmed</h1>
        <p style={styles.subtitle}>Your order was placed successfully.</p>

        <div style={styles.section}>
          <p style={styles.row}>
            <strong>Order #:</strong> {order.orderId}
          </p>
          <p style={styles.row}>
            <strong>Confirmation:</strong> {order.confirmationNumber}
          </p>
          <p style={styles.row}>
            <strong>Status:</strong> {order.status}
          </p>
          <p style={styles.row}>
            <strong>Total:</strong> ${order.total.toFixed(2)}
          </p>
          <p style={styles.row}>
            <strong>Shipping Address:</strong> {order.shippingAddress}
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Items</h2>

          {order.items.map((item) => (
            <div key={item.orderItemId} style={styles.itemRow}>
              <div>
                <p style={styles.itemTitle}>{item.title}</p>
                <p style={styles.itemMeta}>
                  Qty: {item.quantity} × ${item.unitPrice.toFixed(2)}
                </p>
              </div>

              <p style={styles.lineTotal}>${item.lineTotal.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div style={styles.actions}>
          <Link to="/orders" style={styles.linkButton}>
            View My Orders
          </Link>
          <Link to="/" style={styles.secondaryLink}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    padding: "24px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: "760px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "24px",
    boxSizing: "border-box",
  },
  title: {
    marginTop: 0,
    marginBottom: "8px",
    color: "#bb0000",
  },
  subtitle: {
    marginTop: 0,
    marginBottom: "20px",
    color: "#444",
  },
  section: {
    marginBottom: "20px",
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: "12px",
    color: "#bb0000",
    fontSize: "20px",
  },
  row: {
    margin: "8px 0",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    borderTop: "1px solid #eee",
    paddingTop: "12px",
    marginTop: "12px",
  },
  itemTitle: {
    margin: 0,
    fontWeight: "bold",
  },
  itemMeta: {
    margin: "4px 0 0 0",
    color: "#666",
  },
  lineTotal: {
    margin: 0,
    fontWeight: "bold",
  },
  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  linkButton: {
    display: "inline-block",
    padding: "12px 16px",
    backgroundColor: "#bb0000",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
  },
  secondaryLink: {
    display: "inline-block",
    padding: "12px 16px",
    border: "1px solid #bb0000",
    color: "#bb0000",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
  },
};

export default OrderConfirmationPage;