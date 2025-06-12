import { ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectCartQuantity } from "@/features/Cart/cartSelectors";

export default function Header() {
  const cartQuantity = useSelector(selectCartQuantity);

  return (
    <nav className="flex justify-between items-center p-4 bg-white border-b border-gray-200 w-full z-10">
      <div className="flex items-center gap-2 justify-center">
        <Link to="/">
          <h1 className="text-2xl font-bold">Craftly</h1>
        </Link>
      </div>
      <div className="flex items-center gap-2 justify-end">
        <Link to="/cart">
          <div className="relative" data-testid="shopping-cart-icon">
            <ShoppingCartIcon className="w-6 h-6" />
            {cartQuantity > 0 && (
              <span
                data-testid="cart-quantity"
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                {cartQuantity}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
}
