import { generateMockServices } from "./services";

describe("Services utils", () => {
  it("should generate mock services", async () => {
    const services = await generateMockServices(10);
    expect(services).toBeDefined();
    expect(services.length).toBe(10);
    expect(services[0].id).toBe("service-1");
    expect(services[0].name).toBe("Service 1");
    expect(services[0].description).toBe(
      "This is a detailed description for service 1"
    );
    expect(services[0].price).toBeGreaterThanOrEqual(50);
    expect(services[0].price).toBeLessThanOrEqual(250);
    expect(services[0].image).toBe("https://picsum.photos/seed/0/200/200");
    expect(services[0].createdAt).toBeDefined();
    expect(services[0].updatedAt).toBeDefined();
  });
});
