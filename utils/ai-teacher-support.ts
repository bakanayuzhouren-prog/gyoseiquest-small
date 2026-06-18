import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = 'gq_ai_teacher_weakness_profile_v1';
const MAX_ITEMS = 80;

export type WeaknessSupportInput = {
  subject: string;
  field: string;
  questionText: string;
  selectedText?: string;
  correctText?: string;
  explanation?: string;
  memo?: string;
  learnKey?: string;
  learnSubject?: string;
  learnField?: string | null;
  learnIndex?: number;
  groupKey?: string;
  groupQuestionCount?: number;
};

export type WeaknessProfileItem = {
  id: string;
  subject: string;
  field: string;
  topic: string;
  reason: string;
  reviewPoint: string;
  mistakeCount: number;
  lastMistakeAt: number;
  questionPreview: string;
  selectedPreview?: string;
  correctPreview?: string;
  learnKey?: string;
  learnSubject?: string;
  learnField?: string | null;
  learnIndex?: number;
  groupKey?: string;
  groupQuestionCount?: number;
};

type WeaknessProfile = Record<string, WeaknessProfileItem>;

function normalizeSpaces(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function compact(value: unknown, limit = 140): string {
  const s = normalizeSpaces(String(value || '').replace(/\[\[image:[^\]]+\]\]/g, ''));
  return s.length > limit ? `${s.slice(0, limit)}...` : s;
}

function simpleHash(value: string): string {
  const s = normalizeSpaces(value);
  let h = 0;
  for (let i = 0; i < Math.min(s.length, 500); i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}

function pickTopic(input: WeaknessSupportInput): string {
  const source = normalizeSpaces([
    input.correctText,
    input.explanation,
    input.memo,
    input.questionText,
  ].filter(Boolean).join(' '));
  const patterns = [
    /(?:第)?[0-9０-９一二三四五六七八九十百千]+条(?:の[0-9０-９一二三四五六七八九十]+)?(?:第?[0-9０-９一二三四五六七八九十]+項)?/g,
    /(?:取消訴訟|審査請求|行政指導|行政処分|国家賠償|損失補償|地方自治|行政手続|不服申立て|執行停止|義務付け|差止め)/g,
    /(?:意思表示|代理|時効|物権変動|登記|抵当権|債務不履行|相殺|詐害行為取消|不法行為|不当利得|賃貸借|売買)/g,
    /(?:人権|違憲審査|表現の自由|信教の自由|平等原則|財産権|司法権|国政調査権|内閣|国会|地方自治)/g,
    /(?:株主総会|取締役|取締役会|監査役|社外取締役|設立|株式|新株予約権|会社分割|合併)/g,
  ];
  for (const re of patterns) {
    const hits = [...source.matchAll(re)].map((m) => m[0]).filter(Boolean);
    if (hits.length > 0) return hits.slice(0, 2).join('・');
  }
  const sentence = source.split(/[。．.!！？?]/).map((s) => s.trim()).find((s) => s.length >= 8);
  return compact(sentence || input.field || input.subject, 28);
}

export function buildWeaknessSupport(input: WeaknessSupportInput): WeaknessProfileItem {
  const topic = pickTopic(input);
  const id = `${input.subject}|${input.field}|${input.learnKey || topic}|${simpleHash(input.questionText)}`;
  const selected = compact(input.selectedText, 96);
  const correct = compact(input.correctText, 96);
  const reason = selected && correct
    ? `選んだ答えと正解の差から、${topic}の要件・効果の結びつきが弱い可能性があります。`
    : `${topic}を問題文からすぐ引き出す練習が必要です。`;
  const reviewPoint = correct
    ? `まず正解肢のキーワード「${correct}」を声に出し、問題文のどの語と対応するか確認しましょう。`
    : `条文・判例・要件・効果を1つの流れで説明できるか確認しましょう。`;
  return {
    id,
    subject: input.subject,
    field: input.field,
    topic,
    reason,
    reviewPoint,
    mistakeCount: 1,
    lastMistakeAt: Date.now(),
    questionPreview: compact(input.questionText, 180),
    selectedPreview: selected || undefined,
    correctPreview: correct || undefined,
    learnKey: input.learnKey,
    learnSubject: input.learnSubject,
    learnField: input.learnField,
    learnIndex: typeof input.learnIndex === 'number' ? input.learnIndex : undefined,
    groupKey: input.groupKey,
    groupQuestionCount: typeof input.groupQuestionCount === 'number' ? input.groupQuestionCount : undefined,
  };
}

async function readProfile(): Promise<WeaknessProfile> {
  try {
    const raw = await AsyncStorage.getItem(PROFILE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export async function recordWeaknessSupport(input: WeaknessSupportInput): Promise<WeaknessProfileItem> {
  const nextItem = buildWeaknessSupport(input);
  const profile = await readProfile();
  const prev = profile[nextItem.id];
  profile[nextItem.id] = prev
    ? {
        ...prev,
        ...nextItem,
        mistakeCount: (prev.mistakeCount || 0) + 1,
        lastMistakeAt: nextItem.lastMistakeAt,
      }
    : nextItem;
  const trimmed = Object.values(profile)
    .sort((a, b) => b.lastMistakeAt - a.lastMistakeAt)
    .slice(0, MAX_ITEMS)
    .reduce<WeaknessProfile>((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(trimmed));
  return trimmed[nextItem.id] || nextItem;
}
