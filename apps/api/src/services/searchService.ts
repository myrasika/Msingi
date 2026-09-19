import prisma from './prisma';

const normalize = (value: string) => value.toLowerCase().trim();

const tokenize = (value: string) =>
  normalize(value)
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

export async function searchSituations(query: string) {
  const q = normalize(query);
  if (!q) {
    return {
      matched: null,
      alternatives: [],
      hasVerifiedInfo: false,
    };
  }

  const situations = await prisma.situation.findMany({
    where: { isActive: true },
    include: {
      category: true,
      legalSections: {
        include: {
          legalSection: {
            include: { legalSource: true },
          },
        },
      },
    },
    orderBy: { title: 'asc' },
  });

  type SituationWithRelations = (typeof situations)[number];
  type SearchCandidate = {
    situation: SituationWithRelations;
    confidence: number;
    matchedKeywords: string[];
  };

  const queryTokens = new Set(tokenize(q));

  const scored: SearchCandidate[] = situations
    .map((situation: SituationWithRelations): SearchCandidate => {
      const haystack = [
        situation.title,
        situation.description,
        situation.category?.name ?? '',
        ...(situation.searchKeywords ?? []),
      ].join(' ');

      const haystackTokens = new Set(tokenize(haystack));
      const matchedKeywords: string[] = Array.from(queryTokens).filter((token: string) =>
        haystackTokens.has(token) || haystack.includes(token),
      );

      const exactPhraseBonus = haystack.includes(q) ? 1 : 0;
      const keywordMatches = matchedKeywords.length;
      const titleBonus = haystack.toLowerCase().startsWith(q) ? 1.5 : 0;
      const score = Math.min(1, (keywordMatches * 0.35 + exactPhraseBonus * 0.5 + titleBonus) / 2.5);

      return {
        situation,
        confidence: Number(score.toFixed(2)),
        matchedKeywords,
      };
    })
    .filter((entry: SearchCandidate) => entry.confidence > 0.15)
    .sort((a: SearchCandidate, b: SearchCandidate) =>
      b.confidence - a.confidence || a.situation.title.localeCompare(b.situation.title),
    );

  const matched: SearchCandidate | null = scored[0] ?? null;
  const alternatives = scored.slice(1, 5).map(({ situation, confidence, matchedKeywords }: SearchCandidate) => ({
    situation,
    confidence,
    matchedKeywords,
  }));

  return {
    matched: matched
      ? {
          situation: matched.situation,
          confidence: matched.confidence,
          matchedKeywords: matched.matchedKeywords,
        }
      : null,
    alternatives,
    hasVerifiedInfo: Boolean(matched && matched.situation.legalSections.length > 0),
  };
}
