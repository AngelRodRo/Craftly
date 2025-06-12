import { RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartQuantity = createSelector(
  [selectCartItems],
  (items) => items.length
);

