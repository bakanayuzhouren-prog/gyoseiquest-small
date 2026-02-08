import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

// --- Theme Definitions ---
export type ThemeType = 'modern' | 'paper' | 'contrast' | 'premium';

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
        // Modern Tech (Default) - Blue-Gray & Navy
        background: '#EBF8FF', // Same as choiceBg to blend gaps
        text: '#1A202C',
        card: '#EBF8FF', // Match background for uniformity
        primary: '#3182CE',
        choiceBg: '#EBF8FF', // Filled with light blue as requested
        choiceBorder: '#CBD5E0', // Gray border as requested
        choiceText: '#2C5282',
        accent: '#4299E1',
        subText: '#718096'
    },
    paper: {
        // Paper Style - Cream & Dark Gray
        background: '#FDFAEF',
        text: '#333333',
        card: '#FDFDFD',
        primary: '#8D6E63', // Brownish
        choiceBg: '#FCF8E8',
        choiceBorder: '#D7CCC8',
        choiceText: '#4E342E',
        accent: '#A1887F',
        subText: '#5D4037'
    },
    contrast: {
        // High Contrast - White & Black
        background: '#FFFFFF',
        text: '#000000',
        card: '#FFFFFF',
        primary: '#000000',
        choiceBg: '#FFFFFF',
        choiceBorder: '#000000',
        choiceText: '#000000',
        accent: '#000000',
        subText: '#000000'
    },
    premium: {
        // Premium Dark - Cyberpunk/Glassmorphism compatible
        background: '#0F172A', // Deep Navy/Black
        text: '#E2E8F0', // Silver/White
        card: 'rgba(30, 41, 59, 0.7)', // Semi-transparent Dark Blue (needs View support)
        primary: '#06B6D4', // Neon Cyan
        choiceBg: 'rgba(51, 65, 85, 0.5)', // Glassy
        choiceBorder: '#38BDF8', // Bright Blue Border
        choiceText: '#E0F2FE', // Light Blue Text
        accent: '#22D3EE', // Cyan Accent
        subText: '#94A3B8' // Slate Gray
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
