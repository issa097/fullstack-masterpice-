// import React, { useState } from 'react';
// import axios from 'axios';

    
//       const UserProfile = ({ user, onUpdateProfile }) => {
//         const [name, setName] = useState(user.name);
//         const [email, setEmail] = useState(user.email);
//         const [password, setPassword] = useState('');
//         const [orders, setOrders] = useState(user.orders || []);
      
//         const handleNameChange = (e) => {
//           setName(e.target.value);
//         };
      
//         const handleEmailChange = (e) => {
//           setEmail(e.target.value);
//         };
      
//         const handlePasswordChange = (e) => {
//           setPassword(e.target.value);
//         };
      
//         const handleUpdateProfile = async () => {
//           try {
//             const updatedUser = {
//               ...user,
//               name,
//               email,
//               password: password || user.password,
//             };
      
//             // Make an API request to update the user profile
//             const response = await axios.put('your-api-endpoint-for-updating-profile', updatedUser);
            
//             // Handle the response as needed
//             console.log('Profile updated successfully:', response.data);
      
//             // Call the onUpdateProfile callback with the updated user data
//             onUpdateProfile(updatedUser);
//           } catch (error) {
//             console.error('Error updating profile:', error.message);
//           }
//         };

//         return (
//           <div className="bg-gray-200 p-8 max-w-md mx-auto my-10 rounded-lg shadow-lg">
//             <img
//               src={user.avatar}
//               alt={`${user.name}'s avatar`}
//               className="w-32 h-32 rounded-full mx-auto mb-4"
//             />
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-600">Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={handleNameChange}
//                 className="w-full mt-1 p-2 border rounded-md"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-600">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={handleEmailChange}
//                 className="w-full mt-1 p-2 border rounded-md"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-600">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={handlePasswordChange}
//                 className="w-full mt-1 p-2 border rounded-md"
//               />
//             </div>
//             <button onClick={handleUpdateProfile} className="bg-blue-500 text-white p-2 rounded-md">
//               Update Profile
//             </button>
//             <div className="mt-8">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Details</h3>
//               {orders.length > 0 ? (
//                 <ul className="list-disc ml-4">
//                   {orders.map((order, index) => (
//                     <li key={index}>{order}</li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-600">No orders yet.</p>
//               )}
//             </div>
//           </div>
//       );
//     };
    
// export default UserProfile;