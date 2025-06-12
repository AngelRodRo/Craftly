import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;

import { screen, fireEvent, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "./index";
import type { Service } from "@/features/Services/model";
import { renderWithProviders } from "@/shared/utils/test-utils";
import { setupStore } from "@/app/store";
import { CART_KEY } from "@/shared/constants";
import {
  addToCart as addToCartApi,
  removeFromCart as removeFromCartApi,
} from "@/features/Cart/api/cart";
import { setUser } from "@/features/Auth/authSlice";
import { CartItem } from "@/features/Cart/model";
import { fetchCartItems } from "@/features/Cart/cartSlice";

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

const mockCartItem: CartItem = {
  id: "1",
  name: "Service 1",
  price: 100,
  description: "Description 1",
  image: "image1.jpg",
  serviceId: "1",
};

const mockService: Service = {
  id: "1",
  name: "Service 1",
  description: "Description 1",
  price: 100,
  image: "image1.jpg",
  category: "category1",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

jest.mock("@/features/Cart/api/cart", () => ({
  addToCart: jest.fn().mockResolvedValue({ cartItemId: "1" }),
  loadCart: jest.fn().mockResolvedValue([]),
  removeFromCart: jest.fn().mockResolvedValue("1"),
}));

jest.mock("@radix-ui/react-select", () => {
  const original = jest.requireActual("@radix-ui/react-select");
  return {
    ...original,
    Portal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

const mockSearchParams = new URLSearchParams();
const mockSetSearchParams = jest.fn();

jest.mock("react-router", () => ({
  useSearchParams: () => [mockSearchParams, mockSetSearchParams],
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

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it("renders the search input and button", async () => {
    const store = createMockStore();

    renderWithProviders(<Home />, { store });

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Search" })
      ).toBeInTheDocument();
    });
  });

  it("should fetch all services when search input is empty", async () => {
    const store = createMockStore();
    renderWithProviders(<Home />, { store });

    const searchInput = screen.getByPlaceholderText("Search");

    await waitFor(() => {
      fireEvent.change(searchInput, { target: { value: "test" } });
    });

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "" } });
    });

    await waitFor(() => {
      expect(screen.getByText("Service 1")).toBeInTheDocument();
      expect(screen.getByText("Service 2")).toBeInTheDocument();
    });
  });

  it("disables search button when search input is empty", async () => {
    const store = createMockStore();

    renderWithProviders(<Home />, { store });

    await waitFor(() => {
      const searchButton = screen.getByRole("button", { name: "Search" });
      expect(searchButton).toBeDisabled();
    });
  });

  it("enables search button when search input has value", async () => {
    const store = createMockStore();

    renderWithProviders(<Home />, { store });

    const searchInput = screen.getByPlaceholderText("Search");
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "test" } });
    });

    await waitFor(() => {
      const searchButton = screen.getByRole("button", { name: "Search" });
      expect(searchButton).not.toBeDisabled();
    });
  });

  it("shows service cards when services are available", async () => {
    const mockServices: Service[] = [
      {
        id: "1",
        name: "Service 1",
        description: "Description 1",
        price: 100,
        image: "image1.jpg",
        category: "category1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Service 2",
        description: "Description 2",
        price: 200,
        image: "image2.jpg",
        category: "category2",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    const store = createMockStore({
      services: mockServices,
    });

    renderWithProviders(<Home />, { store });

    await waitFor(() => {
      expect(screen.getByText("Service 1")).toBeInTheDocument();
      expect(screen.getByText("Service 2")).toBeInTheDocument();
      expect(screen.getByText("Description 1")).toBeInTheDocument();
      expect(screen.getByText("Description 2")).toBeInTheDocument();
      expect(screen.getByText("S/. 100")).toBeInTheDocument();
      expect(screen.getByText("S/. 200")).toBeInTheDocument();
    });
  });

  it("shows loading state when services are being fetched", async () => {
    const store = createMockStore({
      loading: true,
    });

    renderWithProviders(<Home />, { store });

    await waitFor(() => {
      expect(
        screen.getAllByTestId("service-card-skeleton").length
      ).toBeGreaterThan(0);
    });
  });

  it("should navigate to the next page when the next button is clicked", async () => {
    const store = createMockStore({
      services: Array.from({ length: 20 }, (_, index) => ({
        id: index.toString(),
        name: `Service ${index + 1}`,
        description: `Description ${index + 1}`,
        price: index + 1,
        image: `image${index + 1}.jpg`,
        category: `category${index + 1}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })),
    });

    renderWithProviders(<Home />, { store });

    await waitFor(() => {
      expect(screen.getByTestId("pagination-next")).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("pagination-next");
    await act(async () => {
      fireEvent.click(nextButton);
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("pagination-item").length).toBeGreaterThan(
        1
      );
    });

    await waitFor(() => {
      expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function));
      const setParamsFn = mockSetSearchParams.mock.calls[0][0];
      const prevParams = new URLSearchParams();
      const newParams = setParamsFn(prevParams);
      expect(newParams.get("page")).toBe("1");
    });
  });

  it("should add to cart when service card is clicked", async () => {
    const store = createMockStore({
      services: [mockService],
    });
    renderWithProviders(<Home />, { store });

    await waitFor(() => {
      expect(screen.getByText("Service 1")).toBeInTheDocument();
    });

    const addToCartButton = screen.getByRole("button", { name: "Add to cart" });
    await act(async () => {
      fireEvent.click(addToCartButton);
    });

    await waitFor(() => {
      expect(store.getState().cart.items).toEqual([mockCartItem]);
    });
  });

  it("should use localStorage to persist cart items when user is not logged in", async () => {
    const store = createMockStore({
      services: [mockService],
      auth: {
        user: null,
      },
    });

    renderWithProviders(<Home />, { store });

    await waitFor(() => {
      expect(screen.getByText("Service 1")).toBeInTheDocument();
    });

    const addToCartButton = screen.getByRole("button", { name: "Add to cart" });
    await act(async () => {
      fireEvent.click(addToCartButton);
    });

    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        CART_KEY,
        expect.any(String)
      );
    });
  });

  it("should not use localStorage when user is logged in and call api to add to the cart", async () => {
    const store = createMockStore({
      services: [mockService],
    });

    store.dispatch(setUser({ id: "1", name: "John Doe" }));

    await waitFor(() => {
      renderWithProviders(<Home />, { store });
    });

    const addToCartButton = screen.getByRole("button", { name: "Add to cart" });

    await act(async () => {
      fireEvent.click(addToCartButton);
    });

    await waitFor(() => {
      expect(addToCartApi).toHaveBeenCalled();
    });
  });

  it("should display service item with 'Remove from cart' button when the service is in the cart", async () => {
    const store = createMockStore({
      services: [mockService],
      cart: {
        items: [],
        loading: false,
      },
    });

    renderWithProviders(<Home />, { store });

    await waitFor(() => {
      expect(screen.getByText("Service 1")).toBeInTheDocument();
    });

    const addToCartButton = screen.getByRole("button", { name: "Add to cart" });
    await act(async () => {
      fireEvent.click(addToCartButton);
    });

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Remove from cart" })
      ).toBeInTheDocument();
    });
  });

  it("should remove from cart stored in localStorage when the 'Remove from cart' button is clicked and user is not logged in", async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify([mockCartItem]));

    const store = createMockStore({
      services: [mockService],
      cart: {
        items: [mockCartItem],
        loading: false,
      },
    });

    store.dispatch(fetchCartItems());

    renderWithProviders(<Home />, { store });

    await waitFor(() => {
      expect(screen.getByText("Service 1")).toBeInTheDocument();
    });

    const removeFromCartButton = screen.getByRole("button", {
      name: "Remove from cart",
    });

    await act(async () => {
      fireEvent.click(removeFromCartButton);
    });

    await waitFor(() => {
      expect(store.getState().cart.items).toEqual([]);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        CART_KEY,
        JSON.stringify([])
      );
    });
  });

  it("should remove from cart stored in the api when the 'Remove from cart' button is clicked and user is logged in", async () => {
    const store = createMockStore({
      services: [mockService],
      cart: {
        items: [mockCartItem],
        loading: false,
      },
    });

    store.dispatch(setUser({ id: "1", name: "John Doe" }));

    store.dispatch(fetchCartItems());

    renderWithProviders(<Home />, { store });

    await waitFor(() => {
      expect(screen.getByText("Service 1")).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));
    });

    const removeFromCartButton = screen.getByRole("button", {
      name: "Remove from cart",
    });

    await act(async () => {
      fireEvent.click(removeFromCartButton);
    });

    await waitFor(() => {
      expect(removeFromCartApi).toHaveBeenCalled();
      expect(store.getState().cart.items).toEqual([]);
    });
  });
});
