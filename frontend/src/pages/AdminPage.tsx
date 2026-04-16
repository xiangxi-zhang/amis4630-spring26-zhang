import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  createProduct,
  deleteProduct,
  getAllOrders,
  getAllProducts,
  updateOrderStatus,
  updateProduct,
  type AdminProduct,
  type ProductInput,
} from "../services/adminService";
import type { Order } from "../services/orderService";

const emptyForm: ProductInput = {
  title: "",
  description: "",
  price: 0,
  category: "",
  sellerName: "",
  postedDate: new Date().toISOString(),
  imageUrl: "",
};

const statusOptions = ["Pending", "Paid", "Shipped", "Completed", "Cancelled"];

function AdminPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [productForm, setProductForm] = useState<ProductInput>(emptyForm);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [orderStatuses, setOrderStatuses] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const pageTitle = useMemo(
    () => (editingProductId ? "Edit Product" : "Create Product"),
    [editingProductId]
  );

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");
        const [productsData, ordersData] = await Promise.all([
          getAllProducts(),
          getAllOrders(),
        ]);

        setProducts(productsData);
        setOrders(ordersData);

        const statusMap: Record<number, string> = {};
        for (const order of ordersData) {
          statusMap[order.orderId] = order.status;
        }
        setOrderStatuses(statusMap);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load admin page.";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  function handleInputChange<K extends keyof ProductInput>(
    key: K,
    value: ProductInput[K]
  ) {
    setProductForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function resetForm() {
    setProductForm({
      ...emptyForm,
      postedDate: new Date().toISOString(),
    });
    setEditingProductId(null);
  }

  async function handleSubmitProduct() {
    try {
      setError("");
      setMessage("");

      if (!productForm.title.trim()) {
        setError("Title is required.");
        return;
      }

      if (editingProductId) {
        const existing = products.find((p) => p.id === editingProductId);
        if (!existing) {
          setError("Product not found for editing.");
          return;
        }

        const updated = await updateProduct(editingProductId, {
          ...existing,
          ...productForm,
          id: editingProductId,
        });

        setProducts((prev) =>
          prev.map((product) =>
            product.id === editingProductId ? updated : product
          )
        );
        setMessage("Product updated.");
      } else {
        const created = await createProduct(productForm);
        setProducts((prev) => [...prev, created].sort((a, b) => a.id - b.id));
        setMessage("Product created.");
      }

      resetForm();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save product.";
      setError(message);
    }
  }

  function handleEditProduct(product: AdminProduct) {
    setEditingProductId(product.id);
    setProductForm({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      sellerName: product.sellerName,
      postedDate: product.postedDate,
      imageUrl: product.imageUrl,
    });
    setMessage("");
    setError("");
  }

  async function handleDeleteProduct(productId: number) {
    try {
      setError("");
      setMessage("");
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((product) => product.id !== productId));

      if (editingProductId === productId) {
        resetForm();
      }

      setMessage("Product deleted.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete product.";
      setError(message);
    }
  }

  async function handleUpdateOrderStatus(orderId: number) {
    try {
      setError("");
      setMessage("");
      const status = orderStatuses[orderId];

      const updated = await updateOrderStatus(orderId, status);
      setOrders((prev) =>
        prev.map((order) => (order.orderId === orderId ? updated : order))
      );
      setOrderStatuses((prev) => ({
        ...prev,
        [orderId]: updated.status,
      }));
      setMessage(`Order #${orderId} updated.`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update order.";
      setError(message);
    }
  }

  if (loading) {
    return <div style={styles.page}>Loading admin dashboard...</div>;
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Admin Dashboard</h1>

      {message ? <p style={styles.success}>{message}</p> : null}
      {error ? <p style={styles.error}>{error}</p> : null}

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{pageTitle}</h2>

        <div style={styles.formGrid}>
          <input
            style={styles.input}
            placeholder="Title"
            value={productForm.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Category"
            value={productForm.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Seller Name"
            value={productForm.sellerName}
            onChange={(e) => handleInputChange("sellerName", e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Image URL"
            value={productForm.imageUrl}
            onChange={(e) => handleInputChange("imageUrl", e.target.value)}
          />
          <input
            style={styles.input}
            type="number"
            step="0.01"
            placeholder="Price"
            value={productForm.price}
            onChange={(e) => handleInputChange("price", Number(e.target.value))}
          />
          <input
            style={styles.input}
            type="datetime-local"
            value={productForm.postedDate.slice(0, 16)}
            onChange={(e) =>
              handleInputChange("postedDate", new Date(e.target.value).toISOString())
            }
          />
        </div>

        <textarea
          style={styles.textarea}
          placeholder="Description"
          value={productForm.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          rows={4}
        />

        <div style={styles.actionRow}>
          <button style={styles.primaryButton} onClick={handleSubmitProduct}>
            {editingProductId ? "Save Product" : "Create Product"}
          </button>

          {editingProductId ? (
            <button style={styles.secondaryButton} onClick={resetForm}>
              Cancel Edit
            </button>
          ) : null}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Manage Products</h2>

        <div style={styles.cardList}>
          {products.map((product) => (
            <div key={product.id} style={styles.card}>
              <div>
                <p style={styles.cardTitle}>
                  #{product.id} {product.title}
                </p>
                <p style={styles.cardMeta}>${product.price.toFixed(2)}</p>
                <p style={styles.cardMeta}>
                  {product.category} · {product.sellerName}
                </p>
              </div>

              <div style={styles.inlineActions}>
                <button
                  style={styles.secondaryButton}
                  onClick={() => handleEditProduct(product)}
                >
                  Edit
                </button>
                <button
                  style={styles.dangerButton}
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Manage Orders</h2>

        <div style={styles.cardList}>
          {orders.map((order) => (
            <div key={order.orderId} style={styles.card}>
              <div style={styles.orderTop}>
                <div>
                  <p style={styles.cardTitle}>Order #{order.orderId}</p>
                  <p style={styles.cardMeta}>
                    Confirmation: {order.confirmationNumber}
                  </p>
                  <p style={styles.cardMeta}>
                    Total: ${order.total.toFixed(2)}
                  </p>
                  <p style={styles.cardMeta}>
                    Shipping: {order.shippingAddress}
                  </p>
                </div>

                <div style={styles.inlineActions}>
                  <select
                    style={styles.select}
                    value={orderStatuses[order.orderId] ?? order.status}
                    onChange={(e) =>
                      setOrderStatuses((prev) => ({
                        ...prev,
                        [order.orderId]: e.target.value,
                      }))
                    }
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <button
                    style={styles.primaryButton}
                    onClick={() => handleUpdateOrderStatus(order.orderId)}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "24px",
  },
  title: {
    color: "#bb0000",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "28px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "20px",
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: "16px",
    color: "#bb0000",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "12px",
    marginBottom: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    marginBottom: "12px",
    resize: "vertical",
  },
  actionRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  primaryButton: {
    border: "none",
    backgroundColor: "#bb0000",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  secondaryButton: {
    border: "1px solid #bb0000",
    backgroundColor: "#fff",
    color: "#bb0000",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  dangerButton: {
    border: "none",
    backgroundColor: "#b00020",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  card: {
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "14px",
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    flexWrap: "wrap",
  },
  cardTitle: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "18px",
  },
  cardMeta: {
    margin: "6px 0 0 0",
    color: "#555",
  },
  inlineActions: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  orderTop: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    flexWrap: "wrap",
  },
  success: {
    color: "#2e7d32",
    marginBottom: "12px",
  },
  error: {
    color: "#b00020",
    marginBottom: "12px",
  },
};

export default AdminPage;