import { render, screen } from "@testing-library/react";
import CheckoutItem from "./CheckoutItem";
import { CartItem } from "@/features/Cart/model";

const mockCartItem: CartItem = {
  id: "1",
  name: "Test Item",
  price: 10,
  image: "https://via.placeholder.com/150",
  description: "Test Description",
  serviceId: "1",
};

describe("CheckoutItem", () => {
  it("should render the checkout item", () => {
    render(<CheckoutItem item={mockCartItem} />);
    expect(screen.getByText(mockCartItem.name)).toBeDefined();
    expect(screen.getByText(mockCartItem.description)).toBeDefined();
    expect(screen.getByText(mockCartItem.price.toString())).toBeDefined();
    expect(screen.getByRole("button", { name: "Remove" })).toBeDefined();
  });
});
