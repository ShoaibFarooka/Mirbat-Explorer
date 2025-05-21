import React from 'react'
import './Footer.css'
import socials from '../../assets/images/socials.png'
const Footer = () => {
  return (
    <section className='Footer'>

    <div className='content'>


        <div className='heading'>Enjoy Mirbat</div>
        <div className='paragraph'>Visit Our Sites.</div>

        <img src={socials} alt="Socials-img" className='img'/>
        
        <div className='Footer-line'>
       MirbatExplorer © 2025 - All Right Reserved
       </div>

    </div>
</section>
  )
}

export default Footer
