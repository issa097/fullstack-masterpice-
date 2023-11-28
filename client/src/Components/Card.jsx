// Card.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Card({ id, rating  , product, price, image }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cart items from local storage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);

        // Fetch data from your API
        const response = await axios.get(`https://localhost:8000/products/${id}`);
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
  }, [id]);

  const handleAddToCartClick = () => {
    try {
      // Add the item to the cart in local storage
      const newProduct = { id,rating, product, price, image };
      const newCart = [...cart, newProduct];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
  
      // Optional: You can provide feedback to the user here
      console.log('Item added to cart:', newProduct);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <Link to={`/details/${id}`}>
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl mb-6">
        <div className="relative">
          <img src={image} className="h-72 w-72" alt="Card Image" />
          <div className="absolute top-3 right-3">
            <button onClick={handleAddToCartClick}>
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
          {/* <span className="text-gray-400 mr-3 uppercase text-xs">{category}</span> */}
          <p className="text-lg font-medium text-black truncate block capitalize">
            {product}
          </p>
          <div className="flex items-center">
          <p className="text-lg font-medium text-black cursor-auto my-3">
              {price}
            </p>

            <p className="text-lg font-medium text-red cursor-auto my-3">
              {rating}
            </p>
            <div className="ml-auto">
              <button>
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
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
