import React from 'react'
import AppHeader from '../components/Header'
import Footer from '../components/Footer'
import Hero from "../Service/Hero"
import About from "../Service/About"
import  Benefits from "../Service/Benefits"
import Info from '../Service/Info'

const Plans = () => {
  return (
    <div>
        <AppHeader/>
        <Hero/>
    
        <Info/>
        <Benefits/>
        <About/>
  
    <Footer/>
    </div>
   
  )
}

export default Plans
