// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { useParams } from "react-router-dom";
// // import { CiStar } from "react-icons/ci";

// // const CommentSection = ({ product_id }) => {
// //   const { id } = useParams();
// //   console.log("fffffffffffffffffffffffffff", id);
// //   const [comments, setComments] = useState([]);
// //   const [newComment, setNewComment] = useState("");
// //   const [rating, setRating] = useState(1);
// //   console.log("sad", comments);

// //   useEffect(() => {
// //     const fetchComments = async (id) => {
// //       try {
// //         const response = await axios.get(
// //           `http://localhost:8000/gitRatings/${id}`
// //         );
// //         console.log("Comments Data:", response.data);
// //         setComments(response.data);
// //       } catch (error) {
// //         console.error("Error fetching comments:", error);
// //       }
// //     };
// //     fetchComments(id);
// //   }, []);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewComment((prevComment) => ({
// //       ...prevComment,
// //       [name]: value,
// //     }));
// //   };

// //   const handleAddComment = () => {
// //     axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
// //       "token"
// //     )}`;
// //     console.log(newComment);

// //     const dataapi = {
// //       comment: newComment.text,
// //       product_id: id,
// //       rating: rating,
// //     };
// //     axios
// //       .post("http://localhost:8000/addRating", dataapi)
// //       .then((response) => {
// //         setComments((prevComments) => [...prevComments, response.data]);
// //         setNewComment({ user: "", text: "" });
// //       })
// //       .catch((error) => console.error("Error adding comment:", error));
// //   };

// //   return (
// //     <div>
// //       <h2>Comments</h2>

// //       <div>
// //         <label htmlFor="user">User:</label>
// //         <input
// //           type="text"
// //           id="user"
// //           name="user"
// //           value={newComment.user_id}
// //           onChange={handleInputChange}
// //         />
// //       </div>

// //       <div>
// //         <label htmlFor="text">Comment:</label>
// //         <textarea
// //           id="text"
// //           name="text"
// //           value={newComment.comment}
// //           onChange={handleInputChange}
// //         />
// //       </div>
// //       <div className="flex">
// //         {[1, 2, 3, 4, 5].map((rate) => {
// //           return (
// //             <CiStar onClick={() => setRating(rate)} />

// //             // <div
// //             //   className="w-10 h-10 bg-orange-500  rounded-lg m-2"
// //             //   onClick={() => setRating(rate)}
// //             // >
// //             //   {rate}
// //             // </div>
// //           );
// //         })}
// //       </div>
// //       <button onClick={handleAddComment}>Add Comment</button>

// //       {comments && (
// //         <ul>
// //           {comments.map((comment) => (
// //             <li key={comment.id}>
// //               <strong>{comment.user}</strong>: {comment.text}
// //               <strong>{comment.user}</strong>: {comment.comment}
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default CommentSection;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { CiStar } from "react-icons/ci";
// import Swal from "sweetalert";

// const CommentSection = ({ product_id }) => {
//   const { id } = useParams();
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [rating, setRating] = useState(0);

//      const fetchComments = async (id) => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/gitRatings/${id}`
//         );
//         setComments(response.data);
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//       }
//     };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewComment((prevComment) => ({
//       ...prevComment,
//       [name]: value,
//     }));
//   };
//   useEffect(() => {
//     // Call fetchComments when the component mounts
//     fetchComments(id);
//   }, [id]);
//   const handleAddComment = () => {
//     axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
//       "token"
//     )}`;

//     const dataapi = {
//       comment: newComment.text,
//       product_id: id,
//       rating: rating,
//     };

//     axios
//       .post("http://localhost:8000/addRating", dataapi)
//       .then((response) => {
//         setComments((prevComments) => [...prevComments, response.data]);
//         setNewComment({ user: "", text: "" });

//         Swal({
//           icon: "success",
//           title: "Comment Added!",
//           text: "Your comment has been successfully added.",
//         })
//         fetchComments(id)
//       })

//       .catch((error) => {
//         Swal({
//           icon: "error",
//           title: "Comment not Added!",
//           text: "User has not purchased the product.",
//         });
//       });
//   };

//   return (
//     <div>
//       {/* <h2>Comments</h2> */}

//       <div>
//         <label htmlFor="user">User:</label>
//         <input
//           type="text"
//           id="user"
//           name="user"
//           value={newComment.user_id}
//           onChange={handleInputChange}
//         />
//       </div>

