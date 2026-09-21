import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '../components/BackButton';

const steps = [
  'Understand your right and read the relevant legal provision.',
  'Keep relevant information such as dates, names, documents, and receipts.',
  'Identify the correct institution or support office for help.',
  'Seek professional help if necessary for a legally specific issue.',
];

export default function WhatCanIDoNextScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <BackButton />
        <Text style={styles.title}>What can I do next?</Text>
        {steps.map((step, index) => (
          <View key={step} style={styles.stepCard}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F6F2' },
  container: { padding: 20, gap: 16 },
  title: { fontSize: 28, fontWeight: '700', color: '#0F172A' },
  stepCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    color: '#0F766E',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '700',
  },
  stepText: { flex: 1, color: '#334155', fontSize: 15, lineHeight: 22 },
});
