

import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomPagination from "../Components/CustomPagination";
import Card from "../Components/Card";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 15;
  const [selectedCategory, setSelectedCategory] = useState(5);
  const [sortOption, setSortOption] = useState("default");
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCategory == 5) {
          const response = await axios.get("http://localhost:8000/products");
          setProducts(response.data);
        } else {
          const response = await axios.get(
            `http://localhost:8000/product/${selectedCategory}`
          );
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  // const filteredProducts =
  //   selectedCategory === "All"
  //     ? products
  //     : products.filter(
  //         (product) =>
  //           product.category.toLowerCase() === selectedCategory.toLowerCase()
  //       );

  const filteredBySearch = searchInput
  ? products.filter(
      (product) =>
        product.product_name.toLowerCase().includes(searchInput.toLowerCase())
    )
  : products;


  const sortedProducts = [...filteredBySearch];
  if (sortOption === "priceLowToHigh") {
    sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sortOption === "priceHighToLow") {
    sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (sortOption === "topRated") {
    // Implement top-rated sorting logic if needed
  }

  const pageCount = Math.ceil(sortedProducts.length / productsPerPage);
  const displayedProducts = sortedProducts.slice(
    pageNumber * productsPerPage,
    (pageNumber + 1) * productsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div>
      <div className="lg:mx-32">
        <div className="mt-8 shadow-md mx-14">
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Search something.."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        <div className="flex mt-10 mx-20 justify-between">
          <div className="mb-0">
            <div className="flex space-x-4">
              {[
                { name: "All", id: 5 },
                { name: "Clothes", id: 1 },
                { name: "Accesories", id: 2 },
                { name: "Handmade", id: 3 },
                { name: "Food", id: 4 },
              ].map((category) => (
                <button
                  key={category.id}
                  className={`border px-4 py-2 rounded-lg ${
                    selectedCategory === category.name
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-0">
            <label className="block text-sm font-medium text-gray-700">
              <select
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-md"
              >
                <option value="default">Default</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="topRated">Top Rated</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center flex-wrap mx-10 mt-14">
          <div className="flex flex-wrap gap-3 justify-around">
            {displayedProducts.map((product) => (
              <Card
                key={product.product_id}
                id={product.product_id}
                name={product.product_name}
                category={product.category_id}
                price={product.price}
                image={product.product_img}
              />
            ))}
          </div>
          <CustomPagination
          currentPage={pageNumber + 1} // Assuming pageNumber is zero-based
          totalPages={pageCount}
          onPageChange={handlePageClick}
        />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
