import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SUBJECTS } from '@/src/questions';

export default function QuestionScreen() {
  const params = useLocalSearchParams<{ subject?: string; field?: string; index?: string }>();
  const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;
  const paramField = Array.isArray(params.field) ? params.field[0] : params.field;

  const subjectData = subject ? (SUBJECTS as any)[subject] : {};
  const fields = Object.keys(subjectData);

  const { field, questions } = useMemo(() => {
    if (fields.length === 0) {
      return { field: null, questions: [] };
    }
    // If field is specified and valid, use it
    if (paramField && fields.includes(paramField)) {
      return { field: paramField, questions: subjectData[paramField] };
    }

    // Otherwise pick random
    const randomField = fields[Math.floor(Math.random() * fields.length)];
    return { field: randomField, questions: subjectData[randomField] };
  }, [subjectData, fields, paramField]);

  // State for current question index
  const [questionIndex, setQuestionIndex] = useState<number | null>(null);

  // Initialize strictly when questions change (e.g. subject selection)
  useEffect(() => {
    if (questions.length > 0) {
      // Start from param 'index' if provided, otherwise 0
      const initialIndex = params.index ? parseInt(Array.isArray(params.index) ? params.index[0] : params.index, 10) : 0;
      // Validate index range
      setQuestionIndex(initialIndex >= 0 && initialIndex < questions.length ? initialIndex : 0);
    } else {
      setQuestionIndex(null);
    }
  }, [questions, params.index]); // Re-run if params.index changes

  const goToNext = () => {
    if (questions.length === 0 || questionIndex === null) return;
    setQuestionIndex((prev: number | null) => {
      if (prev === null) return 0;
      return (prev + 1) % questions.length;
    });
  };

  const goToPrev = () => {
    if (questions.length === 0 || questionIndex === null) return;
    setQuestionIndex((prev: number | null) => {
      if (prev === null) return 0;
      return (prev - 1 + questions.length) % questions.length;
    });
  };

  const question = questionIndex !== null ? questions[questionIndex] : null;

  // Shuffle choices and keep track of original index
  const shuffledChoices = useMemo(() => {
    if (!question) return [];

    // Map to object with original index
    const choicesWithIndex = question.choices.map((text, index) => ({ text, originalIndex: index }));

    // Shuffle (Fisher-Yates)
    for (let i = choicesWithIndex.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choicesWithIndex[i], choicesWithIndex[j]] = [choicesWithIndex[j], choicesWithIndex[i]];
    }

    return choicesWithIndex;
  }, [question]);

  if (!subject || !field || !question) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">問題が見つかりません</ThemedText>
        <ThemedText>科目一覧から選択し直してください。</ThemedText>
        <Pressable style={styles.backButton} onPress={() => router.replace('/')}>
          <ThemedText type="defaultSemiBold">科目一覧へ</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="subtitle" style={styles.subject}>
          {subject} {questionIndex !== null ? `(${questionIndex + 1}/${questions.length})` : ''}
        </ThemedText>
        <ThemedText type="title" style={styles.questionText}>
          {question.text}
        </ThemedText>
        <ThemedView style={styles.choices}>
          {shuffledChoices.map((choiceObj: { text: string; originalIndex: number }, index: number) => (
            <Pressable
              key={`${question.text}-${index}`}
              style={styles.choiceButton}
              onPress={() =>
                router.push({
                  pathname: '/result',
                  params: {
                    subject,
                    field,
                    questionIndex: String(questionIndex), // Pass current index
                    pickedIndex: String(choiceObj.originalIndex),
                    correctIndices: JSON.stringify(question.answer),
                    text: question.text,
                    explain: question.explain,
                    memo: question.memo || '',
                    choices: JSON.stringify(question.choices),
                  },
                })
              }>
              <ThemedText style={styles.choiceText}>{choiceObj.text}</ThemedText>
            </Pressable>
          ))}
        </ThemedView>

        <View style={styles.navigationContainer}>
          <Pressable style={styles.navButton} onPress={goToPrev}>
            <ThemedText style={styles.navButtonText}>← 前へ</ThemedText>
          </Pressable>
          <Pressable style={styles.navButton} onPress={goToNext}>
            <ThemedText style={styles.navButtonText}>次へ →</ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 40,
    gap: 16,
  },
  subject: {
    opacity: 0.7,
  },
  questionText: {
    lineHeight: 30,
  },
  choices: {
    gap: 12,
  },
  choiceButton: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#8FB3D9',
    backgroundColor: '#F4F8FC',
  },
  choiceText: {
    fontSize: 16,
  },
  backButton: {
    marginTop: 12,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#666',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 40,
    gap: 16,
  },
  navButton: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: '#8FB3D9',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
