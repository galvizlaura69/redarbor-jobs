import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { useFavoritesStore } from '@/store/useFavoritesStore';
import { colors } from '@/theme/colors';

export default function RootLayout() {
  const hydrate = useFavoritesStore((s) => s.hydrate);

    const [fontsLoaded] = useFonts({
    ...Ionicons.font, 
  });

  useEffect(() => {
    hydrate();
  }, []);

    if (!fontsLoaded) return null; 


  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="job/[id]"
          options={{
            title: 'Detalle de empleo',
            headerBackTitle: 'Atrás',
            headerTintColor: colors.primary,
            headerTitleStyle: {
              fontWeight: '600',
              color: colors.gray800,
            },
          }}
        />
      </Stack>
      <Toast />
    </>
  );
}
