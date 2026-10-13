import { Stack, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { GenreLineChart } from '@/components/genre-line-chart';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';
import { loadGenreSeries, type GenreSeries } from '@/utils/genre-eval';

export default function GenreEvalScreen() {
  const { colors } = useTheme();
  const [rows, setRows] = useState<GenreSeries[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadGenreSeries().then(setRows);
    }, []),
  );

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'ジャンル評価' }} />
      <ThemedText type="title">ジャンル評価</ThemedText>
      <ThemedText style={styles.lead}>
        過去問、ボーナス、ここまでの全問題の解答から、ジャンルごとの正答率を縦に積んでいます。線は古い回から新しい回です。上の薄い線が100、下の薄い線が0です。
      </ThemedText>
      <ScrollView contentContainerStyle={styles.list}>
        {rows.map((row) => (
          <View key={row.genre} style={[styles.card, { borderColor: colors.choiceBorder, backgroundColor: colors.card }]}>
            <View style={styles.head}>
              <ThemedText style={styles.name}>{row.genre}</ThemedText>
              <ThemedText style={[styles.rate, { color: colors.primary }]}>
                {row.rate == null ? '未測定' : `${row.rate}%`}
              </ThemedText>
            </View>
            <ThemedText style={[styles.meta, { color: colors.subText }]}>
              {row.attempts === 0 ? 'まだ解答がない' : `${row.correct}/${row.attempts}問`}
            </ThemedText>
            <GenreLineChart points={row.points} color={colors.primary} />
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
    gap: 12,
  },
  lead: {
    opacity: 0.75,
    lineHeight: 22,
  },
  list: {
    gap: 12,
    paddingBottom: 40,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  rate: {
    fontSize: 18,
    fontWeight: '800',
  },
  meta: {
    fontSize: 12,
  },
});
