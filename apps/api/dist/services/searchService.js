"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSituations = searchSituations;
const prisma_1 = __importDefault(require("./prisma"));
const normalize = (value) => value.toLowerCase().trim();
const tokenize = (value) => normalize(value)
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
async function searchSituations(query) {
    const q = normalize(query);
    if (!q) {
        return {
            matched: null,
            alternatives: [],
            hasVerifiedInfo: false,
        };
    }
    const situations = await prisma_1.default.situation.findMany({
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
    const queryTokens = new Set(tokenize(q));
    const scored = situations
        .map((situation) => {
        const haystack = [
            situation.title,
            situation.description,
            situation.category?.name ?? '',
            ...(situation.searchKeywords ?? []),
        ].join(' ');
        const haystackTokens = new Set(tokenize(haystack));
        const matchedKeywords = Array.from(queryTokens).filter((token) => haystackTokens.has(token) || haystack.includes(token));
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
        .filter((entry) => entry.confidence > 0.15)
        .sort((a, b) => b.confidence - a.confidence || a.situation.title.localeCompare(b.situation.title));
    const matched = scored[0] ?? null;
    const alternatives = scored.slice(1, 5).map(({ situation, confidence, matchedKeywords }) => ({
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
