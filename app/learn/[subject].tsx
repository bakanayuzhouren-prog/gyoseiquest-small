import { applyTTSRules } from '@/utils/tts-rules';
import { Link, router, useLocalSearchParams } from 'expo-router';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { characterPlaceholders, defaultCharacterMap, useCharacter } from '@/src/context/CharacterContext';
import { useTheme } from '@/src/context/ThemeContext';
import { LEARN_CONTENT } from '@/src/learn';
import { PIN_CASES } from '@/src/pinData';
import { getLearnNotes, LearnNote, saveLearnNotes } from '@/utils/learn-notes';
import { addPoints } from '@/utils/points';
import { getStickyNotes, toggleStickyNote } from '@/utils/sticky-notes';
import { MaterialIcons } from '@expo/vector-icons';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const LAW_MAP: { [key: string]: string } = {
  '行審法': '/statutes/administrative/appeal',
  '行政不服審査法': '/statutes/administrative/appeal',
  '行手法': '/statutes/administrative/procedure',
  '行政手続法': '/statutes/administrative/procedure',
  '行訴法': '/statutes/administrative/litigation',
  '行政事件訴訟法': '/statutes/administrative/litigation',
  '国賠法': '/statutes/administrative/redress',
  '国家賠償法': '/statutes/administrative/redress',
  '地自法': '/statutes/administrative/autonomy',
  '地方自治法': '/statutes/administrative/autonomy',
  '憲法': '/statutes/constitution',
  '商法': '/statutes/commercial',
  '会社法': '/statutes/commercial',
};

const getCivilPath = (articleNum: number): string => {
  if (articleNum <= 174) return '/statutes/civil/general';
  if (articleNum <= 398) return '/statutes/civil/rights';
  if (articleNum <= 520) return '/statutes/civil/claims_general';
  if (articleNum <= 724) return '/statutes/civil/claims_particular';
  return '/statutes/civil/family';
};

