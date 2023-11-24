import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(1);

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increaseCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="sm:order-1">
      <div className="mx-auto flex h-8 items-stretch text-grey-400">
        <button
          className="flex items-center justify-center rounded-l-md bg-[#17403C]  px-4 transition hover:bg-[#C3CAC3]  hover:text-white"
          onClick={decreaseCount}
        >
          -
        </button>
        <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
          {count}
        </div>
        <button
          className="flex items-center justify-center rounded-r-md bg-[#17403C]  px-4 transition hover:bg-[#C3CAC3]   hover:text-white"
          onClick={increaseCount}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
