import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux';
import WelcomePage from './pages/WelcomePage';
import BoardPage from './pages/BoardPage';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Route exact path="/" component={WelcomePage} />
          <Route path="/boards/:id" component={BoardPage} />
        </React.Fragment>
      </Router>
    </Provider>
  );
}
