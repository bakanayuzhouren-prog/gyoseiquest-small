import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';
import { findQuizQuestionIndexByTextHash } from '@/utils/quiz-resolve-index';
import { getAllWrongQuestionEntries, type WrongQuestionListEntry } from '@/utils/question-stats';

export default function WrongAnswersScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [entries, setEntries] = useState<WrongQuestionListEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [opening, setOpening] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getAllWrongQuestionEntries();
      setEntries(list);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const openQuestion = async (e: WrongQuestionListEntry) => {
    const key = `${e.subject}|${e.field}|${e.textHash}`;
    setOpening(key);
    try {
      const found = await findQuizQuestionIndexByTextHash(e.subject, e.field, e.textHash, 'past');
      if (!found) {
        Alert.alert(
          '問題が見つかりません',
          '非表示にした・シート更新で問題文が変わった・または出題対象外になった可能性があります。'
        );
        return;
      }
      router.push({
        pathname: '/question',
        params: {
          subject: e.subject,
          field: e.field,
          index: String(found.index),
          mode: found.mode,
        },
      });
    } finally {
      setOpening(null);
    }
  };

  const grouped = entries.reduce<Record<string, WrongQuestionListEntry[]>>((acc, e) => {
    const k = `${e.subject} / ${e.field}`;
    if (!acc[k]) acc[k] = [];
    acc[k].push(e);
    return acc;
  }, {});

  const groupKeys = Object.keys(grouped).sort();

  return (
    <>
      <Stack.Screen options={{ title: '誤答問題リスト', headerBackTitle: '戻る' }} />
      <ThemedView style={styles.container}>
        <ThemedText style={[styles.lead, { color: colors.subText }]}>
          「問題を解く」で不正解にした問題がここに溜まります。タップでその問題へ移動します。
        </ThemedText>
        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : entries.length === 0 ? (
          <ThemedText style={[styles.empty, { color: colors.subText }]}>
            まだ誤答の記録がありません。問題を解いて不正解になると表示されます。
          </ThemedText>
        ) : (
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator>
            {groupKeys.map((gk) => (
              <View key={gk} style={styles.group}>
                <ThemedText type="defaultSemiBold" style={[styles.groupTitle, { color: colors.text }]}>
                  {gk}
                </ThemedText>
                {grouped[gk]!.map((e) => {
                  const k = `${e.subject}|${e.field}|${e.textHash}`;
                  const busy = opening === k;
                  const badgeBg = e.wrong >= 2 ? '#D32F2F' : '#F9A825';
                  return (
                    <Pressable
                      key={k}
                      onPress={() => openQuestion(e)}
                      disabled={busy}
                      style={({ pressed }) => [
                        styles.card,
                        {
                          borderColor: colors.choiceBorder,
                          backgroundColor: colors.choiceBg,
                          opacity: pressed ? 0.85 : 1,
                        },
                      ]}
                    >
                      <View style={styles.cardTop}>
                        <View style={[styles.badge, { backgroundColor: badgeBg }]}>
                          <ThemedText style={styles.badgeText}>誤答 {e.wrong}回</ThemedText>
                        </View>
                        {e.correct > 0 ? (
                          <ThemedText style={[styles.meta, { color: colors.subText }]}>
                            正解 {e.correct}回
                          </ThemedText>
                        ) : null}
                        {busy ? <ActivityIndicator size="small" color={colors.primary} /> : null}
                      </View>
                      <ThemedText style={[styles.preview, { color: colors.text }]} numberOfLines={5}>
                        {e.previewText}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </ScrollView>
        )}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  lead: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  centered: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  empty: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 24,
  },
  scroll: {
    paddingBottom: 32,
    gap: 20,
  },
  group: {
    gap: 10,
  },
  groupTitle: {
    fontSize: 15,
    marginBottom: 4,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  meta: {
    fontSize: 12,
    flex: 1,
  },
  preview: {
    fontSize: 15,
    lineHeight: 22,
  },
});
