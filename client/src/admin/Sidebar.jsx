import React, { useState } from "react";
import UserDashboard from "./Users";
import ProductDashboard from "./Products";
import ContactUsMessages from "./ContactUsMessages";

const YourComponent = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <nav className="bg-white border-b border-gray-300 pt-4 pb-2">
        <div className="flex justify-between items-center px-9">
          <button
            id="menuBtn"
            onClick={handleMenuClick.bind(null, "dashboard")}
          >
            <i
              className={` text-lg text-gray-500 ${
                activeComponent === "dashboard"
                  ? "text-white bg-[#C08261]"
                  : ""
              }`}
            ></i>
          </button>
          <div className="flex flex-col justify-center items-center">
            <a href="#" title="" className="flex">
              <img className="w-auto h-8 lg:h-10" src="" />
            </a>
            <div>

Richesses de la Riviera
</div>
          </div>
          <div className="space-x-4">
            <button>
              <i className="fas fa-bell text-cyan-500 text-lg"></i>
            </button>
            <button>
              <i className="fas fa-user text-cyan-500 text-lg"></i>
            </button>
          </div>
        </div>
      </nav>

      <div
        id="sideNav"
        className="lg:block hidden bg-white w-64 h-screen fixed rounded-none border-none"
      >
        <div className="p-4 space-y-4 shadow-md h-screen">
          <a
            href="#"
            aria-label="dashboard"
            className={`relative px-4 py-3 flex items-center space-x-4 rounded-lg text-gray-500   ${
              activeComponent === "dashboard"
                ? "text-white bg-[#C08261]"
                : ""
            }`}
            onClick={handleMenuClick.bind(null, "dashboard")}
          >
            <span className="-mr-1 font-medium">Dashboard</span>
          </a>
          <a
            href="#"
            className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group ${
              activeComponent === "products"
                ? "text-white bg-[#C08261]"
                : ""
            }`}
            onClick={handleMenuClick.bind(null, "products")}
          >
            <span>Products</span>
          </a>
          <a
            href="#"
            className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group ${
              activeComponent === "users"
                ? "text-white bg-[#C08261]"
                : ""
            }`}
            onClick={handleMenuClick.bind(null, "users")}
          >
            <span>Users</span>
          </a>
          <a
            href="#"
            className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group ${
              activeComponent === "messages"
                ? "text-white bg-[#C08261]"
                : ""
            }`}
            onClick={handleMenuClick.bind(null, "messages")}
          >
            <span>Contact Us Messages</span>
          </a>
        </div>
      </div>

      <div className="lg:ml-64 lg:pl-4 lg:flex lg:flex-col lg:w-75% mt-5 mx-2">
        {activeComponent === "dashboard" && (
          <>
            <div className="bg-white md:p-2 p-6 rounded-lg border border-gray-200 mb-4 lg:mb-0 shadow-md lg:w-[35%]">
              {/* ... Dashboard content ... */}
            </div>
            <ProductDashboard />
            <UserDashboard />
            <ContactUsMessages />
          </>
        )}
        {activeComponent === "products" && <ProductDashboard />}
        {activeComponent === "users" && <UserDashboard />}
        {activeComponent === "messages" && <ContactUsMessages />}
      </div>
    </div>
  );
};

export default YourComponent;
