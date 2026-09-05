import React from 'react';
import { Link } from 'react-router-dom';
import ProductMedia from './ProductMedia';
import ProductPrice from './ProductPrice';

const ProductCard = ({ product }) => (
  <article className="shop-product-card">
    <Link to={`/shop/${product.slug}`} className="shop-product-card-link" aria-label={`View ${product.name}`}>
      <div className="shop-product-card-media">
        <ProductMedia media={product.images[0]} productName={product.name} compact />
        <span className="shop-product-card-index" aria-hidden="true">{product.id.slice(-3)}</span>
      </div>
      <div className="shop-product-card-meta">
        <div>
          <h3>{product.name}</h3>
          <p>{product.type}</p>
        </div>
        <ProductPrice amount={product.price} currency={product.currency} className="shop-product-card-price" />
      </div>
    </Link>
  </article>
);

export default ProductCard;

