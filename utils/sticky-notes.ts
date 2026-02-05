import { Platform } from 'react-native';

const STICKY_NOTES_KEY = 'gq_sticky_notes';

/**
 * 付箋データの型
 * { [subject: string]: number[] } 
 * 科目名をキーとし、付箋が貼られた項目のインデックスの配列を保持する
 */
type StickyNotesData = { [subject: string]: number[] };

export const getStickyNotes = (subject: string): number[] => {
    if (Platform.OS === 'web') {
        const stored = localStorage.getItem(STICKY_NOTES_KEY);
        if (!stored) return [];
        try {
            const data: StickyNotesData = JSON.parse(stored);
            return data[subject] || [];
        } catch (e) {
            console.error('Failed to parse sticky notes data', e);
            return [];
        }
    }
    return [];
};

export const toggleStickyNote = (subject: string, index: number): boolean => {
    if (Platform.OS === 'web') {
        const stored = localStorage.getItem(STICKY_NOTES_KEY);
        let data: StickyNotesData = {};
        if (stored) {
            try {
                data = JSON.parse(stored);
            } catch (e) {
                data = {};
            }
        }

        if (!data[subject]) {
            data[subject] = [];
        }

        const currentNotes = data[subject];
        const noteIndex = currentNotes.indexOf(index);
        let isAdded = false;

        if (noteIndex > -1) {
            // 既に存在する場合は削除
            data[subject] = currentNotes.filter(i => i !== index);
            isAdded = false;
        } else {
            // 存在しない場合は追加
            data[subject] = [...currentNotes, index];
            isAdded = true;
        }

        localStorage.setItem(STICKY_NOTES_KEY, JSON.stringify(data));
        return isAdded;
    }
    return false;
};

export const isStickyNoteSet = (subject: string, index: number): boolean => {
    const notes = getStickyNotes(subject);
    return notes.includes(index);
};
