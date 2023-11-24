import React from 'react';
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <section className="mb-40">
      <div className="bg-neutral-50 px-6 py-12 text-center dark:bg-neutral-900 md:px-12 lg:text-left">
        <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="mt-12 lg:mt-0">
              <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-[#C08261]">
                The best shop <br /><span className="text-primary">for your Needs</span>
              </h1>
              {/*  */}
              <Link to="/AllProducts" class="relative px-5 py-3 overflow-hidden font-medium text-[#C08261] bg-gray-100 border border-gray-100 rounded-lg shadow-inner group ">
<span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-[#C08261] group-hover:w-full ease"></span>
<span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-[#C08261] group-hover:w-full ease"></span>
<span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#C08261] group-hover:h-full ease"></span>
<span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#C08261] group-hover:h-full ease"></span>
<span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-[#C08261] opacity-0 group-hover:opacity-100"></span>
<span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Explore More</span>
</Link>   
            </div>
            <div className="mb-12 lg:mb-0">
              <img src="https://images.unsplash.com/photo-1615811648503-479d06197ff3?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGV0cmElMjBqb3JkYW58ZW58MHx8MHx8fDA%3D"
                className="w-full rounded-lg shadow-lg dark:shadow-black/20" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
