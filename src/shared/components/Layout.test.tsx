import { renderWithProviders } from "../utils/test-utils";
import Layout from "./Layout";
import { setUser } from "@/features/Auth/authSlice";
import { waitFor } from "@testing-library/react";
import { setupStore } from "@/app/store";
import { loadCart } from "@/features/Cart/api/cart";
import { CartItem } from "@/features/Cart/model";

const mockCartItem: CartItem = {
  id: "1",
  name: "Service 1",
  price: 100,
  description: "Description 1",
  image: "image1.jpg",
  serviceId: "1",
};

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
  writable: true,
});

jest.mock("@/features/Cart/api/cart", () => ({
  addToCart: jest.fn().mockResolvedValue({ cartItemId: "1" }),
  loadCart: jest.fn().mockResolvedValue([]),
  removeFromCart: jest.fn().mockResolvedValue("1"),
}));

jest.mock("react-router", () => ({
  Outlet: () => <div data-testid="outlet">Outlet</div>,
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

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

describe("Layout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReset();
  });

  it("should fetch the cart items from the api when the component is mounted and user is logged in", async () => {
    const store = createMockStore();
    store.dispatch(setUser({ id: "1", name: "John Doe" }));

    renderWithProviders(<Layout />, { store });

    await waitFor(() => {
      expect(loadCart).toHaveBeenCalled();
    });
  });

  it("should retrieve the cart items from localStorage when the component is mounted and user is not logged in", async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify([mockCartItem]));
    const store = createMockStore();

    renderWithProviders(<Layout />, { store });

    await waitFor(() => {
      expect(store.getState().cart.items).toEqual([mockCartItem]);
    });
  });
});
