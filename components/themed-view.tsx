import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { useTheme } from '@/src/context/ThemeContext';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const { theme } = useTheme();

  if (theme === 'premium') {
    return (
      <LinearGradient
        colors={['#0F172A', '#1E293B']} // Deep Navy Gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.flatten([{ flex: 1 }, style])}
        {...otherProps}
      >
        {/* Gradient wrapper */}
      </LinearGradient>
    );
  }

  if (theme === 'cyberpunk') {
    return (
      <LinearGradient
        colors={['#0d0221', '#1a0a2e', '#0d0221']} // ダークパープル〜ネオン基調
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.flatten([{ flex: 1 }, style])}
        {...otherProps}
      >
        {/* Cyberpunk gradient */}
      </LinearGradient>
    );
  }

  return <View style={StyleSheet.flatten([{ backgroundColor }, style])} {...otherProps} />;
}
