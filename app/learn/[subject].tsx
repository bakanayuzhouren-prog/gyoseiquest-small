import { router, useLocalSearchParams } from 'expo-router';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { LEARN_CONTENT } from '@/src/learn';
import { addPoints } from '@/utils/points';

export default function LearnSubjectScreen() {
  const params = useLocalSearchParams<{ subject?: string }>();
  const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;
  // Ensure content is treated as an array (fallback for backward compatibility if file not synced yet)
  const rawContent = subject ? LEARN_CONTENT[subject] : [];
  const contentList = Array.isArray(rawContent) ? rawContent : (rawContent ? [rawContent] : []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(2.0); // Default speed
  const [isPlaying, setIsPlaying] = useState(false);

  // Stop speech when leaving screen
  const { useEffect } = require('react');
  useEffect(() => {
    return () => Speech.stop();
  }, []);

  const currentContent = contentList[currentIndex];
  // const isLastItem = currentIndex >= contentList.length - 1; // Unused in new logic if we loop or stop
  const isLastItem = currentIndex >= contentList.length - 1;

  // Continuous Playback Effect
  useEffect(() => {
    if (isPlaying) {
      const speakCurrent = async () => {
        // Ensure stopped before starting new (though sometimes this clips, usually safer)
        await Speech.stop();

        Speech.speak(currentContent, {
          language: 'ja',
          rate: playbackRate,
          onDone: () => {
            // Delay slightly to feel natural?
            if (isLastItem) {
              setIsPlaying(false);
              addPoints(1);
              alert('学習完了！ +1ポイント');
            } else {
              // Auto-advance
              setCurrentIndex(prev => prev + 1);
              // Also increment read count to allow manual nav if user stops
              setReadCount(prev => prev + 1);
            }
          },
          onError: () => setIsPlaying(false), // Stop if error
        });
      };

      speakCurrent();
    } else {
      Speech.stop();
    }
  }, [currentIndex, isPlaying, playbackRate]); // Restart if speed changes? Yes.


  // Manual Navigation (Next)
  const handleManualNext = () => {
    setIsPlaying(false); // Stop auto-play
    if (isLastItem) {
      addPoints(1);
      alert('学習完了！ +1ポイント');
      router.back();
    } else {
      setCurrentIndex(currentIndex + 1);
      setReadCount(0);
    }
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{subject} ({currentIndex + 1}/{contentList.length})</ThemedText>
      <ThemedText style={styles.content}>{currentContent}</ThemedText>

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
      </ThemedView>

      {/* Play/Stop Button */}
      <Pressable
        style={[styles.playButton, isPlaying ? styles.stopButton : styles.startButton]}
        onPress={handleTogglePlay}
      >
        <ThemedText type="defaultSemiBold" style={{ color: '#fff' }}>
          {isPlaying ? '■ 停止' : '▶ 再生 (連続)'}
        </ThemedText>
      </Pressable>

      <ThemedText style={styles.count}>読んだ回数: {readCount}</ThemedText>

      <Pressable style={isLastItem ? styles.completeButton : styles.nextButton} onPress={handleManualNext}>
        <ThemedText type="defaultSemiBold">{isLastItem ? '完了' : '次へ'}</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
    gap: 16,
  },
  content: {
    lineHeight: 24,
    fontSize: 16,
  },
  count: {
    fontSize: 18,
    textAlign: 'center',
  },
  readButton: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#5A9BD5',
    backgroundColor: '#E9F2FB',
  },
  completeButton: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#28A745',
    backgroundColor: '#D4EDDA',
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
  nextButton: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#E7F1FF',
  },
  backButton: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#666',
  },
});