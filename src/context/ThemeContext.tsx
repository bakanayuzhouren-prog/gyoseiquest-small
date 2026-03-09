import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

// --- Theme Definitions ---
export type ThemeType = 'modern' | 'paper' | 'contrast' | 'premium' | 'cyberpunk';

export interface ThemeColors {
    background: string;
    text: string;
    card: string;
    primary: string;
    choiceBg: string;
    choiceBorder: string;
    choiceText: string;
    accent: string;

    subText: string;
    tint?: string;
}

export const Themes: Record<ThemeType, ThemeColors> = {
    modern: {
        // Modern Tech (Default) - 薄いグレーで全画面統一
        background: '#f5f7fa',
        text: '#000000',
        card: '#f5f7fa',
        primary: '#3182CE',
        choiceBg: '#E9F2FB',    // 科目一覧と同色
        choiceBorder: '#5A9BD5',
        choiceText: '#000000',   // 白背景で黒文字
        accent: '#4299E1',
        subText: '#333333'
    },
    paper: {
        // Paper Style - Cream & Dark Gray（薄めで見やすい）
        background: '#FDFAEF',
        text: '#000000',
        card: '#FDFDFD',
        primary: '#8D6E63',
        choiceBg: '#D4C4B0',    // さらに薄いブラウン
        choiceBorder: '#B8A090',
        choiceText: '#000000',   // 白背景で黒文字
        accent: '#A1887F',
        subText: '#333333'
    },
    contrast: {
        // High Contrast - White & Black
        background: '#FFFFFF',
        text: '#000000',
        card: '#FFFFFF',
        primary: '#000000',
        choiceBg: '#1A1A1A',    // 塗りつぶし：黒
        choiceBorder: '#000000',
        choiceText: '#FFFFFF',  // 白文字
        accent: '#000000',
        subText: '#000000'
    },
    premium: {
        // Premium Dark - 薄めシアンで見やすく
        background: '#0F172A',
        text: '#FFFFFF',
        card: 'rgba(30, 41, 59, 0.7)',
        primary: '#06B6D4',
        choiceBg: '#1A7A8C',    // 薄めシアン（暗い背景用）
        choiceBorder: '#38BDF8',
        choiceText: '#E0F2FE',  // 薄い白で目に優しく
        accent: '#22D3EE',
        subText: '#94A3B8'
    },
    cyberpunk: {
        // Cyberpunk - ネオン×ダーク
        background: '#0d0221',
        text: '#E0E7FF',
        card: 'rgba(26, 10, 46, 0.9)',
        primary: '#FF00FF',     // マゼンタ
        choiceBg: 'rgba(0, 255, 255, 0.15)',  // シアンの薄い塗り
        choiceBorder: '#00FFFF',  // ネオンシアン
        choiceText: '#00FFFF',
        accent: '#FF00FF',
        subText: '#A78BFA'
    }
};

type ContextType = {
    theme: ThemeType;
    colors: ThemeColors;
    setTheme: (t: ThemeType) => void;
};

const ThemeContext = createContext<ContextType>({
    theme: 'modern',
    colors: Themes.modern,
    setTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<ThemeType>('modern');

    // Load saved theme on mount
    useEffect(() => {
        if (Platform.OS === 'web') {
            const saved = localStorage.getItem('gq_theme') as ThemeType;
            if (saved && Themes[saved]) {
                setThemeState(saved);
            }
        }
    }, []);

    const setTheme = (t: ThemeType) => {
        setThemeState(t);
        if (Platform.OS === 'web') {
            localStorage.setItem('gq_theme', t);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, colors: Themes[theme], setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
