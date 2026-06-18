import Constants from 'expo-constants';
import { Link, router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Animated, Image, Modal, PanResponder, Platform, Pressable, ScrollView, StyleSheet, TextInput, View, type StyleProp, type ViewStyle } from 'react-native';

import { DiagramModal } from '@/components/diagram-modal';
import { MarkdownText } from '@/components/markdown-text';
import { PersonFlowDiagramModal } from '@/components/person-flow-diagram-modal';
import { SaikokuCompareModal } from '@/components/saikoku-compare-modal';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCharacter } from '@/src/context/CharacterContext';
import { useTheme } from '@/src/context/ThemeContext';
import { setDeepdiveParams } from '@/src/deepdiveState';
import { RESOURCES } from '@/src/questions';
import { mergeQuizResourcePages, parseQuizRefIds } from '@/utils/quizResources';
import { explainChoiceIntent, generateDescriptiveQuestion } from '@/src/utils/geminiService';
import { formatDescriptiveText, type TextSegment } from '@/utils/formatDescriptiveText';
import { formatNumberedClauses, getChoicePrefix, hasNumberPrefix, splitHtmlUnderlineTags, splitNumberPrefix } from '@/utils/choiceNumber';
import { getQuestionMark, setQuestionMark, type QuestionMark } from '@/utils/question-marks';
import {
  addOrSubtractQuestionHighlightRange,
  getQuestionHighlightRanges,
  mergeHighlightRanges,
  splitTextByHighlightRanges,
  type HighlightRange,
} from '@/utils/question-highlight-ranges';
import { getQuestionHighlights, setQuestionHighlights, toggleQuestionHighlight } from '@/utils/question-highlights';
import { getHiddenHashes, hideQuestionByHash } from '@/utils/question-hidden';
import {
  filterHiddenFromQuestions,
  filterQuizQuestionsByMode,
  getMergedSubjectData,
  pickQuestionsForField,
  shuffleQuestionsCopy,
} from '@/utils/quiz-question-pipeline';
import { parseComboChoiceParts, splitSlotOptionParts } from '@/utils/slotNormalize';
import { getQuestionStats, getQuestionTextHash, reconcileAllAttemptsAsCorrect, type QuestionStats } from '@/utils/question-stats';
import { CIVIL_PRECEDENT_IMAGES } from '@/src/civilPrecedentImages';
import { resolveMondaibunnGazoItems } from '@/src/mondaibunn-gazou';
import { extractQuestionCast } from '@/src/castRegistry';
import { isMinpoPersonFlowField, isPersonFlowEligible, resolvePersonFlowDiagram } from '@/src/personFlowDiagram';
import {
  pickCompareTable,
  resolveCompareTableImage,
} from '@/src/compareTables';

/** Web: 蛍光ペン ON 時のカーソル（黄色マーカー形、ホットスポットは先端付近） */
const HIGHLIGHTER_CURSOR_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'><path fill='#FFEB3B' stroke='#F9A825' stroke-width='1.5' d='M7 29 L16 9 L25 5 L30 14 L13 31 Z'/><ellipse cx='10' cy='30' rx='6' ry='3' fill='#FFF59D' opacity='0.95'/></svg>";
const webHighlighterCursor: string | undefined =
  Platform.OS === 'web'
    ? `url("data:image/svg+xml,${encodeURIComponent(HIGHLIGHTER_CURSOR_SVG)}") 10 32, crosshair`
    : undefined;

/** スプレッドシートで「…どれか。ア　…」が1行に詰まったとき用 */
function normalizeKatakanaChoiceNewlines(body: string): string {
  if (!body) return body;
  return body.replace(/([。．）])\s*([アイウエオ])([\u3000 ])/g, '$1\n$2$3');
}

/** `<u>…</u>` を下線表示にしタグは除く（formatNumberedClauses 後に適用）。親 ThemedText に style があるときは内側は下線のみ付与 */
function questionLineWithUnderlineNodes(rawLine: string, keyPrefix: string): React.ReactNode {
  const formatted = formatNumberedClauses(rawLine);
  const pieces = splitHtmlUnderlineTags(formatted);
  if (pieces.length === 1 && !pieces[0].underline) {
    return pieces[0].text;
  }
  return pieces.map((p, i) => (
    <ThemedText key={`${keyPrefix}-${i}`} style={p.underline ? { textDecorationLine: 'underline' as const } : undefined}>
      {p.text}
    </ThemedText>
  ));
}

/** 行頭の「ア　本文」形式（択一の記述肢ブロック） */
function matchKatakanaChoiceLine(seg: string): { label: string; sep: string; rest: string } | null {
  const m = seg.match(/^\s*([アイウエオ])([\u3000 ])([\s\S]*)$/);
  if (!m) return null;
  const rest = m[3];
  if (!rest.trim()) return null;
  return { label: m[1], sep: m[2], rest };
}

/** 「ア・ウ」「ア･イ」など組合せ肢をラベル配列に分解 */
function splitChoiceIntoKatakanaPairLabels(choice: string): string[] {
  return String(choice || '')
    .replace(/※/g, '')
    .split(/[・･\s]+/)
    .map((s) => s.trim())
    .filter((s) => /^[アイウエオ]$/.test(s));
}

/** 全肢が「ア・イ」形式の2文字組合せ（茎のア〜オタップと下の択一を同期する対象） */
function choicesAreKatakanaPairs(choices: unknown): boolean {
  if (!Array.isArray(choices) || choices.length < 2) return false;
  const pair = /^[アイウエオ][・･][アイウエオ]$/;
  return (choices as string[]).every((c) => pair.test(String(c || '').replace(/※/g, '').trim()));
}

/** wordBank の「【ア】\\n語1 / 語2」ブロックをカード表示用に分解 */
function parseWordBankKatakanaBlocks(wb: string): { title: string; items: string[] }[] {
  const raw = String(wb || '').trim();
  if (!raw) return [];
  const chunks = raw.split(/\n\n+/).map((c) => c.trim()).filter(Boolean);
  const out: { title: string; items: string[] }[] = [];
  for (const ch of chunks) {
    const lines = ch.split('\n');
    const head = (lines[0] || '').trim();
    if (!/^【[アイウエオ]{1,2}】\s*$/.test(head)) continue;
    const rest = lines.slice(1).join('\n').trim();
    const items = splitSlotOptionParts(rest);
    const cleaned = items.map((s) => s.replace(/[\(（]\s*[rｒ]\s*[\)）]/gi, '').trim()).filter(Boolean);
    if (cleaned.length) out.push({ title: head, items: cleaned });
  }
  return out;
}

const GEMINI_API_KEY = (typeof Constants?.expoConfig?.extra !== 'undefined' && (Constants.expoConfig.extra as any)?.geminiApiKey) || (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_GEMINI_API_KEY) || (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || '';

function buildCurrentInsight(stats: QuestionStats | null) {
  const correct = stats?.correct ?? 0;
  const wrong = stats?.wrong ?? 0;
  const consecutiveCorrect = stats?.consecutiveCorrect ?? 0;
  const attempts = correct + wrong;
  const rate = attempts > 0 ? Math.round((correct / attempts) * 100) : null;

  if (attempts === 0) {
    return {
      level: 1,
      label: '未測定',
      rateLabel: '--%',
      message: 'まず1回解いて、どこで迷うかを記録する段階。',
      nextInput: '見て聞いて覚える。問題文の主語・要件・例外に線を引く。',
      accent: '#8D6E63',
    };
  }
  if (wrong >= 3 && (rate ?? 0) < 50) {
    return {
      level: 2,
      label: '入口から再構築',
      rateLabel: `${rate}%`,
      message: '知識が断片化していて、問題文の形が変わると崩れやすい。',
      nextInput: '条文・制度趣旨・典型例を1枚の図に戻してから解き直す。',
      accent: '#C62828',
    };
  }
  if ((rate ?? 0) < 60 || wrong >= 2) {
    return {
      level: 5,
      label: '基礎あり・変形に弱い',
      rateLabel: `${rate}%`,
      message: '基本知識はあるが、ひっかけや横断比較で落としやすい。',
      nextInput: '似た制度との差、例外、手続の順番を「もっと深掘る」の図で整理する。',
      accent: '#EF6C00',
    };
  }
  if ((rate ?? 0) < 80 || consecutiveCorrect < 2) {
    return {
      level: 7,
      label: '合格答案に接近中',
      rateLabel: `${rate}%`,
      message: '主要論点は取れている。次は理由付けと別角度の出題に耐える段階。',
      nextInput: '誤答肢のどの文言が決め手かを説明できるまで深掘る。',
      accent: '#2E7D32',
    };
  }
  if ((rate ?? 0) < 95 || consecutiveCorrect < 5) {
    return {
      level: 9,
      label: '本試験対応圏',
      rateLabel: `${rate}%`,
      message: '安定している。時間をかけずに根拠まで言えるかを確認する段階。',
      nextInput: '1問30秒で要件・結論・理由を口頭チェックする。',
      accent: '#1565C0',
    };
  }
  return {
    level: 10,
    label: '司法試験合格レベル級',
    rateLabel: `${rate}%`,
    message: 'この論点はかなり強い。復習頻度を下げ、他の弱点へ時間を回せる。',
    nextInput: '月1回の確認に落として、類似論点との比較だけ維持する。',
    accent: '#6A1B9A',
  };
}

function tacQuizSourceLabel(question: any): string {
  const sourceText = `${question?.memo || ''} ${question?.text || ''}`;
  if (/TAC第3回|TAC3|ボーナスTAC3/.test(sourceText)) return 'TAC第3回';
  if (/TAC第2回|TAC2|ボーナスTAC2/.test(sourceText)) return 'TAC第2回';
  if (/TAC第1回|TAC|ボーナスTAC/.test(sourceText)) return 'TAC第1回';
  return '';
}

function buildTacQuizDeepdive(question: any, subjectLabel: string, fieldLabel: string): string {
  const sourceLabel = tacQuizSourceLabel(question);
  if (!sourceLabel) return '';
  const choices = Array.isArray(question?.choices)
    ? question.choices.map((choice: string, index: number) => `${index + 1}. ${String(choice || '').replace(/※/g, '').trim()}`).join('\n')
    : '';
  const choiceExplanations = Array.isArray(question?.choiceExplanations)
    ? question.choiceExplanations.map((explain: string, index: number) => {
        const body = String(explain || '').trim();
        return body ? `### ${index + 1}\n${body}` : '';
      }).filter(Boolean).join('\n\n')
    : '';
  const choiceDeepDive = Array.isArray(question?.choiceDeepDive)
    ? question.choiceDeepDive.map((body: string, index: number) => {
        const text = String(body || '').trim();
        return text ? `### 肢${index + 1}\n${text}` : '';
      }).filter(Boolean).join('\n\n')
    : '';
  const fieldText = [subjectLabel, fieldLabel].filter(Boolean).join(' / ');
  return [
    `# ${sourceLabel} ボーナス問題のもっと深掘る`,
    fieldText ? `対象: ${fieldText}` : '',
    '## 問題',
    String(question?.text || '').replace(/^【ボーナスTAC(?:2|3)?】\s*/, '').trim(),
    choices ? `## 選択肢\n${choices}` : '',
    question?.explain ? `## まず押さえる解説\n${String(question.explain).trim()}` : '',
    choiceExplanations ? `## 肢別チェック\n${choiceExplanations}` : '',
    choiceDeepDive ? `## もっと深掘る\n${choiceDeepDive}` : '',
    '## 図解',
    '```text',
    `${sourceLabel}の論点`,
    '  ↓ 原問の文章は使わず、論点だけを復習化',
    '問題文の主語・要件・例外を分ける',
    '  ↓',
    '正解肢の根拠と、誤答肢のズレを1つずつ説明する',
    '```',
    '## 解き直しチャンク',
    '- 正解番号を覚える前に、各肢の決め手になる語句を1つ拾う。',
    '- 誤答した肢は、どの要件・例外・数字を取り違えたかをメモする。',
    '- 同じ論点の見て聞いて覚えるカードへ戻り、短い結論を音読する。',
  ].filter(Boolean).join('\n\n');
}

function DraggableWordBankItem({
  value,
  onDrop,
  onPress,
  borderColor,
  textColor,
  itemStyle,
}: {
  value: string;
  onDrop: (value: string, pageX: number, pageY: number) => void;
  onPress: () => void;
  borderColor: string;
  textColor: string;
  /** 長文語群などは width 100% にする */
  itemStyle?: StyleProp<ViewStyle>;
}) {
  const pan = useRef(new Animated.ValueXY()).current;
  const [dragging, setDragging] = useState(false);

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
      bounciness: 6,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 4 || Math.abs(gestureState.dy) > 4,
      onPanResponderGrant: () => {
        setDragging(true);
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: (evt) => {
        setDragging(false);
        onDrop(value, evt.nativeEvent.pageX, evt.nativeEvent.pageY);
        resetPosition();
      },
      onPanResponderTerminate: () => {
        setDragging(false);
        resetPosition();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.wordBankItem,
        styles.wordBankItemPressable,
        { borderColor, transform: pan.getTranslateTransform() },
        itemStyle,
        dragging && styles.wordBankItemDragging,
      ]}
    >
      <Pressable onPress={onPress} style={styles.wordBankItemButton}>
        <ThemedText style={{ color: textColor, fontSize: 14 }}>{value}</ThemedText>
      </Pressable>
    </Animated.View>
  );
}

