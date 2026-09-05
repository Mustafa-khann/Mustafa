import React from 'react';

const StockStatus = ({ inventory }) => {
  const soldOut = !inventory || inventory.status === 'out_of_stock' || inventory.quantity === 0;
  const limited = inventory && inventory.tracked && inventory.quantity > 0 && inventory.quantity <= 5;
  const label = soldOut ? 'Out of stock' : limited ? `Only ${inventory.quantity} available` : 'Available';

  return (
    <span className={`stock-status ${soldOut ? 'is-out' : ''}`}>
      <i aria-hidden="true" />{label}
    </span>
  );
};

export default StockStatus;

