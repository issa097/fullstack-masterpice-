import React from 'react';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import Testemonials from '../Components/Testemonials';

function AboutUs() {
  return (
    <>
      <Nav />
      <section className="w-screen bg-white py-10 text-[#C08261]">
        <div className="container mx-auto w-full max-w-screen-xl">
          <div className="w-full">
            <h2 className="text-center text-3xl font-extrabold">Our Values</h2>
            <p className="mx-auto mb-4 max-w-xl py-2 text-center text-[#C08261] sm:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio reprehenderit accusamus incidunt.</p>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full p-4 text-left lg:w-1/3">
              <hr className="mb-4 h-1.5 w-1/4 bg-[#C08261]" />
              <h3 className="font-sans text-4xl font-light leading-10">INNOVATE.</h3>
              <p className="my-5 text-[#C08261]">Distinctio assumenda tenetur sequi, nemo, error illum dolorem dolor voluptatum beatae dignissimos nulla dolores delectus similique blanditiis praesentium deserunt?</p>
            </div>
            <div className="w-full p-4 text-left lg:w-1/3">
              <hr className="mb-4 h-1.5 w-1/4 bg-[#C08261]" />
              <h3 className="font-sans text-4xl font-light leading-10">GROW.</h3>
              <p className="my-5 text-[#C08261]">Deleniti earum nulla repudiandae esse delectus. Dolorem, hic animi sit pariatur ducimus commodi tempore.</p>
            </div>
            <div className="w-full p-4 text-left lg:w-1/3">
              <hr className="mb-4 h-1.5 w-1/4 bg-[#C08261]" />
              <h3 className="font-sans text-4xl font-light leading-10">SERVE.</h3>
              <p className="my-5 text-[#C08261]">Lorem ipsum dolor, situos unde voluptatibus corrupti similique aperiam. Molestias corporis numquam quos dolorem culpa ullam ad. Ipsa quidem excepturi mollitia? Expedita, sequi?</p>
            </div>
          </div>
        </div>
      </section>
      <Testemonials />
      < Footer />
    </>
  );
}

export default AboutUs;
