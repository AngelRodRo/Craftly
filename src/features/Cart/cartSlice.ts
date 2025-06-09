import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./model";

interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
