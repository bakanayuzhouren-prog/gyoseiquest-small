/**
 * 模試レイヤの「基礎知識」キーを、見て聞いて覚えるの4部屋へ振り分ける。
 * 原文転載はしない（既存カードの移動のみ）。
 */

export const KISOCHI_LEARN_ROOM_KEYS = ['個人情報', '行政書士法', '戸籍法', '住民基本台帳法'];

/**
 * @param {string} text
 * @param {string} [statuteRef]
 * @returns {string | null}
 */
export function classifyKisochiLearnRoom(text, statuteRef) {
  const hay = `${text || ''} ${statuteRef || ''}`;
  if (/行政書士/.test(hay)) return '行政書士法';
  if (/住民票|住基|住民基本台帳|転入届|転出届|転居届|外国人住民/.test(hay)) return '住民基本台帳法';
  if (/戸籍|嫡出子|婚氏続称/.test(hay)) return '戸籍法';
  if (/個人情報|個情|匿名加工|仮名加工|保有個人|個人識別符号|要配慮個人|個人データ/.test(hay)) {
    return '個人情報';
  }
  return null;
}

function takeArr(obj, key) {
  const v = obj?.[key];
  return Array.isArray(v) ? v : [];
}

/**
 * @param {{
 *   LEARN_CONTENT: Record<string, string[]>,
 *   LEARN_DEEPDIVE: Record<string, string[]>,
 *   LEARN_F_EXPLAIN: Record<string, string[]>,
 *   LEARN_STATUTE_REFS: Record<string, string[]>,
 *   LEARN_SOURCE: Record<string, string[]>,
 *   LEARN_LINKS: Record<string, unknown[]>,
 * }} pack
 */
export function splitKisochiDumpToRooms(pack) {
  const dump = takeArr(pack.LEARN_CONTENT, '基礎知識');
  if (dump.length === 0) return pack;

  const dumpD = takeArr(pack.LEARN_DEEPDIVE, '基礎知識');
  const dumpF = takeArr(pack.LEARN_F_EXPLAIN, '基礎知識');
  const dumpS = takeArr(pack.LEARN_STATUTE_REFS, '基礎知識');
  const dumpSrc = takeArr(pack.LEARN_SOURCE, '基礎知識');

  const keepIdx = [];
  /** @type {Record<string, number[]>} */
  const move = { 個人情報: [], 行政書士法: [], 戸籍法: [], 住民基本台帳法: [] };

  dump.forEach((text, i) => {
    const room = classifyKisochiLearnRoom(text, dumpS[i] || '');
    if (room && move[room]) move[room].push(i);
    else keepIdx.push(i);
  });

  const next = {
    LEARN_CONTENT: { ...pack.LEARN_CONTENT },
    LEARN_DEEPDIVE: { ...pack.LEARN_DEEPDIVE },
    LEARN_F_EXPLAIN: { ...pack.LEARN_F_EXPLAIN },
    LEARN_STATUTE_REFS: { ...pack.LEARN_STATUTE_REFS },
    LEARN_SOURCE: { ...pack.LEARN_SOURCE },
    LEARN_LINKS: pack.LEARN_LINKS,
  };

  const pick = (arr, indices) => indices.map((i) => arr[i] ?? '');

  next.LEARN_CONTENT['基礎知識'] = pick(dump, keepIdx);
  next.LEARN_DEEPDIVE['基礎知識'] = pick(dumpD, keepIdx);
  next.LEARN_F_EXPLAIN['基礎知識'] = pick(dumpF, keepIdx);
  next.LEARN_STATUTE_REFS['基礎知識'] = pick(dumpS, keepIdx);
  next.LEARN_SOURCE['基礎知識'] = pick(dumpSrc, keepIdx);

  for (const room of KISOCHI_LEARN_ROOM_KEYS) {
    const idx = move[room];
    if (!idx.length) continue;
    next.LEARN_CONTENT[room] = [...takeArr(next.LEARN_CONTENT, room), ...pick(dump, idx)];
    next.LEARN_DEEPDIVE[room] = [...takeArr(next.LEARN_DEEPDIVE, room), ...pick(dumpD, idx)];
    next.LEARN_F_EXPLAIN[room] = [...takeArr(next.LEARN_F_EXPLAIN, room), ...pick(dumpF, idx)];
    next.LEARN_STATUTE_REFS[room] = [...takeArr(next.LEARN_STATUTE_REFS, room), ...pick(dumpS, idx)];
    next.LEARN_SOURCE[room] = [...takeArr(next.LEARN_SOURCE, room), ...pick(dumpSrc, idx)];
  }

  for (const key of ['基礎知識', ...KISOCHI_LEARN_ROOM_KEYS]) {
    const c = next.LEARN_CONTENT[key];
    if (!Array.isArray(c)) continue;
    while (next.LEARN_DEEPDIVE[key].length < c.length) next.LEARN_DEEPDIVE[key].push('');
    while (next.LEARN_F_EXPLAIN[key].length < c.length) next.LEARN_F_EXPLAIN[key].push('');
    while (next.LEARN_STATUTE_REFS[key].length < c.length) next.LEARN_STATUTE_REFS[key].push('');
    while (next.LEARN_SOURCE[key].length < c.length) next.LEARN_SOURCE[key].push('');
  }

  return next;
}
