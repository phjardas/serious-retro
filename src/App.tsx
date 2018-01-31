import * as React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import WelcomePage from './pages/WelcomePage';
import AboutPage from './pages/AboutPage';

export default () => (
  <Router>
    <div>
      <h1>Serious Retrospective</h1>
      <ul>
        <li>
          <NavLink to="/" exact>
            Welcome
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>

      <Route exact path="/" component={WelcomePage} />
      <Route path="/about" component={AboutPage} />
    </div>
  </Router>
);
