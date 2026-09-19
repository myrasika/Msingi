import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LegalSourceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Original law</Text>
        <Text style={styles.source}>Constitution of Kenya, 2010</Text>
        <Text style={styles.reference}>Article 49</Text>
        <Text style={styles.body}>
          {[VERIFIED LEGAL TEXT TO BE INSERTED]}
        </Text>

        <View style={styles.metaSection}>
          <Text style={styles.metaLabel}>Official source</Text>
          <Text style={styles.metaValue}>Kenya Law / Constitution</Text>
          <Text style={styles.metaLabel}>Last verified</Text>
          <Text style={styles.metaValue}>01 January 2025</Text>
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
