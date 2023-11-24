import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Swal from 'sweetalert';


function Card({ category, product_name, price, image,  }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cart items from local storage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
  
        // Fetch data from your API
        const response = await axios.get("https://loocalhost:8000/products");
        // Log the data array specifically
        console.log('API Data:', response.data);
        
        // Set loading to false once data is fetched
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from API:', error);
        // Set loading to false on error
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  // const handleAddToCartClick = () => {
  //   // if (!isAuthenticated) {
  //   //   // If the user is not logged in, show a login alert
  //   //   Swal({
  //   //     title: 'Login Required',
  //   //     text: 'You need to log in before adding items to the cart.',
  //   //     icon: 'warning',
  //   //     buttons: ['Cancel', 'Log In'],
  //   //   }).then((result) => {
  //   //     if (result) {
  //   //       // Redirect the user to the login page or open your login modal
  //   //       // You might need to implement the actual redirection or modal opening logic
  //   //       console.log('Redirecting to login...');
  //   //     }
  //   //   });
  //   // } else {
  //   //   // If the user is logged in, show a success alert
  //   //   Swal({
  //   //     title: 'Added to Cart',
  //   //     text: 'The item has been added to your cart.',
  //   //     icon: 'success',
  //   //   });

  //     // Add the item to the cart in local storage
  //     const newproduct = { product_name, price, image };
  //     const newCart = [...cart, newproduct];
  //     setCart(newCart);
  //     localStorage.setItem('cart', JSON.stringify(newCart));
  //   }
  // };

  return (
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl mb-6">
      <div className="relative">
      <img src= {image} className="h-72 w-72"  alt="Card Image" />
        <div className="absolute top-3 right-3">
          <button >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="gray"
              className="w-6 h-6 fill-on-hover"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="px-4 py-3 w-72">
        <span className="text-gray-400 mr-3 uppercase text-xs">{category}</span>
        <Link to={"/details"}>
          <p className="text-lg font-medium text-black truncate block capitalize">
            {product_name}
          </p>
        </Link>
        <div className="flex items-center">
          <p className="text-lg font-medium text-black cursor-auto my-3">
            {price}
          </p>
          <div className="ml-auto">
            <button >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-bag-plus fill-on-hover"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
