import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Intro from './components/Intro/Intro'
import Maps from './components/Maps/Maps'
import Quizzes from './components/Quizzes/Quizzes'
import Footer from '../../components/Footer/Footer'
import Hero from './components/Hero/Hero'

const Home = () => {
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

export default Home
