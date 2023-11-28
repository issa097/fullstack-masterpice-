import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {Link} from "react-router-dom"
const Hero = () => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-[#C08261] font-medium">
        Richesses de la Riviera
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
         The Best Online Shop 
        </h3>
        <p className="text-base md:text-lg text-[#C08261] my-4 md:my-6">
        Our handpicked selection showcases the finest local artisans, bringing you authentic Jordanian flavors, craftsmanship, and culture. Each product tells a unique story, echoing the legacy of generations.
        </p>
        <Link to="/allproducts" class="/AllProducts" className ="relative px-5 py-3 overflow-hidden font-medium text-[#C08261] bg-gray-100 border border-gray-100 rounded-lg shadow-inner group ">
<span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-[#C08261] group-hover:w-full ease"></span>
<span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-[#C08261] group-hover:w-full ease"></span>
<span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#C08261] group-hover:h-full ease"></span>
<span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#C08261] group-hover:h-full ease"></span>
<span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-[#C08261] opacity-0 group-hover:opacity-100"></span>
<span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Explore More</span>
</Link>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://livingnomads.com/wp-content/uploads/2022/03/19/Mosaic-and-hand-painted-ceramics0.jpeg",
  },
  {
    id: 2,
    src: "https://livingnomads.com/wp-content/uploads/2022/03/19/Mosaic-and-hand-painted-ceramics2.jpeg",
  },
  {
    id: 3,
    src: "https://149736705.v2.pressablecdn.com/wp-content/uploads/2021/11/shutterstock_112382393-400x250.jpg",
  },
  {
    id: 4,
    src: "https://livingnomads.com/wp-content/uploads/2022/03/20/Jordanian-Mansaf-Spuces3.jpeg",
  },
  {
    id: 5,
    src: "https://livingnomads.com/wp-content/uploads/2022/03/20/Zaatar3.jpeg",
  },
  {
    id: 6,
    src: "https://www.shutterstock.com/image-photo/closeup-beaded-dress-traditional-palestine-260nw-2176167073.jpg",
  },
  {
    id: 7,
    src: "https://images.commerce7.com/jordan-vineyard-and-winery/images/medium/2022_shop_thumbnail_jordan_culinaryproducts_oliveoildish4-1678826048221.jpg",
  },
  {
    id: 8,
    src: "https://i0.wp.com/jordantraveler.com/wp-content/uploads/2022/04/Mosaics-in-Jordan-Souvenirs-3-768x1024.jpg?ssl=1",
  },
  {
    id: 9,
    src: "https://johtt.com/images/2020/04/29/sand-glass-Jordan.jpg",
  },
  {
    id: 10,
    src: "https://livingnomads.com/wp-content/uploads/2022/03/20/jordan-gift.jpeg",
  },
  {
    id: 11,
    src: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1024,h_682/https://holiday-golightly.com/wp-content/uploads/2020/02/DSC_1845-2-1024x682.jpg",
  },
  {
    id: 12,
    src: "https://livingnomads.com/wp-content/uploads/2022/03/19/frankincense-jordan.jpeg",
  },
  {
    id: 13,
    src: "https://livingnomads.com/wp-content/uploads/2022/02/11/Frankincense-and-myrrh-have-been-revered-since-ancient-times.jpg",
  },
  {
    id: 14,
    src: "https://www.dibeen.com/cdn/shop/products/ScreenShot2020-05-20at2.04.08PM_1024x_5892fbfa-c91b-47ec-aad7-e9718d5c3884_800x.png?v=1673519513",
  },
  {
    id: 15,
    src: "https://cdn.shopify.com/s/files/1/1183/1076/files/set_of_hamsa_hand_jewelries.jpg?v=1623412616",
  },
  {
    id: 16,
    src: "https://livingnomads.com/wp-content/uploads/2022/03/19/Jordanian-Keffiyeh-scarf5.jpg",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default Hero;