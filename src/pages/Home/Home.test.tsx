import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;

import { screen, fireEvent, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./index";
import type { Service } from "@/features/Services/model";
import { renderWithProviders } from "@/shared/utils/test-utils";
import { setupStore } from "@/app/store";

// Mock Portal to render content in place
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
    },
  });
};

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
      services: [
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
      ],
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
      expect(store.getState().cart.items).toEqual([
        {
          id: "1",
          name: "Service 1",
          price: 100,
          quantity: 1,
          description: "Description 1",
          image: "image1.jpg",
          serviceId: "1",
        },
      ]);
    });
  });
});
