import { renderWithProviders } from "@/shared/utils/test-utils";
import Header from "./Header";
import { screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";

jest.mock("lucide-react", () => ({
  ShoppingCartIcon: () => <div data-testid="shopping-cart-icon" />,
}));

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to} data-testid={`link-${to}`}>
      {children}
    </a>
  ),
}));

describe("Header", () => {
  it("should render the header", async () => {
    renderWithProviders(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Craftly")).toBeDefined();
    });
  });

  it("should render the cart items total", async () => {
    renderWithProviders(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
      {
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
      }
    );

    await waitFor(() => {
      const cartQuantity = screen.getByTestId("cart-quantity");
      expect(cartQuantity).toBeDefined();
      expect(cartQuantity.textContent).toBe("1");
    });
  });

  it("should navigate to the checkout page when the cart icon is clicked", async () => {
    renderWithProviders(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const checkoutLink = screen.getByTestId("link-/checkout");
    expect(checkoutLink).toBeDefined();
    expect(checkoutLink.getAttribute("href")).toBe("/checkout");
  });
});
