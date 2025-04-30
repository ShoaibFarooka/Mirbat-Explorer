import React, { useEffect } from 'react';
import './Maps.css';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import Map from './components/Map/Map';
import ReactGA from "react-ga4";

const Maps = () => {
  useEffect(() => {
    const VITE_ENV = import.meta.env.VITE_ENV;
    if (VITE_ENV === "production") {
      ReactGA.send({ hitType: "pageview", page: "/maps", title: "Maps Page" });
    }
  }, []);

  return (
    <>
      <Navbar />
      <Map />
      <Footer />
    </>
  )
}

export default Maps;
