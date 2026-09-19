import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { deleteSavedSituation, fetchSavedSituations } from '../../services/api';
import type { ApiSituation } from '../../services/api';

type SavedEntry = {
  id: string;
  situation: ApiSituation;
};

export default function SavedScreen() {
  const [items, setItems] = useState<SavedEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    try {
      setLoading(true);
      const saved = await fetchSavedSituations();
      setItems(saved);
    } catch (error) {
      console.warn('Failed to load saved items', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const handleRemove = async (situationId: string) => {
    try {
      await deleteSavedSituation(situationId);
      setItems((current) => current.filter((entry) => entry.situation.id !== situationId));
    } catch (error) {
      console.warn('Failed to remove saved item', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Saved</Text>
        <Text style={styles.subtitle}>Your saved situations will appear here.</Text>

        {loading ? <ActivityIndicator size="small" color="#013428" /> : null}

        {!loading && items.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No saved items yet.</Text>
          </View>
        ) : null}

        {items.map((entry) => (
          <View key={entry.id} style={styles.itemCard}>
            <Link href={`/situation/${entry.situation.slug}`} asChild>
              <Pressable style={styles.itemBody}>
                <Text style={styles.itemTitle}>{entry.situation.title}</Text>
                <Text style={styles.itemDescription}>{entry.situation.description}</Text>
              </Pressable>
            </Link>

            <Pressable style={styles.removeButton} onPress={() => handleRemove(entry.situation.id)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F6F2' },
  container: { padding: 20, gap: 12 },
  title: { fontSize: 28, fontWeight: '700', color: '#0F172A' },
  subtitle: { fontSize: 15, color: '#475569', marginVertical: 12 },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
    marginTop: 8,
  },
  emptyText: { color: '#334155', fontSize: 15 },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    gap: 8,
  },
  itemBody: {
    gap: 4,
  },
  itemTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A' },
  itemDescription: { fontSize: 14, color: '#475569', lineHeight: 20 },
  removeButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5F3F2',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  removeButtonText: { color: '#013428', fontWeight: '600', fontSize: 12 },
});
