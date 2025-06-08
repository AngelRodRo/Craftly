import { renderWithProviders } from "@/shared/utils/test-utils";
import Filters from "./Filters";
import { screen, fireEvent, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RootState } from "@/app/store";

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

  it("should render all filter components", async () => {
    renderWithProviders(<Filters />, { preloadedState });

    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();

    const categorySelect = screen.getByTestId("category-select");
    await act(async () => {
      fireEvent.click(categorySelect);
    });

    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("Development")).toBeInTheDocument();
    expect(screen.getByText("Marketing")).toBeInTheDocument();

    const minPriceSelect = screen.getByTestId("min-price-select");
    await act(async () => {
      fireEvent.click(minPriceSelect);
    });

    const maxPriceSelect = screen.getByTestId("max-price-select");
    await act(async () => {
      fireEvent.click(maxPriceSelect);
    });

    expect(screen.getAllByText("100")).toHaveLength(2);
    expect(screen.getAllByText("400")).toHaveLength(2);
  });

  it("should handle category filter changes", async () => {
    const { store } = renderWithProviders(<Filters />, { preloadedState });

    const categorySelect = screen.getByTestId("category-select");
    await act(async () => {
      fireEvent.click(categorySelect);
    });

    const categoryOption = screen.getByText("Design");
    await act(async () => {
      fireEvent.click(categoryOption);
    });

    await waitFor(() => {
      const state = store.getState();
      expect(state.services.filter.category).toEqual(["Design"]);
    });
  });

  it("should handle price range filter changes", async () => {
    const { store } = renderWithProviders(<Filters />, { preloadedState });

    const minPriceSelect = screen.getByTestId("min-price-select");
    await act(async () => {
      fireEvent.click(minPriceSelect);
    });

    const priceOption = screen.getByText("100");
    await act(async () => {
      fireEvent.click(priceOption);
    });

    await waitFor(() => {
      const state = store.getState();
      expect(state.services.filter.priceMin).toBe("100");
    });
  });

  it("should handle selecting 'All' category", async () => {
    const { store } = renderWithProviders(<Filters />, { preloadedState });

    const categorySelect = screen.getByTestId("category-select");
    await act(async () => {
      fireEvent.click(categorySelect);
    });

    const allOption = screen.getAllByText("All")[0];
    await act(async () => {
      fireEvent.click(allOption);
    });

    await waitFor(() => {
      const state = store.getState();
      expect(state.services.filter.category).toEqual([]);
    });
  });

  it("should handle max price filter changes", async () => {
    const { store } = renderWithProviders(<Filters />, { preloadedState });

    const maxPriceSelect = screen.getByTestId("max-price-select");
    await act(async () => {
      fireEvent.click(maxPriceSelect);
    });

    const priceOption = screen.getByText("400");
    await act(async () => {
      fireEvent.click(priceOption);
    });

    await waitFor(() => {
      const state = store.getState();
      expect(state.services.filter.priceMax).toBe("400");
    });
  });
});
