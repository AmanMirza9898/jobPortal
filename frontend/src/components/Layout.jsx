import React from 'react';
import {Footer} from './Footer'; 
import { Outlet } from 'react-router-dom';
import Navbar from "./shared/Navbar"

const Layout = () => {
  return (
    <div className="layout-container">
      <Navbar />
      
      <main className="min-h-[80vh]">
        <Outlet /> 
      </main>

      <Footer />
    </div>
  );
};

export default Layout;