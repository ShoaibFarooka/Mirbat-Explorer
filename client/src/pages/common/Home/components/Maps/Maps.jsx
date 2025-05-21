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
        <div className='paragraph'></div>
      </div>

      <img src={maps} alt="Map-Image" className='map-img' />

      <button className='btn explore-btn' onClick={handleClick} >Explore Maps</button>
    </section>
  )
}

export default Maps;
