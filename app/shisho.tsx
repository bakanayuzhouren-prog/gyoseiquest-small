import { Link, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';

export default function ShishoModeScreen() {
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: '師匠モード', headerBackTitle: '戻る' }} />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <ThemedText type="title">🎓 師匠モード</ThemedText>
          <ThemedText style={[styles.lead, { color: colors.text }]}>
            アプリ上の弟子（学習の相棒）に、論点を教えるつもりで学びます。正解を当てるより、「何が争点か」「なぜそうなるか」を声に出して説明することを優先してください。説明の筋道がつくほど、長期記憶に乗りやすくなります。
          </ThemedText>
          <ThemedText style={[styles.bullet, { color: colors.subText }]}>
            ・このモードでは、正答率・誤答リスト・周回ボーナスには反映しません（試験モードと切り分け）。
          </ThemedText>
          <ThemedText style={[styles.bullet, { color: colors.subText }]}>
            ・出題内容は「過去問」と同じ問題プールです。ステージ選択の「③ 師匠モード」からも入れます。
          </ThemedText>
          <Link href="/subjects" asChild>
            <Pressable
              style={StyleSheet.flatten([
                styles.cta,
                { backgroundColor: colors.primary, borderColor: colors.primary },
              ])}
            >
              <ThemedText type="defaultSemiBold" style={styles.ctaText}>
                科目を選んで始める
              </ThemedText>
            </Pressable>
          </Link>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    gap: 14,
  },
  lead: {
    fontSize: 16,
    lineHeight: 26,
    marginTop: 4,
  },
  bullet: {
    fontSize: 14,
    lineHeight: 22,
    paddingLeft: 4,
  },
  cta: {
    marginTop: 20,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  ctaText: {
    color: '#fff',
    fontSize: 17,
  },
});
