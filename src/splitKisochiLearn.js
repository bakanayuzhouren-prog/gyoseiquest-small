/**
 * 模試レイヤの「基礎知識」キーを、見て聞いて覚えるの4部屋へ振り分ける。
 * 原文転載はしない（既存カードの移動のみ）。
 */

export const KISOCHI_LEARN_ROOM_KEYS = ['個人情報', '行政書士法', '戸籍法', '住民基本台帳法'];

/** 模試の時事カードを、ぷらすの政・経・社・情報・文章理解へ振り分ける。通常モードのシート限定には使わない。 */
const KISOCHI_TOPIC_ROOM_KEYS = ['政治', '経済', '社会', '情報通信', '文章理解'];

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
  if (/空欄補充|脱文挿入|文章整序|並べ替え問題|文章理解は主張/.test(hay)) return '文章理解';
  if (/標的型攻撃|ランサム|ゼロデイ|スクレイピング|サイバー|偽情報|デジタルタトゥー|AI推進法|AI戦略本部|ハニーポット|ゼロトラスト|LANは|広域のネットワークはWAN/.test(hay)) {
    return '情報通信';
  }
  if (/オンブズマン|機関委任事務|地方分権|集団的自衛|平和安全法制|連邦大統領|臨時行政調査会|行政改革では/.test(hay)) {
    return '政治';
  }
  if (/日本銀行|発券銀行|プラザ合意|産業の空洞化|神武景気|なべ底|国民所得倍増|消費税は1989|買いオペ|高度成長期の景気/.test(hay)) {
    return '経済';
  }
  if (/相対的貧困|生活保護|特定技能|カスハラ|障害者差別|空き家|生物多様性|気候変動|住宅宿泊|管理不全空家/.test(hay)) {
    return '社会';
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
  const move = {
    個人情報: [],
    行政書士法: [],
    戸籍法: [],
    住民基本台帳法: [],
    政治: [],
    経済: [],
    社会: [],
    情報通信: [],
    文章理解: [],
  };

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

  const rooms = [...KISOCHI_LEARN_ROOM_KEYS, ...KISOCHI_TOPIC_ROOM_KEYS];
  for (const room of rooms) {
    const idx = move[room] || [];
    if (!idx.length) continue;
    const existing = new Set(takeArr(next.LEARN_CONTENT, room).map((text) => String(text || '').replace(/\s+/g, '')));
    const fresh = idx.filter((i) => !existing.has(String(dump[i] || '').replace(/\s+/g, '')));
    if (!fresh.length) continue;
    next.LEARN_CONTENT[room] = [...takeArr(next.LEARN_CONTENT, room), ...pick(dump, fresh)];
    next.LEARN_DEEPDIVE[room] = [...takeArr(next.LEARN_DEEPDIVE, room), ...pick(dumpD, fresh)];
    next.LEARN_F_EXPLAIN[room] = [...takeArr(next.LEARN_F_EXPLAIN, room), ...pick(dumpF, fresh)];
    next.LEARN_STATUTE_REFS[room] = [...takeArr(next.LEARN_STATUTE_REFS, room), ...pick(dumpS, fresh)];
    next.LEARN_SOURCE[room] = [...takeArr(next.LEARN_SOURCE, room), ...pick(dumpSrc, fresh)];
  }

  for (const key of ['基礎知識', ...rooms]) {
    const c = next.LEARN_CONTENT[key];
    if (!Array.isArray(c)) continue;
    while (next.LEARN_DEEPDIVE[key].length < c.length) next.LEARN_DEEPDIVE[key].push('');
    while (next.LEARN_F_EXPLAIN[key].length < c.length) next.LEARN_F_EXPLAIN[key].push('');
    while (next.LEARN_STATUTE_REFS[key].length < c.length) next.LEARN_STATUTE_REFS[key].push('');
    while (next.LEARN_SOURCE[key].length < c.length) next.LEARN_SOURCE[key].push('');
  }

  return next;
}
