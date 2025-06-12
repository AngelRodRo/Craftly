import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import { fetchCartItems } from "@/features/Cart/cartSlice";
import { useEffect } from "react";
import { useAppDispatch } from "@/app/hook";

export default function Layout() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
