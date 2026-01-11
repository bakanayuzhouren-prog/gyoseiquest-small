import { Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
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
      <Pressable style={styles.menuButton}>
        <ThemedText type="defaultSemiBold" style={styles.menuText}>
          ③質問する
        </ThemedText>
      </Pressable>
      <Pressable style={styles.menuButton}>
        <ThemedText type="defaultSemiBold" style={styles.menuText}>
          ④図解とインプット
        </ThemedText>
      </Pressable>
      <Pressable style={styles.menuButton}>
        <ThemedText type="defaultSemiBold" style={styles.menuText}>
          ⑤全国ランキング
        </ThemedText>
      </Pressable>
      <Pressable style={styles.menuButton}>
        <ThemedText type="defaultSemiBold" style={styles.menuText}>
          ⑥アバター
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
    gap: 16,
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
