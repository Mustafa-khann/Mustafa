import React, { useEffect, useMemo, useState } from 'react';
import ProductGrid from '../components/shop/ProductGrid';
import CategoryFilter from '../components/shop/CategoryFilter';
import ShopShell from '../components/shop/ShopShell';
import PageHeader from '../components/common/PageHeader';
import { products, visibleCategories } from '../data/products';
import { captureAttribution, trackCommerceEvent } from '../commerce/analytics';
import { usePageMetadata } from '../utils/metadata';
import './shop.css';

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredProducts = useMemo(() => activeCategory === 'all' ? products : products.filter((product) => product.category === activeCategory), [activeCategory]);
  usePageMetadata({
    title: 'Shop — Mustafa Khan',
    description: 'Technical references, prints, and tools for the workbench.',
    image: `${window.location.origin}/assets/og-images/shop.png`,
  });
  useEffect(() => { captureAttribution(); trackCommerceEvent('shop_view', { productCount: products.length }); }, []);
  return <ShopShell>
    <main className="shop-main">
      <PageHeader number="05" title="Shop" description="Technical references, prints, and tools for the workbench." />
      <section className="shop-catalog" id="products" aria-labelledby="products-heading">
        <div className="shop-catalog-toolbar"><h2 id="products-heading">The collection</h2><span className="shop-catalog-count" aria-live="polite">{String(filteredProducts.length).padStart(2, '0')} items</span></div>
        <CategoryFilter categories={visibleCategories} activeCategory={activeCategory} onChange={setActiveCategory} />
        <ProductGrid products={filteredProducts} />
      </section>
    </main>
  </ShopShell>;
};
export default ShopPage;
