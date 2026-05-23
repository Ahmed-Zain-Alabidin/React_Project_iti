import express from "express";
import protect from "../middleware/auth.js";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.use(protect);

router.get("/", getCart);
router.post("/add", addToCart);
router.put("/item/:productId", updateCartItem);
router.delete("/item/:productId", removeCartItem);
router.delete("/clear", clearCart);

export default router;
