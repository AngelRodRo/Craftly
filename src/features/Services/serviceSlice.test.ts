import reducer, {
  fetchServices,
  initialState,
  setFilter,
} from "./servicesSlice";

const mockServices = [
  {
    id: "1",
    name: "Service 1",
    price: 100,
    category: "category1",
  },
];

describe("Services slice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the initial state", async () => {
    const state = reducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("should handle set filter action", async () => {
    const state = reducer(
      undefined,
      setFilter({
        name: "Service 1",
        priceMin: 100,
        priceMax: 200,
        category: ["category1"],
        page: 1,
        limit: 10,
      })
    );
    expect(state.filter.name).toBe("Service 1");
    expect(state.filter.priceMin).toBe(100);
    expect(state.filter.priceMax).toBe(200);
    expect(state.filter.category).toEqual(["category1"]);
  });

  it("should handle fetchServices.pending", () => {
    const action = { type: fetchServices.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it("should handle fetchServices.fulfilled", () => {
    const action = {
      type: fetchServices.fulfilled.type,
      payload: mockServices,
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.services).toEqual(mockServices);
    expect(state.error).toBe(null);
  });

  it("should handle fetchServices.rejected", () => {
    const action = {
      type: fetchServices.rejected.type,
      error: {
        message: "Error",
      },
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.services).toEqual([]);
    expect(state.error).toBe("Error");
  });
});
