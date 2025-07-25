import type { Service } from "../model";

export const categories = [
  "Cleaning",
  "Maintenance",
  "Repair",
  "Installation",
  "Consultation",
];

export const generateMockServices = async (
  count: number = 10
): Promise<Service[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Array.from({ length: count }, (_, index) => ({
    id: `service-${index + 1}`,
    name: `Service ${index + 1}`,
    description: `This is a detailed description for service ${index + 1}`,
    price: Math.floor(Math.random() * 200) + 50, // Random price between 50 and 250
    image: `https://picsum.photos/seed/${index}/200/200`, // Random image using picsum
    category: categories[Math.floor(Math.random() * categories.length)],
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(), // Random date within past ~4 months
    updatedAt: new Date().toISOString(), // Current date
  }));
};
