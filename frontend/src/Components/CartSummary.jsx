import React from "react";
import { useSelector } from "react-redux";
import {
  selectCartSubtotal,
  selectCartTax,
  selectCartShipping,
  selectCartTotal,
  selectCartTotalItems,
} from "../store/cartSlice";
import styles from "../styles/cart.module.css";

const CartSummary = ({ onCheckout, onClearCart, loading = false }) => {
  const subtotal = useSelector(selectCartSubtotal);
  const tax = useSelector(selectCartTax);
  const shipping = useSelector(selectCartShipping);
  const total = useSelector(selectCartTotal);
  const totalItems = useSelector(selectCartTotalItems);

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      onClearCart();
    }
  };

  return (
    <aside className={styles.orderSummary} aria-label="Order summary">
      <h2 className={styles.summaryTitle}>Order Summary</h2>

      {/* Summary Items */}
      <div className={styles.summaryList}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>
            Subtotal ({totalItems} items)
          </span>
          <span className={styles.summaryValue}>${subtotal.toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Shipping</span>
          <span className={styles.summaryValue}>
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Tax (14% VAT)</span>
          <span className={styles.summaryValue}>${tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.summaryDivider} />

      {/* Total */}
      <div className={styles.summaryTotal}>
        <span className={styles.totalLabel}>Total Amount</span>
        <span
          className={styles.totalPrice}
          aria-label={`Total: $${total.toFixed(2)}`}
        >
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Checkout Button */}
      <button
        className={styles.checkoutBtn}
        onClick={onCheckout}
        disabled={loading || totalItems === 0}
        aria-label={`Checkout - Total: $${total.toFixed(2)}`}
      >
        {loading ? (
          <span className={styles.btnLoader}>
            <span className={styles.spinner} />
            Processing...
          </span>
        ) : (
          <>
            <span>Checkout</span>
            <span className={styles.btnArrow}>→</span>
          </>
        )}
      </button>

      {/* Payment Icons */}
      <div
        className={styles.paymentIcons}
        aria-label="Accepted payment methods"
      >
        <span title="Credit Card">💳</span>
        <span title="Bank Transfer">🏦</span>
        <span title="Digital Wallet">👛</span>
        <span title="PayPal">PayPal</span>
      </div>

      {/* Clear Cart Button */}
      {totalItems > 0 && (
        <button
          className={styles.clearCartBtn}
          onClick={handleClearCart}
          disabled={loading}
          aria-label="Clear cart"
        >
          Clear Cart
        </button>
      )}
    </aside>
  );
};

export default CartSummary;
