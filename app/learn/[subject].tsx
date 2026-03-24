import { applyTTSRules } from '@/utils/tts-rules';
import { Link, router, useLocalSearchParams } from 'expo-router';
import * as Speech from 'expo-speech';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Image, Modal, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { LexiconText, stripLexiconMarkupForPlain } from '@/components/lexicon-text';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { characterPlaceholders, defaultCharacterMap, useCharacter } from '@/src/context/CharacterContext';
import { useLearnPlayback } from '@/src/context/LearnPlaybackContext';
import { useTheme } from '@/src/context/ThemeContext';
import { IMAGE_RESOURCES_MAP } from '@/src/imageMap';
import { mergedDeepdiveHasResolvableImage, pickAutoLearnDeepdiveImageKey } from '@/src/deepdiveLearnAutoImage';
import { resolveImageAsset } from '@/src/resolveImageAsset';
import { LEARN_CONTENT, LEARN_DEEPDIVE, LEARN_SOURCE } from '@/src/learn';
import { setDeepdiveParams } from '@/src/deepdiveState';
import { PIN_CASES } from '@/src/pinData';
import { SUBJECTS } from '@/src/questions';
import { getLearnNotes, LearnNote, saveLearnNotes } from '@/utils/learn-notes';
import { addPoints } from '@/utils/points';
import { getStickyNotes, toggleStickyNote } from '@/utils/sticky-notes';
import { MaterialIcons } from '@expo/vector-icons';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

// @ts-ignore

const LAW_MAP: { [key: string]: string } = {
  '行審法': '/statutes/administrative/appeal',
  '行政不服審査法': '/statutes/administrative/appeal',
  '行手法': '/statutes/administrative/procedure',
  '行政手続法': '/statutes/administrative/procedure',
  '行訴法': '/statutes/administrative/litigation',
  '行政事件訴訟法': '/statutes/administrative/litigation',
  '国賠法': '/statutes/administrative/redress',
  '国家賠償法': '/statutes/administrative/redress',
  '地自法': '/statutes/administrative/autonomy',
  '地方自治法': '/statutes/administrative/autonomy',
  '憲法': '/statutes/constitution',
  '商法': '/statutes/commercial',
  '会社法': '/statutes/commercial',
};

const getCivilPath = (articleNum: number): string => {
  if (articleNum <= 174) return '/statutes/civil/general';
  if (articleNum <= 398) return '/statutes/civil/rights';
  if (articleNum <= 520) return '/statutes/civil/claims_general';
  if (articleNum <= 724) return '/statutes/civil/claims_particular';
  return '/statutes/civil/family';
};

/** 多肢選択: LEARN_* はシート行順で「憲法ブロック→行政法ブロック」と SUBJECTS の件数に対応させてスライス */
function sliceTashiSyncedByField<T>(
  full: T[],
  field: string | undefined,
  kenLen: number,
  gyoLen: number
): T[] {
  if (!field) return full;
  if (field === '憲法') return full.slice(0, kenLen);
  if (field === '行政法') return full.slice(kenLen, kenLen + gyoLen);
  return full;
}

