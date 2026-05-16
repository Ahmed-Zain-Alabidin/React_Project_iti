import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import API from "../api/axios";
import ProductCard from "../Components/ProductCard";
import ProductFormModal from "../Components/ProductFormModal";
import "./Products.css";

const CATEGORIES = ["All", "Clothes", "Makeup", "Phones", "Electronics", "Accessories", "Other"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A–Z" },
];

const Products = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [searchInput, setSearchInput] = useState("");

  // Admin modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = { sort };
      if (category !== "All") params.category = category;
      if (search) params.search = search;

      const { data } = await API.get("/products", { params });
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [category, search, sort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product.");
    }
  };

  const handleSave = (savedProduct) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p._id === savedProduct._id);
      if (exists) return prev.map((p) => (p._id === savedProduct._id ? savedProduct : p));
      return [savedProduct, ...prev];
    });
    setModalOpen(false);
    setEditProduct(null);
  };

  const openEdit = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const openCreate = () => {
    setEditProduct(null);
    setModalOpen(true);
  };

  return (
    <div className="products-page">
      <div className="container">

        {/* Page Header */}
        <div className="products-header">
          <div>
            <h1 className="products-title">Our Products</h1>
            <p className="products-subtitle">
              {loading ? "Loading..." : `${products.length} product${products.length !== 1 ? "s" : ""} found`}
            </p>
          </div>
          {isAdmin && (
            <button className="btn-add-product" onClick={openCreate}>
              + Add Product
            </button>
          )}
        </div>

        {/* Filters Bar */}
        <div className="filters-bar">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput && (
              <button className="search-clear" onClick={() => { setSearchInput(""); setSearch(""); }}>✕</button>
            )}
          </div>

          <div className="filter-group">
            <select
              className="filter-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content */}
        {error && (
          <div className="products-error">
            <span>⚠️ {error}</span>
            <button onClick={fetchProducts}>Retry</button>
          </div>
        )}

        {loading ? (
          <div className="products-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div className="product-skeleton" key={i}>
                <div className="skeleton-img" />
                <div className="skeleton-line" />
                <div className="skeleton-line short" />
                <div className="skeleton-line" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="products-empty">
            <span className="empty-icon">📦</span>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters.</p>
            {isAdmin && (
              <button className="btn-add-product" onClick={openCreate}>
                + Add First Product
              </button>
            )}
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                isAdmin={isAdmin}
                onEdit={openEdit}
                onDelete={handleDelete}
                onAddToCart={(product) => dispatch(addToCart(product))}
              />
            ))}
          </div>
        )}
      </div>

      {/* Admin Modal */}
      {modalOpen && (
        <ProductFormModal
          product={editProduct}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditProduct(null); }}
        />
      )}
    </div>
  );
};

export default Products;
