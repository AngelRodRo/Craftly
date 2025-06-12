import { CartItem } from "../model";
export const addToCart = async (cartItem: CartItem) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ cartItemId: cartItem.id });
    }, 500);
  });
};

export const loadCart = async (): Promise<CartItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "123",
          name: "Service A",
          price: 100,
          description: "Description",
          image: "Image",
          serviceId: "123",
        },
      ]);
    }, 500);
  });
};

export const removeFromCart = async (cartItemId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cartItemId);
    }, 500);
  });
};