export default function LearnSubjectScreen() {
  const params = useLocalSearchParams<{ subject?: string; index?: string; field?: string }>();
  const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;
  const fieldParam = Array.isArray(params.field) ? params.field[0] : params.field;
  const tashiField = fieldParam === '憲法' || fieldParam === '行政法' ? fieldParam : undefined;
  const initialIndex = parseInt(params.index || '0', 10);

  const tashiKenGyoLens = useMemo(() => {
    const t = (SUBJECTS as any)['多肢選択'];
    if (!t) return { ken: 0, gyo: 0 };
    return {
      ken: Array.isArray(t['憲法']) ? t['憲法'].length : 0,
      gyo: Array.isArray(t['行政法']) ? t['行政法'].length : 0,
    };
  }, []);

  const learnScopeKey =
    subject === '多肢選択' && tashiField ? `多肢選択:${tashiField}` : subject || '';

  const flattenedSubjectQuestions = useMemo(() => {
    if (!subject) return [];
    let subjectQuestions = (SUBJECTS as any)[subject];
    if (!subjectQuestions && subject === '行政法総合') {
      subjectQuestions = (SUBJECTS as any)['行政法']?.[subject];
    }
    if (!subjectQuestions || typeof subjectQuestions !== 'object') return [];
    if (subject === '多肢選択' && tashiField && Array.isArray((subjectQuestions as any)[tashiField])) {
      return (subjectQuestions as any)[tashiField] as any[];
    }
    return Object.values(subjectQuestions).flatMap((questions: any) => Array.isArray(questions) ? questions : []);
  }, [subject, tashiField]);

  // 多肢選択: syncLearn で「多肢選択憲法」「多肢選択行政法」シート → LEARN_CONTENT の別キー。無い場合は従来の「多肢選択」マージ＋件数スライス。
  const contentList = useMemo(() => {
    if (subject === '多肢選択') {
      if (tashiField === '憲法') {
        const raw = (LEARN_CONTENT as any)['多肢選択憲法'];
        const arr = Array.isArray(raw) ? raw : raw ? [raw] : [];
        if (arr.length > 0) return arr;
      } else if (tashiField === '行政法') {
        const raw = (LEARN_CONTENT as any)['多肢選択行政法'];
        const arr = Array.isArray(raw) ? raw : raw ? [raw] : [];
        if (arr.length > 0) return arr;
      } else {
        const ken = (LEARN_CONTENT as any)['多肢選択憲法'];
        const gyo = (LEARN_CONTENT as any)['多肢選択行政法'];
        const a = Array.isArray(ken) ? ken : [];
        const b = Array.isArray(gyo) ? gyo : [];
        if (a.length + b.length > 0) return [...a, ...b];
      }
      const rawTashi = (LEARN_CONTENT as any)['多肢選択'];
      const fromLearnFull = Array.isArray(rawTashi) ? rawTashi : rawTashi ? [rawTashi] : [];
      const fromLearn =
        fromLearnFull.length > 0
          ? sliceTashiSyncedByField(fromLearnFull, tashiField, tashiKenGyoLens.ken, tashiKenGyoLens.gyo)
          : [];
      if (fromLearn.length > 0) return fromLearn;
      return flattenedSubjectQuestions.map((q: any) => q?.text || '').filter(Boolean);
    }
    const rawContent = subject ? (LEARN_CONTENT as any)[subject] : [];
    let fromLearn = Array.isArray(rawContent) ? rawContent : (rawContent ? [rawContent] : []);
    // 旧 sync: キー「民法総論」→ アプリは「民法総則」で遷移
    if (fromLearn.length === 0 && subject === '民法総則') {
      const legacy = (LEARN_CONTENT as any)['民法総論'];
      fromLearn = Array.isArray(legacy) ? legacy : legacy ? [legacy] : [];
    }
    if (fromLearn.length > 0) return fromLearn;
    const fallbackSubjects = ['基礎法学', '商法・会社法'];
    if (fallbackSubjects.includes(subject || '') && flattenedSubjectQuestions.length > 0) {
      return flattenedSubjectQuestions.map((q: any) => q?.text || '').filter(Boolean);
    }
    return fromLearn;
  }, [subject, flattenedSubjectQuestions, tashiField, tashiKenGyoLens.ken, tashiKenGyoLens.gyo]);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [currentReadCount, setCurrentReadCount] = useState(1); // Counter for the 3 repeats
  const [readCount, setReadCount] = useState(0); // Cumulative total count (optional, but keep for UI)
  const {
    isPlaying,
    setIsPlaying,
    playbackRate,
    setPlaybackRate,
    spokenIndex,
    setSpokenIndex,
    setLearnScreenMounted,
    registerManualNav,
    togglePlay,
  } = useLearnPlayback();
  const [isSticky, setIsSticky] = useState(false);
  const [isPriorityMode, setIsPriorityMode] = useState(false);
  const [notes, setNotes] = useState<LearnNote[]>([]);
  const [isCharacterModalVisible, setIsCharacterModalVisible] = useState(false);
  const [dictionaryEntry, setDictionaryEntry] = useState<{ word: string; def: string } | null>(null);

  const { characterMap, updateCharacterName, applyCharacterNames } = useCharacter();


  const { theme, colors } = useTheme();

  useEffect(() => {
    setLearnScreenMounted(true);
    return () => setLearnScreenMounted(false);
  }, [setLearnScreenMounted]);

  // Stop speech when leaving screen
  useEffect(() => {
    if (learnScopeKey) {
      const stickyList = getStickyNotes(learnScopeKey);
      setIsSticky(stickyList.includes(currentIndex));
      setNotes(getLearnNotes(learnScopeKey, currentIndex));
    }
  }, [currentIndex, learnScopeKey]);

  // アンマウント時は停止しない（ページ遷移で音声を継続させるため）
  useEffect(() => {
    return () => { /* Speech.stop() removed for continuity */ };
  }, []);

  const handleBasisPress = () => {
    if (!basisText) return;

    // 1. 条文番号を含む場合 (Statute Link)
    // Regex to match Law name and Article number
    // Example: ※行審法25条4項 -> law: 行審法, article: 25
    const match = basisText.match(/※?(.+?)(\d+)条/);
    if (match) {
      const lawName = match[1].trim();
      const articleNumStr = match[2];
      const articleNum = parseInt(articleNumStr, 10);

      let path = LAW_MAP[lawName];
      // Special logic for Civil Law (split into multiple screens)
      if (!path && (lawName === '民法' || lawName.includes('民法'))) {
        path = getCivilPath(articleNum);
      }

      if (path) {
        // setIsPlaying(false); // 条文表示へ行くときは音声を継続させる
        // Speech.stop();
        router.push({
          pathname: path as any,
          params: {
            q: articleNumStr + '条',
            returnPath: tashiField
              ? `/learn/${subject}?field=${encodeURIComponent(tashiField)}`
              : `/learn/${subject}`,
            returnSubject: subject,
            returnIndex: currentIndex.toString()
          }
        });
        return;
      }
    }

    // 2. 判例引用の場合 (Case Link)
    // Example: ※最判昭42.5.24 -> Search in PIN_CASES
    const cleanBasis = basisText.replace('※', '').trim();
    const foundCase = PIN_CASES.find(c => {
      // タイトル、またはコンテンツ内の日付文字列などと一致するか確認
      // コンテンツ内には <h3>朝日訴訟 (最判昭42.5.24)</h3> のように含まれていることが多い
      return c.title.includes(cleanBasis) || c.content.includes(cleanBasis);
    });

    if (foundCase) {
      // setIsPlaying(false); // 判例表示へ行くときは音声を継続させる
      // Speech.stop();
      // Navigate to /pin/[category]/[id]
      router.push(`/pin/${foundCase.category}/${foundCase.id}` as any);
    }
  };

  // 優先モード用のリスト構成
  const displayContentList = isPriorityMode && learnScopeKey
    ? [
      ...contentList.filter((_, i) => getStickyNotes(learnScopeKey).includes(i)),
      ...contentList.filter((_, i) => !getStickyNotes(learnScopeKey).includes(i))
    ]
    : contentList;

  // 優先モード時に元の contentList インデックスを復元するためのマッピング
  const displayIndexList = useMemo(() => {
    if (isPriorityMode && learnScopeKey) {
      const stickyList = getStickyNotes(learnScopeKey);
      return [
        ...contentList.map((_, i) => i).filter((i) => stickyList.includes(i)),
        ...contentList.map((_, i) => i).filter((i) => !stickyList.includes(i)),
      ];
    }
    return contentList.map((_, i) => i);
  }, [isPriorityMode, learnScopeKey, contentList]);

  const originalContentIndex = displayIndexList[currentIndex] ?? currentIndex;

  const currentDisplayContent = displayContentList[currentIndex] || '';
  const isLastItem = currentIndex >= displayContentList.length - 1;

  // B列由来（LEARN_DEEPDIVE）。多肢選択はシート別キー優先、なければマージ「多肢選択」をスライス
  const deepdiveTashiSlice = useMemo(() => {
    if (subject !== '多肢選択') return null;
    if (tashiField === '憲法') {
      const d = (LEARN_DEEPDIVE as any)?.['多肢選択憲法'];
      if (Array.isArray(d) && d.length > 0) return d;
    } else if (tashiField === '行政法') {
      const d = (LEARN_DEEPDIVE as any)?.['多肢選択行政法'];
      if (Array.isArray(d) && d.length > 0) return d;
    } else {
      const ken = (LEARN_DEEPDIVE as any)?.['多肢選択憲法'];
      const gyo = (LEARN_DEEPDIVE as any)?.['多肢選択行政法'];
      const a = Array.isArray(ken) ? ken : [];
      const b = Array.isArray(gyo) ? gyo : [];
      if (a.length + b.length > 0) return [...a, ...b];
    }
    const full = (LEARN_DEEPDIVE as any)?.['多肢選択'];
    const arr = Array.isArray(full) ? full : [];
    return sliceTashiSyncedByField(arr, tashiField, tashiKenGyoLens.ken, tashiKenGyoLens.gyo);
  }, [subject, tashiField, tashiKenGyoLens.ken, tashiKenGyoLens.gyo]);

  const deepdiveContent: string =
    subject === '多肢選択' && deepdiveTashiSlice
      ? deepdiveTashiSlice[originalContentIndex] || ''
      : (LEARN_DEEPDIVE as any)?.[subject as string]?.[originalContentIndex] || '';

  const deepdiveColumnArr: string[] = useMemo(() => {
    if (subject === '多肢選択' && deepdiveTashiSlice) return deepdiveTashiSlice;
    const raw = subject ? (LEARN_DEEPDIVE as any)[subject] : [];
    return Array.isArray(raw) ? raw : [];
  }, [subject, deepdiveTashiSlice]);

  const learnSourceSheetLabel = useMemo(() => {
    if (subject === '多肢選択') {
      if (tashiField === '憲法') {
        const arr = (LEARN_SOURCE as any)?.['多肢選択憲法'];
        if (Array.isArray(arr) && arr.length > 0) return arr[originalContentIndex];
      } else if (tashiField === '行政法') {
        const arr = (LEARN_SOURCE as any)?.['多肢選択行政法'];
        if (Array.isArray(arr) && arr.length > 0) return arr[originalContentIndex];
      } else {
        const ken = (LEARN_SOURCE as any)?.['多肢選択憲法'];
        const gyo = (LEARN_SOURCE as any)?.['多肢選択行政法'];
        const a = Array.isArray(ken) ? ken : [];
        const b = Array.isArray(gyo) ? gyo : [];
        if (a.length + b.length > 0) {
          const merged = [...a, ...b];
          return merged[originalContentIndex];
        }
      }
      const full = (LEARN_SOURCE as any)?.['多肢選択'];
      const arr = Array.isArray(full) ? full : [];
      const sliced = sliceTashiSyncedByField(arr, tashiField, tashiKenGyoLens.ken, tashiKenGyoLens.gyo);
      return sliced[originalContentIndex];
    }
    return (LEARN_SOURCE as any)?.[subject as string]?.[originalContentIndex];
  }, [subject, tashiField, tashiKenGyoLens.ken, tashiKenGyoLens.gyo, originalContentIndex]);

  // Extract LINK tag first if present
  const linkMatch = currentDisplayContent.match(/\[\[LINK:(.+?)\]\]/);
  const digDeeperUrl = linkMatch ? linkMatch[1] : null;

  // Extract image tag（deepdive / chunk / descriptive / imageMap のいずれかにあれば表示可能）
  const imageMatch = currentDisplayContent.match(/\[\[image:(.*?)\]\]/);
  const currentImageName = imageMatch ? imageMatch[1].split(' ')[0].trim() : null;
  const hasImageTagInCard = /\[\[image:[^\]]+\]\]/.test(currentDisplayContent);
  const hasValidImage = !!(currentImageName && resolveImageAsset(currentImageName));

  // Remove LINK and IMAGE tags from content for display processing
  const contentToProcess = currentDisplayContent
    .replace(/\[\[LINK:.+?\]\]/g, '')
    .replace(/\[\[image:.+?\]\]/g, '');

  const [mainTextRaw, basisText] = contentToProcess.includes('※')
    ? [contentToProcess.split('※')[0], '※' + contentToProcess.split('※')[1]]
    : [contentToProcess, ''];
  const mainText = mainTextRaw.trim();


  // Check for chunks in SUBJECTS
  let foundQuestion: any = null;
  if (subject === '多肢選択') {
    foundQuestion = flattenedSubjectQuestions[originalContentIndex] || null;
  } else if (subject) {
    for (const category of Object.values(SUBJECTS as any)) {
      if ((category as any)[subject]) {
        foundQuestion = (category as any)[subject]?.[currentIndex];
        break;
      }
    }
  }
  const hasChunks = foundQuestion?.chunks && foundQuestion.chunks.length > 0;

  /** A列の [[image:…]] を B列（LEARN_DEEPDIVE）と結合して渡す（従来は B のみで A の画像が落ちていた） */
  const buildMergedDeepdivePayload = (): string => {
    const fromB = (deepdiveContent || '').trim();
    const tagsInA = currentDisplayContent.match(/\[\[image:[^\]]+\]\]/g) || [];
    const parts: string[] = [];
    if (fromB) parts.push(fromB);
    for (const tag of tagsInA) {
      if (!fromB.includes(tag)) parts.push(tag);
    }
    let merged = parts.join('\n\n');
    if (merged.trim() && !mergedDeepdiveHasResolvableImage(merged)) {
      const autoKey = pickAutoLearnDeepdiveImageKey(
        originalContentIndex,
        fromB,
        deepdiveColumnArr,
        contentList as string[]
      );
      if (autoKey) merged = `[[image:${autoKey}]]\n\n${merged}`;
    }
    return merged;
  };

  const handleOpenDeepDive = () => {
    const mergedPayload = buildMergedDeepdivePayload();
    if ((!mergedPayload && !digDeeperUrl && !hasChunks && !hasValidImage && !hasImageTagInCard) || !subject) return;

    // B列＋A列の [[image:…]] を結合して「もっと深掘る」へ
    if (mergedPayload) {
      setDeepdiveParams(mergedPayload, '', { fromLearn: true });
      router.push({ pathname: '/deepdive' as any, params: { content: mergedPayload, choiceLabel: '' } });
      return;
    }

    // [[LINK:/columns/...]] など URL パスの場合はそのまま遷移
    if (digDeeperUrl && digDeeperUrl.startsWith('/')) {
      router.push(digDeeperUrl as any);
      return;
    }

    // chunks がある場合、または数値インデックスの場合は reference ページへ
    let questionIndex = -1;
    if (digDeeperUrl) {
      questionIndex = parseInt(digDeeperUrl, 10);
    } else {
      questionIndex = currentIndex;
    }

    if (isNaN(questionIndex)) return;

    router.push({
      pathname: `/learn/reference/[subject]/[id]` as any,
      params: {
        subject: subject,
        id: questionIndex,
        originSubject: subject,
        originId: questionIndex,
        originIndex: currentIndex
      }
    });
  };

  const handleManualNext = useCallback(() => {
    setIsPlaying(false);
    if (isLastItem) {
      addPoints(1);
      alert('学習完了！ +1ポイント');
      router.back();
    } else {
      setCurrentIndex(currentIndex + 1);
      setCurrentReadCount(1);
      setSpokenIndex(0);
    }
  }, [isLastItem, currentIndex, addPoints, router, setIsPlaying, setSpokenIndex]);

  const handleManualPrev = useCallback(() => {
    setIsPlaying(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentReadCount(1);
      setSpokenIndex(0);
    }
  }, [currentIndex, setIsPlaying, setSpokenIndex]);

  useEffect(() => {
    registerManualNav({
      manualPrev: handleManualPrev,
      manualNext: handleManualNext,
    });
  }, [registerManualNav, handleManualPrev, handleManualNext]);

  // Continuous Playback Effect
  useEffect(() => {
    if (isPlaying && currentDisplayContent) {
      const speakCurrent = async () => {
        await Speech.stop();
        setSpokenIndex(0);

        const currentMainText = currentDisplayContent.includes('※')
          ? currentDisplayContent.split('※')[0]
          : currentDisplayContent;

        // [[dict:語::説明]] は読み上げでは語だけ。他の [[...]] は除去
        const basePlainForSync = stripLexiconMarkupForPlain(currentMainText).replace(/\[\[.*?\]\]/g, '');
        let processedText = applyCharacterNames(basePlainForSync);

        const spokenText = applyTTSRules(processedText);

        if (!spokenText.trim()) {
          console.log("Empty spoken text, stopping");
          setIsPlaying(false);
          return;
        }

        // Small delay to ensure previous speech is fully stopped and engine is ready
        await new Promise(resolve => setTimeout(resolve, 200));

        Speech.speak(spokenText, {
          language: 'ja-JP',
          rate: playbackRate,
          onBoundary: (event: any) => {
            if (isPlaying && event.charIndex !== undefined) {
              setSpokenIndex(event.charIndex);
            }
          },
          onDone: () => {
            if (!isPlaying) return;

            setSpokenIndex(basePlainForSync.length);
            // Wait even less after completion for tighter feedback
            setTimeout(() => {
              if (currentReadCount < 3) {
                setCurrentReadCount(prev => prev + 1);
                setReadCount(prev => prev + 1);
              } else {
                if (isLastItem) {
                  setIsPlaying(false);
                  addPoints(1);
                  alert('学習完了！ +1ポイント');
                  router.back();
                } else {
                  setCurrentIndex(prev => prev + 1);
                  setCurrentReadCount(1);
                  setReadCount(prev => prev + 1);
                }
              }
            }, 50); // Reduced from 100ms
          },
          onError: (e) => {
            console.log("TTS Error:", e);
            setIsPlaying(false);
          },
        });
      };

      speakCurrent();
    } else {
      Speech.stop();
    }
  }, [isPlaying, currentDisplayContent, playbackRate, currentReadCount, isLastItem, currentIndex, addPoints, router]);

  const handleToggleSticky = () => {
    if (learnScopeKey) {
      const newState = toggleStickyNote(learnScopeKey, currentIndex);
      setIsSticky(newState);
    }
  };

  const handleTogglePriorityMode = () => {
    setIsPriorityMode(!isPriorityMode);
    setCurrentIndex(0);
    setCurrentReadCount(1);
    setIsPlaying(false);
  };

  const handleAddNote = () => {
    const newNote: LearnNote = {
      id: Math.random().toString(36).substr(2, 9),
      text: '',
      x: 50, // 初期位置を少し左上に
      y: 50,
      width: 200, // 初期サイズ（横長）
      height: 80, // 高さを少し抑える
    };
    const updated = [...notes, newNote];
    setNotes(updated);
    if (learnScopeKey) saveLearnNotes(learnScopeKey, currentIndex, updated);
  };

  const updateNoteText = (id: string, text: string) => {
    const updated = notes.map(n => n.id === id ? { ...n, text } : n);
    setNotes(updated);
    if (learnScopeKey) saveLearnNotes(learnScopeKey, currentIndex, updated);
  };

  const updateNotePosition = (id: string, x: number, y: number) => {
    const updated = notes.map(n => n.id === id ? { ...n, x, y } : n);
    setNotes(updated);
    if (learnScopeKey) saveLearnNotes(learnScopeKey, currentIndex, updated);
  };

  const updateNoteSize = (id: string, width: number, height: number) => {
    const updated = notes.map(n => n.id === id ? { ...n, width, height } : n);
    setNotes(updated);
    if (learnScopeKey) saveLearnNotes(learnScopeKey, currentIndex, updated);
  };

  const deleteNote = (id: string) => {
    if (Platform.OS === 'web') {
      if (!confirm('このメモを削除してもよろしいですか？')) return;
    } else {
      Alert.alert(
        "メモの削除",
        "このメモを削除してもよろしいですか？",
        [
          {
            text: "キャンセル",
            style: "cancel"
          },
          {
            text: "削除", onPress: () => {
              const updated = notes.filter(n => n.id !== id);
              setNotes(updated);
              if (learnScopeKey) saveLearnNotes(learnScopeKey, currentIndex, updated);
            }
          }
        ]
      );
      return;
    }
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    if (learnScopeKey) saveLearnNotes(learnScopeKey, currentIndex, updated);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ gap: 16, paddingBottom: 100 }} // メモを置くスペースを考慮して下部に余白
          showsVerticalScrollIndicator={false}
        >
          {/* シークバー（ナビゲーター） */}
          <SeekBar
            currentIndex={currentIndex}
            totalCount={displayContentList.length}
            onSeek={(index) => {
              setIsPlaying(false);
              setCurrentIndex(index);
              setCurrentReadCount(1);
              setSpokenIndex(0);
            }}
            colors={colors}
          />

          <ThemedView style={styles.headerRow}>
            <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'transparent' }}>
              <ThemedText type="title">
                {subject}{tashiField ? `・${tashiField}` : ''}
                {learnSourceSheetLabel === '行政代執行法' ? '（行政代執行法）' : ''} ({currentIndex + 1}/{displayContentList.length})
              </ThemedText>
              <ThemedView style={styles.bulbContainer}>
                {[1, 2, 3].map((num) => (
                  <MaterialIcons
                    key={num}
                    name="fiber-manual-record"
                    size={20}
                    color={currentReadCount >= num ? "#28A745" : "#E0E0E0"}
                  />
                ))}
              </ThemedView>
            </ThemedView>
            <ThemedView style={{ flexDirection: 'row', gap: 8, backgroundColor: 'transparent' }}>
              <Pressable
                style={styles.stickyButton}
                onPress={handleAddNote}
              >
                <MaterialIcons name="note-add" size={20} color={colors.text} />
                <ThemedText style={styles.stickyText}>メモ追加</ThemedText>
              </Pressable>
              <Pressable
                style={[styles.stickyButton, isSticky && styles.stickyButtonActive]}
                onPress={handleToggleSticky}
              >
                <MaterialIcons
                  name={isSticky ? "bookmark" : "bookmark-border"}
                  size={20}
                  color={isSticky ? "#FFD700" : colors.text}
                />
                <ThemedText style={[styles.stickyText, isSticky && styles.stickyTextActive]}>付箋</ThemedText>
              </Pressable>

              {/* Character Settings Button */}
              <Pressable
                style={styles.stickyButton}
                onPress={() => setIsCharacterModalVisible(true)}
              >
                <MaterialIcons name="people" size={20} color={colors.text} />
                <ThemedText style={styles.stickyText}>登場人物</ThemedText>
              </Pressable>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.contentContainer}>

            <LexiconText
              text={mainText}
              lineStyle={styles.content}
              readStyle={{ color: colors.primary, fontWeight: 'bold' }}
              spokenIndex={spokenIndex}
              applyNames={applyCharacterNames}
              onDictionaryPress={(word, def) => setDictionaryEntry({ word, def })}
            />
            {basisText ? (
              <Pressable onPress={handleBasisPress}>
                <ThemedText style={[styles.basisText, { color: '#007BFF', textDecorationLine: 'underline' }]}>
                  {basisText.replace('※', '関連条文')}
                </ThemedText>
              </Pressable>
            ) : null}

            {/* Case Title (事件名・訴訟名) - from chunks[0].title, only show if ends with 事件 or 訴訟 */}
            {(() => {
              const caseTitle = foundQuestion?.chunks?.[0]?.title || '';
              const isLegalCase = caseTitle.endsWith('事件') || caseTitle.endsWith('訴訟');
              return isLegalCase ? (
                <ThemedText style={styles.caseTitleText}>
                  {caseTitle}
                </ThemedText>
              ) : null;
            })()}

            {/* Past Question Button (Visible only for Constitution index 3) */}
            {subject === '憲法' && currentIndex === 3 ? (
              <Pressable
                style={styles.pastQuestionButton}
                onPress={() => {
                  router.push('/learn/past/sunagawa');
                }}
              >
                <MaterialIcons name="quiz" size={18} color="#007BFF" />
                <ThemedText style={styles.pastQuestionText}>過去問</ThemedText>
              </Pressable>
            ) : null}
          </ThemedView>

          {/* Control Buttons (前へ、再生、次へ) */}
          <ThemedView style={styles.controlsRow}>
            <Pressable
              style={[styles.prevButton, currentIndex === 0 && styles.disabledButton]}
              onPress={handleManualPrev}
              disabled={currentIndex === 0}
            >
              <ThemedText type="defaultSemiBold" style={currentIndex === 0 ? { color: '#999' } : {}}>前へ</ThemedText>
            </Pressable>

            <Pressable
              style={[styles.playButton, isPlaying ? styles.stopButton : styles.startButton]}
              onPress={togglePlay}
            >
              <ThemedText type="defaultSemiBold" style={{ color: '#fff' }}>
                {isPlaying ? '■ 停止' : '▶ 再生'}
              </ThemedText>
            </Pressable>

            <Pressable style={isLastItem ? styles.completeButton : styles.nextButton} onPress={handleManualNext}>
              <ThemedText type="defaultSemiBold">{isLastItem ? '完了' : '次へ'}</ThemedText>
            </Pressable>
          </ThemedView>

          {/* Speed Controls */}
          <ThemedView style={styles.speedContainer}>
            <ThemedText>速度: </ThemedText>
            {[1.0, 1.5, 2.0, 2.5, 3.0].map((rate) => (
              <Pressable
                key={rate}
                style={[styles.speedButton, playbackRate === rate && styles.speedButtonActive]}
                onPress={() => setPlaybackRate(rate)}
              >
                <ThemedText style={[styles.speedText, playbackRate === rate && styles.speedTextActive]}>
                  x{rate.toFixed(1)}
                </ThemedText>
              </Pressable>
            ))}

            {/* Deep Dive Button (Moved inside speedContainer) */}
            {(deepdiveContent || digDeeperUrl || hasChunks || hasValidImage) ? (
              <Pressable style={styles.digDeeperButtonSmall} onPress={handleOpenDeepDive}>
                <MaterialIcons
                  name={(digDeeperUrl === '54' && subject === '民法総則') ? "brush" : "article"}
                  size={16}
                  color="#fff"
                />
                <ThemedText style={styles.digDeeperTextSmall}>
                  {(digDeeperUrl === '54' && subject === '民法総則') ? "絵で覚える" : "もっと深掘る"}
                </ThemedText>
              </Pressable>
            ) : null}

            <Pressable
              style={[styles.priorityButton, isPriorityMode && styles.priorityButtonActive]}
              onPress={handleTogglePriorityMode}
            >
              <MaterialIcons
                name={isPriorityMode ? "star" : "star-border"}
                size={18}
                color={isPriorityMode ? "#fff" : colors.text}
              />
              <ThemedText style={[styles.priorityText, isPriorityMode && styles.priorityTextActive]}>付箋優先</ThemedText>
            </Pressable>
          </ThemedView>

          <Link href="/learn" replace asChild>
            <Pressable
              onPress={() => Speech.stop()} // 学習フロー外に出るときは止める
              style={StyleSheet.flatten([
                styles.navLinkButton,
                {
                  borderColor: '#5A9BD5',
                  marginTop: 24,
                  marginBottom: 12
                }
              ])}>
              <ThemedText type="defaultSemiBold" style={{ color: '#5A9BD5' }}>科目選択</ThemedText>
            </Pressable>
          </Link>
          <Link href="/" replace asChild>
            <Pressable
              onPress={() => Speech.stop()} // 学習フロー外に出るときは止める
              style={StyleSheet.flatten([
                styles.navLinkButton,
                {
                  borderColor: '#757575',
                  marginBottom: 40
                }
              ])}>
              <ThemedText type="defaultSemiBold" style={{ color: '#757575' }}>メインメニューへ</ThemedText>
            </Pressable>
          </Link>
        </ScrollView>

        {/* ドラッグ可能なメモ一覧 */}
        {notes.map(note => (
          <DraggableNote
            key={note.id}
            note={note}
            onUpdatePosition={(x, y) => updateNotePosition(note.id, x, y)}
            onUpdateSize={(w, h) => updateNoteSize(note.id, w, h)}
            onUpdateText={(text) => updateNoteText(note.id, text)}
            onDelete={() => deleteNote(note.id)}
            themeColors={colors}
          />
        ))}

        {/* Character Settings Modal */}
        <Modal
          visible={dictionaryEntry !== null}
          transparent
          animationType="fade"
          onRequestClose={() => setDictionaryEntry(null)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.45)',
              padding: 24,
            }}
          >
            <ThemedView
              style={{
                maxWidth: 420,
                width: '100%',
                maxHeight: '70%',
                padding: 20,
                borderRadius: 14,
                backgroundColor: colors.card,
              }}
            >
              <ThemedText type="subtitle" style={{ marginBottom: 10, color: '#007BFF' }}>
                {dictionaryEntry?.word}
              </ThemedText>
              <ScrollView style={{ maxHeight: 320 }} showsVerticalScrollIndicator>
                <ThemedText style={{ lineHeight: 26, fontSize: 16 }}>
                  {dictionaryEntry?.def?.trim()}
                </ThemedText>
              </ScrollView>
              <Pressable
                style={{ marginTop: 16, backgroundColor: colors.primary, padding: 12, borderRadius: 8, alignItems: 'center' }}
                onPress={() => setDictionaryEntry(null)}
              >
                <ThemedText style={{ color: '#fff', fontWeight: 'bold' }}>閉じる</ThemedText>
              </Pressable>
            </ThemedView>
          </View>
        </Modal>

        {isCharacterModalVisible && (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }]}>
            <ThemedView style={{ width: '80%', padding: 20, borderRadius: 10, backgroundColor: colors.card, maxHeight: '80%' }}>
              <ThemedText type="subtitle" style={{ marginBottom: 15 }}>登場人物の設定</ThemedText>
              <ScrollView style={{ marginBottom: 15 }}>
                {Object.entries(characterMap).map(([original, current]) => (
                  <View key={original} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <ThemedText style={{ width: 80, textAlign: 'center', fontWeight: 'bold' }}>
                      {defaultCharacterMap[original] || original}
                    </ThemedText>
                    <MaterialIcons name="arrow-forward" size={16} color={colors.text} style={{ marginHorizontal: 5 }} />
                    <TextInput
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: colors.choiceBorder,
                        borderRadius: 5,
                        padding: 8,
                        color: colors.text,
                        backgroundColor: colors.background
                      }}
                      value={current === defaultCharacterMap[original] ? '' : current}
                      placeholder={characterPlaceholders[original]}
                      placeholderTextColor={colors.subText || "#999"}
                      onChangeText={(text) => updateCharacterName(original, text)}
                    />
                  </View>
                ))}
              </ScrollView>
              <Pressable
                style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 5, alignItems: 'center' }}
                onPress={() => setIsCharacterModalVisible(false)}
              >
                <ThemedText style={{ color: '#fff', fontWeight: 'bold' }}>閉じる</ThemedText>
              </Pressable>
            </ThemedView>
          </View>
        )}
      </ThemedView>

    </GestureHandlerRootView>
  );
}

