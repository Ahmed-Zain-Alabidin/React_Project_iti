import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Nav = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-container container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" id="navbar-logo">
          <span className="logo-icon">◆</span>
          <span className="logo-text">Amazain</span>
        </Link>

        {/* Hamburger for mobile */}
        <button
          className={`navbar-hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="navbar-hamburger"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Nav Links */}
        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-link" id="nav-home" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <div className="nav-user-info">
                <div className="nav-avatar" id="nav-avatar">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="nav-username">{user?.name}</span>
              </div>
              <button
                className="nav-btn nav-btn-outline"
                onClick={handleLogout}
                id="nav-logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="nav-link"
                id="nav-login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="nav-btn nav-btn-primary"
                id="nav-register-btn"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
