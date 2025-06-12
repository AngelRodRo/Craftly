import { addToCart, removeFromCart } from "./cart";

describe("addToCart", () => {
  it("should save cart item successfully", async () => {
    const cartItem = await addToCart({
      id: "1",
      name: "Test Item",
      price: 10,
      description: "Test Description",
      image: "Test Image",
      serviceId: "1",
    });

    expect(cartItem).toEqual({ cartItemId: "1" });
  });

  it("should remove cart item successfully", async () => {
    const cartItemId = await removeFromCart("1");
    expect(cartItemId).toEqual("1");
  });
});
