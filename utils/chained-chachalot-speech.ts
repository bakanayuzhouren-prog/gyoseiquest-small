import * as Speech from 'expo-speech';
import type { SpeechOptions } from 'expo-speech';
import { Platform } from 'react-native';

import { CHACHALOT_SPEECH_OPTIONS } from '@/utils/chachalot-tts';

export type ChainedSpeechCallbacks = {
  onLineStart?: (index: number) => void;
  onLineDone?: (index: number) => void;
  onAllDone?: () => void;
  onPlayingChange?: (playing: boolean) => void;
};

export type ChainedSpeechHandle = {
  stop: () => void;
  start: () => void;
};

export type ChainedSpeechOptions = Pick<SpeechOptions, 'language' | 'pitch' | 'rate' | 'voice'>;

/** Web では voices ロード前に speak すると無音になることがある */
export async function warmSpeechVoices(): Promise<void> {
  try {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.speechSynthesis.getVoices();
    }
    await Speech.getAvailableVoicesAsync();
  } catch {
    /* noop */
  }
}

export function stopAllSpeech(): void {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* noop */
    }
  }
  try {
    Speech.stop();
  } catch {
    /* noop */
  }
}

function pickJaVoice(voices: SpeechSynthesisVoice[], voiceUri?: string): SpeechSynthesisVoice | null {
  if (voiceUri) {
    const matched = voices.find((v) => v.voiceURI === voiceUri);
    if (matched) return matched;
  }
  return (
    voices.find((v) => v.lang.startsWith('ja') && v.default) ??
    voices.find((v) => v.lang.startsWith('ja-JP')) ??
    voices.find((v) => v.lang.startsWith('ja')) ??
    null
  );
}

export function createChainedChachalotSpeech(
  lines: string[],
  callbacks: ChainedSpeechCallbacks,
  speechOptions: ChainedSpeechOptions = CHACHALOT_SPEECH_OPTIONS,
  startIndex = 0,
): ChainedSpeechHandle {
  let session = 0;
  let stopped = false;
  let pollInterval: ReturnType<typeof setInterval> | null = null;
  let safetyTimer: ReturnType<typeof setTimeout> | null = null;
  let resumeTimer: ReturnType<typeof setInterval> | null = null;

  const clearGuards = () => {
    if (pollInterval != null) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
    if (safetyTimer != null) {
      clearTimeout(safetyTimer);
      safetyTimer = null;
    }
    if (resumeTimer != null) {
      clearInterval(resumeTimer);
      resumeTimer = null;
    }
  };

  const finishPlayback = () => {
    clearGuards();
    callbacks.onPlayingChange?.(false);
  };

  const stop = () => {
    session += 1;
    stopped = true;
    clearGuards();
    stopAllSpeech();
    finishPlayback();
  };

  const speakIndex = (index: number) => {
    if (stopped || index < 0 || index >= lines.length) return;
    const mySession = session;
    const text = lines[index]?.trim() ?? '';
    if (!text) {
      speakIndex(index + 1);
      return;
    }

    callbacks.onLineStart?.(index);
    callbacks.onPlayingChange?.(true);

    let completionHandled = false;
    let sawSpeaking = false;

    const afterComplete = () => {
      if (completionHandled || mySession !== session) return;
      completionHandled = true;
      clearGuards();
      callbacks.onLineDone?.(index);
      if (index + 1 < lines.length) {
        speakIndex(index + 1);
      } else {
        stopped = true;
        finishPlayback();
        callbacks.onAllDone?.();
      }
    };

    const maxWaitMs = Math.min(
      180_000,
      Math.max(10_000, text.length * 420 + 3_000),
    );

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = speechOptions.language ?? 'ja-JP';
      utter.pitch = speechOptions.pitch ?? 1;
      utter.rate = speechOptions.rate ?? 1;
      const jaVoice = pickJaVoice(synth.getVoices(), speechOptions.voice);
      if (jaVoice) utter.voice = jaVoice;

      utter.onend = () => afterComplete();
      utter.onerror = (ev) => {
        if (ev.error === 'interrupted' || ev.error === 'canceled') return;
        afterComplete();
      };

      pollInterval = setInterval(() => {
        if (mySession !== session) {
          clearGuards();
          return;
        }
        if (synth.speaking || synth.pending) sawSpeaking = true;
        else if (sawSpeaking) afterComplete();
      }, 100);

      safetyTimer = setTimeout(() => afterComplete(), maxWaitMs);
      resumeTimer = setInterval(() => {
        try {
          synth.resume();
        } catch {
          /* noop */
        }
      }, 4_000);

      synth.speak(utter);
      try {
        synth.resume();
      } catch {
        /* noop */
      }
      return;
    }

    Speech.speak(text, {
      ...speechOptions,
      onDone: () => afterComplete(),
      onError: (e) => {
        const msg = (e && (e as Error).message) || String(e);
        if (/interrupted|cancell?ed/i.test(msg)) return;
        if (mySession !== session) return;
        afterComplete();
      },
      onStopped: () => {
        if (mySession !== session) return;
        stop();
      },
    });
  };

  const start = () => {
    if (stopped || lines.length === 0) return;
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.speechSynthesis.getVoices();
    }
    const from = Math.max(0, Math.min(startIndex, lines.length - 1));
    speakIndex(from);
  };

  return { stop, start };
}

export function startChainedChachalotSpeech(
  lines: string[],
  callbacks: ChainedSpeechCallbacks,
  speechOptions?: ChainedSpeechOptions,
  startIndex = 0,
): ChainedSpeechHandle {
  const handle = createChainedChachalotSpeech(lines, callbacks, speechOptions, startIndex);
  handle.start();
  return handle;
}
