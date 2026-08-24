import { MarkdownText } from '@/components/markdown-text';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { useMemo, useRef, useState, createElement } from 'react';
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { DbTextbookBundle } from '@/src/content/dbTextbookBundles';
import { resolveImageAsset } from '@/src/resolveImageAsset';
import {
  cardHasStatuteContent,
  parseDbTextbookBlocks,
  resolveCardStatuteText,
  type DbTextbookCard,
} from '@/utils/parseDbTextbookCards';

const C = {
  bg: '#E4E4E7',
  panel: '#F0F0F2',
  text: '#3F3F46',
  textMuted: '#71717A',
  border: '#D4D4D8',
  accent: '#5A8FA8',
  cardBg: '#FAFAFA',
};

type Props = {
  bundle: DbTextbookBundle;
};

function intrinsicAspectRatio(source: number): number {
  const resolved = typeof Image.resolveAssetSource === 'function' ? Image.resolveAssetSource(source) : undefined;
  const w = resolved?.width;
  const h = resolved?.height;
  if (w && h && w > 0 && h > 0) {
    return w / h;
  }
  return 16 / 9;
}

function QuestionImage({ imageKey, source }: { imageKey: string; source: number }) {
  const ratio = useMemo(() => intrinsicAspectRatio(source), [source]);
  const uri = useMemo(() => Image.resolveAssetSource(source)?.uri, [source]);
  return (
    <View style={styles.questionImageFrame}>
      <View style={styles.questionImageClip}>
        {Platform.OS === 'web' && uri ? (
          createElement('img', {
            src: uri,
            alt: `解説図 ${imageKey}`,
            style: {
              width: '100%',
              height: 'auto',
              display: 'block',
              verticalAlign: 'top',
            },
          })
        ) : (
          <Image
            source={source}
            style={[styles.questionImage, { aspectRatio: ratio }]}
            resizeMode="contain"
            accessibilityLabel={`解説図 ${imageKey}`}
          />
        )}
        <View style={styles.chachalotBadge} pointerEvents="none">
          <Text style={styles.chachalotCaption}>ちゃちゃロット</Text>
        </View>
      </View>
    </View>
  );
}

function QuestionImages({ keys }: { keys: string[] }) {
  const resolved = useMemo(() => {
    const out: { key: string; source: number }[] = [];
    const seen = new Set<string>();
    for (const key of keys) {
      if (seen.has(key)) continue;
      seen.add(key);
      const source = resolveImageAsset(key);
      if (source != null) out.push({ key, source });
    }
    return out;
  }, [keys]);

  if (!resolved.length) return null;

  return (
    <View style={styles.questionImages}>
      {resolved.map(({ key, source }) => (
        <QuestionImage key={key} imageKey={key} source={source} />
      ))}
    </View>
  );
}

function QuestionCard({ card }: { card: DbTextbookCard }) {
  const [answerOpen, setAnswerOpen] = useState(false);
  const [statuteOpen, setStatuteOpen] = useState(false);
  const showStatute = cardHasStatuteContent(card);
  const statuteBody = useMemo(() => {
    if (!showStatute || !statuteOpen) return '';
    const text = resolveCardStatuteText(card).trim();
    return text || '（条文本文を取得できませんでした。六法で確認してください。）';
  }, [card, showStatute, statuteOpen]);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{card.title}</Text>

      {card.question.trim() ? (
        <View style={styles.questionBlock}>
          <Text style={styles.blockLabel}>問</Text>
          <MarkdownText text={card.question} />
        </View>
      ) : null}

      {card.answerExample.trim() ? (
        <View style={styles.disclosure}>
          <Pressable
            onPress={() => setAnswerOpen((v) => !v)}
            accessibilityRole="button"
            accessibilityState={{ expanded: answerOpen }}
            accessibilityLabel={`解答例を${answerOpen ? '閉じる' : '開く'}`}
            style={({ pressed }) => [styles.disclosureHit, pressed && styles.disclosurePressed]}
          >
            <MaterialIcons
              name={answerOpen ? 'expand-less' : 'expand-more'}
              size={26}
              color={C.accent}
            />
            <Text style={styles.disclosureLabel}>解答例</Text>
          </Pressable>
          {answerOpen ? (
            <View style={styles.disclosureBody}>
              <MarkdownText text={card.answerExample} />
            </View>
          ) : null}
        </View>
      ) : null}

      {showStatute ? (
        <View style={styles.disclosure}>
          <Pressable
            onPress={() => setStatuteOpen((v) => !v)}
            accessibilityRole="button"
            accessibilityState={{ expanded: statuteOpen }}
            accessibilityLabel={`条文を${statuteOpen ? '閉じる' : '開く'}`}
            style={({ pressed }) => [styles.disclosureHit, pressed && styles.disclosurePressed]}
          >
            <MaterialIcons
              name={statuteOpen ? 'expand-less' : 'expand-more'}
              size={26}
              color={C.accent}
            />
            <Text style={styles.disclosureLabel}>条文</Text>
          </Pressable>
          {statuteOpen ? (
            <View style={styles.disclosureBody}>
              <MarkdownText text={statuteBody} />
            </View>
          ) : null}
        </View>
      ) : null}

      {card.tip.trim() ? (
        <View style={styles.tipBlock}>
          <Text style={styles.blockLabel}>切るポイント</Text>
          <MarkdownText text={card.tip} />
        </View>
      ) : null}

      <QuestionImages keys={card.questionImageKeys} />
    </View>
  );
}

