import React from 'react';
import { number, string } from 'prop-types';
import { Link } from 'react-router-dom';

const ErrorPage = ({
  statusCode = 404,
  message = 'This page could not be found.',
  link = '/',
  linkText = 'Go Home',
}) => (
  <div className="flex justify-center items-center mt-16">
    <h1 className="relative text-red-600 border-r border-red-600 pr-6 text-6xl font-bold">
      {statusCode}
    </h1>
    <div className="ml-6">
      <p className="text-2xl mb-2">{message}</p>
      <Link
        to={link}
        className="text-primaryOff-900 hover:text-primaryOff-800 transition"
      >
        {linkText}
      </Link>
    </div>
  </div>
);

ErrorPage.propTypes = {
  statusCode: number,
  message: string,
  link: string,
  linkText: string,
};

export default ErrorPage;
