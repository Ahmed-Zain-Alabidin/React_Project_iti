import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/cart.module.css";

const EmptyCart = () => {
  return (
    <div
      className={styles.emptyCartContainer}
      role="status"
      aria-label="Empty cart"
    >
      <div className={styles.emptyCartContent}>
        <div className={styles.emptyCartIcon} aria-hidden="true">
          🛒
        </div>
        <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
        <p className={styles.emptyCartDescription}>
          Looks like you haven't added anything to your cart yet.
        </p>
        <div className={styles.emptyCartActions}>
          <Link to="/products" className={styles.startShoppingBtn}>
            <span>Start Shopping</span>
            <span className={styles.btnArrow}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
