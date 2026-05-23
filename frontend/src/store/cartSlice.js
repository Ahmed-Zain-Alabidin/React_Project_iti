import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartApi from "./cartApi";

// Async thunks
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await cartApi.getCart();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart",
      );
    }
  },
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const data = await cartApi.addToCart(productId, quantity);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart",
      );
    }
  },
);

export const updateItemQuantity = createAsyncThunk(
  "cart/updateItemQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const data = await cartApi.updateItemQuantity(productId, quantity);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update quantity",
      );
    }
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await cartApi.removeFromCart(productId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item from cart",
      );
    }
  },
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await cartApi.clearCart();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart",
      );
    }
  },
);

// Initial state
const initialState = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  loading: false,
  error: null,
};

// Cart slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Optimistic update for local state
    addToCartLocal: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item._id === product._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCartLocal: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    updateQuantityLocal: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item._id !== id);
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCartLocal: (state) => {
      state.items = [];
    },
    // Reset error state
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch cart
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        const cart = action.payload.cart;
        state.items = cart?.items || [];
        // Use backend-calculated totals
        state.subtotal = cart?.subtotal || 0;
        state.tax = cart?.tax || 0;
        state.shipping = cart?.shipping || 0;
        state.total = cart?.total || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add to cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const cart = action.payload.cart;
        state.items = cart?.items || [];
        // Use backend-calculated totals
        state.subtotal = cart?.subtotal || 0;
        state.tax = cart?.tax || 0;
        state.shipping = cart?.shipping || 0;
        state.total = cart?.total || 0;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update quantity
    builder
      .addCase(updateItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const cart = action.payload.cart;
        state.items = cart?.items || [];
        // Use backend-calculated totals
        state.subtotal = cart?.subtotal || 0;
        state.tax = cart?.tax || 0;
        state.shipping = cart?.shipping || 0;
        state.total = cart?.total || 0;
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Remove from cart
    builder
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        const cart = action.payload.cart;
        state.items = cart?.items || [];
        // Use backend-calculated totals
        state.subtotal = cart?.subtotal || 0;
        state.tax = cart?.tax || 0;
        state.shipping = cart?.shipping || 0;
        state.total = cart?.total || 0;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Clear cart
    builder
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        const cart = action.payload.cart;
        state.items = cart?.items || [];
        // Use backend-calculated totals
        state.subtotal = cart?.subtotal || 0;
        state.tax = cart?.tax || 0;
        state.shipping = cart?.shipping || 0;
        state.total = cart?.total || 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Helper function to calculate totals
const calculateTotals = (state) => {
  state.subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  state.tax = state.subtotal * 0.14; // 14% VAT tax (matches backend)
  // Shipping: Free over 100 EGP, otherwise flat 20 EGP
  state.shipping = state.subtotal > 100 ? 0 : 20;
  state.total = state.subtotal + state.tax + state.shipping;
};

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;
export const selectCartSubtotal = (state) => state.cart.subtotal;
export const selectCartTax = (state) => state.cart.tax;
export const selectCartShipping = (state) => state.cart.shipping;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartTotalItems = (state) =>
  state.cart.items.reduce((sum, item) => {
    // Handle both item.quantity and item.product.quantity
    const quantity = item.quantity || 0;
    return sum + quantity;
  }, 0);

// Actions
export const {
  addToCartLocal,
  removeFromCartLocal,
  updateQuantityLocal,
  clearCartLocal,
  resetError,
} = cartSlice.actions;

export default cartSlice.reducer;
