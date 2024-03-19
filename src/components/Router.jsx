import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./Admin";

import Home from "../pages/Home";
import ProductOrder from "../pages/ProductOrder";
import ProductComponent from "./HomeComponents/ProductComponent";
import AllProducts from "../pages/AllProducts";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Cart from "../pages/Cart";

import Rating from "./HomeComponents/Rating";
import Sample from "../pages/Sample";
import ItemCart from "../pages/ItemCart";
import Bag from "../pages/Bag";
import OrderConfirm from "../pages/OrderConfirm";
import OrderMessage from "../pages/OrderMessage";
import MyProfile from "../pages/account/my-profile/MyProfile";
import Notifications from "../pages/account/notifications/Notifications";
import MyAddress from "../pages/account/my-address/MyAddress";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:brand/:slug/:id" element={<ProductOrder />} />
        <Route path="/products/:slug/:id" element={<ProductComponent />} />
        <Route path="/products/" element={<AllProducts />} />
        <Route path="/products/category/:catId" element={<AllProducts />} />
        <Route path="/products/brand/:id" element={<AllProducts />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/my-profile/:id" element={<MyProfile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/address/:id" element={<MyAddress />} />

        <Route path="/sample/:id" element={<ItemCart />} />
        <Route path="/confirm/:id" element={<OrderConfirm />} />
        <Route path="/confirm" element={<OrderConfirm />} />
        <Route path="/message/:name" element={<OrderMessage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
