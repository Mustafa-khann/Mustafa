import React from 'react';

export const formatPrice = (amount, currency = 'USD') => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency,
  minimumFractionDigits: 0,
  maximumFractionDigits: amount % 100 === 0 ? 0 : 2,
}).format(amount / 100);

const ProductPrice = ({ amount, currency = 'USD', className = '' }) => (
  <span className={className}>{formatPrice(amount, currency)}</span>
);

export default ProductPrice;

