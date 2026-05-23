import React from "react";
import { useDispatch } from "react-redux";
import QuantitySelector from "./QuantitySelector";
import styles from "../styles/cart.module.css";

const CartItem = ({ item, onRemove, onQuantityChange, loading = false }) => {
  const dispatch = useDispatch();
  // Handle both item.price (from local state) and item.priceAtPurchase (from backend)
  const price = item.price || item.priceAtPurchase || 0;

  // Extract product ID - handle both populated and non-populated product field
  const productId = item.product?._id || item.product || item._id;

  // Quantity is at the item level, not inside product
  const quantity = item.quantity || 1;

  // Extract product details from item.product or item itself
  const productDetails = item.product || item;
  const { name, description, image, size } = productDetails;

  const placeholderImage = "https://placehold.co/120x120?text=No+Image";

  const handleIncrease = () => {
    if (onQuantityChange) {
      onQuantityChange(productId, quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (onQuantityChange && quantity > 1) {
      onQuantityChange(productId, quantity - 1);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(productId);
    }
  };

  return (
    <article className={styles.cartItem} aria-label={`Cart item: ${name}`}>
      {/* Product Image */}
      <div className={styles.imageWrapper}>
        <img
          src={image || placeholderImage}
          alt={name}
          className={styles.productImage}
          onError={(e) => {
            e.target.src = placeholderImage;
          }}
          loading="lazy"
        />
        {size && size !== "N/A" && (
          <span className={styles.sizeBadge} aria-label={`Size: ${size}`}>
            {size}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className={styles.itemInfo}>
        <h3 className={styles.itemName} aria-label="Product name">
          {name}
        </h3>
        {description && (
          <p
            className={styles.itemDescription}
            aria-label="Product description"
          >
            {description}
          </p>
        )}

        {/* Quantity Controls */}
        <div className={styles.quantityControls}>
          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            disabled={loading}
          />
        </div>
      </div>

      {/* Price and Actions */}
      <div className={styles.itemActions}>
        <div className={styles.priceContainer}>
          <span
            className={styles.itemPrice}
            aria-label={`Price: $${(price * quantity).toFixed(2)}`}
          >
            ${(price * quantity).toFixed(2)}
          </span>
          <span className={styles.unitPrice}>${price.toFixed(2)} each</span>
        </div>

        <button
          className={styles.removeItemBtn}
          onClick={handleRemove}
          disabled={loading}
          aria-label={`Remove ${name} from cart`}
        >
          🗑️ Remove
        </button>
      </div>
    </article>
  );
};

export default CartItem;
