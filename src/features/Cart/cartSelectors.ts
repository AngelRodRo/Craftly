import { RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartQuantity = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)
);
