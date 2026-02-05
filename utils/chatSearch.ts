import { PIN_CASES } from '../src/pinData';
// @ts-ignore
import { LINE_HISTORY } from '../src/data/lineHistory';
import { LEARN_CONTENT } from '../src/learn';

export type SearchResult = {
    type: 'case' | 'knowledge' | 'memory';
    title: string;
    content: string;
    id?: string;
    category?: string;
    matchType?: 'title' | 'tag' | 'content' | 'keyword';
};

export const searchKnowledge = (query: string): SearchResult[] => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return [];

    const results: SearchResult[] = [];

    // 1. Search Cases (PIN_CASES)
    PIN_CASES.forEach((item) => {
        const titleMatch = item.title.toLowerCase().includes(normalizedQuery);
        const tagsMatch = item.tags.some(tag => tag.toLowerCase().includes(normalizedQuery));

        // Simple content search (stripping HTML tags for better matching would be ideal, but simple includes is a start)
        // We prioritize Title > Tags > Content
        if (titleMatch || tagsMatch) {
            results.push({
                type: 'case',
                title: item.title,
                content: `【判例】${item.title} (${item.category})\nタグ: ${item.tags.join(', ')}`,
                id: item.id,
                matchType: titleMatch ? 'title' : 'tag'
            });
        }
    });

    // 2. Search Knowledge (LEARN_CONTENT)
    // LEARN_CONTENT is { categoryName: string[] }
    Object.entries(LEARN_CONTENT).forEach(([category, items]) => {
        // @ts-ignore
        (items as string[]).forEach((text) => {
            if (text.toLowerCase().includes(normalizedQuery)) {
                results.push({
                    type: 'knowledge',
                    title: category,
                    content: text,
                    category: category,
                    matchType: 'content'
                });
            }
        });
    });

    // 3. Search LINE History (LINE_HISTORY)
    LINE_HISTORY.forEach((chat) => {
        const keywordMatch = chat.keywords.some(k => normalizedQuery.includes(k.toLowerCase())) ||
            chat.message.toLowerCase().includes(normalizedQuery);

        if (keywordMatch) {
            // Anonymize content
            let cleanContent = chat.message;
            const namesToRemove = ['てらしぃ', 'ちばまぞこ', 'ちばみほこ', '寺島さん', '寺島', 'まみさん', '相田理恵'];
            namesToRemove.forEach(name => {
                cleanContent = cleanContent.split(name).join('***');
            });

            results.push({
                type: 'memory',
                title: '過去の会話メモリ',
                content: `「${cleanContent}」`, // Removed speaker attribution and masked names
                id: chat.id,
                matchType: 'keyword'
            });
        }
    });

    // 4. Sort/Rank Results
    // - Prioritize exact matches or title matches
    // - Limit total results

    return results.slice(0, 5); // Return top 5 matches
};
