import type { Service } from "../model";
import { generateMockServices } from "../utils";
import { fetchServices } from "./services";

jest.mock("../utils", () => ({
  generateMockServices: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const mockServicesWithCategory1 = [
  {
    id: "5",
    name: "Service 5",
    price: 25,
    category: "category1",
    description: "Description 5",
    image: "image5.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Service 6",
    price: 30,
    category: "category1",
    description: "Description 6",
    image: "image6.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Service 7",
    price: 35,
    category: "category1",
    description: "Description 7",
    image: "image7.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Service 8",
    price: 40,
    category: "category1",
    description: "Description 8",
    image: "image8.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "9",
    name: "Service 9",
    price: 45,
    category: "category1",
    description: "Description 9",
    image: "image9.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "10",
    name: "Service 10",
    price: 50,
    category: "category1",
    description: "Description 10",
    image: "image10.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "11",
    name: "Service 11",
    price: 55,
    category: "category1",
    description: "Description 11",
    image: "image11.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockServices: Service[] = [
  {
    id: "1",
    name: "Service 1",
    price: 5,
    category: "category1",
    description: "Description 1",
    image: "image1.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  ...mockServicesWithCategory1,
  {
    id: "2",
    name: "Service 2",
    price: 10,
    category: "category2",
    description: "Description 2",
    image: "image2.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Service 10",
    price: 15,
    category: "category3",
    description: "Description 3",
    image: "image3.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Service 4",
    price: 20,
    category: "category4",
    description: "Description 4",
    image: "image4.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

describe("fetchServices", () => {
  it("should return all services when no filter is applied", async () => {
    (generateMockServices as jest.Mock).mockReturnValue(mockServices);

    const { services, totalPages } = await fetchServices({
      name: "",
      priceMin: 0,
      priceMax: 0,
      category: [],
      page: 1,
      limit: 10,
    });
    expect(services).toBeDefined();
    expect(totalPages).toBe(Math.ceil(mockServices.length / 10));
  });

  it("should return services when name filter is applied", async () => {
    (generateMockServices as jest.Mock).mockReturnValue(mockServices);

    const { services, totalPages } = await fetchServices({
      name: "Service 10",
      priceMin: 0,
      priceMax: 0,
      category: [],
      page: 1,
      limit: 10,
    });

    expect(services).toBeDefined();
    expect(services.length).toBe(2);
    expect(totalPages).toBe(1);
  });

  it("should return services when priceMin filter is applied", async () => {
    (generateMockServices as jest.Mock).mockReturnValue(mockServices);

    const { services, totalPages } = await fetchServices({
      name: "",
      priceMin: 10,
      priceMax: 0,
      category: [],
      page: 1,
      limit: 10,
    });

    expect(services).toBeDefined();
    expect(totalPages).toBe(1);
  });

  it("should return services when priceMin and priceMax filter is applied", async () => {
    (generateMockServices as jest.Mock).mockReturnValue(mockServices);

    const { services, totalPages } = await fetchServices({
      name: "",
      priceMin: 10,
      priceMax: 20,
      category: [],
      page: 1,
      limit: 10,
    });

    expect(services).toBeDefined();
    expect(services.length).toBe(3);
    expect(totalPages).toBe(1);
  });

  it("should return services when priceMax filter is applied", async () => {
    (generateMockServices as jest.Mock).mockReturnValue(mockServices);

    const { services, totalPages } = await fetchServices({
      name: "",
      priceMin: 0,
      priceMax: 10,
      category: [],
      page: 1,
      limit: 10,
    });

    expect(services).toBeDefined();
    expect(services.length).toBe(2);
    expect(totalPages).toBe(1);
  });

  it("should return services when category filter is applied", async () => {
    (generateMockServices as jest.Mock).mockReturnValue(mockServices);

    const { services, totalPages } = await fetchServices({
      name: "",
      priceMin: 0,
      priceMax: 0,
      category: ["category1"],
      page: 1,
      limit: 10,
    });

    expect(services).toBeDefined();
    expect(totalPages).toBe(1);
  });

  it("should return correct total pages when page and limit are applied", async () => {
    (generateMockServices as jest.Mock).mockReturnValue(mockServices);

    const { totalPages } = await fetchServices({
      name: "",
      priceMin: 0,
      priceMax: 0,
      category: [],
      page: 1,
      limit: 10,
    });

    expect(totalPages).toBe(2);
  });

  it("should return correct total pages when filters are applied and page and limit are applied", async () => {
    (generateMockServices as jest.Mock).mockReturnValue(mockServices);

    const { totalPages } = await fetchServices({
      name: "Service 10",
      priceMin: 10,
      priceMax: 20,
      category: [],
      page: 1,
      limit: 10,
    });

    expect(totalPages).toBe(1);
  });

  it("should return correct total pages when category filter is equal to 'category1'", async () => {
    (generateMockServices as jest.Mock).mockReturnValue(mockServices);

    const { totalPages } = await fetchServices({
      name: "",
      priceMin: 0,
      priceMax: 0,
      category: ["category1"],
      page: 1,
      limit: 10,
    });

    expect(totalPages).toBe(1);
  });

  it("should return correct total pages when category filter is equal to 'category1' and min price is equal to 10", async () => {
    (generateMockServices as jest.Mock).mockReturnValue(mockServices);

    const { totalPages } = await fetchServices({
      name: "",
      priceMin: 10,
      priceMax: 0,
      category: ["category1"],
      page: 1,
      limit: 10,
    });

    expect(totalPages).toBe(1);
  });
  
});
