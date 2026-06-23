import { slugify } from './slugs';

export const POST_GEAR_TRIGGER_SELECTOR = '[data-gear-modal="true"], #gearModalBtn';

const MONTH_INDEX = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

const toIsoDate = (timestamp) => new Date(timestamp).toISOString().slice(0, 10);

const parsePostDate = (value) => {
  const match = String(value || '').trim().match(/^([A-Za-z]+)\.?,?\s+(\d{1,2}),?\s+(\d{4})$/);
  if (!match) return null;

  const [, monthText, dayText, yearText] = match;
  const month = MONTH_INDEX[monthText.toLowerCase()];
  const day = Number(dayText);
  const year = Number(yearText);

  if (month === undefined || !Number.isInteger(day) || !Number.isInteger(year)) {
    return null;
  }

  const timestamp = Date.UTC(year, month, day);
  const parsed = new Date(timestamp);
  const isValid =
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month &&
    parsed.getUTCDate() === day;

  if (!isValid) return null;

  return {
    timestamp,
    isoDate: toIsoDate(timestamp),
  };
};

export const getPostDateMeta = (value) => parsePostDate(value) || {
  timestamp: 0,
  isoDate: undefined,
};

export const sortPostsByDateDesc = (items = []) =>
  [...items].sort((a, b) => {
    const dateDelta = getPostDateMeta(b.date).timestamp - getPostDateMeta(a.date).timestamp;
    if (dateDelta !== 0) return dateDelta;
    return Number(b.id || 0) - Number(a.id || 0);
  });

export const getPostPath = (post) => `/posts/${slugify(post?.title)}`;

export const decodeRouteSlug = (slug = '') => {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
};

export const findPostByRouteSlug = (items = [], routeSlug = '') => {
  const decodedSlug = decodeRouteSlug(routeSlug);
  const canonicalSlug = slugify(decodedSlug || routeSlug);

  return items.find((post) => {
    const postSlug = slugify(post.title);
    return postSlug === routeSlug || postSlug === canonicalSlug || post.title === decodedSlug;
  });
};

export const hasRecommendedGear = (post) =>
  Array.isArray(post?.gear?.collections) &&
  post.gear.collections.some((collection) => Array.isArray(collection?.items) && collection.items.length > 0);

const normalizeGearTriggers = (html) =>
  html.replace(/<button\b([^>]*\bdata-gear-modal=(["'])true\2[^>]*)>/gi, (_match, attributes) => {
    const normalizedAttributes = attributes
      .replace(/\sstyle=(["'])[\s\S]*?\1/gi, '')
      .replace(/\sclass=(["'])[\s\S]*?\1/gi, '')
      .replace(/\stype=(["'])[\s\S]*?\1/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

    return `<button ${normalizedAttributes} type="button" class="post-gear-trigger">`;
  });

export const preparePostHtml = (html = '') =>
  normalizeGearTriggers(String(html))
    .replace(/\sstyle=(["'])color\s*:[^"']*\1/gi, '')
    .replace(/<span\b[^>]*>/gi, '')
    .replace(/<\/span>/gi, '')
    .replace(/<br\s*\/?>/gi, '<br>')
    .replace(/<br>\s*<br>/gi, '</p><p>');
