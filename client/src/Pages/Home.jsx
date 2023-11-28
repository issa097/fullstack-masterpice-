import React from 'react';
import Hero from '../Components/Hero';
import Nav from '../Components/Nav';
import Categories from '../Components/Categories';
import Cards from '../Components/Cards';
import Footer from '../Components/Footer';
import Courses from '../Components/Courses';
import UserProfile from './UserProfile';
import Details from './Details';
import Benifts from '../Components/Benifts';
import Blogs from '../Components/Blogs';




const Home = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <Benifts />
      <Categories />
      <Cards />
      < Courses />
 
      < Blogs />
      < Footer />
    </div>
  );
};

export default Home;
