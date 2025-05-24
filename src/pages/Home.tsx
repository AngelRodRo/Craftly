import { useAppDispatch, useAppSelector } from "@/app/hook";
import { useEffect } from "react";
import { fetchServices } from "@/features/Services/servicesSlice";
import { Card, CardContent } from "@/shared/components/ui/card";

export default function Home() {
  const dispatch = useAppDispatch();
  const services = useAppSelector((state) => state.services.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <img
                  src={service.image}
                  alt={service.name}
                  width={100}
                  height={100}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{service.name}</h3>
                <p className="text-xs text-gray-500">{service.category}</p>
                <p className="text-sm text-gray-500">{service.description}</p>
                <p className="text-xl font-bold">S/. {service.price}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div></div>
    </div>
  );
}
