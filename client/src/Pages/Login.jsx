import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert";
import GoolgeSignInButton from "../Components/GoogleSignup";
const LoginForm = () => {
  const [formData, setFormData] = useState({
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

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const redirectToHome = () => {
    window.location.href = "/";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        formData
      );
      console.log(response.data);

      const user = response.data.user;
      const token = response.data.token;
      localStorage.setItem("token", token);

      if (user) {
        redirectToHome("/");
        Swal({
          icon: "success",
          title: `Welcome, ${user.username}!`,
          confirmButtonColor: "#C08261",
        });
      } else {
        console.error("User not found.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrors(error.response.data.errors);
      Swal({
        icon: "error",
        title: "Login Failed!",
        text: "There was an error during login. Please check your credentials and try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="font-[sans-serif] bg-[#C08261] text-[#C08261]">
      <div className="min-h-screen flex flex-col items-center justify-center lg:p-6 p-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div className="max-md:text-center">
            <h2 className="text-4xl font-extrabold lg:leading-[50px] text-white">
              Welcome To Richesses De La Riviera
            </h2>
            <p className="text-sm mt-6 text-white">
              A Place Were You Can Find Your Local Grocery And More
            </p>
            <p className="text-sm mt-10 text-white">
              Don't have an account{" "}
              <Link
                to="/regestier"
                className="text-white font-semibold underline ml-1"
              >
                Register here{" "}
              </Link>
            </p>
          </div>
          <form
            className="bg-white rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto max-md:mx-auto w-full"
            onSubmit={handleSubmit}
          >
            <h3 className="text-3xl font-extrabold mb-12 max-md:text-center">
              Sign in
            </h3>
            <div>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-[#C08261]"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-[#333]"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="!mt-10">
              <button
                type="button"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#C08261] hover:bg-[#E2C799] focus:outline-none"
                onClick={handleSubmit}
              >
                Log in
              </button>
              <GoolgeSignInButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
