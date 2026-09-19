import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchLegalSource } from '../../services/api';

type LegalSourceScreenData = {
  id: string;
  title: string;
  officialUrl: string;
  sections: Array<{
    id: string;
    reference: string;
    title: string;
    legalText: string;
  }>;
};

export default function LegalSourceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [source, setSource] = useState<LegalSourceScreenData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchLegalSource(String(id));
        setSource(data);
      } catch (error) {
        console.warn('Failed to load legal source', error);
        setSource(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}><ActivityIndicator size="small" color="#013428" /></View>
      </SafeAreaView>
    );
  }

  const section = source?.sections?.[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Original law</Text>
        <Text style={styles.source}>{source?.title ?? 'Source unavailable'}</Text>
        <Text style={styles.reference}>{section?.reference ?? 'Verified source unavailable'}</Text>
        <Text style={styles.body}>{section?.legalText ?? 'The verified legal source could not be loaded. Connect to the API and try again.'}</Text>

        <View style={styles.metaSection}>
          <Text style={styles.metaLabel}>Official source</Text>
          <Text style={styles.metaValue}>{source?.officialUrl ?? 'Unavailable'}</Text>
          <Text style={styles.metaLabel}>Last verified</Text>
          <Text style={styles.metaValue}>{source ? 'Verified source metadata' : 'Unavailable'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F6F2' },
  container: { padding: 20, gap: 14 },
  title: { fontSize: 28, fontWeight: '700', color: '#0F172A' },
  source: { fontSize: 17, fontWeight: '700', color: '#0F766E' },
  reference: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  body: { fontSize: 15, lineHeight: 24, color: '#334155', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  metaSection: { backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', padding: 16 },
  metaLabel: { fontSize: 12, fontWeight: '700', color: '#0F766E', marginTop: 6 },
  metaValue: { fontSize: 15, color: '#0F172A', marginTop: 4 },
});
