import React, { useState } from 'react';
import { commerceClient } from '../../commerce/client';

const CheckoutButton = ({ lines, className = '', children = 'Checkout', onError }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (!lines.length || isLoading) return;
    setIsLoading(true);
    try {
      await commerceClient.checkout(lines);
    } catch (error) {
      setIsLoading(false);
      if (onError) onError(error.message);
    }
  };

  return (
    <button
      type="button"
      className={`checkout-button ${className}`}
      onClick={handleCheckout}
      disabled={!lines.length || isLoading}
    >
      <span>{isLoading ? 'Opening secure checkout…' : children}</span>
      {!isLoading && <span aria-hidden="true">↗</span>}
    </button>
  );
};

export default CheckoutButton;

