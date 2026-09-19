import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function IndexRoute() {
  const [ready, setReady] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem('msingi-onboarding-complete');
        setHasSeenOnboarding(value === 'true');
      } finally {
        setReady(true);
      }
    };

    checkOnboarding();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return hasSeenOnboarding ? <Redirect href="/(tabs)" /> : <Redirect href="/onboarding" />;
}
