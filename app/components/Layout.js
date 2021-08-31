import React from 'react';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div className="pt-6 pb-6 max-w-screen-xl mx-auto">
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
