import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Modal, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ChachalotAvatar } from '@/components/chachalot-avatar';
import { MaterialIcons } from '@expo/vector-icons';
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
import * as Speech from 'expo-speech';

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
  const fromLearnRef = useRef(false);
  useEffect(() => {
    const stored = getDeepdiveParams();
    const paramContent = params.content;
    const fromParams = typeof paramContent === 'string' ? paramContent : Array.isArray(paramContent) ? paramContent[0] : '';
    let raw = stored.content || fromParams || '';
    const paramLabel = params.choiceLabel;
    const fromParamLabel =
      typeof paramLabel === 'string' ? paramLabel : Array.isArray(paramLabel) ? paramLabel[0] : '';
    if (!raw) {
      setContent('');
      setChoiceLabel(stored.choiceLabel || fromParamLabel || '');
      setFromLearn(stored.fromLearn);
      fromLearnRef.current = stored.fromLearn;
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
      const shared = pickLearnDeepdiveSharedImageKey(raw);
      if (shared) raw = `[[image:${shared}]]\n\n${raw}`;
    }
    setContent(raw);
    setChoiceLabel(stored.choiceLabel || fromParamLabel || '');
    setFromLearn(stored.fromLearn);
    fromLearnRef.current = stored.fromLearn;
  }, []);

  useFocusEffect(
    useCallback(() => {
      const stored = getDeepdiveParams();
      fromLearnRef.current = stored.fromLearn;
      setFromLearn(stored.fromLearn);
    }, [])
  );

  const [highlightModal, setHighlightModal] = useState<{ title: string; body: string } | null>(null);
  const [ttsSegmentIndex, setTtsSegmentIndex] = useState(0);
  const [isTtsPlaying, setIsTtsPlaying] = useState(false);
  const isTtsPlayingRef = useRef(false);
  const ttsSessionRef = useRef(0);
  isTtsPlayingRef.current = isTtsPlaying;

  const ttsSegments = useMemo(() => {
    const textForTTS = content
      .replace(/\[\[image:[^\]]+\]\]/g, '')
      .replace(/\[\[section:[^\]]+\]\]/g, '')
      .replace(/\[\[[^\]]+\]\]/g, '')
      .trim();
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
  }, [content]);

  useEffect(() => {
    setTtsSegmentIndex(0);
  }, [content]);

  useEffect(() => {
    return () => {
      if (isTtsPlayingRef.current) {
        ttsSessionRef.current += 1;
        Speech.stop();
      } else if (!fromLearnRef.current) {
        ttsSessionRef.current += 1;
        Speech.stop();
      }
    };
  }, []);

  const parts: Array<{ type: 'text' | 'image'; value: string }> = [];
  if (content) {
    const re = /\[\[image:([^\]]+)\]\]/g;
    let lastIdx = 0;
    let m;
    while ((m = re.exec(content)) !== null) {
      if (m.index > lastIdx) {
        const text = content.slice(lastIdx, m.index).trim();
        if (text) parts.push({ type: 'text', value: content.slice(lastIdx, m.index) });
      }
      parts.push({ type: 'image', value: m[1].trim() });
      lastIdx = re.lastIndex;
    }
    if (lastIdx < content.length) {
      const text = content.slice(lastIdx).trim();
      if (text) parts.push({ type: 'text', value: content.slice(lastIdx) });
    }
  }

  /**
   * 改行のない長文でも「2. 」「3．」の前に改行を入れる（問題を解くモードの M 列深掘り向け）。
   * 学習の辞典 deepdive（reference）と同系のルール＋全角数字対応。
   */
  const preInsertNewlinesForNumberedSections = (raw: string): string =>
    raw
      .replace(/\\n/g, '\n')
      .replace(/([^\n])(【[^】]{1,30}】)/g, '$1\n$2')
      .replace(new RegExp(`([^\\n])(${HALFWD_NUM_HEAD_TOKEN.source})`, 'g'), '$1\n$2')
      .replace(new RegExp(`([^\\n])(${FULLWD_NUM_HEAD_TOKEN.source})`, 'g'), '$1\n$2')
      .replace(/([^\n])([①②③④⑤⑥⑦⑧⑨⑩])/g, '$1\n$2')
      .replace(/([^\n])([■💡])/g, '$1\n$2');

  /** 番号付きセクション（1. 2. 3. ／ １． ／ 1： 等）で分割してカード化 */
  const splitIntoCards = (text: string): string[] => {
    const prepared = preInsertNewlinesForNumberedSections(text.trim());
    const head = '(?:[1-9][0-9]?|[１-９][０-９]?)[\\.．:：\uFF1A]\\s*';
    let sections = prepared.split(new RegExp(`(?:\\n|^)(?=${head})`, 'm')).map((s) => s.trim()).filter(Boolean);
    if (sections.length >= 2) return sections;
    sections = prepared
      .split(new RegExp(`(?<=[\\s\\u3000。．!！?？])(?=${head})`))
      .map((s) => s.trim())
      .filter(Boolean);
    return sections.length >= 2 ? sections : [prepared.trim() || text.trim()];
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
      return { title: '', body: normalizeDeepdiveFlowText(trimmed) };
    }
    return {
      title,
      body: body ? normalizeDeepdiveFlowText(body) : '',
    };
  };

  const cardStyle = {
    backgroundColor: '#E2E8F0',
    borderColor: colors.choiceBorder,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  };

  const handleHighlightPress = (title: string, body: string) => {
    setHighlightModal({ title, body });
  };

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
    if (isTtsPlaying) {
      stopTts();
    } else if (!fromLearn) {
      stopTts();
    }
    router.back();
  };

  /** 見て聞いて覚える（学習）画面と連携するミニプレイヤー */
  const showLinkedPlayer = fromLearn && !!content;

  return (
    <>
      <Stack.Screen options={{ title: 'もっと深掘る', headerBackTitle: '戻る' }} />
      <ScrollView style={[styles.scroll, { backgroundColor: colors.card }]}>
        <ThemedView style={[styles.content, { backgroundColor: colors.card }]}>
          {choiceLabel ? (
            <ThemedText style={{ marginBottom: 12, color: colors.subText, fontSize: 14 }}>
              {choiceLabel}
            </ThemedText>
          ) : null}
          {parts.length > 0 ? (
            <View style={{ gap: 4 }}>
              {parts.map((p, i) =>
                p.type === 'text' ? (
                  <View key={i} style={{ gap: 0 }}>
                    {splitIntoCards(p.value.trim()).map((cardText, j) => {
                      const { title, body } = splitCardTitle(cardText);
                      return (
                        <ThemedView key={j} style={cardStyle}>
                          {title ? (
                            <ThemedText style={{ fontSize: 16, lineHeight: 24, color: colors.text, marginBottom: body ? 8 : 0 }}>{title}</ThemedText>
                          ) : null}
                          {body ? (
                            <MarkdownText
                              text={body}
                              style={{ fontSize: 16, lineHeight: 24, color: colors.text }}
                              onHighlightPress={handleHighlightPress}
                              uniformWeight
                            />
                          ) : null}
                        </ThemedView>
                      );
                    })}
                  </View>
                ) : (
                  (() => {
                    const src = resolveImageAsset(p.value);
                    return src ? (
                      <Image key={i} source={src} style={{ width: '100%', maxHeight: 500, borderRadius: 12, marginBottom: 12 }} resizeMode="contain" />
                    ) : (
                      <ThemedView key={i} style={{ padding: 12, marginBottom: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.choiceBorder }}>
                        <ThemedText style={{ color: colors.subText, fontSize: 14 }}>
                          画像を読み込めません（キー: {p.value}）。imageMap / deepdiveImages / chunkImages を確認してください。
                        </ThemedText>
                      </ThemedView>
                    );
                  })()
                )
              )}
            </View>
          ) : content ? (
            <View style={{ gap: 0 }}>
              {splitIntoCards(content).map((cardText, j) => {
                const { title, body } = splitCardTitle(cardText);
                return (
                  <ThemedView key={j} style={cardStyle}>
                    {title ? (
                      <ThemedText style={{ fontSize: 16, lineHeight: 24, color: colors.text, marginBottom: body ? 8 : 0 }}>{title}</ThemedText>
                    ) : null}
                    {body ? (
                      <MarkdownText
                        text={body}
                        style={{ fontSize: 16, lineHeight: 24, color: colors.text }}
                        onHighlightPress={handleHighlightPress}
                        uniformWeight
                      />
                    ) : null}
                  </ThemedView>
                );
              })}
            </View>
          ) : (
            <ThemedText style={{ color: colors.subText }}>表示する内容がありません。</ThemedText>
          )}
          <View style={[styles.footerBar, { marginTop: 24 }]}>
            <View style={styles.footerLeft}>
              {content ? (
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
  content: { flex: 1, padding: 20 },
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
