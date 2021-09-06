import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <div>
    <Link
      to="/"
      className="font-sans font-bold text-primaryOff-900 text-center text-xl mt-20 mb-6 border-white"
    >
      Collywoo
    </Link>
  </div>
);

export default Logo;
