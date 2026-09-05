import React, { useState } from 'react';
import ProductMedia from './ProductMedia';

const ProductGallery = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = product.images[activeIndex] || product.images[0];

  return (
    <section className="product-gallery" aria-label={`${product.name} gallery`}>
      <div className="product-gallery-main">
        <ProductMedia media={activeMedia} productName={product.name} />
        <span className="product-gallery-count">{String(activeIndex + 1).padStart(2, '0')} / {String(product.images.length).padStart(2, '0')}</span>
      </div>
      {product.images.length > 1 && (
        <div className="product-gallery-thumbs">
          {product.images.map((media, index) => (
            <button
              type="button"
              key={media.id}
              className={index === activeIndex ? 'is-active' : ''}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}: ${media.alt}`}
              aria-pressed={index === activeIndex}
            >
              <ProductMedia media={media} productName={product.name} compact />
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductGallery;

