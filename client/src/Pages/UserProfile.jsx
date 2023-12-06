import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error parsing JSON for key '${key}':`, error);
    return null;
  }
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [formValues, setFormValues] = useState({});
  const [photoName, setPhotoName] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  console.log("ccccccccccccccccc", formValues);
  const [image, setImageFile] = useState(null);
  const [error, setError] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("Stored Token:", token);

    if (token !== null) {
      axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      axios
        .get("http://localhost:8000/user")
        .then((response) => {
          console.log("🤣🤣🤣🤣🤣🤣🤣", response);
          setFormValues(response.data[0]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setUser(false);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPhotoName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!error) {
      // const storedToken = getLocalStorage("token");
      const updatedUser = new FormData();
      updatedUser.append("user_id", user.user_id);
      updatedUser.append("username_user", formValues.username);
      updatedUser.append("email", formValues.email);
      // updatedUser.append("password", formValues.password);
      updatedUser.append("image", image);
      // Include hashed password
      updatedUser.append("phone_number", formValues.phone_number); // Include hashed password
      updatedUser.append("birthday", formValues.birthday); // Include hashed password

      try {
        axios.defaults.headers.common[
          "Authorization"
        ] = `${localStorage.getItem("token")}`;
        const response = await axios.put(
          `http://localhost:8000/updateuser`,
          updatedUser
        );
        console.log("Server Response:", response.data[0]);
        setSuccessMessage("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating Information", error);
        setSuccessMessage("");
        setError("Error updating information. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add validation logic as needed
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8000/updatepassword",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setSuccessMessage("Password updated successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error(
        "Error updating password:",
        error.response?.data || error.message
      );
      setSuccessMessage("");
      setErrorMessage("Failed to update password. Please try again.");
    }
  };

  // return (
  //   <div className="min-h-screen bg-white flex justify-center ml-20 items-center">
  //     <div className="w-9/12 h-5/6 bg-white my-6 md:ml-24 px-10 py-8 rounded-lg shadow-md">
  //       <form>
  //         <div className="flex justify-center">
  //           <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
  //             <input
  //               type="file"
  //               className="hidden"
  //               ref={fileInputRef}
  //               onChange={handleFileChange}
  //             />
  //             <div className="text-center">
  //               <div className="mt-2">
  //                 <span
  //                   className="block w-40 h-40 rounded-full m-auto shadow"
  //                   style={{
  //                     backgroundSize: "cover",
  //                     backgroundRepeat: "no-repeat",
  //                     backgroundPosition: "center center",
  //                     backgroundImage: `url('${
  //                       photoPreview == null
  //                         ? formValues.user_img
  //                         : photoPreview
  //                     }')`,
  //                   }}
  //                 />
  //               </div>
  //               <button
  //                 type="button"
  //                 className="inline-flex items-center px-4 py-2 bg-[#C08261] border-[#C08261] rounded-md font-semibold text-xs text-white uppercase tracking-widest shadow-sm hover:bg-[#E2C799] focus-outline-none focus-border-indigo-400 focus-shadow-outline-indigo active-text-gray-800 active-bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
  //                 onClick={handleSelectPhoto}
  //               >
  //                 Select New Photo
  //               </button>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="mt-8 space-y-6">
  //           <div className="flex flex-col justify-start">
  //             <label
  //               htmlFor="username"
  //               className="self-start p-2 text-[#C08261]"
  //             >
  //               Full Name
  //             </label>
  //             <input
  //               className="w-full mb-3 p-2 border rounded-md bg-gray-200"
  //               onChange={handleInputChange}
  //               type="text"
  //               name="username"
  //               value={formValues.username}
  //             />
  //           </div>

  //           <div className="flex flex-col justify-start">
  //             <label htmlFor="Email" className="self-start p-2 text-[#C08261]">
  //               Email
  //             </label>
  //             <input
  //               className="w-full p-2 border rounded-md bg-gray-200"
  //               onChange={handleInputChange}
  //               name="email"
  //               value={formValues.email}
  //             />
  //           </div>

  //           <div className="flex flex-col justify-start">
  //             <label
  //               htmlFor="password"
  //               className="self-start p-2 text-[#C08261]"
  //             >
  //               Password
  //             </label>
  //             <input
  //               className="w-full p-2 border rounded-md bg-gray-200"
  //               onChange={handleInputChange}
  //               value={formValues.password}
  //               name="password"
  //             />
  //           </div>
  //           <div className="flex flex-col justify-start">
  //             <label
  //               htmlFor="phone_number"
  //               className="self-start p-2 text-[#C08261]"
  //             >
  //               phone_number
  //             </label>
  //             <input
  //               className="w-full p-2 border rounded-md bg-gray-200"
  //               onChange={handleInputChange}
  //               value={formValues.phone_number}
  //               name="phone_number"
  //             />
  //           </div>
  //           <div className="flex flex-col justify-start">
  //             <label
  //               htmlFor="birthday"
  //               className="self-start p-2 text-[#C08261]"
  //             >
  //               birthday
  //             </label>
  //             <input
  //               className="w-full p-2 border rounded-md bg-gray-200"
  //               onChange={handleInputChange}
  //               value={formValues.birthday}
  //               name="birthday"
  //             />
  //           </div>
  //         </div>

  //         <div className="flex justify-end mt-6">
  //           <button
  //             className="w-1/4 mr-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl"
  //             type="button"
  //           >
  //             Cancel
  //           </button>
  //           <button
  //             className="w-auto py-2 px-3 bg-[#C08261] text-white rounded-xl"
  //             onClick={handleSaveChanges}
  //           >
  //             Save Changes
  //           </button>
  //         </div>

  //         {successMessage && (
  //           <p className="text-green-600 mt-2">{successMessage}</p>
  //         )}
  //         {error && <p className="text-red-600 mt-2">{error}</p>}
  //       </form>
  //     </div>
  //   </div>
  // );

  // return (
  //   <div className="min-h-screen bg-white flex justify-center ml-20 items-center">
  //     <div className="w-9/12 h-5/6 bg-white my-6 md:ml-24 px-10 py-8 rounded-lg shadow-md">
  //       <form>
  //         <div className="flex justify-center">
  //           <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
  //             <input
  //               type="file"
  //               className="hidden"
  //               ref={fileInputRef}
  //               onChange={handleFileChange}
  //             />
  //             <div className="text-center">
  //               <div className="mt-2">
  //                 <span
  //                   className="block w-40 h-40 rounded-full m-auto shadow"
  //                   style={{
  //                     backgroundSize: "cover",
  //                     backgroundRepeat: "no-repeat",
  //                     backgroundPosition: "center center",
  //                     backgroundImage: `url('${
  //                       photoPreview == null
  //                         ? formValues.user_img
  //                         : photoPreview
  //                     }')`,
  //                   }}
  //                 />
  //               </div>
  //               <button
  //                 type="button"
  //                 className="inline-flex items-center px-4 py-2 bg-[#C08261] border-[#C08261] rounded-md font-semibold text-xs text-white uppercase tracking-widest shadow-sm hover:bg-[#E2C799] focus-outline-none focus-border-indigo-400 focus-shadow-outline-indigo active-text-gray-800 active-bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
  //                 onClick={handleSelectPhoto}
  //               >
  //                 Select New Photo
  //               </button>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="mt-8 space-y-6">
  //           <div className="flex flex-col justify-start">
  //             <label
  //               htmlFor="username"
  //               className="self-start p-2 text-[#C08261]"
  //             >
  //               Full Name
  //             </label>
  //             <input
  //               className="w-full mb-3 p-2 border rounded-md bg-gray-200"
  //               onChange={handleInputChange}
  //               type="text"
  //               name="username"
  //               value={formValues.username}
  //             />
  //           </div>

  //           <div className="flex flex-col justify-start">
  //             <label htmlFor="Email" className="self-start p-2 text-[#C08261]">
  //               Email
  //             </label>
  //             <input
  //               className="w-full p-2 border rounded-md bg-gray-200"
  //               onChange={handleInputChange}
  //               name="email"
  //               value={formValues.email}
  //             />
  //           </div>

  //           <div className="flex flex-col justify-start">
  //             {/* <label
  //               htmlFor="password"
  //               className="self-start p-2 text-[#C08261]"
  //             >
  //               Password
  //             </label>
  //             <input
  //               className="w-full p-2 border rounded-md bg-gray-200"
  //               onChange={handleInputChange}
  //               value={formValues.password}
  //               name="password"
  //             /> */}
  //           </div>
  //           <div className="flex flex-col justify-start">
  //             <label
  //               htmlFor="phone_number"
  //               className="self-start p-2 text-[#C08261]"
  //             >
  //               phone_number
  //             </label>
  //             <input
  //               className="w-full p-2 border rounded-md bg-gray-200"
  //               onChange={handleInputChange}
  //               value={formValues.phone_number}
  //               name="phone_number"
  //             />
  //           </div>
  //           <div className="flex flex-col justify-start">
  //             <label
  //               htmlFor="birthday"
  //               className="self-start p-2 text-[#C08261]"
  //             >
  //               birthday
  //             </label>
  //             <input
  //               className="w-full p-2 border rounded-md bg-gray-200"
  //               onChange={handleInputChange}
  //               value={formValues.birthday}
  //               name="birthday"
  //             />
  //           </div>
  //         </div>

  //         <div className="flex justify-end mt-6">
  //           <button
  //             className="w-1/4 mr-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl"
  //             type="button"
  //           >
  //             Cancel
  //           </button>
  //           <button
  //             className="w-auto py-2 px-3 bg-[#C08261] text-white rounded-xl"
  //             onClick={handleSaveChanges}
  //           >
  //             Save Changes
  //           </button>
  //         </div>

  //         {successMessage && (
  //           <p className="text-green-600 mt-2">{successMessage}</p>
  //         )}
  //         {error && <p className="text-red-600 mt-2">{error}</p>}
  //       </form>

  //       <h2>Change Password</h2>
  //       <form onSubmit={handleSubmit}>
  //         {/* Your password change form elements go here */}

  //         <div>
  //           <label htmlFor="currentPassword">Current Password:</label>
  //           <input
  //             type="password"
  //             name="currentPassword"
  //             value={currentPassword}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="newPassword">New Password:</label>
  //           <input
  //             type="password"
  //             name="newPassword"
  //             value={newPassword}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="confirmPassword">Confirm Password:</label>
  //           <input
  //             type="password"
  //             name="confirmPassword"
  //             value={confirmPassword}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <button type="submit">Change Password</button>
  //         </div>
  //       </form>
  //       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
  //       {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-full min-w-full bg-gray-100 flex justify-center  items-center">
      <div className="w-[40rem] min-h-[10rem] bg-white p-8 rounded-md shadow-md">
        <form className="space-y-4" onSubmit={handleSaveChanges}>
          <div className="text-center">
            <label htmlFor="user_img" className="cursor-pointer">
              <div className="relative">
                <img
                  src={photoPreview || formValues.user_img}
                  alt="Profile Picture"
                  className="w-32 h-32 rounded-full mx-auto mb-2 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition duration-300">
                  <span className="text-white text-sm">Change Photo</span>
                </div>
              </div>
            </label>
            <input
              type="file"
              id="user_img"
              name="user_img"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="phone_number"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone_number"
              value={formValues.phone_number}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="birthday"
              className="block text-sm font-medium text-gray-700"
            >
              Birthday
            </label>
            <input
              type="date"
              name="birthday"
              value={formValues.birthday}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              // onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSaveChanges}
              className="px-4 py-2 bg-[#C08261] text-white rounded-md hover:bg-[#E2C799] focus-outline-none focus-border-indigo-400 focus-shadow-outline-indigo active-text-gray-800 active-bg-gray-50 transition ease-in-out duration-150"
            >
              Save Changes
            </button>
          </div>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Change Password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Your password change form elements go here */}
            {/* ... */}

            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={currentPassword}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#C08261] text-white rounded-md hover:bg-[#E2C799] focus-outline-none focus-border-indigo-400 focus-shadow-outline-indigo active-text-gray-800 active-bg-gray-50 transition ease-in-out duration-150"
              >
                Change Password
              </button>
            </div>
          </form>
          {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
          {successMessage && (
            <p className="text-green-600 mt-2">{successMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
