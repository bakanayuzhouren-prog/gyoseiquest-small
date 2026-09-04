import { Link } from 'expo-router';
import type { Href } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';

export default function HomeScreen() {
  const { theme, colors } = useTheme();
  const isRouhou = theme === 'rouhou';

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

  const chokkiButtonStyle = StyleSheet.flatten([
    buttonStyle,
    {
      backgroundColor: isRouhou ? '#F3E8D4' : colors.accent,
      borderColor: colors.primary,
      borderWidth: 2,
    },
  ]);
  const chokkiTextStyle = StyleSheet.flatten([
    styles.menuText,
    { color: isRouhou ? colors.primary : '#FFFFFF' },
  ]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.contentContainer}>
        <ThemedText
          type="title"
          style={isRouhou ? { color: colors.primary, letterSpacing: 1.4 } : undefined}
        >
          メインメニュー
        </ThemedText>
        <ThemedText style={[styles.subtitle, isRouhou && { color: colors.subText, letterSpacing: 0.6 }]}>
          機能を選択してください。
        </ThemedText>
        <Link href={'/chokki' as Href} asChild>
          <Pressable style={chokkiButtonStyle}>
            <ThemedText type="defaultSemiBold" style={chokkiTextStyle}>
              直前期はこれ！
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/learn" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ①見て聞いて覚えるモード
            </ThemedText>
          </Pressable>
        </Link>
        <Link href={'/learn?menu=plus' as Href} asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ②見て聞いて覚えるモードぷらす
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/subjects" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ③問題を解くモード
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/wrong-answers" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ④誤答問題リスト
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/chat" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ⑤質問する
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/pin" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ⑥ピンと図
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/statutes" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ⑦条文
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/ranking" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ⑧全国ランキング
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/avatar" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ⑨アバター
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/meta" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ⑩メタ空間
            </ThemedText>
          </Pressable>
        </Link>
        <Link href={'/textbook' as Href} asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ⑪教科書
            </ThemedText>
          </Pressable>
        </Link>
        <Link href={'/textbook/kimi' as Href} asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ⑫君の教科書！
            </ThemedText>
          </Pressable>
        </Link>
        <Link href={'/moshi-input' as Href} asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ⑬模試完全インプット
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/settings" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ⑭設定
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/shisho" asChild>
          <Pressable style={buttonStyle}>
            <ThemedText type="defaultSemiBold" style={getMenuTextStyle(styles.menuText)}>
              ⑮ 🎓師匠モード（弟子に論点を教える）
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
