import type { Filter } from "../types";
import { categories, generateMockServices } from "../utils";
import type { Service } from "@/features/Services/model";
import { DEFAULT_SERVICE_LIMIT } from "../constants/service";

export const fetchCategories = async () => {
  return categories;
};

export type FetchServicesResponse = {
  services: Service[];
  totalPages: number;
};

export const fetchServices = async (
  filter: Filter
): Promise<FetchServicesResponse> => {
  let services = await generateMockServices(20);

  if (filter.name) {
    services = services.filter((service) =>
      service.name.toLowerCase().includes(filter.name?.toLowerCase() ?? "")
    );
  }

  if (filter.priceMin) {
    services = services.filter(
      (service) => service.price >= (filter.priceMin ?? 0)
    );
  }

  if (filter.priceMax) {
    services = services.filter(
      (service) => service.price <= (filter.priceMax ?? 0)
    );
  }
  if (filter.category?.length && filter.category.length > 0) {
    if (!filter.category.includes("all")) {
      services = services.filter((service) =>
        filter.category.includes(service.category)
      );
    }
  }

  const totalPages = Math.ceil(
    services.length / (filter.limit ?? DEFAULT_SERVICE_LIMIT)
  );

  if (filter.page && filter.limit) {
    services = services.slice(
      (filter.page - 1) * filter.limit,
      filter.page * filter.limit
    );
  }

  return {
    services,
    totalPages,
  };
};
