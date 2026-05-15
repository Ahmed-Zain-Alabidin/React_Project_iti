import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import styles from "./Nav.module.css";

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
    <nav className={styles.navbar} id="main-navbar">
      <div className={`${styles.navbarContainer} container`}>
        {/* Logo */}
        <Link to="/" className={styles.navbarLogo} id="navbar-logo">
          <span>SOUQ</span>
        </Link>

        {/* Hamburger for mobile */}
        <button
          className={`${styles.navbarHamburger} ${menuOpen ? styles.active : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="navbar-hamburger"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Nav Links */}
        <div className={`${styles.navbarLinks} ${menuOpen ? styles.open : ""}`}>
          <Link
            to="/"
            className={styles.navLink}
            id="nav-home"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <div className={styles.navUserInfo}>
                <div className={styles.navAvatar} id="nav-avatar">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className={styles.navUsername}>{user?.name}</span>
              </div>
              <button
                className={`${styles.navBtn} ${styles.navBtnOutline}`}
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
                className={styles.navLink}
                id="nav-login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`${styles.navBtn} ${styles.navBtnPrimary}`}
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
