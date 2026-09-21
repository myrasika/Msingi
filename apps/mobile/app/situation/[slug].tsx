import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import * as Speech from 'expo-speech';
import { ActivityIndicator, ScrollView, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '../../components/BackButton';
import { fetchSavedSituations, fetchSituationBySlug, saveSituation, deleteSavedSituation } from '../../services/api';
import type { ApiSituation } from '../../services/api';
import { getSituationBySlug } from '../../services/mockData';

export default function SituationScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [situation, setSituation] = useState<ApiSituation | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;

      try {
        const data = await fetchSituationBySlug(String(slug));
        setSituation(data);

        const savedItems = await fetchSavedSituations();
        setSaved(savedItems.some((entry) => entry.situation.slug === String(slug)));
      } catch (error) {
        console.warn('Failed to load situation', error);
        setSituation(getSituationBySlug(String(slug)));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  const toggleSaved = async () => {
    if (!situation) return;

    try {
      if (saved) {
        await deleteSavedSituation(situation.id);
        setSaved(false);
      } else {
        await saveSituation(situation.id);
        setSaved(true);
      }
    } catch (error) {
      console.warn('Failed to update saved state', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}><ActivityIndicator size="small" color="#013428" /></View>
      </SafeAreaView>
    );
  }

  if (!situation) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}><Text>Situation not found.</Text></View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <BackButton />
        <Text style={styles.badge}>You have rights</Text>
        <Text style={styles.title}>{situation.title}</Text>
        <Text style={styles.overview}>The Constitution protects your rights when you are dealing with this situation. Here is what you need to know.</Text>

        <Pressable style={saved ? styles.savedButton : styles.saveButton} onPress={toggleSaved}>
          <Text style={saved ? styles.savedButtonText : styles.saveButtonText}>{saved ? 'Saved' : 'Save this situation'}</Text>
        </Pressable>

        {situation.explanation && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>In simple language</Text>
            <Text style={styles.body}>{situation.explanation.explanation}</Text>
            <Text style={styles.subheader}>What this means</Text>
            <Text style={styles.body}>{situation.explanation.whatThisMeans}</Text>
            <Text style={styles.subheader}>Important limitations</Text>
            <Text style={styles.body}>{situation.explanation.limitations}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What does the law say?</Text>
          {situation.legalSections.map((section) => (
            <View key={section.id} style={styles.sourceBox}>
              <Text style={styles.sourceHeader}>{section.reference}</Text>
              <Text style={styles.sourceTitle}>{section.title}</Text>
              <Text style={styles.body}>{section.legalText || 'Legal text is not yet populated in the database.'}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What can I do next?</Text>
          {situation.actions.map((action) => (
            <View key={action.id} style={styles.actionItem}>
              <Text style={styles.stepNumber}>{action.stepNumber}.</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <Pressable
          style={styles.primaryButton}
          onPress={() => {
            const explanation = situation.explanation?.explanation ?? '';
            const sourceText = situation.legalSections.map((section) => section.legalText).join(' ');
            Speech.stop();
            Speech.speak(`${situation.title}. ${explanation} ${sourceText}`, { language: 'en-KE' });
          }}
          accessibilityRole="button"
          accessibilityLabel="Read this guidance aloud"
        >
          <Text style={styles.primaryButtonText}>Read aloud</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F6F2' },
  container: { padding: 20, gap: 16, paddingBottom: 40 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECFDF5',
    color: '#0F766E',
    fontWeight: '700',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 12,
  },
  title: { fontSize: 30, fontWeight: '700', color: '#0F172A', marginTop: 4 },
  overview: { fontSize: 15, color: '#475569', lineHeight: 22 },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
  },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A', marginBottom: 10 },
  subheader: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginTop: 12, marginBottom: 4 },
  body: { fontSize: 15, lineHeight: 22, color: '#334155' },
  sourceBox: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  sourceHeader: { fontSize: 13, fontWeight: '700', color: '#0F766E', marginBottom: 4 },
  sourceTitle: { fontSize: 17, fontWeight: '600', color: '#0F172A', marginBottom: 6 },
  actionItem: { flexDirection: 'row', gap: 12, marginTop: 10 },
  stepNumber: { fontSize: 16, fontWeight: '700', color: '#0F766E', marginTop: 2 },
  actionTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  actionDescription: { fontSize: 14, lineHeight: 20, color: '#475569', marginTop: 4 },
  saveButton: {
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C7E7D5',
    paddingVertical: 10,
    alignItems: 'center',
  },
  savedButton: {
    backgroundColor: '#013428',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  saveButtonText: { color: '#013428', fontWeight: '700' },
  savedButtonText: { color: '#FFFFFF', fontWeight: '700' },
  primaryButton: {
    backgroundColor: '#0F766E',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
