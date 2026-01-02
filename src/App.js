import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from './config/routes';
import './styles/Lab.css';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div className="lab-page"><p>Loading...</p></div>}>
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
            <main className="lab-page">
              <h1>404</h1>
              <p>Page not found.</p>
              <a href="/">Return</a>
            </main>
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
