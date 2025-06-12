import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./model";
import {
  addToCart as addToCartApi,
  loadCart,
  removeFromCart as removeFromCartApi,
} from "./api/cart";
import { RootState } from "@/app/store";
import { CART_KEY } from "@/shared/constants";

interface CartState {
  items: CartItem[];
  loading: boolean;
  error?: string;
}

export const initialState: CartState = {
  items: [],
  loading: false,
  error: undefined,
};

export const addToCart = createAsyncThunk<CartItem, CartItem>(
  "cart/addToCart",
  async (cartItem: CartItem, { getState }) => {
    const state = getState() as RootState;
    const { user } = state.auth;
    if (user) {
      await addToCartApi(cartItem);
    } else {
      const cartItems = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      cartItems.push(cartItem);
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    }
    return cartItem;
  }
);

export const removeFromCart = createAsyncThunk<string, string>(
  "cart/removeFromCart",
  async (cartItemId: string, { getState }) => {
    const state = getState() as RootState;
    const { user } = state.auth;
    if (user) {
      await removeFromCartApi(cartItemId);
    } else {
      const cartItems = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      const updatedCartItems = cartItems.filter(
        (item: CartItem) => item.id !== cartItemId
      );
      localStorage.setItem(CART_KEY, JSON.stringify(updatedCartItems));
    }
    return cartItemId;
  }
);

export const fetchCartItems = createAsyncThunk<
  CartItem[],
  void,
  { state: RootState }
>("cart/fetchCartItems", async (_, { getState }) => {
  const state = getState() as RootState;
  const { user } = state.auth;
  let cartItems: CartItem[] = [];
  if (user) {
    cartItems = await loadCart();
  } else {
    cartItems = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  }
  return cartItems;
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.items.push(action.payload);
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchCartItems.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.loading = false;
      state.items = state.items.filter((item) => item.id !== action.payload);
    });

    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(removeFromCart.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