export default function QuestionScreen() {
  const params = useLocalSearchParams<{ subject?: string; field?: string; index?: string; correctCountSession?: string; wrongCounts?: string; mode?: string; shuffle?: string }>();
  const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;
  const paramField = Array.isArray(params.field) ? params.field[0] : params.field;
  const mode = Array.isArray(params.mode) ? params.mode[0] : params.mode;
  const isShuffle = (Array.isArray(params.shuffle) ? params.shuffle[0] : params.shuffle) === '1';
  // 記述シートと同一ジャンルの分野のみ（記）表示。分野内はキーワードで細分化。
  const DESCRIPTIVE_SCOPE_FIELDS: Record<string, string[]> = {
    民法: ['民法総則', '民法物権', '債権総論', '債権各論'],
    行政法: ['行政手続法', '行政不服審査法', '行政事件訴訟法', '地方自治法'],
  };
  /** 分野ごとの細目キーワード（問題文・選択肢のいずれかに含まれるときのみ（記）表示）。細かく指定して記述シートと同テーマに限定 */
  const DESCRIPTIVE_SCOPE_KEYWORDS: Record<string, string[]> = {
    行政手続法: [
      '行政指導', '行政指導の中止', '中止を求める', '聴聞', '聴聞の通知', '名あて人', '弁明の機会', '弁明の機会の付与',
      '申請', '許認可', '届出', '不利益処分', '命令を求める', '何人も', '意見公募', '意見公募手続', '公聴会',
      '処分の求め', '行政手続法に規定され', '行政手続法に定め', '定義に照らして',
    ],
    行政不服審査法: [
      '審査請求', '異議申立て', '再審査請求', '原処分主義', '裁決', '裁決取消', '被告は', '棄却する裁決',
      '開発審査会', '審査会', '前置', '裁決主義',
    ],
    行政事件訴訟法: [
      '取消訴訟', '無効等確認', '不作為の違法確認', '義務付け', '差止め', '当事者訴訟', '民衆訴訟', '機関訴訟',
      '法律上の争訟', '訴え却下', '競願', '免許処分', '拒否処分', '被告として',
    ],
    地方自治法: [
      '条例', '過料', '秩序罰', '行政上の秩序罰', '市長により科される', '地方自治法に定め',
    ],
    民法総則: [
      '成年被後見人', '催告', '確答', '追認', '詐欺', '取消', '無権代理', '無権代理人', '行為能力', '制限行為能力',
      '意思表示', '取り消す', '信義則',
    ],
    民法物権: [
      '背信的悪意者', '登記', '対抗', '取得時効', '占有', '共有', '抵当権', '譲渡', '二重譲渡',
      '登記の欠缺', '無権利者',
    ],
    債権総論: [
      '債務不履行', '弁済', '相殺', '債権者代位', '詐害行為取消', '代位', '損害賠償',
    ],
    債権各論: [
      '売買', '賃貸借', '請負', '不法行為', '不当利得', '契約', '解除', '責任',
    ],
  };
  const isInDescriptiveField =
    subject !== '記述' && subject && paramField && (DESCRIPTIVE_SCOPE_FIELDS[subject]?.includes(paramField) ?? false);

  const { colors, theme } = useTheme();

  // 間違えた回数（問題インデックス → 回数）。1回=黄、2回以上=赤でサイドバー表示
  const wrongCounts = useMemo((): Record<number, number> => {
    try {
      const s = Array.isArray(params.wrongCounts) ? params.wrongCounts[0] : params.wrongCounts;
      if (!s) return {};
      const parsed = JSON.parse(s);
      const out: Record<number, number> = {};
      Object.keys(parsed || {}).forEach((k) => {
        const n = parseInt(k, 10);
        if (!isNaN(n)) out[n] = Math.max(0, parseInt(String(parsed[k]), 10) || 0);
      });
      return out;
    } catch {
      return {};
    }
  }, [params.wrongCounts]);

  const subjectData = useMemo(() => getMergedSubjectData(subject), [subject]);

  const { field, baseQuestions } = useMemo(() => {
    const fields = Object.keys(subjectData);
    if (fields.length === 0) {
      return { field: null, baseQuestions: [] as any[] };
    }
    const { field: selectedField, targetQuestions } = pickQuestionsForField(subjectData, paramField);
    let list = filterQuizQuestionsByMode(targetQuestions, subject, mode);
    if (isShuffle && list.length > 0) {
      list = shuffleQuestionsCopy(list);
    }
    return { field: selectedField, baseQuestions: list };
  }, [subjectData, paramField, mode, isShuffle]);

  const [hiddenHashes, setHiddenHashes] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!subject || !field) return;
    getHiddenHashes(subject, field).then(setHiddenHashes);
  }, [subject, field]);

  const questions = useMemo(
    () => filterHiddenFromQuestions(baseQuestions, hiddenHashes, getQuestionTextHash),
    [baseQuestions, hiddenHashes]
  );

  // State for current question index
  const [questionIndex, setQuestionIndex] = useState<number | null>(null);
  const [isLongText, setIsLongText] = useState(false);

  const question = questionIndex !== null ? questions[questionIndex] : null;

  const stripQuestionText = useCallback(
    (s: string) => (s || '').replace(/[\(（]\s*[rｒ]\s*[\)）]/gi, '').trim(),
    []
  );
  const { applyCharacterNames, characterMap } = useCharacter();

  const [questionStats, setQuestionStats] = useState<QuestionStats | null>(null);
  const [questionMark, setQuestionMarkState] = useState<QuestionMark>(null);
  const [highlightedSegments, setHighlightedSegments] = useState<Set<number>>(new Set());
  const [highlightRanges, setHighlightRanges] = useState<HighlightRange[]>([]);
  const [showCurrentInsight, setShowCurrentInsight] = useState(true);

  useEffect(() => {
    if (!subject || !field || !question?.text) {
      setQuestionStats(null);
      setHighlightRanges([]);
      return;
    }
    const qt = stripQuestionText(question.text);
    getQuestionStats(subject, field, question.text).then(setQuestionStats);
    getQuestionMark(subject, field, question.text).then(setQuestionMarkState);
    getQuestionHighlights(subject, field, qt).then(setHighlightedSegments);
    getQuestionHighlightRanges(subject, field, qt).then(setHighlightRanges);
  }, [subject, field, question?.text, stripQuestionText]);

  /** 記述スコープ・教えて先生・蛍光ペン（同時に ON にできない） */
  type ActionMode = 'descriptiveScope' | 'teachMe' | 'highlighterPen' | null;
  const [activeActionMode, setActiveActionMode] = useState<ActionMode>(null);
  const highlighterPenOn = activeActionMode === 'highlighterPen';

  /** 問題文 蛍光ペン（ドラッグで行／段落単位にハイライトを連続追加） */
  const [penScrollLock, setPenScrollLock] = useState(false);
  const highlighterPenOnRef = useRef(false);
  const highlightedSegmentsRef = useRef<Set<number>>(highlightedSegments);
  const penSegRefs = useRef<Record<number, View | null>>({});
  const penBoundsRef = useRef<Record<number, { l: number; t: number; r: number; b: number }>>({});
  const penLastHitRef = useRef<number | null>(null);
  const penDragAccRef = useRef<Set<number>>(new Set());
  /** なぞり開始時の行ハイライト（消し／追加の判定用） */
  const penDragStartHighlightsRef = useRef<Set<number>>(new Set());
  const penDragTouchedRef = useRef<Set<number>>(new Set());
  const penPersistRef = useRef({ subject: '', field: '', text: '' });
  const applyPenAtXYRef = useRef<(x: number, y: number) => void>(() => {});
  /** Web: プレーン問題文で選択範囲ハイライト表示中のみ true（renderQuestionText 内で更新） */
  const webPenSelectionActiveRef = useRef(false);
  const webHighlightLayoutRef = useRef({ canonical: '', storageText: '' });

  highlightedSegmentsRef.current = highlightedSegments;
  highlighterPenOnRef.current = highlighterPenOn;

  const remeasurePenBounds = useCallback(() => {
    const refs = penSegRefs.current;
    for (const k of Object.keys(refs)) {
      const idx = Number(k);
      const v = refs[idx];
      if (v && typeof (v as any).measureInWindow === 'function') {
        (v as any).measureInWindow((x: number, y: number, w: number, h: number) => {
          penBoundsRef.current[idx] = { l: x, t: y, r: x + w, b: y + h };
        });
      }
    }
  }, []);

  useEffect(() => {
    penSegRefs.current = {};
    penBoundsRef.current = {};
  }, [question?.text]);

  useEffect(() => {
    if (!highlighterPenOn) return;
    const id = requestAnimationFrame(() => remeasurePenBounds());
    return () => cancelAnimationFrame(id);
  }, [highlighterPenOn, questionIndex, remeasurePenBounds]);

  applyPenAtXYRef.current = (pageX: number, pageY: number) => {
    const bounds = penBoundsRef.current;
    const indices = Object.keys(bounds)
      .map(Number)
      .filter((n) => Number.isFinite(n))
      .sort((a, b) => a - b);
    let hit: number | null = null;
    for (const idx of indices) {
      const b = bounds[idx];
      if (!b) continue;
      if (pageX >= b.l && pageX <= b.r && pageY >= b.t && pageY <= b.b) {
        hit = idx;
        break;
      }
    }
    if (hit === null) return;
    const last = penLastHitRef.current;
    const touched = penDragTouchedRef.current;
    if (last === null) {
      touched.add(hit);
    } else if (last !== hit) {
      const lo = Math.min(last, hit);
      const hi = Math.max(last, hit);
      for (let i = lo; i <= hi; i++) touched.add(i);
    }
    penLastHitRef.current = hit;
    const base = penDragStartHighlightsRef.current;
    const eraseStroke = touched.size > 0 && [...touched].every((i) => base.has(i));
    const acc = eraseStroke
      ? new Set([...base].filter((i) => !touched.has(i)))
      : new Set([...base, ...touched]);
    penDragAccRef.current = acc;
    setHighlightedSegments(acc);
  };

  penPersistRef.current = {
    subject: subject ?? '',
    field: field ?? '',
    text: (question as any)?.text ?? '',
  };

  const capturePenSegmentRef = useCallback((idx: number) => (el: View | null) => {
    if (el) penSegRefs.current[idx] = el;
    else delete penSegRefs.current[idx];
  }, []);

  const penPanResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => highlighterPenOnRef.current,
        onStartShouldSetPanResponderCapture: () => highlighterPenOnRef.current,
        onMoveShouldSetPanResponder: () => highlighterPenOnRef.current,
        onMoveShouldSetPanResponderCapture: () => highlighterPenOnRef.current,
        onPanResponderGrant: (e) => {
          setPenScrollLock(true);
          penLastHitRef.current = null;
          penDragStartHighlightsRef.current = new Set(highlightedSegmentsRef.current);
          penDragTouchedRef.current = new Set();
          penDragAccRef.current = new Set(highlightedSegmentsRef.current);
          applyPenAtXYRef.current(e.nativeEvent.pageX, e.nativeEvent.pageY);
        },
        onPanResponderMove: (_, g) => {
          applyPenAtXYRef.current(g.moveX, g.moveY);
        },
        onPanResponderRelease: () => {
          setPenScrollLock(false);
          penLastHitRef.current = null;
          const { subject: subj, field: fld, text: qt } = penPersistRef.current;
          if (subj && fld && qt) {
            void setQuestionHighlights(subj, fld, qt, penDragAccRef.current);
          }
        },
        onPanResponderTerminate: () => {
          setPenScrollLock(false);
          penLastHitRef.current = null;
        },
      }),
    []
  );

  const handleWebQuestionMouseUp = useCallback(
    (e: any) => {
      if (Platform.OS !== 'web' || !highlighterPenOn || !subject || !field || !webPenSelectionActiveRef.current) return;
      const { canonical, storageText } = webHighlightLayoutRef.current;
      if (!canonical.length || !storageText) return;
      const sel = typeof window !== 'undefined' && window.getSelection?.();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) return;
      const root = e?.currentTarget as { contains?: (n: Node | null) => unknown } | undefined;
      if (!root || typeof root.contains !== 'function') return;
      const range = sel.getRangeAt(0);
      const anchor = (range as unknown as { commonAncestorContainer: Node | null }).commonAncestorContainer;
      if (!anchor || !root.contains(anchor)) return;
      const pre = document.createRange();
      pre.selectNodeContents(root as unknown as Node);
      pre.setEnd(range.startContainer, range.startOffset);
      const start = pre.toString().length;
      pre.selectNodeContents(root as unknown as Node);
      pre.setEnd(range.endContainer, range.endOffset);
      const end = pre.toString().length;
      if (start >= end) return;
      sel.removeAllRanges();
      void addOrSubtractQuestionHighlightRange(
        subject,
        field,
        storageText,
        start,
        end,
        canonical.length
      ).then(setHighlightRanges);
    },
    [highlighterPenOn, subject, field]
  );

  useEffect(() => {
    setIsLongText(false);
  }, [questionIndex]);

  // State for dimmed choices (indices)
  const [dimmedIndices, setDimmedIndices] = useState<number[]>([]);

  // State for multi-select
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  /** 組合せ問題（ア・ウ形式）: 問題文でタップしたア〜オラベル */
  const [stemComboLetters, setStemComboLetters] = useState<string[]>([]);

  // State for 並べ替え問題（表示順のインデックス配列）
  const [reorderOrder, setReorderOrder] = useState<number[]>([]);
  // クリック順で選択（並べ替え問題）
  const [reorderSelection, setReorderSelection] = useState<number[]>([]);

  // State for 記述式（文章入力）
  const [descriptiveAnswer, setDescriptiveAnswer] = useState('');
  // 記述スコープ: 択一問題を記述で答えるモード
  const [descriptiveScopeOn, setDescriptiveScopeOn] = useState(false);
  const [scopeDescriptiveAnswer, setScopeDescriptiveAnswer] = useState('');

  const [scopeGeneratedQuestion, setScopeGeneratedQuestion] = useState('');
  const [scopeGeneratedModelAnswer, setScopeGeneratedModelAnswer] = useState('');
  const [scopeGenerateLoading, setScopeGenerateLoading] = useState(false);
  const [scopeGenerateError, setScopeGenerateError] = useState<string | null>(null);
  const [teachMeModalVisible, setTeachMeModalVisible] = useState(false);
  const [teachMeContent, setTeachMeContent] = useState('');
  const [teachMeLoading, setTeachMeLoading] = useState(false);
  const [teachMeError, setTeachMeError] = useState<string | null>(null);

  const requestTeachMe = useCallback(async (choiceText: string) => {
    if (!GEMINI_API_KEY) {
      setTeachMeError('APIキー未設定。.env に EXPO_PUBLIC_GEMINI_API_KEY を設定してください。');
      setTeachMeModalVisible(true);
      return;
    }
    setTeachMeError(null);
    setTeachMeContent('');
    setTeachMeModalVisible(true);
    setTeachMeLoading(true);
    try {
      const text = question?.text || '';
      const explain = (question as any)?.explain || '';
      const result = await explainChoiceIntent(GEMINI_API_KEY, {
        problemText: text,
        choiceText,
        explain: explain || undefined,
      });
      setTeachMeContent(result);
    } catch (e: any) {
      setTeachMeError(e?.message || '説明の取得に失敗しました。');
    } finally {
      setTeachMeLoading(false);
    }
  }, [question?.text, question?.explain]);

  const requestDescriptiveScope = useCallback(async (choiceText: string) => {
    setScopeGenerateError(null);
    setScopeGeneratedQuestion('');
    setScopeGeneratedModelAnswer('');
    setScopeGenerateLoading(true);
    if (!GEMINI_API_KEY) {
      setScopeGenerateError('APIキー未設定。.env に EXPO_PUBLIC_GEMINI_API_KEY を設定してください。');
      setScopeGenerateLoading(false);
      return;
    }
    try {
      const text = question?.text || '';
      const choices = ((question as any)?.choices || []).map((c: string) => (c || '').replace(/※/g, ''));
      const result = await generateDescriptiveQuestion(GEMINI_API_KEY, {
        problemText: text,
        choices,
        selectedChoiceText: choiceText,
      });
      setScopeGeneratedQuestion(result.question);
      setScopeGeneratedModelAnswer(result.modelAnswer);
    } catch (e: any) {
      setScopeGenerateError(e?.message || '記述問題の生成に失敗しました。');
    } finally {
      setScopeGenerateLoading(false);
    }
  }, [question?.text, question?.choices]);

  // Reset dimmed choices and selections when question changes
  useEffect(() => {
    setPenScrollLock(false);
    setDimmedIndices([]);
    setSelectedIndices([]);
    setStemComboLetters([]);
    setDescriptiveAnswer('');
    setDescriptiveScopeOn(false);
    setScopeDescriptiveAnswer('');
    setScopeGeneratedQuestion('');
    setScopeGeneratedModelAnswer('');
    setScopeGenerateError(null);
    setActiveActionMode(null);
    setReorderSelection([]);
    setDiagramModalVisible(false);
  }, [questionIndex]);

  const hasScopeGenerated = scopeGeneratedQuestion !== '';
  const showScopeBlock = scopeGenerateLoading || hasScopeGenerated || !!scopeGenerateError;

  // Reset scope when cancelling
  const cancelScopeDescriptive = useCallback(() => {
    setScopeGeneratedQuestion('');
    setScopeGeneratedModelAnswer('');
    setScopeDescriptiveAnswer('');
    setScopeGenerateError(null);
  }, []);

  // 並べ替え問題: 初期化（シャッフルした順序）
  useEffect(() => {
    if ((question as any)?.isReorder && question?.choices?.length) {
      const indices = question.choices.map((_: string, i: number) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setReorderOrder(indices);
    } else {
      setReorderOrder([]);
    }
  }, [questionIndex, question?.choices, (question as any)?.isReorder]);

  // State for slots
  const [slotSelections, setSlotSelections] = useState<{ [key: string]: string }>({});
  const [activeSlot, setActiveSlot] = useState<{ label: string; options: string } | null>(null);
  const slotDropRefs = useRef<Record<string, View | null>>({});

  // State for Resource Modal
  const [resourceModalVisible, setResourceModalVisible] = useState(false);
  const [resourcePage, setResourcePage] = useState(0);

  // State for 判例について知る Modal（民法のみ）
  const [precedentModalVisible, setPrecedentModalVisible] = useState(false);

  const sidebarScrollRef = useRef<ScrollView>(null);
  const questionSessionRef = useRef('');
  const ITEM_WIDTH = 42;

  const questionSessionKey = `${subject || ''}|${paramField || ''}|${mode || ''}|${isShuffle ? '1' : '0'}`;

  // Reset slots when question changes
  useEffect(() => {
    setSlotSelections({});
  }, [questionIndex]);

  const handleSlotPress = (slot: { label: string; options: string }) => {
    setActiveSlot((prev) => prev?.label === slot.label ? null : slot);
  };

  const handleSlotSelect = (val: string, forcedLabel?: string) => {
    const targetLabel = forcedLabel || activeSlot?.label;
    if (targetLabel) {
      setSlotSelections((prev) => ({ ...prev, [targetLabel]: val }));
      if (!forcedLabel || activeSlot?.label === forcedLabel) setActiveSlot(null);
    }
  };

  const clearSlotSelection = (label: string) => {
    setSlotSelections((prev) => {
      const next = { ...prev };
      delete next[label];
      return next;
    });
  };

  /** isCombinationChoicePrompt より前で定義するため、判定はここでインライン（同一正規表現） */
  const multiSelectGuideText = useMemo(() => {
    if (!question) return null;
    const ans = (question as any)?.answer;
    if (!Array.isArray(ans) || ans.length <= 1) return null;
    if (
      Array.isArray((question as any)?.slots) &&
      (question as any).slots.length > 0 &&
      typeof ans[0] === 'string'
    ) {
      return null;
    }
    const cb = (question as any).choiceIsBonus as boolean[] | undefined;
    const isBonusChoice = (i: number) => (cb && i < cb.length ? cb[i] : !!(question as any).isBonus);
    const hasBonusChoices = cb ? cb.some((b: boolean) => b) : !!(question as any).isBonus;
    const hasNormalChoices = cb ? cb.some((b: boolean) => !b) : !(question as any).isBonus;
    const isMixedBonus = hasBonusChoices && hasNormalChoices;
    const effective =
      mode !== 'bonus'
        ? ans.filter((i: number) => !isBonusChoice(i))
        : isMixedBonus || !hasBonusChoices
          ? ans
          : ans.filter((i: number) => isBonusChoice(i));
    const effectiveCount = effective.length > 0 ? effective.length : ans.length;
    if (effectiveCount <= 1) return null;
    const t = (question as any)?.text || '';
    const isComboPrompt = /の組合せはどれ|組み合わせはどれ|組合せはどれか|組合せはどれ。|当てはまるものの組合せ/.test(t);
    return isComboPrompt ? '２つ以上選んでね' : '１つ若しくは複数選んでください';
  }, [question, mode]);

  const isStemComboPairQuestion = useMemo(
    () => choicesAreKatakanaPairs((question as any)?.choices),
    [(question as any)?.choices]
  );

  const stemSyncedOriginalIndex = useMemo(() => {
    if (!question || !isStemComboPairQuestion) return null as number | null;
    const ch = (question as any).choices as string[];
    const sel = new Set(stemComboLetters);
    if (sel.size === 0) return null;
    for (let i = 0; i < ch.length; i++) {
      const parts = splitChoiceIntoKatakanaPairLabels(ch[i]);
      if (parts.length === 0 || parts.length !== sel.size) continue;
      const ok = parts.every((p) => sel.has(p)) && [...sel].every((s) => parts.includes(s));
      if (ok) return i;
    }
    return null;
  }, [question, isStemComboPairQuestion, stemComboLetters]);

  const toggleStemComboLetter = useCallback((label: string) => {
    setStemComboLetters((prev) => {
      const set = new Set(prev);
      if (set.has(label)) set.delete(label);
      else set.add(label);
      return Array.from(set).sort((a, b) => 'アイウエオ'.indexOf(a) - 'アイウエオ'.indexOf(b));
    });
  }, []);

  const renderQuestionText = () => {
    if (!question) return null;
    webPenSelectionActiveRef.current = false;
    let penUsesLineDrag = true;
    const text = stripQuestionText(question.text || '');
    const slots = (question as any).slots || [];
    const answer = (question as any).answer || [];
    const correctCount = Array.isArray(answer) ? answer.length : 0;
    const suffix = correctCount === 0 ? ' (回答設定中)' : ` (正解肢${correctCount}問)`;
    const isTashiQuestion = subject === '多肢選択';

    // 多肢選択: tashiData からスロットを生成（語群から選択して穴埋め）
    // options が空のダミースロットは無視（「次のア～オ」と誤マッチして本文が壊れるのを防ぐ）
    const effectiveSlots = interactiveSlots.length > 0 ? interactiveSlots : slots.filter((s: any) => s?.options);
    const canUseHighlighterPen = effectiveSlots.length === 0;

    // バッジ用ナンバー（コンテナ直下で外枠角に表示するためここで算出）
    const displayNum = hasNumberPrefix(text) ? splitNumberPrefix(text).prefix : getChoicePrefix(questionIndex ?? 0);

    let content;
    if (effectiveSlots.length === 0) {
      const isDescriptive = subject === '記述';
      const useFormatted = isDescriptive && text.length > 150;

      if (useFormatted) {
        const { body: questionBody } = splitNumberPrefix(text);
        const textForFormat = hasNumberPrefix(text) ? questionBody : text;
        const paragraphs = formatDescriptiveText(textForFormat);
        const segmentStyle = (seg: TextSegment) => {
          const base = theme === 'paper' ? { fontFamily: 'serif' as const } : {};
          switch (seg.type) {
            case 'header':
              return { ...base, color: '#333' };
            case 'section':
            case 'keyword':
            case 'person':
            case 'law':
            default:
              return { ...base, color: colors.text };
          }
        };
        content = (
          <View style={styles.descriptiveFormatted}>
            {paragraphs.map((para, pi) => {
              const isHighlighted = highlightedSegments.has(pi);
              const handleToggleHighlight = async () => {
                if (!subject || !field || !text) return;
                const next = await toggleQuestionHighlight(subject, field, text, pi);
                setHighlightedSegments(next);
              };
              return (
                <View key={pi} ref={capturePenSegmentRef(pi)} collapsable={false} style={{ alignSelf: 'stretch' }}>
                  <Pressable
                    pointerEvents={highlighterPenOn ? 'none' : 'auto'}
                    onPress={handleToggleHighlight}
                  >
                    <View
                      style={StyleSheet.flatten([
                        styles.descriptiveParagraph,
                        para.spacing === 'before' && { marginTop: 16 },
                        para.spacing === 'after' && { marginBottom: 16 },
                        para.spacing === 'both' && { marginVertical: 16 },
                        isHighlighted && { backgroundColor: '#FFF59D', padding: 8, borderRadius: 4 },
                      ].filter(Boolean))}
                    >
                      <ThemedText
                        style={[
                          styles.questionText,
                          { color: colors.text, lineHeight: 28, fontFamily: theme === 'paper' ? 'serif' : undefined }
                        ]}
                      >
                        {para.segments.map((seg, si) => (
                          <ThemedText key={si} style={segmentStyle(seg)}>
                            {questionLineWithUnderlineNodes(applyCharacterNames(seg.text), `d-${pi}-${si}`)}
                          </ThemedText>
                        ))}
                      </ThemedText>
                    </View>
                  </Pressable>
                </View>
              );
            })}
          </View>
        );
      } else {
        // ⑱等は常に上段、問題文は下段に分離（テキストに含まれる場合もgetChoicePrefixで付与する場合も同様）
        const { body: questionBody } = splitNumberPrefix(text);
        const displayBody = normalizeKatakanaChoiceNewlines(hasNumberPrefix(text) ? questionBody : text);
        const segments = displayBody.split(/\n/);
        if (segments.length === 0) segments.push('');
        const anySpecial = segments.some(
          (seg) =>
            /\*\*|\[\[red:/.test(seg) ||
            /<\s*u\s*>/i.test(seg) ||
            matchKatakanaChoiceLine(seg) !== null
        );
        const useWebSelectionHighlighter = Platform.OS === 'web' && !anySpecial;

        if (useWebSelectionHighlighter) {
          penUsesLineDrag = false;
          webPenSelectionActiveRef.current = true;
          const canonicalBody = segments.map((s) => formatNumberedClauses(s)).join('\n');
          webHighlightLayoutRef.current = { canonical: canonicalBody, storageText: text };
          const mergedRanges = mergeHighlightRanges(highlightRanges);
          const parts = splitTextByHighlightRanges(canonicalBody, mergedRanges);
          const baseTextStyleOuter = [
            styles.questionText,
            isTashiQuestion && styles.questionTextTashi,
            isLongText && styles.questionTextSmall,
            isTashiQuestion && isLongText && styles.questionTextTashiSmall,
            {
              color: colors.text,
              fontFamily: theme === 'paper' ? 'serif' : undefined,
              textAlign: 'left' as const,
            },
            Platform.OS === 'web' && highlighterPenOn ? ({ userSelect: 'text' } as object) : null,
          ].filter(Boolean);
          content = (
            <View style={{ alignSelf: 'stretch', width: '100%' }}>
              <ThemedText
                style={baseTextStyleOuter as any}
                selectable={!!highlighterPenOn}
                onTextLayout={(e) => {
                  if (e.nativeEvent.lines.length >= 15) setIsLongText(true);
                }}
              >
                {parts.map((p, i) =>
                  p.text ? (
                    <ThemedText
                      key={i}
                      style={
                        p.highlighted
                          ? { backgroundColor: '#FFF59D', borderRadius: 2 }
                          : undefined
                      }
                    >
                      {questionLineWithUnderlineNodes(applyCharacterNames(p.text), `web-${i}`)}
                    </ThemedText>
                  ) : null
                )}
              </ThemedText>
            </View>
          );
        } else {
        content = (
          <View>
            {segments.map((seg, idx) => {
              const isHighlighted = highlightedSegments.has(idx);
              const handleToggleHighlight = async () => {
                if (!subject || !field || !text) return;
                const next = await toggleQuestionHighlight(subject, field, text, idx);
                setHighlightedSegments(next);
              };
              const hasMarkdown = /\*\*|\[\[red:/.test(seg);
              const choiceLine = !hasMarkdown ? matchKatakanaChoiceLine(seg) : null;
              const prevSeg = idx > 0 ? segments[idx - 1] : '';
              const prevWasChoice =
                idx > 0 && !/\*\*|\[\[red:/.test(prevSeg) && matchKatakanaChoiceLine(prevSeg);
              const choiceBlockTopMargin = choiceLine && !prevWasChoice ? 10 : 0;
              const baseTextStyle = [
                styles.questionText,
                isTashiQuestion && styles.questionTextTashi,
                isLongText && styles.questionTextSmall,
                isTashiQuestion && isLongText && styles.questionTextTashiSmall,
                {
                  color: colors.text,
                  fontFamily: theme === 'paper' ? 'serif' : undefined,
                  textAlign: 'left' as const,
                },
                isHighlighted && !choiceLine && { backgroundColor: '#FFF59D', paddingVertical: 2, paddingHorizontal: 4, borderRadius: 4 },
              ];
              const choiceTextStyle = [
                styles.questionText,
                isTashiQuestion && styles.questionTextTashi,
                isLongText && styles.questionTextSmall,
                isTashiQuestion && isLongText && styles.questionTextTashiSmall,
                {
                  color: colors.text,
                  fontFamily: theme === 'paper' ? 'serif' : undefined,
                  textAlign: 'left' as const,
                },
              ];
              const stemCardSelected =
                isStemComboPairQuestion && choiceLine && stemComboLetters.includes(choiceLine.label);
              return (
                <View key={idx} ref={capturePenSegmentRef(idx)} collapsable={false} style={{ alignSelf: 'stretch', width: '100%' }}>
                  <Pressable
                    pointerEvents={highlighterPenOn ? 'none' : 'auto'}
                    onPress={() => {
                      if (isStemComboPairQuestion && choiceLine) {
                        toggleStemComboLetter(choiceLine.label);
                        return;
                      }
                      handleToggleHighlight();
                    }}
                    onLongPress={isStemComboPairQuestion && choiceLine ? handleToggleHighlight : undefined}
                    delayLongPress={200}
                    style={{ alignSelf: 'stretch', width: '100%' }}
                  >
                  {hasMarkdown ? (
                    <MarkdownText
                      text={seg}
                      applyNames={applyCharacterNames}
                      style={[
                        styles.questionText,
                        isTashiQuestion && styles.questionTextTashi,
                        isLongText && styles.questionTextSmall,
                        isTashiQuestion && isLongText && styles.questionTextTashiSmall,
                        { color: colors.text, fontFamily: theme === 'paper' ? 'serif' : undefined, textAlign: 'left' },
                        isHighlighted && { backgroundColor: '#FFF59D', paddingVertical: 2, paddingHorizontal: 4, borderRadius: 4 }
                      ]}
                    />
                  ) : choiceLine ? (
                    <View
                      style={[
                        styles.stemChoiceCard,
                        {
                          borderColor: colors.choiceBorder,
                          backgroundColor: colors.card,
                          marginTop: choiceBlockTopMargin,
                        },
                        (stemCardSelected || isHighlighted) && { backgroundColor: '#FFF9C4', borderColor: '#F9A825' },
                      ]}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
                        <ThemedText style={[...choiceTextStyle, { minWidth: 40, flexShrink: 0, paddingRight: 4 }]}>
                          {choiceLine.label}
                          {choiceLine.sep}
                        </ThemedText>
                        <ThemedText
                          style={[...choiceTextStyle, { flex: 1, flexShrink: 1 }]}
                          onTextLayout={idx === 0 ? (e) => {
                            if (e.nativeEvent.lines.length >= 15) setIsLongText(true);
                          } : undefined}
                        >
                          {questionLineWithUnderlineNodes(applyCharacterNames(choiceLine.rest), `ch-rest-${idx}`)}
                        </ThemedText>
                      </View>
                    </View>
                  ) : (
                    <ThemedText
                      style={baseTextStyle}
                      onTextLayout={idx === 0 ? (e) => {
                        if (e.nativeEvent.lines.length >= 15) setIsLongText(true);
                      } : undefined}
                    >
                      {questionLineWithUnderlineNodes(applyCharacterNames(seg), `stem-${idx}`)}
                    </ThemedText>
                  )}
                  </Pressable>
                </View>
              );
            })}
          </View>
        );
        }
      }
    } else {
      // Escape regex characters for labels（多肢選択は [ ア ] 形式、他はラベルそのまま）
      const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`(${effectiveSlots.map((s: any) => escapeRegExp(s.label)).join('|')})`, 'g');

      // ⑱等は常に上段、問題文は下段に分離
      const { body: questionBody } = splitNumberPrefix(text);
      const textForSlots = hasNumberPrefix(text) ? questionBody : text;
      const latinBracket = (_m: string, p1: string) => {
        const u = String(p1).normalize('NFKC');
        const L = u.length === 1 && u >= 'a' && u <= 'z' ? u.toUpperCase() : u;
        return `[ ${L} ]`;
      };
      // 多肢選択・英字空欄: テキスト内の [ ア ][ A ] 等を slot.label の形に正規化してマッチ
      const hasLatinSlot = effectiveSlots.some((s: any) => /\[ [A-Z] \]/.test(String(s?.label || '')));
      const hasKatakanaSlot = effectiveSlots.some((s: any) => /^\[\s*[ア-オ]\s*\]$/.test(String(s?.label || '')));
      // 会話型: (ア)(イ)(ウ) をスロット [ ア ] と同型に変換（正誤組合せ・下線部など）
      const baseForSlots =
        !tashiData && hasKatakanaSlot && !hasLatinSlot
          ? textForSlots.replace(/[\(（]\s*([ア-オ])\s*[\)）]/g, '[ $1 ]')
          : textForSlots;
      const normalizedText = tashiData
        ? textForSlots
            .replace(/［\s*([ア-オ])\s*］/g, '[ $1 ]')
            .replace(/\[\s*([ア-オ])\s*\]/g, '[ $1 ]')
            .replace(/［\s*([A-Za-zＡ-Ｚａ-ｚ])\s*］/g, latinBracket)
            .replace(/\[\s*([A-Za-zＡ-Ｚａ-ｚ])\s*\]/g, latinBracket)
        : hasLatinSlot
          ? textForSlots
              .replace(/［\s*([A-Za-zＡ-Ｚａ-ｚ])\s*］/g, latinBracket)
              .replace(/\[\s*([A-Za-zＡ-Ｚａ-ｚ])\s*\]/g, latinBracket)
          : baseForSlots
              .replace(/［\s*([ア-オ])\s*］/g, '[ $1 ]')
              .replace(/\[\s*([ア-オ])\s*\]/g, '[ $1 ]');
      const parts = normalizedText.split(pattern);

      content = (
        <View>
          <ThemedText style={[
            styles.questionText,
            isTashiQuestion && styles.questionTextTashi,
            isLongText && styles.questionTextSmall,
            isTashiQuestion && isLongText && styles.questionTextTashiSmall,
            { lineHeight: isTashiQuestion ? 32 : 40 }
          ]}>
            {parts.map((part: string, index: number) => {
            const slot = effectiveSlots.find((s: any) => s.label === part);
            if (slot) {
              const selected = slotSelections[slot.label];
              return (
                <Pressable key={index} onPress={() => handleSlotPress(slot)} style={[styles.slotButton, isTashiQuestion && styles.slotButtonTashi]}>
                  <ThemedText style={[styles.slotButtonText, isTashiQuestion && styles.slotButtonTextTashi]}>
                    {selected || part}
                  </ThemedText>
                </Pressable>
              );
            }
            return (
              <ThemedText
                key={index}
                style={[
                  styles.questionText,
                  isTashiQuestion && styles.questionTextTashi,
                  isLongText && styles.questionTextSmall,
                  isTashiQuestion && isLongText && styles.questionTextTashiSmall
                ]}
              >
                {questionLineWithUnderlineNodes(part, `slotp-${index}`)}
              </ThemedText>
            );
          })}
          </ThemedText>
        </View>
      );
    }

    const handleMarkO = async () => {
      const next: QuestionMark = questionMark === 'o' ? null : 'o';
      setQuestionMarkState(next);
      if (subject && field && text) await setQuestionMark(subject, field, text, next);
    };
    const handleMarkX = async () => {
      const next: QuestionMark = questionMark === 'x' ? null : 'x';
      setQuestionMarkState(next);
      if (subject && field && text) await setQuestionMark(subject, field, text, next);
    };

    return (
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
        {/* 問題文左側: ○×マーク */}
        <View style={styles.questionMarkColumn}>
          <Pressable
            onPress={handleMarkO}
            style={[
              styles.questionMarkButton,
              { borderColor: colors.choiceBorder },
              questionMark === 'o' && { backgroundColor: '#4CAF50', borderColor: '#4CAF50' }
            ]}
          >
            <ThemedText style={[styles.questionMarkText, questionMark === 'o' && { color: '#fff' }]}>○</ThemedText>
          </Pressable>
          <Pressable
            onPress={handleMarkX}
            style={[
              styles.questionMarkButton,
              { borderColor: colors.choiceBorder },
              questionMark === 'x' && { backgroundColor: '#F44336', borderColor: '#F44336' }
            ]}
          >
            <ThemedText style={[styles.questionMarkText, questionMark === 'x' && { color: '#fff' }]}>×</ThemedText>
          </Pressable>
          {showCompareTable ? (
            <Pressable
              accessibilityLabel={compareDef?.title ?? '比較表'}
              onPress={() => setSaikokuCompareModalVisible(true)}
              style={[styles.mondaibunnGazoOpenButton, { borderColor: '#EF6C00', backgroundColor: '#FFF3E0' }]}
            >
              <ThemedText style={[styles.mondaibunnGazoOpenButtonText, { color: '#E65100' }]}>比較表</ThemedText>
            </Pressable>
          ) : null}
          {showPersonFlowButton ? (
            <Pressable
              accessibilityLabel="登場人物関係図"
              onPress={() => setPersonFlowModalVisible(true)}
              style={[styles.mondaibunnGazoOpenButton, { borderColor: '#5C6BC0', backgroundColor: '#E8EAF6' }]}
            >
              <ThemedText style={[styles.mondaibunnGazoOpenButtonText, { color: '#3949AB' }]}>登場人物</ThemedText>
            </Pressable>
          ) : null}
          {mondaibunnGazoItems.length > 0 ? (
            <Pressable
              accessibilityLabel="問題文の模範図"
              onPress={() => setMondaibunnGazoModalVisible(true)}
              style={[styles.mondaibunnGazoOpenButton, { borderColor: '#00897B', backgroundColor: '#E0F7FA' }]}
            >
              <ThemedText style={[styles.mondaibunnGazoOpenButtonText, { color: '#00695C' }]}>模範</ThemedText>
            </Pressable>
          ) : null}
        </View>
        <ThemedView style={[
          styles.questionContainer,
          isTashiQuestion && styles.questionContainerTashi,
          { flex: 1 },
          {
            borderColor: colors.choiceBorder,
            backgroundColor: isTashiQuestion ? '#f5f7fa' : '#e8e8e8',
          },
          displayNum && { paddingTop: 0, paddingLeft: 0 },
          Platform.OS === 'web' && highlighterPenOn && webHighlighterCursor
            ? ({ cursor: webHighlighterCursor } as object)
            : null,
        ].filter(Boolean)}>
          {displayNum ? (
            <View style={[styles.questionNumBadge, { backgroundColor: isTashiQuestion ? '#f5f7fa' : '#e8e8e8', borderWidth: 2, borderColor: colors.choiceBorder }]}>
              <ThemedText style={styles.questionNumBadgeText}>{displayNum}</ThemedText>
            </View>
          ) : null}
          <View style={displayNum ? { paddingTop: 30, paddingLeft: 42 } : undefined}>
            {isTashiQuestion ? (
              <ThemedText style={[styles.questionMetaText, { color: colors.subText }]}>
                {suffix.trim()}
              </ThemedText>
            ) : null}
            {canUseHighlighterPen ? (
              <View
                style={[
                  { alignSelf: 'stretch' },
                  Platform.OS === 'web' && highlighterPenOn && webHighlighterCursor
                    ? ({ cursor: webHighlighterCursor } as object)
                    : null,
                ].filter(Boolean) as any}
                onLayout={() => {
                  if (highlighterPenOn) {
                    requestAnimationFrame(() => remeasurePenBounds());
                  }
                }}
                {...(highlighterPenOn && penUsesLineDrag ? penPanResponder.panHandlers : {})}
                {...(highlighterPenOn && Platform.OS === 'web' && !penUsesLineDrag
                  ? ({ onMouseUp: handleWebQuestionMouseUp } as object)
                  : {})}
              >
                {content}
              </View>
            ) : (
              content
            )}
            {multiSelectGuideText ? (
              <ThemedText style={[styles.descriptiveLabel, { color: colors.subText, marginTop: 10, marginBottom: 0 }]}>
                {multiSelectGuideText}
              </ThemedText>
            ) : null}
          </View>
        </ThemedView>
      </View>
    );
  };

  // 科目・分野・モード変更時は index をリセット。非表示で件数だけ変わったときはクランプのみ
  useEffect(() => {
    if (questions.length > 0) {
      const initialIndex = params.index ? parseInt(Array.isArray(params.index) ? params.index[0] : params.index, 10) : 0;
      if (questionSessionRef.current !== questionSessionKey) {
        questionSessionRef.current = questionSessionKey;
        setQuestionIndex(initialIndex >= 0 && initialIndex < questions.length ? initialIndex : 0);
      } else {
        setQuestionIndex((prev) => {
          if (prev === null) return 0;
          if (prev >= questions.length) return Math.max(0, questions.length - 1);
          return prev;
        });
      }
    } else {
      setQuestionIndex(null);
    }
  }, [questions.length, params.index, questionSessionKey]);

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

  // Resource Logic
  const resourceId = question ? (question as any).refId : null;
  // resource can be an Object (single) or Array (multi). Normalize to Array.
  // GUARD: RESOURCES might be undefined if import fails or file is incomplete
  const resourcesData = (RESOURCES as any) || {};
  const resourcePages = useMemo(() => {
    const ids = parseQuizRefIds(resourceId);
    if (ids.length === 0) return [];
    return mergeQuizResourcePages(ids, resourcesData);
  }, [resourceId, resourcesData]);

  const currentResource = resourcePages.length > 0 && resourcePage < resourcePages.length ? resourcePages[resourcePage] : null;

  // Reset page on open/change
  useEffect(() => {
    if (resourceModalVisible) {
      setResourcePage(0);
    }
  }, [resourceModalVisible, resourceId]);

  // 多肢選択: テキストから [ア][イ][ウ][エ] を解析し、語群から選択肢をパース
  const tashiData = useMemo(() => {
    if (subject !== '多肢選択' || !question) return null;
    const wb = (question as any).wordBank;
    if (!wb || typeof wb !== 'string') return null;
    const text = (question as any).text || '';
    // スロットラベル抽出（[ ア ][ イ ]、[ A ][ B ] 等、全角・半角スペース対応）
    const matches = text.match(/[\[［]\s*([ア-オA-Za-zＡ-Ｚａ-ｚ])\s*[\]］]/g) || [];
    const seen = new Set<string>();
    const slotLabels: string[] = [];
    for (const m of matches) {
      let label = m.replace(/[\[［\s\]］]/g, '').trim();
      if (/^[A-Za-zＡ-Ｚａ-ｚ]$/.test(label)) {
        label = label.normalize('NFKC');
        if (label.length === 1 && label >= 'a' && label <= 'z') label = label.toUpperCase();
      }
      if (label && !seen.has(label)) {
        seen.add(label);
        slotLabels.push(label);
      }
    }
    if (slotLabels.length === 0) return null;
    // 語群パース: "【選択肢】 1 従属 / 2 平等 / 3 合法" -> ["従属","平等","合法"]
    const raw = wb.replace(/【選択肢】\s*/g, '').trim();
    const parts = raw.split(/\s*\/\s*|\n+/);
    const options = parts
      .map((p) => {
        const m = p.match(/^\d+\s+(.+)$/);
        const cleaned = (m ? m[1] : p)
          .replace(/[\(（]\s*([ア-オ]|[rｒ])\s*[\)）]/gi, '')
          .trim();
        return cleaned;
      })
      .filter(Boolean);
    return { slotLabels, options };
  }, [subject, question]);

  const interactiveSlots = useMemo(() => {
    if (tashiData) {
      return tashiData.slotLabels.map((label) => ({
        label: `[ ${label} ]`,
        options: tashiData.options.join(' / '),
      }));
    }
    const rawSlots = ((question as any)?.slots || []) as Array<{ label: string; options: string }>;
    return rawSlots.filter((slot) => slot?.options);
  }, [tashiData, question]);

  /** Web ヘルプ文: プレーン本文はドラッグ選択で部分マーカー、それ以外は従来の行単位 */
  const webHelpUsesDragSelection = useMemo(() => {
    if (Platform.OS !== 'web' || !question?.text) return false;
    const t = stripQuestionText(question.text);
    if (subject === '記述' && t.length > 150) return false;
    const { body: questionBody } = splitNumberPrefix(t);
    const displayBody = normalizeKatakanaChoiceNewlines(hasNumberPrefix(t) ? questionBody : t);
    const segments = displayBody.split(/\n/).length ? displayBody.split(/\n/) : [''];
    return !segments.some(
      (seg) =>
        /\*\*|\[\[red:/.test(seg) ||
        /<\s*u\s*>/i.test(seg) ||
        matchKatakanaChoiceLine(seg) !== null
    );
  }, [question?.text, subject, stripQuestionText]);

  const handleWordBankTap = (value: string) => {
    const fallbackLabel =
      activeSlot?.label ||
      interactiveSlots.find((slot) => !slotSelections[slot.label])?.label ||
      interactiveSlots[0]?.label;
    if (fallbackLabel) handleSlotSelect(value, fallbackLabel);
  };

  const handleWordBankDrop = async (value: string, pageX: number, pageY: number) => {
    const measured = await Promise.all(
      interactiveSlots.map(
        (slot) =>
          new Promise<{ label: string; x: number; y: number; w: number; h: number } | null>((resolve) => {
            const ref = slotDropRefs.current[slot.label];
            if (!ref || typeof (ref as any).measureInWindow !== 'function') {
              resolve(null);
              return;
            }
            (ref as any).measureInWindow((x: number, y: number, w: number, h: number) => {
              resolve({ label: slot.label, x, y, w, h });
            });
          })
      )
    );

    const hit = measured.find(
      (box) => box && pageX >= box.x && pageX <= box.x + box.w && pageY >= box.y && pageY <= box.y + box.h
    );
    if (hit) handleSlotSelect(value, hit.label);
  };

  // (ア)(イ)2列組合せ形式: 語句(ア)と考え方(イ)の組合せ問題
  const comboFormatData = useMemo(() => {
    if (!question || !question.choices?.length) return null;
    const text = (question as any).text || '';
    const isCombo = /語句\s*[\(（]\s*[ア]\s*[\)）].*[\(（]\s*[イ]\s*[\)）]|[\(（]\s*[ア]\s*[\)）].*[\(（]\s*[イ]\s*[\)）].*組合せ|考え方\s*[\(（]\s*[イ]\s*[\)）]|空欄\s*[\[［]\s*[ア]\s*[\]］]\s*[・\s]*[\[［]\s*[イ]\s*[\]］].*組合せ/.test(text);
    if (!isCombo) return null;
    const cb = (question as any).choiceIsBonus as boolean[] | undefined;
    let list = question.choices.map((c: string, idx: number) => {
      const t = (c || '').replace(/^[\d\.．]+\s*/, '').trim();
      const stripped = t.replace(/[\(（]\s*[rｒ]\s*[\)）]/gi, '').trim();
      const parsed = parseComboChoiceParts(stripped);
      if (parsed) {
        return { partA: parsed.partA, partB: parsed.partB, originalIndex: idx, isBonus: cb && idx < cb.length ? cb[idx] : false };
      }
      const parts = stripped.split(/\s*[\/／]\s*|[　\t\r\n]+|\s{2,}/);
      return { partA: parts[0] || t, partB: parts[1] || '', originalIndex: idx, isBonus: cb && idx < cb.length ? cb[idx] : false };
    });
    const hasBonusChoices = cb ? cb.some((b: boolean) => b) : !!(question as any).isBonus;
    const hasNormalChoices = cb ? cb.some((b: boolean) => !b) : !(question as any).isBonus;
    const isMixedBonus = hasBonusChoices && hasNormalChoices;
    if (mode === 'bonus') {
      if (!(isMixedBonus || !hasBonusChoices)) list = list.filter((x: { isBonus: boolean }) => x.isBonus);
    } else if (cb?.some((b: boolean) => b)) list = list.filter((x: { isBonus: boolean }) => !x.isBonus);
    if (list.length === 0) return null;
    if (!list.every((p: { partB: string }) => p.partB)) return null;
    return list;
  }, [question, mode]);

  const slotWordBankOps =
    !tashiData &&
    !!(question as any)?.slots?.length &&
    !!(question as any).slots?.some((s: any) => s.options);
  const hasComboChoiceTable = Array.isArray(comboFormatData) && comboFormatData.length > 0;
  const slotFillAndComboTable = slotWordBankOps && hasComboChoiceTable;
  const slotFillOnly = !!tashiData || (slotWordBankOps && !hasComboChoiceTable);
  /** 憲法46問目:  stem・穴埋め・語群を出さず組合せ表のみ（行タップで回答） */
  const hideKenpou46StemAndWordBank =
    subject === '憲法' && field === '憲法' && questionIndex === 45 && slotFillAndComboTable;

  // 肢単位の※フィルタ（shuffledChoices・並べ替え共通）
  const filteredChoicesWithIndex = useMemo(() => {
    if (!question || !question.choices) return [];
    const cb = (question as any).choiceIsBonus as boolean[] | undefined;
    const isBonusChoice = (i: number) => (cb && i < cb.length ? cb[i] : !!(question as any).isBonus);
    type ChoiceWithIndex = { text: string; originalIndex: number };
    let list: ChoiceWithIndex[] = question.choices.map((text: string, index: number) => ({ text, originalIndex: index }));
    if (mode !== 'bonus') {
      list = list.filter((c: ChoiceWithIndex) => !isBonusChoice(c.originalIndex));
    } else {
      const hasBonusChoices = cb ? cb.some((b: boolean) => b) : !!(question as any).isBonus;
      const hasNormalChoices = cb ? cb.some((b: boolean) => !b) : !(question as any).isBonus;
      const isMixedBonus = hasBonusChoices && hasNormalChoices;
      // ボーナス: 混在・通常肢のみは全肢。※のみの問題は※肢のみ（一覧はすべて※のため実質全肢）
      if (!(isMixedBonus || !hasBonusChoices)) {
        list = list.filter((c: ChoiceWithIndex) => isBonusChoice(c.originalIndex));
      }
    }
    return list;
  }, [question, mode]);

  // Shuffle choices and keep track of original index
  const shuffledChoices = useMemo(() => {
    const list = [...filteredChoicesWithIndex];
    if (isShuffle && list.length > 0) {
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
    }
    return list;
  }, [filteredChoicesWithIndex, isShuffle]);

  // 組み合わせ問題: （ｒ）の数＝選択すべき肢数（※フィルタ後）
  const requiredSelectCount = useMemo(() => {
    const ans = (question as any)?.answer;
    if (!Array.isArray(ans) || ans.length <= 1) return 0;
    const cb = (question as any).choiceIsBonus as boolean[] | undefined;
    const isBonusChoice = (i: number) => (cb && i < cb.length ? cb[i] : !!(question as any).isBonus);
    const hasBonusChoices = cb ? cb.some((b: boolean) => b) : !!(question as any).isBonus;
    const hasNormalChoices = cb ? cb.some((b: boolean) => !b) : !(question as any).isBonus;
    const isMixedBonus = hasBonusChoices && hasNormalChoices;
    const effective =
      mode !== 'bonus'
        ? ans.filter((i: number) => !isBonusChoice(i))
        : isMixedBonus || !hasBonusChoices
          ? ans
          : ans.filter((i: number) => isBonusChoice(i));
    return effective.length > 0 ? effective.length : ans.length;
  }, [question, mode]);

  /** 肢の組合せを選ぶ定型（「誤っているものをすべて」型とは区別） */
  const isCombinationChoicePrompt = useMemo(() => {
    const t = (question as any)?.text || '';
    return /の組合せはどれ|組み合わせはどれ|組合せはどれか|組合せはどれ。|当てはまるものの組合せ/.test(t);
  }, [question]);

  useEffect(() => {
    if (questionIndex !== null && sidebarScrollRef.current) {
      sidebarScrollRef.current.scrollTo({ x: Math.max(0, questionIndex * ITEM_WIDTH - 80), animated: true });
    }
  }, [questionIndex]);

  const jumpToQuestion = (idx: number) => {
    if (idx >= 0 && idx < questions.length) {
      setQuestionIndex(idx);
      sidebarScrollRef.current?.scrollTo({ x: Math.max(0, idx * ITEM_WIDTH - 80), animated: true });
    }
  };

  const handleHideThisQuestion = useCallback(() => {
    if (!subject || !field || !question?.text || questionIndex === null) return;
    const h = getQuestionTextHash(question.text);
    Alert.alert(
      'この問題を非表示',
      '今後、このステージではこの問題が出題されません。ステージ選択の「非表示を解除」ですべて元に戻せます。',
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '非表示にする',
          style: 'destructive',
          onPress: async () => {
            await hideQuestionByHash(subject, field, h);
            setHiddenHashes((prev) => new Set([...prev, h]));
            const newLen = questions.length - 1;
            setQuestionIndex((prev) => Math.min(prev ?? 0, Math.max(0, newLen - 1)));
          },
        },
      ]
    );
  }, [subject, field, question?.text, questionIndex, questions.length]);

  const canOfferHideQuestion =
    (questionStats?.consecutiveCorrect ?? 0) >= 5 &&
    !!question?.text &&
    !hiddenHashes.has(getQuestionTextHash(question.text));

  const currentInsight = useMemo(() => buildCurrentInsight(questionStats), [questionStats]);
  const tacQuestionDeepdive = useMemo(
    () => (mode === 'bonus' ? buildTacQuizDeepdive(question, subject || '', field || '') : ''),
    [mode, question, subject, field]
  );

  const handleOpenTacQuestionDeepdive = useCallback(() => {
    if (!tacQuestionDeepdive) return;
    setDeepdiveParams(tacQuestionDeepdive, '', {
      screenTitle: 'TAC問題のもっと深掘る',
      quizSubject: subject || '',
      quizField: field || '',
      quizMode: mode || '',
      quizQuestionIndex: questionIndex !== null ? String(questionIndex) : '',
    });
    router.push({ pathname: '/deepdive' as any, params: { choiceLabel: '' } });
  }, [tacQuestionDeepdive, subject, field, mode, questionIndex]);

  // 人の関係がある問題（A,B,C等）→ 図モード表示
  const isDiagramEligible = useMemo(() => {
    const text = (question?.text || '') + (Array.isArray(question?.choices) ? question.choices.join('') : '');
    return isPersonFlowEligible(text);
  }, [question?.text, question?.choices]);

  const [diagramModalVisible, setDiagramModalVisible] = useState(false);
  const [diagramMode, setDiagramMode] = useState<'self' | 'model'>('self');

  const [mondaibunnGazoModalVisible, setMondaibunnGazoModalVisible] = useState(false);
  const [personFlowModalVisible, setPersonFlowModalVisible] = useState(false);
  const [saikokuCompareModalVisible, setSaikokuCompareModalVisible] = useState(false);

  const showPersonFlowButton = useMemo(
    () => subject === '民法' && !!field && isMinpoPersonFlowField(field),
    [subject, field],
  );

  const personFlowDiagram = useMemo(
    () =>
      subject && field && question?.text != null
        ? resolvePersonFlowDiagram({
            mode: 'quiz',
            subject,
            field,
            text: question.text,
            index: questionIndex ?? 0,
            applyNames: applyCharacterNames,
          })
        : null,
    [subject, field, question?.text, questionIndex, applyCharacterNames],
  );

  const questionCast = useMemo(
    () => (question?.text ? extractQuestionCast(question.text, characterMap) : []),
    [question?.text, characterMap],
  );

  const compareDef = useMemo(
    () =>
      question?.text
        ? pickCompareTable(question.text, { subject: subject || undefined, field: field || undefined })
        : undefined,
    [question?.text, subject, field],
  );
  const showCompareTable = !!compareDef;
  const compareTableImage = useMemo(
    () => resolveCompareTableImage(compareDef?.imageKey),
    [compareDef?.imageKey],
  );

  const mondaibunnGazoItems = useMemo(
    () =>
      subject && field && question?.text != null
        ? resolveMondaibunnGazoItems({
            subject,
            field,
            questionText: question.text,
            questionIndex: questionIndex ?? 0,
          })
        : [],
    [subject, field, question?.text, questionIndex],
  );

  const showDescriptiveMark = useMemo(() => {
    if (subject === '記述') return true;
    if (!isInDescriptiveField || !paramField) return false;
    const keywords = DESCRIPTIVE_SCOPE_KEYWORDS[paramField];
    if (!keywords?.length) return true;
    const text = (question?.text || '') + (Array.isArray(question?.choices) ? question.choices.join('') : '');
    if (!text.trim()) return true;
    return keywords.some((kw) => text.includes(kw));
  }, [subject, isInDescriptiveField, paramField, question?.text, question?.choices]);

  if (!subject || !field) {
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

  if (baseQuestions.length > 0 && questions.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">表示できる問題がありません</ThemedText>
        <ThemedText style={{ marginBottom: 16 }}>
          このステージの問題がすべて非表示になっています。ステージ選択で「非表示を解除」してください。
        </ThemedText>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ThemedText type="defaultSemiBold">ステージ選択へ戻る</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  if (questions.length === 0 || questionIndex === null || !question) {
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
      <ScrollView scrollEnabled={!penScrollLock} contentContainerStyle={styles.scrollContent}>
        {/* 問題番号サイドバー: タップでジャンプ */}
        {questions.length > 0 && questionIndex !== null && (
          <ScrollView
            ref={sidebarScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.questionSidebar}
            contentContainerStyle={styles.questionSidebarContent}
          >
            {questions.map((_, idx) => {
              const wrongs = wrongCounts[idx] || 0;
              const isActive = idx === questionIndex;
              const bgColor = isActive
                ? colors.primary
                : wrongs >= 2
                  ? '#D32F2F'
                  : wrongs === 1
                    ? '#FBC02D'
                    : colors.choiceBg;
              const borderColor = isActive ? colors.primary : wrongs >= 2 ? '#D32F2F' : wrongs === 1 ? '#FBC02D' : colors.choiceBorder;
              const textColor = isActive ? '#fff' : wrongs >= 1 ? '#fff' : colors.text;
              return (
                <Pressable
                  key={idx}
                  style={[
                    styles.questionSidebarItem,
                    { borderColor, backgroundColor: bgColor }
                  ]}
                  onPress={() => jumpToQuestion(idx)}
                >
                  <ThemedText
                    style={[
                      styles.questionSidebarItemText,
                      { color: textColor }
                    ]}
                  >
                    {idx + 1}
                  </ThemedText>
                </Pressable>
              );
            })}
          </ScrollView>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 8, gap: 10 }}>
          <ThemedText type="subtitle" style={[styles.subject, { color: colors.text, fontWeight: '800' }]}>
            {subject} {questionIndex !== null ? `(${questionIndex + 1}/${questions.length || 0})` : ''}
            {mode === 'bonus' ? ' ★ボーナスステージ★' : mode === 'shisho' ? ' 🎓師匠モード' : ''}
          </ThemedText>
          {questionStats && (() => {
            const total = questionStats.correct + questionStats.wrong;
            if (total <= 0) return null;
            return (
              <Pressable
                onLongPress={() => {
                  if (!subject || !field || !question?.text) return;
                  Alert.alert(
                    '正答率の訂正',
                    'この問題の累計（正解＋不正解の回数）を、すべて正解として扱い直します。よろしいですか？',
                    [
                      { text: 'キャンセル', style: 'cancel' },
                      {
                        text: '訂正する',
                        onPress: () => {
                          reconcileAllAttemptsAsCorrect(subject, field, question.text).then(setQuestionStats);
                        },
                      },
                    ]
                  );
                }}
                delayLongPress={480}
              >
                <ThemedText style={{ color: colors.subText, fontSize: 14 }}>
                  正答率: {questionStats.correct}/{total}
                </ThemedText>
              </Pressable>
            );
          })()}
          {questionStats && questionStats.wrong > 0 ? (
            <ThemedText style={{ color: '#F9A825', fontSize: 13 }}>
              累計誤答 {questionStats.wrong}回（メニュー③誤答問題リスト）
            </ThemedText>
          ) : null}
          {canOfferHideQuestion ? (
            <Pressable
              onPress={handleHideThisQuestion}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: colors.choiceBorder,
                backgroundColor: colors.card,
              }}
            >
              <ThemedText style={{ fontSize: 13, fontWeight: '600', color: colors.text }}>この問題を非表示</ThemedText>
            </Pressable>
          ) : null}
        </View>

        <ThemedView style={[styles.currentInsightPanel, { borderColor: currentInsight.accent, backgroundColor: colors.card }]}>
          <View style={styles.currentInsightHeader}>
            <ThemedText style={[styles.currentInsightTitle, { color: colors.text }]}>現状把握</ThemedText>
            <View style={[styles.currentInsightBadge, { backgroundColor: currentInsight.accent }]}>
              <ThemedText style={styles.currentInsightBadgeText}>Lv.{currentInsight.level}</ThemedText>
            </View>
            <ThemedText style={[styles.currentInsightLabel, { color: currentInsight.accent }]}>
              {currentInsight.label}
            </ThemedText>
            <Pressable
              style={[styles.currentInsightToggle, { borderColor: currentInsight.accent }]}
              onPress={() => setShowCurrentInsight((prev) => !prev)}
            >
              <ThemedText style={[styles.currentInsightToggleText, { color: currentInsight.accent }]}>
                {showCurrentInsight ? '隠す' : '表示'}
              </ThemedText>
            </Pressable>
          </View>
          {showCurrentInsight ? (
            <>
              <View style={styles.currentInsightStats}>
                <View style={[styles.currentInsightStatBox, { borderColor: colors.choiceBorder, backgroundColor: colors.background }]}>
                  <ThemedText style={[styles.currentInsightStatValue, { color: colors.text }]}>{currentInsight.rateLabel}</ThemedText>
                  <ThemedText style={[styles.currentInsightStatLabel, { color: colors.subText }]}>正答率</ThemedText>
                </View>
                <View style={[styles.currentInsightStatBox, { borderColor: colors.choiceBorder, backgroundColor: colors.background }]}>
                  <ThemedText style={[styles.currentInsightStatValue, { color: colors.text }]}>{questionStats?.wrong ?? 0}</ThemedText>
                  <ThemedText style={[styles.currentInsightStatLabel, { color: colors.subText }]}>累計誤答</ThemedText>
                </View>
                <View style={[styles.currentInsightStatBox, { borderColor: colors.choiceBorder, backgroundColor: colors.background }]}>
                  <ThemedText style={[styles.currentInsightStatValue, { color: colors.text }]}>{questionStats?.consecutiveCorrect ?? 0}</ThemedText>
                  <ThemedText style={[styles.currentInsightStatLabel, { color: colors.subText }]}>連続正解</ThemedText>
                </View>
              </View>
              <ThemedText style={[styles.currentInsightMessage, { color: colors.text }]}>
                {currentInsight.message}
              </ThemedText>
              <View style={[styles.currentInsightNext, { borderColor: colors.choiceBorder, backgroundColor: colors.background }]}>
                <ThemedText style={[styles.currentInsightNextTitle, { color: currentInsight.accent }]}>次に入れる知識</ThemedText>
                <ThemedText style={[styles.currentInsightNextText, { color: colors.subText }]}>
                  {currentInsight.nextInput}
                </ThemedText>
              </View>
            </>
          ) : (
            <View style={[styles.currentInsightCollapsed, { borderColor: colors.choiceBorder, backgroundColor: colors.background }]}>
              <ThemedText style={[styles.currentInsightNextText, { color: colors.subText }]}>
                状況把握を隠しています。必要なときだけ表示できます。
              </ThemedText>
            </View>
          )}
        </ThemedView>

        {mode === 'shisho' ? (
          <ThemedView
            style={{
              marginBottom: 12,
              padding: 12,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#7E57C2',
              backgroundColor: colors.card,
            }}
          >
            <ThemedText style={{ color: '#4527A0', fontWeight: '700', fontSize: 16 }}>🎓 師匠モード</ThemedText>
            <ThemedText style={{ color: colors.text, marginTop: 8, lineHeight: 22, fontSize: 15 }}>
              弟子に論点を教えるつもりで、「何が争点か」「なぜそうなるか」を声に出してから次へ進みましょう。正解の当たりより、説明の筋道を優先します。
            </ThemedText>
          </ThemedView>
        ) : null}

        {!hideKenpou46StemAndWordBank ? renderQuestionText() : null}

        {!hideKenpou46StemAndWordBank && interactiveSlots.length > 0 ? (
          <ThemedView style={[styles.slotTargetContainer, { borderColor: colors.choiceBorder, backgroundColor: colors.card }]}>
            <ThemedText style={[styles.wordBankTitle, { color: colors.subText }]}>
              【空欄】語群をドラッグして入れるか、空欄を選んで語群をタップ
            </ThemedText>
            <View style={styles.slotTargetGrid}>
              {[...interactiveSlots]
                .sort((a, b) => {
                  const order = ['ア', 'イ', 'ウ', 'エ', 'オ'];
                  const ka = a.label.replace(/[\[\]\s]/g, '');
                  const kb = b.label.replace(/[\[\]\s]/g, '');
                  const ai = order.indexOf(ka);
                  const bi = order.indexOf(kb);
                  if (ai >= 0 || bi >= 0) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
                  if (/^[A-Z]$/.test(ka) && /^[A-Z]$/.test(kb)) return ka.localeCompare(kb);
                  return 0;
                })
                .map((slot) => {
                const selected = slotSelections[slot.label];
                const isActive = activeSlot?.label === slot.label;
                return (
                  <View
                    key={slot.label}
                    ref={(node) => {
                      slotDropRefs.current[slot.label] = node;
                    }}
                    style={[
                      styles.slotTargetBox,
                      {
                        borderColor: isActive ? colors.primary : colors.choiceBorder,
                        backgroundColor: selected ? colors.choiceBg : colors.card,
                      },
                      isActive && styles.slotTargetBoxActive,
                    ]}
                  >
                    <Pressable onPress={() => handleSlotPress(slot)} style={styles.slotTargetButton}>
                      <ThemedText style={[styles.slotTargetLabel, { color: colors.subText }]}>
                        {slot.label.replace(/[\[\]\s]/g, '')}
                      </ThemedText>
                      <ThemedText style={[styles.slotTargetValue, { color: colors.text }]}>
                        {selected || 'ここへドロップ'}
                      </ThemedText>
                    </Pressable>
                    {selected ? (
                      <Pressable onPress={() => clearSlotSelection(slot.label)} style={styles.slotTargetClear}>
                        <ThemedText style={{ color: colors.subText, fontSize: 12 }}>×</ThemedText>
                      </Pressable>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </ThemedView>
        ) : null}

        {/* Word Bank: 多肢選択・N,O列語群ではタップで穴埋め、他は表示のみ */}
        {!hideKenpou46StemAndWordBank && (question as any).wordBank ? (
          <ThemedView style={[styles.wordBankContainer, { borderColor: colors.choiceBorder, backgroundColor: colors.card }]}>
            <ThemedText style={[styles.wordBankTitle, { color: colors.subText }]}>
              【語群】{activeSlot ? ` → 空欄 [ ${activeSlot.label.replace(/[\[\]\s]/g, '')} ] に入れます` : ''}
            </ThemedText>
            {(tashiData || ((question as any).slots?.length > 0 && activeSlot)) ? (
              <Pressable style={[styles.cancelSlotButton, { borderColor: colors.choiceBorder }]} onPress={() => setActiveSlot(null)}>
                <ThemedText style={{ color: colors.subText, fontSize: 12 }}>キャンセル</ThemedText>
              </Pressable>
            ) : null}
            <View style={styles.wordBankGrid}>
              {tashiData
                ? tashiData.options.map((opt: string, index: number) => (
                    <DraggableWordBankItem
                      key={`${opt}-${index}`}
                      value={opt}
                      onDrop={handleWordBankDrop}
                      onPress={() => handleWordBankTap(opt)}
                      borderColor={colors.choiceBorder}
                      textColor={colors.text}
                    />
                  ))
                : activeSlot && (question as any).slots?.length > 0
                ? (() => {
                    const optStr = activeSlot.options || '';
                    const rPattern = /[\(（]\s*[rｒ]\s*[\)）]/gi;
                    const parts = splitSlotOptionParts(optStr).filter((p: string) => p.trim());
                    return parts.map((p: string, idx: number) => {
                      const clean = p
                        .replace(rPattern, '')
                        .replace(/^\d+\s*[\.．:：\uFF1A]\s*/, '')
                        .trim();
                      if (!clean) return null;
                      return (
                        <View key={idx} style={{ width: '100%', flexBasis: '100%' }}>
                          <DraggableWordBankItem
                            value={clean}
                            onDrop={handleWordBankDrop}
                            onPress={() => handleWordBankTap(clean)}
                            borderColor={colors.choiceBorder}
                            textColor={colors.text}
                            itemStyle={styles.wordBankItemBlock}
                          />
                        </View>
                      );
                    });
                  })()
                : parseWordBankKatakanaBlocks(String((question as any).wordBank || '')).length > 0 && !activeSlot
                ? parseWordBankKatakanaBlocks(String((question as any).wordBank || '')).map((block, bi) => (
                    <View
                      key={`wb-${bi}`}
                      style={[
                        styles.stemChoiceCard,
                        {
                          borderColor: colors.choiceBorder,
                          backgroundColor: colors.card,
                          marginBottom: 10,
                          width: '100%',
                        },
                      ]}
                    >
                      <ThemedText style={{ fontWeight: '700', marginBottom: 8, color: colors.text }}>{block.title}</ThemedText>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'flex-start' }}>
                        {block.items.map((item, ii) => (
                          <DraggableWordBankItem
                            key={`${block.title}-${ii}`}
                            value={item}
                            onDrop={handleWordBankDrop}
                            onPress={() => handleWordBankTap(item)}
                            borderColor={colors.choiceBorder}
                            textColor={colors.text}
                            itemStyle={styles.wordBankItemBlock}
                          />
                        ))}
                      </View>
                    </View>
                  ))
                : (String((question as any).wordBank || '')).split('\n').filter((l: string) => l.trim().length > 0).map((line: string, index: number) => {
                    const item = line.trim().replace(/[\(（]\s*[rｒ]\s*[\)）]/gi, '').trim();
                    if (!item) return null;
                    // シートの「1. ①…」のような行頭番号は表示しない（①②や【A】だけ見せる）
                    const text = item.replace(/^\d+\s*[\.．:：\uFF1A]\s*/, '').trim();
                    if (!text) return null;
                    // 【A】などの小見出しだけはドラッグ対象にしない
                    const isSectionHeader = /^【[^】]{1,8}】\s*$/.test(text);
                    if (isSectionHeader) {
                      return (
                        <ThemedText
                          key={index}
                          style={[styles.wordBankItem, { color: colors.text, width: '100%', flexBasis: '100%' }]}
                        >
                          {text}
                        </ThemedText>
                      );
                    }
                    return (
                      <View key={index} style={{ width: '100%', flexBasis: '100%' }}>
                        <DraggableWordBankItem
                          value={text}
                          onDrop={handleWordBankDrop}
                          onPress={() => handleWordBankTap(text)}
                          borderColor={colors.choiceBorder}
                          textColor={colors.text}
                          itemStyle={styles.wordBankItemBlock}
                        />
                      </View>
                    );
                  })}
            </View>
          </ThemedView>
        ) : null}

        <ThemedView style={[styles.choices, { backgroundColor: colors.background }]}>
          <View style={styles.choicesRow}>
            <View style={styles.choicesBody}>
          {slotFillAndComboTable ? (
            <>
              {!hideKenpou46StemAndWordBank ? (
                <Pressable
                  style={[
                    styles.answerButton,
                    (() => {
                      const labels = ((question as any).slots || []).map((s: any) => s.label);
                      const allFilled = labels.every((l: string) => slotSelections[l]);
                      return !allFilled && styles.answerButtonDisabled;
                    })(),
                  ]}
                  disabled={!((question as any).slots || []).every((s: any) => slotSelections[s.label])}
                  onPress={() => {
                    const ans = ((question as any).slots || []).map((s: any) => slotSelections[s.label] || '');
                    router.push({
                      pathname: '/result',
                      params: {
                        subject,
                        field,
                        questionIndex: String(questionIndex),
                        pickedIndex: '-1',
                        pickedSlots: JSON.stringify(ans),
                        totalQuestions: String(questions.length),
                        correctCountSession: params.correctCountSession || '0',
                        wrongCounts: JSON.stringify(wrongCounts),
                        ...(mode ? { mode } : {}),
                        ...(isShuffle ? { shuffle: '1' } : {}),
                      },
                    });
                  }}
                >
                  <ThemedText style={styles.answerButtonText}>回答する</ThemedText>
                </Pressable>
              ) : null}
              {activeActionMode === 'descriptiveScope' && (
                <ThemedText style={[styles.descriptiveLabel, { color: colors.primary, marginBottom: 8, fontWeight: 'bold' }]}>
                  → 記述問題を生成する組合せをクリック
                </ThemedText>
              )}
              {activeActionMode === 'teachMe' && (
                <ThemedText style={[styles.descriptiveLabel, { color: colors.primary, marginBottom: 8, fontWeight: 'bold' }]}>
                  → 説明してほしい組合せをクリック
                </ThemedText>
              )}
              <View style={[styles.comboTable, { borderColor: colors.choiceBorder, marginTop: 12 }]}>
                <View style={[styles.comboTableHeader, { backgroundColor: colors.card }]}>
                  <ThemedText style={[styles.comboTableHeaderCell, { color: colors.text }]}>(ア)</ThemedText>
                  <ThemedText style={[styles.comboTableHeaderCell, { color: colors.text }]}>(イ)</ThemedText>
                </View>
                {comboFormatData!.map((item: { partA: string; partB: string; originalIndex: number }, idx: number) => (
                  <Pressable
                    key={idx}
                    style={[styles.comboTableRow, { borderColor: colors.choiceBorder, backgroundColor: colors.choiceBg }]}
                    onPress={() => {
                      if (activeActionMode === 'descriptiveScope') {
                        setActiveActionMode(null);
                        requestDescriptiveScope(`${item.partA} ${item.partB}`);
                        return;
                      }
                      if (activeActionMode === 'teachMe') {
                        requestTeachMe(`${item.partA} ${item.partB}`);
                        setActiveActionMode(null);
                        return;
                      }
                      router.push({
                        pathname: '/result',
                        params: {
                          subject,
                          field,
                          questionIndex: String(questionIndex),
                          pickedIndex: String(item.originalIndex),
                          totalQuestions: String(questions.length),
                          correctCountSession: params.correctCountSession || '0',
                          wrongCounts: JSON.stringify(wrongCounts),
                          ...(mode ? { mode } : {}),
                          ...(isShuffle ? { shuffle: '1' } : {}),
                        },
                      });
                    }}
                  >
                    <ThemedText style={[styles.comboTableNum, { color: colors.text }]}>{idx + 1}.</ThemedText>
                    <ThemedText style={[styles.comboTableCell, { color: colors.text }]}>{applyCharacterNames(item.partA)}</ThemedText>
                    <ThemedText style={[styles.comboTableCell, { color: colors.text }]}>{applyCharacterNames(item.partB)}</ThemedText>
                  </Pressable>
                ))}
              </View>
            </>
          ) : slotFillOnly ? (
            <>
              <Pressable
                style={[
                  styles.answerButton,
                  (() => {
                    const labels = tashiData ? tashiData.slotLabels.map((l: string) => `[ ${l} ]`) : ((question as any).slots || []).map((s: any) => s.label);
                    const allFilled = labels.every((l: string) => slotSelections[l]);
                    return !allFilled && styles.answerButtonDisabled;
                  })()
                ]}
                disabled={!(tashiData ? tashiData.slotLabels.every((l: string) => slotSelections[`[ ${l} ]`]) : ((question as any).slots || []).every((s: any) => slotSelections[s.label]))}
                onPress={() => {
                  const ans = tashiData
                    ? tashiData.slotLabels.map((l: string) => slotSelections[`[ ${l} ]`] || '')
                    : ((question as any).slots || []).map((s: any) => slotSelections[s.label] || '');
                  router.push({
                    pathname: '/result',
                    params: {
                      subject,
                      field,
                      questionIndex: String(questionIndex),
                      pickedIndex: '-1',
                      pickedSlots: JSON.stringify(ans),
                      totalQuestions: String(questions.length),
                      correctCountSession: params.correctCountSession || '0',
                      wrongCounts: JSON.stringify(wrongCounts),
                      ...(mode ? { mode } : {}),
                      ...(isShuffle ? { shuffle: '1' } : {}),
                    }
                  });
                }}
              >
                <ThemedText style={styles.answerButtonText}>回答する</ThemedText>
              </Pressable>
            </>
          ) : showScopeBlock ? (
            <>
              {scopeGenerateLoading ? (
                <View style={{ padding: 24, alignItems: 'center' }}>
                  <ActivityIndicator size="large" color={colors.primary} />
                  <ThemedText style={{ marginTop: 12, color: colors.subText }}>記述問題を生成中…</ThemedText>
                </View>
              ) : scopeGenerateError ? (
                <View>
                  <ThemedText style={{ color: '#D32F2F', marginBottom: 8 }}>{scopeGenerateError}</ThemedText>
                  <Pressable style={[styles.cancelSlotButton, { borderColor: colors.choiceBorder }]} onPress={cancelScopeDescriptive}>
                    <ThemedText style={{ color: colors.subText, fontSize: 12 }}>キャンセル</ThemedText>
                  </Pressable>
                </View>
              ) : (
                <>
                  <ThemedText style={[styles.descriptiveLabel, { color: colors.subText }]}>記述スコープ（AIが生成した問題）</ThemedText>
                  <ThemedText style={[styles.questionText, { color: colors.text, marginBottom: 12, marginTop: 4 }]}>{scopeGeneratedQuestion}</ThemedText>
                  <TextInput
                    style={[
                      styles.descriptiveInput,
                      { borderColor: colors.choiceBorder, backgroundColor: colors.card, color: colors.text }
                    ]}
                    placeholder="40字程度で記述"
                    placeholderTextColor={colors.subText || '#999'}
                    multiline
                    numberOfLines={4}
                    value={scopeDescriptiveAnswer}
                    onChangeText={setScopeDescriptiveAnswer}
                    textAlignVertical="top"
                  />
                  <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                    <Pressable style={[styles.cancelSlotButton, { borderColor: colors.choiceBorder }]} onPress={cancelScopeDescriptive}>
                      <ThemedText style={{ color: colors.subText, fontSize: 12 }}>キャンセル</ThemedText>
                    </Pressable>
                    <Pressable
                      style={[styles.answerButton, scopeDescriptiveAnswer.trim().length === 0 && styles.answerButtonDisabled]}
                      disabled={scopeDescriptiveAnswer.trim().length === 0}
                      onPress={() => {
                        router.push({
                          pathname: '/result',
                          params: {
                            subject,
                            field,
                            questionIndex: String(questionIndex),
                            pickedIndex: '-1',
                            pickedText: scopeDescriptiveAnswer.trim(),
                            totalQuestions: String(questions.length),
                            correctCountSession: params.correctCountSession || '0',
                            wrongCounts: JSON.stringify(wrongCounts),
                            isDescriptiveScope: '1',
                            modelAnswer: scopeGeneratedModelAnswer || '',
                            ...(mode ? { mode } : {}),
                            ...(isShuffle ? { shuffle: '1' } : {}),
                          }
                        });
                      }}
                    >
                      <ThemedText style={styles.answerButtonText}>回答する</ThemedText>
                    </Pressable>
                  </View>
                </>
              )}
            </>
          ) : ((question as any).isReorder || /並び順|並べ替え|順番に選択/.test((question as any).text || '')) && filteredChoicesWithIndex.length > 0 ? (
            <>
              {activeActionMode === 'descriptiveScope' && (
                <ThemedText style={[styles.descriptiveLabel, { color: colors.primary, marginBottom: 8, fontWeight: 'bold' }]}>
                  → 記述問題を生成する肢をクリック
                </ThemedText>
              )}
              {activeActionMode === 'teachMe' && (
                <ThemedText style={[styles.descriptiveLabel, { color: colors.primary, marginBottom: 8, fontWeight: 'bold' }]}>
                  → 説明してほしい肢をクリック
                </ThemedText>
              )}
              <ThemedText style={[styles.descriptiveLabel, { color: colors.subText, marginBottom: 8 }]}>
                肢をクリックした順番に選択してください。{reorderSelection.length > 0 && ` (選択順: ${reorderSelection.map((i) => i + 1).join(' → ')})`}
              </ThemedText>
              {reorderSelection.length > 0 && (
                <Pressable style={[styles.cancelSlotButton, { borderColor: colors.choiceBorder, marginBottom: 8 }]} onPress={() => setReorderSelection([])}>
                  <ThemedText style={{ color: colors.subText, fontSize: 12 }}>やり直す</ThemedText>
                </Pressable>
              )}
              {filteredChoicesWithIndex.map((item: { text: string; originalIndex: number }, displayIdx: number) => {
                const origIdx = item.originalIndex;
                const label = String(origIdx + 1);
                const isSelected = reorderSelection.includes(origIdx);
                const selectedPos = reorderSelection.indexOf(origIdx) + 1;
                const displayText = applyCharacterNames((item.text || '').replace(/※/g, ''));
                return (
                  <Pressable
                    key={origIdx}
                    style={[
                      styles.reorderRow,
                      { backgroundColor: isSelected ? '#E3F2FD' : colors.choiceBg,
                        borderWidth: isSelected ? 2 : 1, borderColor: isSelected ? '#2196F3' : colors.choiceBorder }
                    ]}
                    onPress={() => {
                      if (activeActionMode === 'descriptiveScope') {
                        setActiveActionMode(null);
                        requestDescriptiveScope(displayText);
                        return;
                      }
                      if (activeActionMode === 'teachMe') {
                        requestTeachMe(displayText);
                        setActiveActionMode(null);
                        return;
                      }
                      setReorderSelection(prev => {
                        if (prev.includes(origIdx)) return prev.filter((i) => i !== origIdx);
                        if (prev.length >= filteredChoicesWithIndex.length) return prev;
                        return [...prev, origIdx];
                      });
                    }}
                  >
                    <ThemedText style={[styles.reorderNum, { color: colors.text }]}>{label}.</ThemedText>
                    <ThemedText style={[styles.reorderText, { color: colors.text, flex: 1 }]} numberOfLines={5}>
                      {displayText}
                    </ThemedText>
                    {isSelected && <ThemedText style={{ color: '#2196F3', fontWeight: 'bold', marginLeft: 8 }}>→{selectedPos}番目</ThemedText>}
                  </Pressable>
                );
              })}
              <Pressable
                style={[styles.answerButton, reorderSelection.length !== filteredChoicesWithIndex.length && styles.answerButtonDisabled]}
                disabled={reorderSelection.length !== filteredChoicesWithIndex.length}
                onPress={() => {
                  router.push({
                    pathname: '/result',
                    params: {
                      subject,
                      field,
                      questionIndex: String(questionIndex),
                      pickedIndex: '-1',
                      pickedIndices: JSON.stringify(reorderSelection),
                      isReorder: '1',
                      totalQuestions: String(questions.length),
                      correctCountSession: params.correctCountSession || '0',
                      wrongCounts: JSON.stringify(wrongCounts),
                      ...(mode ? { mode } : {}),
                      ...(isShuffle ? { shuffle: '1' } : {}),
                    }
                  });
                }}
              >
                <ThemedText style={styles.answerButtonText}>回答する</ThemedText>
              </Pressable>
            </>
          ) : comboFormatData && !slotWordBankOps ? (
            <>
              {activeActionMode === 'descriptiveScope' && (
                <ThemedText style={[styles.descriptiveLabel, { color: colors.primary, marginBottom: 8, fontWeight: 'bold' }]}>
                  → 記述問題を生成する組合せをクリック
                </ThemedText>
              )}
              {activeActionMode === 'teachMe' && (
                <ThemedText style={[styles.descriptiveLabel, { color: colors.primary, marginBottom: 8, fontWeight: 'bold' }]}>
                  → 説明してほしい組合せをクリック
                </ThemedText>
              )}
              <View style={[styles.comboTable, { borderColor: colors.choiceBorder }]}>
                <View style={[styles.comboTableHeader, { backgroundColor: colors.card }]}>
                  <ThemedText style={[styles.comboTableHeaderCell, { color: colors.text }]}>(ア)</ThemedText>
                  <ThemedText style={[styles.comboTableHeaderCell, { color: colors.text }]}>(イ)</ThemedText>
                </View>
                {comboFormatData.map((item: { partA: string; partB: string; originalIndex: number }, idx: number) => (
                  <Pressable
                    key={idx}
                    style={[styles.comboTableRow, { borderColor: colors.choiceBorder, backgroundColor: colors.choiceBg }]}
                    onPress={() => {
                      if (activeActionMode === 'descriptiveScope') {
                        setActiveActionMode(null);
                        requestDescriptiveScope(`${item.partA} ${item.partB}`);
                        return;
                      }
                      if (activeActionMode === 'teachMe') {
                        requestTeachMe(`${item.partA} ${item.partB}`);
                        setActiveActionMode(null);
                        return;
                      }
                      router.push({
                        pathname: '/result',
                        params: {
                          subject,
                          field,
                          questionIndex: String(questionIndex),
                          pickedIndex: String(item.originalIndex),
                          totalQuestions: String(questions.length),
                          correctCountSession: params.correctCountSession || '0',
                          wrongCounts: JSON.stringify(wrongCounts),
                          ...(mode ? { mode } : {}),
                          ...(isShuffle ? { shuffle: '1' } : {}),
                        }
                      });
                    }}
                  >
                    <ThemedText style={[styles.comboTableNum, { color: colors.text }]}>{idx + 1}.</ThemedText>
                    <ThemedText style={[styles.comboTableCell, { color: colors.text }]}>{applyCharacterNames(item.partA)}</ThemedText>
                    <ThemedText style={[styles.comboTableCell, { color: colors.text }]}>{applyCharacterNames(item.partB)}</ThemedText>
                  </Pressable>
                ))}
              </View>
            </>
          ) : subject === '記述' ? (
            <>
              <ThemedText style={[styles.descriptiveLabel, { color: colors.subText }]}>解答欄（40字程度で記述）</ThemedText>
              <TextInput
                style={[
                  styles.descriptiveInput,
                  {
                    borderColor: colors.choiceBorder,
                    backgroundColor: colors.card,
                    color: colors.text,
                  }
                ]}
                placeholder="ここに解答を入力してください"
                placeholderTextColor={colors.subText || '#999'}
                multiline
                numberOfLines={4}
                value={descriptiveAnswer}
                onChangeText={setDescriptiveAnswer}
                textAlignVertical="top"
              />
              <Pressable
                style={[
                  styles.answerButton,
                  descriptiveAnswer.trim().length === 0 && styles.answerButtonDisabled
                ]}
                disabled={descriptiveAnswer.trim().length === 0}
                onPress={() => {
                  router.push({
                    pathname: '/result',
                    params: {
                      subject,
                      field,
                      questionIndex: String(questionIndex),
                      pickedIndex: '-1',
                      pickedText: descriptiveAnswer.trim(),
                      totalQuestions: String(questions.length),
                      correctCountSession: params.correctCountSession || '0',
                      wrongCounts: JSON.stringify(wrongCounts),
                      ...(mode ? { mode } : {}),
                      ...(isShuffle ? { shuffle: '1' } : {}),
                    }
                  });
                }}
              >
                <ThemedText style={styles.answerButtonText}>回答する</ThemedText>
              </Pressable>
            </>
          ) : (
            <>
              {activeActionMode === 'descriptiveScope' && (
                <ThemedText style={[styles.descriptiveLabel, { color: colors.primary, marginBottom: 8, fontWeight: 'bold' }]}>
                  → 記述問題を生成する選択肢をクリック
                </ThemedText>
              )}
              {activeActionMode === 'teachMe' && (
                <ThemedText style={[styles.descriptiveLabel, { color: colors.primary, marginBottom: 8, fontWeight: 'bold' }]}>
                  → 説明してほしい選択肢をクリック
                </ThemedText>
              )}
              {shuffledChoices.map((choiceObj: { text: string; originalIndex: number }, index: number) => {
            if (!choiceObj || !choiceObj.text) return null; // Guard against null/empty choices

            // [NEW] Display Logic: Strip '※'
            const displayText = applyCharacterNames(choiceObj.text.replace(/※/g, ''));
            // In Bonus mode, they are enabled, so no disabled logic based on ※ anymore
            const isDisabled = false;
            const isDimmed = dimmedIndices.includes(index);

            // [NEW] Multi-select Logic
            const answer = (question as any).answer || [];
            const isMultiSelect = Array.isArray(answer) && answer.length > 1;
            const isSelected = selectedIndices.includes(choiceObj.originalIndex);
            const isStemSyncedChoice =
              !isMultiSelect &&
              isStemComboPairQuestion &&
              stemSyncedOriginalIndex !== null &&
              stemSyncedOriginalIndex === choiceObj.originalIndex;

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
                  isDimmed && { opacity: 0.3 }, // Dim the button
                  (isMultiSelect && isSelected) && { backgroundColor: '#E3F2FD', borderColor: '#2196F3', borderWidth: 2 },
                  isStemSyncedChoice && { backgroundColor: '#E3F2FD', borderColor: '#2196F3', borderWidth: 2 }
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
                onPress={() => {
                  if (activeActionMode === 'descriptiveScope') {
                    setActiveActionMode(null);
                    requestDescriptiveScope(displayText);
                    return;
                  }
                  if (activeActionMode === 'teachMe') {
                    requestTeachMe(displayText);
                    setActiveActionMode(null);
                    return;
                  }
                  if (isMultiSelect) {
                    setSelectedIndices(prev => {
                      if (prev.includes(choiceObj.originalIndex)) return prev.filter(i => i !== choiceObj.originalIndex);
                      if (prev.length >= requiredSelectCount) return prev;
                      return [...prev, choiceObj.originalIndex];
                    });
                  } else {
                    router.push({
                      pathname: '/result',
                      params: {
                        subject,
                        field,
                        questionIndex: String(questionIndex),
                        pickedIndex: String(choiceObj.originalIndex),
                        totalQuestions: String(questions.length),
                        correctCountSession: params.correctCountSession || '0',
                        wrongCounts: JSON.stringify(wrongCounts),
                        ...(mode ? { mode } : {}),
                        ...(isShuffle ? { shuffle: '1' } : {}),
                      },
                    });
                  }
                }}
              >
                <ThemedText style={[
                  styles.choiceText,
                  { color: colors.choiceText },
                  isDisabled && styles.choiceTextDisabled,
                  (isMultiSelect && isSelected) && { color: '#1565C0', fontWeight: 'bold' },
                  isStemSyncedChoice && { color: '#1565C0', fontWeight: 'bold' }
                ]}>{`${choiceObj.originalIndex + 1}. ${displayText}`}</ThemedText>
              </Pressable>
            );
          })}
            </>
          )}
            </View>
            {((question as any)?.choices?.length > 0 || showDescriptiveMark || shuffledChoices.length > 0 || filteredChoicesWithIndex.length > 0 || (comboFormatData?.length ?? 0) > 0 || isDiagramEligible || subject === '民法') ? (
              <View style={styles.choicesMarkRow}>
                {showDescriptiveMark ? (
                  <ThemedText style={[styles.choicesMark, { color: colors.text }]}>（記）</ThemedText>
                ) : null}
                <Pressable
                  style={[
                    styles.scopeChip,
                    { borderColor: colors.primary, backgroundColor: activeActionMode === 'descriptiveScope' ? colors.primary : colors.choiceBg }
                  ]}
                  onPress={() => setActiveActionMode((prev) => (prev === 'descriptiveScope' ? null : 'descriptiveScope'))}
                >
                  <ThemedText style={[styles.scopeChipText, { color: activeActionMode === 'descriptiveScope' ? '#fff' : colors.primary }]}>
                    {activeActionMode === 'descriptiveScope' ? '記述スコープ ON' : '記述スコープ'}
                  </ThemedText>
                </Pressable>
                <Pressable
                  style={[
                    styles.scopeChip,
                    { borderColor: colors.primary, backgroundColor: activeActionMode === 'teachMe' ? colors.primary : colors.choiceBg }
                  ]}
                  onPress={() => setActiveActionMode((prev) => (prev === 'teachMe' ? null : 'teachMe'))}
                >
                  <ThemedText style={[styles.scopeChipText, { color: activeActionMode === 'teachMe' ? '#fff' : colors.primary }]}>
                    {activeActionMode === 'teachMe' ? '教えて先生 ON' : '教えて先生'}
                  </ThemedText>
                </Pressable>
                {tacQuestionDeepdive ? (
                  <Pressable
                    style={[styles.scopeChip, { borderColor: '#00897B', backgroundColor: colors.choiceBg }]}
                    onPress={handleOpenTacQuestionDeepdive}
                  >
                    <ThemedText style={[styles.scopeChipText, { color: '#00897B' }]}>もっと深掘る</ThemedText>
                  </Pressable>
                ) : null}
                {interactiveSlots.length === 0 ? (
                  <Pressable
                    style={[
                      styles.scopeChip,
                      {
                        borderColor: '#F9A825',
                        backgroundColor: activeActionMode === 'highlighterPen' ? '#F9A825' : colors.choiceBg,
                      },
                    ]}
                    onPress={() =>
                      setActiveActionMode((prev) => (prev === 'highlighterPen' ? null : 'highlighterPen'))
                    }
                  >
                    <ThemedText
                      style={[
                        styles.scopeChipText,
                        { color: activeActionMode === 'highlighterPen' ? '#fff' : '#F9A825' },
                      ]}
                    >
                      {activeActionMode === 'highlighterPen' ? '蛍光ペン ON' : '蛍光ペン'}
                    </ThemedText>
                  </Pressable>
                ) : null}
                {activeActionMode === 'highlighterPen' && interactiveSlots.length === 0 ? (
                  <ThemedText style={{ fontSize: 11, color: colors.subText, lineHeight: 16, maxWidth: 320 }}>
                    {Platform.OS === 'web'
                      ? webHelpUsesDragSelection
                        ? 'カーソルが黄色マーカー形になります。本文をドラッグして選択した部分だけがハイライトされます。もう一度ハイライト上を選ぶとその部分は消えます。'
                        : 'カーソルが黄色マーカー形になります。問題文になぞると行がハイライトされます。マークだけをなぞると行が消えます。'
                      : '問題文になぞると行がハイライトされます。ハイライト上だけをなぞるとその行が消えます。オフにすると行タップでトグルできます。'}
                  </ThemedText>
                ) : null}
                {isDiagramEligible ? (
                  <>
                    <Pressable
                      style={[styles.scopeChip, { borderColor: '#9C27B0', backgroundColor: colors.choiceBg }]}
                      onPress={() => { setDiagramMode('self'); setDiagramModalVisible(true); }}
                    >
                      <ThemedText style={[styles.scopeChipText, { color: '#9C27B0' }]}>自分で図</ThemedText>
                    </Pressable>
                    <Pressable
                      style={[styles.scopeChip, { borderColor: '#9C27B0', backgroundColor: colors.choiceBg }]}
                      onPress={() => { setDiagramMode('model'); setDiagramModalVisible(true); }}
                    >
                      <ThemedText style={[styles.scopeChipText, { color: '#9C27B0' }]}>模範図</ThemedText>
                    </Pressable>
                  </>
                ) : null}
                {subject === '民法' ? (
                  <Pressable
                    style={[styles.scopeChip, { borderColor: '#2E7D32', backgroundColor: colors.choiceBg }]}
                    onPress={() => setPrecedentModalVisible(true)}
                  >
                    <ThemedText style={[styles.scopeChipText, { color: '#2E7D32' }]}>判例について知る</ThemedText>
                  </Pressable>
                ) : null}
              </View>
            ) : null}
          </View>
        </ThemedView>

        {/* Answer Button for Multi-Select（組み合わせ問題: （ｒ）の数だけ選択必須） */}
        {(() => {
          const answer = (question as any).answer || [];
          if (Array.isArray(answer) && answer.length > 1) {
            const canSubmit = selectedIndices.length === requiredSelectCount;
            return (
              <Pressable
                style={[styles.answerButton, !canSubmit && styles.answerButtonDisabled]}
                disabled={!canSubmit}
                onPress={() => {
                  router.push({
                    pathname: '/result',
                    params: {
                      subject,
                      field,
                      questionIndex: String(questionIndex),
                      pickedIndex: '-1',
                      pickedIndices: JSON.stringify(selectedIndices),
                      totalQuestions: String(questions.length),
                      correctCountSession: params.correctCountSession || '0',
                      wrongCounts: JSON.stringify(wrongCounts),
                      ...(mode ? { mode } : {}),
                      ...(isShuffle ? { shuffle: '1' } : {}),
                    }
                  });
                }}
              >
                <ThemedText style={styles.answerButtonText}>回答する</ThemedText>
              </Pressable>
            );
          }
          return null;
        })()}

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

        <Link href="/subjects" replace asChild>
          <Pressable style={StyleSheet.flatten([
            styles.choiceButton,
            {
              backgroundColor: '#fff',
              borderColor: '#5A9BD5',
              borderWidth: 2,
              elevation: 0,
              marginBottom: 12
            }
          ])}>
            <ThemedText type="defaultSemiBold" style={{ color: '#5A9BD5', fontSize: 16 }}>科目選択</ThemedText>
          </Pressable>
        </Link>
        <Link href="/" replace asChild>
          <Pressable style={StyleSheet.flatten([
            styles.choiceButton,
            {
              backgroundColor: '#fff',
              borderColor: '#757575',
              borderWidth: 2,
              elevation: 0,
              marginBottom: 40
            }
          ])}>
            <ThemedText type="defaultSemiBold" style={{ color: '#757575', fontSize: 16 }}>メインメニューへ</ThemedText>
          </Pressable>
        </Link>

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

        {/* 教えて先生 Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={teachMeModalVisible}
          onRequestClose={() => setTeachMeModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { maxHeight: '85%' }]}>
              <ThemedText type="subtitle" style={styles.modalTitle}>教えて先生</ThemedText>
              {teachMeLoading ? (
                <View style={{ padding: 24, alignItems: 'center' }}>
                  <ActivityIndicator size="large" color={colors.primary} />
                  <ThemedText style={{ marginTop: 12, color: colors.subText }}>説明を生成中…</ThemedText>
                </View>
              ) : teachMeError ? (
                <ThemedText style={{ color: '#D32F2F', padding: 16 }}>{teachMeError}</ThemedText>
              ) : teachMeContent ? (
                <ScrollView style={{ maxHeight: '70%' }}>
                  <MarkdownText text={teachMeContent} />
                </ScrollView>
              ) : null}
              <Pressable style={styles.modalCloseButton} onPress={() => setTeachMeModalVisible(false)}>
                <ThemedText style={{ color: '#fff' }}>閉じる</ThemedText>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* 判例について知る Modal（民法のみ） */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={precedentModalVisible}
          onRequestClose={() => setPrecedentModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { maxHeight: '90%' }]}>
              <ThemedText type="subtitle" style={styles.modalTitle}>判例解説</ThemedText>
              {CIVIL_PRECEDENT_IMAGES.length > 0 ? (
                <ScrollView style={{ maxHeight: '80%' }} showsVerticalScrollIndicator>
                  {CIVIL_PRECEDENT_IMAGES.map((item, idx) => (
                    <View key={idx} style={{ marginBottom: 16 }}>
                      <Image
                        source={item.source}
                        style={{ width: '100%', aspectRatio: 1.5, maxHeight: 500 }}
                        resizeMode="contain"
                      />
                      {item.caption ? (
                        <ThemedText style={{ marginTop: 8, color: colors.subText, fontSize: 14 }}>{item.caption}</ThemedText>
                      ) : null}
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <ThemedText style={{ color: colors.subText, padding: 16 }}>
                  assets/images/precedent/ に画像を追加し、src/civilPrecedentImages.ts で登録してください。
                </ThemedText>
              )}
              <Pressable style={styles.modalCloseButton} onPress={() => setPrecedentModalVisible(false)}>
                <ThemedText style={{ color: '#fff' }}>閉じる</ThemedText>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent
          visible={mondaibunnGazoModalVisible}
          onRequestClose={() => setMondaibunnGazoModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { maxHeight: '90%' }]}>
              <ThemedText type="subtitle" style={styles.modalTitle}>問題文・模範図</ThemedText>
              {mondaibunnGazoItems.length > 0 ? (
                <ScrollView style={{ maxHeight: '80%' }} showsVerticalScrollIndicator>
                  {mondaibunnGazoItems.map((item, idx) => (
                    <View key={idx} style={{ marginBottom: 16 }}>
                      <Image
                        source={item.source}
                        style={{ width: '100%', aspectRatio: 1.4, maxHeight: 560 }}
                        resizeMode="contain"
                      />
                      {item.caption ? (
                        <ThemedText style={{ marginTop: 8, color: colors.subText, fontSize: 14 }}>{item.caption}</ThemedText>
                      ) : null}
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <ThemedText style={{ color: colors.subText, padding: 16 }}>
                  画像がありません。
                </ThemedText>
              )}
              <Pressable style={styles.modalCloseButton} onPress={() => setMondaibunnGazoModalVisible(false)}>
                <ThemedText style={{ color: '#fff' }}>閉じる</ThemedText>
              </Pressable>
            </View>
          </View>
        </Modal>

        <SaikokuCompareModal
          visible={saikokuCompareModalVisible}
          onClose={() => setSaikokuCompareModalVisible(false)}
          imageSource={compareTableImage}
          title={compareDef?.title}
          body={compareDef?.body}
          caption={compareDef?.caption}
        />

        <PersonFlowDiagramModal
          visible={personFlowModalVisible}
          onClose={() => setPersonFlowModalVisible(false)}
          item={personFlowDiagram}
          castMembers={questionCast}
        />

        <DiagramModal
          visible={diagramModalVisible}
          onClose={() => setDiagramModalVisible(false)}
          problemText={question?.text || ''}
          mode={diagramMode}
          questionId={subject && paramField && questionIndex !== null ? `${subject}_${paramField}_${questionIndex}` : undefined}
        />
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
  questionSidebar: {
    marginHorizontal: -20,
    marginBottom: 8,
    maxHeight: 44,
  },
  questionSidebarContent: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 6,
    paddingBottom: 4,
  },
  questionSidebarItem: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionSidebarItemText: {
    fontSize: 14,
    fontWeight: '600',
  },
  subject: {
    opacity: 0.7,
  },
  currentInsightPanel: {
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    gap: 10,
  },
  currentInsightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  currentInsightTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  currentInsightBadge: {
    minWidth: 48,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignItems: 'center',
  },
  currentInsightBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
  currentInsightLabel: {
    fontSize: 13,
    fontWeight: '800',
  },
  currentInsightToggle: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
  },
  currentInsightToggleText: {
    fontSize: 12,
    fontWeight: '800',
  },
  currentInsightStats: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  currentInsightStatBox: {
    minWidth: 88,
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  currentInsightStatValue: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 22,
  },
  currentInsightStatLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  currentInsightMessage: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
  },
  currentInsightNext: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  currentInsightCollapsed: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  currentInsightNextTitle: {
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  currentInsightNextText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
  questionMarkColumn: {
    flexDirection: 'column',
    gap: 6,
    paddingTop: 4,
  },
  questionMarkButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  questionMarkText: {
    fontSize: 18,
    fontWeight: '700',
  },
  mondaibunnGazoOpenButton: {
    width: 36,
    minHeight: 36,
    borderRadius: 8,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
  mondaibunnGazoOpenButtonText: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 12,
  },
  questionContainer: {
    position: 'relative',
    overflow: 'visible',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 8,
    // Shadows for depth
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  questionContainerTashi: {
    minHeight: 240,
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderRadius: 20,
    marginBottom: 12,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12 },
      android: { elevation: 4 },
      web: { boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }
    })
  },
  questionMetaText: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 14,
    textAlign: 'center',
  },
  questionNumBadge: {
    position: 'absolute',
    top: -2,
    left: -2,
    zIndex: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  questionNumBadgeText: {
    color: '#2D3748',
    fontSize: 24,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 24,
    lineHeight: 38,
    backgroundColor: 'transparent',
    fontWeight: '600',
  },
  questionTextTashi: {
    fontSize: 18,
    lineHeight: 32,
    fontWeight: '500',
  },
  questionTextSmall: {
    fontSize: 22,
    lineHeight: 34,
    backgroundColor: 'transparent',
    fontWeight: '600',
  },
  questionTextTashiSmall: {
    fontSize: 16,
    lineHeight: 29,
    fontWeight: '500',
  },
  /** 問題文内のア〜オ記述肢のみカード化（教示＋組合せ問題など） */
  stemChoiceCard: {
    width: '100%',
    alignSelf: 'stretch',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    marginBottom: 8,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3 },
      android: { elevation: 2 },
      web: { boxShadow: '0 1px 4px rgba(0,0,0,0.08)' },
    }),
  },
  descriptiveFormatted: {
    gap: 12,
  },
  descriptiveParagraph: {
    marginBottom: 4,
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
  wordBankItemButton: {
    width: '100%',
  },
  wordBankItem: {
    width: '30%', // Approx 3 columns
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  /** 改行語群・長文スロット用（ドラッグしやすい1列） */
  wordBankItemBlock: {
    width: '100%',
    maxWidth: '100%',
    flexBasis: '100%',
    alignSelf: 'stretch',
  },
  wordBankItemPressable: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  wordBankItemDragging: {
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
  cancelSlotButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  choices: {
    gap: 12,
  },
  choicesRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  choicesBody: {
    flex: 1,
    gap: 12,
  },
  choicesMarkRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 4,
  },
  choicesMark: {
    fontSize: 16,
    fontWeight: '700',
  },
  scopeChip: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 16,
  },
  scopeChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  descriptiveLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  descriptiveInput: {
    minHeight: 120,
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  reorderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    gap: 8,
  },
  reorderNum: {
    fontSize: 16,
    fontWeight: '700',
    minWidth: 28,
  },
  reorderText: {
    fontSize: 14,
    lineHeight: 20,
  },
  reorderButtons: {
    flexDirection: 'row',
    gap: 4,
  },
  reorderBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  reorderBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  comboTable: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  comboTableHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 2,
  },
  comboTableHeaderCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  comboTableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    gap: 8,
  },
  comboTableNum: {
    fontSize: 16,
    fontWeight: '700',
    minWidth: 28,
  },
  comboTableCell: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  choiceButton: {
    borderRadius: 30, // Pill shape
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderBottomWidth: 4, // 3D effect at bottom
    borderColor: '#8FB3D9',
    backgroundColor: '#fff', // White background for the button itself
    alignItems: 'flex-start',
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
    fontWeight: '400',
    textAlign: 'left',
    alignSelf: 'stretch',
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
  slotButtonTashi: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginHorizontal: 3,
  },
  slotButtonText: {
    fontWeight: 'bold',
    color: '#0a7ea4',
    fontSize: 18,
  },
  slotButtonTextTashi: {
    fontSize: 16,
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
  answerButton: {
    marginVertical: 20,
    backgroundColor: '#FF9800',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  answerButtonDisabled: {
    backgroundColor: '#FFE0B2',
    elevation: 0,
  },
  answerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 2,
  },
  slotTargetContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
  },
  slotTargetGrid: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 8,
  },
  slotTargetBox: {
    flex: 1,
    minWidth: 0,
    minHeight: 82,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 12,
    position: 'relative',
  },
  slotTargetBoxActive: {
    borderStyle: 'solid',
  },
  slotTargetButton: {
    flex: 1,
  },
  slotTargetLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  slotTargetValue: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  slotTargetClear: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
