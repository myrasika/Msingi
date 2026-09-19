import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADIUS } from '../../theme';

export default function OnboardingScreen() {
  const router = useRouter();

  const finishOnboarding = async () => {
    await AsyncStorage.setItem('msingi-onboarding-complete', 'true');
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>Msingi</Text>
        <Text style={styles.title}>Know your rights. In plain language.</Text>
        <Text style={styles.subtitle}>
          Understand what the Kenyan Constitution and relevant laws say about everyday situations.
        </Text>

        <View style={styles.languageRow}>
          <Pressable style={[styles.languageButton, styles.languageButtonActive]}>
            <Text style={styles.languageText}>English</Text>
          </Pressable>
          <Pressable style={styles.languageButton}>
            <Text style={styles.languageTextMuted}>Kiswahili</Text>
          </Pressable>
        </View>

        <Pressable style={styles.primaryButton} onPress={finishOnboarding}>
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </Pressable>

        <Link href="/(tabs)" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Skip</Text>
          </Pressable>
        </Link>

        <View style={styles.disclaimerCard}>
          <Text style={styles.disclaimer}>
            Msingi provides civic and legal information for educational purposes. It is not a substitute for a lawyer or personalised legal representation.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: COLORS.background,
  },
  eyebrow: {
    color: COLORS.primaryDark,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  title: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textMuted,
    marginBottom: 28,
  },
  languageRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  languageButton: {
    flex: 1,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  languageButtonActive: {
    borderColor: COLORS.primarySoft,
    backgroundColor: COLORS.surfaceMuted,
  },
  languageText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  languageTextMuted: {
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    borderRadius: RADIUS.md,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  secondaryButtonText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  disclaimerCard: {
    marginTop: 28,
    backgroundColor: COLORS.surfaceSoft,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
  },
  disclaimer: {
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.textMuted,
  },
});
