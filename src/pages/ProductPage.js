import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ShopShell from '../components/shop/ShopShell';
import ProductGallery from '../components/shop/ProductGallery';
import ProductPrice from '../components/shop/ProductPrice';
import ProductVariants from '../components/shop/ProductVariants';
import ProductSpecifications from '../components/shop/ProductSpecifications';
import StockStatus from '../components/shop/StockStatus';
import ShippingEstimate from '../components/shop/ShippingEstimate';
import DigitalDeliveryBadge from '../components/shop/DigitalDeliveryBadge';
import AddToCart, { QuantitySelector } from '../components/shop/AddToCart';
import CheckoutButton from '../components/shop/CheckoutButton';
import { commerceClient } from '../commerce/client';
import { trackCommerceEvent } from '../commerce/analytics';
import { getProductBySlug } from '../data/products';
import { usePageMetadata } from '../utils/metadata';
import './shop.css';

const ProductStructuredData = ({ product, price }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.id,
    brand: { '@type': 'Brand', name: 'Synthesis Labs' },
    category: product.type,
    offers: {
      '@type': 'Offer',
      priceCurrency: product.currency,
      price: (price / 100).toFixed(2),
      availability: product.inventory.status === 'out_of_stock'
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
      url: typeof window === 'undefined' ? undefined : window.location.href,
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
};

const ProductPage = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const [selectedVariant, setSelectedVariant] = useState(product ? product.variants[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [checkoutError, setCheckoutError] = useState('');

  const meta = product ? {
    title: `${product.name} — Synthesis Shop`,
    description: product.tagline,
    image: `${window.location.origin}/assets/og-images/shop.png`,
    type: 'product',
  } : {
    title: 'Product not found — Synthesis Shop',
    description: 'The requested product could not be found.',
  };
  usePageMetadata(meta);

  useEffect(() => {
    setSelectedVariant(product ? product.variants[0] : null);
    setQuantity(1);
    setCheckoutError('');
  }, [product]);

  useEffect(() => {
    if (!product) return;
    trackCommerceEvent('product_view', {
      productId: product.id,
      productName: product.name,
      value: product.price,
      currency: product.currency,
    });
  }, [product]);

  const currentPrice = selectedVariant ? selectedVariant.price : product ? product.price : 0;
  const buyNowLines = useMemo(() => product ? [{ product, variant: selectedVariant, quantity }] : [], [product, selectedVariant, quantity]);

  if (!product) {
    return (
      <ShopShell>
        <main className="shop-main product-not-found">
          <span className="shop-kicker">ERROR / 404</span>
          <h1>Object not found.</h1>
          <p>This catalog entry may have moved or no longer exists.</p>
          <Link to="/shop">← Return to shop</Link>
        </main>
      </ShopShell>
    );
  }

  return (
    <ShopShell>
      <main className="shop-main product-page">
        <ProductStructuredData product={product} price={currentPrice} />
        <div className="product-breadcrumb">
          <Link to="/shop">Shop</Link><span>/</span><span>{product.type}</span><span>/</span><strong>{product.name}</strong>
        </div>

        <section className="product-buy-section" aria-labelledby="product-title">
          <ProductGallery product={product} />
          <div className="product-purchase-panel">
            <div className="product-purchase-register">
              <span>{product.id.toUpperCase()}</span>
              <StockStatus inventory={product.inventory} />
            </div>
            <h1 id="product-title">{product.name}</h1>
            <p className="product-tagline">{product.tagline}</p>
            <ProductPrice amount={currentPrice} currency={product.currency} className="product-main-price" />

            <ProductVariants variants={product.variants} selectedVariant={selectedVariant} onChange={setSelectedVariant} />

            <div className="product-quantity-row">
              <span>Quantity</span>
              <QuantitySelector value={quantity} onChange={setQuantity} />
            </div>

            <div className="product-purchase-actions">
              <AddToCart product={product} variant={selectedVariant} quantity={quantity} />
              <CheckoutButton lines={buyNowLines} onError={setCheckoutError}>Buy now</CheckoutButton>
            </div>
            {checkoutError && <p className="checkout-error" role="status">{checkoutError}</p>}
            {commerceClient.capabilities.acceleratedCheckout && (
              <p className="accelerated-checkout-note">Apple Pay / Google Pay available when supported by your device.</p>
            )}

            {product.fulfillmentType === 'digital'
              ? <DigitalDeliveryBadge />
              : <ShippingEstimate shipping={product.shipping} />}
          </div>
        </section>

        <div className="product-information">
          <section className="product-description" aria-labelledby="product-description-title">
            <div className="product-detail-section-heading">
              <span>01</span>
              <h2 id="product-description-title">About the object</h2>
            </div>
            <div className="product-description-grid">
              <p>{product.description}</p>
              <div>
                <h3>What’s included</h3>
                <ul>
                  {product.included.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </section>

          <ProductSpecifications specifications={product.specifications} />

          <section className="product-delivery" aria-labelledby="product-delivery-title">
            <div className="product-detail-section-heading">
              <span>03</span>
              <h2 id="product-delivery-title">Delivery & support</h2>
            </div>
            <div className="product-delivery-grid">
              <div>
                <span>Fulfillment</span>
                <p>{product.fulfillmentType.replaceAll('_', ' ')}</p>
              </div>
              <div>
                <span>Delivery</span>
                <p>{product.fulfillmentType === 'digital' ? 'Immediate secure download' : product.shipping.estimate}</p>
              </div>
              <div>
                <span>Questions</span>
                <p><a href="mailto:mustafakhann050@gmail.com">Contact the lab ↗</a></p>
              </div>
            </div>
          </section>
        </div>


        <div className="product-mobile-buybar">
          <div>
            <span>{product.name}</span>
            <ProductPrice amount={currentPrice} currency={product.currency} />
          </div>
          <AddToCart product={product} variant={selectedVariant} quantity={quantity}>Add</AddToCart>
        </div>
      </main>
    </ShopShell>
  );
};

export default ProductPage;

