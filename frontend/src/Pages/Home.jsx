import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero-bg-grid" />
        <div className="hero-content container">
          <div className="hero-text">
            
            <h1 className="hero-title">
              Discover
              <span className="hero-title-gradient"> Premium </span>
              Products
            </h1>
            <p className="hero-description">
              Explore our curated collection of premium products. From fashion to electronics,
              find everything you need with unbeatable quality and style.
            </p>
            <div className="hero-actions">
              {isAuthenticated ? (
                <Link to="/" className="btn btn-primary btn-lg" id="hero-shop-btn">
                  Shop Now
                  <span className="btn-arrow">→</span>
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg" id="hero-get-started-btn">
                    Get Started
                    <span className="btn-arrow">→</span>
                  </Link>
                  <Link to="/login" className="btn btn-ghost btn-lg" id="hero-login-btn">
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Customers</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-number">99%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hero-visual">
            <img src="/hero-image.png" alt="Premium E-commerce Products" className="hero-image" />
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="categories-section" id="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Find exactly what you're looking for</p>
          </div>
          <div className="categories-grid">
            {[
              { name: "Clothes", count: "2,500+" },
              { name: "Makeup", count: "1,200+" },
              { name: "Phones", count: "800+" },
              { name: "Electronics", count: "3,100+" },
              { name: "Accessories", count: "1,800+" },
              { name: "Other", count: "950+" },
            ].map((cat) => (
              <div className="category-card" key={cat.name} id={`category-${cat.name.toLowerCase()}`}>
                <h3 className="category-name">{cat.name}</h3>
                <p className="category-count">{cat.count} items</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Banner for authenticated users */}
      {isAuthenticated && (
        <section className="welcome-banner" id="welcome-banner">
          <div className="container">
            <div className="welcome-content">
              <h2>Welcome back, {user?.name}! 👋</h2>
              <p>Ready to discover something new today?</p>
            </div>
          </div>
        </section>
      )}


    </div>
  );
};

export default Home;
