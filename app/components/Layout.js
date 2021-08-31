import React from 'react';

const Layout = ({ children }) => (
  <div className="pt-6 pb-6">
    <main className="max-w-screen-xl mx-auto">{children}</main>
  </div>
);

export default Layout;
