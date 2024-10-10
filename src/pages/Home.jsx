import React from 'react';
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import About from '../components/About'
import OurServices from '../components/OurServices'
import Future from '../components/Future'
import Contact from '../components/Contact'
import AppHeader from '../components/Header'



const Home = () => {
 

  return (
   
    <div>

    <AppHeader/>
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
