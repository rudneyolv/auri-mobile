import '@/global.css';
import { NAV_THEME } from '@/styles/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { Toaster } from 'sonner-native';

import {
  useFonts,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import { Text } from '@/common/components/ui/text';
import { EventsSocketProvider } from '@/modules/event/socket/socket-provider';
import { MessagesSync } from '@/modules/message/components/messages-sync';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const queryClient = new QueryClient();

  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_700Bold,
  });

  if (!fontsLoaded) return <Text>Loading</Text>;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <QueryClientProvider client={queryClient}>
          <KeyboardProvider>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <EventsSocketProvider>
              <MessagesSync />
              <Stack
                screenOptions={{
                  headerShadowVisible: false,
                  // 1. No modo Edge-to-Edge do KeyboardProvider, o header
                  // PRECISA ser marcado como translúcido para o Native Stack calcular o padding.
                  statusBarTranslucent: true,

                  // 2. Força o preenchimento superior. O TS pode reclamar, use o ignore
                  // porque essa prop existe no nativo (react-native-screens).
                  // @ts-ignore
                  headerTopInsetEnabled: true,
                  headerShown: false,
                }}
              />
            </EventsSocketProvider>
            <PortalHost />
            <Toaster />
          </KeyboardProvider>
        </QueryClientProvider>
      </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