export default function LearnSubjectScreen() {
  const params = useLocalSearchParams<{ subject?: string; index?: string }>();
  const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;
  const initialIndex = parseInt(params.index || '0', 10);
  // Ensure content is treated as an array (fallback for backward compatibility if file not synced yet)
  const rawContent = subject ? (LEARN_CONTENT as any)[subject] : [];
  const contentList = Array.isArray(rawContent) ? rawContent : (rawContent ? [rawContent] : []);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [currentReadCount, setCurrentReadCount] = useState(1); // Counter for the 3 repeats
  const [readCount, setReadCount] = useState(0); // Cumulative total count (optional, but keep for UI)
  const [playbackRate, setPlaybackRate] = useState(2.0); // Default speed
  const [isPlaying, setIsPlaying] = useState(false);
  const [spokenIndex, setSpokenIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [isPriorityMode, setIsPriorityMode] = useState(false);
  const [notes, setNotes] = useState<LearnNote[]>([]);
  const [isCharacterModalVisible, setIsCharacterModalVisible] = useState(false);

  const { characterMap, updateCharacterName, applyCharacterNames } = useCharacter();


  const { theme, colors } = useTheme();

  // Stop speech when leaving screen
  useEffect(() => {
    if (subject) {
      const stickyList = getStickyNotes(subject);
      setIsSticky(stickyList.includes(currentIndex));
      setNotes(getLearnNotes(subject, currentIndex));
    }
  }, [currentIndex, subject]);

  useEffect(() => {
    return () => { Speech.stop(); };
  }, []);

  const handleBasisPress = () => {
    if (!basisText) return;

    // 1. 条文番号を含む場合 (Statute Link)
    // Regex to match Law name and Article number
    // Example: ※行審法25条4項 -> law: 行審法, article: 25
    const match = basisText.match(/※?(.+?)(\d+)条/);
    if (match) {
      const lawName = match[1].trim();
      const articleNumStr = match[2];
      const articleNum = parseInt(articleNumStr, 10);

      let path = LAW_MAP[lawName];
      // Special logic for Civil Law (split into multiple screens)
      if (!path && (lawName === '民法' || lawName.includes('民法'))) {
        path = getCivilPath(articleNum);
      }

      if (path) {
        setIsPlaying(false);
        Speech.stop();
        router.push({
          pathname: path as any,
          params: { q: articleNumStr + '条' }
        });
        return;
      }
    }

    // 2. 判例引用の場合 (Case Link)
    // Example: ※最判昭42.5.24 -> Search in PIN_CASES
    const cleanBasis = basisText.replace('※', '').trim();
    const foundCase = PIN_CASES.find(c => {
      // タイトル、またはコンテンツ内の日付文字列などと一致するか確認
      // コンテンツ内には <h3>朝日訴訟 (最判昭42.5.24)</h3> のように含まれていることが多い
      return c.title.includes(cleanBasis) || c.content.includes(cleanBasis);
    });

    if (foundCase) {
      setIsPlaying(false);
      Speech.stop();
      // Navigate to /pin/[category]/[id]
      router.push(`/pin/${foundCase.category}/${foundCase.id}` as any);
    }
  };

  // 優先モード用のリスト構成
  const displayContentList = isPriorityMode && subject
    ? [
      ...contentList.filter((_, i) => getStickyNotes(subject).includes(i)),
      ...contentList.filter((_, i) => !getStickyNotes(subject).includes(i))
    ]
    : contentList;

  const currentDisplayContent = displayContentList[currentIndex] || '';
  const isLastItem = currentIndex >= displayContentList.length - 1;

  // Extract LINK tag first if present
  const linkMatch = currentDisplayContent.match(/\[\[LINK:(.+?)\]\]/);
  const digDeeperUrl = linkMatch ? linkMatch[1] : null;

  // Remove LINK tag from content for display processing
  const contentToProcess = currentDisplayContent.replace(/\[\[LINK:.+?\]\]/g, '');

  const [mainText, basisText] = contentToProcess.includes('※')
    ? [contentToProcess.split('※')[0], '※' + contentToProcess.split('※')[1]]
    : [contentToProcess, ''];

  const handleOpenDeepDive = () => {
    if (!digDeeperUrl || !subject) return;

    // Parse the ID (question index)
    const questionIndex = parseInt(digDeeperUrl, 10);
    if (isNaN(questionIndex)) return;

    // Navigate to reference page
    router.push({
      pathname: `/learn/reference/[subject]/[id]` as any,
      params: {
        subject: subject,
        id: questionIndex,
        originSubject: subject,
        originId: questionIndex,
        originIndex: currentIndex
      }
    });
  };

  // Continuous Playback Effect
  useEffect(() => {
    if (isPlaying && currentDisplayContent) {
      const speakCurrent = async () => {
        await Speech.stop();
        setSpokenIndex(0);

        const currentMainText = currentDisplayContent.includes('※')
          ? currentDisplayContent.split('※')[0]
          : currentDisplayContent;

        // Strip [[LINK...]] patterns
        let processedText = currentMainText.replace(/\[\[LINK:.*?\]\]/g, '');

        // Apply character name replacements
        processedText = applyCharacterNames(processedText);

        const spokenText = applyTTSRules(processedText);
        Speech.speak(spokenText, {
          language: 'ja',
          rate: playbackRate,
          onBoundary: (event: any) => {
            if (event.charIndex !== undefined) {
              // Use charLength if available to highlight the entire "spoken unit" immediately.
              // If charLength is missing, we still set it to charIndex.
              // To make it feel "faster", we jump to the end of the word being started.
              const length = event.charLength || 1;
              setSpokenIndex(event.charIndex + length);
            }
          },
          onDone: () => {
            setSpokenIndex(currentMainText.length);
            // Wait even less after completion for tighter feedback
            setTimeout(() => {
              if (currentReadCount < 3) {
                setCurrentReadCount(prev => prev + 1);
                setReadCount(prev => prev + 1);
              } else {
                if (isLastItem) {
                  setIsPlaying(false);
                  addPoints(1);
                  alert('学習完了！ +1ポイント');
                  router.back();
                } else {
                  setCurrentIndex(prev => prev + 1);
                  setCurrentReadCount(1);
                  setReadCount(prev => prev + 1);
                }
              }
            }, 50); // Reduced from 100ms
          },
          onError: () => setIsPlaying(false),
        });
      };

      speakCurrent();
    } else {
      Speech.stop();
    }
  }, [isPlaying, currentDisplayContent, playbackRate, currentReadCount, isLastItem, currentIndex, addPoints, router]);


  // Manual Navigation (Next)
  const handleManualNext = () => {
    setIsPlaying(false); // Stop auto-play
    if (isLastItem) {
      addPoints(1);
      alert('学習完了！ +1ポイント');
      router.back();
    } else {
      setCurrentIndex(currentIndex + 1);
      setCurrentReadCount(1);
      setSpokenIndex(0);
    }
  };

  // Manual Navigation (Previous)
  const handleManualPrev = () => {
    setIsPlaying(false); // Stop auto-play
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentReadCount(1);
      setSpokenIndex(0);
    }
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleToggleSticky = () => {
    if (subject) {
      const newState = toggleStickyNote(subject, currentIndex);
      setIsSticky(newState);
    }
  };

  const handleTogglePriorityMode = () => {
    setIsPriorityMode(!isPriorityMode);
    setCurrentIndex(0);
    setCurrentReadCount(1);
    setIsPlaying(false);
  };

  const handleAddNote = () => {
    const newNote: LearnNote = {
      id: Math.random().toString(36).substr(2, 9),
      text: '',
      x: 50, // 初期位置を少し左上に
      y: 50,
      width: 200, // 初期サイズ（横長）
      height: 80, // 高さを少し抑える
    };
    const updated = [...notes, newNote];
    setNotes(updated);
    if (subject) saveLearnNotes(subject, currentIndex, updated);
  };

  const updateNoteText = (id: string, text: string) => {
    const updated = notes.map(n => n.id === id ? { ...n, text } : n);
    setNotes(updated);
    if (subject) saveLearnNotes(subject, currentIndex, updated);
  };

  const updateNotePosition = (id: string, x: number, y: number) => {
    const updated = notes.map(n => n.id === id ? { ...n, x, y } : n);
    setNotes(updated);
    if (subject) saveLearnNotes(subject, currentIndex, updated);
  };

  const updateNoteSize = (id: string, width: number, height: number) => {
    const updated = notes.map(n => n.id === id ? { ...n, width, height } : n);
    setNotes(updated);
    if (subject) saveLearnNotes(subject, currentIndex, updated);
  };

  const deleteNote = (id: string) => {
    if (Platform.OS === 'web') {
      if (!confirm('このメモを削除してもよろしいですか？')) return;
    } else {
      Alert.alert(
        "メモの削除",
        "このメモを削除してもよろしいですか？",
        [
          {
            text: "キャンセル",
            style: "cancel"
          },
          {
            text: "削除", onPress: () => {
              const updated = notes.filter(n => n.id !== id);
              setNotes(updated);
              if (subject) saveLearnNotes(subject, currentIndex, updated);
            }
          }
        ]
      );
      return;
    }
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    if (subject) saveLearnNotes(subject, currentIndex, updated);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ gap: 16, paddingBottom: 100 }} // メモを置くスペースを考慮して下部に余白
          showsVerticalScrollIndicator={false}
        >
          {/* シークバー（ナビゲーター） */}
          <SeekBar
            currentIndex={currentIndex}
            totalCount={displayContentList.length}
            onSeek={(index) => {
              setIsPlaying(false);
              setCurrentIndex(index);
              setCurrentReadCount(1);
              setSpokenIndex(0);
            }}
            colors={colors}
          />

          <ThemedView style={styles.headerRow}>
            <ThemedText type="title">{subject} ({currentIndex + 1}/{displayContentList.length})</ThemedText>
            <ThemedView style={{ flexDirection: 'row', gap: 8, backgroundColor: 'transparent' }}>
              <Pressable
                style={styles.stickyButton}
                onPress={handleAddNote}
              >
                <MaterialIcons name="note-add" size={20} color={colors.text} />
                <ThemedText style={styles.stickyText}>メモ追加</ThemedText>
              </Pressable>
              <Pressable
                style={[styles.stickyButton, isSticky && styles.stickyButtonActive]}
                onPress={handleToggleSticky}
              >
                <MaterialIcons
                  name={isSticky ? "bookmark" : "bookmark-border"}
                  size={20}
                  color={isSticky ? "#FFD700" : colors.text}
                />
                <ThemedText style={[styles.stickyText, isSticky && styles.stickyTextActive]}>付箋</ThemedText>
              </Pressable>

              {/* Character Settings Button */}
              <Pressable
                style={styles.stickyButton}
                onPress={() => setIsCharacterModalVisible(true)}
              >
                <MaterialIcons name="people" size={20} color={colors.text} />
                <ThemedText style={styles.stickyText}>登場人物</ThemedText>
              </Pressable>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.contentContainer}>
            <ThemedText style={styles.content}>
              <ThemedText style={[styles.content, { color: colors.primary, fontWeight: 'bold' }]}>
                {applyCharacterNames(mainText.substring(0, spokenIndex))}
              </ThemedText>
              {applyCharacterNames(mainText.substring(spokenIndex))}
            </ThemedText>
            {basisText ? (
              <Pressable onPress={handleBasisPress}>
                <ThemedText style={[styles.basisText, { color: '#007BFF', textDecorationLine: 'underline' }]}>
                  {basisText}
                </ThemedText>
              </Pressable>
            ) : null}

            {/* Play/Stop Button (Swapped position) */}
            <Pressable
              style={[styles.playButton, isPlaying ? styles.stopButton : styles.startButton]}
              onPress={handleTogglePlay}
            >
              <ThemedText type="defaultSemiBold" style={{ color: '#fff' }}>
                {isPlaying ? '■ 停止' : '▶ 再生 (3回ずつ連続)'}
              </ThemedText>
            </Pressable>
          </ThemedView>

          {/* Speed Controls */}
          <ThemedView style={styles.speedContainer}>
            <ThemedText>速度: </ThemedText>
            {[1.0, 1.5, 2.0, 2.5, 3.0].map((rate) => (
              <Pressable
                key={rate}
                style={[styles.speedButton, playbackRate === rate && styles.speedButtonActive]}
                onPress={() => setPlaybackRate(rate)}
              >
                <ThemedText style={[styles.speedText, playbackRate === rate && styles.speedTextActive]}>
                  x{rate.toFixed(1)}
                </ThemedText>
              </Pressable>
            ))}

            <Pressable
              style={[styles.priorityButton, isPriorityMode && styles.priorityButtonActive]}
              onPress={handleTogglePriorityMode}
            >
              <MaterialIcons
                name={isPriorityMode ? "star" : "star-border"}
                size={18}
                color={isPriorityMode ? "#fff" : colors.text}
              />
              <ThemedText style={[styles.priorityText, isPriorityMode && styles.priorityTextActive]}>付箋優先</ThemedText>
            </Pressable>
          </ThemedView>

          {/* Deep Dive Button (Swapped position) */}
          {digDeeperUrl ? (
            <Pressable style={styles.digDeeperButton} onPress={handleOpenDeepDive}>
              <MaterialIcons
                name={(digDeeperUrl === '54' && subject === '民法総論') ? "brush" : "article"}
                size={20}
                color="#fff"
              />
              <ThemedText style={styles.digDeeperText}>
                {(digDeeperUrl === '54' && subject === '民法総論') ? "絵で覚える" : "もっと深掘る"}
              </ThemedText>
            </Pressable>
          ) : null}

          <ThemedText style={styles.count}>読んだ回数: {readCount} (現在:{currentReadCount}/3)</ThemedText>

          <ThemedView style={styles.navButtons}>
            <Pressable
              style={[styles.prevButton, currentIndex === 0 && styles.disabledButton]}
              onPress={handleManualPrev}
              disabled={currentIndex === 0}
            >
              <ThemedText type="defaultSemiBold" style={currentIndex === 0 ? { color: '#999' } : {}}>前へ</ThemedText>
            </Pressable>

            <Pressable style={isLastItem ? styles.completeButton : styles.nextButton} onPress={handleManualNext}>
              <ThemedText type="defaultSemiBold">{isLastItem ? '完了' : '次へ'}</ThemedText>
            </Pressable>
          </ThemedView>

          <Link href="/learn" replace asChild>
            <Pressable style={StyleSheet.flatten([
              styles.navLinkButton,
              {
                borderColor: '#5A9BD5',
                marginTop: 24,
                marginBottom: 12
              }
            ])}>
              <ThemedText type="defaultSemiBold" style={{ color: '#5A9BD5' }}>科目選択</ThemedText>
            </Pressable>
          </Link>
          <Link href="/" replace asChild>
            <Pressable style={StyleSheet.flatten([
              styles.navLinkButton,
              {
                borderColor: '#757575',
                marginBottom: 40
              }
            ])}>
              <ThemedText type="defaultSemiBold" style={{ color: '#757575' }}>メインメニューへ</ThemedText>
            </Pressable>
          </Link>
        </ScrollView>

        {/* ドラッグ可能なメモ一覧 */}
        {notes.map(note => (
          <DraggableNote
            key={note.id}
            note={note}
            onUpdatePosition={(x, y) => updateNotePosition(note.id, x, y)}
            onUpdateSize={(w, h) => updateNoteSize(note.id, w, h)}
            onUpdateText={(text) => updateNoteText(note.id, text)}
            onDelete={() => deleteNote(note.id)}
            themeColors={colors}
          />
        ))}

        {/* Character Settings Modal */}
        {isCharacterModalVisible && (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }]}>
            <ThemedView style={{ width: '80%', padding: 20, borderRadius: 10, backgroundColor: colors.card, maxHeight: '80%' }}>
              <ThemedText type="subtitle" style={{ marginBottom: 15 }}>登場人物の設定</ThemedText>
              <ScrollView style={{ marginBottom: 15 }}>
                {Object.entries(characterMap).map(([original, current]) => (
                  <View key={original} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <ThemedText style={{ width: 80, textAlign: 'center', fontWeight: 'bold' }}>
                      {defaultCharacterMap[original] || original}
                    </ThemedText>
                    <MaterialIcons name="arrow-forward" size={16} color={colors.text} style={{ marginHorizontal: 5 }} />
                    <TextInput
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: colors.choiceBorder,
                        borderRadius: 5,
                        padding: 8,
                        color: colors.text,
                        backgroundColor: colors.background
                      }}
                      value={current === defaultCharacterMap[original] ? '' : current}
                      placeholder={characterPlaceholders[original]}
                      placeholderTextColor={colors.subText || "#999"}
                      onChangeText={(text) => updateCharacterName(original, text)}
                    />
                  </View>
                ))}
              </ScrollView>
              <Pressable
                style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 5, alignItems: 'center' }}
                onPress={() => setIsCharacterModalVisible(false)}
              >
                <ThemedText style={{ color: '#fff', fontWeight: 'bold' }}>閉じる</ThemedText>
              </Pressable>
            </ThemedView>
          </View>
        )}
      </ThemedView>

    </GestureHandlerRootView>
  );
}

