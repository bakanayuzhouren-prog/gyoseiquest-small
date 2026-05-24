import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import {
  DEFAULT_LEARN_VOICE_ID,
  getLearnVoicePreset,
  isLearnVoiceId,
  resolveLearnVoiceSpeechOptions,
  type LearnSpeechOptions,
  type LearnSpeechVoice,
  type LearnVoiceId,
  type LearnVoicePreset,
} from '@/src/learnVoices';

type ManualNav = {
  manualPrev: () => void;
  manualNext: () => void;
};

const noopNav: ManualNav = {
  manualPrev: () => {},
  manualNext: () => {},
};

const LEARN_VOICE_STORAGE_KEY = 'learnVoiceId';

export type LearnPlaybackContextValue = {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  playbackRate: number;
  setPlaybackRate: Dispatch<SetStateAction<number>>;
  voiceId: LearnVoiceId;
  setVoiceId: (id: LearnVoiceId) => void;
  voicePreset: LearnVoicePreset;
  voiceSpeechOptions: LearnSpeechOptions;
  spokenIndex: number;
  setSpokenIndex: Dispatch<SetStateAction<number>>;
  /** 学習画面がマウントされているとき true（前へ・次へが有効） */
  learnScreenMounted: boolean;
  setLearnScreenMounted: (v: boolean) => void;
  registerManualNav: (nav: ManualNav) => void;
  togglePlay: () => void;
  manualPrev: () => void;
  manualNext: () => void;
};

const LearnPlaybackContext = createContext<LearnPlaybackContextValue | null>(null);

export function LearnPlaybackProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(2.0);
  const [voiceIdState, setVoiceIdState] = useState<LearnVoiceId>(DEFAULT_LEARN_VOICE_ID);
  const [availableVoices, setAvailableVoices] = useState<LearnSpeechVoice[]>([]);
  const [spokenIndex, setSpokenIndex] = useState(0);
  const [learnScreenMounted, setLearnScreenMountedState] = useState(false);
  const navRef = useRef<ManualNav>(noopNav);

  useEffect(() => {
    const loadVoice = async () => {
      try {
        const saved = await AsyncStorage.getItem(LEARN_VOICE_STORAGE_KEY);
        if (isLearnVoiceId(saved)) {
          setVoiceIdState(saved);
        }
      } catch (error) {
        console.error('Failed to load learn voice setting', error);
      }
    };

    loadVoice();
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadAvailableVoices = async () => {
      for (let attempt = 0; attempt < 5; attempt++) {
        try {
          const voices = await Speech.getAvailableVoicesAsync();
          if (cancelled) return;
          setAvailableVoices(
            voices.map((voice) => ({
              identifier: voice.identifier,
              name: voice.name,
              language: voice.language,
            }))
          );
          if (voices.length > 0) return;
        } catch (error) {
          console.error('Failed to load speech voices', error);
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    };

    loadAvailableVoices();

    return () => {
      cancelled = true;
    };
  }, []);

  const setVoiceId = useCallback((id: LearnVoiceId) => {
    setVoiceIdState(id);
    AsyncStorage.setItem(LEARN_VOICE_STORAGE_KEY, id).catch((error) => {
      console.error('Failed to save learn voice setting', error);
    });
  }, []);

  const setLearnScreenMounted = useCallback((v: boolean) => {
    setLearnScreenMountedState(v);
  }, []);

  const registerManualNav = useCallback((nav: ManualNav) => {
    navRef.current = nav;
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((p) => {
      if (p) Speech.stop();
      return !p;
    });
  }, []);

  const manualPrev = useCallback(() => {
    navRef.current.manualPrev();
  }, []);

  const manualNext = useCallback(() => {
    navRef.current.manualNext();
  }, []);

  const value = useMemo(
    () => ({
      isPlaying,
      setIsPlaying,
      playbackRate,
      setPlaybackRate,
      voiceId: voiceIdState,
      setVoiceId,
      voicePreset: getLearnVoicePreset(voiceIdState),
      voiceSpeechOptions: resolveLearnVoiceSpeechOptions(voiceIdState, availableVoices),
      spokenIndex,
      setSpokenIndex,
      learnScreenMounted,
      setLearnScreenMounted,
      registerManualNav,
      togglePlay,
      manualPrev,
      manualNext,
    }),
    [
      isPlaying,
      playbackRate,
      voiceIdState,
      availableVoices,
      setVoiceId,
      spokenIndex,
      learnScreenMounted,
      setLearnScreenMounted,
      registerManualNav,
      togglePlay,
      manualPrev,
      manualNext,
    ]
  );

  return <LearnPlaybackContext.Provider value={value}>{children}</LearnPlaybackContext.Provider>;
}

export function useLearnPlayback(): LearnPlaybackContextValue {
  const ctx = useContext(LearnPlaybackContext);
  if (!ctx) {
    throw new Error('useLearnPlayback must be used within LearnPlaybackProvider');
  }
  return ctx;
}
