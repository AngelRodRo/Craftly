import { MinusIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { CartItem } from "@/features/Cart/model";

interface CheckoutItemProps {
  item: CartItem;
}

export default function CheckoutItem({ item }: CheckoutItemProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between gap-4 items-center">
          <img src={item.image} alt={item.name} className="w-16 h-16" />
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
            <Button variant="outline" size="sm">
              <MinusIcon className="w-4 h-4" />
              <p>Remove</p>
            </Button>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <p className="text-lg font-bold">{item.price}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
