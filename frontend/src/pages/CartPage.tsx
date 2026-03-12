import { useState } from "react";
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { useCartContext } from "../context/CartProvider";

interface FormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
}

function CartPage() {
  const { state, cartTotal, dispatch } = useCartContext();

  // Form state
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  function validate(data: FormData): FormErrors {
    const errs: FormErrors = {};
    if (data.fullName.trim().length < 2) errs.fullName = "Full name must be at least 2 characters.";
    if (!data.email.includes("@")) errs.email = "Please enter a valid email address.";
    if (data.address.trim().length < 5) errs.address = "Address must be at least 5 characters.";
    if (!data.city.trim()) errs.city = "City is required.";
    if (!data.state) errs.state = "Please select a state.";
    if (!/^\d{5}$/.test(data.zip)) errs.zip = "Zip code must be 5 digits.";
    return errs;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched.has(name)) {
      setErrors(validate({ ...formData, [name]: value }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name } = e.target;
    setTouched((prev) => new Set(prev).add(name));
    setErrors(validate(formData));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = new Set(Object.keys(formData));
    setTouched(allTouched);
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      dispatch({ type: "CLEAR_CART" });
      setIsProcessing(false);
      setOrderSuccess(true);
    }, 1500);
  }

  function fieldError(name: keyof FormErrors) {
    return touched.has(name) && errors[name] ? (
      <span role="alert" id={`${name}-error`} style={styles.error}>
        {errors[name]}
      </span>
    ) : null;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Cart</h1>
      <Link to="/" style={styles.backLink}>← Continue Shopping</Link>

      {state.items.length === 0 && !orderSuccess ? (
        <p style={styles.empty}>Your cart is empty.</p>
      ) : orderSuccess ? (
        <p style={styles.success}>🎉 Order placed! Thanks for shopping at Buckeye Marketplace.</p>
      ) : (
        <>
          {/* Cart Items */}
          <div style={styles.list}>
            {state.items.map((item) => (
              <div key={item.productId} style={styles.card}>
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.productName} style={styles.image} />
                )}
                <div style={styles.info}>
                  <h3 style={styles.title}>{item.productName}</h3>
                  <p style={styles.text}>Price: ${item.price.toFixed(2)}</p>

                  {/* Quantity selector */}
                  <div style={styles.qtyRow}>
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      disabled={item.quantity <= 1}
                      style={styles.qtyBtn}
                      onClick={() => dispatch({ type: "UPDATE_QUANTITY", productId: item.productId, quantity: item.quantity - 1 })}
                    >−</button>
                    <span style={styles.qty}>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      disabled={item.quantity >= 99}
                      style={styles.qtyBtn}
                      onClick={() => dispatch({ type: "UPDATE_QUANTITY", productId: item.productId, quantity: Math.min(99, item.quantity + 1) })}
                    >+</button>
                  </div>

                  <p style={styles.text}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    type="button"
                    style={styles.removeButton}
                    aria-label={`Remove ${item.productName} from cart`}
                    onClick={() => dispatch({ type: "REMOVE_FROM_CART", productId: item.productId })}
                  >Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.summary}>
            <h2>Total: ${cartTotal.toFixed(2)}</h2>
          </div>

          {/* Checkout Form */}
          <h2 style={styles.formHeading}>Checkout</h2>
          <form onSubmit={handleSubmit} noValidate style={styles.form}>

            <label style={styles.label}>Full Name
              <input name="fullName" type="text" value={formData.fullName}
                onChange={handleChange} onBlur={handleBlur}
                aria-invalid={touched.has("fullName") && !!errors.fullName}
                aria-describedby="fullName-error"
                style={styles.input} />
              {fieldError("fullName")}
            </label>

            <label style={styles.label}>Email
              <input name="email" type="email" value={formData.email}
                onChange={handleChange} onBlur={handleBlur}
                aria-invalid={touched.has("email") && !!errors.email}
                aria-describedby="email-error"
                style={styles.input} />
              {fieldError("email")}
            </label>

            <label style={styles.label}>Shipping Address
              <input name="address" type="text" value={formData.address}
                onChange={handleChange} onBlur={handleBlur}
                aria-invalid={touched.has("address") && !!errors.address}
                aria-describedby="address-error"
                style={styles.input} />
              {fieldError("address")}
            </label>

            <label style={styles.label}>City
              <input name="city" type="text" value={formData.city}
                onChange={handleChange} onBlur={handleBlur}
                aria-invalid={touched.has("city") && !!errors.city}
                aria-describedby="city-error"
                style={styles.input} />
              {fieldError("city")}
            </label>

            <label style={styles.label}>State
              <select name="state" value={formData.state}
                onChange={handleChange} onBlur={handleBlur}
                aria-invalid={touched.has("state") && !!errors.state}
                aria-describedby="state-error"
                style={styles.input}>
                <option value="">Select a state</option>
                <option value="OH">OH</option>
                <option value="CA">CA</option>
                <option value="NY">NY</option>
                <option value="TX">TX</option>
                <option value="FL">FL</option>
              </select>
              {fieldError("state")}
            </label>

            <label style={styles.label}>Zip Code
              <input name="zip" type="text" value={formData.zip}
                onChange={handleChange} onBlur={handleBlur}
                aria-invalid={touched.has("zip") && !!errors.zip}
                aria-describedby="zip-error"
                style={styles.input} />
              {fieldError("zip")}
            </label>

            <button
              type="submit"
              disabled={isProcessing || state.items.length === 0}
              style={styles.submitBtn}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </button>

          </form>
        </>
      )}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: { maxWidth: "800px", margin: "0 auto", padding: "32px 20px" },
  heading: { fontSize: "36px", marginBottom: "12px", color: "#bb0000" },
  backLink: { display: "inline-block", marginBottom: "24px", color: "#bb0000", textDecoration: "none", fontWeight: "bold" },
  empty: { fontSize: "18px", color: "#666" },
  success: { fontSize: "20px", color: "#2a7a2a", fontWeight: "bold", marginTop: "24px" },
  list: { display: "flex", flexDirection: "column", gap: "16px" },
  card: { display: "flex", gap: "16px", border: "1px solid #ddd", borderRadius: "8px", padding: "16px", backgroundColor: "#fff" },
  image: { width: "120px", height: "120px", objectFit: "cover", borderRadius: "8px" },
  info: { flex: 1 },
  title: { margin: "0 0 8px 0", fontSize: "18px" },
  text: { margin: "4px 0", color: "#444" },
  qtyRow: { display: "flex", alignItems: "center", gap: "8px", margin: "8px 0" },
  qtyBtn: { width: "28px", height: "28px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", background: "#fff" },
  qty: { fontSize: "16px", minWidth: "24px", textAlign: "center" },
  removeButton: { marginTop: "8px", padding: "6px 12px", backgroundColor: "#bb0000", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  summary: { marginTop: "24px", paddingTop: "16px", borderTop: "2px solid #ddd", marginBottom: "32px" },
  formHeading: { fontSize: "24px", marginBottom: "16px", color: "#bb0000" },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  label: { display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px", fontWeight: "bold" },
  input: { padding: "8px 12px", fontSize: "14px", border: "1px solid #ccc", borderRadius: "4px" },
  error: { color: "#bb0000", fontSize: "12px" },
  submitBtn: { padding: "12px", backgroundColor: "#bb0000", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", cursor: "pointer", marginTop: "8px" },
};

export default CartPage;