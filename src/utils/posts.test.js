import {
  findPostByRouteSlug,
  getPostDateMeta,
  getPostPath,
  hasRecommendedGear,
  preparePostHtml,
  sortPostsByDateDesc,
} from './posts';

describe('post utilities', () => {
  const samplePosts = [
    { id: 1, title: 'Older Post', date: 'Jan 14 2025' },
    { id: 2, title: 'How to Fund Your Hardware Projects', date: 'Sep 4, 2025' },
    { id: 3, title: 'Middle Post', date: 'March 25, 2025' },
  ];

  it('builds canonical post paths', () => {
    expect(getPostPath(samplePosts[1])).toBe('/posts/how-to-fund-your-hardware-projects');
  });

  it('finds posts from encoded legacy route slugs', () => {
    const post = findPostByRouteSlug(samplePosts, 'How%20to%20Fund%20Your%20Hardware%20Projects');
    expect(post).toBe(samplePosts[1]);
  });

  it('sorts posts by parsed publication date', () => {
    expect(sortPostsByDateDesc(samplePosts).map((post) => post.id)).toEqual([2, 3, 1]);
  });

  it('returns stable ISO date metadata', () => {
    expect(getPostDateMeta('Jan 14 2025')).toEqual({
      timestamp: Date.UTC(2025, 0, 14),
      isoDate: '2025-01-14',
    });
  });

  it('detects recommended gear only when items exist', () => {
    expect(hasRecommendedGear({ gear: { collections: [{ items: [{ title: 'Multimeter' }] }] } })).toBe(true);
    expect(hasRecommendedGear({ gear: { collections: [{ items: [] }] } })).toBe(false);
  });

  it('normalizes inline gear triggers from raw post HTML', () => {
    const html = preparePostHtml(`
      <button data-gear-modal="true" style="color: white; padding: 12px;">Recommended Gear</button>
    `);

    expect(html).toContain('data-gear-modal="true"');
    expect(html).toContain('type="button"');
    expect(html).toContain('class="post-gear-trigger"');
    expect(html).not.toContain('style=');
  });
});
