import {
  applyDisplayNames,
  defaultCharacterMap,
  type CharacterMap,
} from '@/src/displayNameReplacements';

/** 第2層：役割名（カスタム不可・図解ノード用） */
export const ROLE_CAST = [
  { pattern: /ダイゴ|連帯債務者A/g, label: '連帯債務者A' },
  { pattern: /ひろゆき|ヒロユキ|連帯債務者B/gi, label: '連帯債務者B' },
  { pattern: /オレンジ大祐|保証人/g, label: '保証人' },
  { pattern: /メーカー/g, label: 'メーカー' },
  { pattern: /譲渡担保設定者/g, label: '譲渡担保設定者' },
  { pattern: /譲渡担保の債権者|譲渡担保権者|譲渡担保債権者/g, label: '譲渡担保の債権者' },
] as const;

/** 物（動産等）— 図解では「動産」として表示 */
export const THING_CAST = [
  { pattern: /フードプロセッサー/g, label: '動産（フードプロセッサー）' },
  { pattern: /低温調理器/g, label: '動産（低温調理器）' },
] as const;

/** 第3層：機関名（そのまま表示・カスタム不可） */
export const INSTITUTION_CAST = ['公庫', 'ベイベー銀行', 'カマダ電気'] as const;

export type CastMemberKind = 'letter' | 'role' | 'institution' | 'thing';

export type CastMember = {
  id: string;
  label: string;
  kind: CastMemberKind;
  customizable: boolean;
  /** 名前設定用：元のスプレッドシート上の名前（緒方 等） */
  originalName?: string;
  /** デフォルト記号（A 等） */
  defaultSymbol?: string;
};

/** 問題文から登場キャストを抽出（表示名ベース） */
export function extractQuestionCast(rawText: string, characterMap: CharacterMap = defaultCharacterMap): CastMember[] {
  const text = (rawText || '').trim();
  if (!text) return [];

  const display = applyDisplayNames(text, characterMap);
  const members: CastMember[] = [];
  const seen = new Set<string>();

  const push = (m: CastMember) => {
    if (seen.has(m.id)) return;
    seen.add(m.id);
    members.push(m);
  };

  for (const inst of INSTITUTION_CAST) {
    if (text.includes(inst) || display.includes(inst)) {
      push({ id: `inst:${inst}`, label: inst, kind: 'institution', customizable: false });
    }
  }

  for (const { pattern, label } of ROLE_CAST) {
    if (pattern.test(text) || display.includes(label)) {
      push({ id: `role:${label}`, label, kind: 'role', customizable: false });
    }
  }

  for (const { pattern, label } of THING_CAST) {
    if (pattern.test(text)) {
      push({ id: `thing:${label}`, label, kind: 'thing', customizable: false });
    }
  }

  if (/譲渡担保の債権者である銀行|債権者である銀行/.test(text)) {
    push({ id: 'role:銀行', label: '銀行', kind: 'role', customizable: false });
  }

  for (const [original, defaultSymbol] of Object.entries(defaultCharacterMap)) {
    if (!text.includes(original)) continue;
    const label = characterMap[original]?.trim() || defaultSymbol;
    push({
      id: `letter:${defaultSymbol}`,
      label,
      kind: 'letter',
      customizable: true,
      originalName: original,
      defaultSymbol,
    });
  }

  return members;
}

/** 関係図用：ノード ID を出現順に（A〜H ＋ 役割ラベル） */
export function extractPersonFlowNodeIds(text: string): string[] {
  const normalized = applyDisplayNames((text || '').replace(/\[\[.*?\]\]/g, '').trim());
  const ids: string[] = [];

  const push = (id: string) => {
    if (!ids.includes(id)) ids.push(id);
  };

  for (const m of normalized.matchAll(/連帯債務者[A-B]|保証人|メーカー|譲渡担保設定者|譲渡担保の債権者|譲渡担保権者|譲渡担保債権者/g)) {
    push(m[0] === '譲渡担保権者' || m[0] === '譲渡担保債権者' ? '譲渡担保の債権者' : m[0]);
  }
  if (/譲渡担保の債権者である銀行|債権者である銀行/.test(normalized)) {
    push('銀行');
  }
  for (const inst of INSTITUTION_CAST) {
    if (normalized.includes(inst)) push(inst);
  }
  for (const m of normalized.matchAll(/\b([A-H])\b/g)) {
    push(m[1]);
  }
  return ids.slice(0, 8);
}

export function hasEnoughCastForDiagram(text: string): boolean {
  const t = (text || '').trim();
  if (!t) return false;
  if (extractPersonFlowNodeIds(t).length >= 2) return true;
  return extractQuestionCast(t).filter((m) => m.kind !== 'thing').length >= 2;
}
