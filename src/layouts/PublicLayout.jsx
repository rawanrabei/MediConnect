import React from 'react';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';
import { mainContent, publicLayout, skipLink } from '../constants/uiClasses';

const PublicLayout = ({ children }) => {
  return (
    <div className={publicLayout}>
      <a href="#main-content" className={skipLink}>
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className={mainContent}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
