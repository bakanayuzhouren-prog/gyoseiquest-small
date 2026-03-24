import { Platform } from 'react-native';

/**
 * ちゃちゃロット読み上げ用。やや高めのピッチ＋ゆっくりめで「かわいい」寄りにする。
 * expo-speech: pitch / rate とも 1.0 が標準。
 */
export const CHACHALOT_SPEECH_OPTIONS = {
  language: 'ja-JP' as const,
  pitch: Platform.OS === 'web' ? 1.22 : 1.3,
  rate: Platform.OS === 'ios' ? 0.94 : Platform.OS === 'android' ? 0.92 : 0.95,
};
