import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCategoryBySlug, getSituationBySlug, situationsByCategory } from '../../services/mockData';

export default function CategoryScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const category = getCategoryBySlug(slug ?? '');
  const situations = slug ? situationsByCategory[slug] ?? [] : [];

  if (!category) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}><Text>Category not found.</Text></View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>{category.icon} {category.name}</Text>
        <Text style={styles.title}>{category.name}</Text>
        <Text style={styles.description}>{category.description}</Text>

        {situations.map((situation) => (
          <Link key={situation.slug} href={`/situation/${situation.slug}`} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.cardTitle}>{situation.title}</Text>
              <Text style={styles.cardDescription}>{situation.description}</Text>
              <Text style={styles.arrow}>→</Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F6F2' },
  container: { padding: 20, gap: 14 },
  eyebrow: { fontSize: 14, fontWeight: '700', color: '#0F766E', textTransform: 'uppercase' },
  title: { fontSize: 30, fontWeight: '700', color: '#0F172A' },
  description: { fontSize: 15, lineHeight: 22, color: '#475569', marginBottom: 8 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#0F172A', flex: 1 },
  cardDescription: { fontSize: 13, color: '#64748B', marginTop: 4 },
  arrow: { fontSize: 26, color: '#0F766E', marginLeft: 10 },
});
