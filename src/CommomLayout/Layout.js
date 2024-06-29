import React from 'react'
import Home from './Home'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import '../Style/Layout.css'
import Adminappcontent from '../Service/Adminappcontent'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <div className="app">
      <Header />
      <div className='main-content'>
        <Sidebar />
        <div className='right'>
          <div className='content'>
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
     
    </div>
  );

}

export default Layout
