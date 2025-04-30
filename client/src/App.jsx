import React, { useEffect } from 'react'
import './index.css'
import Router from './router/Router.jsx';
import ReactGA from "react-ga4";

const App = () => {
  useEffect(() => {
    const VITE_ENV = import.meta.env.VITE_ENV;
    if (VITE_ENV === "production") {
      ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID);
    }
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  )
}

export default App
