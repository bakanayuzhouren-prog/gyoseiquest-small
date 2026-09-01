import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { CharacterProvider } from '@/src/context/CharacterContext';
import { DescriptiveScopeProvider } from '@/src/context/DescriptiveScopeContext';
import { LearnPlaybackProvider } from '@/src/context/LearnPlaybackContext';
import { StudyLevelProvider } from '@/src/context/StudyLevelContext';
import { ThemeProvider as CustomThemeProvider } from '@/src/context/ThemeContext';
import { UserProvider } from '@/src/context/UserContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (Platform.OS === 'web') {
      const user = localStorage.getItem('gq_user');
      const inAuthGroup = segments[0] === 'login';

      if (!user && !inAuthGroup) {
        // Redirect to login if not authenticated
        // Use timeout to allow navigation to mount
        setTimeout(() => router.replace('/login'), 100);
      } else if (user && inAuthGroup) {
        // Redirect to home if already authenticated
        router.replace('/');
      }
    }
  }, [segments]);

  return (
    <CustomThemeProvider>
      <UserProvider>
        <StudyLevelProvider>
        <DescriptiveScopeProvider>
        <CharacterProvider>
          <LearnPlaybackProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack
              /* 非アクティブで学習画面がdetachされると読み上げeffectのクリーンアップで Speech.stop され、深掘りから戻っても音声・3回カウントが途切れる */
              screenOptions={{ detachInactiveScreens: false } as object}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
              <Stack.Screen name="settings" options={{ presentation: 'modal', title: '設定' }} />
              <Stack.Screen name="avatar" options={{ headerShown: false }} />
              <Stack.Screen name="avatar-customize" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
          </LearnPlaybackProvider>
        </CharacterProvider>
        </DescriptiveScopeProvider>
        </StudyLevelProvider>
      </UserProvider>
    </CustomThemeProvider>
  );
}