function SeekBar({
  currentIndex,
  totalCount,
  onSeek,
  colors
}: {
  currentIndex: number,
  totalCount: number,
  onSeek: (index: number) => void,
  colors: any
}) {
  const [containerWidth, setContainerWidth] = useState(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (totalCount > 1) {
      progress.value = currentIndex / (totalCount - 1);
    } else {
      progress.value = 0; // Handle single item case
    }
  }, [currentIndex, totalCount]);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (containerWidth > 0) {
        const newProgress = Math.min(Math.max(0, event.x / containerWidth), 1);
        progress.value = newProgress;
        const index = Math.round(newProgress * (totalCount - 1));
        runOnJS(onSeek)(index);
      }
    });

  const tapGesture = Gesture.Tap()
    .onEnd((event) => {
      if (containerWidth > 0) {
        const newProgress = Math.min(Math.max(0, event.x / containerWidth), 1);
        progress.value = newProgress;
        const index = Math.round(newProgress * (totalCount - 1));
        runOnJS(onSeek)(index);
      }
    });

  const animatedBarStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const animatedThumbStyle = useAnimatedStyle(() => ({
    left: `${progress.value * 100}%`,
  }));

  return (
    <ThemedView
      style={styles.seekBarContainer}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <GestureDetector gesture={Gesture.Exclusive(gesture, tapGesture)}>
        <View style={styles.seekBarTrack}>
          <Animated.View style={[styles.seekBarProgress, animatedBarStyle, { backgroundColor: '#007BFF' }]} />
          <Animated.View style={[styles.seekBarThumb, animatedThumbStyle]} />
        </View>
      </GestureDetector>
    </ThemedView>
  );
}

