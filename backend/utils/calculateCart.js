const TAX_RATE = 0.14;
const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 20;

const calculateCart = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.priceAtPurchase * item.quantity,
    0
  );

  const tax = parseFloat((subtotal * TAX_RATE).toFixed(2));
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const total = parseFloat((subtotal + tax + shipping).toFixed(2));

  return { subtotal, totalItems, tax, shipping, total };
};

export default calculateCart;
