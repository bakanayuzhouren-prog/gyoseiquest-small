/** src/displayNameReplacements.ts と同期（バッチ用） */
import { applyRolePhrases } from './rolePhraseReplacements.mjs';

export const defaultCharacterMap = {
  緒方: 'A',
  宮田: 'B',
  寺島: 'C',
  富永: 'D',
  門脇: 'E',
  秋元: 'F',
  若山: 'G',
  吉富: 'H',
  ヤンノリ: 'I',
  父: 'J',
  母: 'K',
  兄弟姉妹: '兄弟姉妹',
  祖父母: 'N',
  小原: 'O',
  小田: 'P',
  琴音: 'Q',
  里見: 'R',
  菅原: 'S',
  橘: 'T',
};

export function applyCharacterMapReplacements(text, characterMap = defaultCharacterMap) {
  if (!text) return '';
  let processedText = text;
  for (const [original, defaultValue] of Object.entries(defaultCharacterMap)) {
    const replacement = characterMap[original] || defaultValue;
    let regex;
    if (original === '父') {
      regex = /(?<![「（『［])父(?![母])(?!の(?:[A-Z]|[\uFF21-\uFF3A]))/g;
    } else if (original === '母') {
      regex = /(?<![「（『［])(?<!父)母(?!の(?:[A-Z]|[\uFF21-\uFF3A]))/g;
    } else {
      regex = new RegExp(original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    }
    processedText = processedText.replace(regex, replacement);
  }
  return processedText;
}

export function applyDisplayNames(text, characterMap = defaultCharacterMap) {
  return applyCharacterMapReplacements(applyRolePhrases(text), characterMap);
}
