import { Platform } from 'react-native';

const LEARN_NOTES_KEY = 'gq_learn_notes_v2'; // バージョンアップに伴いキーを変更

export interface LearnNote {
    id: string;
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * メモデータの型
 * { [subject: string]: { [index: number]: LearnNote[] } }
 */
type LearnNotesData = { [subject: string]: { [index: number]: LearnNote[] } };

export const getLearnNotes = (subject: string, index: number): LearnNote[] => {
    if (Platform.OS === 'web') {
        const stored = localStorage.getItem(LEARN_NOTES_KEY);
        if (!stored) return [];
        try {
            const data: LearnNotesData = JSON.parse(stored);
            return (data[subject] && data[subject][index]) || [];
        } catch (e) {
            console.error('Failed to parse learn notes data', e);
            return [];
        }
    }
    return [];
};

export const saveLearnNotes = (subject: string, index: number, notes: LearnNote[]): void => {
    if (Platform.OS === 'web') {
        const stored = localStorage.getItem(LEARN_NOTES_KEY);
        let data: LearnNotesData = {};
        if (stored) {
            try {
                data = JSON.parse(stored);
            } catch (e) {
                data = {};
            }
        }

        if (!data[subject]) {
            data[subject] = {};
        }

        data[subject][index] = notes;

        localStorage.setItem(LEARN_NOTES_KEY, JSON.stringify(data));
    }
};
