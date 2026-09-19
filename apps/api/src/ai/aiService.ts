import OpenAI from 'openai';
import prisma from '../services/prisma';
import { searchSituations } from '../services/searchService';

export type SupportedLanguage = 'en' | 'sw';

const PLACEHOLDER = '[VERIFIED LEGAL TEXT TO BE INSERTED]';

const openaiClient = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const buildFallbackExplanation = (sections: Array<{ reference?: string; title?: string; legalText?: string }>, title: string, language: SupportedLanguage) => {
  const legalReferences = sections.length > 0
    ? sections.map((section) => section.reference ?? section.title ?? 'Verified legal source').join(', ')
    : 'the verified legal sources linked to this situation';

  const explanationText = language === 'sw'
    ? 'Taarifa hii imeunganishwa na vyanzo vinavyothibitishwa vinavyohusiana na hali hii. Kwa sasa, programu inaonyesha vyanzo hivyo kwa usalama na haina kukadiria sheria bila msingi.'
    : 'This information is linked to verified legal sources connected to this situation. For now, the app shows those sources safely and does not guess the law without a verified basis.';

  return {
    summary:
      language === 'sw'
        ? `Hali hii inahusishwa na ${legalReferences}. Kitu muhimu ni kufuatilia vyanzo vinavyothibitishwa na kuelewa kikomo cha taarifa hii.`
        : `This situation is connected to ${legalReferences}. The important point is to rely on the verified sources and recognise the limits of this explanation.`,
    explanation: explanationText,
    whatThisMeans:
      language === 'sw'
        ? 'Maelezo haya yanakusudia kuelezwa kwa lugha rahisi, lakini hayapaswi kuchukuliwa kama ushauri wa kisheria wa kibinafsi au kama kubadilisha maana ya kifungu cha sheria.'
        : 'This explanation is meant to make the legal material easier to understand, but it should not be treated as personal legal advice or as a replacement for the original legal text.',
    limitations:
      language === 'sw'
        ? 'Maelezo haya yanatokana na vyanzo vinavyothibitishwa vilivyopewa kwa hali hii. Ikiwa habari haitoshi, lazima ionekane kwamba hakuna taarifa ya kutosha ya kisheria.'
        : 'This explanation is limited to the verified material supplied for this situation. If that material is incomplete, the app must say that there is not enough verified information to explain it accurately.',
  };
};

export async function classifySituation(query: string) {
  return searchSituations(query);
}

export async function simplifyLegalText(
  sections: Array<{
    id?: string;
    reference?: string;
    title?: string;
    legalText?: string;
    legalSource?: { title?: string; officialUrl?: string } | null;
  }>,
  language: SupportedLanguage,
  situationTitle = 'this situation',
) {
  const safeSections = (sections ?? []).filter(Boolean);

  if (!safeSections.length) {
    return {
      summary: 'No verified legal source is connected to this situation yet.',
      explanation: 'There is currently not enough verified legal information to explain this situation safely.',
      whatThisMeans: 'The app must not guess the legal position when the source material is missing.',
      limitations: 'The system is waiting for verified legal sources for this situation.',
    };
  }

  const promptSections = safeSections
    .map((section) => ({
      reference: section.reference ?? 'Unspecified reference',
      title: section.title ?? 'Unspecified title',
      source: section.legalSource?.title ?? 'Verified legal source',
      text: section.legalText ?? PLACEHOLDER,
    }))
    .filter((section) => section.text.trim().length > 0);

  if (!openaiClient || !process.env.OPENAI_API_KEY) {
    return buildFallbackExplanation(promptSections, situationTitle, language);
  }

  try {
    const response = await openaiClient.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content: [
            'You are a civic education assistant explaining Kenyan law.',
            'Explain ONLY the legal material provided to you.',
            'Do not invent laws, constitutional rights, procedures, institutions, deadlines, or legal conclusions.',
            'Do not add information that is unsupported by the supplied sources.',
            'Do not change the meaning of the source.',
            'Clearly distinguish the original legal text from the plain-language explanation.',
            'Do not provide personalised legal representation.',
            'If the supplied sources do not adequately answer the question, say that there is insufficient verified information.',
            'Preserve important exceptions and limitations.',
            'Use short sentences and everyday language.',
            'Return JSON with fields: summary, explanation, whatThisMeans, limitations.',
          ].join(' '),
        },
        {
          role: 'user',
          content: JSON.stringify({
            situationTitle,
            language,
            legalSections: promptSections,
          }, null, 2),
        },
      ],
      response_format: { type: 'json_object' },
    });

    const raw = response.choices[0]?.message?.content ?? '{}';
    const parsed = JSON.parse(raw) as {
      summary?: string;
      explanation?: string;
      whatThisMeans?: string;
      limitations?: string;
    };

    const summary = parsed.summary?.trim() || 'The verified legal sources have been retrieved.';
    const explanation = parsed.explanation?.trim() || 'The official legal text remains the source of truth for this situation.';
    const whatThisMeans = parsed.whatThisMeans?.trim() || 'This plain-language summary explains the source material without changing its meaning.';
    const limitations = parsed.limitations?.trim() || 'This explanation is limited to the verified sources supplied.';

    return { summary, explanation, whatThisMeans, limitations };
  } catch (error) {
    console.warn('OpenAI simplification failed, using fallback content:', error);
    return buildFallbackExplanation(promptSections, situationTitle, language);
  }
}

export async function validateExplanation(
  explanation: {
    summary?: string;
    explanation?: string;
    whatThisMeans?: string;
    limitations?: string;
  },
  sections: Array<{ reference?: string; title?: string; legalText?: string }>,
) {
  if (!explanation) return false;

  const combined = [
    explanation.summary ?? '',
    explanation.explanation ?? '',
    explanation.whatThisMeans ?? '',
    explanation.limitations ?? '',
  ].join(' ');

  if (!combined.trim()) return false;

  const sourceTokens = sections.flatMap((section) => {
    const text = [section.reference ?? '', section.title ?? '', section.legalText ?? '']
      .join(' ')
      .toLowerCase();
    return text.split(/\s+/).filter((word) => word.length > 3);
  });

  const tokenSet = new Set(sourceTokens);
  const comparison = combined.toLowerCase();
  const hasSourceReference = Array.from(tokenSet).some((token) => comparison.includes(token));

  const hasNoInventedClaim = !/(article\s*\d+|section\s*\d+|constitution|law|right\s+to)/i.test(comparison) || hasSourceReference;

  return hasSourceReference || hasNoInventedClaim;
}

export async function ensurePublishedExplanation(situationId: string, language: SupportedLanguage) {
  const situation = await prisma.situation.findUnique({
    where: { id: situationId },
    include: {
      legalSections: {
        include: {
          legalSection: {
            include: { legalSource: true },
          },
        },
      },
    },
  });

  if (!situation) return null;

  const sections = situation.legalSections.map((item: { legalSection: any }) => item.legalSection);
  const generated = await simplifyLegalText(sections, language, situation.title);

  return prisma.explanation.upsert({
    where: { situationId_language: { situationId, language } },
    update: {
      ...generated,
      reviewStatus: 'AI_GENERATED',
      generatedBy: process.env.OPENAI_MODEL ?? 'system-fallback',
    },
    create: {
      situationId,
      language,
      ...generated,
      reviewStatus: 'AI_GENERATED',
      generatedBy: process.env.OPENAI_MODEL ?? 'system-fallback',
    },
  });
}
