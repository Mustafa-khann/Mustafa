import React from 'react';
import { useCart } from '../../commerce/CartContext';

export const QuantitySelector = ({ value, onChange, compact = false }) => (
  <div className={`quantity-selector ${compact ? 'is-compact' : ''}`} aria-label="Quantity">
    <button type="button" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease quantity">−</button>
    <span aria-live="polite">{value}</span>
    <button type="button" onClick={() => onChange(Math.min(99, value + 1))} aria-label="Increase quantity">+</button>
  </div>
);

const AddToCart = ({ product, variant, quantity = 1, className = '', children = 'Add to cart' }) => {
  const { addItem } = useCart();
  const unavailable = (variant && !variant.available) || product.inventory.status === 'out_of_stock';

  return (
    <button
      type="button"
      className={`add-to-cart-button ${className}`}
      disabled={unavailable}
      onClick={() => addItem(product, variant, quantity)}
    >
      <span>{unavailable ? 'Unavailable' : children}</span>
      {!unavailable && <span aria-hidden="true">＋</span>}
    </button>
  );
};

export default AddToCart;

