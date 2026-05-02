import { ChachalotAvatar } from '@/components/chachalot-avatar';
import { MarkdownText } from '@/components/markdown-text';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLearnPlayback } from '@/src/context/LearnPlaybackContext';
import { useTheme } from '@/src/context/ThemeContext';
import { mergedDeepdiveHasResolvableImage, pickLearnDeepdiveSharedImageKey } from '@/src/deepdiveLearnAutoImage';
import {
  getDeepdiveParams,
  hydrateDeepdiveFromSessionIfEmpty,
  hydrateLearnBackMetaFromSessionIfMissing,
  clearDeepdiveSessionWeb,
  takeDeepdiveReturnHrefWeb,
  takeDeepdiveLearnBackMetaWeb,
} from '@/src/deepdiveState';
import { LEARN_DEEPDIVE } from '@/src/learn';
import { resolveImageAsset } from '@/src/resolveImageAsset';
import { CHACHALOT_SPEECH_OPTIONS } from '@/utils/chachalot-tts';
import { applyTTSRules } from '@/utils/tts-rules';
import { formatStatuteReferenceForMarkdown } from '@/utils/statute-reference-format';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import { useCallback, useEffect, useMemo, useRef, useState, startTransition } from 'react';
import { Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';

const CHACHALOT_IMG = require('@/assets/images/characters/chachalot.png');

/** Web: Pressable 内の Text/Icon がクリックのターゲットになり親の onPress が発火しないことがある */
const webNoHitChild = Platform.OS === 'web' ? { pointerEvents: 'none' as const } : {};

/**
 * normalize＋lookbehind 付き分割は数万字を超えるとメインスレッドが長時間ブロックする（学習・民法など）。
 * このサイズ以上は 1 カードとして描画し、滞在を防ぐ。
 */
const DEEPDIVE_SPLIT_CHAR_SOFT_CAP = 48_000;

/** 番号見出し行の直前（preInsert と同系）。日付「28.12」の `.` では改行しない */
const NEWLINE_BEFORE_NUM_HEAD =
  /\n(?=\s*(?:(?:[1-9][0-9]?|[１-９][０-９]?)[\.．:：\uFF1A](?![0-9０-９])\s*(?:\*\*|＊＊)?|[①②③④⑤⑥⑦⑧⑨⑩]))/g;

/** 文中の「N.」の前に改行を入れるときの N. 側（28.12.8 の「28.」は除外） */
const HALFWD_NUM_HEAD_TOKEN = /[1-9][0-9]?[\.．:：\uFF1A](?!\d)\s*(?:\*\*|＊＊|[^\s\n　])/;
const FULLWD_NUM_HEAD_TOKEN = /[１-９][０-９]?[\.．:：\uFF1A](?![０-９])\s*(?:\*\*|＊＊|[^\s\n　])/;

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
      /** タブを含む複数行は「表っぽい」ので行結合しない（1行でもタブのみなら通常処理へ） */
      const hasTab = trimmedBlock.includes('\t');
      const isTabGrid = hasTab && rowLines.length >= 2;
      if (isTabGrid) {
        return rowLines.join('\n');
      }
      let b = trimmedBlock;
      b = b.replace(NEWLINE_BEFORE_NUM_HEAD, PARA_PROTECT);
      b = b.replace(/[ \t]*\n[ \t]*/g, ' ').replace(/[ \u3000]{2,}/g, ' ');
      b = b.replace(new RegExp(PARA_PROTECT, 'g'), '\n');
      b = b
        .replace(new RegExp(`([^\\n])(${HALFWD_NUM_HEAD_TOKEN.source})`, 'g'), '$1\n$2')
        .replace(new RegExp(`([^\\n])(${FULLWD_NUM_HEAD_TOKEN.source})`, 'g'), '$1\n$2')
        .replace(/([^\n])([①②③④⑤⑥⑦⑧⑨⑩])/g, '$1\n$2');
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

const CARD_NUM_ONLY_TITLE = /^(?:[1-9][0-9]?|[１-９][０-９]?)[\\.．:：\uFF1A]\s*$/;

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
    images.push(m[1].trim().split(/\s+/)[0]);
    t = u.slice(m[0].length);
  }
  return { images, rest: t.trimStart() };
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
  }>();
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    isPlaying: learnIsPlaying,
    setIsPlaying: setLearnIsPlaying,
    togglePlay: learnTogglePlay,
    manualPrev: learnManualPrev,
    manualNext: learnManualNext,
    learnScreenMounted,
  } = useLearnPlayback();
  const [content, setContent] = useState('');
  /** スプレッドシート N 列（語群未使用シートの周辺知識） */
  const [peripheralContent, setPeripheralContent] = useState('');
  const [deepView, setDeepView] = useState<'main' | 'peripheral'>('main');
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
  /** タップで全画面拡大（require の module 番号） */
  const [previewImageSource, setPreviewImageSource] = useState<number | null>(null);
  const fromLearnRef = useRef(false);

  /** 巨大セルに対する includes が学習スニペット一致で固まるのを防ぐ（先頭〜上限文字のみ見る） */
  const cellMayContainSnippet = (d: string, snippet: string, headChars: number) => {
    if (!d || d.length < 200) return false;
    if (d.length <= headChars) return d.includes(snippet);
    return d.slice(0, headChars).includes(snippet);
  };

  useEffect(() => {
    const handle = setTimeout(() => {
      hydrateDeepdiveFromSessionIfEmpty();
      hydrateLearnBackMetaFromSessionIfMissing();
      const stored = getDeepdiveParams();
      const paramContent = params.content;
      const fromParams =
        typeof paramContent === 'string' ? paramContent : Array.isArray(paramContent) ? paramContent[0] : '';
      let raw = stored.content || fromParams || '';
      let beg = stored.beginnerContent || '';
      let periph = stored.peripheralContent || '';
      const paramLabel = params.choiceLabel;
      const fromParamLabel =
        typeof paramLabel === 'string' ? paramLabel : Array.isArray(paramLabel) ? paramLabel[0] : '';
      const finishCommon = () => {
        setChoiceLabel(stored.choiceLabel || fromParamLabel || '');
        setFromLearn(stored.fromLearn);
        setChoiceCorrect(stored.choiceCorrect ?? null);
        fromLearnRef.current = stored.fromLearn;
        setQuizSubject((stored.quizSubject || '').trim());
        setQuizField((stored.quizField || '').trim());
        setPageTitle((stored.screenTitle || '').trim());
      };
      const learnSubj = (stored.learnSubject || '').trim();
      const augmentBeginner = (b: string) => {
        let t = b;
        if (
          t.trim() &&
          !mergedDeepdiveHasResolvableImage(t) &&
          !(stored.fromLearn && t.length > 80_000)
        ) {
          const shared = pickLearnDeepdiveSharedImageKey(t, learnSubj, { fromLearn: stored.fromLearn });
          if (shared) t = `[[image:${shared}]]\n\n${t}`;
        }
        return t;
      };
      const applyToState = () => {
        if (!raw.trim()) {
          setContent('');
          setBeginnerContent(augmentBeginner(beg));
          setPeripheralContent(periph.trim());
          setDeepView('main');
          setFExplainHeader((stored.fExplain || '').trim());
          finishCommon();
          return;
        }
        const snippet = raw.trim();
        if (stored.fromLearn && snippet.length > 0 && snippet.length < 150) {
          const dd = LEARN_DEEPDIVE as Record<string, string[] | undefined>;
          let arraysToSearch: string[][] = [];
          if (learnSubj && dd[learnSubj] && Array.isArray(dd[learnSubj])) {
            arraysToSearch = [dd[learnSubj]];
          } else if (learnSubj === '多肢選択憲法' || learnSubj === '多肢選択行政法') {
            arraysToSearch = [];
          } else if (stored.fromLearn) {
            arraysToSearch = [];
          } else {
            arraysToSearch = Object.values(dd).filter(Array.isArray) as string[][];
          }
          const headChars = 80_000;
          for (const arr of arraysToSearch) {
            const found = arr.find((d) => cellMayContainSnippet(d, snippet, headChars));
            if (found) {
              raw = found;
              break;
            }
          }
        }
        if (
          raw.trim() &&
          !mergedDeepdiveHasResolvableImage(raw) &&
          !(stored.fromLearn && raw.length > 80_000)
        ) {
          const shared = pickLearnDeepdiveSharedImageKey(raw, learnSubj, { fromLearn: stored.fromLearn });
          if (shared) raw = `[[image:${shared}]]\n\n${raw}`;
        }
        setContent(raw);
        setBeginnerContent(augmentBeginner(beg));
        if (periph.trim() && !mergedDeepdiveHasResolvableImage(periph)) {
          if (!(stored.fromLearn && periph.length > 80_000)) {
            const shared = pickLearnDeepdiveSharedImageKey(periph, learnSubj, { fromLearn: stored.fromLearn });
            if (shared) periph = `[[image:${shared}]]\n\n${periph}`;
          }
        }
        setPeripheralContent(periph.trim());
        setDeepView('main');
        setFExplainHeader((stored.fExplain || '').trim());
        finishCommon();
      };
      startTransition(applyToState);
    }, 0);
    return () => clearTimeout(handle);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const stored = getDeepdiveParams();
      fromLearnRef.current = stored.fromLearn;
      setFromLearn(stored.fromLearn);
      setChoiceCorrect(stored.choiceCorrect ?? null);
      setFExplainHeader((stored.fExplain || '').trim());
      setQuizSubject((stored.quizSubject || '').trim());
      setQuizField((stored.quizField || '').trim());
      setPageTitle((stored.screenTitle || '').trim());
    }, [])
  );

  const [highlightModal, setHighlightModal] = useState<{ title: string; body: string } | null>(null);
  const [ttsSegmentIndex, setTtsSegmentIndex] = useState(0);
  const [isTtsPlaying, setIsTtsPlaying] = useState(false);
  const ttsSessionRef = useRef(0);

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [deepView]);

  useEffect(() => {
    return () => {
      // アンマウント時は状態に依らず必ず止める（学習モード由来で未再生でも予約発話の残りを潰す）
      ttsSessionRef.current += 1;
      Speech.stop();
    };
  }, []);

  const { images: headerImageKeys, rest: mainContentRest } = useMemo(
    () => stripLeadingImageTags(content),
    [content]
  );
  const { images: peripheralHeaderKeys, rest: peripheralMainRest } = useMemo(
    () => stripLeadingImageTags(peripheralContent),
    [peripheralContent]
  );
  const mainParts = useMemo(() => splitContentToImageParts(mainContentRest), [mainContentRest]);
  const peripheralParts = useMemo(
    () => splitContentToImageParts(peripheralMainRest),
    [peripheralMainRest]
  );
  const beginnerParts = useMemo(() => splitContentToImageParts(beginnerContent), [beginnerContent]);
  /** F列解説も B 列と同じくカード化（B が画像のみ等で本文が F に乗るケース対策） */
  const fExplainParts = useMemo(
    () => splitContentToImageParts((fExplainHeader || '').trim()),
    [fExplainHeader]
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
      .replace(/([^\n])(【[^】]{1,30}】)/g, '$1\n$2')
      .replace(
        /([^\n])(考え方のポイント|受験生へのアドバイス|趣旨(?=\s*[\n　\s])|根拠条文：|根拠判例：|結論：)/g,
        '$1\n$2'
      )
      .replace(new RegExp(`([^\\n])(${HALFWD_NUM_HEAD_TOKEN.source})`, 'g'), '$1\n$2')
      .replace(new RegExp(`([^\\n])(${FULLWD_NUM_HEAD_TOKEN.source})`, 'g'), '$1\n$2')
      .replace(/([^\n])([①②③④⑤⑥⑦⑧⑨⑩])/g, '$1\n$2')
      .replace(/([^\n])([■💡])/g, '$1\n$2');

  /**
   * 番号付きセクション（1. 2. 3. ／ １． ／ 1： 等）で分割してカード化。
   * スプレッドシート連携ルールどおり、先に normalizeDeepdiveFlowText で段落・番号前改行を整えてから preInsert する
   * （見て聞いて覚える・民法物権の B 列のように「。」直後に「2.」が続く1行データでもカードが分かれる）。
   */
  const splitIntoCards = (text: string): string[] => {
    const trimmed = text.trim();
    if (!trimmed) return [];
    if (trimmed.length > DEEPDIVE_SPLIT_CHAR_SOFT_CAP) {
      return [trimmed];
    }
    const withNl = trimmed.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const flow = normalizeDeepdiveFlowText(withNl);
    const prepared = preInsertNewlinesForNumberedSections(flow);
    const head = '(?:[1-9][0-9]?|[１-９][０-９]?)[\\.．:：\uFF1A]\\s*';
    let sections = prepared.split(new RegExp(`(?:\\n|^)(?=${head})`, 'm')).map((s) => s.trim()).filter(Boolean);
    if (sections.length >= 2) return sections;
    sections = prepared
      .split(new RegExp(`(?<=[\\s\\u3000。．!！?？])(?=${head})`))
      .map((s) => s.trim())
      .filter(Boolean);
    return sections.length >= 2 ? sections : [prepared.trim() || trimmed];
  };

  /** カードの1行目をタイトル、残りを本文に分離（「2.」のみの行は本文にまとめて変な改行を防ぐ） */
  const splitCardTitle = (cardText: string): { title: string; body: string } => {
    const trimmed = cardText.trim();
    const firstNewline = trimmed.indexOf('\n');
    if (firstNewline < 0) {
      return { title: trimmed, body: '' };
    }
    const title = trimmed.slice(0, firstNewline).trim();
    const body = trimmed.slice(firstNewline + 1).trim();
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
    const cards = splitIntoCards(text);
    return jichihouHideRelatedSections ? cards.filter((c) => !dropJichihouRelatedStatuteCaseCard(c)) : cards;
  };

  const isStatuteRefDeepdivePage =
    (pageTitle.trim() || (getDeepdiveParams().screenTitle || '').trim()) === '根拠条文';

  /** 民法総則など超長文のカード分割は毎再レンダーで走らせない */
  const mainCardsForRender = useMemo(() => {
    const t = mainContentRest.trim();
    if (!t) return [];
    if (isStatuteRefDeepdivePage) {
      return [formatStatuteReferenceForMarkdown(t)];
    }
    const cards = splitIntoCards(t);
    return jichihouHideRelatedSections ? cards.filter((c) => !dropJichihouRelatedStatuteCaseCard(c)) : cards;
  }, [mainContentRest, jichihouHideRelatedSections, isStatuteRefDeepdivePage]);

  const peripheralCardsForRender = useMemo(() => {
    const t = peripheralMainRest.trim();
    if (!t) return [];
    const cards = splitIntoCards(t);
    return jichihouHideRelatedSections ? cards.filter((c) => !dropJichihouRelatedStatuteCaseCard(c)) : cards;
  }, [peripheralMainRest, jichihouHideRelatedSections]);

  const beginnerCardsForRender = useMemo(() => {
    const t = beginnerContent.trim();
    if (!t) return [];
    const cards = splitIntoCards(t);
    return jichihouHideRelatedSections ? cards.filter((c) => !dropJichihouRelatedStatuteCaseCard(c)) : cards;
  }, [beginnerContent, jichihouHideRelatedSections]);

  const fExplainCardsForRender = useMemo(() => {
    const t = (fExplainHeader || '').trim();
    if (!t) return [];
    const cards = splitIntoCards(t);
    return jichihouHideRelatedSections ? cards.filter((c) => !dropJichihouRelatedStatuteCaseCard(c)) : cards;
  }, [fExplainHeader, jichihouHideRelatedSections]);

  const ttsSegments = useMemo(() => {
    if (deepView === 'peripheral' && peripheralContent.trim()) {
      const perForTts = jichihouHideRelatedSections
        ? deepdiveCardsForRender(peripheralContent).join('\n\n')
        : peripheralContent;
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
      isStatuteRefDeepdivePage && content.trim()
        ? formatStatuteReferenceForMarkdown(content.trim())
        : jichihouHideRelatedSections
          ? deepdiveCardsForRender(content).join('\n\n')
          : content;
    const mainForTts = stripDeepdiveForTts(String(mainRaw)).replace(/\*\*/g, '');
    const begForTts = jichihouHideRelatedSections ? deepdiveCardsForRender(beginnerContent).join('\n\n') : beginnerContent;
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
  }, [deepView, peripheralContent, content, beginnerContent, jichihouHideRelatedSections, isStatuteRefDeepdivePage]);

  useEffect(() => {
    setTtsSegmentIndex(0);
  }, [deepView, peripheralContent, content, beginnerContent, jichihouHideRelatedSections, isStatuteRefDeepdivePage]);

  const cardStyle = {
    backgroundColor: '#E2E8F0',
    borderColor: colors.choiceBorder,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  };

  const cardBodyTextStyle = { fontSize: 16, lineHeight: 26, color: colors.text };
  const cardTitleTextStyle = {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
    fontWeight: '700' as const,
    marginBottom: 0,
  };

  const handleHighlightPress = (title: string, body: string) => {
    setHighlightModal({ title, body });
  };

  const openImagePreview = useCallback((src: number) => {
    setPreviewImageSource(src);
  }, []);

  const stopTts = () => {
    ttsSessionRef.current += 1;
    try {
      Speech.stop();
    } catch {
      /* expo-speech / Web で例外になる場合がある */
    }
    setIsTtsPlaying(false);
  };

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
      stopTts();
    } catch {
      /* noop */
    }
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      if (router.canGoBack()) {
        clearDeepdiveSessionWeb();
        router.back();
        return;
      }

      const href = takeDeepdiveReturnHrefWeb();
      const learnBackMeta = takeDeepdiveLearnBackMetaWeb();
      const wstored = getDeepdiveParams();
      clearDeepdiveSessionWeb();

      const pathPrefer =
        (learnBackMeta?.path && learnBackMeta.path.trim()) ||
        (wstored.learnReturnPath && wstored.learnReturnPath.trim()) ||
        '';
      if (pathPrefer.startsWith('/')) {
        router.replace(pathPrefer as any);
        return;
      }
      if (href && href.startsWith('/')) {
        router.replace(href as any);
        return;
      }

      const sub = (learnBackMeta?.sub || wstored.learnSubject || '').trim();
      const idx = learnBackMeta?.idx ?? wstored.learnReturnIndex;
      if (wstored.fromLearn && sub) {
        router.replace({
          pathname: '/learn/[subject]',
          params: {
            subject: sub,
            ...(idx != null ? { index: String(idx) } : {}),
          },
        } as any);
        return;
      }

      const wqSub = (wstored.quizSubject || '').trim();
      const wqField = (wstored.quizField || '').trim();
      if (wqSub && wqField) {
        router.replace({
          pathname: '/question',
          params: { subject: wqSub, field: wqField },
        } as any);
        return;
      }

      router.replace('/learn' as any);
      return;
    }
    if (router.canGoBack()) {
      router.back();
      return;
    }
    const stored = getDeepdiveParams();
    const sub = (stored.learnSubject || '').trim();
    if (sub) {
      const idx = stored.learnReturnIndex;
      router.replace({
        pathname: '/learn/[subject]',
        params: { subject: sub, ...(idx != null ? { index: String(idx) } : {}) },
      } as any);
      return;
    }
    const qSub = (stored.quizSubject || '').trim();
    const qField = (stored.quizField || '').trim();
    if (qSub && qField) {
      router.replace({ pathname: '/question', params: { subject: qSub, field: qField } } as any);
      return;
    }
    router.replace('/learn' as any);
  }, [router]);

  const renderDeepdiveCard = (cardText: string, key: string) => {
    const trimmed = cardText.trim();
    const firstLine = trimmed.split('\n')[0] ?? '';
    /** 先頭行がタブ／パイプ表なら splitCardTitle しない（タイトルをプレーン描画すると列が潰れる） */
    const spreadsheetLikeFirstRow =
      firstLine.includes('\t') ||
      (firstLine.trimStart().startsWith('|') && firstLine.includes('|'));

    if (spreadsheetLikeFirstRow) {
      const normBody = normalizeDeepdiveFlowText(trimmed);
      return (
        <ThemedView key={key} style={cardStyle}>
          <MarkdownText
            text={normBody}
            style={cardBodyTextStyle}
            onHighlightPress={handleHighlightPress}
            uniformWeight
          />
        </ThemedView>
      );
    }

    const { title, body } = splitCardTitle(cardText);
    return (
      <ThemedView key={key} style={cardStyle}>
        {title ? (
          <ThemedText style={[cardTitleTextStyle, { marginBottom: body ? 10 : 0 }]}>{title}</ThemedText>
        ) : null}
        {body ? (
          <MarkdownText
            text={body}
            style={cardBodyTextStyle}
            onHighlightPress={handleHighlightPress}
            uniformWeight
          />
        ) : null}
      </ThemedView>
    );
  };

  const renderImageTextParts = (
    blockParts: Array<{ type: 'text' | 'image'; value: string }>,
    keyPrefix: string,
    onImagePress: (src: number) => void
  ) => {
    if (blockParts.length === 0) return null;
    return (
      <View style={{ gap: 4 }}>
        {blockParts.map((p, i) =>
          p.type === 'text' ? (
            <View key={`${keyPrefix}-t-${i}`} style={{ gap: 0 }}>
              {deepdiveCardsForRender(p.value.trim()).map((cardText, j) =>
                renderDeepdiveCard(cardText, `${keyPrefix}-${i}-${j}`)
              )}
            </View>
          ) : (
            (() => {
              const src = resolveImageAsset(p.value);
              return src ? (
                <Pressable
                  key={`${keyPrefix}-img-${i}`}
                  onPress={() => onImagePress(src)}
                  accessibilityRole="button"
                  accessibilityLabel="画像を拡大表示"
                  style={({ pressed }) => [{ marginBottom: 12, opacity: pressed ? 0.88 : 1 }]}
                >
                  <Image
                    source={src}
                    style={{ width: '100%', maxHeight: 500, borderRadius: 12 }}
                    resizeMode="contain"
                  />
                </Pressable>
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

  const hasMain = content.trim().length > 0;
  const hasBeginner = beginnerContent.trim().length > 0;
  const hasPeripheral = peripheralContent.trim().length > 0;
  const showingPeripheral = deepView === 'peripheral' && hasPeripheral;
  const heroImageKeys = showingPeripheral ? peripheralHeaderKeys : headerImageKeys;

  /** 見て聞いて覚える（学習）画面と連携するミニプレイヤー */
  const showLinkedPlayer = fromLearn && (hasMain || hasBeginner);

  const headerTitle = deepView === 'peripheral' ? '周辺知識' : pageTitle.trim() || 'もっと深掘る';

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
                return (
                  <Pressable
                    key={`deepdive-header-img-${hi}-${imgKey}`}
                    onPress={() => openImagePreview(src)}
                    accessibilityRole="button"
                    accessibilityLabel="画像を拡大表示"
                    style={({ pressed }) => [
                      hi < heroImageKeys.length - 1 ? { marginBottom: 12 } : null,
                      { opacity: pressed ? 0.88 : 1 },
                    ]}
                  >
                    <Image source={src} style={styles.headerHeroImage} resizeMode="contain" />
                  </Pressable>
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
          {!showingPeripheral && hasMain ? (
            mainParts.length > 0 ? (
              renderImageTextParts(mainParts, 'm', openImagePreview)
            ) : mainContentRest.trim() ? (
              <View style={{ gap: 0 }}>
                {mainCardsForRender.map((cardText, j) =>
                  isStatuteRefDeepdivePage ? (
                    <ThemedView key={`c-${j}`} style={cardStyle}>
                      <MarkdownText
                        text={cardText}
                        style={cardBodyTextStyle}
                        onHighlightPress={handleHighlightPress}
                        uniformWeight={false}
                      />
                    </ThemedView>
                  ) : (
                    renderDeepdiveCard(cardText, `c-${j}`)
                  )
                )}
              </View>
            ) : null
          ) : null}
          {!showingPeripheral && hasBeginner ? (
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
          {!showingPeripheral && !hasMain && !hasBeginner ? (
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
                      !learnScreenMounted && styles.miniPlayerBtnDisabled,
                    ]}
                    onPress={learnManualPrev}
                    disabled={!learnScreenMounted}
                    accessibilityLabel="前へ（学習カード）"
                  >
                    <MaterialIcons
                      name="skip-previous"
                      size={22}
                      color={!learnScreenMounted ? colors.subText : colors.text}
                      style={webNoHitChild}
                    />
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [styles.miniPlayerBtn, pressed && styles.miniPlayerBtnPressed]}
                    onPress={learnTogglePlay}
                    accessibilityLabel={learnIsPlaying ? '一時停止' : '再生'}
                  >
                    <MaterialIcons
                      name={learnIsPlaying ? 'pause' : 'play-arrow'}
                      size={26}
                      color={colors.primary}
                      style={webNoHitChild}
                    />
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [
                      styles.miniPlayerBtn,
                      pressed && styles.miniPlayerBtnPressed,
                      !learnScreenMounted && styles.miniPlayerBtnDisabled,
                    ]}
                    onPress={learnManualNext}
                    disabled={!learnScreenMounted}
                    accessibilityLabel="次へ（学習カード）"
                  >
                    <MaterialIcons
                      name="skip-next"
                      size={22}
                      color={!learnScreenMounted ? colors.subText : colors.text}
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

      <Modal visible={!!highlightModal} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setHighlightModal(null)}>
          <Pressable style={[styles.highlightModal, { backgroundColor: colors.card, borderColor: colors.choiceBorder }]} onPress={(e) => e.stopPropagation()}>
            {highlightModal ? (
              <>
                <ThemedText style={[styles.highlightModalTitle, { color: colors.primary }]}>{highlightModal.title}</ThemedText>
                <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator>
                  <MarkdownText text={highlightModal.body} style={{ fontSize: 15, lineHeight: 24, color: colors.text }} uniformWeight />
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
