import reducer, { addToCart, initialState } from "./cartSlice";

describe("cartSlice", () => {
  it("should return the initial state", async () => {
    const state = reducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("should add an item to the cart", () => {
    const state = reducer(
      initialState,
      addToCart({
        id: "1",
        name: "Test Item",
        price: 10,
        quantity: 1,
        description: "Test Description",
        image: "Test Image",
        serviceId: "1",
      })
    );

    expect(state.items).toEqual([
      {
        id: "1",
        name: "Test Item",
        price: 10,
        quantity: 1,
        description: "Test Description",
        image: "Test Image",
        serviceId: "1",
      },
    ]);
  });
});
