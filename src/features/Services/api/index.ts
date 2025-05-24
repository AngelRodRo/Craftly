import { generateMockServices } from "../utils";

export const fetchServices = async () => {
  const services = generateMockServices(10);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return services;
};
