import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  error?: string;
};

export type ApiCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  situations?: ApiSituation[];
};

export type ApiAction = {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  warning?: string | null;
};

export type ApiLegalSource = {
  id: string;
  title: string;
  sourceType: string;
  officialUrl: string;
  version?: string;
  effectiveDate?: string;
  lastVerified?: string;
  status?: string;
};

export type ApiLegalSection = {
  id: string;
  reference: string;
  title: string;
  legalText: string;
  keywords: string[];
  legalSource?: ApiLegalSource;
  legalSourceId?: string;
};

export type ApiExplanation = {
  summary: string;
  explanation: string;
  whatThisMeans: string;
  limitations: string;
};

export type ApiSituation = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category?: ApiCategory;
  categoryId: string;
  searchKeywords: string[];
  actions: ApiAction[];
  legalSections: ApiLegalSection[];
  explanations?: ApiExplanation[];
  explanation?: ApiExplanation;
};

export type SearchResult = {
  matched: null | {
    situation: ApiSituation;
    confidence: number;
    matchedKeywords: string[];
  };
  alternatives: Array<{
    situation: ApiSituation;
    confidence: number;
    matchedKeywords: string[];
  }>;
  hasVerifiedInfo: boolean;
};

export const DEVICE_ID_KEY = 'msingi-device-id';

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? (Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://127.0.0.1:3000');

export async function getOrCreateDeviceId() {
  const existing = await AsyncStorage.getItem(DEVICE_ID_KEY);
  if (existing) return existing;

  const nextId = `device-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  await AsyncStorage.setItem(DEVICE_ID_KEY, nextId);
  return nextId;
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.error ?? `Request failed for ${path}: ${response.status}`);
  }

  return payload as T;
}

export async function fetchCategories() {
  const response = await fetchJson<ApiEnvelope<ApiCategory[]>>('/api/categories');
  return response.data;
}

export async function fetchCategoryBySlug(slug: string) {
  const response = await fetchJson<ApiEnvelope<ApiCategory>>(`/api/categories/${slug}`);
  return response.data;
}

export async function fetchSituationBySlug(slug: string) {
  const response = await fetchJson<ApiEnvelope<ApiSituation>>(`/api/situations/${slug}`);
  return response.data;
}

export async function searchSituations(query: string) {
  const response = await fetchJson<ApiEnvelope<SearchResult>>(`/api/search?q=${encodeURIComponent(query)}`);
  return response.data;
}

export async function fetchSavedSituations() {
  const deviceId = await getOrCreateDeviceId();
  const response = await fetchJson<ApiEnvelope<Array<{ id: string; situation: ApiSituation }>>>(`/api/saved?deviceId=${encodeURIComponent(deviceId)}`);
  return response.data;
}

export async function saveSituation(situationId: string) {
  const deviceId = await getOrCreateDeviceId();
  const response = await fetchJson<ApiEnvelope<{ id: string }>>('/api/saved', {
    method: 'POST',
    body: JSON.stringify({ deviceId, situationId }),
  });
  return response.data;
}

export async function deleteSavedSituation(situationId: string) {
  const deviceId = await getOrCreateDeviceId();
  await fetchJson<ApiEnvelope<null>>('/api/saved', {
    method: 'DELETE',
    body: JSON.stringify({ deviceId, situationId }),
  });
}

export async function fetchLegalSource(sourceId: string) {
  const response = await fetchJson<ApiEnvelope<{ id: string; title: string; officialUrl: string; sections: ApiLegalSection[] }>>(`/api/legal-sources/${sourceId}`);
  return response.data;
}
