import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  MOSHI_COMPLETE_INPUT_STORAGE_KEY,
  assessMoshiSession,
  buildMoshiTextbookChapters,
  gradeMoshiQuestions,
  parseMoshiQuestions,
  parseMoshiUserAnswers,
  updateQuestionStatus,
  type MoshiQuestion,
  type MoshiQuestionStatus,
  type MoshiSavedInput,
} from '@/utils/moshi-complete-input';

const C = {
  bg: '#EEF2F0',
  panel: '#FFFFFF',
  paper: '#FFFCF5',
  ink: '#25302C',
  muted: '#68736F',
  line: '#D5DDD9',
  accent: '#276A65',
  accentSoft: '#DDF1EF',
  warn: '#B15A2A',
  warnSoft: '#F9E7D9',
  good: '#2F7D46',
  goodSoft: '#E2F3E7',
  bad: '#B83434',
  badSoft: '#F8DFDF',
};

function compact(value: string, limit = 180): string {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

async function recognizeImageFiles(files: File[], onProgress: (message: string) => void): Promise<string> {
  const mod = await import('tesseract.js');
  const Tesseract = mod.default || mod;
  const chunks: string[] = [];

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i]!;
    const url = URL.createObjectURL(file);
    try {
      onProgress(`OCR ${i + 1}/${files.length}: ${file.name}`);
      const result = await Tesseract.recognize(url, 'jpn+eng', {
        logger: (m: { status?: string; progress?: number }) => {
          if (!m.status) return;
          const pct = typeof m.progress === 'number' ? ` ${Math.round(m.progress * 100)}%` : '';
          onProgress(`${file.name}: ${m.status}${pct}`);
        },
      });
      chunks.push(result?.data?.text || '');
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  return chunks.join('\n\n');
}

function pickImageFiles(): Promise<File[]> {
  return new Promise((resolve) => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') {
      resolve([]);
      return;
    }
    const input = document.createElement('input');
    let settled = false;
    let focusTimer: ReturnType<typeof setTimeout> | null = null;
    const finish = (files: File[]) => {
      if (settled) return;
      settled = true;
      if (focusTimer) clearTimeout(focusTimer);
      window.removeEventListener('focus', handleFocus);
      resolve(files);
    };
    const handleFocus = () => {
      focusTimer = setTimeout(() => {
        finish(Array.from(input.files || []));
      }, 300);
    };

    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = () => {
      finish(Array.from(input.files || []));
    };
    window.addEventListener('focus', handleFocus);
    input.click();
  });
}

function pickImportFile(): Promise<File | undefined> {
  return new Promise((resolve) => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') {
      resolve(undefined);
      return;
    }
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.txt,text/plain,application/json';
    input.onchange = () => {
      resolve(input.files?.[0] || undefined);
    };
    input.click();
  });
}

function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

