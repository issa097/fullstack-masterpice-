import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Axios from "axios";

// import swal from "sweetalert";
// import axios from "axios";
// import CommentSection from "./Comment";

// Create a StarRating component
const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <svg
      key={index}
      className={`h-4 w-4 ${
        index < rating ? "text-yellow-500" : "text-gray-300"
      }`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        class=""
      ></path>
    </svg>
  ));

  return <div className="flex items-center">{stars}</div>;
};

export default StarRating;
