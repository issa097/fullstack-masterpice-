import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AllCourses() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/getAllShop')
      .then(response => setWorkshops(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []); 

  return (
    <div className="m-10 mx-4 max-w-screen-lg overflow-hidden rounded-xl border shadow-lg md:pl-8">
      {workshops.map(workshop => (
        <div key={workshop.workshop_id} className="flex flex-col overflow-hidden bg-white sm:flex-row md:h-80">
          <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
            <h2 className="text-xl font-bold text-[#C08261] md:text-2xl lg:text-4xl">{workshop.workshop_title}</h2>
            {/* <p className="mt-2 text-lg text-[#C08261]">By {workshop.author}</p> */}
            <p className="mt-4 mb-8 max-w-md text-[#C08261]">{workshop.workshop_dis}</p>
            <div>
              <Link
                to={`/courses/${workshop.id}`}  
                className="relative px-5 py-3 overflow-hidden font-medium text-[#C08261] bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
              >
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-[#C08261] group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-[#C08261] group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#C08261] group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#C08261] group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-[#C08261] opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Course Details</span>
              </Link>
            </div>
          </div>

          <div className="order-first ml-auto h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5">
            <img
              className="h-full w-full object-cover"
              src={workshop.workshop_img}  
              alt={`Course Preview - ${workshop.workshop_title}`}
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllCourses;
