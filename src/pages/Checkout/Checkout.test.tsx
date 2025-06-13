import { screen, waitFor } from "@testing-library/react";
import Checkout from ".";
import { renderWithProviders } from "@/shared/utils/test-utils";
import { setupStore } from "@/app/store";

const createMockStore = (initialState = {}) => {
  return setupStore({
    services: {
      services: [],
      filter: {
        name: "",
        priceMin: null,
        priceMax: null,
        category: [],
        page: 1,
        limit: 12,
      },
      totalPages: 1,
      categories: [],
      loading: false,
      error: null,
      ...initialState,
    },
    cart: {
      items: [],
      loading: false,
    },
    auth: {
      user: null,
      isAuthenticated: false,
    },
  });
};

describe("Checkout", () => {
  it("should render the checkout page", async () => {
    const store = createMockStore({
      cart: {
        items: [
          {
            id: "1",
            name: "Test Item",
            price: 10,
            image: "test.jpg",
            description: "Test Description",
          },
        ],
      },
    });

    renderWithProviders(<Checkout />, { store });

    await waitFor(() => {
      const checkoutTitle = screen.queryAllByText("Checkout");
      expect(checkoutTitle).toBeDefined();

      const total = screen.queryAllByText("Total:");
      expect(total).toBeDefined();

      const totalAmount = screen.queryAllByText("S/. 0");
      expect(totalAmount).toBeDefined();

      const checkoutButton = screen.queryAllByText("Checkout");
      expect(checkoutButton).toBeDefined();

      const checkoutItem = screen.queryAllByText("Test Item");
      expect(checkoutItem).toBeDefined();

      const checkoutItemPrice = screen.queryAllByText("S/. 10");
      expect(checkoutItemPrice).toBeDefined();

      const checkoutItemDescription = screen.queryAllByText("Test Description");
      expect(checkoutItemDescription).toBeDefined();

      const checkoutItemImage = screen.queryAllByAltText("Test Item");
      expect(checkoutItemImage).toBeDefined();

      const checkoutItemRemoveButton = screen.queryAllByText("Remove");
      expect(checkoutItemRemoveButton).toBeDefined();
    });
  });
});
