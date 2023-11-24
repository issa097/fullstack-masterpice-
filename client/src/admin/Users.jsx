import React, { useState, useEffect } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from your API endpoint
    axios
      .get("http://localhost:8000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleBlockUser = (userId) => {
    // Determine if the user should be blocked or unblocked based on the 'is_deleted' attribute.
    const isDeleted = users.find((user) => user.user_id === userId).is_deleted;

    // Send a request to block/unblock the user using Axios.
    axios
      .put(`http://localhost:8000/deleteuser/${userId}`)
      .then((response) => {
        console.log(userId);
        // Handle the successful response
        if (isDeleted) {
          alert("User unblocked successfully");
        } else {
          alert("User blocked successfully");
        }
        // Update the user list (you may want to refetch it)
      })
      .catch((error) => {
        // Handle errors
        console.error("Error blocking/unblocking user:", error);
        alert("Failed to block/unblock the user. Please try again.");
      });
  };

  return (
    <div>
      <div className="w-full max-w-3xl mx-auto mt-4 mb-10">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-[#F9EFE6]">
              <th className="p-2">User Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-300 text-center"
              >
                <td className="p-2 text-sm">{user.username}</td>
                <td className="p-2 text-sm">{user.email}</td>
                <td className="p-2 text-sm">
                  {user.is_active ? "Active" : "Inactive"}
                </td>
                <td className="p-2 text-sm">
                  <button
                    className="px-4 py-2 bg-[#2c726b] text-white rounded-lg"
                    onClick={() => handleBlockUser(user.user_id)}
                  >
                    {user.is_deleted ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
