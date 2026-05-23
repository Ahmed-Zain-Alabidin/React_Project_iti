import API from "../api/axios";

// Cart API service
const cartApi = {
  // Get cart items from backend
  getCart: async () => {
    const { data } = await API.get("/cart");
    return data;
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    const { data } = await API.post("/cart/add", { productId, quantity });
    return data;
  },

  // Update item quantity
  updateItemQuantity: async (productId, quantity) => {
    const { data } = await API.put(`/cart/item/${productId}`, { quantity });
    return data;
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    const { data } = await API.delete(`/cart/item/${productId}`);
    return data;
  },

  // Clear entire cart
  clearCart: async () => {
    const { data } = await API.delete("/cart/clear");
    return data;
  },
};

export default cartApi;
