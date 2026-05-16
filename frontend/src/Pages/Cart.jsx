import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = ({ cartItems = [], setCartItems }) => {
  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-page">
      <div className="container">
        {/* Page Header */}
        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-subtitle">Review your items before checkout.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">🛒</span>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet.</p>
            <Link to="/" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item._id}>
                  <img
                    src={item.image || "https://placehold.co/90x90?text=No+Image"}
                    alt={item.name}
                    className="cart-item-image"
                    onError={(e) => { e.target.src = "https://placehold.co/90x90?text=No+Image"; }}
                  />
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-desc">{item.description}</p>
                    <div className="cart-item-controls">
                      <div className="qty-control">
                        <button
                          className="qty-btn"
                          onClick={() => updateQty(item._id, -1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQty(item._id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="cart-item-right">
                    <span className="cart-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item._id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      🗑 Remove
                    </button>
                  </div>
                </div>
              ))}

              <Link to="/" className="continue-shopping">
                ← Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="summary-muted">Calculated at checkout</span>
                </div>
                <div className="summary-row">
                  <span>Estimated Tax</span>
                  <span>$0.00</span>
                </div>
              </div>

              <div className="summary-divider" />

              <div className="summary-total">
                <span>Total Amount</span>
                <span className="summary-total-price">${subtotal.toFixed(2)}</span>
              </div>

              <button className="btn-buy-now">
                🔒 Buy Now
              </button>

              <div className="payment-icons">
                <span title="Credit Card">💳</span>
                <span title="Bank Transfer">🏦</span>
                <span title="Digital Wallet">👛</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
