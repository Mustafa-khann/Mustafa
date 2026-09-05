import React, { useEffect, useRef, useState } from 'react';
import { useCart } from '../../commerce/CartContext';
import ProductMedia from './ProductMedia';
import ProductPrice from './ProductPrice';
import CheckoutButton from './CheckoutButton';
import { QuantitySelector } from './AddToCart';

const variantLabel = (variant) => variant
  ? Object.values(variant.options || {}).join(' / ')
  : '';

const CartDrawer = () => {
  const { lines, subtotal, isOpen, closeCart, removeItem, setQuantity } = useCart();
  const [checkoutError, setCheckoutError] = useState('');
  const closeButtonRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousFocus = document.activeElement;
    setCheckoutError('');
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current && closeButtonRef.current.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeCart();
      if (event.key !== 'Tab' || !drawerRef.current) return;
      const focusable = Array.from(drawerRef.current.querySelectorAll('button:not([disabled]), a[href], input, select, [tabindex="0"]'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !drawerRef.current.contains(document.activeElement))) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !drawerRef.current.contains(document.activeElement))) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className={`cart-drawer-root ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
      <button className="cart-drawer-overlay" type="button" onClick={closeCart} tabIndex={-1} aria-label="Close cart" />
      <aside className="cart-drawer" ref={drawerRef} role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="cart-drawer-header">
          <div>
            <span>CART / {String(lines.length).padStart(2, '0')}</span>
            <h2 id="cart-title">Selected objects</h2>
          </div>
          <button ref={closeButtonRef} type="button" onClick={closeCart} aria-label="Close cart">×</button>
        </header>

        <div className="cart-drawer-lines">
          {lines.length === 0 ? (
            <div className="cart-empty">
              <span>∅</span>
              <p>Your cart is empty.</p>
              <button type="button" onClick={closeCart}>Continue exploring</button>
            </div>
          ) : lines.map((line) => (
            <article className="cart-line" key={line.id}>
              <div className="cart-line-media"><ProductMedia media={line.product.images[0]} productName={line.product.name} compact /></div>
              <div className="cart-line-details">
                <div className="cart-line-top">
                  <div>
                    <h3>{line.product.name}</h3>
                    <p>{variantLabel(line.variant)}</p>
                  </div>
                  <ProductPrice amount={(line.variant ? line.variant.price : line.product.price) * line.quantity} currency={line.product.currency} />
                </div>
                <div className="cart-line-actions">
                  <QuantitySelector value={line.quantity} onChange={(quantity) => setQuantity(line.id, quantity)} compact />
                  <button type="button" onClick={() => removeItem(line.id)}>Remove</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {lines.length > 0 && (
          <footer className="cart-drawer-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <ProductPrice amount={subtotal} currency={lines[0].product.currency} />
            </div>
            <p>Taxes and shipping calculated at checkout.</p>
            <CheckoutButton lines={lines} onError={setCheckoutError}>Secure checkout</CheckoutButton>
            {checkoutError && <p className="checkout-error" role="status">{checkoutError}</p>}
          </footer>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
