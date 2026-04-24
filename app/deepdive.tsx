import { ChachalotAvatar } from '@/components/chachalot-avatar';
import { MarkdownText } from '@/components/markdown-text';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLearnPlayback } from '@/src/context/LearnPlaybackContext';
import { useTheme } from '@/src/context/ThemeContext';
import { mergedDeepdiveHasResolvableImage, pickLearnDeepdiveSharedImageKey } from '@/src/deepdiveLearnAutoImage';
import { getDeepdiveParams } from '@/src/deepdiveState';
import { LEARN_DEEPDIVE } from '@/src/learn';
import { resolveImageAsset } from '@/src/resolveImageAsset';
import { CHACHALOT_SPEECH_OPTIONS } from '@/utils/chachalot-tts';
import { applyTTSRules } from '@/utils/tts-rules';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const CHACHALOT_IMG = require('@/assets/images/characters/chachalot.png');

/** 番号見出し行の直前（preInsert と同系）。`4.**見出し` のようにドット直後が ** でも潰さない */
const NEWLINE_BEFORE_NUM_HEAD =
  /\n(?=\s*(?:(?:[1-9][0-9]?|[１-９][０-９]?)[\.．:：\uFF1A]\s*(?:\*\*|＊＊)?|[①②③④⑤⑥⑦⑧⑨⑩]))/g;

/** 文中の「N.」の前に改行を入れるときの N. 側（スペースなしで ** が続くケースを含む） */
const HALFWD_NUM_HEAD_TOKEN = /[1-9][0-9]?[\.．:：\uFF1A]\s*(?:\*\*|＊＊|[^\s\n　])/;
const FULLWD_NUM_HEAD_TOKEN = /[１-９][０-９]?[\.．:：\uFF1A]\s*(?:\*\*|＊＊|[^\s\n　])/;

