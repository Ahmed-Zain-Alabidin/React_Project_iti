import styles from "./ProductCard.module.css";

const PLACEHOLDER = "https://placehold.co/400x300?text=No+Image";

const ProductCard = ({ product, isAdmin, onEdit, onDelete, onAddToCart }) => {
  const { _id, name, description, price, category, quantity, image, size } = product;

  const imgSrc = image && image.trim() !== "" ? image : PLACEHOLDER;

  return (
    <div className={styles.card}>
      {/* Image */}
      <div className={styles.imageWrap}>
        <img
          src={imgSrc}
          alt={name}
          className={styles.image}
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />
        <span className={styles.categoryBadge}>{category}</span>
        {quantity === 0 && (
          <span className={styles.outOfStock}>Out of Stock</span>
        )}
      </div>

      {/* Body */}
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.meta}>
          {size && size !== "N/A" && (
            <span className={styles.size}>Size: {size}</span>
          )}
          <span className={styles.stock}>
            {quantity > 0 ? `${quantity} in stock` : "Out of stock"}
          </span>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>${price.toFixed(2)}</span>

          <div className={styles.actions}>
            {!isAdmin && (
              <button
                className={styles.btnCart}
                disabled={quantity === 0}
                onClick={() => onAddToCart && onAddToCart(product)}
                aria-label={`Add ${name} to cart`}
              >
                {quantity === 0 ? "Unavailable" : "Add to Cart"}
              </button>
            )}

            {isAdmin && (
              <div className={styles.adminActions}>
                <button
                  className={styles.btnEdit}
                  onClick={() => onEdit(product)}
                  aria-label={`Edit ${name}`}
                >
                  ✏️ Edit
                </button>
                <button
                  className={styles.btnDelete}
                  onClick={() => onDelete(_id)}
                  aria-label={`Delete ${name}`}
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
