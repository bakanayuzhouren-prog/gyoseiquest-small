import { ChachalotAvatar } from '@/components/chachalot-avatar';
import { DeepdiveChunkLinkButton } from '@/components/deepdive-chunk-link-button';
import { MarkdownText } from '@/components/markdown-text';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { expandComic4DeepdiveTags } from '@/src/comic4DeepdiveExpand';
import { TEITOUKEN_TEXTBOOK_MARKDOWN } from '@/src/content/teitoukenTextbookMarkdown';
import { useLearnPlayback } from '@/src/context/LearnPlaybackContext';
import { useCharacter } from '@/src/context/CharacterContext';
import { useTheme } from '@/src/context/ThemeContext';
import { getChunkImageSource } from '@/src/chunkImages';
import { setChunkNavigationPayload } from '@/src/chunkSessionState';
import { getMinpo13Article602Hotspot, isMinpo13DiagramImageKey, type DeepdiveImageHotspot } from '@/src/deepdiveImageHotspots';
import {
  mergedDeepdiveHasResolvableImage,
  pickLearnDeepdiveSharedImageKey,
  resolveLearnDeepdiveAutoImageByCardIndex,
} from '@/src/deepdiveLearnAutoImage';
import {
    applyLearnIndexToLearnReturnPath,
    clearDeepdiveSessionWeb,
    getDeepdiveParams,
    getLearnDeepdiveReturnCursor,
    hydrateDeepdiveFromSessionIfEmpty,
    hydrateLearnBackMetaFromSessionIfMissing,
    parseLearnReturnHref,
    peekDeepdiveReturnHrefWeb,
    takeDeepdiveLearnBackMetaWeb,
    takeDeepdiveReturnHrefWeb,
} from '@/src/deepdiveState';
import { resolveDeepdiveImageTagInner, resolveImageAsset } from '@/src/resolveImageAsset';
import { CHACHALOT_SPEECH_OPTIONS } from '@/utils/chachalot-tts';
import { isPreservableTableBlock } from '@/utils/deepdive-tab-table';
import {
    inferQuizDeepdiveSourceFromScreenTitle,
    parseChoiceIndexFromLabel,
    resolveQuizDeepdiveBodyFromCatalog,
    type QuizDeepdiveSource,
} from '@/utils/quizDeepdiveRestore';
import { formatStatuteReferenceForMarkdown } from '@/utils/statute-reference-format';
import { applyTTSRules } from '@/utils/tts-rules';
import { MaterialIcons } from '@expo/vector-icons';
import {
    Stack,
    useFocusEffect,
    useGlobalSearchParams,
    useLocalSearchParams,
    useRouter,
} from 'expo-router';
import * as Speech from 'expo-speech';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { BackHandler, Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

/** スタックが無いとき /question へ戻す際、mode・シャッフル・問題番号を落とさない */
function buildQuizReturnParams(stored: ReturnType<typeof getDeepdiveParams>): Record<string, string> {
  const params: Record<string, string> = {
    subject: (stored.quizSubject || '').trim(),
    field: (stored.quizField || '').trim(),
  };
  const m = (stored.quizMode || '').trim();
  if (m) params.mode = m;
  if (stored.quizShuffle === '1') params.shuffle = '1';
  const qi = (stored.quizQuestionIndex || '').trim();
  if (qi !== '') params.index = qi;
  return params;
}

const CHACHALOT_IMG = require('@/assets/images/characters/chachalot.png');

/** Web: Pressable 内の Text/Icon がクリックのターゲットになり親の onPress が発火しないことがある */
const webNoHitChild = Platform.OS === 'web' ? { pointerEvents: 'none' as const } : {};

/** 問題を解く・記述の「もっと深掘り」一覧のみ。一覧のピクセル／デコード負荷を約半分に（縦横 √0.5）。拡大プレビューはフルサイズのまま。 */
const DESCRIPTIVE_QUIZ_DEEPDIVE_PIXEL_RATIO = 0.5;
const DESCRIPTIVE_QUIZ_DEEPDIVE_SCALE = Math.sqrt(DESCRIPTIVE_QUIZ_DEEPDIVE_PIXEL_RATIO);
const DESCRIPTIVE_QUIZ_DEEPDIVE_INLINE_MAX_H = Math.round(500 * DESCRIPTIVE_QUIZ_DEEPDIVE_SCALE);
const DESCRIPTIVE_QUIZ_DEEPDIVE_HERO_MAX_H = Math.round(280 * DESCRIPTIVE_QUIZ_DEEPDIVE_SCALE);

/** 画面上で「黒枠」と誤認されない青みのあるネイビー（過去の #0a1e50 は暗く潰れやすい） */
const DESCRIPTIVE_CASE_BADGE_NAVY = '#34588c';
/** choiceBorder と差別化し、画面上で「ネイビー」の縁として認識しやすい太さに統一 */
const DESCRIPTIVE_CASE_BORDER_WIDTH = 4;
/** 親カードに載せるとき、見出しを白＋ネイビー枠のタグにする判定（【ケースA】） */
const DESCRIPTIVE_CASE_TITLE_BADGE_HEAD_RE = /^【ケース\s*[A-Za-zＡ-Ｚ0-9０-９]】/u;

/**
 * normalize＋lookbehind 付き分割は数万字を超えるとメインスレッドが長時間ブロックする（学習・民法など）。
 * このサイズ以上は 1 カードとして描画し、滞在を防ぐ。
 */
const DEEPDIVE_SPLIT_CHAR_SOFT_CAP = 48_000;

/**
 * お試し: インバンドル「抵当権の教科書」だけ、soft cap 超過で番号見出し分割が効かず 1 カード化する問題を回避する。
 * 行頭の ATX 見出し（#〜###）の直前でのみ前置分割する。問題を解く・学習の deepdive には影響しない。
 */
function preSplitBundledTeitoukenForCardTrial(text: string): string[] {
  const trimmed = text.replace(/\r\n/g, '\n').trim();
  if (!trimmed) return [];
  const head = trimmed.split('\n')[0]?.trim() ?? '';
  if (!/^#\s*抵当権の教科書/.test(head)) return [trimmed];
  if (trimmed.length <= DEEPDIVE_SPLIT_CHAR_SOFT_CAP) return [trimmed];
  const parts = trimmed.split(/\n(?=#{1,3}\s+)/).map((s) => s.trim()).filter(Boolean);
  return parts.length >= 2 ? parts : [trimmed];
}

/** 番号見出し行の直前（preInsert と同系）。日付「28.12」の `.` では改行しない */
const NEWLINE_BEFORE_NUM_HEAD =
  /\n(?=\s*(?:(?:[1-9][0-9]?|[１-９][０-９]?)[\.．:：\uFF1A](?![0-9０-９])\s*(?:\*\*|＊＊)?|[①②③④⑤⑥⑦⑧⑨⑩]))/g;

/** 文中の「N.」の前に改行を入れるときの N. 側（28.12.8 の「28.」は除外） */
const HALFWD_NUM_HEAD_TOKEN = /[1-9][0-9]?[\.．:：\uFF1A](?!\d)\s*(?:\*\*|＊＊|[^\s\n　])/;
const FULLWD_NUM_HEAD_TOKEN = /[１-９][０-９]?[\.．:：\uFF1A](?![０-９])\s*(?:\*\*|＊＊|[^\s\n　])/;
/** 【ケースA】【ケースＢ】など M列の事例見出し。カード単位分割し [[image:…]] をケースごとに差し込みやすくする */
const DEEPDIVE_CASE_CHUNK_SPLIT = /(?:^|\n)(?=【ケース\s*[A-Za-zＡ-Ｚ0-9０-９]】)/u;

/** スプレッドシート由来の途中改行を詰め、空行のみ段落区切りとする。「。」のあと改行＋番号見出しの前は必ず改行を維持 */
function normalizeDeepdiveFlowText(s: string): string {
  const t = s.replace(/\r\n/g, '\n').trim();
  if (!t) return s;
  const PARA_PROTECT = '\uE000';
  return t
    .split(/\n{2,}/)
    .map((block) => {
      const trimmedBlock = block.trim();
      const rowLines = trimmedBlock.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
      /** タブ表・Markdown パイプ表は行結合しない */
      if (isPreservableTableBlock(trimmedBlock)) {
        return rowLines.join('\n');
      }
      /** 箇条書き（- ）ブロックは行結合しない（Web で1行に潰れると flex 崩れの原因） */
      if (rowLines.some((l) => /^-\s+/.test(l.trim()))) {
        return rowLines.join('\n');
      }
      let b = trimmedBlock;
      b = b.replace(NEWLINE_BEFORE_NUM_HEAD, PARA_PROTECT);
      b = b.replace(/[ \t]*\n[ \t]*/g, ' ').replace(/[ \u3000]{2,}/g, ' ');
      b = b.replace(new RegExp(PARA_PROTECT, 'g'), '\n');
      b = b
        .replace(new RegExp(`([^\\n*])(${HALFWD_NUM_HEAD_TOKEN.source})`, 'g'), '$1\n$2')
        .replace(new RegExp(`([^\\n*])(${FULLWD_NUM_HEAD_TOKEN.source})`, 'g'), '$1\n$2')
        .replace(/([^\n])([①②③④⑤⑥⑦⑧⑨⑩])/g, '$1\n$2');
      b = String(b).replace(/(【ケース\s*[A-Za-zＡ-Ｚ0-9０-９]】)\s*(?=\S)/gu, '$1\n');
      b = b.replace(/。(?!\n)(?![」』）])/g, '。\n');
      return b
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .join('\n');
    })
    .filter(Boolean)
    .join('\n\n');
}

/**
 * 「具体的な事例」などで1カード内に 【ケースA】【ケースB】が続くときだけ複数カードにする。
 * [[image:…]] をケース本文の直下に書けるようにするための後処理。
 */
function splitEmbeddedDeepdiveCaseChunks(cardsIn: string[]): string[] {
  const out: string[] = [];
  for (const c of cardsIn) {
    const t = c.trim();
    if (!t) continue;
    const parts = t.split(DEEPDIVE_CASE_CHUNK_SPLIT).map((s) => s.trim()).filter(Boolean);
    if (parts.length >= 2) {
      out.push(...parts);
    } else {
      out.push(t);
    }
  }
  return out;
}

/**
 * 続け書き の直後に 【ケースB】 と来るとき改行して splitEmbedded と一致させる。
 * （「…である。【ケースA】… 【ケースB】」など）
 */
function insertNewlinesBeforeEmbeddedCaseMarkers(s: string): string {
  let t = s.replace(/\r\n/g, '\n').trim();
  if (!t) return t;
  t = t.replace(/([^\s\n])(\s*)(?=【ケース\s*[A-Za-zＡ-Ｚ0-9０-９]】)/gu, '$1\n');
  t = t.replace(/】(【ケース\s*[A-Za-zＡ-Ｚ0-9０-９]】)/gu, '】\n$1');
  return t;
}

/** 【ケースA】〜 の直前どこでも分割できる（前文と同一行・同一 slabs のとき A だけ intro に残る問題の修正） */
const CASE_MARKER_HEAD_SPLIT = /(?=【ケース\s*[A-Za-zＡ-Ｚ0-9０-９]】)/gu;

/** 問題を解く・記述: 前置きと 【ケース…】単位へ分離（ケース A が見出し行頭に無くても必ず検出） */
function sliceDescriptiveMainByCaseSlices(text: string): { introSlices: string[]; caseSlices: string[] } {
  const t1 = insertNewlinesBeforeEmbeddedCaseMarkers(text.replace(/\r\n/g, '\n')).trim();
  if (!t1) return { introSlices: [], caseSlices: [] };
  const normalized = normalizeDeepdiveFlowText(t1).trim();
  const segments = normalized
    .split(CASE_MARKER_HEAD_SPLIT)
    .map((s) => s.trim())
    .filter(Boolean);
  const introSlices: string[] = [];
  const caseSlices: string[] = [];
  for (const seg of segments) {
    if (/^【ケース\s*[A-Za-zＡ-Ｚ0-9０-９]】/u.test(seg)) caseSlices.push(seg);
    else introSlices.push(seg);
  }
  return { introSlices, caseSlices };
}

const CARD_NUM_ONLY_TITLE = /^(?:[1-9][0-9]?|[１-９][０-９]?)[\\.．:：\uFF1A]\s*$/;
const DEEPDIVE_SECTION_MARK = '(?:■|💡|🏠|👉|🔍|📚|📝)';
const DEEPDIVE_SECTION_KEYWORDS =
  '(?:解説|結論|本肢の正誤|直す場所|つまり|暗記|要点|具体的な事例でイメージしよう！|具体的な事例|ここが試験の勝負どころ[！!]?|関連知識|受験生へのアドバイス[！!]?|過去問の急所(?:（[^）]+）)?|試験対策のアドバイス|根拠条文(?:（[^）]+）)?|根拠判例|法理のポイント)';
const DEEPDIVE_NAMED_SECTION_HEAD =
  `${DEEPDIVE_SECTION_MARK}?\\s*${DEEPDIVE_SECTION_KEYWORDS}`;
const DEEPDIVE_NAMED_SECTION_HEAD_RE = new RegExp(
  `(?:\\n|^)(?=(?:${DEEPDIVE_SECTION_MARK}\\s*${DEEPDIVE_SECTION_KEYWORDS}|${DEEPDIVE_SECTION_KEYWORDS}(?:\\s*[:：]|\\s|【|$)))`,
  'mu'
);
const DEEPDIVE_INLINE_TITLE_RE = new RegExp(
  `^(${DEEPDIVE_NAMED_SECTION_HEAD})(?:\\s*[:：]\\s*|\\s+|(?=【)|)(.+)$`,
  'u'
);

function splitContentToImageParts(content: string): Array<{ type: 'text' | 'image'; value: string }> {
  const parts: Array<{ type: 'text' | 'image'; value: string }> = [];
  if (!content) return parts;
  const re = /\[\[image:([^\]]+)\]\]/g;
  let lastIdx = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    if (m.index > lastIdx) {
      const slice = content.slice(lastIdx, m.index);
      if (slice.trim()) parts.push({ type: 'text', value: slice });
    }
    parts.push({ type: 'image', value: m[1].trim() });
    lastIdx = re.lastIndex;
  }
  if (lastIdx < content.length) {
    const slice = content.slice(lastIdx);
    if (slice.trim()) parts.push({ type: 'text', value: slice });
  }
  return parts;
}

/** 本文先頭の連続する [[image:…]] をナビヘッダー直下のヒーロー用に抜き出す */
function stripLeadingImageTags(text: string): { images: string[]; rest: string } {
  const images: string[] = [];
  let t = text.replace(/^\uFEFF?/, '');
  const tagAtStart = /^\[\[image:([^\]]+)\]\]\s*/;
  for (;;) {
    const u = t.trimStart();
    const m = tagAtStart.exec(u);
    if (!m) break;
    const resolvedKey = resolveDeepdiveImageTagInner(m[1]);
    images.push(resolvedKey ?? m[1].trim());
    t = u.slice(m[0].length);
  }
  return { images, rest: t.trimStart() };
}

function readRouterParam(param: string | string[] | undefined): string {
  if (typeof param === 'string') return param;
  if (Array.isArray(param)) return param[0] ?? '';
  return '';
}

function stripDeepdiveForTts(s: string): string {
  return s
    .replace(/\[\[image:[^\]]+\]\]/g, '')
    .replace(/\[\[section:[^\]]+\]\]/g, '')
    .replace(/\[\[[^\]]+\]\]/g, '')
    .trim();
}

