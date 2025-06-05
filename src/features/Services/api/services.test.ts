import type { Service } from "../model";
import { generateMockServices } from "../utils";
import { fetchServices } from "./services";

jest.mock("../utils", () => ({
  generateMockServices: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const mockServices: Service[] = [
  {
    id: "1",
    name: "Service 1",
    price: 5,
    category: "category1",
    description: "Description 1",
    image: "image1.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Service 2",
    price: 10,
    category: "category2",
    description: "Description 2",
    image: "image2.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Service 10",
    price: 15,
    category: "category3",
    description: "Description 3",
    image: "image3.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Service 4",
    price: 20,
    category: "category4",
    description: "Description 4",
    image: "image4.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe("fetchServices", () => {
  it("should return all services when no filter is applied", async () => {
    (generateMockServices as jest.Mock).mockReturnValue(mockServices);

    const services = await fetchServices({
      name: "",
      priceMin: 0,
      priceMax: 0,
      category: [],
      page: 1,
      limit: 10,
    });
    expect(services).toBeDefined();
    expect(services.length).toBe(mockServices.length);
  });

  it("should return services when name filter is applied", async () => {
    (generateMockServices as jest.Mock).mockReturnValue(mockServices);

    const services = await fetchServices({
      name: "Service 10",
      priceMin: 0,
      priceMax: 0,
      category: [],
      page: 1,
      limit: 10,
    });

    expect(services).toBeDefined();
    expect(services.length).toBe(1);
  });

  it("should return services when priceMin filter is applied", async () => {
    (generateMockServices as jest.Mock).mockReturnValue(mockServices);

    const services = await fetchServices({
      name: "",
      priceMin: 10,
      priceMax: 0,
      category: [],
      page: 1,
      limit: 10,
    });

    expect(services).toBeDefined();
    expect(services.length).toBe(3);
  });

  it("should return services when priceMin and priceMax filter is applied", async () => {
    (generateMockServices as jest.Mock).mockReturnValue(mockServices);

    const services = await fetchServices({
      name: "",
      priceMin: 10,
      priceMax: 20,
      category: [],
      page: 1,
      limit: 10,
    });

    expect(services).toBeDefined();
    expect(services.length).toBe(3);
  });

  it("should return services when priceMax filter is applied", async () => {
    (generateMockServices as jest.Mock).mockReturnValue(mockServices);

    const services = await fetchServices({
      name: "",
      priceMin: 0,
      priceMax: 10,
      category: [],
      page: 1,
      limit: 10,
    });

    expect(services).toBeDefined();
    expect(services.length).toBe(2);
  });

  it("should return services when category filter is applied", async () => {
    (generateMockServices as jest.Mock).mockReturnValue(mockServices);

    const services = await fetchServices({
      name: "",
      priceMin: 0,
      priceMax: 0,
      category: ["category1"],
      page: 1,
      limit: 10,
    });

    expect(services).toBeDefined();
    expect(services.length).toBe(1);
  });
});