export function DbMarkdownTextbook({ bundle }: Props) {
  const blocks = useMemo(
    () => parseDbTextbookBlocks(bundle.markdown, bundle.slug),
    [bundle.markdown, bundle.slug],
  );
  const cards = useMemo(
    () => blocks.filter((b): b is { kind: 'card'; card: DbTextbookCard } => b.kind === 'card').map((b) => b.card),
    [blocks],
  );
  const scrollRef = useRef<ScrollView>(null);
  const cardY = useRef<Record<string, number>>({});

  const jumpTo = (id: string) => {
    const y = cardY.current[id];
    if (y == null) return;
    scrollRef.current?.scrollTo({ y: Math.max(0, y - 6), animated: true });
  };

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          title: bundle.title,
          headerStyle: { backgroundColor: C.bg },
          headerTintColor: C.text,
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color={C.text} />
            </Pressable>
          ),
        }}
      />
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator
      >
        {bundle.subtitle ? <Text style={styles.subtitle}>{bundle.subtitle}</Text> : null}
        {bundle.description ? <Text style={styles.description}>{bundle.description}</Text> : null}
        <View style={styles.sourceBox}>
          <Text style={styles.sourceTitle}>表示稿（再構成）</Text>
          {bundle.sourceFiles.map((file) => (
            <Text key={file} style={styles.sourceLine}>
              ・{file}
            </Text>
          ))}
        </View>

        {cards.length > 1 ? (
          <View style={styles.jumpWrap}>
            {cards.map((card) => (
              <Pressable
                key={card.id}
                onPress={() => jumpTo(card.id)}
                accessibilityRole="button"
                accessibilityLabel={`Q${card.imageSlot}へ`}
                style={({ pressed }) => [styles.jumpChip, pressed && styles.jumpChipPressed]}
              >
                <Text style={styles.jumpChipText}>Q{card.imageSlot}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        {blocks.map((block, index) => {
          if (block.kind === 'preamble') {
            return (
              <View key={`preamble-${index}`} style={styles.preamble}>
                <MarkdownText text={block.markdown} />
              </View>
            );
          }
          if (block.kind === 'section') {
            return (
              <Text key={`section-${index}`} style={styles.sectionTitle}>
                {block.title}
              </Text>
            );
          }
          return (
            <View
              key={block.card.id}
              onLayout={(e) => {
                cardY.current[block.card.id] = e.nativeEvent.layout.y;
              }}
            >
              <QuestionCard card={block.card} />
            </View>
          );
        })}

        <Text style={styles.footer}>
          出題形式・条文順に再構成した試験用メモ。原典NOTEの全文転載なし。言い回しは言い換え済み。条文・判例は六法で確認すること。
          DBフォルダは原典置き場（参考用）で、アプリ表示は content/textbook/app のみ。
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: C.bg,
  },
  backButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 48,
    maxWidth: 760,
    width: '100%',
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: C.textMuted,
    marginBottom: 8,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    color: C.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  sourceBox: {
    backgroundColor: C.panel,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.border,
    padding: 12,
    marginBottom: 18,
  },
  sourceTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: C.accent,
    marginBottom: 6,
  },
  sourceLine: {
    fontSize: 12,
    color: C.textMuted,
    lineHeight: 18,
  },
  jumpWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  jumpChip: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.panel,
  },
  jumpChipPressed: {
    opacity: 0.7,
  },
  jumpChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: C.accent,
  },
  preamble: {
    backgroundColor: C.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: C.text,
    marginTop: 8,
    marginBottom: 12,
    lineHeight: 24,
  },
  card: {
    backgroundColor: C.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: C.text,
    lineHeight: 26,
    marginBottom: 12,
  },
  questionBlock: {
    marginBottom: 10,
  },
  blockLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: C.accent,
    marginBottom: 6,
  },
  tipBlock: {
    marginBottom: 0,
  },
  questionImages: {
    marginHorizontal: -16,
    marginTop: 8,
    marginBottom: 0,
  },
  questionImageFrame: {
    width: '100%',
  },
  questionImageClip: {
    width: '100%',
    position: 'relative',
  },
  questionImage: {
    width: '100%',
  },
  chachalotBadge: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 96,
    alignItems: 'center',
  },
  chachalotCaption: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1E3A5F',
    backgroundColor: 'rgba(255,252,245,0.94)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
    letterSpacing: 0.3,
  },
  disclosure: {
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.panel,
    overflow: 'hidden',
  },
  disclosureHit: {
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  disclosurePressed: {
    opacity: 0.75,
  },
  disclosureLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: C.text,
  },
  disclosureBody: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: C.border,
    backgroundColor: C.cardBg,
  },
  footer: {
    marginTop: 18,
    fontSize: 12,
    color: C.textMuted,
    lineHeight: 18,
  },
});
