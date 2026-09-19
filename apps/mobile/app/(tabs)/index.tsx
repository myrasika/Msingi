import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../../theme';

const categories = [
  { name: 'Police & Arrests', slug: 'police-arrests', emoji: '🚔' },
  { name: 'Land & Property', slug: 'land-property', emoji: '🏠' },
  { name: 'Work & Labour', slug: 'work-labour', emoji: '💼' },
  { name: 'Business & Traders', slug: 'business-traders', emoji: '🛍️' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.brand}>Msingi</Text>
          <View style={styles.headerActions}>
            <Text style={styles.languagePill}>English</Text>
            <Pressable accessibilityLabel="Read aloud" style={styles.audioButton}>
              <Ionicons name="volume-medium-outline" size={18} color={COLORS.text} />
            </Pressable>
          </View>
        </View>

        <Text style={styles.title}>Know your rights. In plain language.</Text>
        <Text style={styles.subtitle}>Understand what the law says about everyday situations.</Text>

        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={18} color={COLORS.textMuted} style={styles.searchIcon} />
            <TextInput
            placeholder="What’s happening?"
            placeholderTextColor={COLORS.textMuted}
            style={styles.searchInput}
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
              onSubmitEditing={() => {
                if (query.trim()) router.push(`/search?query=${encodeURIComponent(query.trim())}`);
              }}
          />
        </View>

        <Text style={styles.sectionTitle}>What are you dealing with?</Text>

        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`} asChild>
              <Pressable style={styles.categoryCard}>
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  brand: { fontSize: 28, fontWeight: '700', color: COLORS.text },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  languagePill: {
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  audioButton: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textMuted,
    marginBottom: 20,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: COLORS.text },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 14 },
  categoryGrid: { gap: 12 },
  categoryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryEmoji: { fontSize: 28, marginRight: 14 },
  categoryName: { fontSize: 17, color: COLORS.text, fontWeight: '600' },
});
