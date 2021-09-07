import React from 'react';
import spinnerIMG from '../../images/spinner.svg';

const LoadingSpinner = () => (
  <div className="flex justify-center mt-16">
    <img src={spinnerIMG} alt="Loading spinner icon" width="120" />
  </div>
);

export default LoadingSpinner;
