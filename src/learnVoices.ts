import type { SpeechOptions } from 'expo-speech';
import { Platform } from 'react-native';

export type LearnVoiceId = 'default' | 'shonen';

export type LearnSpeechVoice = {
  identifier?: string;
  name?: string;
  language?: string;
};

export type LearnSpeechOptions = Pick<SpeechOptions, 'language' | 'pitch'> & {
  voice?: string;
};

export type LearnVoicePreset = {
  id: LearnVoiceId;
  label: string;
  speechOptions: LearnSpeechOptions;
  sample?: number;
};

export const LEARN_VOICE_PRESETS: LearnVoicePreset[] = [
  {
    id: 'default',
    label: '標準',
    speechOptions: {
      language: 'ja-JP',
      pitch: 1,
    },
  },
  {
    id: 'shonen',
    label: '少年',
    speechOptions: {
      language: 'ja-JP',
      pitch: Platform.OS === 'ios' ? 1.28 : Platform.OS === 'android' ? 1.22 : 1.18,
    },
    sample: require('@/assets/audio/voices/shonen.wav'),
  },
];

export const DEFAULT_LEARN_VOICE_ID: LearnVoiceId = 'default';

export function getLearnVoicePreset(id: LearnVoiceId): LearnVoicePreset {
  return LEARN_VOICE_PRESETS.find((preset) => preset.id === id) ?? LEARN_VOICE_PRESETS[0];
}

export function isLearnVoiceId(value: unknown): value is LearnVoiceId {
  return typeof value === 'string' && LEARN_VOICE_PRESETS.some((preset) => preset.id === value);
}

function includesAny(value: string, needles: string[]): boolean {
  const lower = value.toLowerCase();
  return needles.some((needle) => lower.includes(needle.toLowerCase()));
}

export function resolveLearnVoiceSpeechOptions(
  id: LearnVoiceId,
  voices: LearnSpeechVoice[]
): LearnSpeechOptions {
  const preset = getLearnVoicePreset(id);
  if (id !== 'shonen') return preset.speechOptions;

  const jaVoices = voices.filter((voice) => {
    const lang = voice.language?.toLowerCase() ?? '';
    const name = voice.name?.toLowerCase() ?? '';
    return lang.startsWith('ja') || name.includes('japan') || name.includes('japanese');
  });

  const preferred = jaVoices.find((voice) =>
    includesAny(`${voice.name ?? ''} ${voice.identifier ?? ''}`, [
      'keita',
      'ichiro',
      'male',
      'boy',
      'haruka',
      'nanami',
      'sayaka',
      'kyoko',
    ])
  );
  const fallback = preferred ?? jaVoices[0];

  return {
    ...preset.speechOptions,
    ...(fallback?.identifier ? { voice: fallback.identifier } : {}),
  };
}
