import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MoviesNowPlaying from './components/movies/MoviesNowPlaying';
import Movie from './components/movies/Movie';
import NotFound from './components/common/NotFound';
import './index.css';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <MoviesNowPlaying />
      </Route>
      <Route path="/movies/:id/:slug">
        <Movie />
      </Route>
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('app'));