export default function DeepdiveScreen() {
  const params = useLocalSearchParams<{
    content?: string;
    choiceLabel?: string;
    /** インバンドル済み Markdown を本文に使う（Web で session が巨大 JSON で失われたときの復帰用） */
    textbookSlug?: string;
  }>();
  /** Local が空のとき Web でクエリがまだ載らない事例を補う（グローバルはフォーカス外でも更新される） */
  const globalSearchParams = useGlobalSearchParams<{ textbookSlug?: string }>();
  const { colors } = useTheme();
  const { applyCharacterNames } = useCharacter();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    isPlaying: isLearnPlaying,
    setIsPlaying: setLearnIsPlaying,
    learnScreenMounted,
    manualPrev: learnManualPrev,
    manualNext: learnManualNext,
  } = useLearnPlayback();
  const [content, setContent] = useState('');
  /** スプレッドシート N 列（語群未使用シートの周辺知識） */
  const [peripheralContent, setPeripheralContent] = useState('');
  const [learnRelatedStatutesContent, setLearnRelatedStatutesContent] = useState('');
  const [deepView, setDeepView] = useState<'main' | 'peripheral' | 'relatedStatutes'>('main');
  const [choiceLabel, setChoiceLabel] = useState('');
  const [fromLearn, setFromLearn] = useState(false);
  /** 肢が正解なら true・不正解なら false・表示しないときは null（memo 単体・学習など） */
  const [choiceCorrect, setChoiceCorrect] = useState<boolean | null>(null);
  /** スプレッドシート AZ 列（肢ごと）。通常の深掘りの下に表示 */
  const [beginnerContent, setBeginnerContent] = useState('');
  /** 見て聞いて覚える: スプレッドシート F 列。ヘッダー画像の直下 */
  const [fExplainHeader, setFExplainHeader] = useState('');
  /** クイズ結果から開いたときの科目・分野（地方自治法の深掘り調整用） */
  const [quizSubject, setQuizSubject] = useState('');
  const [quizField, setQuizField] = useState('');
  /** setDeepdiveParams の screenTitle（根拠条文など）。空ならヘッダーは「もっと深掘る」 */
  const [pageTitle, setPageTitle] = useState(() => (getDeepdiveParams().screenTitle || '').trim());
  const [quizDeepdiveSource, setQuizDeepdiveSource] = useState(
    () => (getDeepdiveParams().quizDeepdiveSource || '').trim() as QuizDeepdiveSource | '',
  );
  /** タップで全画面拡大（require の module 番号） */
  const [previewImageSource, setPreviewImageSource] = useState<number | null>(null);
  const [chunkHotspotModal, setChunkHotspotModal] = useState<DeepdiveImageHotspot | null>(null);
  const fromLearnRef = useRef(false);
  const paramsRef = useRef(params);
  paramsRef.current = params;
  const globalSearchRef = useRef(globalSearchParams);
  globalSearchRef.current = globalSearchParams;

  const textbookSlugHydrationKey = `${readRouterParam(params.textbookSlug)}|${readRouterParam(globalSearchParams.textbookSlug)}`;

  /** Web では `router.push({ params })` の一部がクエリとして現れず `useLocalSearchParams` に届かないことがあるため補う */
  const peekTextbookSlugFromLocation = (): string => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return '';
    try {
      return new URLSearchParams(window.location.search).get('textbookSlug')?.trim() ?? '';
    } catch {
      return '';
    }
  };

  /** 巨大セルに対する includes が学習スニペット一致で固まるのを防ぐ（先頭〜上限文字のみ見る） */
  const cellMayContainSnippet = (d: string, snippet: string, headChars: number) => {
    if (!d || d.length < 200) return false;
    if (d.length <= headChars) return d.includes(snippet);
    return d.slice(0, headChars).includes(snippet);
  };

  useFocusEffect(
    useCallback(() => {
      let aborted = false;
      const tid = setTimeout(() => {
        if (aborted) return;

        hydrateDeepdiveFromSessionIfEmpty();
        hydrateLearnBackMetaFromSessionIfMissing();

        const p = paramsRef.current;
        const fromParams =
          typeof p.content === 'string'
            ? p.content
            : Array.isArray(p.content)
              ? p.content[0] ?? ''
              : '';

        let slugEff = readRouterParam(p.textbookSlug).trim();
        if (!slugEff) slugEff = readRouterParam(globalSearchRef.current.textbookSlug).trim();
        if (!slugEff) slugEff = peekTextbookSlugFromLocation();

        const stored = getDeepdiveParams();
        const fromParamLabel =
          typeof p.choiceLabel === 'string'
            ? p.choiceLabel
            : Array.isArray(p.choiceLabel)
              ? p.choiceLabel[0] ?? ''
              : '';
        let raw = stored.content || fromParams || '';
        if (!raw.trim() && stored.quizSubject && stored.quizField) {
          const labelForIndex = stored.choiceLabel || fromParamLabel || '';
          const choiceIndex =
            stored.quizChoiceIndex ??
            parseChoiceIndexFromLabel(labelForIndex);
          const questionIndex = parseInt(stored.quizQuestionIndex, 10);
          const sourceRaw = (stored.quizDeepdiveSource || '').trim() as QuizDeepdiveSource | '';
          const source: QuizDeepdiveSource =
            sourceRaw && sourceRaw.length > 0
              ? sourceRaw
              : inferQuizDeepdiveSourceFromScreenTitle(stored.screenTitle || '');
          if (choiceIndex != null && Number.isFinite(questionIndex) && questionIndex >= 0) {
            raw = resolveQuizDeepdiveBodyFromCatalog({
              quizSubject: stored.quizSubject,
              quizField: stored.quizField,
              quizQuestionIndex: questionIndex,
              quizChoiceIndex: choiceIndex,
              quizMode: stored.quizMode,
              source,
            });
          }
        }
        const teitoukenTitleMark = '抵当権の教科書';
        if (slugEff === 'teitouken') {
          raw = TEITOUKEN_TEXTBOOK_MARKDOWN.trim();
        } else if (!raw.trim() && (stored.screenTitle || '').trim() === teitoukenTitleMark) {
          raw = TEITOUKEN_TEXTBOOK_MARKDOWN.trim();
        }

        let beg = stored.beginnerContent || '';
        let periph = stored.peripheralContent || '';

        const finishCommon = () => {
          setChoiceLabel(stored.choiceLabel || fromParamLabel || '');
          setFromLearn(stored.fromLearn);
          setChoiceCorrect(stored.choiceCorrect ?? null);
          fromLearnRef.current = stored.fromLearn;
          setQuizSubject((stored.quizSubject || '').trim());
          setQuizField((stored.quizField || '').trim());
          setPageTitle(
            (
              stored.screenTitle ||
              (slugEff === 'teitouken' ? teitoukenTitleMark : '')
            ).trim()
          );
          const sourceRaw = (stored.quizDeepdiveSource || '').trim() as QuizDeepdiveSource | '';
          setQuizDeepdiveSource(
            sourceRaw ||
              inferQuizDeepdiveSourceFromScreenTitle(
                (stored.screenTitle || (slugEff === 'teitouken' ? teitoukenTitleMark : '')).trim(),
              ),
          );
        };

        const learnSubj = (stored.learnSubject || '').trim();
        const learnIdx =
          typeof stored.learnContentIndex === 'number' && stored.learnContentIndex >= 0
            ? stored.learnContentIndex
            : typeof stored.learnReturnIndex === 'number' && stored.learnReturnIndex >= 0
              ? stored.learnReturnIndex
              : null;

        const prependAutoImageIfNeeded = (text: string): string => {
          let t = text;
          if (!t.trim() || mergedDeepdiveHasResolvableImage(t)) return t;
          if (stored.fromLearn && t.length > 80_000) return t;
          if (stored.fromLearn && learnIdx != null && learnSubj) {
            const byIdx = resolveLearnDeepdiveAutoImageByCardIndex(learnSubj, learnIdx);
            if (byIdx) return `[[image:${byIdx}]]\n\n${t}`;
          }
          if (stored.fromLearn) return t;
          const shared = pickLearnDeepdiveSharedImageKey(t, learnSubj, {
            fromLearn: false,
            allowGlobalSubjectScan: true,
          });
          if (shared) t = `[[image:${shared}]]\n\n${t}`;
          return t;
        };

        const augmentBeginner = (b: string) => prependAutoImageIfNeeded(b);

        const applyToState = () => {
          if (!raw.trim()) {
            setContent('');
            setBeginnerContent(augmentBeginner(beg));
            setPeripheralContent(periph.trim());
            setLearnRelatedStatutesContent((stored.learnRelatedStatutesContent || '').trim());
            setDeepView('main');
            setFExplainHeader((stored.fExplain || '').trim());
            finishCommon();
            return;
          }
          /** 見て聞いて覚える: 学習画面で本文確定済み。LEARN_DEEPDIVE 再走査・画像推定はしない */
          if (stored.fromLearn) {
            setContent(raw);
            setBeginnerContent(beg);
            setPeripheralContent(periph.trim());
            setLearnRelatedStatutesContent((stored.learnRelatedStatutesContent || '').trim());
            setDeepView('main');
            setFExplainHeader((stored.fExplain || '').trim());
            finishCommon();
            return;
          }
          const snippet = raw.trim();
          if (!stored.fromLearn && snippet.length > 0 && snippet.length < 150) {
            const { LEARN_DEEPDIVE } = require('@/src/learn') as {
              LEARN_DEEPDIVE: Record<string, string[] | undefined>;
            };
            const dd = LEARN_DEEPDIVE;
            let arraysToSearch: string[][] = [];
            if (learnSubj && dd[learnSubj] && Array.isArray(dd[learnSubj])) {
              arraysToSearch = [dd[learnSubj]];
            } else {
              arraysToSearch = Object.values(dd).filter(Array.isArray) as string[][];
            }
            const headChars = 80_000;
            for (const arr of arraysToSearch) {
              const found = arr.find((dRow) => cellMayContainSnippet(dRow, snippet, headChars));
              if (found) {
                raw = found;
                break;
              }
            }
          }
          raw = prependAutoImageIfNeeded(raw);
          setContent(raw);
          setBeginnerContent(augmentBeginner(beg));
          if (periph.trim()) {
            periph = prependAutoImageIfNeeded(periph);
          }
          setPeripheralContent(periph.trim());
          setLearnRelatedStatutesContent((stored.learnRelatedStatutesContent || '').trim());
          setDeepView('main');
          setFExplainHeader((stored.fExplain || '').trim());
          finishCommon();
        };

        const finish = () => {
          if (aborted) return;
          applyToState();
        };
        if (Platform.OS === 'web' && typeof requestAnimationFrame === 'function') {
          requestAnimationFrame(finish);
        } else {
          finish();
        }
      }, 0);

      return () => {
        aborted = true;
        clearTimeout(tid);
      };
    }, [textbookSlugHydrationKey])
  );

  const [highlightModal, setHighlightModal] = useState<{ title: string; body: string } | null>(null);
  const [ttsSegmentIndex, setTtsSegmentIndex] = useState(0);
  const [isTtsPlaying, setIsTtsPlaying] = useState(false);
  /** アンマウント／戻る時、チャチャロットが喋っていなければ学習の expo-speech を止めない判定に使う */
  const isTtsPlayingRef = useRef(false);
  const ttsSessionRef = useRef(0);

  useEffect(() => {
    isTtsPlayingRef.current = isTtsPlaying;
  }, [isTtsPlaying]);

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [deepView]);

  const contentComicExpanded = useMemo(() => expandComic4DeepdiveTags(content), [content]);
  const peripheralComicExpanded = useMemo(
    () => expandComic4DeepdiveTags(peripheralContent),
    [peripheralContent],
  );
  const beginnerComicExpanded = useMemo(() => expandComic4DeepdiveTags(beginnerContent), [beginnerContent]);
  const fExplainComicExpanded = useMemo(
    () => expandComic4DeepdiveTags((fExplainHeader || '').trim()),
    [fExplainHeader],
  );
  const learnRelatedComicExpanded = useMemo(
    () => expandComic4DeepdiveTags((learnRelatedStatutesContent || '').trim()),
    [learnRelatedStatutesContent],
  );

  const { images: headerImageKeys, rest: mainContentRest } = useMemo(
    () => stripLeadingImageTags(contentComicExpanded),
    [contentComicExpanded],
  );
  const { images: peripheralHeaderKeys, rest: peripheralMainRest } = useMemo(
    () => stripLeadingImageTags(peripheralComicExpanded),
    [peripheralComicExpanded],
  );
  const mainParts = useMemo(() => splitContentToImageParts(mainContentRest), [mainContentRest]);
  const peripheralParts = useMemo(
    () => splitContentToImageParts(peripheralMainRest),
    [peripheralMainRest],
  );
  const relatedStatutesParts = useMemo(
    () => splitContentToImageParts(learnRelatedComicExpanded),
    [learnRelatedComicExpanded],
  );
  const beginnerParts = useMemo(() => splitContentToImageParts(beginnerComicExpanded), [beginnerComicExpanded]);
  /** F列解説も B 列と同じくカード化（B が画像のみ等で本文が F に乗るケース対策） */
  const fExplainParts = useMemo(
    () => splitContentToImageParts(fExplainComicExpanded),
    [fExplainComicExpanded],
  );

  /**
   * 改行のない長文でも「2. 」「3．」の前に改行を入れる（問題を解くモードの M 列深掘り向け）。
   * 学習の辞典 deepdive（reference）と同系のルール＋全角数字対応。
   */
  const preInsertNewlinesForNumberedSections = (raw: string): string =>
    raw
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\\n/g, '\n')
      .replace(/([^\n])(【[^】]{1,80}】)/g, '$1\n$2')
      .replace(
        /([^\n■💡🏠👉🔍📚📝 \t　])(考え方のポイント|受験生へのアドバイス|趣旨(?=\s*[\n　\s])|根拠条文[:：]|根拠判例[:：]|結論[:：]|具体的な事例|ここが試験の勝負どころ|関連知識)/g,
        '$1\n$2'
      )
      .replace(new RegExp(`([^\\n*])(${HALFWD_NUM_HEAD_TOKEN.source})`, 'g'), '$1\n$2')
      .replace(new RegExp(`([^\\n*])(${FULLWD_NUM_HEAD_TOKEN.source})`, 'g'), '$1\n$2')
      .replace(/([^\n])([①②③④⑤⑥⑦⑧⑨⑩])/g, '$1\n$2')
      .replace(new RegExp(`([^\\n])(${DEEPDIVE_SECTION_MARK})`, 'gu'), '$1\n$2');

  /**
   * 番号付きセクション（1. 2. 3. ／ １． ／ 1： 等）で分割してカード化。
   * スプレッドシート連携ルールどおり、先に normalizeDeepdiveFlowText で段落・番号前改行を整えてから preInsert する
   * （見て聞いて覚える・民法物権の B 列のように「。」直後に「2.」が続く1行データでもカードが分かれる）。
   */
  const splitIntoCards = (text: string): string[] => {
    const trimmed = text.trim();
    if (!trimmed) return [];
    /** 見て聞いて覚える: **1. 根拠** 形式は Markdown 番号見出しでだけ分割 */
    if (fromLearn && /\*\*[1-4][\.．][^*\n]+?\*\*/.test(trimmed)) {
      const mdCards = trimmed
        .split(/\n\n(?=\*\*[1-4][\.．][^*]*\*\*)/)
        .map((s) => s.trim())
        .filter(Boolean);
      if (mdCards.length >= 2) return splitEmbeddedDeepdiveCaseChunks(mdCards);
    }
    if (pageTitle === '判例') {
      return splitEmbeddedDeepdiveCaseChunks([trimmed.replace(/\s*\n\s*/g, '')]);
    }
    if (trimmed.length > DEEPDIVE_SPLIT_CHAR_SOFT_CAP) {
      return splitEmbeddedDeepdiveCaseChunks([trimmed]);
    }
    const withNl = trimmed.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const flow = normalizeDeepdiveFlowText(withNl);
    const prepared = preInsertNewlinesForNumberedSections(flow);
    const head = '(?:[1-9][0-9]?|[１-９][０-９]?)[\\.．:：\uFF1A](?![0-9０-９])\\s*';
    let sections = prepared.split(DEEPDIVE_NAMED_SECTION_HEAD_RE).map((s) => s.trim()).filter(Boolean);
    if (sections.length >= 2) return splitEmbeddedDeepdiveCaseChunks(sections);
    sections = prepared.split(new RegExp(`(?:\\n|^)(?=${head})`, 'm')).map((s) => s.trim()).filter(Boolean);
    if (sections.length >= 2) return splitEmbeddedDeepdiveCaseChunks(sections);
    sections = prepared
      .split(new RegExp(`(?<=[\\s\\u3000。．!！?？])(?=${head})`))
      .map((s) => s.trim())
      .filter(Boolean);
    return splitEmbeddedDeepdiveCaseChunks(sections.length >= 2 ? sections : [prepared.trim() || trimmed]);
  };

  const splitInlineNumberedTitleBody = (line: string): { title: string; body: string } | null => {
    const m = /^(?<head>(?:[1-9][0-9]?|[１-９][０-９]?)[\.．:：\uFF1A]\s*[^。！？!?\n]{6,70}?)(?<body>(?:行政|民法|商法|会社法|地方自治法|憲法|刑法|この|なぜ|簡単に|条文|原則|理由|対象|時期|内容|つまり|不服|審査|処分|法律|判例)[\s\S]+)$/u.exec(line.trim());
    if (!m?.groups?.head || !m.groups.body) return null;
    return { title: m.groups.head.trim(), body: m.groups.body.trim() };
  };

  /** カードの1行目をタイトル、残りを本文に分離（「2.」のみの行は本文にまとめて変な改行を防ぐ） */
  const splitCardTitle = (cardText: string): { title: string; body: string } => {
    const trimmed = cardText.trim();
    const firstNewline = trimmed.indexOf('\n');
    if (firstNewline < 0) {
      const inline = DEEPDIVE_INLINE_TITLE_RE.exec(trimmed);
      if (inline) {
        return { title: inline[1].trim(), body: normalizeDeepdiveFlowText(inline[2].trim()) };
      }
      const numberedInline = splitInlineNumberedTitleBody(trimmed);
      if (numberedInline) {
        return { title: numberedInline.title, body: normalizeDeepdiveFlowText(numberedInline.body) };
      }
      return { title: trimmed, body: '' };
    }
    const title = trimmed.slice(0, firstNewline).trim();
    const body = trimmed.slice(firstNewline + 1).trim();
    const inline = DEEPDIVE_INLINE_TITLE_RE.exec(title);
    if (inline) {
      const inlineBody = [inline[2].trim(), body].filter(Boolean).join('\n');
      return {
        title: inline[1].trim(),
        body: inlineBody ? normalizeDeepdiveFlowText(inlineBody) : '',
      };
    }
    if (CARD_NUM_ONLY_TITLE.test(title)) {
      // 「3.」だけが1行・次行から本文、のとき従来は全文を Markdown 本文に回して太字見出しが付かない。
      // 次行（または続く1行）を見出しにくっつけて太字表示する。
      if (!body) {
        return { title: '', body: normalizeDeepdiveFlowText(trimmed) };
      }
      const bodyTrim = body.trim();
      const firstNl = bodyTrim.indexOf('\n');
      const headLine = firstNl >= 0 ? bodyTrim.slice(0, firstNl).trim() : bodyTrim;
      const tail = firstNl >= 0 ? bodyTrim.slice(firstNl + 1).trim() : '';
      const mergedTitle = `${title} ${headLine}`.trim();
      return {
        title: mergedTitle,
        body: tail ? normalizeDeepdiveFlowText(tail) : '',
      };
    }
    return {
      title,
      body: body ? normalizeDeepdiveFlowText(body) : '',
    };
  };

  /** 地方自治法（問題を解く）: 深掘りカードの「関連条文」「関連判例」ブロックを出さない */
  const jichihouHideRelatedSections =
    !fromLearn && quizSubject === '行政法' && quizField === '地方自治法';

  /** 記述（問題を解く）: 一覧の画像だけピクセル負荷を抑える（拡大プレビューはフル） */
  const isDescriptiveQuizDeepdive = !fromLearn && quizSubject === '記述';

  const descriptiveQuizCasePartition = useMemo(() => {
    if (!isDescriptiveQuizDeepdive || !mainContentRest.trim()) return null;
    return sliceDescriptiveMainByCaseSlices(mainContentRest);
  }, [isDescriptiveQuizDeepdive, mainContentRest]);

  const normalizedDeepdiveCardHead = (title: string) =>
    title
      .replace(/\*\*/g, '')
      .replace(/^【(.+)】$/, '$1')
      .replace(/^[1-9][0-9]?[.．:：\uFF1A]\s*/, '')
      .replace(/^[１-９][０-９]?[.．:：\uFF1A]\s*/, '')
      .trim();

  const dropJichihouRelatedStatuteCaseCard = (cardText: string) => {
    if (!jichihouHideRelatedSections) return false;
    const { title } = splitCardTitle(cardText);
    const head = normalizedDeepdiveCardHead(title);
    return head.startsWith('関連条文') || head.startsWith('関連判例');
  };

  const deepdiveCardsForRender = (text: string) => {
    const prelude = preSplitBundledTeitoukenForCardTrial(text);
    const cards = prelude.flatMap((chunk) => splitIntoCards(chunk));
    return jichihouHideRelatedSections ? cards.filter((c) => !dropJichihouRelatedStatuteCaseCard(c)) : cards;
  };

  const screenTitleEff = pageTitle.trim() || (getDeepdiveParams().screenTitle || '').trim();
  const quizDeepdiveSourceEff =
    quizDeepdiveSource ||
    (getDeepdiveParams().quizDeepdiveSource || '').trim() ||
    inferQuizDeepdiveSourceFromScreenTitle(screenTitleEff);
  const isStatuteRefDeepdivePage =
    quizDeepdiveSourceEff === 'statuteRef' ||
    screenTitleEff === '根拠条文' ||
    screenTitleEff === '根拠・判例' ||
    screenTitleEff === '判例' ||
    (screenTitleEff === '関連条文' &&
      ((quizSubject === '民法' && quizField === '債権各論') ||
        (quizSubject === '憲法' && quizField === '憲法')));
  const mainHasEmbedImages = mainParts.some((p) => p.type === 'image');
  const relatedStatutesHasEmbedImages = relatedStatutesParts.some((p) => p.type === 'image');

  /** 民法総則など超長文のカード分割は毎再レンダーで走らせない */
  const mainCardsForRender = useMemo(() => {
    const t = mainContentRest.trim();
    if (!t) return [];
    if (isStatuteRefDeepdivePage) {
      return [formatStatuteReferenceForMarkdown(t)];
    }
    return deepdiveCardsForRender(t);
  }, [mainContentRest, jichihouHideRelatedSections, isStatuteRefDeepdivePage]);

  const peripheralCardsForRender = useMemo(() => {
    const t = peripheralMainRest.trim();
    if (!t) return [];
    const cards = splitIntoCards(t);
    return jichihouHideRelatedSections ? cards.filter((c) => !dropJichihouRelatedStatuteCaseCard(c)) : cards;
  }, [peripheralMainRest, jichihouHideRelatedSections]);

  const relatedStatutesCardsForRender = useMemo(() => {
    const t = learnRelatedComicExpanded.trim();
    if (!t) return [];
    return [formatStatuteReferenceForMarkdown(t)];
  }, [learnRelatedComicExpanded]);

  const beginnerCardsForRender = useMemo(() => {
    const t = beginnerComicExpanded.trim();
    if (!t) return [];
    const cards = splitIntoCards(t);
    return jichihouHideRelatedSections ? cards.filter((c) => !dropJichihouRelatedStatuteCaseCard(c)) : cards;
  }, [beginnerComicExpanded, jichihouHideRelatedSections]);

  const fExplainCardsForRender = useMemo(() => {
    const t = fExplainComicExpanded.trim();
    if (!t) return [];
    const cards = splitIntoCards(t);
    return jichihouHideRelatedSections ? cards.filter((c) => !dropJichihouRelatedStatuteCaseCard(c)) : cards;
  }, [fExplainComicExpanded, jichihouHideRelatedSections]);

  const ttsSegments = useMemo(() => {
    if (deepView === 'relatedStatutes' && learnRelatedStatutesContent.trim()) {
      const textForTTS = stripDeepdiveForTts(formatStatuteReferenceForMarkdown(learnRelatedStatutesContent.trim()));
      if (!textForTTS) return [];
      return textForTTS
        .split(/\n{2,}/)
        .map((s) => applyTTSRules(s.trim()))
        .filter((s) => s.trim());
    }
    if (deepView === 'peripheral' && peripheralContent.trim()) {
      const perForTts = jichihouHideRelatedSections
        ? deepdiveCardsForRender(peripheralComicExpanded).join('\n\n')
        : peripheralComicExpanded;
      const textForTTS = stripDeepdiveForTts(perForTts);
      if (!textForTTS) return [];
      const chunks = textForTTS
        .split(/\n{2,}/)
        .map((s) => s.trim())
        .filter(Boolean);
      if (chunks.length <= 1 && textForTTS.length > 500) {
        const bySentence = textForTTS.split(/(?<=[。．!！?？])\s+/).map((s) => s.trim()).filter(Boolean);
        return bySentence.map((s) => applyTTSRules(s)).filter((s) => s.trim());
      }
      return chunks.map((s) => applyTTSRules(s)).filter((s) => s.trim());
    }
    const mainRaw =
      isStatuteRefDeepdivePage && contentComicExpanded.trim()
        ? formatStatuteReferenceForMarkdown(contentComicExpanded.trim())
        : jichihouHideRelatedSections
          ? deepdiveCardsForRender(contentComicExpanded).join('\n\n')
          : contentComicExpanded;
    const mainForTts = stripDeepdiveForTts(String(mainRaw)).replace(/\*\*/g, '');
    const begForTts = jichihouHideRelatedSections
      ? deepdiveCardsForRender(beginnerComicExpanded).join('\n\n')
      : beginnerComicExpanded;
    const pieces = [mainForTts, stripDeepdiveForTts(begForTts).replace(/\*\*/g, '')].filter(Boolean);
    const textForTTS = pieces.join('\n\n');
    if (!textForTTS) return [];
    const chunks = textForTTS
      .split(/\n{2,}/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (chunks.length <= 1 && textForTTS.length > 500) {
      const bySentence = textForTTS.split(/(?<=[。．!！?？])\s+/).map((s) => s.trim()).filter(Boolean);
      return bySentence.map((s) => applyTTSRules(s)).filter((s) => s.trim());
    }
    return chunks.map((s) => applyTTSRules(s)).filter((s) => s.trim());
  }, [deepView, peripheralContent, content, beginnerContent, learnRelatedStatutesContent, jichihouHideRelatedSections, isStatuteRefDeepdivePage]);

  useEffect(() => {
    setTtsSegmentIndex(0);
  }, [deepView, peripheralContent, content, beginnerContent, learnRelatedStatutesContent, jichihouHideRelatedSections, isStatuteRefDeepdivePage]);

  const cardStyle = {
    backgroundColor: '#E2E8F0',
    borderColor: colors.choiceBorder,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  };

  /** 見て聞いて覚える深掘り：白地・太字活かし・行間広め */
  const learnDeepdiveCardStyle = {
    backgroundColor: colors.card,
    borderColor: colors.choiceBorder,
    borderWidth: 1,
    borderRadius: 12,
    padding: 18,
    marginBottom: 14,
    alignSelf: 'stretch' as const,
    width: '100%' as const,
  };

  const cardBodyTextStyle = {
    fontSize: 16,
    lineHeight: 26,
    color: colors.text,
    alignSelf: 'stretch' as const,
    width: '100%' as const,
    textAlign: 'left' as const,
  };
  const learnDeepdiveBodyTextStyle = {
    ...cardBodyTextStyle,
    fontSize: 17,
    lineHeight: 28,
  };
  const cardTitleTextStyle = {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
    fontWeight: '700' as const,
    marginBottom: 0,
    alignSelf: 'stretch' as const,
    width: '100%' as const,
    textAlign: 'left' as const,
  };
  const learnDeepdiveTitleTextStyle = {
    ...cardTitleTextStyle,
    fontSize: 18,
    lineHeight: 28,
  };
  const stripMarkdownBoldMarkers = (s: string) => s.replace(/\*\*/g, '');

  const handleHighlightPress = (title: string, body: string) => {
    setHighlightModal({ title, body });
  };

  const openImagePreview = useCallback((src: number) => {
    setPreviewImageSource(src);
  }, []);

  const openChunkFromDeepdiveHotspot = useCallback((hotspot: DeepdiveImageHotspot) => {
    setChunkNavigationPayload({
      body: hotspot.statuteMarkdown?.trim() || '',
      chunkImage: hotspot.chunkImage,
      statuteTitle: hotspot.statuteTitle || '',
    });
    setChunkHotspotModal(hotspot);
  }, []);

  const minpo602Chunk = getMinpo13Article602Hotspot();
  const openMinpo602Chunk = useCallback(() => {
    if (minpo602Chunk) openChunkFromDeepdiveHotspot(minpo602Chunk);
  }, [minpo602Chunk, openChunkFromDeepdiveHotspot]);

  /** 見て聞いて覚えている最中に深掘りへ来てチャチャロット未使用で戻るときは、学習の読み上げを切らない */
  const stopOwnedSpeechUnlessLearnBackground = () => {
    ttsSessionRef.current += 1;
    const preserveLearn = fromLearnRef.current && !isTtsPlayingRef.current;
    if (preserveLearn) return;
    try {
      Speech.stop();
    } catch {
      /* expo-speech / Web で例外になる場合がある */
    }
  };

  const stopTts = () => {
    stopOwnedSpeechUnlessLearnBackground();
    setIsTtsPlaying(false);
  };

  useEffect(() => {
    return () => {
      stopOwnedSpeechUnlessLearnBackground();
    };
  }, []);

  const speakFromIndex = (index: number, chain: boolean) => {
    if (index < 0 || index >= ttsSegments.length) return;
    const session = ttsSessionRef.current;
    setTtsSegmentIndex(index);
    setIsTtsPlaying(true);
    const line = ttsSegments[index];
    Speech.speak(line, {
      ...CHACHALOT_SPEECH_OPTIONS,
      onDone: () => {
        if (session !== ttsSessionRef.current) return;
        if (chain && index + 1 < ttsSegments.length) {
          speakFromIndex(index + 1, true);
        } else {
          setIsTtsPlaying(false);
        }
      },
      onStopped: () => {
        if (session !== ttsSessionRef.current) return;
        setIsTtsPlaying(false);
      },
      onError: () => {
        if (session !== ttsSessionRef.current) return;
        setIsTtsPlaying(false);
      },
    });
  };

  const handleChachalotToggle = () => {
    if (isTtsPlaying) {
      stopTts();
      return;
    }
    if (ttsSegments.length === 0) return;
    if (fromLearn) {
      setLearnIsPlaying(false);
    }
    speakFromIndex(0, true);
  };

  const handleBack = useCallback(() => {
    try {
      stopOwnedSpeechUnlessLearnBackground();
      setIsTtsPlaying(false);
    } catch {
      /* noop */
    }

    const stored = getDeepdiveParams();
    const learnCursor = getLearnDeepdiveReturnCursor();

    const finishBack = () => {
      clearDeepdiveSessionWeb();
    };

    const backToMountedLearn = (): boolean => {
      if (!stored.fromLearn || !learnScreenMounted || !router.canGoBack()) return false;
      if (Platform.OS === 'web') takeDeepdiveReturnHrefWeb();
      router.back();
      setTimeout(() => {
        finishBack();
      }, 0);
      return true;
    };

    const replaceLearnRoute = (opts: {
      routeSubject: string;
      field?: string | null;
      index?: number | null;
    }) => {
      const params: Record<string, string> = { subject: opts.routeSubject };
      if (opts.field) params.field = opts.field;
      if (opts.index != null && opts.index >= 0) params.index = String(opts.index);
      router.replace({ pathname: '/learn/[subject]', params } as any);
      finishBack();
    };

    const replaceHrefOrPath = (href: string) => {
      const parsedLearn = parseLearnReturnHref(href);
      if (parsedLearn) {
        router.replace({ pathname: parsedLearn.pathname as any, params: parsedLearn.params } as any);
      } else {
        router.replace(href as any);
      }
      finishBack();
    };

    const tryQuizReturnTo = (): boolean => {
      const target = stored.quizReturnTo;
      if (!target?.pathname?.trim()) return false;
      router.replace({
        pathname: target.pathname as any,
        params: target.params,
      } as any);
      finishBack();
      return true;
    };

    const tryStoredHref = (): boolean => {
      const href = peekDeepdiveReturnHrefWeb();
      const h = (href || '').trim();
      if (!h.startsWith('/')) return false;
      takeDeepdiveReturnHrefWeb();
      replaceHrefOrPath(h);
      return true;
    };

    const tryLearnReturn = (): boolean => {
      const sub = (stored.learnSubject || '').trim();
      if (!sub) return false;
      const cursorMatchesStored = !!(learnCursor && learnCursor.learnSubjectKey === sub);
      const idxNative =
        cursorMatchesStored && learnCursor ? learnCursor.displayIndex : stored.learnReturnIndex;
      if (cursorMatchesStored && learnCursor) {
        replaceLearnRoute({
          routeSubject: learnCursor.routeSubject,
          field: learnCursor.field,
          index: idxNative,
        });
      } else {
        replaceLearnRoute({ routeSubject: sub, index: idxNative });
      }
      return true;
    };

    // 1. 結果画面など明示復帰先（router.back より確実）
    if (tryQuizReturnTo()) return;

    if (backToMountedLearn()) return;

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const learnBackMeta = takeDeepdiveLearnBackMetaWeb();
      const pathPreferRaw =
        (learnBackMeta?.path && learnBackMeta.path.trim()) ||
        (stored.learnReturnPath && stored.learnReturnPath.trim()) ||
        '';

      if (pathPreferRaw.startsWith('/')) {
        const sub = (learnBackMeta?.sub || stored.learnSubject || '').trim();
        const cursorMatchesLearn = !!(learnCursor && sub && learnCursor.learnSubjectKey === sub);
        const idx =
          cursorMatchesLearn && learnCursor
            ? learnCursor.displayIndex
            : learnBackMeta?.idx ?? stored.learnReturnIndex;
        const path =
          stored.fromLearn && cursorMatchesLearn && learnCursor
            ? applyLearnIndexToLearnReturnPath(pathPreferRaw, learnCursor.displayIndex)
            : pathPreferRaw;
        takeDeepdiveReturnHrefWeb();
        const parsed = parseLearnReturnHref(path);
        if (parsed) {
          if (cursorMatchesLearn && learnCursor) {
            parsed.params.subject = learnCursor.routeSubject;
            if (learnCursor.field) parsed.params.field = learnCursor.field;
            if (idx != null && idx >= 0) parsed.params.index = String(idx);
          } else if (sub && !parsed.params.subject) {
            parsed.params.subject = sub;
            if (idx != null && idx >= 0) parsed.params.index = String(idx);
          }
          router.replace({ pathname: parsed.pathname as any, params: parsed.params } as any);
          finishBack();
        } else if (cursorMatchesLearn && learnCursor) {
          replaceLearnRoute({
            routeSubject: learnCursor.routeSubject,
            field: learnCursor.field,
            index: idx,
          });
        } else if (sub) {
          replaceLearnRoute({ routeSubject: sub, index: idx });
        } else {
          replaceHrefOrPath(path);
        }
        return;
      }

      if (tryStoredHref()) return;

      const sub = (learnBackMeta?.sub || stored.learnSubject || '').trim();
      const cursorMatchesLearn = !!(learnCursor && sub && learnCursor.learnSubjectKey === sub);
      const fallbackIdx = learnBackMeta?.idx ?? stored.learnReturnIndex;
      const idx =
        cursorMatchesLearn && learnCursor ? learnCursor.displayIndex : fallbackIdx;

      if (stored.fromLearn && sub) {
        takeDeepdiveReturnHrefWeb();
        if (cursorMatchesLearn && learnCursor) {
          replaceLearnRoute({
            routeSubject: learnCursor.routeSubject,
            field: learnCursor.field,
            index: idx,
          });
        } else {
          replaceLearnRoute({ routeSubject: sub, index: idx });
        }
        return;
      }

      const wqSub = (stored.quizSubject || '').trim();
      const wqField = (stored.quizField || '').trim();
      if (wqSub && wqField) {
        takeDeepdiveReturnHrefWeb();
        router.replace({
          pathname: '/question',
          params: buildQuizReturnParams(stored),
        } as any);
        finishBack();
        return;
      }

      if (router.canGoBack()) {
        takeDeepdiveReturnHrefWeb();
        router.back();
        finishBack();
        return;
      }

      takeDeepdiveReturnHrefWeb();
      router.replace('/learn' as any);
      finishBack();
      return;
    }

    // Native
    if (stored.fromLearn && tryLearnReturn()) return;

    if (router.canGoBack()) {
      router.back();
      finishBack();
      return;
    }

    if (tryLearnReturn()) return;

    const qSub = (stored.quizSubject || '').trim();
    const qField = (stored.quizField || '').trim();
    if (qSub && qField) {
      router.replace({ pathname: '/question', params: buildQuizReturnParams(stored) } as any);
      finishBack();
      return;
    }

    router.replace('/learn' as any);
    finishBack();
  }, [router, learnScreenMounted]);

  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const renderDeepdiveCard = (cardText: string, key: string, nestedInsideCaseWrap = false) => {
    const trimmed = cardText.trim();
    const firstLine = trimmed.split('\n')[0] ?? '';
    const isLearnCard = fromLearn && !nestedInsideCaseWrap;
    const shellStyle = nestedInsideCaseWrap
      ? { marginBottom: 10 }
      : isLearnCard
        ? learnDeepdiveCardStyle
        : cardStyle;
    const bodyTextStyle = isLearnCard ? learnDeepdiveBodyTextStyle : cardBodyTextStyle;
    const titleTextStyle = isLearnCard ? learnDeepdiveTitleTextStyle : cardTitleTextStyle;
    const markdownUniformWeight = isLearnCard ? false : true;
    const markdownLineGap = isLearnCard ? 10 : undefined;
    const markdownBulletList = isLearnCard;
    /** 先頭行がタブ／パイプ表なら splitCardTitle しない（タイトルをプレーン描画すると列が潰れる） */
    const spreadsheetLikeFirstRow =
      firstLine.includes('\t') ||
      (firstLine.trimStart().startsWith('|') && firstLine.includes('|'));

    /** ケースネストでは ThemedView の theme.background（白っぽい）が親の Slate と連続しない */
    const Wrapper = nestedInsideCaseWrap ? View : ThemedView;

    if (spreadsheetLikeFirstRow) {
      const normBody = normalizeDeepdiveFlowText(trimmed);
      return (
        <Wrapper key={key} style={shellStyle}>
          <MarkdownText
            text={normBody}
            style={bodyTextStyle}
            onHighlightPress={handleHighlightPress}
            applyNames={applyCharacterNames}
            uniformWeight={markdownUniformWeight}
            lineGap={markdownLineGap}
            bulletList={markdownBulletList}
            autoGlossaryTerms
          />
        </Wrapper>
      );
    }

    const { title, body } = splitCardTitle(cardText);
    const useCaseBadge =
      nestedInsideCaseWrap &&
      title.trim() !== '' &&
      DESCRIPTIVE_CASE_TITLE_BADGE_HEAD_RE.test(title.trim());

    const titleDisplay = applyCharacterNames(isLearnCard ? stripMarkdownBoldMarkers(title) : title);

    const titleNode =
      title &&
      (useCaseBadge ? (
        <View
          style={{
            alignSelf: 'flex-start',
            backgroundColor: '#ffffff',
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 8,
            borderWidth: DESCRIPTIVE_CASE_BORDER_WIDTH,
            borderColor: DESCRIPTIVE_CASE_BADGE_NAVY,
            marginBottom: body ? 10 : 0,
          }}
          accessibilityRole="text"
          accessibilityLabel={titleDisplay}
        >
          <MarkdownText
            text={titleDisplay.trim()}
            style={[titleTextStyle, { marginBottom: 0 }]}
            onHighlightPress={handleHighlightPress}
            uniformWeight={false}
            lineGap={0}
          />
        </View>
      ) : (
        <View style={{ marginBottom: body ? 12 : 0 }}>
          <MarkdownText
            text={titleDisplay.trim()}
            style={titleTextStyle}
            onHighlightPress={handleHighlightPress}
            uniformWeight={false}
            lineGap={0}
          />
        </View>
      ));

    return (
      <Wrapper key={key} style={shellStyle}>
        {titleNode}
        {body ? (
          <MarkdownText
            text={body}
            style={bodyTextStyle}
            onHighlightPress={handleHighlightPress}
            applyNames={applyCharacterNames}
            uniformWeight={markdownUniformWeight}
            lineGap={markdownLineGap}
            bulletList={markdownBulletList}
            autoGlossaryTerms
          />
        ) : null}
      </Wrapper>
    );
  };

  const renderImageTextParts = (
    blockParts: Array<{ type: 'text' | 'image'; value: string }>,
    keyPrefix: string,
    onImagePress: (src: number) => void,
    opts?: { nestedInsideCaseWrap?: boolean }
  ) => {
    if (blockParts.length === 0) return null;
    const nested = !!opts?.nestedInsideCaseWrap;
    /** 記述・ケース内: [[image]] の直後のテキスト（画像下説明）だけ白ボックス＋ネイビー縁 */
    const captionAfterPrevImage = (i: number) =>
      !!(nested && isDescriptiveQuizDeepdive && i > 0 && blockParts[i - 1]?.type === 'image');
    return (
      <View style={{ gap: 4 }}>
        {blockParts.map((p, i) =>
          p.type === 'text' ? (
            <View
              key={`${keyPrefix}-t-${i}`}
              style={[
                { gap: 0 },
                captionAfterPrevImage(i) && {
                  alignSelf: 'stretch' as const,
                  backgroundColor: '#ffffff',
                  borderRadius: 8,
                  borderWidth: DESCRIPTIVE_CASE_BORDER_WIDTH,
                  borderColor: DESCRIPTIVE_CASE_BADGE_NAVY,
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  marginBottom: 12,
                },
              ]}
            >
              {deepdiveCardsForRender(p.value.trim()).map((cardText, j) =>
                renderDeepdiveCard(cardText, `${keyPrefix}-${i}-${j}`, nested)
              )}
            </View>
          ) : (
            (() => {
              const imageKey = resolveDeepdiveImageTagInner(p.value) || p.value.trim();
              const src = resolveImageAsset(imageKey);
              const imgStyle = [
                { width: '100%' as const, maxHeight: 500, borderRadius: 12 },
                isDescriptiveQuizDeepdive && {
                  maxHeight: DESCRIPTIVE_QUIZ_DEEPDIVE_INLINE_MAX_H,
                },
              ];
              const containerStyle = isDescriptiveQuizDeepdive
                ? {
                    alignSelf: 'center' as const,
                    width: `${Math.round(DESCRIPTIVE_QUIZ_DEEPDIVE_SCALE * 100)}%` as `${number}%`,
                  }
                : undefined;
              return src ? (
                <View key={`${keyPrefix}-img-${i}`} style={[{ marginBottom: 12 }, containerStyle]}>
                  <Pressable
                    onPress={() => onImagePress(src)}
                    accessibilityRole="button"
                    accessibilityLabel="画像を拡大表示"
                    style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1 }]}
                  >
                    <Image
                      source={src}
                      style={imgStyle}
                      resizeMode="contain"
                      resizeMethod={isDescriptiveQuizDeepdive && Platform.OS === 'android' ? 'resize' : undefined}
                    />
                  </Pressable>
                  {isMinpo13DiagramImageKey(imageKey) && minpo602Chunk ? (
                    <DeepdiveChunkLinkButton onPress={openMinpo602Chunk} />
                  ) : null}
                </View>
              ) : (
                <ThemedView
                  key={`${keyPrefix}-img-${i}`}
                  style={{ padding: 12, marginBottom: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.choiceBorder }}
                >
                  <ThemedText style={{ color: colors.subText, fontSize: 14 }}>
                    画像を読み込めません（キー: {p.value}）。imageMap / deepdiveImages / chunkImages を確認してください。
                  </ThemedText>
                </ThemedView>
              );
            })()
          )
        )}
      </View>
    );
  };

  const renderDescriptiveQuizGroupedMainParts = (): ReactNode => {
    const partition = descriptiveQuizCasePartition;
    if (!partition || partition.caseSlices.length === 0) {
      return renderImageTextParts(mainParts, 'm', openImagePreview);
    }
    const { introSlices, caseSlices } = partition;
    return (
      <View style={{ gap: 0 }}>
        {introSlices.map((blob, idx) => (
          <View key={`m-intro-${idx}`}>
            {renderImageTextParts(splitContentToImageParts(blob.trim()), `m-intro-${idx}`, openImagePreview)}
          </View>
        ))}
        {caseSlices.map((blob, ci) => (
          <ThemedView
            key={`m-case-${ci}`}
            style={[
              cardStyle,
              { marginBottom: 12 },
              isDescriptiveQuizDeepdive && {
                borderWidth: DESCRIPTIVE_CASE_BORDER_WIDTH,
                borderColor: DESCRIPTIVE_CASE_BADGE_NAVY,
              },
            ]}
          >
            {renderImageTextParts(splitContentToImageParts(blob.trim()), `m-case-${ci}`, openImagePreview, {
              nestedInsideCaseWrap: true,
            })}
          </ThemedView>
        ))}
      </View>
    );
  };

  const hasMain = content.trim().length > 0;
  const hasBeginner = beginnerContent.trim().length > 0;
  const hasPeripheral = peripheralContent.trim().length > 0;
  const hasRelatedStatutes = learnRelatedStatutesContent.trim().length > 0;
  const showingPeripheral = deepView === 'peripheral' && hasPeripheral;
  const showingRelatedStatutes = deepView === 'relatedStatutes' && hasRelatedStatutes;
  const heroImageKeys = showingPeripheral ? peripheralHeaderKeys : headerImageKeys;

  /** 見て聞いて覚える（学習）画面と連携するミニプレイヤー */
  const showLinkedPlayer = fromLearn && (hasMain || hasBeginner);
  const linkedPlayerEnabled = showLinkedPlayer && learnScreenMounted;

  const handleLinkedPrev = () => {
    if (!linkedPlayerEnabled) return;
    stopTts();
    learnManualPrev();
  };

  const handleLinkedTogglePlay = () => {
    if (!linkedPlayerEnabled) return;
    stopTts();
    if (isLearnPlaying) {
      Speech.stop();
      setLearnIsPlaying(false);
    } else {
      setLearnIsPlaying(true);
    }
  };

  const handleLinkedNext = () => {
    if (!linkedPlayerEnabled) return;
    stopTts();
    learnManualNext();
  };

  const headerTitle = showingPeripheral
    ? '周辺知識'
    : showingRelatedStatutes
      ? '関連条文'
      : pageTitle.trim() || 'もっと深掘る';

  const DeepdiveRoot = Platform.OS === 'web' ? View : GestureHandlerRootView;

  return (
    <>
      {/* Web: ネイティブヘッダーの戻るがタッチを取れないことがあるため、画面内バーで戻る */}
      <Stack.Screen options={{ headerShown: false }} />
      <DeepdiveRoot style={styles.gestureRoot}>
      <SafeAreaView style={[styles.safeFill, { backgroundColor: colors.card }]} edges={['top', 'left', 'right']}>
        <View
          style={[
            styles.inlineHeader,
            {
              borderBottomColor: colors.choiceBorder,
              backgroundColor: colors.card,
            },
          ]}
        >
          <Pressable
            onPress={handleBack}
            hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
            style={({ pressed }) => [styles.headerBackBtn, pressed && styles.headerBackBtnPressed]}
            accessibilityRole="button"
            accessibilityLabel="解説ページに戻る"
          >
            <MaterialIcons name="arrow-back" size={22} color={colors.primary} style={webNoHitChild} />
            <ThemedText style={[styles.headerBackLabel, { color: colors.primary }, webNoHitChild]}>戻る</ThemedText>
          </Pressable>
          <ThemedText style={[styles.headerTitle, { color: colors.text }, webNoHitChild]} numberOfLines={1}>
            {headerTitle}
          </ThemedText>
          <View style={styles.headerSpacer} />
        </View>
        <View style={[styles.mainColumn, { backgroundColor: colors.card }]}>
        <ScrollView
          ref={scrollRef}
          style={[styles.scroll, { backgroundColor: colors.card }]}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator
        >
          {heroImageKeys.length > 0 ? (
            <View
              style={[
                styles.headerHero,
                { backgroundColor: colors.background, borderBottomColor: colors.choiceBorder },
              ]}
            >
              {heroImageKeys.map((imgKey, hi) => {
                const src = resolveImageAsset(imgKey);
                if (!src) return null;
                const heroWrapStyle: ViewStyle[] = [
                  { width: '100%' as `${number}%`, alignItems: 'center' },
                  ...(hi < heroImageKeys.length - 1 ? [{ marginBottom: 12 }] : []),
                ];
                const heroImgStyle = [
                  styles.headerHeroImage,
                  isDescriptiveQuizDeepdive && { maxHeight: DESCRIPTIVE_QUIZ_DEEPDIVE_HERO_MAX_H },
                ];
                const heroContainerStyle: ViewStyle = isDescriptiveQuizDeepdive
                  ? ({
                      width: `${Math.round(DESCRIPTIVE_QUIZ_DEEPDIVE_SCALE * 100)}%` as `${number}%`,
                    } as ViewStyle)
                  : ({ width: '100%' } as ViewStyle);
                return (
                  <View key={`deepdive-header-img-${hi}-${imgKey}`} style={heroWrapStyle}>
                    <View style={heroContainerStyle}>
                      <Pressable
                        onPress={() => openImagePreview(src)}
                        accessibilityRole="button"
                        accessibilityLabel="画像を拡大表示"
                        style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1 }]}
                      >
                        <Image
                          source={src}
                          style={heroImgStyle}
                          resizeMode="contain"
                          resizeMethod={
                            isDescriptiveQuizDeepdive && Platform.OS === 'android' ? 'resize' : undefined
                          }
                        />
                      </Pressable>
                      {isMinpo13DiagramImageKey(imgKey) && minpo602Chunk ? (
                        <DeepdiveChunkLinkButton onPress={openMinpo602Chunk} />
                      ) : null}
                    </View>
                  </View>
                );
              })}
            </View>
          ) : null}
          {!showingPeripheral && fExplainHeader.trim() ? (
            <View
              style={[
                styles.headerFExplain,
                { backgroundColor: colors.background, borderBottomColor: colors.choiceBorder },
              ]}
            >
              {fExplainParts.length > 0 ? (
                renderImageTextParts(fExplainParts, 'f', openImagePreview)
              ) : (
                <View style={{ gap: 0 }}>
                  {fExplainCardsForRender.map((cardText, j) => renderDeepdiveCard(cardText, `f-${j}`))}
                </View>
              )}
            </View>
          ) : null}
          <ThemedView style={[styles.content, { backgroundColor: colors.card }]}>
          {choiceLabel ? (
            <View style={{ marginBottom: 4 }}>
              <ThemedText
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: colors.subText,
                  marginBottom: 8,
                  letterSpacing: 0.3,
                }}
              >
                選択肢
              </ThemedText>
              <ThemedView style={cardStyle}>
                <ThemedText style={cardBodyTextStyle}>
                  {choiceLabel}
                  {choiceCorrect !== null ? (
                    <Text
                      style={{
                        fontSize: 20,
                        lineHeight: 26,
                        fontWeight: '700',
                        color: choiceCorrect ? '#2E7D32' : '#C62828',
                      }}
                    >
                      {choiceCorrect ? ' 〇 正解' : ' × 誤り'}
                    </Text>
                  ) : null}
                </ThemedText>
              </ThemedView>
            </View>
          ) : choiceCorrect !== null ? (
            <ThemedView style={[cardStyle, { marginBottom: 12 }]}>
              <Text
                style={{
                  fontSize: 20,
                  lineHeight: 28,
                  fontWeight: '700',
                  color: choiceCorrect ? '#2E7D32' : '#C62828',
                }}
              >
                {choiceCorrect ? '〇 正解' : '× 誤り'}
              </Text>
            </ThemedView>
          ) : null}
          {choiceLabel && hasMain && !showingPeripheral ? (
            <ThemedText
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: colors.subText,
                marginTop: 4,
                marginBottom: 8,
                letterSpacing: 0.3,
              }}
            >
              解説
            </ThemedText>
          ) : null}
          {showingPeripheral ? (
            <>
              <ThemedText
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: colors.subText,
                  marginTop: 4,
                  marginBottom: 8,
                  letterSpacing: 0.3,
                }}
              >
                周辺知識
              </ThemedText>
              {peripheralParts.length > 0 ? (
                renderImageTextParts(peripheralParts, 'p', openImagePreview)
              ) : peripheralMainRest.trim() ? (
                <View style={{ gap: 0 }}>
                  {peripheralCardsForRender.map((cardText, j) => renderDeepdiveCard(cardText, `p-${j}`))}
                </View>
              ) : (
                <ThemedText style={{ color: colors.subText }}>表示する内容がありません。</ThemedText>
              )}
            </>
          ) : null}
          {showingRelatedStatutes ? (
            <>
              <ThemedText
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: colors.subText,
                  marginTop: 4,
                  marginBottom: 8,
                  letterSpacing: 0.3,
                }}
              >
                関連条文
              </ThemedText>
              {relatedStatutesHasEmbedImages ? (
                renderImageTextParts(relatedStatutesParts, 'rs', openImagePreview)
              ) : (
                <View style={{ gap: 0 }}>
                  {relatedStatutesCardsForRender.map((cardText, j) => (
                    <ThemedView key={`rs-${j}`} style={cardStyle}>
                      <MarkdownText
                        text={cardText}
                        style={cardBodyTextStyle}
                        onHighlightPress={handleHighlightPress}
                        applyNames={applyCharacterNames}
                        uniformWeight={false}
                        autoGlossaryTerms
                      />
                    </ThemedView>
                  ))}
                </View>
              )}
            </>
          ) : null}
          {!showingPeripheral && !showingRelatedStatutes && hasMain ? (
            mainHasEmbedImages && !isStatuteRefDeepdivePage ? (
              isDescriptiveQuizDeepdive ? (
                renderDescriptiveQuizGroupedMainParts()
              ) : (
                renderImageTextParts(mainParts, 'm', openImagePreview)
              )
            ) : mainContentRest.trim() ? (
              <View style={{ gap: 0 }}>
                {mainCardsForRender.map((cardText, j) =>
                  isStatuteRefDeepdivePage ? (
                    <ThemedView key={`c-${j}`} style={cardStyle}>
                      <MarkdownText
                        text={cardText}
                        style={cardBodyTextStyle}
                        onHighlightPress={handleHighlightPress}
                        applyNames={applyCharacterNames}
                        uniformWeight={false}
                        autoGlossaryTerms
                      />
                    </ThemedView>
                  ) : (
                    renderDeepdiveCard(cardText, `c-${j}`)
                  )
                )}
              </View>
            ) : null
          ) : null}
          {!showingPeripheral && !showingRelatedStatutes && hasBeginner ? (
            <View style={{ marginTop: hasMain ? 24 : choiceLabel ? 20 : 0 }}>
              <ThemedText
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: colors.text,
                  marginBottom: 12,
                }}
              >
                ビギナー向け
              </ThemedText>
              {beginnerParts.length > 0 ? (
                renderImageTextParts(beginnerParts, 'b', openImagePreview)
              ) : (
                <View style={{ gap: 0 }}>
                  {beginnerCardsForRender.map((cardText, j) => renderDeepdiveCard(cardText, `bc-${j}`))}
                </View>
              )}
            </View>
          ) : null}
          {!showingPeripheral && !showingRelatedStatutes && !hasMain && !hasBeginner ? (
            <ThemedText style={{ color: colors.subText }}>表示する内容がありません。</ThemedText>
          ) : null}
        </ThemedView>
        </ScrollView>
        <View
          style={[
            styles.footerDock,
            {
              backgroundColor: colors.card,
              borderTopColor: colors.choiceBorder,
              paddingBottom: Math.max(insets.bottom, 12),
            },
          ]}
        >
          <View style={styles.footerBar}>
            <View style={styles.footerLeft}>
              {((deepView === 'main' && (hasMain || hasBeginner)) || (deepView === 'peripheral' && hasPeripheral)) ? (
                <Pressable
                  style={[styles.chachalotButton, { borderColor: colors.primary }]}
                  onPress={handleChachalotToggle}
                >
                  <ChachalotAvatar source={CHACHALOT_IMG} size={36} active={isTtsPlaying} style={webNoHitChild} />
                  <ThemedText style={[styles.chachalotButtonText, { color: colors.primary }, webNoHitChild]}>
                    {isTtsPlaying ? '停止' : 'おしえてちゃちゃロット'}
                  </ThemedText>
                </Pressable>
              ) : null}
              {deepView === 'main' && hasPeripheral ? (
                <Pressable
                  style={[styles.peripheralNavButton, { borderColor: colors.primary }]}
                  onPress={() => {
                    stopTts();
                    setDeepView('peripheral');
                  }}
                  accessibilityLabel="周辺知識を表示"
                >
                  <ThemedText style={[styles.peripheralNavButtonText, { color: colors.primary }, webNoHitChild]}>周辺知識</ThemedText>
                </Pressable>
              ) : null}
              {deepView === 'main' && hasRelatedStatutes ? (
                <Pressable
                  style={[styles.peripheralNavButton, { borderColor: colors.primary }]}
                  onPress={() => {
                    stopTts();
                    setDeepView('relatedStatutes');
                  }}
                  accessibilityLabel="関連条文を表示"
                >
                  <ThemedText style={[styles.peripheralNavButtonText, { color: colors.primary }, webNoHitChild]}>関連条文</ThemedText>
                </Pressable>
              ) : null}
              {deepView === 'peripheral' ? (
                <Pressable
                  style={[styles.peripheralNavButton, { borderColor: colors.primary }]}
                  onPress={() => {
                    stopTts();
                    setDeepView('main');
                  }}
                  accessibilityLabel="もっと深掘るの本文に戻る"
                >
                  <ThemedText style={[styles.peripheralNavButtonText, { color: colors.primary }, webNoHitChild]}>
                    もっと深掘るに戻る
                  </ThemedText>
                </Pressable>
              ) : null}
              {deepView === 'relatedStatutes' ? (
                <Pressable
                  style={[styles.peripheralNavButton, { borderColor: colors.primary }]}
                  onPress={() => {
                    stopTts();
                    setDeepView('main');
                  }}
                  accessibilityLabel="もっと深掘るの本文に戻る"
                >
                  <ThemedText style={[styles.peripheralNavButtonText, { color: colors.primary }, webNoHitChild]}>
                    もっと深掘るに戻る
                  </ThemedText>
                </Pressable>
              ) : null}
              <Pressable style={[styles.backButton, { backgroundColor: colors.accent }]} onPress={handleBack}>
                <ThemedText style={[styles.backButtonText, webNoHitChild]}>解説ページに戻る</ThemedText>
              </Pressable>
            </View>
            {showLinkedPlayer ? (
              <View style={styles.footerLearnPlayer}>
                <View
                  style={[styles.miniPlayer, { borderColor: colors.choiceBorder, backgroundColor: colors.background }]}
                >
                  <Pressable
                    style={({ pressed }) => [
                      styles.miniPlayerBtn,
                      pressed && styles.miniPlayerBtnPressed,
                      !linkedPlayerEnabled && styles.miniPlayerBtnDisabled,
                    ]}
                    disabled={!linkedPlayerEnabled}
                    onPress={handleLinkedPrev}
                    accessibilityRole="button"
                    accessibilityLabel="見て聞いて覚えるを前へ"
                  >
                    <MaterialIcons
                      name="skip-previous"
                      size={22}
                      color={linkedPlayerEnabled ? colors.primary : colors.subText}
                      style={webNoHitChild}
                    />
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [
                      styles.miniPlayerBtn,
                      pressed && styles.miniPlayerBtnPressed,
                      !linkedPlayerEnabled && styles.miniPlayerBtnDisabled,
                    ]}
                    disabled={!linkedPlayerEnabled}
                    onPress={handleLinkedTogglePlay}
                    accessibilityRole="button"
                    accessibilityLabel={isLearnPlaying ? '見て聞いて覚えるを停止' : '見て聞いて覚えるを再生'}
                  >
                    <MaterialIcons
                      name={isLearnPlaying ? 'pause' : 'play-arrow'}
                      size={26}
                      color={linkedPlayerEnabled ? colors.primary : colors.subText}
                      style={webNoHitChild}
                    />
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [
                      styles.miniPlayerBtn,
                      pressed && styles.miniPlayerBtnPressed,
                      !linkedPlayerEnabled && styles.miniPlayerBtnDisabled,
                    ]}
                    disabled={!linkedPlayerEnabled}
                    onPress={handleLinkedNext}
                    accessibilityRole="button"
                    accessibilityLabel="見て聞いて覚えるを次へ"
                  >
                    <MaterialIcons
                      name="skip-next"
                      size={22}
                      color={linkedPlayerEnabled ? colors.primary : colors.subText}
                      style={webNoHitChild}
                    />
                  </Pressable>
                </View>
              </View>
            ) : null}
          </View>
        </View>
        </View>
      </SafeAreaView>
      </DeepdiveRoot>

      <Modal
        visible={previewImageSource !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewImageSource(null)}
      >
        <Pressable
          style={styles.imagePreviewOverlay}
          onPress={() => setPreviewImageSource(null)}
          accessibilityLabel="拡大画像を閉じる"
        >
          <View style={styles.imagePreviewInner} pointerEvents="box-none">
            {previewImageSource !== null ? (
              <Image
                source={previewImageSource}
                style={styles.imagePreviewImage}
                resizeMode="contain"
              />
            ) : null}
          </View>
        </Pressable>
      </Modal>

      <Modal visible={!!chunkHotspotModal} transparent animationType="fade" onRequestClose={() => setChunkHotspotModal(null)}>
        <Pressable style={styles.modalOverlay} onPress={() => setChunkHotspotModal(null)}>
          <Pressable
            style={[styles.highlightModal, { backgroundColor: colors.card, borderColor: colors.choiceBorder, maxWidth: 560 }]}
            onPress={(e) => e.stopPropagation()}
          >
            {chunkHotspotModal ? (
              <>
                <ThemedText style={[styles.highlightModalTitle, { color: colors.primary }]}>
                  チャンク｜{chunkHotspotModal.statuteTitle || '関連知識'}
                </ThemedText>
                <ScrollView style={{ maxHeight: '80%' }} showsVerticalScrollIndicator>
                  {(() => {
                    const chunkSrc = getChunkImageSource(chunkHotspotModal.chunkImage);
                    return chunkSrc ? (
                      <Image
                        source={chunkSrc}
                        style={{ width: '100%', maxHeight: 480, marginBottom: 12, borderRadius: 8 }}
                        resizeMode="contain"
                        accessibilityLabel="602条の期間表"
                      />
                    ) : null;
                  })()}
                  {chunkHotspotModal.statuteMarkdown?.trim() ? (
                    <MarkdownText
                      text={chunkHotspotModal.statuteMarkdown.trim()}
                      style={{ fontSize: 15, lineHeight: 24, color: colors.text }}
                      applyNames={applyCharacterNames}
                      uniformWeight
                    />
                  ) : null}
                </ScrollView>
                <Pressable
                  style={[styles.highlightModalClose, { backgroundColor: colors.accent }]}
                  onPress={() => setChunkHotspotModal(null)}
                >
                  <ThemedText style={[styles.highlightModalCloseText, webNoHitChild]}>閉じる</ThemedText>
                </Pressable>
              </>
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>

      <Modal visible={!!highlightModal} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setHighlightModal(null)}>
          <Pressable style={[styles.highlightModal, { backgroundColor: colors.card, borderColor: colors.choiceBorder }]} onPress={(e) => e.stopPropagation()}>
            {highlightModal ? (
              <>
                <ThemedText style={[styles.highlightModalTitle, { color: colors.primary }]}>{highlightModal.title}</ThemedText>
                <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator>
                  <MarkdownText text={highlightModal.body} style={{ fontSize: 15, lineHeight: 24, color: colors.text }} applyNames={applyCharacterNames} uniformWeight />
                </ScrollView>
                <Pressable style={[styles.highlightModalClose, { backgroundColor: colors.accent }]} onPress={() => setHighlightModal(null)}>
                  <ThemedText style={[styles.highlightModalCloseText, webNoHitChild]}>閉じる</ThemedText>
                </Pressable>
              </>
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  gestureRoot: { flex: 1 },
  safeFill: { flex: 1 },
  inlineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 8,
    minHeight: 48,
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 10_000,
    ...Platform.select({
      web: {
        position: 'sticky' as const,
        top: 0,
        isolation: 'isolate' as any,
      },
      default: {},
    }),
  },
  headerBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    ...Platform.select({
      web: { cursor: 'pointer' as any },
      default: {},
    }),
  },
  headerBackBtnPressed: { opacity: 0.72 },
  headerBackLabel: { fontSize: 16, fontWeight: '600' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '600' },
  headerSpacer: { width: 64 },
  /** Web: flex 子の minHeight:auto で ScrollView が親をはみ出し下のフッターを覆うのを防ぐ */
  mainColumn: { flex: 1, minHeight: 0, width: '100%' as const },
  scroll: { flex: 1, minHeight: 0 },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'ios' ? 32 : 20,
  },
  imagePreviewOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
  },
  imagePreviewInner: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    padding: 12,
  },
  imagePreviewImage: {
    width: '100%',
    flex: 1,
    minHeight: 200,
  },
  /** ナビバー直下（Stack header のすぐ下）のヒーロー画像エリア */
  headerHero: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerHeroImage: {
    width: '100%',
    maxHeight: 280,
    borderRadius: 12,
  },
  /** F列解説（ヘッダー画像の直下・本文スクロールの上） */
  headerFExplain: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  content: { padding: 20 },
  /** ScrollView 外に置き、長文でも常に操作できるようにする */
  footerDock: {
    flexShrink: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingTop: 12,
    zIndex: 100,
    ...Platform.select({
      android: { elevation: 12 },
      web: { position: 'relative' as const },
      default: {},
    }),
  },
  footerBar: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
  },
  footerLeft: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  /** 見て聞いて覚えると連動するミニプレイヤー（フッター右下・ボタン列の横） */
  footerLearnPlayer: {
    flexShrink: 0,
    alignSelf: 'flex-end',
  },
  miniPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 4,
    gap: 0,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 2 },
      android: { elevation: 2 },
      web: { boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
    }),
  },
  miniPlayerBtn: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' as any },
      default: {},
    }),
  },
  miniPlayerBtnPressed: {
    opacity: 0.7,
  },
  miniPlayerBtnDisabled: {
    opacity: 0.45,
  },
  chachalotButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    gap: 8,
    ...Platform.select({
      web: { cursor: 'pointer' as any },
      default: {},
    }),
  },
  chachalotButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  backButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' as any },
      default: {},
    }),
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  peripheralNavButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    backgroundColor: 'transparent',
    ...Platform.select({
      web: { cursor: 'pointer' as any },
      default: {},
    }),
  },
  peripheralNavButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  highlightModal: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
  },
  highlightModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  highlightModalClose: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  highlightModalCloseText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
