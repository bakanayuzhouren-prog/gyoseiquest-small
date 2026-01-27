import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';
import { RESOURCES, SUBJECTS } from '@/src/questions';

export default function QuestionScreen() {
  const params = useLocalSearchParams<{ subject?: string; field?: string; index?: string; correctCountSession?: string; mode?: string }>();
  const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;
  const paramField = Array.isArray(params.field) ? params.field[0] : params.field;
  const mode = Array.isArray(params.mode) ? params.mode[0] : params.mode;

  const { colors, theme } = useTheme();

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
  const [isLongText, setIsLongText] = useState(false);

  useEffect(() => {
    setIsLongText(false);
  }, [questionIndex]);

  // State for dimmed choices (indices)
  const [dimmedIndices, setDimmedIndices] = useState<number[]>([]);

  // Reset dimmed choices when question changes
  useEffect(() => {
    setDimmedIndices([]);
  }, [questionIndex]);

  // State for slots
  const [slotSelections, setSlotSelections] = useState<{ [key: string]: string }>({});
  const [activeSlot, setActiveSlot] = useState<{ label: string; options: string } | null>(null);

  // State for Resource Modal
  // State for Resource Modal
  const [resourceModalVisible, setResourceModalVisible] = useState(false);
  const [resourcePage, setResourcePage] = useState(0);

  // Reset slots when question changes
  useEffect(() => {
    setSlotSelections({});
  }, [questionIndex]);

  const handleSlotPress = (slot: { label: string; options: string }) => {
    setActiveSlot(slot);
  };

  const handleSlotSelect = (val: string) => {
    if (activeSlot) {
      setSlotSelections(prev => ({ ...prev, [activeSlot.label]: val }));
      setActiveSlot(null);
    }
  };

  const renderQuestionText = () => {
    if (!question) return null;
    const text = question.text;
    const slots = (question as any).slots || [];

    if (slots.length === 0) {
      return (
        <ThemedText
          type="title"
          style={[
            styles.questionText,
            isLongText && styles.questionTextSmall,
            { color: colors.text, fontFamily: theme === 'paper' ? 'serif' : undefined }
          ]}
          onTextLayout={(e) => {
            if (e.nativeEvent.lines.length >= 15) setIsLongText(true);
          }}
        >
          {text}
        </ThemedText>
      );
    }

    // Escape regex characters for labels
    const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(${slots.map((s: any) => escapeRegExp(s.label)).join('|')})`, 'g');

    // Split text by labels
    const parts = text.split(pattern);

    return (
      <ThemedText style={[styles.questionText, isLongText && styles.questionTextSmall, { lineHeight: 40 }]}>
        {parts.map((part: string, index: number) => {
          const slot = slots.find((s: any) => s.label === part);
          if (slot) {
            const selected = slotSelections[slot.label];
            return (
              <Pressable key={index} onPress={() => handleSlotPress(slot)} style={styles.slotButton}>
                <ThemedText style={styles.slotButtonText}>
                  {selected || part}
                </ThemedText>
              </Pressable>
            );
          }
          return <ThemedText key={index} style={[styles.questionText, isLongText && styles.questionTextSmall]}>{part}</ThemedText>;
        })}
      </ThemedText>
    );
  };

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

  // Resource Logic
  const resourceId = question ? (question as any).refId : null;
  // resource can be an Object (single) or Array (multi). Normalize to Array.
  // GUARD: RESOURCES might be undefined if import fails or file is incomplete
  const resourcesData = (RESOURCES as any) || {};
  const rawResource = resourceId && resourcesData[resourceId] ? resourcesData[resourceId] : null;
  const resourcePages = useMemo(() => {
    if (!rawResource) return [];
    if (Array.isArray(rawResource)) return rawResource;
    return [rawResource];
  }, [rawResource]);

  const currentResource = resourcePages.length > 0 && resourcePage < resourcePages.length ? resourcePages[resourcePage] : null;

  // Reset page on open/change
  useEffect(() => {
    if (resourceModalVisible) {
      setResourcePage(0);
    }
  }, [resourceModalVisible, resourceId]);

  // Shuffle choices and keep track of original index
  const shuffledChoices = useMemo(() => {
    if (!question) return [];

    // Map to object with original index
    const choicesWithIndex = question.choices.map((text: string, index: number) => ({ text, originalIndex: index }));

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
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="subtitle" style={[styles.subject, { color: colors.subText }]}>
          {subject} {questionIndex !== null ? `(${questionIndex + 1}/${questions.length})` : ''}
          {mode === 'bonus' ? ' ★ボーナスステージ★' : ''}
        </ThemedText>
        {renderQuestionText()}

        {/* Word Bank for Cloze Questions */}
        {(question as any).wordBank ? (
          <ThemedView style={[styles.wordBankContainer, { borderColor: colors.choiceBorder, backgroundColor: colors.card }]}>
            <ThemedText style={[styles.wordBankTitle, { color: colors.subText }]}>【語群】</ThemedText>
            <View style={styles.wordBankGrid}>
              {((question as any).wordBank || '').split('\n').filter((l: string) => l.trim().length > 0).map((line: string, index: number) => {
                const item = line.trim();
                // Check if line already starts with a number (e.g. "1." or "1 ")
                const hasNumber = /^\d+/.test(item);
                const text = hasNumber ? item : `${index + 1}. ${item}`;
                return (
                  <ThemedText key={index} style={[styles.wordBankItem, { color: colors.text }]}>
                    {text}
                  </ThemedText>
                );
              })}
            </View>
          </ThemedView>
        ) : null}

        <ThemedView style={styles.choices}>
          {shuffledChoices.map((choiceObj: { text: string; originalIndex: number }, index: number) => {
            if (!choiceObj || !choiceObj.text) return null; // Guard against null/empty choices
            const isDisabled = choiceObj.text.includes('※');
            const isDimmed = dimmedIndices.includes(index);

            return (
              <Pressable
                key={`${question.text}-${index}`}
                style={[
                  styles.choiceButton,
                  {
                    backgroundColor: colors.choiceBg,
                    borderColor: colors.choiceBorder
                  },
                  isDisabled && styles.choiceButtonDisabled,
                  isDimmed && { opacity: 0.3 } // Dim the button
                ]}
                disabled={isDisabled}
                onLongPress={() => {
                  setDimmedIndices(prev => {
                    if (prev.includes(index)) {
                      return prev.filter(i => i !== index);
                    } else {
                      return [...prev, index];
                    }
                  });
                }}
                delayLongPress={200} // Set delay specifically for web responsiveness
                onPress={() =>
                  router.push({
                    pathname: '/result',
                    params: {
                      subject,
                      field,
                      questionIndex: String(questionIndex), // Pass current index
                      pickedIndex: String(choiceObj.originalIndex),
                      // correctIndices: JSON.stringify(question.answer), // Removed
                      // text: question.text, // Removed
                      // explain: question.explain, // Removed
                      // memo: question.memo || '', // Removed
                      // choices: JSON.stringify(question.choices), // Removed
                      totalQuestions: String(questions.length),
                      correctCountSession: params.correctCountSession || '0', // Pass through or init
                      // refId: (question as any).refId || '', // Removed (Result will lookup)
                    },
                  })
                }>
                <ThemedText style={[
                  styles.choiceText,
                  { color: colors.choiceText },
                  isDisabled && styles.choiceTextDisabled
                ]}>{choiceObj.text}</ThemedText>
              </Pressable>
            );
          })}
        </ThemedView>

        <View style={styles.navigationContainer}>
          <Pressable style={[styles.navButton, { backgroundColor: colors.accent }]} onPress={goToPrev}>
            <ThemedText style={styles.navButtonText}>← 前へ</ThemedText>
          </Pressable>

          <Pressable style={[styles.navButton, { backgroundColor: colors.accent }]} onPress={() => {
            if (questions.length === 0 || questionIndex === null) return;
            setQuestionIndex((prev: number | null) => {
              if (prev === null) return 0;
              return (prev + 10) % questions.length;
            });
          }}>
            <ThemedText style={styles.navButtonText}>+10問</ThemedText>
          </Pressable>
          <Pressable style={[styles.navButton, { backgroundColor: colors.accent }]} onPress={goToNext}>
            <ThemedText style={styles.navButtonText}>次へ →</ThemedText>
          </Pressable>
        </View>

        {/* Resource Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={resourceModalVisible}
          onRequestClose={() => setResourceModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ThemedText type="subtitle" style={styles.modalTitle}>
                {currentResource?.title || '資料'}
                {resourcePages.length > 1 ? ` (${resourcePage + 1}/${resourcePages.length})` : ''}
              </ThemedText>

              <ScrollView style={{ maxHeight: '70%' }}>
                {currentResource?.imageUrl ? (
                  <Image
                    source={{ uri: currentResource.imageUrl }}
                    style={styles.resourceImage}
                    resizeMode="contain"
                  />
                ) : null}
                <ThemedText style={styles.modalBodyText}>{currentResource?.content}</ThemedText>
              </ScrollView>

              {/* Paging Controls */}
              {resourcePages.length > 1 && (
                <View style={styles.pagingContainer}>
                  <Pressable
                    style={[styles.pagingButton, resourcePage === 0 && styles.pagingButtonDisabled]}
                    onPress={() => setResourcePage(prev => Math.max(0, prev - 1))}
                    disabled={resourcePage === 0}
                  >
                    <ThemedText style={styles.pagingButtonText}>前へ</ThemedText>
                  </Pressable>
                  <Pressable
                    style={[styles.pagingButton, resourcePage === resourcePages.length - 1 && styles.pagingButtonDisabled]}
                    onPress={() => setResourcePage(prev => Math.min(resourcePages.length - 1, prev + 1))}
                    disabled={resourcePage === resourcePages.length - 1}
                  >
                    <ThemedText style={styles.pagingButtonText}>次へ</ThemedText>
                  </Pressable>
                </View>
              )}

              <Pressable style={styles.modalCloseButton} onPress={() => setResourceModalVisible(false)}>
                <ThemedText style={{ color: '#fff' }}>閉じる</ThemedText>
              </Pressable>
            </View>
          </View>
        </Modal>
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
    lineHeight: 36, // Increased line height
    backgroundColor: 'transparent', // Ensure no white bg
    fontWeight: '400', // Reduce boldness
  },
  questionTextSmall: {
    fontSize: 22, // Slightly smaller
    lineHeight: 34,
    backgroundColor: 'transparent',
    fontWeight: '400',
  },
  wordBankContainer: {
    padding: 16,
    // backgroundColor: '#fff', // handled by theme
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 10,
  },
  wordBankTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
    width: '100%',
  },
  wordBankGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  wordBankItem: {
    width: '30%', // Approx 3 columns
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  choices: {
    gap: 12,
  },
  choiceButton: {
    borderRadius: 30, // Pill shape
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderBottomWidth: 4, // 3D effect at bottom
    borderColor: '#8FB3D9',
    backgroundColor: '#fff', // White background for the button itself
    // Shadows for depth
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  choiceText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center', // Center text
  },
  choiceButtonDisabled: {
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderBottomWidth: 1, // Flatten when disabled
    opacity: 0.8,
    elevation: 0,
  },
  choiceTextDisabled: {
    color: '#888',
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
    // backgroundColor: '#8FB3D9', // Handled dynamically
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  slotButton: {
    // backgroundColor: '#E9F2FB', // Handled dynamically
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginHorizontal: 2,
    // Ensure it flows inline
    transform: [{ translateY: 4 }], // slight adjustment for baseline
  },
  slotButtonText: {
    fontWeight: 'bold',
    color: '#0a7ea4',
    fontSize: 18,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalOptionText: {
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 16,
    backgroundColor: '#666',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  resourceButton: {
    backgroundColor: '#4CAF50', // Green for resource
    flex: 0.5, // Smaller than nav buttons
  },
  resourceImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  modalBodyText: {
    fontSize: 16,
    lineHeight: 24,
  },
  pagingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  pagingButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#8FB3D9',
    borderRadius: 8,
    alignItems: 'center',
  },
  pagingButtonDisabled: {
    backgroundColor: '#ccc',
  },
  pagingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
