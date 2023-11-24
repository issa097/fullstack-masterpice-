import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [workshops, setWorkshops] = useState([]);
  const [showAllWorkshops, setShowAllWorkshops] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getAllShop");
        setWorkshops(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const displayedworkshop = showAllWorkshops ? workshops : workshops.slice(0, 4);

  const handleReadMoreClick = () => {
    setShowAllWorkshops(true);
    navigate("/allcourses");
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-full text-center">
        <p className="text-4xl font-bold mb-2 p-6 text-[#C08261]">
          {showAllWorkshops ? "All Courses" : "Featured Courses"}
        </p>
      </div>
      {displayedworkshop.map((workshop) => (
        <div key={workshop.workshop_id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img className="rounded-t-lg" src={workshop.workshop_img} alt={workshop.workshop_title} />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{workshop.workshop_title}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{workshop.workshop_dis}</p>
            {!showAllWorkshops && (
              <button
                onClick={handleReadMoreClick}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#C08261] rounded-lg hover:bg-[#E2C799] focus:ring-4 focus:outline-none"
              >
                Read More
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Courses;
