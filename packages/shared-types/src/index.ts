// ─── Enums ────────────────────────────────────────────────────────────────────

export type Language = 'en' | 'sw';

export type SourceType = 'CONSTITUTION' | 'ACT' | 'REGULATION' | 'OFFICIAL_GUIDANCE' | 'CASE';

export type SourceStatus = 'ACTIVE' | 'UNDER_REVIEW' | 'OUTDATED' | 'ARCHIVED';

export type ReviewStatus = 'DRAFT' | 'AI_GENERATED' | 'HUMAN_REVIEWED' | 'PUBLISHED' | 'ARCHIVED';

export type ResourceType = 'LEGAL_AID' | 'GOVERNMENT' | 'NGO' | 'HOTLINE' | 'COURT';

// ─── Core Models ──────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Situation {
  id: string;
  categoryId: string;
  category?: Category;
  title: string;
  slug: string;
  description: string;
  searchKeywords: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LegalSource {
  id: string;
  title: string;
  sourceType: SourceType;
  officialUrl: string;
  version?: string;
  effectiveDate?: string;
  lastVerified: string;
  status: SourceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LegalSection {
  id: string;
  legalSourceId: string;
  legalSource?: LegalSource;
  reference: string;
  title: string;
  legalText: string;
  parentSectionId?: string;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SituationLegalSection {
  id: string;
  situationId: string;
  legalSectionId: string;
  legalSection?: LegalSection;
  relevance?: string;
  priority: number;
}

export interface Explanation {
  id: string;
  situationId: string;
  language: Language;
  summary: string;
  explanation: string;
  whatThisMeans: string;
  limitations: string;
  generatedBy: string;
  reviewStatus: ReviewStatus;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Action {
  id: string;
  situationId: string;
  stepNumber: number;
  title: string;
  description: string;
  warning?: string;
}

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  description: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  sourceUrl?: string;
  verifiedAt?: string;
  isActive: boolean;
}

export interface SavedItem {
  id: string;
  deviceId: string;
  situationId: string;
  situation?: Situation;
  createdAt: string;
}

// ─── API Response Wrappers ────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  success: true;
}

export interface ApiError {
  success: false;
  error: string;
  code?: string;
}

// ─── Search ───────────────────────────────────────────────────────────────────

export interface SearchResult {
  situation: Situation;
  confidence: number;
  matchedKeywords: string[];
}

export interface ClassifyResponse {
  matched: SearchResult | null;
  alternatives: SearchResult[];
  hasVerifiedInfo: boolean;
}

// ─── Situation Detail (full page data) ───────────────────────────────────────

export interface SituationDetail extends Situation {
  explanation?: Explanation;
  legalSections: (SituationLegalSection & { legalSection: LegalSection & { legalSource: LegalSource } })[];
  actions: Action[];
}
