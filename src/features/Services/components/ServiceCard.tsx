import { Button } from "@/shared/components/ui/button";
import { CardContent } from "@/shared/components/ui/card";
import { Card } from "@/shared/components/ui/card";
import type { Service } from "../model";
import { ShoppingCart } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  onAddToCart?: () => void;
}

export default function ServiceCard({
  service,
  onAddToCart,
}: ServiceCardProps) {
  return (
    <Card key={service.id}>
      <CardContent className="grid grid-cols-2 gap-4 items-center">
        <div>
          <img
            className="rounded-lg object-cover"
            src={service.image}
            alt={service.name}
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">{service.name}</h3>
          <p className="text-xs text-gray-500">{service.category}</p>
          <p className="text-sm text-gray-500">{service.description}</p>
          <p className="text-xl font-bold">S/. {service.price}</p>
        </div>
        <Button className="w-full cursor-pointer" onClick={onAddToCart}>
          <ShoppingCart />
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
}
