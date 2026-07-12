import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STUDY_LEVEL_KEY = 'studyLevel';

/** 質問モード・学習の深さ */
export type StudyLevel = 'beginner' | 'intermediate' | 'advanced';

export const STUDY_LEVELS: StudyLevel[] = ['beginner', 'intermediate', 'advanced'];

export const STUDY_LEVEL_LABEL: Record<StudyLevel, string> = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級',
};

export const STUDY_LEVEL_HINT: Record<StudyLevel, string> = {
  beginner: '勉強を始めて間もなく、過去問を1〜2周くらいの人向け',
  intermediate: '模試などおよそ150点前後で伸び悩んでいる人向け',
  advanced: '模試で合格点〜170点以上。確実に合格を狙う人向け',
};

function isStudyLevel(v: string | null): v is StudyLevel {
  return v === 'beginner' || v === 'intermediate' || v === 'advanced';
}

type StudyLevelContextType = {
  studyLevel: StudyLevel;
  setStudyLevel: (level: StudyLevel) => void;
};

const StudyLevelContext = createContext<StudyLevelContextType | null>(null);

export function StudyLevelProvider({ children }: { children: React.ReactNode }) {
  const [studyLevel, setState] = useState<StudyLevel>('beginner');

  useEffect(() => {
    (async () => {
      try {
        const val = await AsyncStorage.getItem(STUDY_LEVEL_KEY);
        if (isStudyLevel(val)) setState(val);
      } catch (_) {
        /* keep default */
      }
    })();
  }, []);

  const setStudyLevel = useCallback(async (level: StudyLevel) => {
    setState(level);
    try {
      await AsyncStorage.setItem(STUDY_LEVEL_KEY, level);
    } catch (_) {
      /* ignore */
    }
  }, []);

  return (
    <StudyLevelContext.Provider value={{ studyLevel, setStudyLevel }}>
      {children}
    </StudyLevelContext.Provider>
  );
}

export function useStudyLevel() {
  const ctx = useContext(StudyLevelContext);
  if (!ctx) {
    return {
      studyLevel: 'beginner' as StudyLevel,
      setStudyLevel: (_: StudyLevel) => {},
    };
  }
  return ctx;
}
