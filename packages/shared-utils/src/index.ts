export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function formatVerifiedDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

export function scoreKeywordMatch(query: string, keywords: string[]): number {
  const q = query.toLowerCase();
  const words = q.split(/\s+/);
  let hits = 0;
  for (const kw of keywords) {
    if (words.some((w) => kw.toLowerCase().includes(w) || w.includes(kw.toLowerCase()))) {
      hits++;
    }
  }
  return keywords.length > 0 ? hits / keywords.length : 0;
}
