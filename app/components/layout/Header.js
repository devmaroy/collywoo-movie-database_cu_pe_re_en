import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1 className="font-sans font-bold text-primaryOff-900 text-center text-3xl md:text-4xl lg:text-5xl mb-6 border-white">
      <Link to="/">Collywoo Movie Database</Link>
    </h1>
    <div className="border-primary-600 border-b mb-16 rounded-full" />
  </header>
);

export default Header;