export default function MoshiCompleteInputScreen() {
  const [questionOcrText, setQuestionOcrText] = useState('');
  const [answerOcrText, setAnswerOcrText] = useState('');
  const [userAnswerOcrText, setUserAnswerOcrText] = useState('');
  const [questions, setQuestions] = useState<MoshiQuestion[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('すべて');
  const [gradingMessage, setGradingMessage] = useState('');

  const assessment = useMemo(() => assessMoshiSession(questions, 60), [questions]);
  const textbookChapters = useMemo(() => buildMoshiTextbookChapters(questions), [questions]);

  const subjectFilters = useMemo(() => {
    const subjects = [...new Set(questions.map((q) => q.subject))].sort();
    return ['すべて', ...subjects];
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    if (selectedSubject === 'すべて') return questions;
    return questions.filter((q) => q.subject === selectedSubject);
  }, [questions, selectedSubject]);

  const parseCurrentText = useCallback(() => {
    const parsed = parseMoshiQuestions(questionOcrText, answerOcrText);
    setQuestions(parsed);
    setProgress(parsed.length > 0 ? `${parsed.length}問を構造化しました。` : '問番号を検出できませんでした。');
  }, [answerOcrText, questionOcrText]);

  const saveSession = useCallback(async () => {
    const payload: MoshiSavedInput = {
      questionOcrText,
      answerOcrText,
      userAnswerOcrText,
      questions,
      savedAt: new Date().toISOString(),
    };
    await AsyncStorage.setItem(MOSHI_COMPLETE_INPUT_STORAGE_KEY, JSON.stringify(payload));
    setProgress('端末内に保存しました。');
  }, [answerOcrText, questionOcrText, questions, userAnswerOcrText]);

  const loadSession = useCallback(async () => {
    const raw = await AsyncStorage.getItem(MOSHI_COMPLETE_INPUT_STORAGE_KEY);
    if (!raw) {
      setProgress('保存済みの模試はありません。');
      return;
    }
    const parsed = JSON.parse(raw) as MoshiSavedInput;
    setQuestionOcrText(parsed.questionOcrText || '');
    setAnswerOcrText(parsed.answerOcrText || '');
    setUserAnswerOcrText(parsed.userAnswerOcrText || '');
    setQuestions(Array.isArray(parsed.questions) ? parsed.questions : []);
    setProgress('保存済みの模試を読み込みました。');
  }, []);

  const runQuestionOcr = useCallback(async () => {
    if (Platform.OS !== 'web') {
      setProgress('この初版ではWeb/PCの画像選択に対応しています。スマホ直撮りは追加実装で対応します。');
      return;
    }
    setBusy(true);
    setProgress('問題画像を選択してください。キャンセルしても処理は止まります。');
    try {
      const files = await pickImageFiles();
      if (files.length === 0) {
        setProgress('問題画像の選択をキャンセルしました。');
        return;
      }
      const text = await recognizeImageFiles(files, setProgress);
      setQuestionOcrText((prev) => [prev, text].filter(Boolean).join('\n\n'));
      setProgress(`${files.length}枚の問題画像をOCRしました。`);
    } catch (e) {
      setProgress(`OCRに失敗しました: ${String(e)}`);
    } finally {
      setBusy(false);
    }
  }, []);

  const runAnswerOcr = useCallback(async () => {
    if (Platform.OS !== 'web') {
      setProgress('この初版ではWeb/PCの画像選択に対応しています。スマホ直撮りは追加実装で対応します。');
      return;
    }
    setBusy(true);
    setProgress('解答画像を選択してください。キャンセルしても処理は止まります。');
    try {
      const files = await pickImageFiles();
      if (files.length === 0) {
        setProgress('解答画像の選択をキャンセルしました。');
        return;
      }
      const text = await recognizeImageFiles(files, setProgress);
      setAnswerOcrText((prev) => [prev, text].filter(Boolean).join('\n\n'));
      setProgress(`${files.length}枚の解答画像をOCRしました。`);
    } catch (e) {
      setProgress(`OCRに失敗しました: ${String(e)}`);
    } finally {
      setBusy(false);
    }
  }, []);

  const runUserAnswerOcr = useCallback(async () => {
    if (Platform.OS !== 'web') {
      setProgress('この初版ではWeb/PCの画像選択に対応しています。スマホ直撮りは追加実装で対応します。');
      return;
    }
    setBusy(true);
    setProgress('マークシートまたは答案画像を選択してください。');
    try {
      const files = await pickImageFiles();
      if (files.length === 0) {
        setProgress('答案画像の選択をキャンセルしました。');
        return;
      }
      const text = await recognizeImageFiles(files, setProgress);
      setUserAnswerOcrText((prev) => [prev, text].filter(Boolean).join('\n\n'));
      setProgress(`${files.length}枚の答案画像をOCRしました。`);
    } catch (e) {
      setProgress(`OCRに失敗しました: ${String(e)}`);
    } finally {
      setBusy(false);
    }
  }, []);

  const gradeCurrentAnswers = useCallback(() => {
    const userAnswers = parseMoshiUserAnswers(userAnswerOcrText);
    const { questions: gradedQuestions, summary } = gradeMoshiQuestions(questions, userAnswers);
    setQuestions(gradedQuestions);
    setGradingMessage(
      summary.graded > 0
        ? `採点 ${summary.graded}/${summary.total}問: 正解${summary.correct}・誤答${summary.wrong}・未読取${summary.unanswered}`
        : '答案を読み取れませんでした。問1:3 のように補正してから再採点してください。'
    );
  }, [questions, userAnswerOcrText]);

  const importLocalOcrJson = useCallback(async () => {
    if (Platform.OS !== 'web') {
      setProgress('この初版ではWeb/PCのOCR結果JSON読み込みに対応しています。');
      return;
    }
    try {
      const file = await pickImportFile();
      if (!file) {
        setProgress('OCR結果ファイルの選択をキャンセルしました。');
        return;
      }
      const text = await readTextFile(file);
      if (file.name.toLowerCase().endsWith('.json')) {
        const imported = JSON.parse(text) as Partial<MoshiSavedInput> & { examId?: string };
        const nextQuestionText = imported.questionOcrText || '';
        const nextAnswerText = imported.answerOcrText || '';
        const nextQuestions = Array.isArray(imported.questions)
          ? imported.questions
          : parseMoshiQuestions(nextQuestionText, nextAnswerText);
        setQuestionOcrText(nextQuestionText);
        setAnswerOcrText(nextAnswerText);
        setUserAnswerOcrText(imported.userAnswerOcrText || '');
        setQuestions(nextQuestions);
        await AsyncStorage.setItem(
          MOSHI_COMPLETE_INPUT_STORAGE_KEY,
          JSON.stringify({
            ...imported,
            questionOcrText: nextQuestionText,
            answerOcrText: nextAnswerText,
            userAnswerOcrText: imported.userAnswerOcrText || '',
            questions: nextQuestions,
            savedAt: new Date().toISOString(),
          } satisfies MoshiSavedInput)
        );
        setProgress(`${imported.examId || file.name} を読み込みました。${nextQuestions.length}問を構造化済みです。`);
        return;
      }
      setQuestionOcrText((prev) => [prev, text].filter(Boolean).join('\n\n'));
      setProgress(`${file.name} を問題OCRテキストとして読み込みました。`);
    } catch (e) {
      setProgress(`OCR結果の読み込みに失敗しました: ${String(e)}`);
    }
  }, []);

  const setStatus = useCallback((id: number, status: MoshiQuestionStatus) => {
    setQuestions((current) => updateQuestionStatus(current, id, status));
  }, []);

  const levelWidth = `${Math.max(10, assessment.level * 10)}%`;

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          title: '模試完全インプット',
          headerStyle: { backgroundColor: C.bg },
          headerTintColor: C.ink,
          headerShadowVisible: false,
        }}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <MaterialIcons name="document-scanner" size={34} color={C.accent} />
          </View>
          <View style={styles.heroText}>
            <Text style={styles.kicker}>Complete Input Mode</Text>
            <Text style={styles.title}>模試完全インプット</Text>
            <Text style={styles.lead}>
              60問を画像から取り込み、何が分かっていて何が分かっていないかを横断的に見える化します。
            </Text>
          </View>
        </View>

        <View style={styles.warningBox}>
          <MaterialIcons name="lock" size={20} color={C.warn} />
          <Text style={styles.warningText}>
            市販模試の本文・解説は、利用者本人が持ち込む端末内の個人学習用データとして扱います。
            アプリ配布物には同梱せず、外部送信する場合は明示確認を挟む設計にします。
          </Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>1. 画像からOCR</Text>
            <Text style={styles.panelText}>
              問題画像と解答画像を分けて取り込みます。スマホで撮った画像をPCに置いて選択できます。
            </Text>
            <View style={styles.buttonRow}>
              <Pressable disabled={busy} style={styles.primaryButton} onPress={runQuestionOcr}>
                <MaterialIcons name="add-photo-alternate" size={18} color="#fff" />
                <Text style={styles.primaryButtonText}>問題画像</Text>
              </Pressable>
              <Pressable disabled={busy} style={styles.primaryButton} onPress={runAnswerOcr}>
                <MaterialIcons name="fact-check" size={18} color="#fff" />
                <Text style={styles.primaryButtonText}>解答画像</Text>
              </Pressable>
              <Pressable disabled={busy} style={styles.primaryButton} onPress={runUserAnswerOcr}>
                <MaterialIcons name="checklist" size={18} color="#fff" />
                <Text style={styles.primaryButtonText}>答案画像</Text>
              </Pressable>
            </View>
            {busy ? (
              <View style={styles.progressRow}>
                <ActivityIndicator color={C.accent} />
                <Text style={styles.progressText}>{progress || 'OCR中です。'}</Text>
              </View>
            ) : progress ? (
              <Text style={styles.progressText}>{progress}</Text>
            ) : null}
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>2. 手動貼り付け・構造化</Text>
            <Text style={styles.panelText}>
              OCR済みテキストやMarkdownがある場合は貼り付けて、そのまま問番号ごとに分解できます。
            </Text>
            <TextInput
              value={questionOcrText}
              onChangeText={setQuestionOcrText}
              multiline
              placeholder="問1 ... のように問題文を貼り付け"
              placeholderTextColor="#9A9187"
              style={styles.textArea}
            />
            <TextInput
              value={answerOcrText}
              onChangeText={setAnswerOcrText}
              multiline
              placeholder="問1 正解 3 / 1:3 のように解答を貼り付け"
              placeholderTextColor="#9A9187"
              style={[styles.textArea, styles.answerArea]}
            />
            <TextInput
              value={userAnswerOcrText}
              onChangeText={setUserAnswerOcrText}
              multiline
              placeholder="マークシートOCR結果。問1 回答 3 / 1:3 のように補正できます"
              placeholderTextColor="#9A9187"
              style={[styles.textArea, styles.answerArea]}
            />
            <View style={styles.buttonRow}>
              <Pressable style={styles.secondaryButton} onPress={parseCurrentText}>
                <MaterialIcons name="schema" size={18} color={C.accent} />
                <Text style={styles.secondaryButtonText}>60問を構造化</Text>
              </Pressable>
              <Pressable style={styles.secondaryButton} onPress={gradeCurrentAnswers}>
                <MaterialIcons name="grading" size={18} color={C.accent} />
                <Text style={styles.secondaryButtonText}>自動採点</Text>
              </Pressable>
              <Pressable style={styles.secondaryButton} onPress={saveSession}>
                <MaterialIcons name="save" size={18} color={C.accent} />
                <Text style={styles.secondaryButtonText}>端末保存</Text>
              </Pressable>
              <Pressable style={styles.secondaryButton} onPress={loadSession}>
                <MaterialIcons name="folder-open" size={18} color={C.accent} />
                <Text style={styles.secondaryButtonText}>読込</Text>
              </Pressable>
              <Pressable style={styles.secondaryButton} onPress={importLocalOcrJson}>
                <MaterialIcons name="upload-file" size={18} color={C.accent} />
                <Text style={styles.secondaryButtonText}>OCR結果JSON</Text>
              </Pressable>
            </View>
            {gradingMessage ? <Text style={styles.progressText}>{gradingMessage}</Text> : null}
          </View>
        </View>

        <View style={styles.levelPanel}>
          <View style={styles.levelHeader}>
            <View>
              <Text style={styles.kicker}>合格レベル判定</Text>
              <Text style={styles.levelTitle}>Level {assessment.level} / 10</Text>
            </View>
            <Text style={styles.levelBadge}>{assessment.title}</Text>
          </View>
          <View style={styles.levelTrack}>
            <View style={[styles.levelFill, { width: levelWidth }]} />
          </View>
          <Text style={styles.levelDescription}>{assessment.description}</Text>
          <View style={styles.nextInputBox}>
            <Text style={styles.nextInputTitle}>この段階で入れる知識</Text>
            {assessment.nextInput.map((item) => (
              <Text key={item} style={styles.nextInputText}>・{item}</Text>
            ))}
          </View>
        </View>

        {questions.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>科目別の見える化</Text>
            <View style={styles.summaryGrid}>
              {assessment.subjectSummaries.map((summary) => (
                <View key={summary.subject} style={styles.summaryCard}>
                  <View style={styles.summaryTop}>
                    <Text style={styles.summarySubject}>{summary.subject}</Text>
                    <Text style={styles.summaryLevel}>Lv.{summary.level}</Text>
                  </View>
                  <Text style={styles.summaryStats}>
                    {summary.total}問 / 正解 {summary.correct} / 誤答 {summary.wrong} / 未確認 {summary.needsReview}
                  </Text>
                  <Text style={styles.summaryFocus}>{summary.focus}</Text>
                </View>
              ))}
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>60問マップ</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
                {subjectFilters.map((subject) => {
                  const active = selectedSubject === subject;
                  return (
                    <Pressable
                      key={subject}
                      onPress={() => setSelectedSubject(subject)}
                      style={[styles.filterChip, active && styles.filterChipActive]}
                    >
                      <Text style={[styles.filterText, active && styles.filterTextActive]}>{subject}</Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.questionList}>
              {filteredQuestions.map((question) => (
                <View key={question.id} style={styles.questionCard}>
                  <View style={styles.questionTop}>
                    <Text style={styles.questionNo}>問{question.id}</Text>
                    <Text style={styles.questionSubject}>{question.subject} / {question.field}</Text>
                    {question.answer ? <Text style={styles.answerBadge}>正解 {question.answer}</Text> : null}
                    {question.userAnswer ? <Text style={styles.userAnswerBadge}>選択 {question.userAnswer}</Text> : null}
                  </View>
                  <Text style={styles.questionText}>{compact(question.text)}</Text>
                  <View style={styles.statusRow}>
                    <StatusButton label="正解" active={question.status === 'correct'} tone="good" onPress={() => setStatus(question.id, 'correct')} />
                    <StatusButton label="誤答" active={question.status === 'wrong'} tone="bad" onPress={() => setStatus(question.id, 'wrong')} />
                    <StatusButton label="要確認" active={question.status === 'needs_review'} tone="warn" onPress={() => setStatus(question.id, 'needs_review')} />
                  </View>
                </View>
              ))}
            </View>

            {textbookChapters.length > 0 ? (
              <>
                <Text style={styles.sectionTitle}>君の教科書！に渡す章候補</Text>
                <View style={styles.questionList}>
                  {textbookChapters.slice(0, 8).map((chapter) => (
                    <View key={chapter.id} style={styles.textbookCard}>
                      <View style={styles.questionTop}>
                        <Text style={styles.questionNo}>問{chapter.questionId}</Text>
                        <Text style={styles.questionSubject}>{chapter.subject} / {chapter.field}</Text>
                      </View>
                      <Text style={styles.textbookTitle}>{chapter.title}</Text>
                      <Text style={styles.questionText}>{chapter.reason}</Text>
                      <Text style={styles.textbookFocus}>{chapter.focus}</Text>
                    </View>
                  ))}
                </View>
              </>
            ) : null}
          </>
        ) : (
          <View style={styles.emptyBox}>
            <MaterialIcons name="tips-and-updates" size={28} color={C.accent} />
            <Text style={styles.emptyTitle}>まずは問題画像かOCRテキストを入れてください</Text>
            <Text style={styles.emptyText}>
              問番号を検出すると、60問マップ・科目別レベル・次に入れる知識が自動で表示されます。
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function StatusButton({
  label,
  active,
  tone,
  onPress,
}: {
  label: string;
  active: boolean;
  tone: 'good' | 'bad' | 'warn';
  onPress: () => void;
}) {
  const colors = {
    good: { bg: C.goodSoft, fg: C.good },
    bad: { bg: C.badSoft, fg: C.bad },
    warn: { bg: C.warnSoft, fg: C.warn },
  }[tone];
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.statusButton,
        {
          backgroundColor: active ? colors.bg : '#F5F5F2',
          borderColor: active ? colors.fg : C.line,
        },
      ]}
    >
      <Text style={[styles.statusButtonText, { color: active ? colors.fg : C.muted }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: C.bg,
  },
  content: {
    width: '100%',
    maxWidth: 980,
    alignSelf: 'center',
    padding: 18,
    paddingBottom: 42,
    gap: 16,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: C.paper,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 12,
    padding: 18,
  },
  heroIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: C.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {
    flex: 1,
  },
  kicker: {
    color: C.accent,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 4,
  },
  title: {
    color: C.ink,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 5,
  },
  lead: {
    color: C.muted,
    fontSize: 14,
    lineHeight: 22,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: C.warnSoft,
    borderWidth: 1,
    borderColor: '#E7C5AD',
    borderRadius: 10,
    padding: 12,
  },
  warningText: {
    flex: 1,
    color: C.ink,
    fontSize: 13,
    lineHeight: 20,
  },
  grid: {
    gap: 14,
  },
  panel: {
    backgroundColor: C.panel,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  panelTitle: {
    color: C.ink,
    fontSize: 18,
    fontWeight: '900',
  },
  panelText: {
    color: C.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: C.accent,
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 14,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: C.accentSoft,
    borderWidth: 1,
    borderColor: C.accent,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  secondaryButtonText: {
    color: C.accent,
    fontSize: 14,
    fontWeight: '900',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressText: {
    color: C.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  textArea: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 10,
    padding: 12,
    color: C.ink,
    backgroundColor: '#FFFEFA',
    textAlignVertical: 'top',
    fontSize: 14,
    lineHeight: 21,
  },
  answerArea: {
    minHeight: 76,
  },
  levelPanel: {
    backgroundColor: C.paper,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'center',
  },
  levelTitle: {
    color: C.ink,
    fontSize: 30,
    fontWeight: '900',
  },
  levelBadge: {
    color: C.accent,
    backgroundColor: C.accentSoft,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 13,
    fontWeight: '900',
    maxWidth: 220,
    textAlign: 'center',
  },
  levelTrack: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#DCE4E0',
    overflow: 'hidden',
  },
  levelFill: {
    height: '100%',
    borderRadius: 6,
    backgroundColor: C.accent,
  },
  levelDescription: {
    color: C.ink,
    fontSize: 15,
    lineHeight: 23,
  },
  nextInputBox: {
    backgroundColor: '#F6FAF8',
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 10,
    padding: 12,
    gap: 4,
  },
  nextInputTitle: {
    color: C.ink,
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 2,
  },
  nextInputText: {
    color: C.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  sectionHeader: {
    gap: 10,
  },
  sectionTitle: {
    color: C.ink,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 4,
  },
  summaryGrid: {
    gap: 10,
  },
  summaryCard: {
    backgroundColor: C.panel,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 10,
    padding: 12,
    gap: 6,
  },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  summarySubject: {
    color: C.ink,
    fontSize: 16,
    fontWeight: '900',
  },
  summaryLevel: {
    color: C.accent,
    fontSize: 14,
    fontWeight: '900',
  },
  summaryStats: {
    color: C.muted,
    fontSize: 13,
  },
  summaryFocus: {
    color: C.ink,
    fontSize: 14,
    lineHeight: 20,
  },
  filterRow: {
    gap: 8,
    paddingVertical: 2,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: C.panel,
  },
  filterChipActive: {
    backgroundColor: C.accent,
    borderColor: C.accent,
  },
  filterText: {
    color: C.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  filterTextActive: {
    color: '#fff',
  },
  questionList: {
    gap: 10,
  },
  questionCard: {
    backgroundColor: C.panel,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 10,
    padding: 12,
    gap: 9,
  },
  questionTop: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  questionNo: {
    color: C.ink,
    fontSize: 17,
    fontWeight: '900',
  },
  questionSubject: {
    color: C.muted,
    fontSize: 12,
    fontWeight: '800',
  },
  answerBadge: {
    color: C.accent,
    backgroundColor: C.accentSoft,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: '900',
  },
  userAnswerBadge: {
    color: C.warn,
    backgroundColor: C.warnSoft,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: '900',
  },
  questionText: {
    color: C.ink,
    fontSize: 14,
    lineHeight: 21,
  },
  textbookCard: {
    backgroundColor: C.paper,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 10,
    padding: 12,
    gap: 9,
  },
  textbookTitle: {
    color: C.ink,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '900',
  },
  textbookFocus: {
    color: C.muted,
    backgroundColor: '#F6FAF8',
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 8,
    padding: 10,
    fontSize: 13,
    lineHeight: 20,
  },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  statusButtonText: {
    fontSize: 13,
    fontWeight: '900',
  },
  emptyBox: {
    alignItems: 'flex-start',
    backgroundColor: C.panel,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  emptyTitle: {
    color: C.ink,
    fontSize: 17,
    fontWeight: '900',
  },
  emptyText: {
    color: C.muted,
    fontSize: 14,
    lineHeight: 21,
  },
});
