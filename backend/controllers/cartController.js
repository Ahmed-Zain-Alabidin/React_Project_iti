import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import calculateCart from "../utils/calculateCart.js";

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product", "name price image category quantity");

    if (!cart) {
      return res.json({
        success: true,
        cart: {
          items: [],
          subtotal: 0,
          totalItems: 0,
          tax: 0,
          shipping: 0,
          total: 0,
        },
      });
    }

    cart.items = cart.items.filter((item) => item.product != null);

    const totals = calculateCart(cart.items);
    cart.subtotal = totals.subtotal;
    cart.totalItems = totals.totalItems;
    cart.tax = totals.tax;
    cart.shipping = totals.shipping;
    cart.total = totals.total;

    return res.json({ success: true, cart });
  } catch (error) {
    console.error("Get cart error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error fetching cart" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    if (quantity < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity must be at least 1" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Only ${product.quantity} items available.`,
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingIndex > -1) {
      const newQty = cart.items[existingIndex].quantity + quantity;

      if (newQty > product.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock. You already have ${cart.items[existingIndex].quantity} in cart. Only ${product.quantity} available.`,
        });
      }

      cart.items[existingIndex].quantity = newQty;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        priceAtPurchase: product.price,
      });
    }

    const totals = calculateCart(cart.items);
    cart.subtotal = totals.subtotal;
    cart.totalItems = totals.totalItems;
    cart.tax = totals.tax;
    cart.shipping = totals.shipping;
    cart.total = totals.total;

    await cart.save();

    const populatedCart = await Cart.findById(cart._id)
      .populate("items.product", "name price image category quantity");

    return res.status(201).json({ success: true, cart: populatedCart });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error adding to cart" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity must be at least 1" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (quantity > product.quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Only ${product.quantity} items available.`,
      });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    item.quantity = quantity;

    const totals = calculateCart(cart.items);
    cart.subtotal = totals.subtotal;
    cart.totalItems = totals.totalItems;
    cart.tax = totals.tax;
    cart.shipping = totals.shipping;
    cart.total = totals.total;

    await cart.save();

    const populatedCart = await Cart.findById(cart._id)
      .populate("items.product", "name price image category quantity");

    return res.json({ success: true, cart: populatedCart });
  } catch (error) {
    console.error("Update cart item error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error updating cart item" });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    cart.items.splice(itemIndex, 1);

    const totals = calculateCart(cart.items);
    cart.subtotal = totals.subtotal;
    cart.totalItems = totals.totalItems;
    cart.tax = totals.tax;
    cart.shipping = totals.shipping;
    cart.total = totals.total;

    await cart.save();

    const populatedCart = await Cart.findById(cart._id)
      .populate("items.product", "name price image category quantity");

    return res.json({ success: true, cart: populatedCart });
  } catch (error) {
    console.error("Remove cart item error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error removing item" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = [];
    cart.subtotal = 0;
    cart.totalItems = 0;
    cart.tax = 0;
    cart.shipping = 0;
    cart.total = 0;

    await cart.save();

    return res.json({ success: true, cart });
  } catch (error) {
    console.error("Clear cart error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error clearing cart" });
  }
};
