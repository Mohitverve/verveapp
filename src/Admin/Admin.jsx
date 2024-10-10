import React from 'react'
import GameUploadForm from './GameUploadForm'
import AdminDashboard from './AdminDashboard'
import AppHeader from '../components/Header'
import Footer from '../components/Footer'

const Admin = () => {
  return (
    <div>
      <AppHeader/>
  
     <AdminDashboard/>
   
    <Footer/>
   
    </div>
  )
}

export default Admin
