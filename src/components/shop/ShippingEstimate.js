import React from 'react';

const ShippingEstimate = ({ shipping }) => {
  if (!shipping) return null;
  return (
    <div className="fulfillment-note">
      <span>Shipping</span>
      <p>{shipping.estimate}</p>
      <small>{shipping.summary}</small>
    </div>
  );
};

export default ShippingEstimate;

