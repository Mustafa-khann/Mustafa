const ENTITIES = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&mdash;': '—',
  '&ndash;': '–',
  '&hellip;': '…',
  '&lsquo;': '‘',
  '&rsquo;': '’',
  '&ldquo;': '“',
  '&rdquo;': '”',
};

const ENTITY_PATTERN = new RegExp(Object.keys(ENTITIES).join('|'), 'gi');

export const stripHtml = (html = '') =>
  String(html)
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(ENTITY_PATTERN, (match) => ENTITIES[match.toLowerCase()] || ' ')
    .replace(/\s+/g, ' ')
    // Removing inline tags leaves gaps in front of punctuation ("topic , perhaps").
    .replace(/\s+([,.;:!?…)\]])/g, '$1')
    .replace(/([([])\s+/g, '$1')
    .trim();

export const countWords = (html = '') => {
  const text = stripHtml(html);
  return text ? text.split(' ').length : 0;
};

const WORDS_PER_MINUTE = 220;

export const getReadingMinutes = (html = '') => {
  const words = countWords(html);
  return words ? Math.max(1, Math.round(words / WORDS_PER_MINUTE)) : 0;
};

export const formatReadingTime = (minutes) => (minutes ? `${minutes} min` : '');

export const getReadingTime = (html = '') => formatReadingTime(getReadingMinutes(html));

const HEADING_BLOCK = /<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi;

/**
 * First readable stretch of a piece of content, cut at a sentence boundary when
 * one lands late enough in the window, otherwise at a word boundary.
 *
 * Headings are dropped first. Several posts open with a heading that restates
 * the title, and running it into the first sentence produces excerpts like
 * "Funding Your Hardware Project Building hardware is expensive."
 */
export const getExcerpt = (html = '', maxLength = 180) => {
  const text = stripHtml(String(html).replace(HEADING_BLOCK, ' '));
  if (text.length <= maxLength) return text;

  const window = text.slice(0, maxLength + 1);
  const sentenceEnd = Math.max(
    window.lastIndexOf('. '),
    window.lastIndexOf('? '),
    window.lastIndexOf('! ')
  );

  if (sentenceEnd >= maxLength * 0.5) return window.slice(0, sentenceEnd + 1);

  const wordEnd = window.lastIndexOf(' ');
  const cut = window.slice(0, wordEnd > 0 ? wordEnd : maxLength);
  return `${cut.replace(/[\s,;:—–-]+$/, '')}…`;
};

/**
 * Neighbours of an item within an already-ordered list, so a reader who reaches
 * the end of one piece is offered the next instead of a dead end.
 */
export const getNeighbours = (items = [], matcher) => {
  const index = items.findIndex(matcher);
  if (index < 0) return { index: -1, previous: null, next: null };

  return {
    index,
    previous: index > 0 ? items[index - 1] : null,
    next: index < items.length - 1 ? items[index + 1] : null,
  };
};
