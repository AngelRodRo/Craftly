import { renderWithProviders } from "@/shared/utils/test-utils";
import Header from "./Header";
import { screen, waitFor } from "@testing-library/react";

jest.mock("lucide-react", () => ({
  ShoppingCartIcon: () => <div data-testid="shopping-cart-icon" />,
}));

jest.mock("react-router", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe("Header", () => {
  it("should render the header", async () => {
    renderWithProviders(<Header />);

    await waitFor(() => {
      expect(screen.getByText("Craftly")).toBeDefined();
    });
  });

  it("should render the cart items total", async () => {
    renderWithProviders(<Header />, {
      preloadedState: {
        cart: {
          items: [
            {
              id: "1",
              name: "Product 1",
              description: "Description 1",
              image: "image.png",
              price: 100,
              serviceId: "1",
            },
          ],
          loading: false,
        },
      },
    });

    await waitFor(() => {
      const cartQuantity = screen.getByTestId("cart-quantity");
      expect(cartQuantity).toBeDefined();
      expect(cartQuantity.textContent).toBe("1");
    });
  });
});
