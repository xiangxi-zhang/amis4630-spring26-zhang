import { useEffect, useState, type CSSProperties } from "react";
import { getMyOrders, type Order } from "../services/orderService";

function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        setIsLoading(true);
        setError("");
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load orders.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (isLoading) {
    return (
      <div style={styles.page}>
        <h2 style={styles.title}>My Orders</h2>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <h2 style={styles.title}>My Orders</h2>
        <p style={styles.error}>{error}</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>My Orders</h2>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div style={styles.list}>
          {orders.map((order) => (
            <div key={order.orderId} style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <p style={styles.label}>Order #{order.orderId}</p>
                  <p style={styles.meta}>
                    Confirmation: {order.confirmationNumber}
                  </p>
                  <p style={styles.meta}>
                    Date: {new Date(order.orderDate).toLocaleString()}
                  </p>
                </div>

                <div style={styles.rightSide}>
                  <span style={styles.status}>{order.status}</span>
                  <p style={styles.total}>${order.total.toFixed(2)}</p>
                </div>
              </div>

              <p style={styles.address}>
                Shipping Address: {order.shippingAddress}
              </p>

              <div style={styles.items}>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    padding: "24px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    color: "#bb0000",
    marginBottom: "20px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  card: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "16px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "12px",
  },
  label: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "18px",
  },
  meta: {
    margin: "4px 0 0 0",
    color: "#555",
  },
  rightSide: {
    textAlign: "right",
  },
  status: {
    display: "inline-block",
    backgroundColor: "#f3f3f3",
    borderRadius: "999px",
    padding: "6px 10px",
    fontWeight: "bold",
  },
  total: {
    margin: "8px 0 0 0",
    fontWeight: "bold",
    color: "#bb0000",
    fontSize: "18px",
  },
  address: {
    marginTop: 0,
    marginBottom: "12px",
  },
  items: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #eee",
    paddingTop: "10px",
    gap: "16px",
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
  error: {
    color: "#bb0000",
  },
};

export default OrderHistoryPage;