function SeekBar({
  currentIndex,
  totalCount,
  onSeek,
  colors
}: {
  currentIndex: number,
  totalCount: number,
  onSeek: (index: number) => void,
  colors: any
}) {
  const [containerWidth, setContainerWidth] = useState(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (totalCount > 1) {
      progress.value = currentIndex / (totalCount - 1);
    } else {
      progress.value = 0; // Handle single item case
    }
  }, [currentIndex, totalCount]);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (containerWidth > 0) {
        const newProgress = Math.min(Math.max(0, event.x / containerWidth), 1);
        progress.value = newProgress;
        const index = Math.round(newProgress * (totalCount - 1));
        runOnJS(onSeek)(index);
      }
    });

  const tapGesture = Gesture.Tap()
    .onEnd((event) => {
      if (containerWidth > 0) {
        const newProgress = Math.min(Math.max(0, event.x / containerWidth), 1);
        progress.value = newProgress;
        const index = Math.round(newProgress * (totalCount - 1));
        runOnJS(onSeek)(index);
      }
    });

  const animatedBarStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const animatedThumbStyle = useAnimatedStyle(() => ({
    left: `${progress.value * 100}%`,
  }));

  return (
    <ThemedView
      style={styles.seekBarContainer}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <GestureDetector gesture={Gesture.Exclusive(gesture, tapGesture)}>
        <View style={styles.seekBarTrack}>
          <Animated.View style={[styles.seekBarProgress, animatedBarStyle, { backgroundColor: '#007BFF' }]} />
          <Animated.View style={[styles.seekBarThumb, animatedThumbStyle]} />
        </View>
      </GestureDetector>
    </ThemedView>
  );
}

