import { renderWithProviders } from "@/shared/utils/test-utils";
import Filters from "./Filters";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RootState } from "@/app/store";

const mockSearchParams = new URLSearchParams();
const mockSetSearchParams = jest.fn();

jest.mock("react-router", () => ({
  useSearchParams: () => [mockSearchParams, mockSetSearchParams],
}));

describe("Filters", () => {
  const preloadedState: Partial<RootState> = {
    services: {
      categories: ["Design", "Development", "Marketing"],
      filter: {
        category: [],
        priceMin: null,
        priceMax: null,
        name: "",
        page: 1,
        limit: 10,
      },
      services: [],
      loading: false,
      totalPages: 1,
      error: null,
    },
  };

  beforeEach(() => {
    mockSetSearchParams.mockClear();
    mockSearchParams.delete("category");
    mockSearchParams.delete("priceMin");
    mockSearchParams.delete("priceMax");
  });

  it("should render all filter components", () => {
    renderWithProviders(<Filters />, { preloadedState });

    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();

    const categorySelect = screen.getByTestId("category-select");
    fireEvent.click(categorySelect);

    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("Development")).toBeInTheDocument();
    expect(screen.getByText("Marketing")).toBeInTheDocument();

    const minPriceSelect = screen.getByTestId("min-price-select");
    fireEvent.click(minPriceSelect);

    const maxPriceSelect = screen.getByTestId("max-price-select");
    fireEvent.click(maxPriceSelect);

    expect(screen.getAllByText("100")).toHaveLength(2);
    expect(screen.getAllByText("400")).toHaveLength(2);
  });

  it("should handle category filter changes", () => {
    const { store } = renderWithProviders(<Filters />, { preloadedState });

    const categorySelect = screen.getByTestId("category-select");
    fireEvent.click(categorySelect);

    const categoryOption = screen.getByText("Design");
    fireEvent.click(categoryOption);

    expect(mockSetSearchParams).toHaveBeenCalled();

    const state = store.getState();
    expect(state.services.filter.category).toEqual(["Design"]);
  });

  it("should handle price range filter changes", () => {
    const { store } = renderWithProviders(<Filters />, { preloadedState });

    const minPriceSelect = screen.getByTestId("min-price-select");
    fireEvent.click(minPriceSelect);

    const priceOption = screen.getByText("100");
    fireEvent.click(priceOption);

    expect(mockSetSearchParams).toHaveBeenCalled();

    const state = store.getState();
    expect(state.services.filter.priceMin).toBe("100");
  });

  it("should initialize with URL parameters", () => {
    mockSearchParams.set("category", "Design");
    mockSearchParams.set("priceMin", "100");
    mockSearchParams.set("priceMax", "500");

    const { store } = renderWithProviders(<Filters />, { preloadedState });

    const state = store.getState();
    expect(state.services.filter.category).toEqual(["Design"]);
    expect(state.services.filter.priceMin).toBe(100);
    expect(state.services.filter.priceMax).toBe(500);
  });

  it("should handle selecting 'All' category", () => {
    const { store } = renderWithProviders(<Filters />, { preloadedState });

    const categorySelect = screen.getByTestId("category-select");
    fireEvent.click(categorySelect);

    const allOption = screen.getAllByText("All")[0];
    fireEvent.click(allOption);

    expect(mockSetSearchParams).toHaveBeenCalledTimes(0);

    const state = store.getState();
    expect(state.services.filter.category).toEqual(["all"]);
  });

  it("should handle max price filter changes", () => {
    const { store } = renderWithProviders(<Filters />, { preloadedState });

    const maxPriceSelect = screen.getByTestId("max-price-select");
    fireEvent.click(maxPriceSelect);

    const priceOption = screen.getByText("400");
    fireEvent.click(priceOption);

    expect(mockSetSearchParams).toHaveBeenCalled();

    const state = store.getState();
    expect(state.services.filter.priceMax).toBe("400");
  });
});
