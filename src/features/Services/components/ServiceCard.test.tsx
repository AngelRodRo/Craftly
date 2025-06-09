import { act, fireEvent, render, screen } from "@testing-library/react";
import ServiceCard from "./ServiceCard";
import type { Service } from "../model.ts";

const mockService: Service = {
  id: "1",
  name: "Service 1",
  price: 100.0,
  category: "category1",
  description: "Description 1",
  image: "image1.jpg",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("ServiceCard", () => {
  it("should render", () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText(mockService.name)).toBeDefined();
    expect(screen.getByText(`S/. ${mockService.price}`)).toBeDefined();
    expect(screen.getByText(mockService.category)).toBeDefined();
    expect(screen.getByText(mockService.description)).toBeDefined();
    expect(screen.getByAltText(mockService.name)).toBeDefined();
    expect(screen.getByRole("button", { name: "Add to cart" })).toBeDefined();
  });

  it("should trigger add to cart action", () => {
    const handleAddToCart = jest.fn();
    render(<ServiceCard service={mockService} onAddToCart={handleAddToCart} />);
    const button = screen.getByRole("button", { name: "Add to cart" });

    act(() => {
      fireEvent.click(button);
    });

    expect(handleAddToCart).toHaveBeenCalled();
  });
});
