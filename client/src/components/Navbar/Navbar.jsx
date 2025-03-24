import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to='/' className='logo-container'>
        <img src={logo} alt="Logo" className='logo-img' />
      </Link>

      <div className='nav-list'>
        <Link to='/' className='nav-link'>Home</Link>
        <Link to='/maps' className='nav-link'>Map</Link>
      </div>
    </div>
  )
}

export default Navbar
