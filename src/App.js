import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { preloadRouteForPath, routes, scheduleRoutePreloading } from './config/routes';
import ScrollRestoration from './components/common/ScrollRestoration';
import NotFoundPage from './pages/NotFoundPage';

const RoutePending = () => <div className="route-pending" aria-hidden="true" />;

function App() {
  React.useEffect(() => scheduleRoutePreloading(), []);

  const handleLinkIntent = React.useCallback((event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const anchor = target.closest('a[href]');
    if (!anchor) return;

    const url = new URL(anchor.href, window.location.origin);
    if (url.origin !== window.location.origin) return;

    preloadRouteForPath(url.pathname);
  }, []);

  return (
    <div
      className="App"
      onFocusCapture={handleLinkIntent}
      onMouseOverCapture={handleLinkIntent}
      onTouchStartCapture={handleLinkIntent}
    >
      <ScrollRestoration />
      <React.Suspense fallback={<RoutePending />}>
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
            <NotFoundPage />
          </Route>
        </Switch>
      </React.Suspense>
    </div>
  );
}

export default App;
