import { LinearGradient } from 'expo-linear-gradient';
import { View, type ViewProps } from 'react-native';

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
        style={[{ flex: 1 }, style]} // Ensure gradient fills if flex is used
        {...otherProps}
      >
        {/* Gradient wrapper behaves like a View but with gradient bg */}
      </LinearGradient>
    );
  }

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
