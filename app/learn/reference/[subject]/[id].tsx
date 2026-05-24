import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCharacter } from '@/src/context/CharacterContext';
import { useLearnPlayback } from '@/src/context/LearnPlaybackContext';
import { useTheme } from '@/src/context/ThemeContext';
import { kenpouParallelSupplementImageKey, pickAutoLearnDeepdiveImageKey } from '@/src/deepdiveLearnAutoImage';
import { LEARN_CONTENT, LEARN_DEEPDIVE } from '@/src/learn';
import { resolveDeepdiveImageTagInner, resolveImageAsset } from '@/src/resolveImageAsset';
import { SUBJECTS } from '@/src/questions';
import { applyTTSRules } from '@/utils/tts-rules';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { Dimensions, Image, Modal, Platform, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
// @ts-ignore
import { IMAGE_RESOURCES_MAP } from '@/src/imageMap';

/** deepdive / chunk / imageMap を含めて参照（民法物権 learn/bukken 等） */
function getReferenceImageSource(key: string): number | undefined {
  const k = resolveDeepdiveImageTagInner(key) ?? key.trim().split(/\s+/)[0];
  if (!k) return undefined;
  const resolved = resolveImageAsset(k);
  if (resolved) return resolved;
  return (IMAGE_RESOURCES_MAP as Record<string, number>)[k];
}

/** 本文先頭の連続する [[image:…]] を抜き出し、ヘッダー直下のヒーロー表示用に使う */
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

export default function ReferencePage() {
    const { subject, id, originSubject, originId, originIndex } = useLocalSearchParams();
    const router = useRouter();
    const { theme, colors } = useTheme();
    const { applyCharacterNames } = useCharacter();
    const { voiceSpeechOptions } = useLearnPlayback();

    const questionIndex = parseInt(Array.isArray(id) ? id[0] : id || '0', 10);
    const subjectName = Array.isArray(subject) ? subject[0] : subject || '';

    // Find the question data
    let foundQuestion = null;
    if (subjectName) {
        for (const category of Object.values(SUBJECTS as any)) {
            if ((category as any)[subjectName]) {
                foundQuestion = (category as any)[subjectName]?.[questionIndex];
                break;
            }
        }
    }

    const chunks = foundQuestion?.chunks || [];
    let explainText = '';

    if (chunks.length > 0) {
        // If chunks exist, combine their titles and explanations
        explainText = chunks.map((c: any) => {
            let res = '';
            if (c.title) res += `[[section:${c.title}]]\n`;
            res += c.explain || '';
            return res;
        }).join('\n\n');
    } else {
        explainText = foundQuestion?.explain || '解説が見つかりませんでした。';
    }

    // LEARN_CONTENT から [[image:...]] タグを取得して先頭に表示
    const learnEntry = (LEARN_CONTENT as any)[subjectName]?.[questionIndex] || '';
    const learnImageMatches = learnEntry.match(/\[\[image:[^\]]+\]\]/g);
    if (learnImageMatches) {
        explainText = learnImageMatches.join('\n') + '\n\n' + explainText;
    }

    // B列深掘り＋問番号からの自動画像（民法物権 learn/minnpou/bukken/N-110 等）。最上部に置くため本文より先に付与
    const ddArr = (LEARN_DEEPDIVE as any)[subjectName];
    const lcArr = (LEARN_CONTENT as any)[subjectName];
    if (Array.isArray(ddArr) && ddArr.length > 0) {
        const autoKey = pickAutoLearnDeepdiveImageKey(
            questionIndex,
            (ddArr[questionIndex] || '').trim(),
            ddArr,
            Array.isArray(lcArr) && lcArr.length === ddArr.length ? lcArr : undefined,
            subjectName
        );
        if (autoKey && resolveImageAsset(autoKey)) {
            const tag = `[[image:${autoKey}]]`;
            if (!explainText.includes(tag)) {
                explainText = `${tag}\n\n${explainText}`;
            }
        }
    }

    if (subjectName === '憲法') {
        const sup = kenpouParallelSupplementImageKey(questionIndex + 1);
        if (sup) {
            const tag = `[[image:${sup}]]`;
            if (!explainText.includes(tag)) {
                explainText = `${tag}\n\n${explainText}`;
            }
        }
    }

    // Override for Agency Personation Diagram (Workaround for large questions.js)
    if (subjectName === '民法総則' && questionIndex === 54) {
        explainText = "[[image:agency_diagram]]";
    }
    if (subjectName === '民法総則' && questionIndex === 55) {
        explainText = "[[big:復代理人の引渡義務（民法107条2項）]]\n\n[[bold:【1. 復代理人の選任】]]\n[[image:chachalot:本人]] [[arrow:right]] [[image:pitchi:代理人]] [[arrow:right]] [[image:task:復代理人]]\n\n[[bold:【2. 目的物の受領】]]\n[[image:task:復代理人]] [[gift_arrow:left]] [[image:king_kachadokuro:相手方]]\n\n[[bold:【3. 本人または代理人への引渡し】]]\n[[image:chachalot:本人]] [[gift_arrow:left:or]] [[image:task:復代理人]] [[gift_arrow:right:or]] [[image:pitchi:代理人]]\nどちらかに渡せば義務を履行したことになります。\n\n[[big:【結論】]]\n[[marker:復代理人は、本人、代理人のいずれかに目的物を引き渡せば、引渡義務を履行したことになります。]]";
    }

    const { images: leadingImageKeys, rest: explainTextForCards } = stripLeadingImageTags(explainText);

    // Mini Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedImageSource, setSelectedImageSource] = useState<any>(null);


    // アンマウント時は停止しない（メイン画面の音声を継続させるため）
    useEffect(() => {
        return () => { /* Speech.stop() removed for continuity */ };
    }, []);

    const handleTogglePlay = () => {
        if (isPlaying) {
            Speech.stop();
            setIsPlaying(false);
        } else {
            // Get original learn content for TTS (not the Deep Dive explanation)
            let contentToRead = '解説が見つかりませんでした。';

            if (subjectName && (LEARN_CONTENT as any)[subjectName]) {
                const subjectContent = (LEARN_CONTENT as any)[subjectName];
                if (Array.isArray(subjectContent) && subjectContent[questionIndex]) {
                    contentToRead = subjectContent[questionIndex];
                }
            }

            contentToRead = contentToRead.split(/\[\[LINK:/)[0];
            contentToRead = contentToRead.replace(/\[\[.*?\]\]/g, '');
            contentToRead = applyCharacterNames(contentToRead);
            const spokenText = applyTTSRules(contentToRead);

            let count = 0;
            const speak = () => {
                if (count >= 3) {
                    setIsPlaying(false);
                    return;
                }
                count++;
                Speech.speak(spokenText, {
                    ...voiceSpeechOptions,
                    rate: 2.0,
                    onDone: speak,
                    onError: () => setIsPlaying(false),
                });
            };

            setIsPlaying(true);
            speak();
        }
    };

    const handleNext = () => {
        Speech.stop();
        setIsPlaying(false);
        const nextIndex = questionIndex + 1;
        let nextQuestion = null;
        if (subjectName) {
            for (const category of Object.values(SUBJECTS as any)) {
                if ((category as any)[subjectName]) {
                    nextQuestion = (category as any)[subjectName]?.[nextIndex];
                    break;
                }
            }
        }
        if (nextQuestion && nextQuestion.explain) {
            router.replace({
                pathname: `/learn/reference/[subject]/[id]` as any,
                params: { subject: subjectName, id: nextIndex }
            });
        } else {
            alert('次の解説はありません。');
        }
    };

    const handlePrev = () => {
        Speech.stop();
        setIsPlaying(false);
        if (questionIndex > 0) {
            const prevIndex = questionIndex - 1;
            router.replace({
                pathname: `/learn/reference/[subject]/[id]` as any,
                params: { subject: subjectName, id: prevIndex }
            });
        } else {
            alert('前の解説はありません。');
        }
    };

    const parseRichText = (text: string) => {
        const regex = /\[\[(red|big|bold|marker|image|gift|gift_arrow|arrow|section|point):?(.+?)?\]\]/g;
        const parts = [];
        let lastIndex = 0;
        let match;
        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push({
                    type: 'text',
                    content: text.substring(lastIndex, match.index),
                });
            }
            const type = match[1];
            const rawContent = match[2] || "";
            if (type === 'image') {
                const [content, label] = rawContent.split(':');
                parts.push({ type: 'image', content, label });
            } else if (type === 'gift_arrow') {
                const [content, or] = rawContent.split(':');
                parts.push({ type: 'gift_arrow', content, or: or === 'or' });
            } else {
                parts.push({ type: type, content: rawContent });
            }
            lastIndex = regex.lastIndex;
        }
        if (lastIndex < text.length) {
            parts.push({ type: 'text', content: text.substring(lastIndex) });
        }
        return parts;
    };

    const renderContent = (text: string) => {
        // 0. エスケープされた \n を本物の改行に変換（JSONで\\nとして格納されている場合）
        text = text.replace(/\\n/g, '\n');

        // 1. 改行なし長文の自動分割プリプロセス
        const preInsertNewlines = (raw: string): string => raw
            // 【見出し】パターンの前に改行を挿入（ただし行頭・改行直後は除く）
            .replace(/([^\n])(【[^】]{1,30}】)/g, '$1\n$2')
            // 「N. テキスト」パターン（数字＋ドット）の前に改行を挿入
            .replace(/([^\n])([1-9][0-9]?[\.．]\s+[^\s])/g, '$1\n$2')
            // 「N. タイトル（サブタイトル）本文...」の）または）直後にも改行を挿入（タイトルと本文を分離）
            .replace(/(^[1-9][0-9]?[\.．][^\n]{1,50}?[）)])\s*(?=[^\n（）\s])/gm, '$1\n')
            // 「N. タイトル（括弧なし）본文」を分離: スペース区切り後の長文 
            .replace(/(^[1-9][0-9]?[\.．]\s*[\u30A0-\u30FF\u3040-\u309F\u4E00-\u9FFF]{2,15})\s*([結論ひ具過周受])/gm, '$1\n$2')
            // ①②...⑩ の前に改行
            .replace(/([^\n])([①②③④⑤⑥⑦⑧⑨⑩])/g, '$1\n$2')
            // ■ 💡 の前に改行
            .replace(/([^\n])([■💡])/g, '$1\n$2')
            // 既知のセクションキーワードの前に改行
            .replace(/([^\n])(考え方のポイント|受験生へのアドバイス|趣旨(?=\s*[\r\n　\s])|根拠条文：|根拠判例：|結論：)/g, '$1\n$2');

        // 2. Pre-process text to ensure ■ and 💡 start on new lines AND split titles from body
        const processedText = applyCharacterNames(preInsertNewlines(text))
            .replace(/([^\n])\s*([■💡])/g, '$1\n$2') // Ensure symbol starts new line
            .replace(/([■💡][^■💡\n]{2,60}?[)）】：:])\s*(?![■💡\n])(.)/g, '$1\n$2') // Split after delimiters
            .replace(/([■💡][^■💡\n]{2,30}?[\s　/])\s*(?![■💡\n])(.)/g, '$1\n$2'); // Split after space/slash

        const lines = processedText.split('\n');

        const blocks: { type: 'section' | 'plain', title?: string, content: any[][], styleType?: 'advice' | 'normal' }[] = [];
        let currentBlock: { type: 'section' | 'plain', title?: string, content: any[][], styleType?: 'advice' | 'normal' } | null = null;

        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return;

            const parsedLine = parseRichText(line);

            // Detection Patterns for auto-card splitting
            const sectionTag = parsedLine.find(p => p.type === 'section');
            const isNumericHeader = /^[0-9]+[\.．]/.test(trimmedLine);
            const isCircledNumber = /^[①②③④⑤⑥⑦⑧⑨⑩]/.test(trimmedLine);
            const isQAHeader = /^[Qq](＆|&)[Aa]|^[Qq][0-9]*[\.．]/.test(trimmedLine);
            const isCaseHeader = /^(【?[0-9]*[\.．]?(事例|判例|事件|訴訟))|((事件|訴訟|判例)$)/.test(trimmedLine);
            const isBlockSymbol = /^[■💡]/.test(trimmedLine);
            // 【見出し】パターン: 行頭が【...】で始まる（内容が続く場合も含む）
            const isBracketHeader = /^【[^】]{1,30}】/.test(trimmedLine);

            const isNewSection = sectionTag || isNumericHeader || isCircledNumber || isQAHeader || isCaseHeader || isBlockSymbol || isBracketHeader;

            if (isNewSection) {
                // 【見出し】パターンのタイトル抽出: 【...】部分のみをタイトルとし、残りをコンテンツへ
                let title: string;
                let remainderLine: string | null = null;
                if (isBracketHeader && !sectionTag && !isBlockSymbol) {
                    const bracketMatch = trimmedLine.match(/^(【[^】]{1,30}】)\s*(.*)/s);
                    title = bracketMatch ? bracketMatch[1].replace(/^【|】$/g, '') : trimmedLine;
                    const remainder = bracketMatch ? bracketMatch[2].trim() : '';
                    if (remainder) remainderLine = remainder;
                } else {
                    title = sectionTag ? sectionTag.content : (isBlockSymbol ? trimmedLine.replace(/^[■💡]\s*/, '') : trimmedLine);
                }
                const styleType = trimmedLine.startsWith('💡') ? 'advice' : 'normal';

                currentBlock = { type: 'section', title: title, content: [], styleType };
                blocks.push(currentBlock);

                if (sectionTag) {
                    const filteredLine = parsedLine.filter(p => p.type !== 'section');
                    if (filteredLine.length > 0) currentBlock.content.push(filteredLine);
                } else if (isBlockSymbol) {
                    // Don't add the header line itself to content if it's the title
                } else if (isBracketHeader && remainderLine) {
                    // 【見出し】の後ろに続くテキストをコンテンツに追加
                    currentBlock.content.push(parseRichText(remainderLine));
                }
            } else {
                if (!currentBlock) {
                    currentBlock = { type: 'plain', content: [], styleType: 'normal' };
                    blocks.push(currentBlock);
                }
                currentBlock.content.push(parsedLine);
            }
        });

        const isModern = theme === 'modern';
        const cardBg = isModern ? ['#EBF8FF', '#F0F9FF'] : [colors.card, colors.card];
        const adviceBg = isModern ? ['#FFFDF2', '#FFFBEB'] : ['#FFF9DB', '#FFF9DB'];
        const borderCol = isModern ? '#BEE3F8' : 'rgba(0,0,0,0.03)';
        const adviceBorderCol = isModern ? '#FDE68A' : '#F2D74E';
        const mainTextCol = isModern ? '#2C5282' : '#2c3e50';
        const adviceTextCol = isModern ? '#92400E' : '#744210';

        return blocks.map((block, blockIndex) => {
            const isAdvice = block.styleType === 'advice';
            const currentCardBg = isAdvice ? adviceBg : cardBg;
            const currentBorderCol = isAdvice ? adviceBorderCol : borderCol;
            const currentTitleCol = isAdvice ? adviceTextCol : mainTextCol;

            return (
                <View key={blockIndex} style={styles.cardWrapper}>
                    <LinearGradient
                        colors={currentCardBg as any}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[
                            styles.sectionCard,
                            { borderColor: currentBorderCol },
                            block.type === 'plain' ? { borderWidth: 0, elevation: 0, shadowOpacity: 0, backgroundColor: 'transparent' } : {},
                        ]}
                    >
                        {block.title && (
                            <View style={[styles.sectionHeader, isAdvice && { borderBottomWidth: 1, borderBottomColor: adviceBorderCol + '40', paddingBottom: 12 }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                    {isAdvice && <ThemedText style={{ fontSize: 20 }}>💡</ThemedText>}
                                    <ThemedText style={[styles.sectionTitle, { color: currentTitleCol }]}>{block.title}</ThemedText>
                                </View>
                            </View>
                        )}
                        <View style={[styles.cardBody, isAdvice && { paddingTop: 16 }]}>
                            {block.content.map((lineParts, lineIndex) => {
                                const isPoint = lineParts.some(p => p.type === 'point');
                                if (isPoint) {
                                    const pointPart = lineParts.find(p => p.type === 'point');
                                    return (
                                        <View key={lineIndex} style={[styles.pointBox, { backgroundColor: colors.primary + '15', borderColor: colors.primary }]}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                                <MaterialIcons name="stars" size={22} color={colors.primary} />
                                                <ThemedText style={{ color: colors.primary, fontWeight: 'bold', fontSize: 13, letterSpacing: 1 }}>CHECK / ポイント</ThemedText>
                                            </View>
                                            <ThemedText style={styles.pointText}>{pointPart?.content}</ThemedText>
                                        </View>
                                    );
                                }
                                if (lineParts.length === 1 && lineParts[0].type === 'image') {
                                    const part = lineParts[0];
                                    const imageSource = getReferenceImageSource(part.content);
                                    if (imageSource) {
                                        return (
                                            <View key={lineIndex} style={{ width: '100%', alignItems: 'center', marginVertical: 15 }}>
                                                <View style={styles.imageContainer}>
                                                    <Image source={imageSource} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                                                </View>
                                            </View>
                                        );
                                    }
                                }
                                const hasLayoutTag = lineParts.some(p => ['image', 'gift_arrow', 'arrow'].includes(p.type));
                                if (!hasLayoutTag) {
                                    return (
                                        <ThemedText key={lineIndex} style={styles.lineWrapper}>
                                            {lineParts.map((part, partIndex) => {
                                                switch (part.type) {
                                                    case 'red': return <ThemedText key={partIndex} style={{ color: '#e74c3c' }}>{part.content}</ThemedText>;
                                                    case 'big': return <ThemedText key={partIndex} style={{ fontSize: 18, lineHeight: 28, color: mainTextCol }}>{part.content}</ThemedText>;
                                                    case 'bold': return <ThemedText key={partIndex} style={{ color: mainTextCol }}>{part.content}</ThemedText>;
                                                    case 'marker': return <ThemedText key={partIndex} style={styles.markerText}>{part.content}</ThemedText>;
                                                    default: return <ThemedText key={partIndex} style={{ color: mainTextCol }}>{part.content}</ThemedText>;
                                                }
                                            })}
                                        </ThemedText>
                                    );
                                }
                                return (
                                    <View key={lineIndex} style={styles.lineWrapperRow}>
                                        {lineParts.map((part, partIndex) => {
                                            switch (part.type) {
                                                case 'red': return <ThemedText key={partIndex} style={[styles.line, { color: '#e74c3c' }]}>{part.content}</ThemedText>;
                                                case 'big': return <ThemedText key={partIndex} style={[styles.line, { fontSize: 18, lineHeight: 28, color: mainTextCol }]}>{part.content}</ThemedText>;
                                                case 'bold': return <ThemedText key={partIndex} style={[styles.line, { color: mainTextCol }]}>{part.content}</ThemedText>;
                                                case 'marker': return <ThemedText key={partIndex} style={[styles.line, styles.markerText]}>{part.content}</ThemedText>;
                                                case 'image':
                                                    const img = getReferenceImageSource(part.content);
                                                    if (img) {
                                                        const isLargeImage = part.content.includes('rigid_constitution') || part.content.includes('flexible_constitution');
                                                        const size = isLargeImage ? 150 : 70;
                                                        return (
                                                            <Pressable key={partIndex} onPress={() => setSelectedImageSource(img)} style={{ alignItems: 'center', marginHorizontal: 5, marginVertical: isLargeImage ? 15 : 5 }}>
                                                                {part.label ? (
                                                                    <View style={{ backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, marginBottom: 6 }}>
                                                                        <ThemedText style={{ fontSize: 11, color: '#fff', fontWeight: 'bold' }}>{part.label}</ThemedText>
                                                                    </View>
                                                                ) : <View style={{ height: isLargeImage ? 0 : 20 }} />}
                                                                <View style={[styles.avatarFrame, { width: size, height: size, borderRadius: isLargeImage ? 16 : size / 2, borderColor: colors.primary + '40' }]}>
                                                                    <Image source={img} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                                                                </View>
                                                            </Pressable>
                                                        );
                                                    }
                                                    return <ThemedText key={partIndex} style={styles.line}>[画像なし]</ThemedText>;
                                                case 'gift_arrow':
                                                    const isRight = part.content === 'right';
                                                    return (
                                                        <View key={partIndex} style={styles.arrowWrapper}>
                                                            {part.or && <ThemedText style={styles.orLabel}>or</ThemedText>}
                                                            <View style={[styles.arrowLine, { backgroundColor: colors.primary }]} />
                                                            <View style={[styles.arrowHead, { [isRight ? 'right' : 'left']: -2, [isRight ? 'borderLeftColor' : 'borderRightColor']: colors.primary, [isRight ? 'borderLeftWidth' : 'borderRightWidth']: 12 }]} />
                                                            <View style={[styles.giftIcon, { borderColor: colors.primary }]}><ThemedText style={{ fontSize: 18 }}>🎁</ThemedText></View>
                                                        </View>
                                                    );
                                                case 'arrow':
                                                    const isArrowRight = part.content === 'right';
                                                    return (
                                                        <View key={partIndex} style={styles.smallArrowWrapper}>
                                                            <View style={[styles.arrowLine, { backgroundColor: colors.primary }]} />
                                                            <View style={[styles.arrowHead, { [isArrowRight ? 'right' : 'left']: -2, [isArrowRight ? 'borderLeftColor' : 'borderRightColor']: colors.primary, [isArrowRight ? 'borderLeftWidth' : 'borderRightWidth']: 12 }]} />
                                                        </View>
                                                    );
                                                default: return <ThemedText key={partIndex} style={[styles.line, { color: mainTextCol }]}>{part.content}</ThemedText>;
                                            }
                                        })}
                                    </View>
                                );
                            })}
                        </View>
                    </LinearGradient>
                </View>
            );
        });
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: 'もっと深掘る', headerBackTitle: '戻る' }} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {foundQuestion?.title && (
                    <ThemedView style={styles.titleCard}>
                        <ThemedText style={styles.titleText}>{foundQuestion.title}</ThemedText>
                    </ThemedView>
                )}
                {leadingImageKeys.map((imgKey, hi) => {
                    const src = getReferenceImageSource(imgKey);
                    if (!src) return null;
                    return (
                        <View key={`hero-img-${hi}-${imgKey}`} style={{ width: '100%', marginBottom: 16 }}>
                            <Image
                                source={src}
                                style={{ width: '100%', maxHeight: 480, borderRadius: 12 }}
                                resizeMode="contain"
                            />
                        </View>
                    );
                })}
                {renderContent(explainTextForCards)}
            </ScrollView>

            <Pressable
                onPress={() => {
                    if (originSubject) {
                        router.replace({ pathname: `/learn/[subject]` as any, params: { subject: originSubject, index: originIndex || '0' } });
                    } else {
                        router.back();
                    }
                }}
                style={styles.backButton}
            >
                <ThemedText style={{ color: colors.primary, fontWeight: 'bold' }}>学習へ戻る</ThemedText>
            </Pressable>

            <ThemedView style={[styles.miniPlayer, { borderTopColor: colors.choiceBorder, backgroundColor: colors.background }]}>
                <Pressable onPress={handlePrev} style={styles.controlButton}>
                    <MaterialIcons name="skip-previous" size={32} color={colors.primary} />
                </Pressable>
                <Pressable onPress={handleTogglePlay} style={styles.playButton}>
                    <MaterialIcons name={isPlaying ? "stop-circle" : "play-circle-filled"} size={48} color={colors.primary} />
                </Pressable>
                <Pressable onPress={handleNext} style={styles.controlButton}>
                    <MaterialIcons name="skip-next" size={32} color={colors.primary} />
                </Pressable>
            </ThemedView>

            <Modal visible={!!selectedImageSource} transparent={true} animationType="fade" onRequestClose={() => setSelectedImageSource(null)}>
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setSelectedImageSource(null)}>
                    <View style={styles.zoomImageContainer}>
                        <Image source={selectedImageSource} style={styles.zoomImage} resizeMode="contain" />
                        <ThemedText style={styles.zoomHint}>タップして閉じる</ThemedText>
                    </View>
                </TouchableOpacity>
            </Modal>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F7FAFC' },
    scrollContent: { padding: 12, paddingBottom: 100 },
    line: { fontSize: 16, lineHeight: 26, fontWeight: '400' },
    lineWrapper: { fontSize: 16, lineHeight: 26, marginBottom: 10, fontWeight: '400' },
    lineWrapperRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline', paddingVertical: 2, marginBottom: 6 },
    cardWrapper: {
        marginBottom: 16,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
            android: { elevation: 2 },
            web: { boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }
        })
    },
    sectionCard: { borderRadius: 20, borderWidth: 1.5, overflow: 'hidden' },
    sectionHeader: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 8 },
    sectionTitle: { fontSize: 17, fontWeight: '700', lineHeight: 26 },
    cardBody: { paddingHorizontal: 20, paddingBottom: 20 },
    pointBox: { marginTop: 12, marginBottom: 6, padding: 18, borderRadius: 20, borderLeftWidth: 6 },
    pointText: { fontSize: 15, lineHeight: 24, color: '#2d3748', fontWeight: '500' },
    imageContainer: { width: '100%', aspectRatio: 1.2, backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: '#edf2f7', padding: 10 },
    markerText: { backgroundColor: '#fff176', paddingHorizontal: 2 },
    avatarFrame: { backgroundColor: '#fff', borderWidth: 2, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
    arrowWrapper: { width: 70, height: 44, alignItems: 'center', justifyContent: 'center', marginHorizontal: 4 },
    smallArrowWrapper: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginHorizontal: 2 },
    orLabel: { position: 'absolute', top: -16, color: '#e74c3c', fontSize: 14, fontWeight: '900', fontStyle: 'italic' },
    arrowLine: { width: '100%', height: 2.5 },
    arrowHead: { position: 'absolute', width: 0, height: 0, borderTopWidth: 8, borderBottomWidth: 8, borderTopColor: 'transparent', borderBottomColor: 'transparent', borderLeftWidth: 0, borderRightWidth: 0 },
    giftIcon: { position: 'absolute', backgroundColor: '#fff', borderRadius: 6, borderWidth: 1.5, padding: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
    backButton: { alignSelf: 'center', marginVertical: 15, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.05)' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' },
    zoomImageContainer: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
    zoomImage: { width: Dimensions.get('window').width * 0.95, height: Dimensions.get('window').height * 0.85 },
    zoomHint: { color: '#fff', marginTop: 20, fontSize: 14 },
    miniPlayer: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 20, borderTopWidth: 1, gap: 40,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4 },
            android: { elevation: 8 },
            web: { boxShadow: '0 -2px 10px rgba(0,0,0,0.05)' }
        }),
    },
    controlButton: { padding: 8 },
    playButton: { padding: 0 },
    titleCard: { backgroundColor: '#ffffff', borderRadius: 12, padding: 16, marginBottom: 16, alignItems: 'center', borderLeftWidth: 6, borderLeftColor: '#3498db', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    titleText: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50', textAlign: 'center' },
});
