import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_PREFIX = 'qjhide_';

function memKey(subject: string, field: string): string {
  return `${subject}|${field}`;
}

const hiddenMemoryCache = new Map<string, Set<string>>();

function storageKey(subject: string, field: string): string {
  return `${STORAGE_PREFIX}${encodeURIComponent(subject)}|${encodeURIComponent(field)}`;
}

/** 同一セッション内で result などが先にマウントする場合の同期参照用 */
export function peekHiddenHashesSync(subject: string, field: string): Set<string> | null {
  if (!subject || !field) return null;
  const k = memKey(subject, field);
  if (hiddenMemoryCache.has(k)) return hiddenMemoryCache.get(k)!;
  return null;
}

export async function getHiddenHashes(subject: string, field: string): Promise<Set<string>> {
  if (!subject || !field) return new Set();
  const k = memKey(subject, field);
  if (hiddenMemoryCache.has(k)) return hiddenMemoryCache.get(k)!;

  try {
    const raw = await AsyncStorage.getItem(storageKey(subject, field));
    const arr: string[] = raw ? JSON.parse(raw) : [];
    const set = new Set(Array.isArray(arr) ? arr.filter((x) => typeof x === 'string') : []);
    hiddenMemoryCache.set(k, set);
    return set;
  } catch {
    const empty = new Set<string>();
    hiddenMemoryCache.set(k, empty);
    return empty;
  }
}

export async function hideQuestionByHash(subject: string, field: string, textHash: string): Promise<void> {
  if (!subject || !field || !textHash) return;
  const set = await getHiddenHashes(subject, field);
  set.add(textHash);
  hiddenMemoryCache.set(memKey(subject, field), set);
  await AsyncStorage.setItem(storageKey(subject, field), JSON.stringify([...set]));
}

export async function unhideAllInField(subject: string, field: string): Promise<void> {
  if (!subject || !field) return;
  const k = memKey(subject, field);
  hiddenMemoryCache.set(k, new Set());
  await AsyncStorage.removeItem(storageKey(subject, field));
}
