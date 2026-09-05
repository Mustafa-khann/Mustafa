import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { preloadRouteForPath, routes, scheduleRoutePreloading } from './config/routes';
import ScrollRestoration from './components/common/ScrollRestoration';
import { CartProvider } from './commerce/CartContext';
import SiteNavigation from './components/common/SiteNavigation';
import Footer from './components/sections/Footer';

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
    <CartProvider>
      <div
        className="App"
        onFocusCapture={handleLinkIntent}
        onMouseOverCapture={handleLinkIntent}
        onTouchStartCapture={handleLinkIntent}
      >
        <ScrollRestoration />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteNavigation />
        <div id="main-content" tabIndex={-1}>
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
              <main className="site-main empty-page">
                <span className="eyebrow">404 / Page not found</span>
                <h1>This page is missing.</h1>
                <a className="text-link" href="/">Return to the index ↗</a>
              </main>
            </Route>
          </Switch>
        </React.Suspense>
        </div>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
