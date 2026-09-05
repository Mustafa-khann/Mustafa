import React from 'react';
import ShopNavigation from './ShopNavigation';
import CartDrawer from './CartDrawer';

const ShopShell = ({ children }) => (
  <div className="shop-shell">
    <ShopNavigation />
    {children}
    <CartDrawer />
  </div>
);

export default ShopShell;