function DraggableNote({ note, onUpdatePosition, onUpdateSize, onUpdateText, onDelete, themeColors }: {
  note: LearnNote,
  onUpdatePosition: (x: number, y: number) => void,
  onUpdateSize: (w: number, h: number) => void,
  onUpdateText: (text: string) => void,
  onDelete: () => void,
  themeColors: any
}) {
  const translateX = useSharedValue(note.x);
  const translateY = useSharedValue(note.y);
  const width = useSharedValue(note.width || 200);
  const height = useSharedValue(note.height || 120);

  const context = useSharedValue({ x: 0, y: 0 });
  const sizeContext = useSharedValue({ w: 0, h: 0 });

  const dragGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    })
    .onEnd(() => {
      onUpdatePosition(translateX.value, translateY.value);
    });

  const resizeGesture = Gesture.Pan()
    .onStart(() => {
      sizeContext.value = { w: width.value, h: height.value };
    })
    .onUpdate((event) => {
      width.value = Math.max(100, event.translationX + sizeContext.value.w);
      height.value = Math.max(60, event.translationY + sizeContext.value.h);
    })
    .onEnd(() => {
      onUpdateSize(width.value, height.value);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
      width: width.value,
      height: height.value,
    };
  });

  return (
    <Animated.View
      style={[styles.floatingNote, animatedStyle, { backgroundColor: '#FFFBE6', borderColor: '#FFD700' }]}
      // @ts-ignore - Web specific context menu
      onContextMenu={(e: any) => {
        e.preventDefault();
        onDelete();
      }}
    >
      <GestureDetector gesture={dragGesture}>
        <View style={{ flex: 1 }}>
          <Pressable onLongPress={onDelete} delayLongPress={800} style={{ flex: 1 }}>
            <TextInput
              style={[styles.noteInput, { color: '#333' }]}
              multiline
              value={note.text}
              onChangeText={onUpdateText}
              placeholder="..."
            />
          </Pressable>
        </View>
      </GestureDetector>

      {/* リサイズハンドル */}
      <GestureDetector gesture={resizeGesture}>
        <View style={styles.resizeHandle}>
          <MaterialIcons name="filter-list" size={16} color="#B8860B" style={{ transform: [{ rotate: '135deg' }] }} />
        </View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  stickyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  stickyButtonActive: {
    borderColor: '#FFD700',
    backgroundColor: '#FFFBE6',
  },
  floatingNote: {
    position: 'absolute',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: 'hidden',
    zIndex: 1, // ボタン(zIndexなし=0)より前面にくる可能性があるため、ボタン側のzIndexを上げる必要がある
  },
  noteInput: {
    fontSize: 14,
    textAlignVertical: 'top',
    flex: 1,
  },
  seekBarContainer: {
    height: 30,
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  seekBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
    width: '100%',
    position: 'relative',
  },
  seekBarProgress: {
    height: '100%',
    borderRadius: 3,
    position: 'absolute',
    left: 0,
  },
  seekBarThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#007BFF',
    position: 'absolute',
    top: -7,
    marginLeft: -10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  resizeHandle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  stickyText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  stickyTextActive: {
    color: '#B8860B',
  },
  memoTextActive: {
    color: '#4A90E2',
  },
  contentContainer: {
    minHeight: 200,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  content: {
    lineHeight: 48,
    fontSize: 32,
    textAlign: 'center',
  },
  basisText: {
    marginTop: 12,
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  count: {
    fontSize: 18,
    textAlign: 'center',
  },
  speedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  speedButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  speedButtonActive: {
    backgroundColor: '#007BFF',
  },
  speedText: {
    fontSize: 14,
    color: '#333',
  },
  speedTextActive: {
    color: '#fff',
  },
  priorityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'transparent',
    marginLeft: 'auto',
  },
  priorityButtonActive: {
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  priorityTextActive: {
    color: '#fff',
  },
  playButton: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: '#28A745',
  },
  stopButton: {
    backgroundColor: '#DC3545',
  },
  navButtons: {
    flexDirection: 'row',
    gap: 12,
    zIndex: 10, // メモ(zIndex: 1)より前面に表示
  },
  prevButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  digDeeperButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF9800', // Orange color for "Dig Deeper"
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  digDeeperText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  nextButton: {
    flex: 2,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#E7F1FF',
    alignItems: 'center',
  },
  completeButton: {
    flex: 2,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#28A745',
    backgroundColor: '#D4EDDA',
    alignItems: 'center',
  },
  disabledButton: {
    borderColor: '#ccc',
    backgroundColor: '#eee',
    opacity: 0.5,
  },
  navLinkButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 16,
    elevation: 5,
  },
  memoInput: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    backgroundColor: 'transparent',
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#007BFF',
  },
});
