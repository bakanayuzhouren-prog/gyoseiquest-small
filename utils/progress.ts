
import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys
const LOOP_COUNT_PREFIX = 'loop_count_';
const BONUS_REVEALED_KEY = 'bonus_stage_revealed';
const UNLOCK_THRESHOLD = 3; // 3 loops to unlock

/**
 * Get current loop count for a subject/field
 */
export const getLoopCount = async (subject: string, field: string): Promise<number> => {
    try {
        const key = `${LOOP_COUNT_PREFIX}${subject}_${field}`;
        const val = await AsyncStorage.getItem(key);
        return val ? parseInt(val, 10) : 0;
    } catch (e) {
        console.error('Failed to get loop count', e);
        return 0;
    }
};

/**
 * Increment loop count and return new count
 */
export const incrementLoopCount = async (subject: string, field: string): Promise<number> => {
    try {
        const current = await getLoopCount(subject, field);
        const newCount = current + 1;
        const key = `${LOOP_COUNT_PREFIX}${subject}_${field}`;
        await AsyncStorage.setItem(key, String(newCount));
        return newCount;
    } catch (e) {
        console.error('Failed to increment loop count', e);
        return 0;
    }
};

/**
 * Check if bonus stage is unlocked (Count >= 3)
 */
export const isBonusUnlocked = async (subject: string, field: string): Promise<boolean> => {
    const count = await getLoopCount(subject, field);
    return count >= UNLOCK_THRESHOLD;
};

/**
 * Check if the bonus stage reveal animation has been shown
 */
export const hasSeenBonusReveal = async (): Promise<boolean> => {
    try {
        const val = await AsyncStorage.getItem(BONUS_REVEALED_KEY);
        return val === 'true';
    } catch (e) {
        return false;
    }
};

/**
 * Mark bonus stage reveal as seen
 */
export const markBonusRevealSeen = async (): Promise<void> => {
    try {
        await AsyncStorage.setItem(BONUS_REVEALED_KEY, 'true');
    } catch (e) {
        console.error('Failed to mark bonus reveal', e);
    }
};

/**
 * [DEBUG] Force unlock for testing
 */
export const debugForceUnlock = async (subject: string, field: string) => {
    try {
        const key = `${LOOP_COUNT_PREFIX}${subject}_${field}`;
        await AsyncStorage.setItem(key, String(UNLOCK_THRESHOLD));
        await AsyncStorage.removeItem(BONUS_REVEALED_KEY);
    } catch (e) {
        console.error(e);
    }
}

/**
 * [DEBUG] Reset all progress
 */
export const resetProgress = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const appKeys = keys.filter(k => k.startsWith(LOOP_COUNT_PREFIX) || k === BONUS_REVEALED_KEY);
        await AsyncStorage.multiRemove(appKeys);
    } catch (e) {
        console.error(e);
    }
}
