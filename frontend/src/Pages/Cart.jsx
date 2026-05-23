import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import {
  fetchCart,
  updateItemQuantity,
  removeFromCart,
  clearCart,
  selectCartItems,
  selectCartLoading,
  selectCartError,
  selectCartTotalItems,
} from "../store/cartSlice";
import EmptyCart from "../Components/EmptyCart";
import CartItem from "../Components/CartItem";
import CartSummary from "../Components/CartSummary";
import styles from "../styles/cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const items = useSelector(selectCartItems);
  const loading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);
  const totalItems = useSelector(selectCartTotalItems);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { state: { from: "/cart" } });
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateItemQuantity({ productId: id, quantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    // Navigate to checkout page (to be implemented)
    console.log("Checkout clicked");
  };

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h2 className={styles.errorTitle}>Error Loading Cart</h2>
        <p className={styles.errorMessage}>{error}</p>
        <button
          className={styles.retryBtn}
          onClick={() => dispatch(fetchCart())}
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading && items.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p className={styles.loadingText}>Loading your cart...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className={styles.cartPage}>
      <div className="container">
        {/* Page Header */}
        <div className={styles.cartHeader}>
          <h1 className={styles.cartTitle}>Shopping Cart</h1>
          <p className={styles.cartSubtitle}>
            Review your items before checkout.
          </p>
        </div>

        <div className={styles.cartLayout}>
          {/* Cart Items */}
          <div className={styles.cartItems}>
            {items.map((item) => (
              <CartItem
                key={item.product?._id || item._id}
                item={item}
                onRemove={handleRemoveItem}
                onQuantityChange={handleQuantityChange}
                loading={loading}
              />
            ))}

            <Link to="/products" className={styles.continueShopping}>
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <CartSummary
            onCheckout={handleCheckout}
            onClearCart={handleClearCart}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
