export const slugify = (value) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const matchesSlug = (value, slug) => slugify(value) === slug;
