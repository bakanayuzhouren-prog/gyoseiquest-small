import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Modal, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PIN_CASES } from '@/src/pinData';
import { RESOURCES } from '@/src/questions';
import { addPoints } from '@/utils/points';
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
    totalQuestions?: string; // NEW
    correctCountSession?: string; // NEW
    refId?: string; // NEW
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
  const nextIndex = questionIndex + 1;

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

  // Resources State
  const refId = Array.isArray(params.refId) ? params.refId[0] : params.refId;
  const resourcePages = (refId && (RESOURCES as any)[refId] ? (RESOURCES as any)[refId] : []) as any[];

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

  if (!subject || !field || !text || !choicesParam) {
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

  // Update count (optimistically for next step)
  const newCorrectCount = isCorrect ? correctCountSessionCurrent + 1 : correctCountSessionCurrent;

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
    <ThemedView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title">{subject} - {field}</ThemedText>
        <Pressable style={[styles.choiceButton, styles.choiceButtonDisabled]}>
          <ThemedText style={{ fontSize: 16 }}>{choices[pickedIndex]}</ThemedText>
        </Pressable>
        <ThemedText type="subtitle">{isCorrect ? '正解！' : '不正解'}</ThemedText>
        <ThemedText style={styles.questionText}>{text}</ThemedText>
        <ThemedText style={styles.answerText}>正解: {correctAnswersText}</ThemedText>

        <ThemedText type="subtitle" style={styles.explainTitle}>
          解説
        </ThemedText>
        <ThemedText style={styles.explainText}>{explain}</ThemedText>

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
          <ThemedView style={styles.memoBox}>
            <ThemedText>{memo}</ThemedText>
          </ThemedView>
        )}

        {/* Case Diagram Button */}
        {linkedCase && (
          <Link href={`/pin/${linkedCase.category}/${linkedCase.id}`} asChild>
            <Pressable style={styles.caseButton}>
              <ThemedText style={styles.caseButtonText}>
                📌 判例図解を見る
              </ThemedText>
              <ThemedText style={styles.resourceButtonSubText}>
                ※図解でわかりやすく解説
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
          <Pressable style={styles.nextButton} onPress={handleNext}>
            <ThemedText type="defaultSemiBold">次の問題へ</ThemedText>
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
  choiceButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  choiceButtonDisabled: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
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
});
