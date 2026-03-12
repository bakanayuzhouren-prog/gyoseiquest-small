import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Modal, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { MarkdownText } from '@/components/markdown-text';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';
import { PIN_CASES } from '@/src/pinData';
import { RESOURCES, SUBJECTS } from '@/src/questions';
import { getChoicePrefix, hasNumberPrefix } from '@/utils/choiceNumber';
import { addPoints } from '@/utils/points';
import { incrementLoopCount } from '@/utils/progress';
import { USER_KEY } from './login';

export default function ResultScreen() {
  const params = useLocalSearchParams<{
    subject?: string;
    pickedIndex?: string;
    pickedIndices?: string; // NEW: JSON string of selected indices
    pickedText?: string; // 記述式の解答文
    pickedSlots?: string; // 多肢選択の穴埋め解答 JSON ["アの解答","イの解答",...]
    field?: string;
    questionIndex?: string; // Current question index
    totalQuestions?: string; // NEW
    correctCountSession?: string; // NEW
  }>();
  const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;
  const paramField = Array.isArray(params.field) ? params.field[0] : params.field;
  const pickedIndexParam = Array.isArray(params.pickedIndex) ? params.pickedIndex[0] : params.pickedIndex;
  const pickedIndicesParam = Array.isArray(params.pickedIndices) ? params.pickedIndices[0] : params.pickedIndices;
  const pickedTextParam = Array.isArray(params.pickedText) ? params.pickedText[0] : params.pickedText;
  const pickedSlotsParam = Array.isArray(params.pickedSlots) ? params.pickedSlots[0] : params.pickedSlots;
  const field = Array.isArray(params.field) ? params.field[0] : params.field;

  const isDescriptive = subject === '記述';
  const isTashi = subject === '多肢選択';
  const pickedText = pickedTextParam || '';
  let pickedSlots: string[] = [];
  try {
    pickedSlots = pickedSlotsParam ? JSON.parse(pickedSlotsParam) : [];
  } catch (_) {}

  const { colors, theme } = useTheme();

  // Calculate next index
  const questionIndex = params.questionIndex ? parseInt(Array.isArray(params.questionIndex) ? params.questionIndex[0] : params.questionIndex, 10) : 0;
  const nextIndex = questionIndex + 1;

  // LOOKUP DATA FROM SUBJECTS
  const subjectData = subject ? (SUBJECTS as any)[subject] : {};
  const questions = field && subjectData[field] ? subjectData[field] : [];
  const question = questions[questionIndex] || null;

  // Fallback or loading state if question not found (shouldn't happen with correct nav)
  if (!question) {
    // Handle error case below
  }

  const text = question?.text || '';
  const explain = question?.explain || '';
  const memo = question?.memo || '';
  const choices = question?.choices || [];
  const correctIndices: number[] = question?.answer || [];
  const correctSlots: string[] = Array.isArray(question?.answer) && typeof (question?.answer as any[])[0] === 'string' ? (question?.answer as string[]) : [];
  const answerPending = isTashi ? correctSlots.length === 0 : correctIndices.length === 0;
  const refId = question?.refId || '';

  // [NEW] Resolve User Selection & Validation
  const pickedIndex = pickedIndexParam ? parseInt(pickedIndexParam, 10) : -1;
  let userSelection: number[] = [];

  if (pickedIndicesParam) {
    try {
      userSelection = JSON.parse(pickedIndicesParam);
    } catch (e) {
      userSelection = (pickedIndex !== -1) ? [pickedIndex] : [];
    }
  } else {
    userSelection = (pickedIndex !== -1) ? [pickedIndex] : [];
  }

  // Exact Match Validation
  const sortedCorrect = [...correctIndices].sort((a, b) => a - b);
  const sortedUser = [...userSelection].sort((a, b) => a - b);
  const isCorrectTashi = !answerPending && correctSlots.length === pickedSlots.length && correctSlots.every((v, i) => v === pickedSlots[i]);
  const isCorrect = isTashi
    ? isCorrectTashi
    : !answerPending && sortedCorrect.length === sortedUser.length && sortedCorrect.every((val, index) => val === sortedUser[index]);

  const correctAnswersText = isTashi ? correctSlots.map((s, i) => `${'アイウエオ'[i]}: ${s}`).join('\n') : correctIndices.map((i: number) => choices[i]).join('\n・');

  // Memo State
  const [showOfficialMemo, setShowOfficialMemo] = useState(false);
  const [userMemo, setUserMemo] = useState('');
  const [isExplainExpanded, setIsExplainExpanded] = useState(false);

  // Resources State
  // GUARD: RESOURCES might be undefined
  const resourcesData = (RESOURCES as any) || {};
  const resourcePages = (refId && resourcesData[refId] ? resourcesData[refId] : []) as any[];

  // Check for Pinned Case
  const linkedCase = refId ? PIN_CASES.find(c => c.id === refId) : null;

  const [resourceModalVisible, setResourceModalVisible] = useState(false);
  const [resourcePage, setResourcePage] = useState(0);
  const currentResource = resourcePages.length > 0 && resourcePage < resourcePages.length ? resourcePages[resourcePage] : null;

  // Reset page on open
  useEffect(() => {
    if (resourceModalVisible) setResourcePage(0);
  }, [resourceModalVisible]);

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

  if (!subject || !field || !question) {
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

  // Calculate Points & Session Progress
  const totalQuestions = parseInt(Array.isArray(params.totalQuestions) ? params.totalQuestions[0] : params.totalQuestions || '0', 10);
  const correctCountSessionCurrent = parseInt(Array.isArray(params.correctCountSession) ? params.correctCountSession[0] : params.correctCountSession || '0', 10);

  // Update count（回答設定中の問題はカウント対象外）
  const newCorrectCount = (isCorrect && !answerPending) ? correctCountSessionCurrent + 1 : correctCountSessionCurrent;

  const handleNext = () => {
    // Check if we are looping (Index + 1 >= Total)
    if (totalQuestions > 0 && nextIndex >= totalQuestions) {
      // Session Complete
      let added = 1; // +1 Base
      let message = '1科目完了！ +1ポイント';

      if (newCorrectCount === totalQuestions) {
        added += 10;
        message = '全問正解！！ +11ポイント (完了1 + ボーナス10)';
      }

      // [NEW] Increment Loop Count
      incrementLoopCount(subject, field || '');

      addPoints(added);
      alert(message);
    }
  };

  const getResourceTitle = () => {
    if (!currentResource) return '資料';
    if (currentResource.type === 'article') {
      return '関連条文';
    }
    if (currentResource.targetChoice) {
      return `${currentResource.targetChoice}の資料`;
    }
    return currentResource.title || '資料';
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title" style={{ color: colors.text, fontFamily: theme === 'paper' ? 'serif' : undefined }}>{subject} - {field}</ThemedText>

        <ThemedView style={{ marginBottom: 16 }}>
          <ThemedText style={{ marginBottom: 8, color: colors.subText }}>あなたの回答:</ThemedText>
          {isTashi && pickedSlots.length > 0 ? (
            <ThemedView style={[styles.descriptiveAnswerBox, { backgroundColor: colors.card, borderColor: colors.choiceBorder }]}>
              {pickedSlots.map((s, i) => (
                <ThemedText key={i} style={{ fontSize: 16, color: colors.text, lineHeight: 24, marginBottom: 4 }}>
                  {['ア','イ','ウ','エ','オ'][i]}: {s}
                </ThemedText>
              ))}
            </ThemedView>
          ) : isDescriptive && pickedText ? (
            <ThemedView style={[styles.descriptiveAnswerBox, { backgroundColor: colors.card, borderColor: colors.choiceBorder }]}>
              <ThemedText style={{ fontSize: 16, color: colors.text, lineHeight: 24 }}>{pickedText}</ThemedText>
            </ThemedView>
          ) : (
            userSelection.map((idx) => (
              <Pressable key={idx} style={[
                styles.choiceButton,
                styles.choiceButtonDisabled,
                { backgroundColor: colors.choiceBg, borderColor: colors.choiceBorder, marginBottom: 8 }
              ]}>
                <ThemedText style={{ fontSize: 16, color: colors.text }}>
                  {choices[idx] ? choices[idx].replace(/※/g, '') : ''}
                </ThemedText>
              </Pressable>
            ))
          )}
        </ThemedView>
        {isDescriptive ? (
          <ThemedView style={{ padding: 16, backgroundColor: '#E3F2FD', borderRadius: 12, marginBottom: 16, borderWidth: 2, borderColor: '#2196F3', alignItems: 'center' }}>
            <ThemedText type="title" style={{ color: '#1565C0', fontSize: 20 }}>📝 記述式</ThemedText>
            <ThemedText style={{ color: '#0D47A1', marginTop: 4 }}>解説を読んで自分の解答と照らし合わせてください。</ThemedText>
          </ThemedView>
        ) : isTashi && answerPending ? (
          <ThemedView style={{ padding: 16, backgroundColor: '#FFF8E1', borderRadius: 12, marginBottom: 16, borderWidth: 2, borderColor: '#FFC107', alignItems: 'center' }}>
            <ThemedText type="title" style={{ color: '#F57F17', fontSize: 20 }}>⏳ 回答設定中</ThemedText>
            <ThemedText style={{ color: '#E65100', marginTop: 4 }}>正解はスプレッドシートで設定してください。</ThemedText>
          </ThemedView>
        ) : isTashi ? (
          isCorrect ? (
            <ThemedView style={{ padding: 16, backgroundColor: '#E8F5E9', borderRadius: 12, marginBottom: 16, borderWidth: 2, borderColor: '#4CAF50', alignItems: 'center' }}>
              <ThemedText type="title" style={{ color: '#2E7D32', fontSize: 24 }}>🎉 正解！お見事！</ThemedText>
            </ThemedView>
          ) : (
            <ThemedView style={{ padding: 16, backgroundColor: '#FFEBEE', borderRadius: 12, marginBottom: 16, borderWidth: 2, borderColor: '#D32F2F', alignItems: 'center' }}>
              <ThemedText type="title" style={{ color: '#D32F2F', fontSize: 20 }}>不正解... 復習が必要だ！</ThemedText>
            </ThemedView>
          )
        ) : answerPending ? (
          <ThemedView style={{ padding: 16, backgroundColor: '#FFF8E1', borderRadius: 12, marginBottom: 16, borderWidth: 2, borderColor: '#FFC107', alignItems: 'center' }}>
            <ThemedText type="title" style={{ color: '#F57F17', fontSize: 20 }}>⏳ 回答設定中</ThemedText>
            <ThemedText style={{ color: '#E65100', marginTop: 4 }}>この問題の正解はまだ設定されていません。後日更新されます。</ThemedText>
          </ThemedView>
        ) : isCorrect ? (
          <ThemedView style={{ padding: 16, backgroundColor: '#E8F5E9', borderRadius: 12, marginBottom: 16, borderWidth: 2, borderColor: '#4CAF50', alignItems: 'center' }}>
            <ThemedText type="title" style={{ color: '#2E7D32', fontSize: 24 }}>🎉 正解！お見事！</ThemedText>
            <ThemedText style={{ color: '#1B5E20', marginTop: 4, fontWeight: 'bold' }}>その調子だ！この知識を確実に定着させろ！</ThemedText>
          </ThemedView>
        ) : (
          <ThemedText type="subtitle" style={{ color: '#D32F2F', marginBottom: 8 }}>不正解... 復習が必要だ！</ThemedText>
        )}
        <ThemedText style={[styles.questionText, { color: colors.text, fontFamily: theme === 'paper' ? 'serif' : undefined }]}>{(hasNumberPrefix(text) ? '' : getChoicePrefix(questionIndex))}{text}</ThemedText>
        {!isDescriptive && !answerPending && correctAnswersText && (
          <ThemedText style={[styles.answerText, { color: colors.text }]}>正解: {correctAnswersText}</ThemedText>
        )}

        <ThemedText type="subtitle" style={styles.explainTitle}>
          もっと深掘る！
        </ThemedText>
        <View style={!isExplainExpanded ? styles.collapsedExplain : undefined}>
          <MarkdownText text={explain || ''} />
        </View>
        <Pressable
          style={styles.expandButton}
          onPress={() => setIsExplainExpanded(!isExplainExpanded)}
        >
          <ThemedText style={{ color: '#007BFF' }}>
            {isExplainExpanded ? '▲ 閉じる' : '▼ もっと深掘る（解説を読む）'}
          </ThemedText>
        </Pressable>

        {/* Resources Button */}
        {resourcePages.length > 0 && (
          <Pressable style={styles.resourceButton} onPress={() => setResourceModalVisible(true)}>
            <ThemedText style={styles.resourceButtonText}>
              {resourcePages[0]?.type === 'article' ? '関連条文を見る' : '資料を見る'} ({resourcePages.length})
            </ThemedText>
            <ThemedText style={styles.resourceButtonSubText}>
              {resourcePages[0]?.type === 'article' ? '※条文参照' : '※補足資料あり'}
            </ThemedText>
          </Pressable>
        )}

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
          <ThemedView style={[styles.memoBox, { backgroundColor: colors.card, borderColor: colors.choiceBorder, borderWidth: 1 }]}>
            <ThemedText style={{ color: colors.text }}>{memo}</ThemedText>
          </ThemedView>
        )}

        {/* Case Diagram Button */}
        {linkedCase && (
          <Link href={`/pin/${linkedCase.category}/${linkedCase.id}`} asChild>
            <Pressable style={styles.caseButton}>
              <ThemedText style={styles.caseButtonText}>
                {linkedCase.category === 'kenpo' ? '📌 判例図解を見る' : '📌 詳細解説を見る'}
              </ThemedText>
              <ThemedText style={styles.resourceButtonSubText}>
                {linkedCase.category === 'kenpo' ? '※図解でわかりやすく解説' : '※表や図で整理して解説'}
              </ThemedText>
            </Pressable>
          </Link>
        )}

        <ThemedText type="subtitle" style={{ marginTop: 20 }}>My Memo (余白)</ThemedText>
        <TextInput
          style={styles.userMemoInput}
          multiline
          placeholder="ここに自分用のメモを残せます（他ユーザーには見えません）"
          value={userMemo}
          onChangeText={saveUserMemo}
        />

        <Link href={{
          pathname: '/question',
          params: {
            subject,
            field,
            index: nextIndex,
            correctCountSession: String(newCorrectCount) // Pass updated count
          }
        }} asChild>
          <Pressable
            style={StyleSheet.flatten([styles.nextButton, { backgroundColor: colors.accent, borderColor: colors.accent }])}
            onPress={handleNext}
          >
            <ThemedText type="defaultSemiBold" style={{ color: '#fff', textAlign: 'center' }}>次の問題へ</ThemedText>
          </Pressable>
        </Link>

        <Link href="/subjects" replace asChild>
          <Pressable style={StyleSheet.flatten([styles.nextButton, { backgroundColor: '#fff', borderColor: '#5A9BD5', borderWidth: 2 }])}>
            <ThemedText type="defaultSemiBold" style={{ color: '#5A9BD5', textAlign: 'center' }}>科目選択</ThemedText>
          </Pressable>
        </Link>
        <Link href="/" replace asChild>
          <Pressable style={StyleSheet.flatten([styles.nextButton, { backgroundColor: '#fff', borderColor: '#757575', borderWidth: 2 }])}>
            <ThemedText type="defaultSemiBold" style={{ color: '#757575', textAlign: 'center' }}>メインメニューへ</ThemedText>
          </Pressable>
        </Link>
        <View style={{ height: 40 }} />

        {/* Resource Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={resourceModalVisible}
          onRequestClose={() => setResourceModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ThemedText type="subtitle" style={[styles.modalTitle, currentResource?.type === 'article' && { textAlign: 'left' }]}>
                {getResourceTitle()}
                {resourcePages.length > 1 ? ` (${resourcePage + 1}/${resourcePages.length})` : ''}
              </ThemedText>

              {/* Question Context Header */}
              <ThemedText style={styles.modalContextText}>
                対象問題: {text ? (text.length > 30 ? text.substring(0, 30) + '...' : text) : ''}
              </ThemedText>

              <ScrollView style={{ maxHeight: '60%' }}>
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
  descriptiveAnswerBox: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
    minHeight: 60,
  },
  choiceButton: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30, // Pill shape
    backgroundColor: '#fff',
    alignItems: 'center', // Center content
  },
  choiceButtonDisabled: {
    backgroundColor: '#fff', // Keep white for result to show clearly
    borderColor: '#ddd',
    opacity: 1, // Don't dim result choice
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
  resourceButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#4CAF50', // Green
    borderRadius: 8,
    alignItems: 'center',
  },
  resourceButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resourceButtonSubText: {
    fontSize: 12,
    color: 'white',
    marginTop: 4
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
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContextText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  modalBodyText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  resourceImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#666',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  pagingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    gap: 10,
  },
  pagingButton: {
    flex: 1,
    backgroundColor: '#8FB3D9',
    paddingVertical: 10,
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
  caseButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#9C27B0', // Purple for Pins
    borderRadius: 8,
    alignItems: 'center',
  },
  caseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  collapsedExplain: {
    maxHeight: 150,
    overflow: 'hidden',
    opacity: 0.8,
  },
  expandButton: {
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 4,
  },
});
