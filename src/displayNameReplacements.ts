import { applyRolePhrases } from '@/src/rolePhraseReplacements';

export type CharacterMap = { [key: string]: string };

export const defaultCharacterMap: CharacterMap = {
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

/** A〜T 記号置換（第1層） */
export function applyCharacterMapReplacements(
  text: string,
  characterMap: CharacterMap = defaultCharacterMap
): string {
  if (!text) return '';
  let processedText = text;
  Object.entries(defaultCharacterMap).forEach(([original, defaultValue]) => {
    const replacement = characterMap[original] || defaultValue;
    let regex: RegExp;
    if (original === '父') {
      regex = /(?<![「（『［])父(?![母])(?!の(?:[A-Z]|[\uFF21-\uFF3A]))/g;
    } else if (original === '母') {
      regex = /(?<![「（『［])(?<!父)母(?!の(?:[A-Z]|[\uFF21-\uFF3A]))/g;
    } else {
      regex = new RegExp(original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    }
    processedText = processedText.replace(regex, replacement);
  });
  return processedText;
}

/** 役割置換（第2層）＋記号置換（第1層） */
export function applyDisplayNames(
  text: string,
  characterMap: CharacterMap = defaultCharacterMap
): string {
  return applyCharacterMapReplacements(applyRolePhrases(text), characterMap);
}
