import reducer, {
  addToCart,
  fetchCartItems,
  initialState,
  setCartItems,
} from "./cartSlice";

describe("cartSlice", () => {
  it("should return the initial state", async () => {
    const state = reducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("should set the cart items", () => {
    const mockCartItem = {
      id: "1",
      name: "Test Item",
      price: 10,
      description: "Test Description",
      image: "Test Image",
      serviceId: "1",
    };

    const state = reducer(undefined, setCartItems([mockCartItem]));

    expect(state.items).toEqual([mockCartItem]);
  });

  it("should handle fetchCartItems.fulfilled", () => {
    const action = {
      type: fetchCartItems.fulfilled.type,
      payload: [
        {
          id: "1",
          name: "Test Item",
          price: 10,
          description: "Test Description",
          image: "Test Image",
          serviceId: "1",
        },
      ],
    };
    const state = reducer(initialState, action);
    expect(state.items).toEqual([
      {
        id: "1",
        name: "Test Item",
        price: 10,
        description: "Test Description",
        image: "Test Image",
        serviceId: "1",
      },
    ]);
  });

  it("should handle fetchCartItems.rejected", () => {
    const action = {
      type: fetchCartItems.rejected.type,
      error: { message: "Error" },
    };
    const state = reducer(initialState, action);
    expect(state.items).toEqual([]);
    expect(state.error).toEqual("Error");
  });

  it("should handle fetchCartItems.pending", () => {
    const action = {
      type: fetchCartItems.pending.type,
    };
    const state = reducer(initialState, action);
    expect(state.items).toEqual([]);
    expect(state.loading).toEqual(true);
  });

  it("should handle addToCart.fulfilled", () => {
    const action = {
      type: addToCart.fulfilled.type,
      payload: {
        id: "1",
        name: "Test Item",
        price: 10,
        description: "Test Description",
        image: "Test Image",
        serviceId: "1",
      },
    };

    const state = reducer(initialState, action);
    expect(state.items).toEqual([
      {
        id: "1",
        name: "Test Item",
        price: 10,
        description: "Test Description",
        image: "Test Image",
        serviceId: "1",
      },
    ]);
  });

  it("should handle addToCart.rejected", () => {
    const action = {
      type: addToCart.rejected.type,
      error: { message: "Error" },
    };

    const mockCartItem = {
      id: "1",
      name: "Test Item",
      price: 10,
      description: "Test Description",
      image: "Test Image",
      serviceId: "1",
    };

    const state = reducer(
      {
        ...initialState,
        items: [mockCartItem],
      },
      action
    );
    expect(state.items).toEqual([mockCartItem]);
  });

  it("should handle addToCart.pending", () => {
    const mockCartItem = {
      id: "1",
      name: "Test Item",
      price: 10,
      description: "Test Description",
      image: "Test Image",
      serviceId: "1",
    };
    const action = {
      type: addToCart.pending.type,
    };

    const state = reducer(
      {
        ...initialState,
        items: [mockCartItem],
      },
      action
    );
    expect(state.items).toEqual([mockCartItem]);
  });
});
