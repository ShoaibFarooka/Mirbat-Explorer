import React from 'react'
import './Footer.css'
import socials from '../../assets/images/socials.png'
const Footer = () => {
  return (
    <section className='Footer'>

    <div className='content'>


        <div className='heading'>Lorem Ipsum</div>
        <div className='paragraph'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>

        <img src={socials} alt="Socials-img" className='img'/>
        
        <div className='Footer-line'>
       MirbatExplorer © 2025 - All Right Reserved
       </div>

    </div>
</section>
  )
}

export default Footer
