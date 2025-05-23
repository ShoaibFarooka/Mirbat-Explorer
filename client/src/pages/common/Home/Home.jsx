import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Intro from './components/Intro/Intro';
import Maps from './components/Maps/Maps';
import Quizzes from './components/Quizzes/Quizzes';
import Footer from '../../../components/Footer/Footer';
import Hero from './components/Hero/Hero';
import ReactGA from "react-ga4";
import CustomModal from '../../../components/CustomModal/CustomModal';
import Form from './components/Form/Form';

const Home = () => {
  const emailEntered = localStorage.getItem("email");
  const [isOpen, setIsOpen] = useState(emailEntered ? false : true);

  useEffect(() => {
    const VITE_ENV = import.meta.env.VITE_ENV;
    if (VITE_ENV === "production") {
      ReactGA.send({ hitType: "pageview", page: "/", title: "Home Page" });
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Navbar />
      <Hero />
      <Intro />
      <Maps />
      <Quizzes />
      <Footer />
      <CustomModal isOpen={isOpen} onRequestClose={handleClose} contentLabel="Email Input" width='40%'>
        <Form handleClose={handleClose} />
      </CustomModal>
    </>
  )
}

export default Home;
