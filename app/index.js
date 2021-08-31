import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import MoviesNowPlaying from './components/MoviesNowPlaying';
import './index.css';

const App = () => <MoviesNowPlaying />;

ReactDOM.render(<App />, document.getElementById('app'));