/** スプレッドシート由来の途中改行を詰め、空行のみ段落区切りとする。「。」のあと改行＋番号見出しの前は必ず改行を維持 */
function normalizeDeepdiveFlowText(s: string): string {
  const t = s.replace(/\r\n/g, '\n').trim();
  if (!t) return s;
  const PARA_PROTECT = '\uE000';
  return t
    .split(/\n{2,}/)
    .map((block) => {
      let b = block.trim();
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
  const {
    isPlaying: learnIsPlaying,
    setIsPlaying: setLearnIsPlaying,
    togglePlay: learnTogglePlay,
    manualPrev: learnManualPrev,
    manualNext: learnManualNext,
    learnScreenMounted,
  } = useLearnPlayback();
  const [content, setContent] = useState('');
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
  /** タップで全画面拡大（require の module 番号） */
  const [previewImageSource, setPreviewImageSource] = useState<number | null>(null);
  const fromLearnRef = useRef(false);
  useEffect(() => {
    const stored = getDeepdiveParams();
    const paramContent = params.content;
    const fromParams = typeof paramContent === 'string' ? paramContent : Array.isArray(paramContent) ? paramContent[0] : '';
    let raw = stored.content || fromParams || '';
    let beg = stored.beginnerContent || '';
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
    };
    const learnSubj = (stored.learnSubject || '').trim();
    const augmentBeginner = (b: string) => {
      let t = b;
      if (t.trim() && !mergedDeepdiveHasResolvableImage(t)) {
        const shared = pickLearnDeepdiveSharedImageKey(t, learnSubj || undefined);
        if (shared) t = `[[image:${shared}]]\n\n${t}`;
      }
      return t;
    };
    if (!raw) {
      setContent('');
      setBeginnerContent(augmentBeginner(beg));
      setFExplainHeader((stored.fExplain || '').trim());
      finishCommon();
      return;
    }
    if (raw.length < 150) {
      for (const arr of Object.values(LEARN_DEEPDIVE as Record<string, string[]>)) {
        if (!Array.isArray(arr)) continue;
        const found = arr.find((d) => d && d.length > 200 && d.includes(raw));
        if (found) {
          raw = found;
          break;
        }
      }
    }
    if (raw.trim() && !mergedDeepdiveHasResolvableImage(raw)) {
      const shared = pickLearnDeepdiveSharedImageKey(raw, learnSubj || undefined);
      if (shared) raw = `[[image:${shared}]]\n\n${raw}`;
    }
    setContent(raw);
    setBeginnerContent(augmentBeginner(beg));
    setFExplainHeader((stored.fExplain || '').trim());
    finishCommon();
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
    }, [])
  );

  const [highlightModal, setHighlightModal] = useState<{ title: string; body: string } | null>(null);
  const [ttsSegmentIndex, setTtsSegmentIndex] = useState(0);
  const [isTtsPlaying, setIsTtsPlaying] = useState(false);
  const ttsSessionRef = useRef(0);

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
  const mainParts = useMemo(() => splitContentToImageParts(mainContentRest), [mainContentRest]);
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

  const ttsSegments = useMemo(() => {
    const mainForTts = jichihouHideRelatedSections ? deepdiveCardsForRender(content).join('\n\n') : content;
    const begForTts = jichihouHideRelatedSections ? deepdiveCardsForRender(beginnerContent).join('\n\n') : beginnerContent;
    const pieces = [stripDeepdiveForTts(mainForTts), stripDeepdiveForTts(begForTts)].filter(Boolean);
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
  }, [content, beginnerContent, jichihouHideRelatedSections, fromLearn, quizSubject, quizField]);

  useEffect(() => {
    setTtsSegmentIndex(0);
  }, [content, beginnerContent, jichihouHideRelatedSections]);

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
    Speech.stop();
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

  const handleBack = () => {
    stopTts();
    router.back();
  };

  const renderDeepdiveCard = (cardText: string, key: string) => {
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

  /** 見て聞いて覚える（学習）画面と連携するミニプレイヤー */
  const showLinkedPlayer = fromLearn && (hasMain || hasBeginner);

  return (
    <>
      <Stack.Screen options={{ title: 'もっと深掘る', headerBackTitle: '戻る' }} />
      <View style={{ flex: 1, backgroundColor: colors.card }}>
        <ScrollView
          style={[styles.scroll, { backgroundColor: colors.card }]}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator
        >
          {headerImageKeys.length > 0 ? (
            <View
              style={[
                styles.headerHero,
                { backgroundColor: colors.background, borderBottomColor: colors.choiceBorder },
              ]}
            >
              {headerImageKeys.map((imgKey, hi) => {
                const src = resolveImageAsset(imgKey);
                if (!src) return null;
                return (
                  <Pressable
                    key={`deepdive-header-img-${hi}-${imgKey}`}
                    onPress={() => openImagePreview(src)}
                    accessibilityRole="button"
                    accessibilityLabel="画像を拡大表示"
                    style={({ pressed }) => [
                      hi < headerImageKeys.length - 1 ? { marginBottom: 12 } : null,
                      { opacity: pressed ? 0.88 : 1 },
                    ]}
                  >
                    <Image source={src} style={styles.headerHeroImage} resizeMode="contain" />
                  </Pressable>
                );
              })}
            </View>
          ) : null}
          {fExplainHeader.trim() ? (
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
                  {deepdiveCardsForRender(fExplainHeader).map((cardText, j) =>
                    renderDeepdiveCard(cardText, `f-${j}`)
                  )}
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
          {choiceLabel && hasMain ? (
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
          {hasMain ? (
            mainParts.length > 0 ? (
              renderImageTextParts(mainParts, 'm', openImagePreview)
            ) : mainContentRest.trim() ? (
              <View style={{ gap: 0 }}>
                {deepdiveCardsForRender(mainContentRest).map((cardText, j) => renderDeepdiveCard(cardText, `c-${j}`))}
              </View>
            ) : null
          ) : null}
          {hasBeginner ? (
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
                  {deepdiveCardsForRender(beginnerContent).map((cardText, j) => renderDeepdiveCard(cardText, `bc-${j}`))}
                </View>
              )}
            </View>
          ) : null}
          {!hasMain && !hasBeginner ? (
            <ThemedText style={{ color: colors.subText }}>表示する内容がありません。</ThemedText>
          ) : null}
          <View style={[styles.footerBar, { marginTop: 24 }]}>
            <View style={styles.footerLeft}>
              {hasMain || hasBeginner ? (
                <Pressable
                  style={[styles.chachalotButton, { borderColor: colors.primary }]}
                  onPress={handleChachalotToggle}
                >
                  <ChachalotAvatar source={CHACHALOT_IMG} size={36} active={isTtsPlaying} />
                  <ThemedText style={[styles.chachalotButtonText, { color: colors.primary }]}>
                    {isTtsPlaying ? '停止' : 'おしえてちゃちゃロット'}
                  </ThemedText>
                </Pressable>
              ) : null}
              <Pressable style={[styles.backButton, { backgroundColor: colors.accent }]} onPress={handleBack}>
                <ThemedText style={styles.backButtonText}>解説ページに戻る</ThemedText>
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
                    />
                  </Pressable>
                </View>
              </View>
            ) : null}
          </View>
        </ThemedView>
        </ScrollView>
      </View>

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
                  <ThemedText style={styles.highlightModalCloseText}>閉じる</ThemedText>
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
  scroll: { flex: 1 },
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
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
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
