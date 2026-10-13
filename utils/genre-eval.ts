import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'gq_genre_eval_v1';
const MAX_ATTEMPTS = 480;

export const GENRE_ORDER = [
  '基礎法学',
  '憲法',
  '行政法・総論',
  '行政法・行政手続法',
  '行政法・行政不服審査法',
  '行政法・行政事件訴訟法',
  '行政法・国家賠償',
  '行政法・地方自治',
  '行政法・総合',
  '民法・総則',
  '民法・物権',
  '民法・債権総論',
  '民法・債権各論',
  '民法・家族法',
  '商法・会社法',
  '多肢選択',
  '記述',
  '基礎知識',
] as const;

export type GenreName = (typeof GENRE_ORDER)[number];

type GenreAttempt = {
  genre: string;
  correct: boolean;
  at: number;
};

export function genreKey(subject?: string, field?: string): string {
  if (subject === '多肢選択') return '多肢選択';
  if (subject === '記述') return '記述';
  if (subject === '基礎法学') return '基礎法学';
  if (subject === '憲法') return '憲法';
  if (subject === '商法・会社法') return '商法・会社法';
  if (subject === '基礎知識') return '基礎知識';
  if (subject === '行政法') {
    if (field === '行政手続法') return '行政法・行政手続法';
    if (field === '行政不服審査法') return '行政法・行政不服審査法';
    if (field === '行政事件訴訟法') return '行政法・行政事件訴訟法';
    if (field === '国家賠償法・損失訴訟') return '行政法・国家賠償';
    if (field === '地方自治法') return '行政法・地方自治';
    if (field === '行政法総合') return '行政法・総合';
    return '行政法・総論';
  }
  if (subject === '民法') {
    if (field === '民法物権') return '民法・物権';
    if (field === '債権総論') return '民法・債権総論';
    if (field === '債権各論') return '民法・債権各論';
    if (field === '家族法') return '民法・家族法';
    return '民法・総則';
  }
  return subject || '基礎法学';
}

async function readAttempts(): Promise<GenreAttempt[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((item) => item && typeof item.genre === 'string') : [];
  } catch {
    return [];
  }
}

export async function recordGenreAttempt(subject: string | undefined, field: string | undefined, correct: boolean): Promise<void> {
  if (!subject) return;
  const genre = genreKey(subject, field);
  const attempts = await readAttempts();
  attempts.push({ genre, correct, at: Date.now() });
  const trimmed = attempts.slice(-MAX_ATTEMPTS);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
}

export type GenreSeries = {
  genre: string;
  attempts: number;
  correct: number;
  rate: number | null;
  /** 時系列の正答率。折れ線の点。 */
  points: number[];
};

function bucketRates(rows: GenreAttempt[]): number[] {
  if (rows.length === 0) return [];
  const size = rows.length <= 8 ? 1 : Math.ceil(rows.length / 8);
  const points: number[] = [];
  for (let i = 0; i < rows.length; i += size) {
    const slice = rows.slice(i, i + size);
    const hit = slice.filter((row) => row.correct).length;
    points.push(Math.round((hit / slice.length) * 100));
  }
  return points.slice(-8);
}

export async function loadGenreSeries(): Promise<GenreSeries[]> {
  const attempts = await readAttempts();
  return GENRE_ORDER.map((genre) => {
    const rows = attempts.filter((item) => item.genre === genre);
    const correct = rows.filter((item) => item.correct).length;
    return {
      genre,
      attempts: rows.length,
      correct,
      rate: rows.length > 0 ? Math.round((correct / rows.length) * 100) : null,
      points: bucketRates(rows),
    };
  });
}
