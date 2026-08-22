import { MarkdownText } from '@/components/markdown-text';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

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
        <Image
          key={key}
          source={source}
          style={styles.questionImage}
          resizeMode="contain"
          accessibilityLabel={`解説図 ${key}`}
        />
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
        <View style={styles.block}>
          <Text style={styles.blockLabel}>問</Text>
          <MarkdownText text={card.question} />
        </View>
      ) : null}

      <QuestionImages keys={card.questionImageKeys} />

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
        <View style={styles.block}>
          <Text style={styles.blockLabel}>切るポイント</Text>
          <MarkdownText text={card.tip} />
        </View>
      ) : null}
    </View>
  );
}

export function DbMarkdownTextbook({ bundle }: Props) {
  const blocks = useMemo(
    () => parseDbTextbookBlocks(bundle.markdown, bundle.slug),
    [bundle.markdown, bundle.slug],
  );

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
          return <QuestionCard key={block.card.id} card={block.card} />;
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
  block: {
    marginBottom: 10,
  },
  blockLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: C.accent,
    marginBottom: 6,
  },
  questionImages: {
    marginBottom: 12,
    gap: 10,
  },
  questionImage: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: '#FFF',
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
