import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { BoardsProvider } from './api/boards';
import GlobalLoader from './components/GlobalLoader';
import ThemeProvider from './Theme';

const BoardPage = lazy(() => import('./pages/BoardPage'));
const WelcomePage = lazy(() => import('./pages/WelcomePage'));

export default function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<GlobalLoader />}>
        <BoardsProvider>
          <Router>
            <>
              <Route exact path="/" component={WelcomePage} />
              <Route path="/boards/:id" component={BoardPage} />
            </>
          </Router>
        </BoardsProvider>
      </Suspense>
    </ThemeProvider>
  );
}
