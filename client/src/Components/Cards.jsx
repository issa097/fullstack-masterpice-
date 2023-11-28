
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Card from './Card';

function Cards() {
  const [products, setProducts] = useState([]);
console.log("first",products)
  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('Invalid data format. Expected an array.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  return (
    <div className="text-center p-10 flex flex-col items-center text-[#C08261]">
      <h1 className="font-bold text-4xl mb-4">New In</h1>
      <h1 className="text-lg">Explore our new collection</h1>

      <div className="p-24 flex flex-wrap items-center justify-center">
        {products.map((product) => (
          <Card 
            key={product.product_id}
            product={product.product_name}
            
            price={product.price}
            image={product.product_img}
            rating={product.product_rating}
          />
        ))}
      </div>
    </div>
  );
}

export default Cards;