function DraggableNote({ note, onUpdatePosition, onUpdateSize, onUpdateText, onDelete, themeColors }: {
  note: LearnNote,
  onUpdatePosition: (x: number, y: number) => void,
  onUpdateSize: (w: number, h: number) => void,
  onUpdateText: (text: string) => void,
  onDelete: () => void,
  themeColors: any
}) {
  const translateX = useSharedValue(note.x);
  const translateY = useSharedValue(note.y);
  const width = useSharedValue(note.width || 200);
  const height = useSharedValue(note.height || 120);

  const context = useSharedValue({ x: 0, y: 0 });
  const sizeContext = useSharedValue({ w: 0, h: 0 });

  const dragGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    })
    .onEnd(() => {
      onUpdatePosition(translateX.value, translateY.value);
    });

  const resizeGesture = Gesture.Pan()
    .onStart(() => {
      sizeContext.value = { w: width.value, h: height.value };
    })
    .onUpdate((event) => {
      width.value = Math.max(100, event.translationX + sizeContext.value.w);
      height.value = Math.max(60, event.translationY + sizeContext.value.h);
    })
    .onEnd(() => {
      onUpdateSize(width.value, height.value);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
      width: width.value,
      height: height.value,
    };
  });

  return (
    <Animated.View
      style={[styles.floatingNote, animatedStyle, { backgroundColor: '#FFFBE6', borderColor: '#FFD700' }]}
      // @ts-ignore - Web specific context menu
      onContextMenu={(e: any) => {
        e.preventDefault();
        onDelete();
      }}
    >
      <GestureDetector gesture={dragGesture}>
        <View style={{ flex: 1 }}>
          <Pressable onLongPress={onDelete} delayLongPress={800} style={{ flex: 1 }}>
            <TextInput
              style={[styles.noteInput, { color: '#333' }]}
              multiline
              value={note.text}
              onChangeText={onUpdateText}
              placeholder="..."
            />
          </Pressable>
        </View>
      </GestureDetector>

      {/* リサイズハンドル */}
      <GestureDetector gesture={resizeGesture}>
        <View style={styles.resizeHandle}>
          <MaterialIcons name="filter-list" size={16} color="#B8860B" style={{ transform: [{ rotate: '135deg' }] }} />
        </View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
    backgroundColor: '#f5f7fa',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 8,
  },
  bulbContainer: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  stickyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f5f7fa',
  },
  stickyButtonActive: {
    borderColor: '#FFD700',
    backgroundColor: '#FFFBE6',
  },
  floatingNote: {
    position: 'absolute',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: 'hidden',
    zIndex: 1, // ボタン(zIndexなし=0)より前面にくる可能性があるため、ボタン側のzIndexを上げる必要がある
  },
  noteInput: {
    fontSize: 14,
    textAlignVertical: 'top',
    flex: 1,
  },
  seekBarContainer: {
    height: 44,
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
    // 確実にタッチを拾うための設定
  },
  seekBarTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    width: '100%',
    position: 'relative',
  },
  seekBarProgress: {
    height: '100%',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
  },
  seekBarThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#007BFF',
    position: 'absolute',
    top: -8,
    marginLeft: -12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resizeHandle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  stickyText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  stickyTextActive: {
    color: '#B8860B',
  },
  memoTextActive: {
    color: '#4A90E2',
  },
  contentContainer: {
    minHeight: 220,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#f5f7fa',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000000',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12 },
      android: { elevation: 4 },
      web: { boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }
    })
  },
  content: {
    lineHeight: 48,
    fontSize: 32,
    textAlign: 'center',
  },
  basisText: {
    marginTop: 12,
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  caseTitleText: {
    marginTop: 8,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  pastQuestionButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F0F7FF',
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  pastQuestionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  count: {
    fontSize: 18,
    textAlign: 'center',
  },
  speedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  speedButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  speedButtonActive: {
    backgroundColor: '#007BFF',
  },
  speedText: {
    fontSize: 14,
    color: '#333',
  },
  speedTextActive: {
    color: '#fff',
  },
  priorityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'transparent',
    marginLeft: 'auto',
  },
  priorityButtonActive: {
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  priorityTextActive: {
    color: '#fff',
  },
  playButton: {
    flex: 3,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#28A745',
  },
  stopButton: {
    backgroundColor: '#DC3545',
  },
  controlsRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginTop: 16,
    zIndex: 10,
  },
  prevButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  digDeeperButtonSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FF9800',
    borderRadius: 8,
    marginLeft: 8,
    marginRight: 8,
    flex: 1,
  },
  digDeeperTextSmall: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  nextButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#E7F1FF',
    alignItems: 'center',
  },
  completeButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#28A745',
    backgroundColor: '#D4EDDA',
    alignItems: 'center',
  },
  disabledButton: {
    borderColor: '#ccc',
    backgroundColor: '#eee',
    opacity: 0.5,
  },
  navLinkButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f7fa',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 16,
    elevation: 5,
  },
  memoInput: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    backgroundColor: 'transparent',
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#007BFF',
  },
  questionImage: {
    width: '100%',
    height: 220,
    marginTop: 16,
    borderRadius: 8,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1.5,
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
