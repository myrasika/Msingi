import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { name: 'Police & Arrests', slug: 'police-arrests', emoji: '🚔' },
  { name: 'Land & Property', slug: 'land-property', emoji: '🏠' },
  { name: 'Work & Labour', slug: 'work-labour', emoji: '💼' },
  { name: 'Business & Traders', slug: 'business-traders', emoji: '🛍️' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.brand}>Msingi</Text>
          <View style={styles.headerActions}>
            <Text style={styles.languagePill}>English</Text>
            <Pressable accessibilityLabel="Read aloud" style={styles.audioButton}>
              <Ionicons name="volume-medium-outline" size={18} color="#0F172A" />
            </Pressable>
          </View>
        </View>

        <Text style={styles.title}>Know your rights. In plain language.</Text>
        <Text style={styles.subtitle}>Understand what the law says about everyday situations.</Text>

        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={18} color="#64748B" style={styles.searchIcon} />
          <TextInput
            placeholder="What’s happening?"
            placeholderTextColor="#64748B"
            style={styles.searchInput}
            value="Police want to search me"
            editable={true}
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
  safeArea: { flex: 1, backgroundColor: '#F7F6F2' },
  container: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  brand: { fontSize: 28, fontWeight: '700', color: '#0F172A' },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  languagePill: {
    backgroundColor: '#ECFDF5',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: '#0F766E',
    fontSize: 12,
    fontWeight: '600',
  },
  audioButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#475569',
    marginBottom: 20,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#0F172A' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginBottom: 14 },
  categoryGrid: { gap: 12 },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryEmoji: { fontSize: 28, marginRight: 14 },
  categoryName: { fontSize: 17, color: '#0F172A', fontWeight: '600' },
});
