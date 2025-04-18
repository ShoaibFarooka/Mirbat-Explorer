import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className='navbar'>
      <NavLink to='/' className='logo-container'>
        <img src={logo} alt="Logo" className='logo-img' />
      </NavLink>

      <div className='nav-list'>
        <NavLink to='/' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
        <NavLink to='/maps' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Map</NavLink>
      </div>
    </div>
  )
}

export default Navbar
