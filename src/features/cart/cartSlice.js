import { createSlice } from "@reduxjs/toolkit";

const storedCart = sessionStorage.getItem("cart");

const initialState = {
  cart: storedCart ? JSON.parse(storedCart) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.cart.push({ ...product, count: 1 });
      }
    },

    removeFromCart(state, action) {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
