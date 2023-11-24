import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Cards() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://loocalhost:8000/products/${1}/${3}`)
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
            key={product.id}
            bgColor="bg-[#C08261]"
            image={product}
            name={product.title}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

const Card = ({ bgColor, image, name, price }) => {
  return (
    <div className={`flex-shrink-0 m-6 relative overflow-hidden ${bgColor} rounded-lg max-w-xs shadow-lg `}>
      <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{ transform: 'scale(1.5)', opacity: '0.1' }}>
        <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
        <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
      </svg>
      <div className="relative pt-10 px-10 flex items-center justify-center">
        <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={{ background: 'radial-gradient(black, transparent 60%)', transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', opacity: '0.2' }}></div>
        <img className="relative w-40" src={`${image}`} alt="" />
      </div>
      <div className="relative text-white px-6 pb-6 mt-6">
        <span className="block opacity-75 -mb-1">{name}</span>
        <div className="flex justify-between">
          <span className="block bg-white rounded-full text-[#C08261] text-xs font-bold px-3 py-2 leading-none flex items-center">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default Cards;
