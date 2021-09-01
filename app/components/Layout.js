import React from 'react';
import { node } from 'prop-types';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div className="pt-6 pb-6 max-w-screen-xl mx-auto flex flex-col justify-between min-h-screen">
    <main>{children}</main>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: node,
};

export default Layout;
