import { Platform } from 'react-native';

export type GuestbookEntry = {
    id: string;
    username: string;
    avatarId: string; // To show who wrote it
    text: string;
    timestamp: number;
};

// Key prefix
const KEY_PREFIX = 'gq_guestbook_';

/**
 * Get comments for a specific location (e.g., "東京都千代田区")
 */
export const getComments = (location: string): GuestbookEntry[] => {
    if (Platform.OS !== 'web') return [];

    try {
        const key = `${KEY_PREFIX}${location}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Failed to load comments", e);
        return [];
    }
};

/**
 * Add a comment to a location
 */
export const addComment = (location: string, username: string, avatarId: string, text: string): GuestbookEntry[] => {
    if (Platform.OS !== 'web') return [];

    const current = getComments(location);
    const newEntry: GuestbookEntry = {
        id: Date.now().toString(),
        username,
        avatarId,
        text,
        timestamp: Date.now(),
    };

    const updated = [newEntry, ...current]; // Newest first

    try {
        const key = `${KEY_PREFIX}${location}`;
        localStorage.setItem(key, JSON.stringify(updated));
    } catch (e) {
        console.error("Failed to save comment", e);
    }

    return updated;
};
