import { applyTTSRules } from '@/utils/tts-rules';
import { Link, router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import * as Speech from 'expo-speech';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Modal, PanResponder, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { LexiconText, stripLexiconMarkupForPlain } from '@/components/lexicon-text';
import { MarkdownText } from '@/components/markdown-text';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { characterPlaceholders, defaultCharacterMap, useCharacter } from '@/src/context/CharacterContext';
import { useLearnPlayback } from '@/src/context/LearnPlaybackContext';
import { useTheme } from '@/src/context/ThemeContext';
import {
    buildDeepdiveSiblingTitles,
    kenpouParallelSupplementImageKey,
    mergedDeepdiveHasResolvableImage,
    pickAutoLearnDeepdiveImageKey,
} from '@/src/deepdiveLearnAutoImage';
import { setDeepdiveParams, setLearnDeepdiveReturnCursor } from '@/src/deepdiveState';
import { LEARN_CONTENT, LEARN_DEEPDIVE, LEARN_F_EXPLAIN, LEARN_LINKS, LEARN_SOURCE, LEARN_STATUTE_REFS } from '@/src/learn';
import { LEARN_VOICE_PRESETS } from '@/src/learnVoices';
import { PIN_CASES } from '@/src/pinData';
import { SUBJECTS } from '@/src/questions';
import { clearQuizLearnReturnParams, getQuizLearnReturnHref, stripLearnLinkTag } from '@/src/quizLearnBridge';
import { resolveImageAsset } from '@/src/resolveImageAsset';
import { getLearnNotes, LearnNote, saveLearnNotes } from '@/utils/learn-notes';
import { addPoints } from '@/utils/points';
import { getStickyNotes, toggleStickyNote } from '@/utils/sticky-notes';
import { MaterialIcons } from '@expo/vector-icons';
import { Gesture, GestureDetector, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

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

const webNoHitChild = Platform.OS === 'web' ? { pointerEvents: 'none' as const } : {};

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

function pickByIndices<T>(arr: T[], indices: number[] | null): T[] {
  if (!indices) return arr;
  return indices.map((i) => arr[i]).filter((v) => v !== undefined);
}

type LearnRelatedStatutesPayload = {
  content: string;
  choiceLabel: string;
  quizSubject: string;
  quizField: string;
};

function findLearnLinkKeyForCard(learnSubject: string, learnIndex: number): string {
  if (!learnSubject || learnIndex < 0) return '';
  const links = LEARN_LINKS as Record<string, unknown>;
  for (const [key, rawTargets] of Object.entries(links)) {
    const targets = Array.isArray(rawTargets) ? rawTargets : [];
    if (
      targets.some((target) => {
        if (!target || typeof target !== 'object') return false;
        const t = target as Record<string, unknown>;
        return t.subject === learnSubject && Number(t.index) === learnIndex;
      })
    ) {
      return key;
    }
  }
  return `#${String(learnIndex + 1).padStart(3, '0')}`;
}

function choiceLabelForRelatedStatutes(choice: string, index: number): string {
  const label = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク'][index] ?? String(index + 1);
  const body = (choice || '').trim();
  return body ? `${label}. ${body}` : label;
}

function findRelatedStatutesForLearnLink(linkKey: string): LearnRelatedStatutesPayload | null {
  if (!linkKey) return null;
  for (const [quizSubject, group] of Object.entries(SUBJECTS as Record<string, unknown>)) {
    if (!group || typeof group !== 'object') continue;
    for (const [quizField, list] of Object.entries(group as Record<string, unknown>)) {
      if (!Array.isArray(list)) continue;
      for (const question of list as Record<string, unknown>[]) {
        const questionLinkKey = typeof question.learnLinkKey === 'string' ? question.learnLinkKey : '';
        const choices = Array.isArray(question.choices) ? (question.choices as string[]) : [];
        const choiceLinkKeys = Array.isArray(question.choiceLearnLinkKeys)
          ? (question.choiceLearnLinkKeys as string[])
          : [];
        const choiceRelatedStatutes = Array.isArray(question.choiceRelatedStatutes)
          ? (question.choiceRelatedStatutes as string[])
          : [];
        const choiceStatuteRefs = Array.isArray(question.choiceStatuteRefs)
          ? (question.choiceStatuteRefs as string[])
          : [];

        let choiceIndices = choiceLinkKeys
          .map((key, idx) => (key === linkKey ? idx : -1))
          .filter((idx) => idx >= 0);

        // 既存の同期データには肢ごとのキーが無いので、問題単位リンクなら条文がある肢を候補にする。
        if (choiceIndices.length === 0 && questionLinkKey === linkKey) {
          choiceIndices = choices
            .map((_, idx) =>
              (choiceRelatedStatutes[idx] || choiceStatuteRefs[idx] || '').trim() ? idx : -1
            )
            .filter((idx) => idx >= 0);
        }

        if (choiceIndices.length === 0) continue;

        const segments = choiceIndices
          .map((idx) => {
            const body = (choiceRelatedStatutes[idx] || choiceStatuteRefs[idx] || '').trim();
            if (!body) return '';
            const choiceLabel = choiceLabelForRelatedStatutes(choices[idx] || '', idx);
            return choiceIndices.length === 1 ? body : `【${choiceLabel}】\n${body}`;
          })
          .filter(Boolean);

        if (segments.length === 0) continue;

        const firstIdx = choiceIndices[0] ?? -1;
        return {
          content: segments.join('\n\n'),
          choiceLabel: firstIdx >= 0 && choiceIndices.length === 1 ? choiceLabelForRelatedStatutes(choices[firstIdx] || '', firstIdx) : '',
          quizSubject,
          quizField,
        };
      }
    }
  }
  return null;
}

export default function LearnSubjectScreen() {
  /** フォーカス中のみ true。Web の pointerEvents と、別画面へ遷移したあとも学習音声を流すときのポーリング誤検知防止に使う（ネイティブもフォーカスで同期） */
  const [learnReceivesPointer, setLearnReceivesPointer] = useState(true);
  useFocusEffect(
    useCallback(() => {
      setLearnReceivesPointer(true);
      return () => {
        setLearnReceivesPointer(false);
      };
    }, [])
  );

  const params = useLocalSearchParams<{ subject?: string; index?: string; field?: string; returnToResult?: string }>();
  const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;
  const fieldParam = Array.isArray(params.field) ? params.field[0] : params.field;
  const returnToResultParam = Array.isArray(params.returnToResult) ? params.returnToResult[0] : params.returnToResult;
  const isQuizLearnReview = returnToResultParam === '1';
  const tashiField = fieldParam === '憲法' || fieldParam === '行政法' ? fieldParam : undefined;
  const indexParam = Array.isArray(params.index) ? params.index[0] : params.index;
  const parsedIndex = parseInt(indexParam || '0', 10);
  const routeIndex = Number.isFinite(parsedIndex) && parsedIndex >= 0 ? parsedIndex : 0;

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

  // 行政法総論: 「行政法総論」シート由来のみ（全配列へ混在する他シート行を除外）
  // 国家賠償法: 「国家賠償法」シート由来のみ（「行政法総合」から A 列で科目が付いた行の混在を除外）
  const learnSheetFilterIndices = useMemo(() => {
    if (subject === '行政法総論') {
      const src = (LEARN_SOURCE as any)?.['行政法総論'];
      if (!Array.isArray(src)) return null;
      const only = src
        .map((sheetName: string, idx: number) => (sheetName === '行政法総論' ? idx : -1))
        .filter((idx: number) => idx >= 0);
      return only.slice(0, 133);
    }
    if (subject === '国家賠償法') {
      const src = (LEARN_SOURCE as any)?.['国家賠償法'];
      if (!Array.isArray(src)) return null;
      return src
        .map((sheetName: string, idx: number) => (sheetName === '国家賠償法' ? idx : -1))
        .filter((idx: number) => idx >= 0);
    }
    return null;
  }, [subject]);

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
    fromLearn = pickByIndices(fromLearn, learnSheetFilterIndices);
    if (fromLearn.length > 0) return fromLearn;
    const fallbackSubjects = ['基礎法学'];
    if (fallbackSubjects.includes(subject || '') && flattenedSubjectQuestions.length > 0) {
      return flattenedSubjectQuestions.map((q: any) => q?.text || '').filter(Boolean);
    }
    return fromLearn;
  }, [subject, flattenedSubjectQuestions, tashiField, tashiKenGyoLens.ken, tashiKenGyoLens.gyo, learnSheetFilterIndices]);

  const [currentIndex, setCurrentIndex] = useState(routeIndex);
  const [currentReadCount, setCurrentReadCount] = useState(1); // Counter for the 3 repeats
  const [readCount, setReadCount] = useState(0); // Cumulative total count (optional, but keep for UI)
  const {
    isPlaying,
    setIsPlaying,
    playbackRate,
    setPlaybackRate,
    voiceId,
    setVoiceId,
    voiceSpeechOptions,
    spokenIndex,
    setSpokenIndex,
    setLearnScreenMounted,
    registerManualNav,
  } = useLearnPlayback();
  const [isSticky, setIsSticky] = useState(false);
  const [isPriorityMode, setIsPriorityMode] = useState(false);
  const [notes, setNotes] = useState<LearnNote[]>([]);
  const [isCharacterModalVisible, setIsCharacterModalVisible] = useState(false);
  const [dictionaryEntry, setDictionaryEntry] = useState<{ word: string; def: string } | null>(null);

  const { characterMap, updateCharacterName, applyCharacterNames } = useCharacter();

  /** TTS の onDone / onBoundary が「前の発話」から遅延して走り、カードや読了がずれるのを防ぐ */
  const ttsUtteranceIdRef = useRef(0);
  /** Web: onDone が省略される環境へのポーリング用クリーンアップ */
  const webUtterancePollCleanupRef = useRef<(() => void) | null>(null);
  const isPlayingRef = useRef(isPlaying);
  const currentIndexRef = useRef(currentIndex);
  const currentReadCountRef = useRef(currentReadCount);
  const displayListLenRef = useRef(0);
  const routeCursorKey = `${learnScopeKey}\u001f${routeIndex}`;
  const lastAppliedRouteCursorRef = useRef(routeCursorKey);
  /** await 後も最新のカード本文・速度を参照（クロージャずれ防止） */
  const currentDisplayContentRef = useRef('');
  const playbackRateRef = useRef(playbackRate);
  const voiceSpeechOptionsRef = useRef(voiceSpeechOptions);
  const applyCharacterNamesRef = useRef(applyCharacterNames);
  /** 画面が非フォーカス（深掘りを開いた等）でも isPlaying は維持する。Web の poll と同期 */
  const learnReceivesPointerRef = useRef(learnReceivesPointer);

  const { theme, colors } = useTheme();

  useEffect(() => {
    learnReceivesPointerRef.current = learnReceivesPointer;
  }, [learnReceivesPointer]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);
  useEffect(() => {
    currentReadCountRef.current = currentReadCount;
  }, [currentReadCount]);

  /**
   * 手動で次へ・前へ・シーク・停止するときに同期的に呼ぶ。
   * isPlayingRef / ttsUtteranceIdRef は useEffect の後でしか state と同期しないため、
   * その前に onDone が走ると旧セッションの speakRepeat が続き「前の問題の音声だけ」になる。
   */
  const killLearnTtsPlayback = useCallback(() => {
    ttsUtteranceIdRef.current += 1;
    isPlayingRef.current = false;
    Speech.stop();
  }, []);

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

  useEffect(() => {
    if (lastAppliedRouteCursorRef.current === routeCursorKey) return;
    lastAppliedRouteCursorRef.current = routeCursorKey;
    const nextIndex =
      displayContentList.length > 0
        ? Math.min(routeIndex, displayContentList.length - 1)
        : routeIndex;
    /** 深掘りから戻ると URL の index だけ付くことがあり、カードは同じなのに 3 回読みがリセットされていた */
    const prevIdx = currentIndexRef.current;
    if (prevIdx === nextIndex) return;
    setCurrentIndex(nextIndex);
    setCurrentReadCount(1);
    setSpokenIndex(0);
  }, [displayContentList.length, routeCursorKey, routeIndex, setSpokenIndex]);

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
  const learnAlignedIndex =
    subject === '多肢選択'
      ? originalContentIndex
      : (learnSheetFilterIndices?.[originalContentIndex] ?? originalContentIndex);

  useEffect(() => {
    displayListLenRef.current = displayContentList.length;
  }, [displayContentList.length]);

  const currentDisplayContent = displayContentList[currentIndex] || '';
  /** index と同一文でも並び変わったとき effect を再実行するため、content だけに依存しない */
  const learnPlaybackSentenceKey = useMemo(
    () => `${currentIndex}\u001f${currentDisplayContent}`,
    [currentIndex, currentDisplayContent]
  );
  currentDisplayContentRef.current = currentDisplayContent;
  playbackRateRef.current = playbackRate;
  voiceSpeechOptionsRef.current = voiceSpeechOptions;
  applyCharacterNamesRef.current = applyCharacterNames;
  const isLastItem = currentIndex >= displayContentList.length - 1;

  // B列由来（LEARN_DEEPDIVE）。憲法／行政法フィールドは専用キーがバンドルにあればそれのみ（空行もマージ「多肢選択」で埋めない）
  const deepdiveTashiSlice = useMemo(() => {
    if (subject !== '多肢選択') return null;
    const dd = LEARN_DEEPDIVE as Record<string, unknown>;
    if (tashiField === '憲法') {
      if (Object.prototype.hasOwnProperty.call(dd, '多肢選択憲法')) {
        const d = dd['多肢選択憲法'];
        return Array.isArray(d) ? (d as string[]) : [];
      }
    } else if (tashiField === '行政法') {
      if (Object.prototype.hasOwnProperty.call(dd, '多肢選択行政法')) {
        const d = dd['多肢選択行政法'];
        return Array.isArray(d) ? (d as string[]) : [];
      }
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
      : (LEARN_DEEPDIVE as any)?.[subject as string]?.[learnAlignedIndex] || '';

  const deepdiveColumnArr: string[] = useMemo(() => {
    if (subject === '多肢選択' && deepdiveTashiSlice) return deepdiveTashiSlice;
    const raw = subject ? (LEARN_DEEPDIVE as any)[subject] : [];
    return Array.isArray(raw) ? raw : [];
  }, [subject, deepdiveTashiSlice]);

  /** 長文B列（民法総則等）で兄弟走査のたびに全行パースしない */
  const deepdiveSiblingTitles = useMemo(
    () => buildDeepdiveSiblingTitles(deepdiveColumnArr),
    [deepdiveColumnArr]
  );

  /** F列解説（LEARN_DEEPDIVE と同じキー・インデックスで並ぶ） */
  const learnFExplainColumnArr: string[] = useMemo(() => {
    if (subject === '多肢選択' && deepdiveTashiSlice) {
      const fe = LEARN_F_EXPLAIN as Record<string, unknown>;
      if (tashiField === '憲法') {
        if (Object.prototype.hasOwnProperty.call(fe, '多肢選択憲法')) {
          const raw = fe['多肢選択憲法'];
          return Array.isArray(raw) ? (raw as string[]) : [];
        }
      } else if (tashiField === '行政法') {
        if (Object.prototype.hasOwnProperty.call(fe, '多肢選択行政法')) {
          const raw = fe['多肢選択行政法'];
          return Array.isArray(raw) ? (raw as string[]) : [];
        }
      } else {
        const ken = (LEARN_F_EXPLAIN as any)?.['多肢選択憲法'];
        const gyo = (LEARN_F_EXPLAIN as any)?.['多肢選択行政法'];
        const a = Array.isArray(ken) ? ken : [];
        const b = Array.isArray(gyo) ? gyo : [];
        if (a.length + b.length > 0) return [...a, ...b];
      }
      const full = (LEARN_F_EXPLAIN as any)?.['多肢選択'];
      const arr = Array.isArray(full) ? full : [];
      return sliceTashiSyncedByField(arr, tashiField, tashiKenGyoLens.ken, tashiKenGyoLens.gyo);
    }
    const raw = subject ? (LEARN_F_EXPLAIN as any)[subject] : [];
    return Array.isArray(raw) ? raw : [];
  }, [subject, deepdiveTashiSlice, tashiField, tashiKenGyoLens.ken, tashiKenGyoLens.gyo]);

  const learnFExplainText = (learnFExplainColumnArr[learnAlignedIndex] || '').trim();

  /** 画像の自動キー・深掘りの learnSubject。本編「憲法」と「多肢選択・憲法」を混ぜない */
  const learnSubjectForDeepdive = useMemo(() => {
    if (subject === '多肢選択' && tashiField === '憲法') return '多肢選択憲法';
    if (subject === '多肢選択' && tashiField === '行政法') return '多肢選択行政法';
    return subject || '';
  }, [subject, tashiField]);

  const learnDataIndexForLinks =
    learnSubjectForDeepdive === '多肢選択憲法' || learnSubjectForDeepdive === '多肢選択行政法'
      ? originalContentIndex
      : learnAlignedIndex;

  const linkedRelatedStatutes = useMemo(() => {
    const linkKey = findLearnLinkKeyForCard(learnSubjectForDeepdive, learnDataIndexForLinks);
    return findRelatedStatutesForLearnLink(linkKey);
  }, [learnSubjectForDeepdive, learnDataIndexForLinks]);

  /** 行政法各論: syncLearn の I列（LEARN_STATUTE_REFS）。無ければクイズ連携の linkedRelatedStatutes */
  const learnStatuteRefText = useMemo(() => {
    const fromLearn = (LEARN_STATUTE_REFS as Record<string, string[]>)?.[learnSubjectForDeepdive]?.[
      learnAlignedIndex
    ];
    const direct = typeof fromLearn === 'string' ? fromLearn.trim() : '';
    if (direct) return direct;
    return linkedRelatedStatutes?.content?.trim() || '';
  }, [learnSubjectForDeepdive, learnAlignedIndex, linkedRelatedStatutes]);

  useEffect(() => {
    if (!subject || !learnSubjectForDeepdive) {
      setLearnDeepdiveReturnCursor(null);
      return;
    }
    setLearnDeepdiveReturnCursor({
      learnSubjectKey: learnSubjectForDeepdive,
      routeSubject: subject,
      field: tashiField ?? null,
      displayIndex: currentIndex,
    });
  }, [subject, tashiField, learnSubjectForDeepdive, currentIndex]);

  const learnSourceSheetLabel = useMemo(() => {
    if (subject === '多肢選択') {
      const src = LEARN_SOURCE as Record<string, unknown>;
      if (tashiField === '憲法') {
        if (Object.prototype.hasOwnProperty.call(src, '多肢選択憲法')) {
          const arr = src['多肢選択憲法'];
          if (Array.isArray(arr)) return (arr as string[])[originalContentIndex];
        }
      } else if (tashiField === '行政法') {
        if (Object.prototype.hasOwnProperty.call(src, '多肢選択行政法')) {
          const arr = src['多肢選択行政法'];
          if (Array.isArray(arr)) return (arr as string[])[originalContentIndex];
        }
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
    return (LEARN_SOURCE as any)?.[subject as string]?.[learnAlignedIndex];
  }, [subject, tashiField, tashiKenGyoLens.ken, tashiKenGyoLens.gyo, originalContentIndex, learnAlignedIndex]);

  // Extract LINK tag first if present
  const linkMatch = currentDisplayContent.match(/\[\[LINK:(.+?)\]\]/);
  const digDeeperUrl = linkMatch ? linkMatch[1] : null;

  // Extract image tag（deepdive / chunk / descriptive / imageMap のいずれかにあれば表示可能）
  const imageMatch = currentDisplayContent.match(/\[\[image:(.*?)\]\]/);
  const currentImageName = imageMatch ? imageMatch[1].split(' ')[0].trim() : null;
  const hasImageTagInCard = /\[\[image:[^\]]+\]\]/.test(currentDisplayContent);
  const hasValidImage = !!(currentImageName && resolveImageAsset(currentImageName));

  const learnAutoImageKey = useMemo(
    () =>
      subject
        ? pickAutoLearnDeepdiveImageKey(
            learnAlignedIndex,
            (deepdiveContent || '').trim(),
            deepdiveColumnArr,
            contentList as string[],
            learnSubjectForDeepdive,
            deepdiveSiblingTitles
          )
        : undefined,
    [
      subject,
      learnAlignedIndex,
      deepdiveContent,
      deepdiveColumnArr,
      contentList,
      learnSubjectForDeepdive,
      deepdiveSiblingTitles,
    ]
  );

  const learnAutoImageResolved = !!(learnAutoImageKey && resolveImageAsset(learnAutoImageKey));

  // Remove LINK and IMAGE tags from content for display processing
  const contentToProcess = stripLearnLinkTag(currentDisplayContent)
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
        foundQuestion = (category as any)[subject]?.[learnAlignedIndex];
        break;
      }
    }
  }
  const hasChunks = foundQuestion?.chunks && foundQuestion.chunks.length > 0;

  /** 多肢選択憲法／多肢選択行政法のみ: B列か [[LINK:]] があるときだけボタン表示（chunks・画像タグ・他科目混入で出ないようにする） */
  const digDeeperButtonVisible =
    learnSubjectForDeepdive === '多肢選択憲法' || learnSubjectForDeepdive === '多肢選択行政法'
      ? !!(deepdiveContent || '').trim() || !!digDeeperUrl
      : !!(
          (deepdiveContent || '').trim() ||
          learnStatuteRefText ||
          digDeeperUrl ||
          hasChunks ||
          hasValidImage ||
          learnAutoImageResolved ||
          hasImageTagInCard
        );

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
        learnAlignedIndex,
        fromB,
        deepdiveColumnArr,
        contentList as string[],
        learnSubjectForDeepdive,
        deepdiveSiblingTitles
      );
      if (autoKey && resolveImageAsset(autoKey)) merged = `[[image:${autoKey}]]\n\n${merged}`;
    } else if (!merged.trim()) {
      const autoKey = pickAutoLearnDeepdiveImageKey(
        learnAlignedIndex,
        fromB,
        deepdiveColumnArr,
        contentList as string[],
        learnSubjectForDeepdive,
        deepdiveSiblingTitles
      );
      if (autoKey && resolveImageAsset(autoKey)) merged = `[[image:${autoKey}]]`;
    }
    if (learnSubjectForDeepdive === '憲法') {
      const sup = kenpouParallelSupplementImageKey(learnAlignedIndex + 1);
      if (sup) {
        const tag = `[[image:${sup}]]`;
        if (!merged.includes(tag)) {
          merged = merged.trim() ? `${tag}\n\n${merged}` : tag;
        }
      }
    }
    return merged;
  };

  const handleOpenDeepDive = () => {
    const mergedPayload = buildMergedDeepdivePayload();
    const strictTashi =
      learnSubjectForDeepdive === '多肢選択憲法' || learnSubjectForDeepdive === '多肢選択行政法';

    if (!subject) return;

    if (strictTashi) {
      if (!(mergedPayload?.trim() || digDeeperUrl)) return;
    } else if (
      !mergedPayload &&
      !learnStatuteRefText &&
      !digDeeperUrl &&
      !hasChunks &&
      !hasValidImage &&
      !hasImageTagInCard &&
      !learnAutoImageResolved
    ) {
      return;
    }

    // B列＋A列の [[image:…]] を結合して「もっと深掘る」へ（根拠条文のみのカードも deepdive へ）
    if (mergedPayload || learnStatuteRefText) {
      setDeepdiveParams(mergedPayload || '', '', {
        fromLearn: true,
        fExplain: learnFExplainText,
        learnRelatedStatutesContent: learnStatuteRefText,
        learnSubject: learnSubjectForDeepdive,
        learnReturnIndex: currentIndex,
      });
      // Web では params が URL に載り巨大本文でフリーズし得る。本文は setDeepdiveParams のみで渡す
      router.push({ pathname: '/deepdive' as any, params: { choiceLabel: '' } });
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

  const quizLearnReturnHref = isQuizLearnReview ? getQuizLearnReturnHref() : null;
  const handleReturnToQuizResult = () => {
    killLearnTtsPlayback();
    setIsPlaying(false);
    if (quizLearnReturnHref) {
      clearQuizLearnReturnParams();
      router.replace(quizLearnReturnHref as any);
      return;
    }
    router.back();
  };

  const handleManualNext = useCallback(() => {
    killLearnTtsPlayback();
    setIsPlaying(false);
    if (isLastItem) {
      addPoints(1);
      if (isQuizLearnReview && quizLearnReturnHref) {
        clearQuizLearnReturnParams();
        router.replace(quizLearnReturnHref as any);
        return;
      }
      alert('学習完了！ +1ポイント');
      router.back();
    } else {
      setCurrentIndex(currentIndex + 1);
      setCurrentReadCount(1);
      setSpokenIndex(0);
    }
  }, [isLastItem, currentIndex, setIsPlaying, setSpokenIndex, killLearnTtsPlayback, isQuizLearnReview, quizLearnReturnHref]);

  const handleManualPrev = useCallback(() => {
    killLearnTtsPlayback();
    setIsPlaying(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentReadCount(1);
      setSpokenIndex(0);
    }
  }, [currentIndex, setIsPlaying, setSpokenIndex, killLearnTtsPlayback]);

  const handleLearnTogglePlay = useCallback(() => {
    if (isPlaying) {
      killLearnTtsPlayback();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }, [isPlaying, setIsPlaying, killLearnTtsPlayback]);

  useEffect(() => {
    registerManualNav({
      manualPrev: handleManualPrev,
      manualNext: handleManualNext,
    });
  }, [registerManualNav, handleManualPrev, handleManualNext]);

  // Continuous Playback Effect
  // currentReadCount を依存に含めない（含めると毎リピートで effect が再実行され stop/speak が競合し表示と音声がずれる）
  useEffect(() => {
    webUtterancePollCleanupRef.current?.();
    webUtterancePollCleanupRef.current = null;

    if (!isPlaying || !currentDisplayContent.trim()) {
      ttsUtteranceIdRef.current += 1;
      Speech.stop();
      return;
    }

    const sessionId = ++ttsUtteranceIdRef.current;
    let cancelled = false;

    const run = async () => {
      await Speech.stop();
      if (cancelled || sessionId !== ttsUtteranceIdRef.current) return;
      await new Promise((resolve) => setTimeout(resolve, 200));
      if (cancelled || sessionId !== ttsUtteranceIdRef.current) return;

      const speakRepeat = (repeatNum: number) => {
        if (cancelled || sessionId !== ttsUtteranceIdRef.current || !isPlayingRef.current) return;

        webUtterancePollCleanupRef.current?.();
        webUtterancePollCleanupRef.current = null;

        const raw = currentDisplayContentRef.current;
        const currentMainText = raw.includes('※') ? raw.split('※')[0] : raw;
        const basePlainForSync = stripLexiconMarkupForPlain(currentMainText).replace(/\[\[.*?\]\]/g, '');
        const processedText = applyCharacterNamesRef.current(basePlainForSync);
        const spokenText = applyTTSRules(processedText);

        if (!spokenText.trim()) {
          console.log('Empty spoken text, stopping');
          killLearnTtsPlayback();
          setIsPlaying(false);
          return;
        }

        const plainLen = processedText.length;
        const ttsLen = spokenText.length;
        const rate = playbackRateRef.current;

        setCurrentReadCount(repeatNum);
        setSpokenIndex(0);

        let completionHandled = false;
        let pollInterval: ReturnType<typeof setInterval> | null = null;
        let safetyTimer: ReturnType<typeof setTimeout> | null = null;
        let sawSpeaking = false;

        const clearWebGuards = () => {
          if (pollInterval != null) {
            clearInterval(pollInterval);
            pollInterval = null;
          }
          if (safetyTimer != null) {
            clearTimeout(safetyTimer);
            safetyTimer = null;
          }
          webUtterancePollCleanupRef.current = null;
        };

        const afterUtteranceComplete = () => {
          if (completionHandled) return;
          if (cancelled || sessionId !== ttsUtteranceIdRef.current || !isPlayingRef.current) return;
          completionHandled = true;
          clearWebGuards();

          setSpokenIndex(plainLen);
          setTimeout(() => {
            if (cancelled || sessionId !== ttsUtteranceIdRef.current) return;
            if (!isPlayingRef.current) return;

            if (repeatNum < 3) {
              setReadCount((prev) => prev + 1);
              speakRepeat(repeatNum + 1);
              return;
            }

            setReadCount((prev) => prev + 1);
            const idx = currentIndexRef.current;
            const len = displayListLenRef.current;
            const last = len > 0 && idx >= len - 1;
            if (last) {
              setIsPlaying(false);
              addPoints(1);
              alert('学習完了！ +1ポイント');
              router.back();
            } else {
              setCurrentIndex(idx + 1);
              setCurrentReadCount(1);
            }
          }, 50);
        };

        Speech.speak(spokenText, {
          ...voiceSpeechOptionsRef.current,
          rate,
          onBoundary: (event: any) => {
            if (cancelled || sessionId !== ttsUtteranceIdRef.current) return;
            if (!isPlayingRef.current || event.charIndex === undefined) return;
            let idx = event.charIndex;
            if (ttsLen > 0 && plainLen !== ttsLen) {
              idx = Math.min(plainLen, Math.round((event.charIndex / ttsLen) * plainLen));
            } else {
              idx = Math.min(plainLen, event.charIndex);
            }
            setSpokenIndex(idx);
          },
          // Web: SpeechSynthesis が速度次第で onend → onDone が来ない事例があるため、話し終わりも監視する
          onStart: () => {
            if (cancelled || sessionId !== ttsUtteranceIdRef.current || Platform.OS !== 'web') return;
            sawSpeaking = false;

            pollInterval = setInterval(() => {
              if (cancelled || sessionId !== ttsUtteranceIdRef.current) {
                clearWebGuards();
                return;
              }
              void Speech.isSpeakingAsync().then((speaking) => {
                if (cancelled || sessionId !== ttsUtteranceIdRef.current) return;
                if (speaking) sawSpeaking = true;
                else if (
                  sawSpeaking &&
                  (Platform.OS !== 'web' || learnReceivesPointerRef.current)
                ) {
                  afterUtteranceComplete();
                }
              });
            }, 120);

            const maxWaitMs = Math.min(
              180_000,
              Math.max(25_000, (plainLen * 900) / Math.max(0.5, rate) + 3_500)
            );
            safetyTimer = setTimeout(() => {
              safetyTimer = null;
              if (Platform.OS === 'web' && !learnReceivesPointerRef.current) return;
              afterUtteranceComplete();
            }, maxWaitMs);

            webUtterancePollCleanupRef.current = () => clearWebGuards();
          },
          onDone: () => afterUtteranceComplete(),
          onError: (e) => {
            const msg = (e && (e as Error).message) || String(e);
            // Web で cancel と誤検知される事例は無視（意図停止は sessionId で既に弾ける）
            if (Platform.OS === 'web' && /interrupted|cancell?ed/i.test(msg)) {
              return;
            }
            console.log('TTS Error:', e);
            if (cancelled || sessionId !== ttsUtteranceIdRef.current) return;
            killLearnTtsPlayback();
            setIsPlaying(false);
          },
        });
      };

      speakRepeat(1);
    };

    run();

    return () => {
      cancelled = true;
      webUtterancePollCleanupRef.current?.();
      webUtterancePollCleanupRef.current = null;
      ttsUtteranceIdRef.current += 1;
      Speech.stop();
    };
  /** playbackRate / voiceId は ref で参照する。依存に含めると非フォーカス（深掘り表示中）の更新で effect が巻き直り Speech.stop される */
  }, [isPlaying, learnPlaybackSentenceKey, killLearnTtsPlayback, setIsPlaying]);

  const handleToggleSticky = () => {
    if (learnScopeKey) {
      const newState = toggleStickyNote(learnScopeKey, currentIndex);
      setIsSticky(newState);
    }
  };

  const handleTogglePriorityMode = () => {
    killLearnTtsPlayback();
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
    <ThemedView
      style={styles.container}
      pointerEvents={Platform.OS === 'web' && !learnReceivesPointer ? 'none' : 'auto'}
    >
      <SeekBar
          currentIndex={currentIndex}
          totalCount={displayContentList.length}
          onSeek={(index) => {
            killLearnTtsPlayback();
            setIsPlaying(false);
            setCurrentIndex(index);
            setCurrentReadCount(1);
            setSpokenIndex(0);
          }}
        />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ gap: 16, paddingBottom: 100 }} // メモを置くスペースを考慮して下部に余白
          showsVerticalScrollIndicator={false}
        >
          {subject === '基礎法学' ? (
            <Pressable
              style={[styles.kisoSummaryLink, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push('/learn/kiso-hougaku-summary')}
            >
              <MaterialIcons name="menu-book" size={22} color={colors.primary} />
              <ThemedText style={[styles.kisoSummaryLinkText, { color: colors.text }]}>
                基礎法学・解説まとめ（論点一覧）
              </ThemedText>
              <MaterialIcons name="chevron-right" size={22} color={colors.subText} />
            </Pressable>
          ) : null}

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

          {isQuizLearnReview ? (
            <Pressable
              style={[styles.returnToQuizButton, { backgroundColor: colors.primary, borderColor: colors.primary }]}
              onPress={handleReturnToQuizResult}
            >
              <MaterialIcons name="keyboard-return" size={18} color="#fff" />
              <ThemedText type="defaultSemiBold" style={styles.returnToQuizButtonText}>
                問題の解説ページに戻る
              </ThemedText>
            </Pressable>
          ) : null}

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
              onPress={handleLearnTogglePlay}
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

            <ThemedText>声: </ThemedText>
            {LEARN_VOICE_PRESETS.map((preset) => (
              <Pressable
                key={preset.id}
                style={[styles.speedButton, voiceId === preset.id && styles.speedButtonActive]}
                onPress={() => setVoiceId(preset.id)}
              >
                <ThemedText style={[styles.speedText, voiceId === preset.id && styles.speedTextActive]}>
                  {preset.label}
                </ThemedText>
              </Pressable>
            ))}

            {/* Deep Dive Button (Moved inside speedContainer) */}
            {(digDeeperButtonVisible) ? (
              <Pressable style={styles.digDeeperButtonSmall} onPress={handleOpenDeepDive}>
                <MaterialIcons
                  name={(digDeeperUrl === '54' && subject === '民法総則') ? "brush" : "article"}
                  size={16}
                  color="#fff"
                  style={webNoHitChild}
                />
                <ThemedText style={[styles.digDeeperTextSmall, webNoHitChild]}>
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

        {/* DraggableNote の GestureDetector 用。全面 GH は Web で深掘りのタッチを奪うため使わない */}
        {notes.length > 0 ? (
          Platform.OS === 'web' ? (
            <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
              {notes.map((note) => (
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
            </View>
          ) : (
            <GestureHandlerRootView style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
              {notes.map((note) => (
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
            </GestureHandlerRootView>
          )
        ) : null}

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
                {dictionaryEntry?.def ? (
                  <MarkdownText
                    text={dictionaryEntry.def.trim()}
                    style={{ fontSize: 16, lineHeight: 26, color: colors.text }}
                  />
                ) : null}
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
  );
}

function SeekBar({
  currentIndex,
  totalCount,
  onSeek,
}: {
  currentIndex: number;
  totalCount: number;
  onSeek: (index: number) => void;
}) {
  const widthRef = useRef(1);
  /** ジェスチャ開始時点の 0〜1 進捗（dx を足して追従。measureInWindow に依存しない） */
  const startProgressRef = useRef(0);

  const [visualProgress, setVisualProgress] = useState(0);

  useEffect(() => {
    if (totalCount > 1) {
      setVisualProgress(currentIndex / (totalCount - 1));
    } else {
      setVisualProgress(0);
    }
  }, [currentIndex, totalCount]);

  const commitSeek = useCallback(
    (p: number) => {
      if (totalCount <= 1) return;
      const idx = Math.round(Math.min(1, Math.max(0, p)) * (totalCount - 1));
      onSeek(idx);
    },
    [totalCount, onSeek]
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => totalCount > 1,
        onStartShouldSetPanResponderCapture: () => totalCount > 1,
        onMoveShouldSetPanResponder: () => totalCount > 1,
        onMoveShouldSetPanResponderCapture: () => false,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (e) => {
          const w = widthRef.current;
          if (w <= 0) return;
          startProgressRef.current = Math.min(1, Math.max(0, e.nativeEvent.locationX / w));
          setVisualProgress(startProgressRef.current);
        },
        onPanResponderMove: (_e, gs) => {
          const w = widthRef.current;
          if (w <= 0) return;
          const p = Math.min(1, Math.max(0, startProgressRef.current + gs.dx / w));
          setVisualProgress(p);
        },
        onPanResponderRelease: (_e, gs) => {
          const w = widthRef.current;
          if (w <= 0) return;
          const p = Math.min(1, Math.max(0, startProgressRef.current + gs.dx / w));
          setVisualProgress(p);
          commitSeek(p);
        },
      }),
    [totalCount, commitSeek]
  );

  const pct = totalCount > 1 ? Math.min(100, Math.max(0, visualProgress * 100)) : 0;

  return (
    <ThemedView style={styles.seekBarContainer}>
      <View
        style={styles.seekBarHitArea}
        onLayout={(e) => {
          widthRef.current = e.nativeEvent.layout.width;
        }}
        {...panResponder.panHandlers}
      >
        <View style={styles.seekBarTrack} pointerEvents="box-none">
          <View
            pointerEvents="none"
            style={[
              styles.seekBarProgress,
              { width: `${pct}%`, backgroundColor: '#007BFF' },
            ]}
          />
          <View pointerEvents="none" style={[styles.seekBarThumb, { left: `${pct}%` }]} />
        </View>
      </View>
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
  kisoSummaryLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  kisoSummaryLinkText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
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
  returnToQuizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  returnToQuizButtonText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
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
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  /** タッチ領域（トラック本体は8pxだが、ここで44px確保） */
  seekBarHitArea: {
    width: '100%',
    height: 44,
    justifyContent: 'center',
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
});
