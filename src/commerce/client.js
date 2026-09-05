import { getAttribution, trackCommerceEvent } from './analytics';

export class CommerceConfigurationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CommerceConfigurationError';
  }
}

const provider = process.env.REACT_APP_COMMERCE_PROVIDER || 'unconfigured';
const checkoutEndpoint = process.env.REACT_APP_COMMERCE_CHECKOUT_ENDPOINT || '';

const mapLine = (line) => ({
  productId: line.product.id,
  slug: line.product.slug,
  variantId: line.variant ? line.variant.id : null,
  quantity: line.quantity,
});

/**
 * Provider-neutral checkout client.
 *
 * The configured server endpoint owns provider credentials and must return
 * `{ checkoutUrl }`. That endpoint can create a Shopify checkout, Stripe
 * Checkout Session, or a custom order without leaking secret keys to the app.
 */
export const commerceClient = {
  provider,
  capabilities: {
    acceleratedCheckout: Boolean(checkoutEndpoint),
  },

  async checkout(lines) {
    trackCommerceEvent('checkout_started', {
      provider,
      itemCount: lines.reduce((total, line) => total + line.quantity, 0),
      value: lines.reduce((total, line) => {
        const unitPrice = line.variant ? line.variant.price : line.product.price;
        return total + (unitPrice * line.quantity);
      }, 0),
      currency: lines[0] ? lines[0].product.currency : 'USD',
    });

    if (!checkoutEndpoint) {
      throw new CommerceConfigurationError('Secure checkout is not connected yet.');
    }

    const response = await fetch(checkoutEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider,
        lines: lines.map(mapLine),
        attribution: getAttribution(),
        returnUrl: window.location.href,
      }),
    });

    if (!response.ok) {
      throw new Error('Checkout could not be started. Please try again.');
    }

    const result = await response.json();
    if (!result.checkoutUrl) {
      throw new Error('Checkout provider returned an invalid response.');
    }

    window.location.assign(result.checkoutUrl);
  },
};
