import React, { useState } from "react";

const AddProductForm = ({ onSave, onClose }) => {
  const [productData, setProductData] = useState({
    product_name: "",
    product_dis: "",
    price: 0,
    category_id: "",
    product_img:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductData({ ...productData, image: file });
  };

  const handleSave = () => {
    onSave(productData);
    onClose(); // Close the form after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50">
      <div className="bg-white p-4 shadow-md rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <div className="mb-4">
          <label
            htmlFor="product_name"
            className="block text-sm font-medium text-gray-600"
          >
            Product Name
          </label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={productData.product_name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="product_detail"
            className="block text-sm font-medium text-gray-600"
          >
            Product Detail
          </label>
          <input
            type="text"
            id="product_detail"
            name="product_detail"
            value={productData.product_dis}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="count"
            className="block text-sm font-medium text-gray-600"
          >
            Count
          </label>
          {/* <input
            type="number"
            id="count"
            name="count"
            value={productData.count}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          /> */}
        </div>
        <div className="mb-4">
          <label
            htmlFor="category_id"
            className="block text-sm font-medium text-gray-600"
          >
            Category ID
          </label>
          <input
            type="text"
            id="category_id"
            name="category_id"
            value={productData.category_id}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-[#C08261] text-white rounded-lg mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-[#DB5750] text-white rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;