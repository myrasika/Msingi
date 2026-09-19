export type LanguageCode = 'en' | 'sw';

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
};

export type LegalSource = {
  id: string;
  title: string;
  sourceType: string;
  officialUrl: string;
  version?: string;
  effectiveDate?: string;
  lastVerified: string;
  status: string;
};

export type LegalSection = {
  id: string;
  reference: string;
  title: string;
  legalText: string;
  keywords: string[];
  legalSource?: LegalSource;
};

export type ActionItem = {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  warning?: string;
};

export type Situation = {
  id: string;
  title: string;
  slug: string;
  description: string;
  categoryId: string;
  category?: Category;
  searchKeywords: string[];
  actions: ActionItem[];
  legalSections: LegalSection[];
  explanation?: {
    summary: string;
    explanation: string;
    whatThisMeans: string;
    limitations: string;
  };
};
