import { Route } from "react-router";
import { BrowserRouter } from "react-router";
import { Routes } from "react-router";
import Layout from "@/shared/components/Layout";
import Home from "@/pages/Home/index";
import Checkout from "@/pages/Checkout/index";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
