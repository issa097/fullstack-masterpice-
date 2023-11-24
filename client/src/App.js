import React from 'react';
import Home from './Pages/Home';
import Details from './Pages/Details'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllProducts from './Pages/AllProducts';
import Contact from './Pages/ContactUs';
import Categories from './Components/Categories';
import LoginForm from './Pages/Login';
import RegisterForm from './Pages/Regestier';
import AllCourses from './Pages/AllCourses';
import CoursesDetails from './Pages/CoursesDetails';
import Payment from './Pages/Payment';
import Cart from './Pages/Cart';
import UserProfile from './Pages/UserProfile';
import YourComponent from "./admin/Sidebar"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/AllProducts" element={<AllProducts/>} />
        <Route path='/ContactUs' element={<Contact/>} />
        <Route path='/Categories' element={<Categories/>} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/register' element={<RegisterForm/>} />
        <Route path='/allcourses' element={<AllCourses/>} />
        <Route path='/courses/:id' element={<CoursesDetails />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route exact path="/admin" element={<YourComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
