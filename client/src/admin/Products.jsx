import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import ProductForm from "./EditProduct";
import AddProductForm from "./AddProuct";

const ProductDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited
  const productsPerPage = 10;
  const [pageNumber, setPageNumber] = useState(0);
  const [isAddProductFormVisible, setIsAddProductFormVisible] = useState(false);

  useEffect(() => {
    // Fetch products from your API endpoint
    axios
      .get("http://localhost:8000/products")
      .then((response) => {
        console.log(response.data); // Log the entire response to see its structure
        const fetchedProducts = response.data || []; // Check for 'products' property
        setProducts(fetchedProducts);
        setSearchResults(fetchedProducts);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = () => {
    const filteredProducts = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredProducts);
    setPageNumber(0); // Reset the page number when searching
  };

  const handleEditProduct = (product) => {
    // Set the product to be edited
    setEditingProduct(product);
  };

  const handleEditFormClose = () => {
    // Close the edit form
    setEditingProduct(null);
  };

  const handleSaveEdit = (editedProduct) => {
    // Send the edited product data to your API using Axios
    console.log(editedProduct);
    axios
      .put(
        `http://localhost:8000/updateproduct/${editedProduct.product_id}`,
        editedProduct.formData
      )
      .then((response) => {
        // Handle the successful response
        console.log(response);
        alert(`Successfully saved product: ${editedProduct.product_name}`);
        // Close the edit form
        setEditingProduct(null);
        // Fetch updated data or update the product list
        // You may want to update the product list after editing the product
      })
      .catch((error) => {
        // Handle errors
        console.error("Error saving product:", error);
        alert("Failed to save the product. Please try again.");
      });
  };

  const handleAddProduct = (newProduct) => {
    axios
      .post("http://localhost:8000/product", newProduct)
      .then((response) => {
        // Successfully added the new product
        // You can also fetch the updated product list if needed
        alert(`Added product: ${newProduct.product_name}`);
        setIsAddProductFormVisible(false); // Close the form
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error adding product:", error);
        // You might want to show an error message to the user
        // Handle the error according to your application's requirements
      });
  };

  const handleDeleteProduct = (productId) => {
    // Send a DELETE request to remove the product using Axios
    axios
      .put(`http://localhost:8000/deleteproduct/${productId}`)
      .then((response) => {
        // Handle the successful response
        alert("Product deleted successfully");
        // Refresh or update the product list after deletion
        // You may want to refetch or update the product list
      })
      .catch((error) => {
        // Handle errors
        console.error("Error deleting product:", error);
        alert("Failed to delete the product. Please try again.");
      });
  };

  const pageCount = Math.ceil(searchResults.length / productsPerPage);
  const displayedProducts = searchResults.slice(
    pageNumber * productsPerPage,
    (pageNumber + 1) * productsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <div className="w-full max-w-3xl mx-auto p-4">
        <label htmlFor="product-search" className="sr-only">
          Search for products
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            id="product-search"
            className="w-full p-2 text-sm border border-gray-300 rounded-lg"
            placeholder="Search for products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-[#C08261] text-white rounded-lg"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="px-4 py-2 bg-[#C08261] text-sm text-white rounded-lg"
            onClick={() => setIsAddProductFormVisible(true)}
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="w-full max-w-3xl mx-auto mt-4">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-[#F9EFE6]">
              <th className="p-2">Product Name</th>
              <th className="p-2">Category ID</th>
              <th className="p-2">Price</th>
              <th className="p-2">image</th>
              <th className="p-2">discreption</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product) => (
              <tr
                key={product.product_id}
                className="border-b border-gray-300 text-center"
              >
                <td className="p-2 text-sm">{product.product_name}</td>
                <td className="p-2 text-sm">{product.category_id}</td>
                <td className="p-2 text-sm">${product.price}</td>
                {/* <td className="p-2 text-sm">{product.product_img}</td> */}
                <img src={product.product_img} alt="" />
                <td className="p-2 text-sm">{product.product_dis}</td>
                <td className="p-2 text-sm">
                  <div className="flex justify-center">
                    <button
                      className="px-4 py-2 bg-[#C08261] text-white rounded-lg"
                      onClick={() => handleEditProduct(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 px-4 py-2 bg-[#C08261] text-white rounded-lg"
                      onClick={() => handleDeleteProduct(product.product_id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        className="flex flex-row justify-center gap-6 m-10"
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onEdit={handleSaveEdit}
          onClose={handleEditFormClose}
        />
      )}
      {isAddProductFormVisible && (
        <AddProductForm
          // onSave={handleAddProduct}
          onClose={() => setIsAddProductFormVisible(false)}
        />
      )}
    </div>
  );
};

export default ProductDashboard;
