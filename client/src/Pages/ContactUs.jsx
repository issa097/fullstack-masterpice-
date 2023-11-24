import React, { useState } from 'react';
import axios from 'axios';


function ContactUs() {
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        message: ''
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:8080/contactus', formData);
          console.log('Form data sent successfully:', response.data);
          setFormData({
            user_name: '',
            user_email: '',
            user_message: '',
          });
        } catch (error) {
          console.error('Form submission failed:', error);
        }
      };
    
      return (
        <div>
          <section className="text-[#C08261] body-font relative bg-white">
            <div className="container gap-0 px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap bg-white">
              <div className="relative flex items-end justify-start p-10 mx-20 overflow-hidden bg-gray-300 rounded-lg lg:w-1/2 md:w-1/2 sm:mr-2">
                <iframe
                  width="100%"
                  height="100%"
                  className="absolute inset-0"
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d845.3468111660588!2d36.08464106415648!3d32.058773362353215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b65cd4d8f17e1%3A0x30e86b8a97e4ac7d!2sOrange%20Digital%20Village%20Zarqa!5e0!3m2!1sen!2sjo!4v1699115906355!5m2!1sen!2sjo"
                ></iframe>
                <div className="relative flex flex-wrap py-6 bg-white rounded shadow-md">
                  <div className="px-6 lg:w-1/2">
                    <h2 className="text-xs font-semibold tracking-widest text-gray-900 title-font">ADDRESS</h2>
                    <p className="mt-1">Zarqa, Jordan, Orange Coding Academy Zarqa  Building Number 80</p>
                  </div>
                  <div className="px-6 mt-4 lg:w-1/2 lg:mt-0">
                    <h2 className="text-xs font-semibold tracking-widest text-gray-900 title-font">EMAIL</h2>
                    <a className="leading-relaxed text-[#C08261]">sajidaajawin222@gmail.com</a>
                    <h2 className="mt-4 text-xs font-semibold tracking-widest text-gray-900 title-font">PHONE</h2>
                    <p className="leading-relaxed">+(962)789357297</p>
                  </div>
                </div>
              </div>
    
              <div className="flex flex-col w-full p-5 mx-20 mt-8 bg-white lg:w-2/3 md:w-1/2 md:ml-auto md:py-8 md:mt-0">
                <h2 className="mb-1 text-lg font-medium text-[#C08261] title-font">Contact us</h2>
                <p className="mb-5 leading-relaxed text-[#C08261]">Tell us if you have a suggestion or complaint!</p>
                <form onSubmit={handleSubmit}>
                  <div className="relative mb-4">
                    <label htmlFor="user_name" className="text-sm leading-7 text-[#C08261]">Name</label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      className="w-full px-3 py-1 text-base leading-8 text-[#C08261] transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      placeholder="Enter your Name"
                      value={formData.user_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative mb-4">
                    <label htmlFor="user_email" className="text-sm leading-7 text-[#C08261]">Email</label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      placeholder="Enter your Email"
                      value={formData.user_email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="relative mb-4">
                    <label htmlFor="user_message" className="text-sm leading-7 text-[#C08261]">Message</label>
                    <textarea
                      id="user_message"
                      name="user_message"
                      className="w-full h-32 px-3 py-1 text-base leading-6 text-[#C08261] transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none resize-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      placeholder="Tell us what you think"
                      value={formData.user_message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <a href="#_" class="/AllProducts" class="relative px-5 py-3 overflow-hidden font-medium text-[#C08261] bg-gray-100 border border-gray-100 rounded-lg shadow-inner group ">
<span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-[#C08261] group-hover:w-full ease"></span>
<span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-[#C08261] group-hover:w-full ease"></span>
<span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#C08261] group-hover:h-full ease"></span>
<span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#C08261] group-hover:h-full ease"></span>
<span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-[#C08261] opacity-0 group-hover:opacity-100"></span>
<span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Submit</span>
</a>
                </form>
              </div>
            </div>
          </section>
          </div>
  );
}

export default ContactUs;