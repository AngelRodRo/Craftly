import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
