import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { trackCommerceEvent } from './analytics';

const STORAGE_KEY = 'synthesis-shop-cart-v1';
const CartContext = createContext(null);

const readStoredCart = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    return [];
  }
};

const lineIdFor = (product, variant) => `${product.id}:${variant ? variant.id : 'default'}`;

export const CartProvider = ({ children }) => {
  const [lines, setLines] = useState(readStoredCart);
  const [isOpen, setIsOpen] = useState(false);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const persist = useCallback((nextLines) => {
    setLines(nextLines);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextLines));
  }, []);

  const addItem = useCallback((product, variant, quantity = 1, options = {}) => {
    const lineId = lineIdFor(product, variant);
    const existing = lines.find((line) => line.id === lineId);
    const nextLines = existing
      ? lines.map((line) => line.id === lineId
          ? { ...line, quantity: Math.min(line.quantity + quantity, 99) }
          : line)
      : [...lines, { id: lineId, product, variant, quantity }];

    persist(nextLines);
    trackCommerceEvent('add_to_cart', {
      productId: product.id,
      productName: product.name,
      variantId: variant ? variant.id : null,
      quantity,
      value: (variant ? variant.price : product.price) * quantity,
      currency: product.currency,
    });
    if (options.openCart !== false) setIsOpen(true);
  }, [lines, persist]);

  const removeItem = useCallback((lineId) => {
    const removed = lines.find((line) => line.id === lineId);
    persist(lines.filter((line) => line.id !== lineId));
    if (removed) {
      trackCommerceEvent('remove_from_cart', {
        productId: removed.product.id,
        variantId: removed.variant ? removed.variant.id : null,
        quantity: removed.quantity,
        value: (removed.variant ? removed.variant.price : removed.product.price) * removed.quantity,
        currency: removed.product.currency,
      });
    }
  }, [lines, persist]);

  const setQuantity = useCallback((lineId, quantity) => {
    if (quantity <= 0) {
      removeItem(lineId);
      return;
    }
    persist(lines.map((line) => line.id === lineId ? { ...line, quantity: Math.min(quantity, 99) } : line));
  }, [lines, persist, removeItem]);

  const itemCount = lines.reduce((total, line) => total + line.quantity, 0);
  const subtotal = lines.reduce((total, line) => {
    const price = line.variant ? line.variant.price : line.product.price;
    return total + (price * line.quantity);
  }, 0);

  const value = useMemo(() => ({
    lines,
    itemCount,
    subtotal,
    isOpen,
    addItem,
    removeItem,
    setQuantity,
    openCart,
    closeCart,
  }), [lines, itemCount, subtotal, isOpen, addItem, removeItem, setQuantity, openCart, closeCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
};
