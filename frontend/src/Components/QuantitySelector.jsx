import React from "react";
import styles from "../styles/cart.module.css";

const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  disabled = false,
}) => {
  return (
    <div
      className={styles.quantitySelector}
      role="group"
      aria-label="Quantity selector"
    >
      <button
        className={styles.qtyBtn}
        onClick={onDecrease}
        disabled={disabled || quantity <= 1}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className={styles.qtyValue} aria-live="polite">
        {quantity}
      </span>
      <button
        className={styles.qtyBtn}
        onClick={onIncrease}
        disabled={disabled}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
