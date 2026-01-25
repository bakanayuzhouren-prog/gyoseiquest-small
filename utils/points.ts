import { Platform } from 'react-native';

const POINTS_KEY = 'gq_user_points';

export const getPoints = (): number => {
    if (Platform.OS === 'web') {
        const stored = localStorage.getItem(POINTS_KEY);
        return stored ? parseInt(stored, 10) : 0;
    }
    return 0; // Fallback for native/SSR if needed, or implement AsyncStorage
};

export const addPoints = (amount: number): number => {
    if (Platform.OS === 'web') {
        const current = getPoints();
        const newVal = current + amount;
        localStorage.setItem(POINTS_KEY, newVal.toString());
        return newVal;
    }
    return 0;
};
