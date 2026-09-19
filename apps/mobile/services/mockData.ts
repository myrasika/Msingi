import type { Category, Situation } from '../types';

export const categories: Category[] = [
  {
    id: 'cat-police',
    name: 'Police & Arrests',
    slug: 'police-arrests',
    description: 'Understand your rights when dealing with police, from arrest and detention to reporting misconduct.',
    icon: '🚔',
  },
  {
    id: 'cat-land',
    name: 'Land & Property',
    slug: 'land-property',
    description: 'Know your rights around land ownership, boundary disputes, landlord issues, and property protection.',
    icon: '🏠',
  },
  {
    id: 'cat-work',
    name: 'Work & Labour',
    slug: 'work-labour',
    description: 'Understand your employment rights, from unpaid wages and dismissal to workplace discrimination.',
    icon: '💼',
  },
  {
    id: 'cat-business',
    name: 'Business & Traders',
    slug: 'business-traders',
    description: 'Know your rights as a trader or business owner when dealing with county officials, licences, and disputes.',
    icon: '🛍️',
  },
];

export const situationsByCategory: Record<string, Situation[]> = {
  'police-arrests': [
    {
      id: 'sit-arrested',
      title: "I've been arrested",
      slug: 'ive-been-arrested',
      description: 'Your rights when police arrest you.',
      categoryId: 'cat-police',
      category: categories[0],
      searchKeywords: ['arrested', 'detained', 'police station'],
      actions: [
        { id: 'a1', stepNumber: 1, title: 'Understand your right', description: 'Read the relevant legal provision shown above.' },
        { id: 'a2', stepNumber: 2, title: 'Keep records', description: 'Write down dates, names, badge numbers, and any documents.' },
        { id: 'a3', stepNumber: 3, title: 'Identify the right office', description: 'Find the correct authority or support organisation.' },
      ],
      legalSections: [
        {
          id: 'sec-49',
          reference: 'Article 49',
          title: 'Rights of arrested persons',
          legalText: '[VERIFIED LEGAL TEXT TO BE INSERTED]',
          keywords: ['arrest', 'detained', 'advocate', 'court'],
          legalSource: {
            id: 'src-const',
            title: 'Constitution of Kenya, 2010',
            sourceType: 'CONSTITUTION',
            officialUrl: 'https://kenyalaw.org/',
            version: '2010',
            effectiveDate: '2010-08-27',
            lastVerified: '2025-01-01',
            status: 'ACTIVE',
          },
        },
      ],
      explanation: {
        summary: 'The Constitution protects someone who has been arrested or detained. The key issue is to understand what rights you have and the limits of any lawful process.',
        explanation: 'In plain language, the law requires that the legal process and your rights be explained clearly. This does not replace the original legal text, but it helps you understand the basic protections that apply.',
        whatThisMeans: 'You should be treated in line with the legal safeguards connected to arrest and detention.',
        limitations: 'This is a simplified summary and must rely on the verified source text for the exact legal meaning.',
      },
    },
    {
      id: 'sit-search',
      title: 'Police want to search me',
      slug: 'police-want-to-search-me',
      description: 'Your rights when police want to search your person or property.',
      categoryId: 'cat-police',
      category: categories[0],
      searchKeywords: ['search', 'police search', 'search my house'],
      actions: [
        { id: 'a1', stepNumber: 1, title: 'Understand the basis for the search', description: 'Ask what the reason is and what authority is being used.' },
        { id: 'a2', stepNumber: 2, title: 'Keep records', description: 'Take note of names, time, place, and what was searched.' },
      ],
      legalSections: [
        {
          id: 'sec-31',
          reference: 'Article 31',
          title: 'Privacy',
          legalText: '[VERIFIED LEGAL TEXT TO BE INSERTED]',
          keywords: ['privacy', 'search', 'home', 'property'],
          legalSource: {
            id: 'src-const',
            title: 'Constitution of Kenya, 2010',
            sourceType: 'CONSTITUTION',
            officialUrl: 'https://kenyalaw.org/',
            version: '2010',
            effectiveDate: '2010-08-27',
            lastVerified: '2025-01-01',
            status: 'ACTIVE',
          },
        },
      ],
      explanation: {
        summary: 'Searches must be grounded in lawful authority and must not be treated as a routine procedure without limits.',
        explanation: 'The Constitution protects the privacy of a person and their home. The plain-language summary helps you understand the protection, but it does not replace the exact legal wording.',
        whatThisMeans: 'You have a right to know why a search is taking place and whether the law allows it.',
        limitations: 'The exact legal meaning remains in the verified source material.',
      },
    },
  ],
  'land-property': [
    {
      id: 'sit-land-claim',
      title: 'Someone is claiming my land',
      slug: 'someone-is-claiming-my-land',
      description: 'What to do when another person disputes your ownership.',
      categoryId: 'cat-land',
      category: categories[1],
      searchKeywords: ['land claim', 'claiming my land', 'ownership dispute'],
      actions: [
        { id: 'a1', stepNumber: 1, title: 'Review title documents', description: 'Check the documents showing your ownership and boundaries.' },
      ],
      legalSections: [
        {
          id: 'sec-40',
          reference: 'Article 40',
          title: 'Protection of right to property',
          legalText: '[VERIFIED LEGAL TEXT TO BE INSERTED]',
          keywords: ['land', 'property', 'ownership'],
          legalSource: {
            id: 'src-const',
            title: 'Constitution of Kenya, 2010',
            sourceType: 'CONSTITUTION',
            officialUrl: 'https://kenyalaw.org/',
            version: '2010',
            effectiveDate: '2010-08-27',
            lastVerified: '2025-01-01',
            status: 'ACTIVE',
          },
        },
      ],
      explanation: {
        summary: 'Property rights are protected by the Constitution, including rights connected to ownership and lawful possession.',
        explanation: 'If someone is claiming your land, the relevant source material must be checked carefully before any conclusions are made.',
        whatThisMeans: 'The source material matters, and legal advice may be necessary for a specific dispute.',
        limitations: 'This summary is not a substitute for the exact legal wording or a personal legal assessment.',
      },
    },
  ],
};

export const allSituations = Object.values(situationsByCategory).flat();

export function getSituationBySlug(slug: string) {
  return allSituations.find((item) => item.slug === slug) ?? null;
}

export function getCategoryBySlug(slug: string) {
  return categories.find((item) => item.slug === slug) ?? null;
}
