import React from "react";

const CategoryFilters = ({ selectedCatalog, setSelectedCatalog }) => {
  const categories = [
    { name: "Clothes", id: 1 },
    { name: "Accesories", id: 2 },
    { name: "Handmade", id: 3 },
    { name: "Food", id: 4 },
  ];

  return (
    <div className="flex justify-center space-x-4">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`px-4 py-2 rounded ${
            selectedCatalog === category.id
              ? "bg-[#C08261] text-white"
              : "bg-white text-[#C08261] border-[#C08261] border hover:bg-[#C08261] hover:text-white"
          }`}
          onClick={() => setSelectedCatalog(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilters;