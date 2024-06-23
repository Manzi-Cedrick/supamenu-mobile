import '../global.css';
import { useColorScheme } from '../components/hooks/useColorScheme.web';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Slot, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '@/components/hooks/store/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { NativeWindStyleSheet } from 'nativewind';
import { getDecryptToken, getUserInfoData } from '@/proxy/local-storage';
import { View } from 'react-native';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tab)',
};

// For Web platform
NativeWindStyleSheet.setOutput({
  default: 'native',
})

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Poppins-Italic': require('../assets/fonts/Poppins-Italic.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { setUser, setToken } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);


  useEffect(() => {
    const initializeAuthState = async () => {
      try {
        const token = await getDecryptToken();
        const storedUser = await getUserInfoData();
        if (token && storedUser) {
          setUser(JSON.parse(storedUser));
          setToken(token);
          setInitialRoute('/(home)/(tabs)/');
        } else {
          setInitialRoute('/(auth)/login');
        }
      } finally {
        setAuthChecked(true);
        await SplashScreen.hideAsync();
      }
    };

    initializeAuthState();
  }, []);

  useEffect(() => {
    if (authChecked && initialRoute) {
      router.push(initialRoute);
    }
  }, [authChecked, initialRoute]);

  if (!authChecked) {
    return (
      <View className='bg-white flex flex-1'>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />
        <Slot />
        <Toast />
      </ThemeProvider>
    </PaperProvider>
  );
}
