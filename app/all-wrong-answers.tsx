import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';
import { getAllQuestionsWrongEntries, type AllQuestionsWrongEntry } from '@/utils/all-questions-wrongs';
import { findAllModeIndex } from '@/utils/allQuestionsSearch';

export default function AllWrongAnswersScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [entries, setEntries] = useState<AllQuestionsWrongEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [opening, setOpening] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setEntries(await getAllQuestionsWrongEntries());
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const openQuestion = async (entry: AllQuestionsWrongEntry) => {
    const key = `${entry.subject}|${entry.field}|${entry.textHash}`;
    setOpening(key);
    try {
      const index = await findAllModeIndex(entry.subject, entry.field, entry.textHash);
      if (index < 0) {
        Alert.alert('問題が見つかりません', '非表示にしたか、問題文が変わった可能性があります。');
        return;
      }
      router.push({
        pathname: '/question',
        params: {
          subject: entry.subject,
          field: entry.field,
          index: String(index),
          mode: 'all',
        },
      });
    } finally {
      setOpening(null);
    }
  };

  const grouped = entries.reduce<Record<string, AllQuestionsWrongEntry[]>>((acc, entry) => {
    const key = `${entry.subject} / ${entry.field}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(entry);
    return acc;
  }, {});

  return (
    <>
      <Stack.Screen options={{ title: 'ここまでの全問題の誤答', headerBackTitle: '戻る' }} />
      <ThemedView style={styles.container}>
        <ThemedText style={[styles.lead, { color: colors.subText }]}>
          ここまでの全問題で不正解にした問題だけです。タップすると、その問題へ戻ります。
        </ThemedText>
        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : entries.length === 0 ? (
          <ThemedText style={[styles.empty, { color: colors.subText }]}>
            まだ誤答はありません。ここまでの全問題で不正解になると、ここに残ります。
          </ThemedText>
        ) : (
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator>
            {Object.keys(grouped).sort().map((group) => (
              <View key={group} style={styles.group}>
                <ThemedText type="defaultSemiBold" style={[styles.groupTitle, { color: colors.text }]}>
                  {group}
                </ThemedText>
                {grouped[group].map((entry) => {
                  const key = `${entry.subject}|${entry.field}|${entry.textHash}`;
                  const busy = opening === key;
                  return (
                    <Pressable
                      key={key}
                      onPress={() => openQuestion(entry)}
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
                        <View style={[styles.badge, { backgroundColor: entry.wrong >= 2 ? '#D32F2F' : '#F9A825' }]}>
                          <ThemedText style={styles.badgeText}>誤答 {entry.wrong}回</ThemedText>
                        </View>
                        {entry.correct > 0 ? (
                          <ThemedText style={[styles.meta, { color: colors.subText }]}>正解 {entry.correct}回</ThemedText>
                        ) : null}
                        {busy ? <ActivityIndicator size="small" color={colors.primary} /> : null}
                      </View>
                      <ThemedText style={[styles.preview, { color: colors.text }]} numberOfLines={4}>
                        {entry.previewText}
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
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  lead: { fontSize: 14, lineHeight: 20, marginBottom: 16 },
  centered: { paddingVertical: 48, alignItems: 'center' },
  empty: { fontSize: 16, lineHeight: 24, marginTop: 24 },
  scroll: { paddingBottom: 32, gap: 20 },
  group: { gap: 10 },
  groupTitle: { fontSize: 15, marginBottom: 4 },
  card: { borderWidth: 1, borderRadius: 12, padding: 12, gap: 8 },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  meta: { fontSize: 12, flex: 1 },
  preview: { fontSize: 15, lineHeight: 22 },
});
