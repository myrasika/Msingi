import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categories } from '../../services/mockData';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>Browse the verified civic guidance available in Msingi.</Text>

        {categories.map((category) => (
          <Link key={category.slug} href={`/category/${category.slug}`} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.icon}>{category.icon}</Text>
              <View style={styles.cardTextWrap}>
                <Text style={styles.cardTitle}>{category.name}</Text>
                <Text style={styles.cardDescription}>{category.description}</Text>
              </View>
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
  subtitle: { fontSize: 15, color: '#475569', marginBottom: 10 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: { fontSize: 28, marginRight: 12 },
  cardTextWrap: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  cardDescription: { fontSize: 14, color: '#475569', lineHeight: 20 },
});
