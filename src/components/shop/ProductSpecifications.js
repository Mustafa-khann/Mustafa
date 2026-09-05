import React from 'react';

const ProductSpecifications = ({ specifications }) => {
  if (!specifications || specifications.length === 0) return null;

  return (
    <section className="product-specifications" aria-labelledby="product-specifications-title">
      <div className="product-detail-section-heading">
        <span>02</span>
        <h2 id="product-specifications-title">Technical specifications</h2>
      </div>
      <dl>
        {specifications.map(({ label, value }) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default ProductSpecifications;

