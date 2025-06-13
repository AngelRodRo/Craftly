import { useCart } from "@/features/Cart/hooks/useCart";

import CheckoutItem from "./CheckoutItem";
import { Button } from "@/shared/components/ui/button";

export default function Checkout() {
  const { items, total } = useCart();
  return (
    <div className="flex flex-col gap-4 mx-4">
      <div className="mx-auto flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center mt-4">Checkout</h1>
        <div className="flex flex-col gap-4 items-center mt-4">
          <div className="flex flex-col gap-4 items-center">
            {items.map((item) => (
              <CheckoutItem key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <h2 className="text-3xl font-bold">Total:</h2>
          <p className="text-3xl font-bold">S/. {total}</p>
        </div>
        <Button>Checkout</Button>
      </div>
    </div>
  );
}
