import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(blog)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API
        const response = await axios.get("http://localhost:8000/getAllBlog");
        console.log("hi");
        // Log the data array specifically
        console.log('API Data:', response.data);

        // Set blog posts and loading to false once data is fetched
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from API:', error);
        // Set loading to false on error
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or any other loading indicator
  }

  return (
    <section className="py-10">
      <h1 className="mb-12 text-center font-sans text-3xl font-bold text-[#C08261]">Featured Blogs</h1>
      <div className="flex justify-center mt-4">
      <Link to="/allblogs" class="/AllProducts" className ="relative px-5 py-3 overflow-hidden font-medium text-[#C08261] bg-gray-100 border border-gray-100 rounded-lg shadow-inner group ">
<span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-[#C08261] group-hover:w-full ease"></span>
<span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-[#C08261] group-hover:w-full ease"></span>
<span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#C08261] group-hover:h-full ease"></span>
<span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#C08261] group-hover:h-full ease"></span>
<span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-[#C08261] opacity-0 group-hover:opacity-100"></span>
<span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease">View More</span>
</Link>
    </div>
      <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-4 sm:px-8 md:grid-cols-3">
        {blog.map((blogs) => (
          <article key={blogs.blog_id} className="mx-auto my-4 flex w-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white text-[#C08261] transition hover:translate-y-2 hover:shadow-lg">
            <a href="#">
              <img src={blogs.blog_img} className="h-56 w-full object-cover" alt="" />
              <div className="flex-auto px-6 py-5">
                <span className="mb-2 flex items-center text-sm font-semibold">
                  <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.272 10.445L18 2m-8.684 8.632L5 2m7.761 8.048L8.835 2m5.525 0l-1.04 2.5M6 16a6 6 0 1 0 12 0a6 6 0 0 0-12 0Z" /></svg>
                  {blogs.created_at}
                </span>
                <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">{blogs.title}</h3>
                <p className="mb-4 text-base font-light">{blogs.content}</p>
                <span className="inline-block cursor-pointer select-none rounded-full border border-[#C08261] bg-[#C08261] px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm">Learn More</span>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );  
};

export default Blogs;
