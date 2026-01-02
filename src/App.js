import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from './config/routes';

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<div className="max-w-lab mx-auto px-8 py-16"><p>Loading...</p></div>}>
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
            <main className="max-w-lab mx-auto px-1 py-1">
              <h1 className="text-2xl font-medium mb-4">404</h1>
              <p>Page not found.</p>
              <a href="/">Return</a>
            </main>
          </Route>
        </Switch>
      </React.Suspense>
    </div>
  );
}

export default App;
