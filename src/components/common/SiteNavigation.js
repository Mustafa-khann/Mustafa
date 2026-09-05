import React from 'react';
import { NavLink } from 'react-router-dom';

export const navigation = [
  ['/', 'Index'], ['/projects', 'Projects'], ['/posts', 'Writing'],
  ['/ideas', 'Research'], ['/books', 'Books'], ['/shop', 'Shop'],
];

const SiteNavigation = () => (
  <header className="site-navigation">
    <NavLink exact to="/" className="site-wordmark" aria-label="Mustafa Khan — home">
      <span className="monogram" aria-hidden="true">mk.</span>
      <span>Mustafa Khan</span>
    </NavLink>
    <nav aria-label="Main navigation">
      {navigation.map(([to, label]) => (
        <NavLink key={to} exact={to === '/'} to={to} activeClassName="is-active">{label}</NavLink>
      ))}
    </nav>
  </header>
);
export default SiteNavigation;
