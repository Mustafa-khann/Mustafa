import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../commerce/CartContext';
const ShopNavigation = () => {
  const { itemCount, openCart } = useCart();
  return <nav className="shop-toolbar" aria-label="Shop navigation"><Link to="/shop">Synthesis Labs / Supply</Link><button type="button" onClick={openCart} aria-haspopup="dialog">Cart <span>[{String(itemCount).padStart(2, '0')}]</span></button></nav>;
};
export default ShopNavigation;
