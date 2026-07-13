import { ChachalotAvatar } from '@/components/chachalot-avatar';
import { MarkdownText } from '@/components/markdown-text';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import type { Href } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type ViewStyle,
} from 'react-native';

import type {
  CharacterKey,
  TextbookBlock,
  TextbookChapter,
  TextbookQuiz,
} from '@/src/content/shouhouTextbookContent';
import { IMAGE_RESOURCES_MAP } from '@/src/imageMap';
import { useLearnPlayback } from '@/src/context/LearnPlaybackContext';
import {
  startChainedChachalotSpeech,
  stopAllSpeech,
  warmSpeechVoices,
  type ChainedSpeechHandle,
} from '@/utils/chained-chachalot-speech';
import { buildTextbookTtsSegments, findFirstSegmentIndexForChapter } from '@/utils/textbook-tts';

/** 背景・大ブロック＝グレー、内ブロックのみ水色、e-Gov風ペインは白 */
const C = {
  bg: '#E4E4E7',
  pane: '#FFFFFF',
  paneBorder: '#D1D5DB',
  panel: '#F0F0F2',
  panelBorder: '#D4D4D8',
  inner: '#EAF6FB',
  innerAlt: '#DDEDF5',
  innerBorder: '#C8DCE8',
  text: '#1F2937',
  textMuted: '#6B7280',
  accent: '#2563EB',
  link: '#2563EB',
  correct: '#4D7C5C',
  wrong: '#9B4D4D',
  scrollbar: '#9CA3AF',
};

const SIDEBAR_WIDTH = 280;
const PAGE_BAR_HEIGHT = 40;
const SCROLL_TOP_OFFSET = PAGE_BAR_HEIGHT + 8;

const CHARACTER_NAMES: Record<CharacterKey, string> = {
  chachalot: 'ちゃちゃろっと',
  pitchi: 'ピッチ',
  task_turtle: 'タスク亀',
  king_kachadokuro: 'キングカチャドクロ',
};

const scrollIndicatorStyle =
  Platform.OS === 'web'
    ? ({
        scrollbarWidth: 'thin',
        scrollbarColor: `${C.scrollbar} transparent`,
      } as ViewStyle)
    : undefined;

function resolveWebElement(ref: View | null): HTMLElement | null {
  if (!ref) return null;
  const el = ref as unknown as HTMLElement;
  return typeof el.getBoundingClientRect === 'function' ? el : null;
}

/** 章先頭がコンテンツ先頭から何 px か（クリック時に毎回計測） */
function measureChapterOffset(target: View, content: View, onMeasured: (y: number) => void) {
  if (Platform.OS === 'web') {
    const targetEl = resolveWebElement(target);
    const contentEl = resolveWebElement(content);
    if (targetEl && contentEl) {
      const y = targetEl.getBoundingClientRect().top - contentEl.getBoundingClientRect().top;
      onMeasured(y);
      return;
    }
  }

  target.measureLayout(
    content,
    (_x, y) => onMeasured(y),
    () => onMeasured(0)
  );
}

/** スクロール位置に最も近い章 id（Web 向け・目次未クリック時の「ここから再生」） */
function detectChapterIdFromScroll(
  scrollY: number,
  chapters: TextbookChapter[],
  chapterRefs: Record<string, View | null>,
  content: View | null,
): string | null {
  if (!content || chapters.length === 0) return null;
  const anchor = scrollY + SCROLL_TOP_OFFSET;

  if (Platform.OS === 'web') {
    const contentEl = resolveWebElement(content);
    if (!contentEl) return chapters[0]?.id ?? null;
    let found = chapters[0].id;
    for (const ch of chapters) {
      const el = resolveWebElement(chapterRefs[ch.id]);
      if (!el) continue;
      const y = el.getBoundingClientRect().top - contentEl.getBoundingClientRect().top;
      if (y <= anchor + 12) found = ch.id;
    }
    return found;
  }

  return null;
}

