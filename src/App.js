import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { routes } from './config/routes';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import './App.css';
import './styles/Global.css';
import 'rsuite/dist/styles/rsuite-default.css';

function App() {
  return (
    <ErrorBoundary>
      <DataProvider>
        <div className='App'>
          <NavBar />
          <div id='content'>
            <Suspense fallback={<LoadingSpinner size='large' message='Loading page...' />}>
              <Switch>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                  />
                ))}
                <Route>
                  <div className='error-page'>
                    <div className='error-content'>
                      <h1>404 - Page Not Found</h1>
                      <p>The page you're looking for doesn't exist.</p>
                      <a href='/' className='back-home-btn'>
                        Back to Home
                      </a>
                    </div>
                  </div>
                </Route>
              </Switch>
            </Suspense>
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </DataProvider>
    </ErrorBoundary>
  );
}

export default App;
