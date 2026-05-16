import { useState, useEffect } from "react";
import API from "../api/axios";
import styles from "./ProductFormModal.module.css";

const CATEGORIES = ["Clothes", "Makeup", "Phones", "Electronics", "Accessories", "Other"];
const SIZES = ["N/A", "XS", "S", "M", "L", "XL", "XXL"];

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  category: "Other",
  quantity: "",
  image: "",
  size: "N/A",
};

const ProductFormModal = ({ product, onSave, onClose }) => {
  const isEdit = !!product;
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price ?? "",
        category: product.category || "Other",
        quantity: product.quantity ?? "",
        image: product.image || "",
        size: product.size || "N/A",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setError("");
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    };

    try {
      let saved;
      if (isEdit) {
        const { data } = await API.put(`/products/${product._id}`, payload);
        saved = data;
      } else {
        const { data } = await API.post("/products", payload);
        saved = data;
      }
      onSave(saved);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label={isEdit ? "Edit Product" : "Add Product"}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{isEdit ? "Edit Product" : "Add New Product"}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>

        {error && <div className={styles.errorMsg}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="pf-name">Product Name *</label>
              <input
                id="pf-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Premium Sneakers"
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="pf-category">Category *</label>
              <select id="pf-category" name="category" value={form.category} onChange={handleChange} required>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="pf-description">Description *</label>
            <textarea
              id="pf-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the product..."
              rows={3}
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="pf-price">Price ($) *</label>
              <input
                id="pf-price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="pf-quantity">Quantity *</label>
              <input
                id="pf-quantity"
                name="quantity"
                type="number"
                min="0"
                value={form.quantity}
                onChange={handleChange}
                placeholder="0"
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="pf-size">Size</label>
              <select id="pf-size" name="size" value={form.size} onChange={handleChange}>
                {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="pf-image">Image URL</label>
            <input
              id="pf-image"
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className={styles.imagePreview}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            )}
          </div>

          <div className={styles.modalFooter}>
            <button type="button" className={styles.btnCancel} onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className={styles.btnSave} disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
