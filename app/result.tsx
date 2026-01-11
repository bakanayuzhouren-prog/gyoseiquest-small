import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { USER_KEY } from './login';

export default function ResultScreen() {
  const params = useLocalSearchParams<{
    subject?: string;
    pickedIndex?: string;
    correctIndices?: string; // Expect JSON string of array
    text?: string;
    explain?: string;
    memo?: string;
    choices?: string;
    field?: string;
    questionIndex?: string; // Current question index
  }>();
  const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;
  const paramField = Array.isArray(params.field) ? params.field[0] : params.field;
  const pickedIndexParam = Array.isArray(params.pickedIndex) ? params.pickedIndex[0] : params.pickedIndex;
  const correctIndicesParam = Array.isArray(params.correctIndices) ? params.correctIndices[0] : params.correctIndices;
  const text = Array.isArray(params.text) ? params.text[0] : params.text;
  const explain = Array.isArray(params.explain) ? params.explain[0] : params.explain;
  const memo = Array.isArray(params.memo) ? params.memo[0] : params.memo;
  const choicesParam = Array.isArray(params.choices) ? params.choices[0] : params.choices;
  const field = Array.isArray(params.field) ? params.field[0] : params.field;

  // Calculate next index
  const questionIndex = params.questionIndex ? parseInt(Array.isArray(params.questionIndex) ? params.questionIndex[0] : params.questionIndex, 10) : 0;
  const nextIndex = questionIndex + 1; // Simplified: just increment. question.tsx handles bounds/modulo if we passed total length, but simple increment works if question.tsx modulos or handles bounds. Actually question.tsx with param index just sets it. We rely on question.tsx to validate.
  // Wait, if nextIndex >= length, question.tsx with my new logic:
  // setQuestionIndex(initialIndex >= 0 && initialIndex < questions.length ? initialIndex : 0);
  // So if we pass index > length, it resets to 0 (Loop). Perfect.

  const choices = choicesParam ? JSON.parse(choicesParam) : [];

  // Parse correct indices array
  let correctIndices: number[] = [0];
  try {
    if (correctIndicesParam) {
      correctIndices = JSON.parse(correctIndicesParam);
    }
  } catch (e) {
    console.error("Failed to parse correctIndices", e);
  }

  const pickedIndex = pickedIndexParam ? parseInt(pickedIndexParam, 10) : -1;
  const isCorrect = correctIndices.includes(pickedIndex);

  const correctAnswersText = correctIndices.map(i => choices[i]).join('\n・');

  // Memo State
  const [showOfficialMemo, setShowOfficialMemo] = useState(false);
  const [userMemo, setUserMemo] = useState('');

  // unique key for user memo: user + simple hash of question text
  useEffect(() => {
    if (Platform.OS === 'web' && text) {
      const user = localStorage.getItem(USER_KEY) || 'guest';
      // Simple hash for text to avoid massive keys
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) - hash) + text.charCodeAt(i);
        hash |= 0;
      }
      const key = `memo_${user}_${hash}`;

      const saved = localStorage.getItem(key);
      if (saved) setUserMemo(saved);
    }
  }, [text]);

  const saveUserMemo = (val: string) => {
    setUserMemo(val);
    if (Platform.OS === 'web' && text) {
      const user = localStorage.getItem(USER_KEY) || 'guest';
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) - hash) + text.charCodeAt(i);
        hash |= 0;
      }
      const key = `memo_${user}_${hash}`;
      localStorage.setItem(key, val);
    }
  };

  if (!subject || !field || !text || !explain || !choicesParam) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">結果を表示できません</ThemedText>
        <ThemedText>科目一覧から選択し直してください。</ThemedText>
        <Link href="/" asChild>
          <Pressable style={styles.nextButton}>
            <ThemedText type="defaultSemiBold">科目一覧へ</ThemedText>
          </Pressable>
        </Link>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title">{subject} - {field}</ThemedText>
        <ThemedText type="subtitle">{isCorrect ? '正解！' : '不正解'}</ThemedText>
        <ThemedText style={styles.questionText}>{text}</ThemedText>
        <ThemedText style={styles.answerText}>正解: {correctAnswersText}</ThemedText>

        <ThemedText type="subtitle" style={styles.explainTitle}>
          解説
        </ThemedText>
        <ThemedText style={styles.explainText}>{explain}</ThemedText>

        {/* Official Memo */}
        {memo ? (
          <Pressable
            style={styles.memoButton}
            onPress={() => setShowOfficialMemo(!showOfficialMemo)}
          >
            <ThemedText type="defaultSemiBold">
              {showOfficialMemo ? '▼ 解説メモを隠す' : '▶ 解説メモを表示'}
            </ThemedText>
          </Pressable>
        ) : null}

        {showOfficialMemo && memo && (
          <ThemedView style={styles.memoBox}>
            <ThemedText>{memo}</ThemedText>
          </ThemedView>
        )}

        {/* User Private Memo */}
        <ThemedText type="subtitle" style={{ marginTop: 20 }}>My Memo (余白)</ThemedText>
        <TextInput
          style={styles.userMemoInput}
          multiline
          placeholder="ここに自分用のメモを残せます（他ユーザーには見えません）"
          value={userMemo}
          onChangeText={saveUserMemo}
        />

        <Link href={{ pathname: '/question', params: { subject, field, index: nextIndex } }} asChild>
          <Pressable style={styles.nextButton}>
            <ThemedText type="defaultSemiBold">次の問題へ</ThemedText>
          </Pressable>
        </Link>
        <View style={{ height: 40 }} />
      </ScrollView>
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
  questionText: {
    lineHeight: 28,
  },
  answerText: {
    fontSize: 16,
  },
  explainTitle: {
    marginTop: 8,
  },
  explainText: {
    lineHeight: 24,
  },
  nextButton: {
    marginTop: 12,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#5A9BD5',
    backgroundColor: '#E9F2FB',
  },
  memoButton: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 8,
    alignItems: 'center',
  },
  memoBox: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginTop: 8,
  },
  userMemoInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginTop: 8,
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
});
