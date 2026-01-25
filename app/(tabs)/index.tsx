import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ThemedText type="title">メインメニュー</ThemedText>
      <ThemedText style={styles.subtitle}>機能を選択してください。</ThemedText>
      <Link href="/learn" asChild>
        <Pressable style={styles.menuButton}>
          <ThemedText type="defaultSemiBold" style={styles.menuText}>
            ①見て聞いて覚える
          </ThemedText>
        </Pressable>
      </Link>
      <Link href="/subjects" asChild>
        <Pressable style={styles.menuButton}>
          <ThemedText type="defaultSemiBold" style={styles.menuText}>
            ②問題を解く
          </ThemedText>
        </Pressable>
      </Link>
      <Link href="/chat" asChild>
        <Pressable style={styles.menuButton}>
          <ThemedText type="defaultSemiBold" style={styles.menuText}>
            ③質問する
          </ThemedText>
        </Pressable>
      </Link>
      <Link href="/pin" asChild>
        <Pressable style={styles.menuButton}>
          <ThemedView style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' }}>
            <ThemedText type="defaultSemiBold" style={styles.menuText}>
              ④ピン
            </ThemedText>
            <ThemedView style={{ position: 'relative', backgroundColor: 'transparent' }}>
              <ThemedText style={{ position: 'absolute', top: -12, left: 0, right: 0, textAlign: 'center', fontSize: 10, lineHeight: 12 }}>
                と
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.menuText}>
                図
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </Pressable>
      </Link>
      <Link href="/statutes" asChild>
        <Pressable style={styles.menuButton}>
          <ThemedText type="defaultSemiBold" style={styles.menuText}>
            ⑤条文
          </ThemedText>
        </Pressable>
      </Link>
      <Link href="/ranking" asChild>
        <Pressable style={styles.menuButton}>
          <ThemedText type="defaultSemiBold" style={styles.menuText}>
            ⑥全国ランキング
          </ThemedText>
        </Pressable>
      </Link>
      <Link href="/avatar" asChild>
        <Pressable style={styles.menuButton}>
          <ThemedText type="defaultSemiBold" style={styles.menuText}>
            ⑦アバター
          </ThemedText>
        </Pressable>
      </Link>
      {/* ScrollView needs bottom padding to ensure the last item is not covered by tab bar if transparent, 
          but usually contentContainerStyle padding is enough. Adding some extra space at bottom. */}
      <ThemedView style={{ height: 40, backgroundColor: 'transparent' }} />
    </ScrollView>
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
    borderColor: '#5A9BD5',
    backgroundColor: '#E9F2FB',
  },
  menuText: {
    fontSize: 18,
  },
});
