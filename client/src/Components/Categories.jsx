import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CategoryFilters from "./CategoryFillter";

const Card = ({ title, subtitle, category_name }) => {
  return (
    <Link
      to={`/catalogue/${category_name}`}
      className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#C08261] to-[#F2ECBE] translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 " />

      <h3 className="font-medium text-lg text-[#C08261] group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
        {subtitle}
      </p>
    </Link>
  );
};

const Categories = () => {
  const [selectedCatalog, setSelectedCatalog] = useState(5);
  const [catalogData, setCatalogData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCatalog == 5) {
          const response = await axios.get("http://localhost:8000/products/2/3");
          setCatalogData(response.data.result.rows);
        } else {
          const response = await axios.get(
            `http://localhost:8000/product/${selectedCatalog}`
          );
          setCatalogData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedCatalog]);


console.log(catalogData)

  return (
    <div className="p-4">
      <p className="text-4xl font-bold mb-2 text-center p-6 text-[#C08261]">
        Categories
      </p>
      <CategoryFilters
        selectedCatalog={selectedCatalog}
        setSelectedCatalog={setSelectedCatalog}
      />
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {catalogData.map((product) => (
          <Card
            key={product.product_id}
            title={product.product_name}
            subtitle={product.product_dis}
            category_name={product.category_id}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;