import { applyRolePhrases } from '@/src/rolePhraseReplacements';

export type CharacterMap = { [key: string]: string };

/**
 * 登場人物の既定表示名。
 * 父・母・祖父母は日常語でも出るため、1文字アルファベット（J/K/N）にはしない。
 * （「日本人父」→「日本人J」のような文崩れを防ぐ）
 */
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
  父: '父',
  母: '母',
  兄弟姉妹: '兄弟姉妹',
  祖父母: '祖父母',
  小原: 'O',
  小田: 'P',
  琴音: 'Q',
  里見: 'R',
  菅原: 'S',
  橘: 'T',
};

/** 旧デフォルトの1文字記号（文を壊すので自動置換しない／設定移行で捨てる） */
const LEGACY_BARE_LETTER_DEFAULTS: Readonly<Record<string, string>> = {
  父: 'J',
  母: 'K',
  祖父母: 'N',
  兄弟姉妹: 'M',
};

function isBareLatinLetter(value: string): boolean {
  return /^[A-Za-zＡ-Ｚａ-ｚ]$/u.test(String(value || '').trim());
}

/**
 * AsyncStorage に残った旧デフォルト（父→J 等）を安全な値へ直す。
 * ユーザーが意図して付けた2文字以上の名前は残す。
 */
export function sanitizeCharacterMap(map: CharacterMap | null | undefined): CharacterMap {
  const next: CharacterMap = { ...defaultCharacterMap, ...(map || {}) };
  for (const [key, legacy] of Object.entries(LEGACY_BARE_LETTER_DEFAULTS)) {
    const current = next[key];
    if (current === legacy || isBareLatinLetter(current) || current == null || current === '') {
      next[key] = defaultCharacterMap[key];
    }
  }
  return next;
}

/** A〜T 記号置換（第1層） */
export function applyCharacterMapReplacements(
  text: string,
  characterMap: CharacterMap = defaultCharacterMap
): string {
  if (!text) return '';
  let processedText = text;
  Object.entries(defaultCharacterMap).forEach(([original, defaultValue]) => {
    const replacement = characterMap[original] || defaultValue;
    // 父・母・祖父母を1文字アルファベットにすると「日本人J」等になるのでスキップ
    if (
      (original === '父' || original === '母' || original === '祖父母' || original === '兄弟姉妹') &&
      (replacement === original || isBareLatinLetter(replacement))
    ) {
      return;
    }
    let regex: RegExp;
    if (original === '父') {
      // 日本人父・外国人父・父母・父親 などは置換しない
      regex =
        /(?<![「（『［人日外養実義継祖伯叔従])父(?![母子親系権方])(?!の(?:[A-Z]|[\uFF21-\uFF3A]))/g;
    } else if (original === '母') {
      regex =
        /(?<![「（『［人日外養実義継祖伯叔従父])母(?![子親系権方])(?!の(?:[A-Z]|[\uFF21-\uFF3A]))/g;
    } else if (original === '祖父母') {
      regex = /(?<![「（『［])祖父母(?!の(?:[A-Z]|[\uFF21-\uFF3A]))/g;
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
