import React, { useEffect } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Intro from './components/Intro/Intro';
import Maps from './components/Maps/Maps';
import Quizzes from './components/Quizzes/Quizzes';
import Footer from '../../../components/Footer/Footer';
import Hero from './components/Hero/Hero';
import ReactGA from "react-ga4";

const Home = () => {
  useEffect(() => {
    const VITE_ENV = import.meta.env.VITE_ENV;
    if (VITE_ENV === "production") {
      ReactGA.send({ hitType: "pageview", page: "/", title: "Home Page" });
    }
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Intro />
      <Maps />
      <Quizzes />
      <Footer />
    </>
  )
}

export default Home;
