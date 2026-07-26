import {
  countWords,
  formatReadingTime,
  getExcerpt,
  getNeighbours,
  getReadingMinutes,
  stripHtml,
} from './content';

describe('content utilities', () => {
  test('strips tags and decodes entities', () => {
    expect(stripHtml('<p>Knowing is a <strong>skill</strong>.</p>')).toBe('Knowing is a skill.');
    expect(stripHtml('Tools &amp; thought &mdash; both')).toBe('Tools & thought — both');
  });

  test('does not leave gaps in front of punctuation when inline tags are removed', () => {
    expect(stripHtml('an important <a href="#">topic</a>, perhaps one')).toBe(
      'an important topic, perhaps one'
    );
  });

  test('ignores script and style content', () => {
    expect(stripHtml('<style>p{color:red}</style>Body text')).toBe('Body text');
  });

  test('counts words and rounds reading time to at least a minute', () => {
    expect(countWords('<p>one two three</p>')).toBe(3);
    expect(getReadingMinutes('<p>one two three</p>')).toBe(1);
    expect(getReadingMinutes('')).toBe(0);
    expect(getReadingMinutes(`<p>${'word '.repeat(660)}</p>`)).toBe(3);
  });

  test('formats reading time and omits it for empty content', () => {
    expect(formatReadingTime(4)).toBe('4 min');
    expect(formatReadingTime(0)).toBe('');
  });

  test('returns short content unchanged', () => {
    expect(getExcerpt('<p>Short enough.</p>', 180)).toBe('Short enough.');
  });

  test('drops headings so the excerpt opens on real prose', () => {
    const html = `
      <div><div>
        <h1 style="color:green">Funding Your Hardware Project</h1>
        <p>Building hardware is expensive.</p>
      </div></div>`;

    expect(getExcerpt(html, 180)).toBe('Building hardware is expensive.');
  });

  test('prefers a sentence boundary when one lands late in the window', () => {
    const html = `<p>First sentence runs on for a while here. ${'tail '.repeat(60)}</p>`;

    expect(getExcerpt(html, 60)).toBe('First sentence runs on for a while here.');
  });

  test('ignores a sentence boundary that falls too early to be useful', () => {
    const html = `<p>Yes. ${'padding '.repeat(30)}</p>`;
    const excerpt = getExcerpt(html, 60);

    expect(excerpt.startsWith('Yes. padding')).toBe(true);
    expect(excerpt.endsWith('…')).toBe(true);
  });

  test('falls back to a word boundary with an ellipsis', () => {
    const excerpt = getExcerpt(`<p>${'alpha '.repeat(40)}</p>`, 50);

    expect(excerpt.endsWith('…')).toBe(true);
    expect(excerpt).not.toMatch(/\s…$/);
    expect(excerpt.length).toBeLessThanOrEqual(51);
  });

  test('finds neighbours within an ordered list', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];

    expect(getNeighbours(items, (i) => i.id === 2)).toEqual({
      index: 1,
      previous: { id: 1 },
      next: { id: 3 },
    });
  });

  test('leaves the ends of the list open', () => {
    const items = [{ id: 1 }, { id: 2 }];

    expect(getNeighbours(items, (i) => i.id === 1).previous).toBeNull();
    expect(getNeighbours(items, (i) => i.id === 2).next).toBeNull();
  });

  test('reports no neighbours for an unknown item', () => {
    expect(getNeighbours([{ id: 1 }], (i) => i.id === 99)).toEqual({
      index: -1,
      previous: null,
      next: null,
    });
  });
});
