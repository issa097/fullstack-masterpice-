import React from "react";
import Home from "./Pages/Home";
import Details from "./Pages/Details";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllProducts from "./Pages/AllProducts";
import Contact from "./Pages/ContactUs";
import Categories from "./Components/Categories";
import LoginForm from "./Pages/Login";
import RegisterForm from "./Pages/Regestier";
import Payment from "./Pages/Payment";
import Cart from "./Pages/Cart";
import UserProfile from "./Pages/UserProfile";
import YourComponent from "./admin/Sidebar";
import NotFound from "./Pages/NotFound";
import AllBlogs from "./Pages/AllBlogs";
import BlogsDetails from "./Pages/BlogsDetails";
import { OrderProvider } from "./OrderContext/OrderContext";
import AboutUs from "../src/Pages/AboutUs"
import ContactUs from "./Pages/ContactUs";
import Side from "./Components/Side";

const App = () => {
  return (
    <Router>
      <OrderProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/AllProducts" element={<AllProducts />} />
          <Route path="/ContactUs" element={<ContactUs/>} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/side" element={<Side />} />
          <Route path="/admin" element={<YourComponent />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/blogsdetails/:id" element={<BlogsDetails />} />
          {/* <Route path='/payment' element={<PaymentForm />} /> */}
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </OrderProvider>
    </Router>
  );
};

export default App;
