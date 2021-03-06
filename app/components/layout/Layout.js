import React from 'react';
import { node } from 'prop-types';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div className="pr-6 pl-6 mt-16 max-w-screen-xl mx-auto flex flex-col justify-start min-h-screen">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: node,
};

export default Layout;
