import { Link, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BONUS_QUESTIONS } from '@/src/bonus_questions';
import { useTheme } from '@/src/context/ThemeContext';
import { RESOURCES, SUBJECTS } from '@/src/questions';
import { formatDescriptiveText, type TextSegment } from '@/utils/formatDescriptiveText';
import { getChoicePrefix, hasNumberPrefix } from '@/utils/choiceNumber';

export default function QuestionScreen() {
  const params = useLocalSearchParams<{ subject?: string; field?: string; index?: string; correctCountSession?: string; mode?: string; shuffle?: string }>();
  const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;
  const paramField = Array.isArray(params.field) ? params.field[0] : params.field;
  const mode = Array.isArray(params.mode) ? params.mode[0] : params.mode;
  const isShuffle = (Array.isArray(params.shuffle) ? params.shuffle[0] : params.shuffle) === '1';

  const { colors, theme } = useTheme();

  const subjectData = useMemo(() => {
    const main = subject ? (SUBJECTS as any)[subject] || {} : {};
    const bonus = subject ? (BONUS_QUESTIONS as any)[subject] || {} : {};
    const merged = { ...main };
    Object.keys(bonus).forEach((k) => {
      merged[k] = [...(merged[k] || []), ...bonus[k]];
    });
    return merged;
  }, [subject]);

  const { field, questions } = useMemo(() => {
    const fields = Object.keys(subjectData);
    if (fields.length === 0) {
      return { field: null, questions: [] };
    }

    let targetQuestions = [];
    let selectedField = null;

    // If field is specified and valid, use it
    if (paramField && fields.includes(paramField)) {
      selectedField = paramField;
      targetQuestions = subjectData[paramField] || [];
    } else {
      // Otherwise pick random
      selectedField = fields[Math.floor(Math.random() * fields.length)];
      targetQuestions = subjectData[selectedField] || [];
    }

    // Filter based on mode AND validate structure
    targetQuestions = targetQuestions.filter((q: any) => {
      const hasText = q && typeof q === 'object' && q.text;
      const hasChoices = Array.isArray(q?.choices) && q.choices.length > 0;
      const isDescriptive = subject === '記述';
      // 記述式: textのみでOK。 選択式: text + choices 必須
      const isValid = hasText && (isDescriptive || hasChoices);
      if (!isValid) return false;

      // 肢単位の※分離: choiceIsBonusがあればそれで判定、なければ従来のisBonus
      const cb = q.choiceIsBonus as boolean[] | undefined;
      const hasCb = cb && cb.length > 0;
      if (mode === 'bonus') {
        return hasCb ? cb.some((b: boolean) => b) : !!q.isBonus;
      } else {
        return hasCb ? cb.some((b: boolean) => !b) : !q.isBonus;
      }
    });

    // シャッフルモード：問題をランダム順に並び替え
    if (isShuffle && targetQuestions.length > 0) {
      const arr = [...targetQuestions];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return { field: selectedField, questions: arr };
    }

    return { field: selectedField, questions: targetQuestions };
  }, [subjectData, paramField, mode, isShuffle]);

  // State for current question index
  const [questionIndex, setQuestionIndex] = useState<number | null>(null);
  const [isLongText, setIsLongText] = useState(false);

  const question = questionIndex !== null ? questions[questionIndex] : null;

  useEffect(() => {
    setIsLongText(false);
  }, [questionIndex]);

  // State for dimmed choices (indices)
  const [dimmedIndices, setDimmedIndices] = useState<number[]>([]);

  // State for multi-select
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  // State for 並べ替え問題（表示順のインデックス配列）
  const [reorderOrder, setReorderOrder] = useState<number[]>([]);
  // クリック順で選択（並べ替え問題）
  const [reorderSelection, setReorderSelection] = useState<number[]>([]);

  // State for 記述式（文章入力）
  const [descriptiveAnswer, setDescriptiveAnswer] = useState('');

  // Reset dimmed choices and selections when question changes
  useEffect(() => {
    setDimmedIndices([]);
    setSelectedIndices([]);
    setDescriptiveAnswer('');
    setReorderSelection([]);
  }, [questionIndex]);

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

  // State for Resource Modal
  const [resourceModalVisible, setResourceModalVisible] = useState(false);
  const [resourcePage, setResourcePage] = useState(0);

  const sidebarScrollRef = useRef<ScrollView>(null);
  const ITEM_WIDTH = 42;

  // Reset slots when question changes
  useEffect(() => {
    setSlotSelections({});
  }, [questionIndex]);

  const handleSlotPress = (slot: { label: string; options: string }) => {
    setActiveSlot(slot);
  };

  const handleSlotSelect = (val: string) => {
    if (activeSlot) {
      setSlotSelections(prev => ({ ...prev, [activeSlot.label]: val }));
      setActiveSlot(null);
    }
  };

  const stripR = (s: string) => (s || '').replace(/[\(（]\s*[rｒ]\s*[\)）]/gi, '').trim();

  const renderQuestionText = () => {
    if (!question) return null;
    const text = stripR(question.text || '');
    const slots = (question as any).slots || [];
    const answer = (question as any).answer || [];
    const correctCount = Array.isArray(answer) ? answer.length : 0;
    const suffix = correctCount === 0 ? ' (回答設定中)' : ` (正解肢${correctCount}問)`;

    // 多肢選択: tashiData からスロットを生成（語群から選択して穴埋め）
    const effectiveSlots = tashiData
      ? tashiData.slotLabels.map((label) => ({
          label: `[ ${label} ]`,
          options: tashiData.options.join(' / '),
        }))
      : slots;

    let content;
    if (effectiveSlots.length === 0) {
      const isDescriptive = subject === '記述';
      const useFormatted = isDescriptive && text.length > 150;

      if (useFormatted) {
        const paragraphs = formatDescriptiveText(text);
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
            {paragraphs.map((para, pi) => (
              <View
                key={pi}
                style={StyleSheet.flatten([
                  styles.descriptiveParagraph,
                  para.spacing === 'before' && { marginTop: 16 },
                  para.spacing === 'after' && { marginBottom: 16 },
                  para.spacing === 'both' && { marginVertical: 16 },
                ].filter(Boolean))}
              >
                <ThemedText
                  style={[
                    styles.questionText,
                    { color: colors.text, lineHeight: 28, fontFamily: theme === 'paper' ? 'serif' : undefined }
                  ]}
                >
                  {pi === 0 && !hasNumberPrefix(text) ? `${getChoicePrefix(questionIndex)} ` : ''}
                  {para.segments.map((seg, si) => (
                    <ThemedText key={si} style={segmentStyle(seg)}>
                      {seg.text}
                    </ThemedText>
                  ))}
                </ThemedText>
              </View>
            ))}
          </View>
        );
      } else {
        content = (
          <ThemedText
            type="title"
            style={[
              styles.questionText,
              isLongText && styles.questionTextSmall,
              { color: colors.text, fontFamily: theme === 'paper' ? 'serif' : undefined }
            ]}
            onTextLayout={(e) => {
              if (e.nativeEvent.lines.length >= 15) setIsLongText(true);
            }}
          >
            {(hasNumberPrefix(text) ? '' : getChoicePrefix(questionIndex))}{text}{subject === '多肢選択' ? suffix : ''}
          </ThemedText>
        );
      }
    } else {
      // Escape regex characters for labels（多肢選択は [ ア ] 形式、他はラベルそのまま）
      const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`(${effectiveSlots.map((s: any) => escapeRegExp(s.label)).join('|')})`, 'g');

      // 多肢選択: テキスト内の [ ア ] 等を正規化してマッチ（全角［］も考慮）
      const normalizedText = tashiData
        ? text.replace(/［\s*([ア-オ])\s*］/g, '[ $1 ]').replace(/\[\s*([ア-オ])\s*\]/g, '[ $1 ]')
        : text;
      const parts = normalizedText.split(pattern);

      content = (
        <ThemedText style={[styles.questionText, isLongText && styles.questionTextSmall, { lineHeight: 40 }]}>
          {hasNumberPrefix(text) ? '' : getChoicePrefix(questionIndex)}
          {parts.map((part: string, index: number) => {
            const slot = effectiveSlots.find((s: any) => s.label === part);
            if (slot) {
              const selected = slotSelections[slot.label];
              return (
                <Pressable key={index} onPress={() => handleSlotPress(slot)} style={styles.slotButton}>
                  <ThemedText style={styles.slotButtonText}>
                    {selected || part}
                  </ThemedText>
                </Pressable>
              );
            }
            return <ThemedText key={index} style={[styles.questionText, isLongText && styles.questionTextSmall]}>{part}</ThemedText>;
          })}{suffix}
        </ThemedText>
      );
    }

    return (
      <ThemedView style={[
        styles.questionContainer,
        {
          borderColor: colors.choiceBorder,
          backgroundColor: '#e8e8e8',
        }
      ]}>
        {content}
      </ThemedView>
    );
  };

  // Initialize strictly when questions change (e.g. subject selection)
  useEffect(() => {
    if (questions.length > 0) {
      // Start from param 'index' if provided, otherwise 0
      const initialIndex = params.index ? parseInt(Array.isArray(params.index) ? params.index[0] : params.index, 10) : 0;
      // Validate index range
      setQuestionIndex(initialIndex >= 0 && initialIndex < questions.length ? initialIndex : 0);
    } else {
      setQuestionIndex(null);
    }
  }, [questions, params.index]); // Re-run if params.index changes

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
  const rawResource = resourceId && resourcesData[resourceId] ? resourcesData[resourceId] : null;
  const resourcePages = useMemo(() => {
    if (!rawResource) return [];
    if (Array.isArray(rawResource)) return rawResource;
    return [rawResource];
  }, [rawResource]);

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
    // スロットラベル抽出（[ ア ] [ イ ] 等、全角・半角スペース対応）
    const matches = text.match(/[\[［]\s*([ア-オ])\s*[\]］]/g) || [];
    const seen = new Set<string>();
    const slotLabels: string[] = [];
    for (const m of matches) {
      const label = m.replace(/[\[［\s\]］]/g, '').trim();
      if (label && !seen.has(label)) {
        seen.add(label);
        slotLabels.push(label);
      }
    }
    if (slotLabels.length === 0) return null;
    // 語群パース: "【選択肢】 1 従属 / 2 平等 / 3 合法" -> ["従属","平等","合法"]
    const raw = wb.replace(/【選択肢】\s*/g, '').trim();
    const parts = raw.split(/\s*\/\s*/);
    const options = parts
      .map((p) => {
        const m = p.match(/^\d+\s+(.+)$/);
        return m ? m[1].trim() : p.trim();
      })
      .filter(Boolean);
    return { slotLabels, options };
  }, [subject, question]);

  // (ア)(イ)2列組合せ形式: 語句(ア)と考え方(イ)の組合せ問題
  const comboFormatData = useMemo(() => {
    if (!question || !question.choices?.length) return null;
    const text = (question as any).text || '';
    const isCombo = /語句\s*[\(（]\s*[ア]\s*[\)）].*[\(（]\s*[イ]\s*[\)）]|[\(（]\s*[ア]\s*[\)）].*[\(（]\s*[イ]\s*[\)）].*組合せ|考え方\s*[\(（]\s*[イ]\s*[\)）]|空欄\s*[\[［]\s*[ア]\s*[\]］]\s*[・\s]*[\[［]\s*[イ]\s*[\]］].*組合せ/.test(text);
    if (!isCombo) return null;
    const cb = (question as any).choiceIsBonus as boolean[] | undefined;
    let list = question.choices.map((c: string, idx: number) => {
      const t = (c || '').replace(/^[\d\.．]+\s*/, '').trim();
      const parts = t.replace(/[\(（]\s*[rｒ]\s*[\)）]/gi, '').trim().split(/\s*[\/／]\s*|[　\t\r\n]+|\s{2,}/);
      return { partA: parts[0] || t, partB: parts[1] || '', originalIndex: idx, isBonus: cb && idx < cb.length ? cb[idx] : false };
    });
    if (mode === 'bonus') list = list.filter((x: { isBonus: boolean }) => x.isBonus);
    else if (cb?.some((b: boolean) => b)) list = list.filter((x: { isBonus: boolean }) => !x.isBonus);
    if (list.length === 0) return null;
    if (!list.every((p: { partB: string }) => p.partB)) return null;
    return list;
  }, [question, mode]);

  // Shuffle choices and keep track of original index
  const shuffledChoices = useMemo(() => {
    if (!question || !question.choices) return [];

    const cb = (question as any).choiceIsBonus as boolean[] | undefined;
    const isBonusChoice = (i: number) => (cb && i < cb.length ? cb[i] : !!(question as any).isBonus);
    const hasBonus = cb ? cb.some((b: boolean) => b) : !!(question as any).isBonus;
    const hasNormal = cb ? cb.some((b: boolean) => !b) : !(question as any).isBonus;
    const isMixed = hasBonus && hasNormal;

    // Map to object with original index
    let choicesWithIndex = question.choices.map((text: string, index: number) => ({ text, originalIndex: index }));

    // 肢単位の※フィルタ
    // 通常モード: ※なし肢のみ
    // ボーナスモード: ※付き・通常が混在する問題は全肢表示、それ以外は※付き肢のみ
    if (mode !== 'bonus') {
      choicesWithIndex = choicesWithIndex.filter((c) => !isBonusChoice(c.originalIndex));
    } else if (!isMixed) {
      choicesWithIndex = choicesWithIndex.filter((c) => isBonusChoice(c.originalIndex));
    }
    // isMixed && mode==='bonus' → フィルタせず全肢表示

    // シャッフルモード時は肢もランダム順に並び替え
    if (isShuffle) {
      for (let i = choicesWithIndex.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choicesWithIndex[i], choicesWithIndex[j]] = [choicesWithIndex[j], choicesWithIndex[i]];
      }
    }

    return choicesWithIndex;
  }, [question, mode, isShuffle]);

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

  if (!subject || !field || !question) {
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 問題番号サイドバー: タップでジャンプ */}
        {questions.length > 0 && questionIndex !== null && (
          <ScrollView
            ref={sidebarScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.questionSidebar}
            contentContainerStyle={styles.questionSidebarContent}
          >
            {questions.map((_, idx) => (
              <Pressable
                key={idx}
                style={[
                  styles.questionSidebarItem,
                  { borderColor: colors.choiceBorder, backgroundColor: colors.choiceBg },
                  idx === questionIndex && { backgroundColor: colors.primary, borderColor: colors.primary }
                ]}
                onPress={() => jumpToQuestion(idx)}
              >
                <ThemedText
                  style={[
                    styles.questionSidebarItemText,
                    { color: idx === questionIndex ? '#fff' : colors.text }
                  ]}
                >
                  {idx + 1}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>
        )}
        <ThemedText type="subtitle" style={[styles.subject, { color: colors.text, fontWeight: '800' }]}>
          {subject} {questionIndex !== null ? `(${questionIndex + 1}/${questions.length || 0})` : ''}
          {mode === 'bonus' ? ' ★ボーナスステージ★' : ''}
        </ThemedText>

        {renderQuestionText()}

        {/* Word Bank: 多肢選択・N,O列語群ではタップで穴埋め、他は表示のみ */}
        {(question as any).wordBank ? (
          <ThemedView style={[styles.wordBankContainer, { borderColor: colors.choiceBorder, backgroundColor: colors.card }]}>
            <ThemedText style={[styles.wordBankTitle, { color: colors.subText }]}>
              【語群】{(tashiData || ((question as any).slots?.length > 0 && activeSlot)) && activeSlot ? ` → 空欄 [ ${activeSlot.label.replace(/[\[\]\s]/g, '')} ] を選んでください` : ''}
            </ThemedText>
            {(tashiData || ((question as any).slots?.length > 0 && activeSlot)) ? (
              <Pressable style={[styles.cancelSlotButton, { borderColor: colors.choiceBorder }]} onPress={() => setActiveSlot(null)}>
                <ThemedText style={{ color: colors.subText, fontSize: 12 }}>キャンセル</ThemedText>
              </Pressable>
            ) : null}
            <View style={styles.wordBankGrid}>
              {tashiData && activeSlot
                ? tashiData.options.map((opt: string, index: number) => (
                    <Pressable
                      key={index}
                      style={[styles.wordBankItem, styles.wordBankItemPressable, { borderColor: colors.choiceBorder }]}
                      onPress={() => handleSlotSelect(opt)}
                    >
                      <ThemedText style={{ color: colors.text, fontSize: 14 }}>{opt}</ThemedText>
                    </Pressable>
                  ))
                : activeSlot && (question as any).slots?.length > 0
                ? (() => {
                    const optStr = activeSlot.options || '';
                    const rPattern = /[\(（]\s*[rｒ]\s*[\)）]/gi;
                    const parts = optStr.split(/\n+|(?=[①②])|(?=\d+[\.．]\s*)|[\/／]|\t+/).filter((p: string) => p.trim());
                    return parts.map((p: string, idx: number) => {
                      const clean = p.replace(rPattern, '').trim();
                      if (!clean) return null;
                      return (
                        <Pressable
                          key={idx}
                          style={[styles.wordBankItem, styles.wordBankItemPressable, { borderColor: colors.choiceBorder }]}
                          onPress={() => handleSlotSelect(clean)}
                        >
                          <ThemedText style={{ color: colors.text, fontSize: 14 }}>{clean}</ThemedText>
                        </Pressable>
                      );
                    });
                  })()
                : (String((question as any).wordBank || '')).split('\n').filter((l: string) => l.trim().length > 0).map((line: string, index: number) => {
                    const item = line.trim().replace(/[\(（]\s*[rｒ]\s*[\)）]/gi, '').trim();
                    if (!item) return null;
                    const hasNumber = /^\d+/.test(item);
                    const text = hasNumber ? item : `${index + 1}. ${item}`;
                    return (
                      <ThemedText key={index} style={[styles.wordBankItem, { color: colors.text }]}>
                        {text}
                      </ThemedText>
                    );
                  })}
            </View>
          </ThemedView>
        ) : null}

        <ThemedView style={[styles.choices, { backgroundColor: colors.background }]}>
          {(tashiData || ((question as any).slots?.length > 0 && (question as any).slots?.some((s: any) => s.options))) ? (
            <>
              <Pressable
                style={[
                  styles.answerButton,
                  (() => {
                    const labels = tashiData ? tashiData.slotLabels.map((l) => `[ ${l} ]`) : ((question as any).slots || []).map((s: any) => s.label);
                    const allFilled = labels.every((l) => slotSelections[l]);
                    return !allFilled && styles.answerButtonDisabled;
                  })()
                ]}
                disabled={!(tashiData ? tashiData.slotLabels.every((l) => slotSelections[`[ ${l} ]`]) : ((question as any).slots || []).every((s: any) => slotSelections[s.label]))}
                onPress={() => {
                  const ans = tashiData
                    ? tashiData.slotLabels.map((l) => slotSelections[`[ ${l} ]`] || '')
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
                    }
                  });
                }}
              >
                <ThemedText style={styles.answerButtonText}>回答する</ThemedText>
              </Pressable>
            </>
          ) : ((question as any).isReorder || /並び順|ア[〜~]オ|ア～オ/.test((question as any).text || '')) && (question as any).choices?.length > 0 ? (
            <>
              <ThemedText style={[styles.descriptiveLabel, { color: colors.subText, marginBottom: 8 }]}>
                肢をクリックした順番に選択してください。{reorderSelection.length > 0 && ` (選択順: ${reorderSelection.map((i) => i + 1).join(' → ')})`}
              </ThemedText>
              {reorderSelection.length > 0 && (
                <Pressable style={[styles.cancelSlotButton, { borderColor: colors.choiceBorder, marginBottom: 8 }]} onPress={() => setReorderSelection([])}>
                  <ThemedText style={{ color: colors.subText, fontSize: 12 }}>やり直す</ThemedText>
                </Pressable>
              )}
              {((question as any).choices as string[]).map((choice: string, idx: number) => {
                const label = String(idx + 1);
                const isSelected = reorderSelection.includes(idx);
                const selectedPos = reorderSelection.indexOf(idx) + 1;
                return (
                  <Pressable
                    key={idx}
                    style={[
                      styles.reorderRow,
                      { backgroundColor: isSelected ? '#E3F2FD' : colors.choiceBg,
                        borderWidth: isSelected ? 2 : 1, borderColor: isSelected ? '#2196F3' : colors.choiceBorder }
                    ]}
                    onPress={() => {
                      setReorderSelection(prev => {
                        if (prev.includes(idx)) return prev.filter((i) => i !== idx);
                        if (prev.length >= ((question as any).choices?.length || 0)) return prev;
                        return [...prev, idx];
                      });
                    }}
                  >
                    <ThemedText style={[styles.reorderNum, { color: colors.text }]}>{label}.</ThemedText>
                    <ThemedText style={[styles.reorderText, { color: colors.text, flex: 1 }]} numberOfLines={5}>
                      {choice || ''}
                    </ThemedText>
                    {isSelected && <ThemedText style={{ color: '#2196F3', fontWeight: 'bold', marginLeft: 8 }}>→{selectedPos}番目</ThemedText>}
                  </Pressable>
                );
              })}
              <Pressable
                style={[styles.answerButton, reorderSelection.length !== ((question as any).choices?.length || 0) && styles.answerButtonDisabled]}
                disabled={reorderSelection.length !== ((question as any).choices?.length || 0)}
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
                    }
                  });
                }}
              >
                <ThemedText style={styles.answerButtonText}>回答する</ThemedText>
              </Pressable>
            </>
          ) : comboFormatData ? (
            <>
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
                      router.push({
                        pathname: '/result',
                        params: {
                          subject,
                          field,
                          questionIndex: String(questionIndex),
                          pickedIndex: String(item.originalIndex),
                          totalQuestions: String(questions.length),
                          correctCountSession: params.correctCountSession || '0',
                        }
                      });
                    }}
                  >
                    <ThemedText style={[styles.comboTableNum, { color: colors.text }]}>{idx + 1}.</ThemedText>
                    <ThemedText style={[styles.comboTableCell, { color: colors.text }]}>{item.partA}</ThemedText>
                    <ThemedText style={[styles.comboTableCell, { color: colors.text }]}>{item.partB}</ThemedText>
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
                    }
                  });
                }}
              >
                <ThemedText style={styles.answerButtonText}>回答する</ThemedText>
              </Pressable>
            </>
          ) : shuffledChoices.map((choiceObj: { text: string; originalIndex: number }, index: number) => {
            if (!choiceObj || !choiceObj.text) return null; // Guard against null/empty choices

            // [NEW] Display Logic: Strip '※'
            const displayText = choiceObj.text.replace(/※/g, '');
            // In Bonus mode, they are enabled, so no disabled logic based on ※ anymore
            const isDisabled = false;
            const isDimmed = dimmedIndices.includes(index);

            // [NEW] Multi-select Logic
            const answer = (question as any).answer || [];
            const isMultiSelect = Array.isArray(answer) && answer.length > 1;
            const isSelected = selectedIndices.includes(choiceObj.originalIndex);

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
                  (isMultiSelect && isSelected) && { backgroundColor: '#E3F2FD', borderColor: '#2196F3', borderWidth: 2 }
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
                  if (isMultiSelect) {
                    setSelectedIndices(prev => {
                      if (prev.includes(choiceObj.originalIndex)) return prev.filter(i => i !== choiceObj.originalIndex);
                      return [...prev, choiceObj.originalIndex];
                    });
                  } else {
                    router.push({
                      pathname: '/result',
                      params: {
                        subject,
                        field,
                        questionIndex: String(questionIndex), // Pass current index
                        pickedIndex: String(choiceObj.originalIndex),
                        // correctIndices: JSON.stringify(question.answer), // Removed
                        // text: question.text, // Removed
                        // explain: question.explain, // Removed
                        // memo: question.memo || '', // Removed
                        // choices: JSON.stringify(question.choices), // Removed
                        totalQuestions: String(questions.length),
                        correctCountSession: params.correctCountSession || '0', // Pass through or init
                        // refId: (question as any).refId || '', // Removed (Result will lookup)
                      },
                    });
                  }
                }}
              >
                <ThemedText style={[
                  styles.choiceText,
                  { color: colors.choiceText },
                  isDisabled && styles.choiceTextDisabled,
                  (isMultiSelect && isSelected) && { color: '#1565C0', fontWeight: 'bold' }
                ]}>{displayText}</ThemedText>
              </Pressable>
            );
          })}
        </ThemedView>

        {/* Answer Button for Multi-Select */}
        {(() => {
          const answer = (question as any).answer || [];
          if (Array.isArray(answer) && answer.length > 1) {
            return (
              <Pressable
                style={[styles.answerButton, selectedIndices.length === 0 && styles.answerButtonDisabled]}
                disabled={selectedIndices.length === 0}
                onPress={() => {
                  router.push({
                    pathname: '/result',
                    params: {
                      subject,
                      field,
                      questionIndex: String(questionIndex),
                      pickedIndex: '-1', // Placeholder
                      pickedIndices: JSON.stringify(selectedIndices), // NEW
                      totalQuestions: String(questions.length),
                      correctCountSession: params.correctCountSession || '0',
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
  questionContainer: {
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
  questionText: {
    fontSize: 24,
    lineHeight: 38,
    backgroundColor: 'transparent',
    fontWeight: '600',
  },
  questionTextSmall: {
    fontSize: 22,
    lineHeight: 34,
    backgroundColor: 'transparent',
    fontWeight: '600',
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
  wordBankItem: {
    width: '30%', // Approx 3 columns
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  wordBankItemPressable: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
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
    textAlign: 'center',
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
  slotButtonText: {
    fontWeight: 'bold',
    color: '#0a7ea4',
    fontSize: 18,
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
});
