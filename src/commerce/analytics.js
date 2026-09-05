const ATTRIBUTION_KEY = 'synthesis-shop-attribution-v1';

const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
};

export const captureAttribution = () => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const incoming = utmKeys.reduce((result, key) => {
    const value = params.get(key);
    if (value) result[key] = value;
    return result;
  }, {});

  const existing = safeParse(window.localStorage.getItem(ATTRIBUTION_KEY)) || {};
  const attribution = Object.keys(incoming).length > 0
    ? {
        ...incoming,
        landingPath: `${window.location.pathname}${window.location.search}`,
        referrer: document.referrer || null,
        capturedAt: new Date().toISOString(),
      }
    : existing;

  if (Object.keys(attribution).length > 0) {
    window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  }

  return attribution;
};

export const getAttribution = () => {
  if (typeof window === 'undefined') return {};
  return safeParse(window.localStorage.getItem(ATTRIBUTION_KEY)) || captureAttribution();
};

export const trackCommerceEvent = (name, payload = {}) => {
  if (typeof window === 'undefined') return;

  const detail = {
    event: name,
    ...payload,
    attribution: getAttribution(),
    timestamp: new Date().toISOString(),
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(detail);
  }

  window.dispatchEvent(new CustomEvent('shop:analytics', { detail }));
};

export const trackPurchase = (order) => trackCommerceEvent('purchase', order);

