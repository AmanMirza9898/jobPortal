import React from 'react';
import { Footer } from './Footer';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from "./shared/Navbar"
import { useEffect } from 'react';
import ScrollToTopButton from './ScrollToTopButton';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="layout-container">
      <Navbar />

      <main className="min-h-[80vh] pt-20 md:pt-28">
        <Outlet />
      </main>

      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default Layout;