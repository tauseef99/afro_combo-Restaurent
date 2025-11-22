import { createSlice } from '@reduxjs/toolkit';

// Helper to save the cart state to localStorage
const saveToLocalStorage = (state) => {
  localStorage.setItem('cart', JSON.stringify(state));
};

// Helper to load the cart state from localStorage (Optional: you can remove localStorage if not needed)
const loadFromLocalStorage = () => {
  // This will always return an empty cart on page reload
  return { cartItems: [], totalAmount: 0 };
};

// Initial state with reset behavior
const initialState = loadFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      state.totalAmount += item.price;
      saveToLocalStorage(state);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((cartItem) => cartItem.id === id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalAmount -= existingItem.price;
        } else {
          state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== id);
          state.totalAmount -= existingItem.price;
        }
      }

      saveToLocalStorage(state);
    },

    removeAllFromCart: (state, action) => {
      const id = action.payload;
      const itemToRemove = state.cartItems.find((cartItem) => cartItem.id === id);

      if (itemToRemove) {
        state.totalAmount -= itemToRemove.price * itemToRemove.quantity;
        state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== id);
      }

      saveToLocalStorage(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;

      saveToLocalStorage(state);
    },

    recalculateTotals: (state) => {
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      saveToLocalStorage(state);
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  removeAllFromCart, 
  clearCart, 
  recalculateTotals 
} = cartSlice.actions;

export default cartSlice.reducer;
