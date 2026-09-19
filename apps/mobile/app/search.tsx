import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const suggestedMatches = [
  'Police want to search me',
  "I've been arrested",
  "I'm being detained",
  'Someone is claiming my land',
];

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Search</Text>
        <View style={styles.searchWrap}>
          <TextInput
            placeholder="What’s happening?"
            placeholderTextColor="#64748B"
            style={styles.searchInput}
            value="Police want to search my house."
            editable={true}
          />
        </View>

        <Text style={styles.sectionTitle}>Closest matches</Text>
        {suggestedMatches.map((match) => (
          <Link key={match} href="/situation/police-want-to-search-me" asChild>
            <Pressable style={styles.matchCard}>
              <Text style={styles.matchText}>{match}</Text>
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
  matchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
  },
  matchText: { color: '#0F172A', fontSize: 15, fontWeight: '600' },
});
