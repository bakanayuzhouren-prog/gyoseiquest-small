
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
    '兄弟姉妹': '兄弟姉妹',
    '祖父母': 'N',
    '小原': 'O',
    '小田': 'P',
    '琴音': 'Q',
    '里見': 'R',
    '菅原': 'S',
    '橘': 'T',
};

export const characterPlaceholders: CharacterMap = {
    '緒方': 'あなたの身の回りのボス的存在',
    '宮田': 'Aの顔色を伺う面倒な人物',
    '寺島': 'あなた',
    '父': '父（被相続人）',
    '母': '母（被相続人の妻）',
    // '子': '子（相続人）',
    '兄弟姉妹': '子の兄弟姉妹',
    '小原': 'O（双子）',
    '小田': 'P（双子）',
    '琴音': 'OPの友人',
    '里見': 'R（共有者）',
    '菅原': 'S（共有者）',
    '橘': 'T（共有者）',
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
                const parsed = JSON.parse(savedMap) as CharacterMap;
                // Legacy migration: stop collapsing 兄弟姉妹 -> M in learn display.
                if (parsed['兄弟姉妹'] === 'M') {
                    parsed['兄弟姉妹'] = '兄弟姉妹';
                }
                setCharacterMap(parsed);
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
            // 「父母」を二重に壊さない（父→J・母→K が連続で JK になるのを防ぐ）
            let regex: RegExp;
            // 条文・引用の「父から認知」等は置換しない（「父」「（父」の直後の父は登場人物ではない）
            if (original === '父') {
                // 「父のJ」のように、役割語の直後にプレースホルダー英字がある場合は置換しない
                regex = /(?<![「（『［])父(?![母])(?!の(?:[A-Z]|[\uFF21-\uFF3A]))/g;
            } else if (original === '母') {
                // 「母のK」（母＝役割、K＝記号）を「KのK」に壊さない
                regex = /(?<![「（『［])(?<!父)母(?!の(?:[A-Z]|[\uFF21-\uFF3A]))/g;
            } else {
                regex = new RegExp(original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            }
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
