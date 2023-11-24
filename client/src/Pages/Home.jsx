import React from 'react';
import Hero from '../Components/Hero';
import Nav from '../Components/Nav';
import Categories from '../Components/Categories';
import Cards from '../Components/Cards';
import Footer from '../Components/Footer';
import Courses from '../Components/Courses';
import UserProfile from './UserProfile';
import Details from './Details';


const Home = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <Categories />
      <Cards />
      < Courses />
      {/* < UserProfile /> */}
      < Details />
      < Footer />
    </div>
  );
};

export default Home;
