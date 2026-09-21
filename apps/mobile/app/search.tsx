import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '../components/BackButton';
import { searchSituations } from '../services/api';
import type { ApiSituation } from '../services/api';

type SearchCard = {
  situation: ApiSituation;
  confidence: number;
  matchedKeywords: string[];
};

export default function SearchScreen() {
  const { query: initialQuery } = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(initialQuery ?? '');
  const [matches, setMatches] = useState<SearchCard[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const runSearch = async () => {
      if (!query.trim()) {
        setMatches([]);
        return;
      }

      try {
        setLoading(true);
        const result = await searchSituations(query);
        const next = result.matched ? [
          {
            situation: result.matched.situation,
            confidence: result.matched.confidence,
            matchedKeywords: result.matched.matchedKeywords,
          },
          ...result.alternatives,
        ] : result.alternatives;

        setMatches(next);
      } catch (error) {
        console.warn('Search failed', error);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(runSearch, 250);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <BackButton />
        <Text style={styles.title}>Search</Text>
        <View style={styles.searchWrap}>
          <TextInput
            placeholder="What’s happening?"
            placeholderTextColor="#64748B"
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            editable={true}
          />
        </View>

        {loading ? <ActivityIndicator size="small" color="#013428" /> : null}

        <Text style={styles.sectionTitle}>Closest matches</Text>
        {matches.length === 0 && !loading ? <Text style={styles.emptyText}>No verified matching situation found yet.</Text> : null}

        {matches.map((match) => (
          <Link key={match.situation.id} href={`/situation/${match.situation.slug}`} asChild>
            <Pressable style={styles.matchCard}>
              <Text style={styles.matchText}>{match.situation.title}</Text>
              <Text style={styles.matchMeta}>{match.matchedKeywords.join(', ') || 'Relevant match'}</Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F6F2' },
  container: { padding: 20, gap: 16 },
  title: { fontSize: 28, fontWeight: '700', color: '#0F172A' },
  searchWrap: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchInput: { fontSize: 17, color: '#0F172A' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  emptyText: { color: '#475569', fontSize: 14 },
  matchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
  },
  matchText: { color: '#0F172A', fontSize: 15, fontWeight: '600' },
  matchMeta: { color: '#475569', fontSize: 12, marginTop: 6 },
});
