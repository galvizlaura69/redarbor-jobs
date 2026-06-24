import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import Toast from 'react-native-toast-message';


export default function RootLayout() {
  const hydrate = useFavoritesStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="job/[id]"
          options={{
            title: 'Job Detail',
            headerBackTitle: 'Back',
            headerTintColor: '#4F46E5',
            headerTitleStyle: {
              fontWeight: '600',
              color: '#1F2937',
            },
          }}
        />
      </Stack>
      <Toast />
    </>
  );
}