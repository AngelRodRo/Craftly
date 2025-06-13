import { useAppSelector } from "@/app/hook";
import { useMemo } from "react";

export const useCart = () => {
  const cart = useAppSelector((state) => state.cart);
  const total = useMemo(
    () => cart.items.reduce((acc, item) => acc + item.price, 0),
    [cart.items]
  );
  return { ...cart, total };
};
