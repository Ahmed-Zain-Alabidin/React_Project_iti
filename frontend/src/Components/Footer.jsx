import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <span className={styles.footerLogo}>SOUQ</span>
            <p className={styles.footerTagline}>Premium shopping experience, reimagined.</p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerCol}>
              <h4>Shop</h4>
              <Link to="#">New Arrivals</Link>
              <Link to="#">Best Sellers</Link>
              <Link to="#">Deals</Link>
            </div>
            <div className={styles.footerCol}>
              <h4>Support</h4>
              <Link to="#">Help Center</Link>
              <Link to="#">Returns</Link>
              <Link to="#">Contact</Link>
            </div>
            <div className={styles.footerCol}>
              <h4>Company</h4>
              <Link to="#">About</Link>
              <Link to="#">Careers</Link>
              <Link to="#">Privacy</Link>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} SOUQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
