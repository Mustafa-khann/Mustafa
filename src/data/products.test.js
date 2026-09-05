import { fulfillmentTypes, products } from './products';

const requiredFields = [
  'id',
  'slug',
  'name',
  'tagline',
  'description',
  'category',
  'price',
  'currency',
  'images',
  'type',
  'variants',
  'specifications',
  'inventory',
  'fulfillmentType',
  'shipping',
  'digitalFiles',
  'featured',
];

describe('shop catalog', () => {
  test('every product follows the provider-neutral schema', () => {
    products.forEach((product) => {
      requiredFields.forEach((field) => expect(product).toHaveProperty(field));
      expect(fulfillmentTypes).toContain(product.fulfillmentType);
      expect(product.images.length).toBeGreaterThan(0);
      expect(product.variants.length).toBeGreaterThan(0);
      expect(product.variants.every((variant) => typeof variant.price === 'number')).toBe(true);
    });
  });

  test('product identifiers and slugs are unique', () => {
    expect(new Set(products.map(({ id }) => id)).size).toBe(products.length);
    expect(new Set(products.map(({ slug }) => slug)).size).toBe(products.length);
  });
});

