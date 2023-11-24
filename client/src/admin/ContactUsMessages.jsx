import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactUsMessages = () => {
  const [contactMessages, setContactMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getcontactus")
      .then((response) => {
        setContactMessages(response.data);
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.error( error);
      });
  }, []);

  return (
    <div className="mx-auto w-[75%] mb-16">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Contact Us Messages
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {contactMessages.map((message) => (
          <div key={message.id} className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{message.user_name}</h3>
            <p className="text-gray-600 mb-2">Email: {message.user_email}</p>
            <p className="text-gray-700">{message.user_message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactUsMessages;