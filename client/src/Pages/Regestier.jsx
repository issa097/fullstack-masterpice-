import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GoogleSignUp from "../Components/GoogleSignup";
import Swal from 'sweetalert';



const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
   
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Invalid email address";
    }
  
    if (!formData.password || formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
  
    return Object.keys(errors).length === 0;
  };
  

  const redirectToLogin = () => {
    window.location.href = "/";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:8000/register", formData);
        console.log(response.data.message);
        Swal({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You have successfully registered.',
          confirmButtonColor: '#C08261',
        }).then(() => {
          redirectToLogin();
        });
      } catch (error) {
        console.error("Error registering user:", error);
        setErrors(error.response.data.errors);
        Swal({
          icon: 'error',
          title: 'Registration Failed!',
          text: 'There was an error during registration. Please try again.',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

    return (
      <div className="font-[sans-serif] bg-[#C08261] text-[#C08261]">
      <div className="min-h-screen flex flex-col items-center justify-center lg:p-6 p-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <form
            className="bg-white rounded-xl px-6 py-8 space-y-6 max-w-md md:mr-auto max-md:mx-auto w-full"
            onSubmit={handleSubmit}
          >
            <h3 className="text-3xl font-extrabold mb-12 max-md:text-center">
       Sign Up
            </h3>
            <div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-[#C08261]"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-[#C08261]"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-[#333]"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div className="!mt-10">
              <button
                type="button"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#C08261] hover:bg-[#E2C799] focus:outline-none" onClick={handleSubmit}
              >
                Register
              </button>
            </div>
            <div className="mt-4">
              <GoogleSignUp />
              </div>
          </form>
          <div className="max-md:text-center text-right">
            <h2 className="text-4xl font-extrabold lg:leading-[50px] text-white">
              Welcome To Richesses De La Riviera
            </h2>
            <p className="text-sm mt-6 text-white">
              A Place Where You Can Find Your Local Grocery And More
            </p>
            <p className="text-sm mt-10 text-white">
              Already Have An Account{' '}
              <Link to="/login" className="text-white font-semibold underline ml-1">
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
 

export default RegisterForm;
