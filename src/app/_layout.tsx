import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />

      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="sprint"
          options={{ title: 'Start a Sprint' }}
        />
        <Stack.Screen
          name="timer"
          options={{ title: 'Focus' }}
        />
        <Stack.Screen
          name="complete"
          options={{ title: 'Complete' }}
        />
      </Stack>
    </ThemeProvider>
  );
}