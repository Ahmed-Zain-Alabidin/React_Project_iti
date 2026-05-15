import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();

  const categories = [
    { name: "Fashion", count: "2,847", image: "👔" },
    { name: "Electronics", count: "1,523", image: "💻" },
    { name: "Beauty", count: "986", image: "💄" },
    { name: "Home & Living", count: "1,234", image: "🏠" },
    { name: "Sports", count: "765", image: "⚽" },
    { name: "Books", count: "2,156", image: "📚" },
  ];

  const products = [
    { id: 1, name: "Premium Wireless Headphones", price: "$299", category: "Electronics", rating: "4.8" },
    { id: 2, name: "Designer Leather Jacket", price: "$459", category: "Fashion", rating: "4.9" },
    { id: 3, name: "Smart Watch Pro", price: "$399", category: "Electronics", rating: "4.7" },
    { id: 4, name: "Luxury Skincare Set", price: "$189", category: "Beauty", rating: "4.9" },
    { id: 5, name: "Running Shoes Elite", price: "$159", category: "Sports", rating: "4.6" },
    { id: 6, name: "Modern Table Lamp", price: "$89", category: "Home", rating: "4.8" },
  ];

  const features = [
    { icon: "🚚", title: "Free Shipping", desc: "On orders over $50" },
    { icon: "🔒", title: "Secure Payment", desc: "100% protected transactions" },
    { icon: "↩️", title: "Easy Returns", desc: "30-day return policy" },
    { icon: "💬", title: "24/7 Support", desc: "Dedicated customer service" },
  ];

  const brands = ["Nike", "Apple", "Samsung", "Adidas", "Sony", "Canon"];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-badge">New Arrivals 2026</span>
              <h1 className="hero-title">
                Discover Premium
                <br />
                Products for Your
                <br />
                <span className="hero-highlight">Lifestyle</span>
              </h1>
              <p className="hero-description">
                Shop the latest trends in fashion, electronics, and more. Quality products,
                competitive prices, and exceptional service.
              </p>
              <div className="hero-buttons">
                <Link to="/register" className="btn-hero-primary">
                  Start Shopping
                </Link>
                <Link to="/login" className="btn-hero-secondary">
                  Browse Collection
                </Link>
              </div>
            </div>

            <div className="hero-visual">
              <div className="product-card-showcase">
                <div className="showcase-card">
                  <div className="card-image-placeholder">📱</div>
                  <div className="card-info">
                    <h4>Latest Tech</h4>
                    <p>From $299</p>
                  </div>
                </div>
                <div className="showcase-card">
                  <div className="card-image-placeholder">👟</div>
                  <div className="card-info">
                    <h4>Premium Fashion</h4>
                    <p>From $89</p>
                  </div>
                </div>
                <div className="showcase-card">
                  <div className="card-image-placeholder">⌚</div>
                  <div className="card-info">
                    <h4>Smart Watches</h4>
                    <p>From $199</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="brands-section">
        <div className="container">
          <p className="brands-label">Trusted by leading brands</p>
          <div className="brands-grid">
            {brands.map((brand) => (
              <div key={brand} className="brand-item">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Explore our wide range of products</p>
          </div>
          <div className="categories-grid">
            {categories.map((cat) => (
              <div key={cat.name} className="category-card">
                <div className="category-icon">{cat.image}</div>
                <h3 className="category-name">{cat.name}</h3>
                <p className="category-count">{cat.count} Products</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Best Sellers</h2>
            <p className="section-subtitle">Our most popular products this month</p>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <div className="product-placeholder">Product Image</div>
                  <span className="product-badge">{product.category}</span>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-meta">
                    <span className="product-rating">⭐ {product.rating}</span>
                    <span className="product-price">{product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner">
        <div className="container">
          <div className="promo-content">
            <div className="promo-text">
              <h2 className="promo-title">Summer Sale</h2>
              <p className="promo-description">
                Get up to 50% off on selected items. Limited time offer.
              </p>
              <Link to="/register" className="btn-promo">
                Shop Sale
              </Link>
            </div>
            <div className="promo-visual">
              <div className="promo-badge">Up to 50% OFF</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Amazain</h2>
            <p className="section-subtitle">We're committed to providing the best shopping experience</p>
          </div>
          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2 className="newsletter-title">Stay Updated</h2>
              <p className="newsletter-description">
                Subscribe to our newsletter for exclusive deals and new arrivals.
              </p>
            </div>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="newsletter-button">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3 className="footer-logo">Amazain</h3>
              <p className="footer-tagline">
                Your trusted destination for premium products and exceptional service.
              </p>
            </div>
            <div className="footer-column">
              <h4 className="footer-heading">Shop</h4>
              <a href="#" className="footer-link">New Arrivals</a>
              <a href="#" className="footer-link">Best Sellers</a>
              <a href="#" className="footer-link">Sale</a>
              <a href="#" className="footer-link">Categories</a>
            </div>
            <div className="footer-column">
              <h4 className="footer-heading">Customer Service</h4>
              <a href="#" className="footer-link">Contact Us</a>
              <a href="#" className="footer-link">Shipping Info</a>
              <a href="#" className="footer-link">Returns</a>
              <a href="#" className="footer-link">FAQ</a>
            </div>
            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <a href="#" className="footer-link">About Us</a>
              <a href="#" className="footer-link">Careers</a>
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Amazain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
