import * as Speech from 'expo-speech';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

type ManualNav = {
  manualPrev: () => void;
  manualNext: () => void;
};

const noopNav: ManualNav = {
  manualPrev: () => {},
  manualNext: () => {},
};

export type LearnPlaybackContextValue = {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  playbackRate: number;
  setPlaybackRate: Dispatch<SetStateAction<number>>;
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
  const [spokenIndex, setSpokenIndex] = useState(0);
  const [learnScreenMounted, setLearnScreenMountedState] = useState(false);
  const navRef = useRef<ManualNav>(noopNav);

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
