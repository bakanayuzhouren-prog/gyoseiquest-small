import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  applyCharacterMapReplacements,
  applyDisplayNames,
  defaultCharacterMap,
  sanitizeCharacterMap,
  type CharacterMap,
} from '@/src/displayNameReplacements';
import { applyRolePhrases } from '@/src/rolePhraseReplacements';

export { defaultCharacterMap, applyRolePhrases, applyDisplayNames };

interface CharacterContextType {
  characterMap: CharacterMap;
  updateCharacterName: (original: string, newName: string) => void;
  resetToDefaults: () => void;
  applyCharacterNames: (text: string) => string;
}

export const characterPlaceholders: CharacterMap = {
  緒方: 'あなたの身の回りのボス的存在',
  宮田: 'Aの顔色を伺う面倒な人物',
  寺島: 'あなた',
  父: '父（被相続人）',
  母: '母（被相続人の妻）',
  兄弟姉妹: '子の兄弟姉妹',
  小原: 'O（双子）',
  小田: 'P（双子）',
  琴音: 'OPの友人',
  里見: 'R（共有者）',
  菅原: 'S（共有者）',
  橘: 'T（共有者）',
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [characterMap, setCharacterMap] = useState<CharacterMap>(defaultCharacterMap);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedMap = await AsyncStorage.getItem('characterMap');
      if (savedMap) {
        const parsed = sanitizeCharacterMap(JSON.parse(savedMap) as CharacterMap);
        setCharacterMap(parsed);
        // 旧デフォルト（父→J 等）を捨てた結果を永続化
        await AsyncStorage.setItem('characterMap', JSON.stringify(parsed));
      }
    } catch (error) {
      console.error('Failed to load character map', error);
    }
  };

  const saveSettings = async (newMap: CharacterMap) => {
    try {
      await AsyncStorage.setItem('characterMap', JSON.stringify(newMap));
    } catch (error) {
      console.error('Failed to save character map', error);
    }
  };

  const updateCharacterName = (original: string, newName: string) => {
    const newMap = sanitizeCharacterMap({ ...characterMap, [original]: newName });
    setCharacterMap(newMap);
    saveSettings(newMap);
  };

  const resetToDefaults = () => {
    setCharacterMap(defaultCharacterMap);
    saveSettings(defaultCharacterMap);
  };

  const applyCharacterNames = (text: string): string => {
    return applyCharacterMapReplacements(applyRolePhrases(text), characterMap);
  };

  return (
    <CharacterContext.Provider value={{ characterMap, updateCharacterName, resetToDefaults, applyCharacterNames }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
};
