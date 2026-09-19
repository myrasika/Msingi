import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HelpScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Help & Resources</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Find legal help</Text>
          <Text style={styles.body}>Kenya National Commission on Human Rights (KNCHR)</Text>
          <Text style={styles.body}>National Legal Aid Service (NLAS)</Text>
          <Text style={styles.body}>Law Society of Kenya (LSK)</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important</Text>
          <Text style={styles.body}>Msingi provides civic and legal information for educational purposes. It does not provide legal representation.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F6F2' },
  container: { padding: 20, gap: 16 },
  title: { fontSize: 28, fontWeight: '700', color: '#0F172A' },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
  body: { color: '#475569', fontSize: 15, lineHeight: 22, marginBottom: 4 },
});
