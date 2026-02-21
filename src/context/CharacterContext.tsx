
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type CharacterMap = { [key: string]: string };

interface CharacterContextType {
    characterMap: CharacterMap;
    updateCharacterName: (original: string, newName: string) => void;
    resetToDefaults: () => void;
    applyCharacterNames: (text: string) => string;
}

export const defaultCharacterMap: CharacterMap = {
    '緒方': 'A',
    '宮田': 'B',
    '寺島': 'C',
    '富永': 'D',
    '門脇': 'E',
    '秋元': 'F',
    '若山': 'G',
    '吉富': 'H',
    'ヤンノリ': 'I',
    '父': 'J',
    '母': 'K',
    // '子': 'L',
    '兄弟姉妹': 'M',
    '祖父母': 'N',
};

export const characterPlaceholders: CharacterMap = {
    '緒方': 'あなたの身の回りのボス的存在',
    '宮田': 'Aの顔色を伺う面倒な人物',
    '寺島': 'あなた',
    '父': '父（被相続人）',
    '母': '母（被相続人の妻）',
    // '子': '子（相続人）',
    '兄弟姉妹': '子の兄弟姉妹',
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
                setCharacterMap(JSON.parse(savedMap));
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
        const newMap = { ...characterMap, [original]: newName };
        setCharacterMap(newMap);
        saveSettings(newMap);
    };

    const resetToDefaults = () => {
        setCharacterMap(defaultCharacterMap);
        saveSettings(defaultCharacterMap);
    };

    const applyCharacterNames = (text: string): string => {
        if (!text) return '';
        let processedText = text;
        Object.entries(defaultCharacterMap).forEach(([original, defaultValue]) => {
            const userReplacement = characterMap[original];
            const replacement = userReplacement || defaultValue;
            // Global replace
            const regex = new RegExp(original, 'g');
            processedText = processedText.replace(regex, replacement);
        });
        return processedText;
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
