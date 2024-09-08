import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';  // Import your CSS file



const App = () => {
  return (
    <div className='app'>
    <BrowserRouter>
     
     <Routes>
       <Route index element={<Home />} />
       <Route path="/Home" element={<Home />} />
       
     </Routes>
     
   </BrowserRouter>
    </div>
  )
}

export default App
