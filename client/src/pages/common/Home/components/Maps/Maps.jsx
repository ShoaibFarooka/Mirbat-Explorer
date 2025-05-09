import React from 'react'
import './Maps.css'
import maps from '../../../../../assets/images/maps-sec.png';
import { useNavigate } from 'react-router-dom';
import ReactGA from "react-ga4";

const Maps = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    ReactGA.event({
      category: 'User',
      action: 'click',
      label: "Explore Maps Button",
    });
    navigate('/maps');
  };

  return (
    <section className='maps'>

      <div className="content">
        <div className='heading'>Maps</div>
        <div className='paragraph'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
      </div>

      <img src={maps} alt="Map-Image" className='map-img' />

      <button className='btn explore-btn' onClick={handleClick} >Explore Maps</button>
    </section>
  )
}

export default Maps;