//       <div>
//         <label htmlFor="text">Comment:</label>
//         <textarea
//           id="text"
//           name="text"
//           value={newComment.comment}
//           onChange={handleInputChange}
//         />
//       </div>

//       <div className="flex items-center mb-4">
//         <span className="mr-2">Rating:</span>
//         {[1, 2, 3, 4, 5].map((rate) => (
//           <CiStar
//             key={rate}
//             className={`cursor-pointer ${
//               rating >= rate ? "text-yellow-500" : "text-gray-300"
//             }`}
//             onClick={() => setRating(rate)}
//           />
//         ))}
//       </div>

//       <button
//         onClick={handleAddComment}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Add Comment
//       </button>

//       {comments && (
//         <ul className="list-disc pl-6 mt-4">
//           {comments.map((comment) => (
//             <li key={comment.id} className="mb-2">
//               <strong className="text-blue-500">{comment.user}</strong>:
//               {comment.comment}
//               <span className="ml-2 text-yellow-500">
//                 {[...Array(comment.rating)].map((_, index) => (
//                   <CiStar key={index} />
//                 ))}
//               </span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CommentSection;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import Swal from "sweetalert";

const CommentSection = ({ product_id }) => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [userid, setuserid] = useState();
  console.log(userid);
  const loggedInUserId = 71; // Replace with the actual user ID of the logged-in user
  const fetchComments = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/gitRatings/${id}`
      );
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaa", response.data);
      setComments(response.data);
      // if (response.data.user && response.data.user.user_id) {
      //   setuserid(response.data.user.user_id);
      // }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // token:localStorage.getItem("token")
  const fetchCommentss = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(token);
    console.log(token);
    console.log(token);
    console.log(token);
    console.log(token);
    try {
      const response = await axios.post(`http://localhost:8000/decode`, {
        token,
      });

      console.log("bbbbbbbbbbbbbbbbb", token);
      setuserid(response.data);
      console.log(response.data.user_id);
      // if (response.data.user && response.data.user.user_id) {
      //   setuserid(response.data.user.user_id);
      // }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Call fetchComments when the component mounts
    fetchComments(id);
    fetchCommentss();
  }, []);

  const handleAddComment = () => {
    axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
      "token"
    )}`;

    const dataapi = {
      comment: newComment.text,
      product_id: id,
      rating: rating,
    };

    axios
      .post("http://localhost:8000/addRating", dataapi)
      .then((response) => {
        setComments((prevComments) => [...prevComments, response.data]);
        setNewComment({ user: "", text: "" });

        Swal({
          icon: "success",
          title: "Comment Added!",
          text: "Your comment has been successfully added.",
        });
        fetchComments(id);
      })
      .catch((error) => {
        Swal({
          icon: "error",
          title: "Comment not Added!",
          text: "User has not purchased the product.",
        });
      });
  };

  const handleEditComment = (commentId, commentText) => {
    // Implement the logic for editing a comment
    console.log(`Editing comment with ID ${commentId}: ${commentText}`);
  };

  const handleDeleteComment = (commentId) => {
    // Implement the logic for deleting a comment
    console.log(`Deleting comment with ID ${commentId}`);
  };

  return (
    <div>
      {/* <h2>Comments</h2> */}

      <div>
        <label htmlFor="user">User:</label>
        <input
          type="text"
          id="user"
          name="user"
          value={newComment.user_id}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="text">Comment:</label>
        <textarea
          id="text"
          name="text"
          value={newComment.comment}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex items-center mb-4">
        <span className="mr-2">Rating:</span>
        {[1, 2, 3, 4, 5].map((rate) => (
          <CiStar
            key={rate}
            className={`cursor-pointer ${
              rating >= rate ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => setRating(rate)}
          />
        ))}
      </div>

      <button
        onClick={handleAddComment}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Comment
      </button>

      {comments && (
        <ul className="list-disc pl-6 mt-4">
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2">
              <strong className="text-blue-500">{comment.user}</strong>:
              {comment.comment}
              <span className="ml-2 text-yellow-500">
                {[...Array(comment.rating)].map((_, index) => (
                  <CiStar key={index} />
                ))}
              </span>
              {comment.user_id === userid.user_id && (
                <>
                  <button
                    onClick={() =>
                      handleEditComment(comment.id, comment.comment)
                    }
                    className="bg-[#C08261]  text-white px-2 py-1 rounded ml-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentSection;