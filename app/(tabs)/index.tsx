import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';

export default function HomeScreen() {
  const { colors } = useTheme();

  const buttonStyle = StyleSheet.flatten([
    styles.menuButton,
    {
      backgroundColor: colors.choiceBg,
      borderColor: colors.choiceBorder,
    }
  ]);

  const getMenuTextStyle = (baseStyle: any) => StyleSheet.flatten([
    baseStyle,
    { color: colors.choiceText }
  ]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.contentContainer}>
        <ThemedText type="title">メインメニュー</ThemedText>
        <ThemedText style={styles.subtitle}>機能を選択してください。</ThemedText>
        <Link href="/learn" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ①見て聞いて覚える
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/subjects" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ②問題を解く
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/chat" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ③質問する
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/pin" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ④ピンと図
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/statutes" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ⑤条文
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/ranking" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ⑥全国ランキング
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/avatar" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ⑦アバター
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/meta" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ⑧メタ空間
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/constitution" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ⑨憲法を学ぶ
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/settings" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ⑩設定
            </ThemedText>
          </Pressable>
        </Link>
        {/* ScrollView needs bottom padding to ensure the last item is not covered by tab bar if transparent, 
            but usually contentContainerStyle padding is enough. Adding some extra space at bottom. */}
        <ThemedView style={{ height: 40, backgroundColor: 'transparent' }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 48,
    gap: 16,
    paddingBottom: 40,
  },
  subtitle: {
    opacity: 0.7,
  },
  menuButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
  },
  menuText: {
    fontSize: 18,
  },
});