type Props = {
  title: string;
  subtitle?: string;
  chapters: TextbookChapter[];
  footerNote?: string;
  backHref?: string;
};

function CharacterBubble({
  character,
  text,
  speaking = false,
}: {
  character: CharacterKey;
  text: string;
  speaking?: boolean;
}) {
  const source = IMAGE_RESOURCES_MAP[character];
  return (
    <View style={styles.characterRow}>
      <ChachalotAvatar source={source} size={56} active={speaking} style={styles.characterImg} />
      <View style={styles.bubbleWrap}>
        <View style={styles.bubbleTailOutline} />
        <View style={styles.bubbleTail} />
        <View style={styles.bubble}>
          <Text style={styles.characterName}>{CHARACTER_NAMES[character]}</Text>
          <MarkdownText text={text} style={styles.bubbleText} uniformWeight lineGap={4} />
        </View>
      </View>
    </View>
  );
}

function BlockTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableScroll}>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeaderRow]}>
          {headers.map((h, i) => (
            <View key={i} style={[styles.tableCell, styles.tableHeaderCell]}>
              <MarkdownText text={h} style={styles.tableHeaderText} uniformWeight lineGap={2} />
            </View>
          ))}
        </View>
        {rows.map((row, ri) => (
          <View key={ri} style={[styles.tableRow, ri % 2 === 1 && styles.tableRowAlt]}>
            {row.map((cell, ci) => (
              <View key={ci} style={styles.tableCell}>
                <MarkdownText text={cell} style={styles.tableCellText} uniformWeight lineGap={2} />
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function InnerBlock({ children }: { children: ReactNode }) {
  return <View style={styles.innerBlock}>{children}</View>;
}

function BlockRenderer({ block }: { block: TextbookBlock }) {
  switch (block.type) {
    case 'p':
      return (
        <InnerBlock>
          <MarkdownText text={block.text} style={styles.paragraph} uniformWeight />
        </InnerBlock>
      );
    case 'bullets':
      return (
        <InnerBlock>
          {block.items.map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bulletDot}>·</Text>
              <MarkdownText text={item} style={styles.bulletText} uniformWeight lineGap={4} />
            </View>
          ))}
        </InnerBlock>
      );
    case 'table':
      return (
        <InnerBlock>
          <BlockTable headers={block.headers} rows={block.rows} />
        </InnerBlock>
      );
    case 'tip':
      return (
        <View style={[styles.innerBlock, styles.tipBox]}>
          {block.title ? (
            <Text style={styles.tipTitle}>{block.title}</Text>
          ) : null}
          <MarkdownText text={block.text} style={styles.tipText} uniformWeight lineGap={4} />
        </View>
      );
    case 'figureSlot':
      return (
        <View style={styles.figureSlot} accessibilityLabel={`図解空き枠 ${block.title}`}>
          <View style={styles.figureSlotBadge}>
            <MaterialIcons name="image" size={16} color={C.accent} />
            <Text style={styles.figureSlotBadgeText}>図解空き枠（Codex待ち）</Text>
          </View>
          <Text style={styles.figureSlotTitle}>{block.title}</Text>
          <Text style={styles.figureSlotCaption}>{block.caption}</Text>
          <Text style={styles.figureSlotWhy}>ねらい: {block.why}</Text>
          <Text style={styles.figureSlotId}>slot: {block.id}</Text>
        </View>
      );
    default:
      return null;
  }
}

function QuizCard({ quiz }: { quiz: TextbookQuiz }) {
  const [revealed, setRevealed] = useState(false);
  const [picked, setPicked] = useState<boolean | null>(null);

  const handlePick = useCallback(
    (answer: boolean) => {
      setPicked(answer);
      setRevealed(true);
    },
    []
  );

  const isCorrect = picked === quiz.correct;

  return (
    <View style={styles.quizCard}>
      <View style={styles.quizLabelRow}>
        <MaterialIcons name="quiz" size={16} color={C.accent} />
        <Text style={styles.quizLabel}>{quiz.label}</Text>
      </View>
      <MarkdownText text={quiz.statement} style={styles.quizStatement} uniformWeight />
      <View style={styles.quizButtons}>
        <Pressable
          style={[styles.quizBtn, picked === true && styles.quizBtnPicked]}
          onPress={() => handlePick(true)}
        >
          <Text style={styles.quizBtnText}>○ 正しい</Text>
        </Pressable>
        <Pressable
          style={[styles.quizBtn, picked === false && styles.quizBtnPicked]}
          onPress={() => handlePick(false)}
        >
          <Text style={styles.quizBtnText}>× 誤り</Text>
        </Pressable>
      </View>
      {revealed && picked !== null ? (
        <View style={[styles.quizResult, isCorrect ? styles.quizResultOk : styles.quizResultNg]}>
          <Text style={styles.quizResultTitle}>
            {isCorrect ? '正解！' : '不正解'}
            {'  '}
            答えは {quiz.correct ? '○' : '×'}
          </Text>
          <MarkdownText text={quiz.explain} style={styles.quizExplain} uniformWeight lineGap={4} />
        </View>
      ) : null}
    </View>
  );
}

export function TextbookReader({
  title,
  subtitle,
  chapters,
  footerNote = '学習用の自作整理。条文は六法で確認。',
  backHref = '/textbook',
}: Props) {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const { setIsPlaying: setLearnPlaying, voiceSpeechOptions } = useLearnPlayback();

  const scrollRef = useRef<ScrollView>(null);
  const contentRef = useRef<View>(null);
  const chapterRefs = useRef<Record<string, View | null>>({});
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [contentHeight, setContentHeight] = useState(1);
  const [viewportHeight, setViewportHeight] = useState(1);

  const [speakingChapterId, setSpeakingChapterId] = useState<string | null>(null);
  const [isTtsPlaying, setIsTtsPlaying] = useState(false);
  const [textbookTtsActive, setTextbookTtsActive] = useState(false);
  const ttsSessionRef = useRef(0);
  const speechHandleRef = useRef<ChainedSpeechHandle | null>(null);
  const prevSpeechChapterRef = useRef<string | null>(null);
  const ttsStartIndexRef = useRef(0);
  const currentSegmentIndexRef = useRef(0);
  const resumeSegmentIndexRef = useRef(0);
  const startFromChapterIdRef = useRef<string | null>(null);
  const userNavigatedChapterRef = useRef(false);
  const scrollSpyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTtsPlayingRef = useRef(false);
  const textbookTtsActiveRef = useRef(false);
  const ttsBusy = textbookTtsActive || isTtsPlaying;

  useEffect(() => {
    isTtsPlayingRef.current = isTtsPlaying;
  }, [isTtsPlaying]);

  useEffect(() => {
    textbookTtsActiveRef.current = textbookTtsActive;
  }, [textbookTtsActive]);

  const ttsSegments = useMemo(
    () => buildTextbookTtsSegments(title, subtitle, chapters),
    [title, subtitle, chapters],
  );

  const stopTts = useCallback(() => {
    if (isTtsPlayingRef.current || textbookTtsActiveRef.current) {
      resumeSegmentIndexRef.current = currentSegmentIndexRef.current;
    }
    setTextbookTtsActive(false);
    ttsSessionRef.current += 1;
    speechHandleRef.current?.stop();
    speechHandleRef.current = null;
    prevSpeechChapterRef.current = null;
    setIsTtsPlaying(false);
    setSpeakingChapterId(null);
  }, []);

  const stopTtsRef = useRef(stopTts);
  stopTtsRef.current = stopTts;

  useEffect(() => () => stopTtsRef.current(), []);

  const voiceSpeechOptionsRef = useRef(voiceSpeechOptions);
  voiceSpeechOptionsRef.current = voiceSpeechOptions;

  useEffect(() => {
    void warmSpeechVoices();
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.speechSynthesis.getVoices();
      const primeVoices = () => window.speechSynthesis.getVoices();
      window.speechSynthesis.addEventListener('voiceschanged', primeVoices);
      return () => window.speechSynthesis.removeEventListener('voiceschanged', primeVoices);
    }
  }, []);

  const setPlaybackAnchorChapter = useCallback((chapterId: string) => {
    startFromChapterIdRef.current = chapterId;
    userNavigatedChapterRef.current = true;
    setActiveChapter(chapterId);
  }, []);

  const scrollToChapterVisual = useCallback((id: string) => {
    setActiveChapter(id);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const scrollView = scrollRef.current;
        const target = chapterRefs.current[id];
        const content = contentRef.current;
        if (!scrollView || !target || !content) return;

        measureChapterOffset(target, content, (y) => {
          scrollView.scrollTo({
            y: Math.max(0, y - SCROLL_TOP_OFFSET),
            animated: true,
          });
        });
      });
    });
  }, []);

  const scrollToChapter = useCallback(
    (id: string) => {
      setPlaybackAnchorChapter(id);
      scrollToChapterVisual(id);
    },
    [setPlaybackAnchorChapter, scrollToChapterVisual],
  );

  const resolveTtsStartIndex = useCallback((): number => {
    if (userNavigatedChapterRef.current && startFromChapterIdRef.current) {
      userNavigatedChapterRef.current = false;
      const idx = findFirstSegmentIndexForChapter(ttsSegments, startFromChapterIdRef.current);
      startFromChapterIdRef.current = null;
      resumeSegmentIndexRef.current = idx;
      return idx;
    }
    if (resumeSegmentIndexRef.current > 0) {
      return resumeSegmentIndexRef.current;
    }
    return 0;
  }, [ttsSegments]);

  // 見て聞いて覚えると同じ: 再生フラグ → useEffect → stop 後 200ms 待って speak
  useEffect(() => {
    if (!textbookTtsActive) return;
    if (ttsSegments.length === 0) {
      setTextbookTtsActive(false);
      return;
    }

    const sessionId = ++ttsSessionRef.current;
    let cancelled = false;

    const run = async () => {
      stopAllSpeech();
      await new Promise((resolve) => setTimeout(resolve, 200));
      if (cancelled || sessionId !== ttsSessionRef.current) return;

      prevSpeechChapterRef.current = null;
      const startIndex = ttsStartIndexRef.current;
      speechHandleRef.current = startChainedChachalotSpeech(
        ttsSegments.map((seg) => seg.text),
        {
          onLineStart: (index) => {
            currentSegmentIndexRef.current = index;
            const seg = ttsSegments[index];
            if (!seg) return;
            setIsTtsPlaying(true);
            setSpeakingChapterId(seg.chapterId);
            if (seg.chapterId !== prevSpeechChapterRef.current) {
              prevSpeechChapterRef.current = seg.chapterId;
              scrollToChapterVisual(seg.chapterId);
            }
          },
          onPlayingChange: (playing) => {
            setIsTtsPlaying(playing);
            if (!playing) {
              setSpeakingChapterId(null);
              speechHandleRef.current = null;
              setTextbookTtsActive(false);
            }
          },
          onAllDone: () => {
            speechHandleRef.current = null;
            prevSpeechChapterRef.current = null;
            resumeSegmentIndexRef.current = 0;
            currentSegmentIndexRef.current = 0;
          },
        },
        { ...voiceSpeechOptionsRef.current, rate: 1.0 },
        startIndex,
      );
    };

    void run();

    return () => {
      cancelled = true;
      ttsSessionRef.current += 1;
      speechHandleRef.current?.stop();
      speechHandleRef.current = null;
    };
  }, [textbookTtsActive, ttsSegments, scrollToChapterVisual]);

  const totalPages = Math.max(1, Math.ceil(contentHeight / Math.max(viewportHeight, 1)));
  const currentPage = Math.min(
    totalPages,
    Math.max(1, Math.floor(scrollY / Math.max(viewportHeight, 1)) + 1)
  );

  const handleTtsToggle = useCallback(() => {
    if (textbookTtsActive || isTtsPlaying) {
      stopTts();
      return;
    }
    if (ttsSegments.length === 0) return;

    if (!userNavigatedChapterRef.current && resumeSegmentIndexRef.current === 0) {
      const fromScroll = detectChapterIdFromScroll(
        scrollY,
        chapters,
        chapterRefs.current,
        contentRef.current,
      );
      if (fromScroll) {
        ttsStartIndexRef.current = findFirstSegmentIndexForChapter(ttsSegments, fromScroll);
        resumeSegmentIndexRef.current = ttsStartIndexRef.current;
      } else {
        ttsStartIndexRef.current = resolveTtsStartIndex();
      }
    } else {
      ttsStartIndexRef.current = resolveTtsStartIndex();
    }

    setLearnPlaying(false);
    setTextbookTtsActive(true);
  }, [
    textbookTtsActive,
    isTtsPlaying,
    stopTts,
    ttsSegments.length,
    setLearnPlaying,
    scrollY,
    chapters,
    resolveTtsStartIndex,
  ]);

  const handleMainScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y;
      setScrollY(y);
      if (ttsBusy) return;

      if (scrollSpyTimerRef.current) clearTimeout(scrollSpyTimerRef.current);
      scrollSpyTimerRef.current = setTimeout(() => {
        const chapterId = detectChapterIdFromScroll(
          y,
          chapters,
          chapterRefs.current,
          contentRef.current,
        );
        if (chapterId) {
          setActiveChapter(chapterId);
        }
      }, 150);
    },
    [ttsBusy, chapters],
  );

  const tocItems = (
    <>
      <Text style={styles.sidebarHeading}>目次</Text>
      {chapters.map((ch) => (
        <Pressable
          key={ch.id}
          style={[
            styles.tocItem,
            (speakingChapterId === ch.id || activeChapter === ch.id) && styles.tocItemActive,
          ]}
          onPress={() => {
            if (ttsBusy) stopTts();
            scrollToChapter(ch.id);
          }}
        >
          <MaterialIcons
            name="chevron-right"
            size={16}
            color={activeChapter === ch.id ? C.accent : C.textMuted}
            style={styles.tocChevron}
          />
          <View style={styles.tocItemBody}>
            <Text
              style={[styles.tocItemText, activeChapter === ch.id && styles.tocItemTextActive]}
              numberOfLines={2}
            >
              {ch.subtitle ?? ch.title}
            </Text>
            {ch.subtitle ? (
              <Text style={styles.tocItemMeta}>{ch.title}</Text>
            ) : null}
          </View>
        </Pressable>
      ))}
    </>
  );

  const mainContent = (
    <>
      <View style={styles.pageBar}>
        <View style={styles.pageBarLeft}>
          {Platform.OS === 'web' ? (
            <button
              type="button"
              aria-label={ttsBusy ? '読み上げを停止' : '教科書を読み上げ'}
              data-testid="textbook-tts-toggle"
              onClick={() => handleTtsToggle()}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                padding: '4px 6px',
                borderRadius: 8,
                backgroundColor: '#EFF6FF',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <ChachalotAvatar
                source={IMAGE_RESOURCES_MAP.chachalot}
                size={30}
                active={ttsBusy}
              />
              <MaterialIcons
                name={ttsBusy ? 'stop-circle' : 'play-circle-outline'}
                size={22}
                color={C.accent}
              />
            </button>
          ) : (
            <Pressable
              onPress={handleTtsToggle}
              style={styles.ttsBtn}
              accessibilityLabel={ttsBusy ? '読み上げを停止' : '教科書を読み上げ'}
              testID="textbook-tts-toggle"
            >
              <ChachalotAvatar
                source={IMAGE_RESOURCES_MAP.chachalot}
                size={30}
                active={ttsBusy}
              />
              <MaterialIcons
                name={ttsBusy ? 'stop-circle' : 'play-circle-outline'}
                size={22}
                color={C.accent}
              />
            </Pressable>
          )}
          <Text style={styles.pageBarText}>
            {currentPage} / {totalPages} ページ
          </Text>
        </View>
        <Text style={styles.pageBarTitle} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <ScrollView
        ref={scrollRef}
        style={[styles.mainScroll, scrollIndicatorStyle]}
        contentContainerStyle={styles.mainScrollContent}
        showsVerticalScrollIndicator
        scrollEventThrottle={16}
        onScroll={handleMainScroll}
        onLayout={(e) => setViewportHeight(e.nativeEvent.layout.height)}
        onContentSizeChange={(_w, h) => setContentHeight(h)}
        testID="textbook-main-scroll"
      >
        <View ref={contentRef} style={styles.scrollContent} collapsable={false}>
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>{title}</Text>
            {subtitle ? <Text style={styles.heroSubtitle}>{subtitle}</Text> : null}
            <Link href={backHref as Href} asChild>
              <Pressable style={styles.backLink}>
                <MaterialIcons name="arrow-back" size={18} color={C.link} />
                <Text style={styles.backLinkText}>教科書一覧へ</Text>
              </Pressable>
            </Link>
          </View>

          {chapters.map((chapter) => (
            <View
              key={chapter.id}
              ref={(node) => {
                chapterRefs.current[chapter.id] = node;
              }}
              style={[
                styles.chapterCard,
                speakingChapterId === chapter.id && styles.chapterCardSpeaking,
                Platform.OS === 'web' ? styles.chapterAnchorWeb : null,
              ]}
              collapsable={false}
            >
              <View style={styles.chapterHeader}>
                <Text style={styles.chapterTitle}>{chapter.title}</Text>
                {chapter.subtitle ? (
                  <Text style={styles.chapterSubtitle}>{chapter.subtitle}</Text>
                ) : null}
              </View>

              {chapter.intro ? (
                <CharacterBubble
                  character={chapter.character}
                  text={chapter.intro}
                  speaking={isTtsPlaying && speakingChapterId === chapter.id}
                />
              ) : (
                <View style={styles.characterRow}>
                  <ChachalotAvatar
                    source={IMAGE_RESOURCES_MAP[chapter.character]}
                    size={56}
                    active={isTtsPlaying && speakingChapterId === chapter.id}
                    style={styles.characterImg}
                  />
                  <Text style={styles.characterNameOnly}>{CHARACTER_NAMES[chapter.character]}</Text>
                </View>
              )}

              {chapter.blocks.map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}

              {chapter.quizzes?.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </View>
          ))}

          <View style={styles.footer}>
            <Text style={styles.footerText}>{footerNote}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          title,
          headerStyle: { backgroundColor: C.bg },
          headerTintColor: C.text,
          headerShadowVisible: false,
        }}
      />
      {isWide ? (
        <View style={styles.splitRow}>
          <View style={styles.sidebar}>
            <ScrollView
              style={[styles.sidebarScroll, scrollIndicatorStyle]}
              contentContainerStyle={styles.sidebarScrollContent}
              showsVerticalScrollIndicator
            >
              {tocItems}
            </ScrollView>
          </View>
          <View style={styles.mainPane}>{mainContent}</View>
        </View>
      ) : (
        <View style={styles.mobileLayout}>
          <View style={styles.mobileSidebar}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.mobileTocRow}
            >
              {chapters.map((ch) => (
                <Pressable
                  key={ch.id}
                  style={[
                    styles.mobileTocChip,
                    (speakingChapterId === ch.id || activeChapter === ch.id) &&
                      styles.mobileTocChipActive,
                  ]}
                  onPress={() => {
                    if (ttsBusy) stopTts();
                    scrollToChapter(ch.id);
                  }}
                >
                  <Text
                    style={[
                      styles.mobileTocChipText,
                      activeChapter === ch.id && styles.mobileTocChipTextActive,
                    ]}
                    numberOfLines={1}
                  >
                    {ch.subtitle ?? ch.title}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          <View style={styles.mainPane}>{mainContent}</View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: C.bg,
  },
  splitRow: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: C.paneBorder,
  },
  mobileLayout: {
    flex: 1,
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    maxWidth: '32%',
    backgroundColor: C.pane,
    borderRightWidth: 1,
    borderRightColor: C.paneBorder,
  },
  sidebarScroll: {
    flex: 1,
    backgroundColor: C.pane,
  },
  sidebarScrollContent: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  sidebarHeading: {
    fontSize: 13,
    fontWeight: '600',
    color: C.textMuted,
    paddingHorizontal: 8,
    paddingBottom: 10,
    letterSpacing: 0.5,
  },
  mobileSidebar: {
    backgroundColor: C.pane,
    borderBottomWidth: 1,
    borderBottomColor: C.paneBorder,
    maxHeight: 52,
  },
  mobileTocRow: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mobileTocChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: C.panel,
    borderWidth: 1,
    borderColor: C.panelBorder,
    maxWidth: 160,
  },
  mobileTocChipActive: {
    backgroundColor: C.inner,
    borderColor: C.accent,
  },
  mobileTocChipText: {
    fontSize: 12,
    color: C.text,
  },
  mobileTocChipTextActive: {
    color: C.accent,
    fontWeight: '600',
  },
  mainPane: {
    flex: 1,
    backgroundColor: C.pane,
    minWidth: 0,
  },
  pageBar: {
    height: PAGE_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.paneBorder,
    backgroundColor: C.pane,
  },
  pageBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 0,
  },
  ttsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
  },
  pageBarText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.textMuted,
    fontVariant: ['tabular-nums'],
  },
  pageBarTitle: {
    flex: 1,
    fontSize: 13,
    color: C.text,
    textAlign: 'right',
    marginLeft: 12,
  },
  mainScroll: {
    flex: 1,
    backgroundColor: C.pane,
  },
  mainScrollContent: {
    flexGrow: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 48,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  hero: {
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: C.text,
    letterSpacing: 0.3,
  },
  heroSubtitle: {
    fontSize: 15,
    color: C.textMuted,
    marginTop: 6,
    lineHeight: 22,
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 4,
  },
  backLinkText: {
    fontSize: 14,
    color: C.link,
  },
  tocItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginBottom: 2,
  },
  tocItemActive: {
    backgroundColor: '#EFF6FF',
  },
  tocChevron: {
    marginTop: 2,
    marginRight: 4,
  },
  tocItemBody: {
    flex: 1,
  },
  tocItemText: {
    fontSize: 14,
    color: C.link,
    lineHeight: 20,
  },
  tocItemTextActive: {
    fontWeight: '600',
    color: C.accent,
  },
  tocItemMeta: {
    fontSize: 11,
    color: C.textMuted,
    marginTop: 2,
  },
  chapterCard: {
    backgroundColor: C.panel,
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: C.panelBorder,
  },
  chapterCardSpeaking: {
    borderColor: C.accent,
    borderWidth: 2,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.15)' } as ViewStyle)
      : {}),
  },
  chapterAnchorWeb: {
    scrollMarginTop: SCROLL_TOP_OFFSET,
  } as ViewStyle,
  chapterHeader: {
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.panelBorder,
  },
  chapterTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: C.accent,
    letterSpacing: 0.5,
  },
  chapterSubtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: C.text,
    marginTop: 4,
    lineHeight: 28,
  },
  characterRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 6,
  },
  characterImg: {
    marginTop: 4,
  },
  characterNameOnly: {
    fontSize: 13,
    color: C.textMuted,
    alignSelf: 'center',
  },
  bubbleWrap: {
    flex: 1,
    position: 'relative',
    minHeight: 48,
  },
  bubbleTailOutline: {
    position: 'absolute',
    left: 0,
    top: 18,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 9,
    borderBottomWidth: 9,
    borderRightWidth: 12,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: C.innerBorder,
    zIndex: 1,
  },
  bubbleTail: {
    position: 'absolute',
    left: 2,
    top: 19,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: C.inner,
    zIndex: 2,
  },
  bubble: {
    flex: 1,
    backgroundColor: C.inner,
    borderRadius: 16,
    borderTopLeftRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: C.innerBorder,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0 2px 6px rgba(90, 143, 168, 0.14)' } as ViewStyle)
      : { elevation: 2 }),
  },
  characterName: {
    fontSize: 12,
    fontWeight: '600',
    color: C.textMuted,
    marginBottom: 6,
  },
  bubbleText: {
    fontSize: 15,
    color: C.text,
    lineHeight: 24,
  },
  innerBlock: {
    backgroundColor: C.inner,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: C.innerBorder,
  },
  block: {
    marginBottom: 14,
  },
  paragraph: {
    fontSize: 15,
    color: C.text,
    lineHeight: 26,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingRight: 4,
  },
  bulletDot: {
    fontSize: 20,
    color: C.accent,
    lineHeight: 26,
    width: 16,
    marginTop: -2,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    color: C.text,
    lineHeight: 26,
  },
  tipBox: {
    borderLeftWidth: 3,
    borderLeftColor: C.accent,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: C.accent,
    marginBottom: 6,
  },
  tipText: {
    fontSize: 14,
    color: C.text,
    lineHeight: 24,
  },
  figureSlot: {
    marginTop: 8,
    marginBottom: 4,
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#93C5FD',
    backgroundColor: '#F8FBFF',
    gap: 6,
  },
  figureSlotBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  figureSlotBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: C.accent,
  },
  figureSlotTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: C.text,
  },
  figureSlotCaption: {
    fontSize: 13,
    color: C.textMuted,
    lineHeight: 20,
  },
  figureSlotWhy: {
    fontSize: 13,
    color: C.text,
    lineHeight: 20,
  },
  figureSlotId: {
    marginTop: 4,
    fontSize: 11,
    color: '#9CA3AF',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  tableScroll: {
    marginHorizontal: -4,
  },
  table: {
    borderWidth: 1,
    borderColor: C.innerBorder,
    borderRadius: 8,
    overflow: 'hidden',
    minWidth: '100%',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableRowAlt: {
    backgroundColor: C.innerAlt,
  },
  tableHeaderRow: {
    backgroundColor: '#D4EAF2',
  },
  tableCell: {
    flex: 1,
    minWidth: 100,
    padding: 10,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: C.innerBorder,
  },
  tableHeaderCell: {
    minWidth: 90,
  },
  tableHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.text,
  },
  tableCellText: {
    fontSize: 13,
    color: C.text,
    lineHeight: 20,
  },
  quizCard: {
    backgroundColor: C.inner,
    borderRadius: 10,
    padding: 14,
    marginTop: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: C.innerBorder,
  },
  quizLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  quizLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: C.accent,
    letterSpacing: 0.5,
  },
  quizStatement: {
    fontSize: 15,
    color: C.text,
    lineHeight: 24,
    marginBottom: 12,
  },
  quizButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  quizBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FAFEFF',
    borderWidth: 1,
    borderColor: C.innerBorder,
    alignItems: 'center',
  },
  quizBtnPicked: {
    borderColor: C.accent,
    backgroundColor: C.innerAlt,
  },
  quizBtnText: {
    fontSize: 14,
    color: C.text,
    fontWeight: '500',
  },
  quizResult: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
  },
  quizResultOk: {
    backgroundColor: '#E8F0EA',
    borderWidth: 1,
    borderColor: '#C5D9CA',
  },
  quizResultNg: {
    backgroundColor: '#F0E8E8',
    borderWidth: 1,
    borderColor: '#D9C5C5',
  },
  quizResultTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: C.text,
    marginBottom: 6,
  },
  quizExplain: {
    fontSize: 14,
    color: C.text,
    lineHeight: 22,
  },
  footer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: C.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
});
