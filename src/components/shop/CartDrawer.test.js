import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { CartProvider, useCart } from '../../commerce/CartContext';
import { products } from '../../data/products';
import CartDrawer from './CartDrawer';

const Harness = () => {
  const { addItem } = useCart();
  return <><button id="cart-trigger" onClick={() => addItem(products[0], products[0].variants[0])}>Add item</button><CartDrawer /></>;
};

test('cart keeps keyboard focus inside, preserves it during edits, and returns it on close', () => {
  window.localStorage.clear();
  const container = document.createElement('div');
  document.body.appendChild(container);
  act(() => { ReactDOM.render(<CartProvider><Harness /></CartProvider>, container); });
  expect(container.querySelector('[role="dialog"]')).toBeNull();
  const trigger = container.querySelector('#cart-trigger');
  trigger.focus();
  act(() => { trigger.click(); });
  const dialog = container.querySelector('[role="dialog"]');
  const close = dialog.querySelector('[aria-label="Close cart"]');
  expect(document.activeElement).toBe(close);
  act(() => { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true })); });
  expect(document.activeElement).toBe(dialog.querySelector('.checkout-button'));
  act(() => { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true })); });
  expect(document.activeElement).toBe(close);
  const increase = dialog.querySelector('[aria-label="Increase quantity"]');
  increase.focus();
  act(() => { increase.click(); });
  expect(document.activeElement).toBe(increase);
  expect(dialog.querySelector('.quantity-selector span').textContent).toBe('2');
  act(() => { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); });
  expect(container.querySelector('[role="dialog"]')).toBeNull();
  expect(document.activeElement).toBe(trigger);
  act(() => { ReactDOM.unmountComponentAtNode(container); });
  container.remove();
});
