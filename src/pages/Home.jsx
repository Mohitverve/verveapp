import React from 'react'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import Header from '../components/Header'
import About from '../components/About'
import OurServices from '../components/OurServices'
import Future from '../components/Future'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <div>
      <Hero/>
      <About/>
      
      <OurServices/>
      <Future/>
      <Contact/>
      <Footer/> 
   
    </div>
  )
}

export default Home
