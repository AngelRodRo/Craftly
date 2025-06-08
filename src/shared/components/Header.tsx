import { ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router";

export default function Header() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white border-b border-gray-200 w-full z-10">
      <div className="flex items-center gap-2 justify-center">
        <Link to="/">
          <h1 className="text-2xl font-bold">Craftly</h1>
        </Link>
      </div>
      <div className="flex items-center gap-2 justify-end">
        <Link to="/cart">
          <ShoppingCartIcon className="w-6 h-6" />
        </Link>
      </div>
    </nav>
  );
}
