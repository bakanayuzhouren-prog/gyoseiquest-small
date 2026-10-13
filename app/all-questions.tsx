import { Stack, useFocusEffect, useLocalSearchParams, useRouter, type Href } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';
import { ALL_QUESTIONS_SUBJECTS, findAllQuestionsSubject } from '@/utils/allQuestionsMenu';
import {
  findAllModeIndex,
  loadAllQuestionSearchDocs,
  searchAllQuestions,
  type AllQuestionSearchHit,
  type SearchDoc,
} from '@/utils/allQuestionsSearch';

const isLightBg = (hex: string) => {
  if (!hex || hex.startsWith('rgba')) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};

export default function AllQuestionsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ subject?: string }>();
  const subjectId = Array.isArray(params.subject) ? params.subject[0] : params.subject;
  const subject = findAllQuestionsSubject(subjectId);
  const [query, setQuery] = useState('');
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const [prepareError, setPrepareError] = useState('');

  useFocusEffect(
    useCallback(() => {
      let alive = true;
      loadAllQuestionSearchDocs()
        .then((loaded) => {
          if (alive) setDocs(loaded);
        })
        .catch(() => {
          if (alive) setPrepareError('検索の準備に失敗しました。');
        });
      return () => {
        alive = false;
      };
    }, []),
  );

  const trimmed = query.trim();
  const hits = useMemo(
    () => (docs && trimmed.length >= 2 ? searchAllQuestions(docs, trimmed) : []),
    [docs, trimmed],
  );
  const searching = trimmed.length >= 2;

  const openField = (subjectName: string, field: string) => {
    router.push({
      pathname: '/question',
      params: { subject: subjectName, field, mode: 'all' },
    });
  };

  const openHit = (hit: AllQuestionSearchHit) => {
    void (async () => {
      const index = await findAllModeIndex(hit.subject, hit.field, hit.textHash);
      if (index < 0) {
        Alert.alert('開けません', 'この問題は、ここまでの全問題から外れています。');
        return;
      }
      router.push({
        pathname: '/question',
        params: { subject: hit.subject, field: hit.field, mode: 'all', index: String(index) },
      });
    })();
  };

  const buttonStyle = [styles.button, { backgroundColor: colors.choiceBg, borderColor: colors.choiceBorder }];
  const textColor = isLightBg(colors.choiceBg) ? '#000000' : colors.choiceText;

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'ここまでの全問題' }} />
      <ThemedText type="defaultSemiBold">検索欄</ThemedText>
      <ThemedText style={styles.subtitle}>例：聴聞、先取特権、令和の判例、ジェンダー問題</ThemedText>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="ここに入力"
        placeholderTextColor={colors.subText}
        style={[styles.search, { color: colors.text, backgroundColor: colors.choiceBg, borderColor: colors.choiceBorder }]}
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
      <Pressable style={buttonStyle} onPress={() => router.push('/all-wrong-answers' as Href)}>
        <ThemedText type="defaultSemiBold" style={[styles.text, { color: textColor }]}>
          誤答リスト
        </ThemedText>
      </Pressable>
      {searching ? (
        <ScrollView contentContainerStyle={styles.list}>
          {prepareError ? <ThemedText>{prepareError}</ThemedText> : null}
          {!docs && !prepareError ? <ThemedText style={styles.subtitle}>探しています。</ThemedText> : null}
          {docs && hits.length === 0 ? (
            <ThemedText style={styles.subtitle}>関連する問題はありません。</ThemedText>
          ) : null}
          {hits.length > 0 ? (
            <ThemedText style={styles.subtitle}>
              {hits.length === 40 ? '関連40件まで' : `関連${hits.length}件`}
            </ThemedText>
          ) : null}
          {hits.map((hit) => (
            <Pressable key={hit.key} style={buttonStyle} onPress={() => openHit(hit)}>
              <ThemedText type="defaultSemiBold" style={[styles.text, { color: textColor }]}>
                {hit.subjectTitle}　{hit.fieldLabel}
              </ThemedText>
              <ThemedText style={[styles.preview, { color: textColor }]}>{hit.preview}</ThemedText>
              <ThemedText style={[styles.reason, { color: textColor }]}>{hit.reason}</ThemedText>
            </Pressable>
          ))}
        </ScrollView>
      ) : subject ? (
        <>
          <ThemedText type="title">{subject.title}</ThemedText>
          <ThemedText style={styles.subtitle}>過去問と模擬試験を、この並びで出します。</ThemedText>
          <ScrollView contentContainerStyle={styles.list}>
            {subject.fields.map((item, index) => (
              <Pressable
                key={item.field}
                style={buttonStyle}
                onPress={() => openField(subject.id, item.field)}
              >
                <ThemedText type="defaultSemiBold" style={[styles.text, { color: textColor }]}>
                  {index + 1}. {item.label}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>
        </>
      ) : (
        <>
          <ThemedText type="title">ここまでの全問題</ThemedText>
          <ThemedText style={styles.subtitle}>過去問と模擬試験を、本試験の科目順でまとめています。</ThemedText>
          <ScrollView contentContainerStyle={styles.list}>
            {ALL_QUESTIONS_SUBJECTS.map((item, index) => (
              <Pressable
                key={item.id}
                style={buttonStyle}
                onPress={() => {
                  if (item.fields.length === 1) {
                    openField(item.id, item.fields[0].field);
                    return;
                  }
                  router.push({ pathname: '/all-questions', params: { subject: item.id } });
                }}
              >
                <ThemedText type="defaultSemiBold" style={[styles.text, { color: textColor }]}>
                  {index + 1}. {item.title}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>
        </>
      )}
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
  search: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  subtitle: {
    opacity: 0.7,
  },
  preview: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
  },
  reason: {
    marginTop: 4,
    fontSize: 12,
    opacity: 0.7,
  },
  list: {
    gap: 12,
    paddingBottom: 40,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
  },
  text: {
    fontSize: 18,
  },
});
