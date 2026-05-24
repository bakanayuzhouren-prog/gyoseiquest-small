/**
 * 深掘り本文中の次を、分割PNG（キー-p1 … -p4）＋各コマ説明に展開する。
 * - [[comic4:deepdiveキー]] を明示指定したとき
 * - [[image:キー]] が COMIC4_REGISTRY の「一枚画像」と一致するとき（見て聞いて覚える・憲法の kenpou/4-230 など）
 */
const COMIC4_TAG_RE = /\[\[comic4:([^\]]+)\]\]/g;

type Comic4Copy = {
  /** コマ1〜4の本文（見出しは **N. …** を含めてよい） */
  paragraphs: [string, string, string, string];
};

/** deepdive の画像キー（拡張子なし・generateDeepdiveImages と一致） */
const COMIC4_REGISTRY: Record<string, Comic4Copy> = {
  'kenpou/4-230': {
    paragraphs: [
      '**1. 基地拡張と反対運動**\n\n在日米軍基地の拡張に反対する住民や学生などの運動が広がり、砂川をめぐる対立が深刻化した段階です。',
      '**2. 衝突と逮捕者**\n\nデモと当局側の衝突が起き、刑事特別法違反などで摘発・逮捕が進む事態になりました。',
      '**3. 衝撃の一審・伊達判決**\n\n東京地方裁判所は、旧安保条約およびそれに基づく刑事特別法が憲法9条に反し無効であるとして、無罪（予備的に免訴）とする判断を示しました。',
      '**4. 最高裁で逆転判決**\n\n最高裁判所は統治行為論などを踏まえ、条約の違憲審査を限定的に扱う方向で判決し、一審とは異なる結論（逆転）となりました。',
    ],
  },
  'kijyutu/gyouseihou/kijyutu-gyouseihou-4': {
    paragraphs: [
      '**1. 基地拡張と反対運動**\n\n在日米軍基地の拡張に反対する住民や学生などの運動が広がり、砂川をめぐる対立が深刻化した段階です。',
      '**2. 衝突と逮捕者**\n\nデモと当局側の衝突が起き、刑事特別法違反などで摘発・逮捕が進む事態になりました。',
      '**3. 衝撃の一審・伊達判決**\n\n東京地方裁判所は、旧安保条約およびそれに基づく刑事特別法が憲法9条に反し無効であるとして、無罪（予備的に免訴）とする判断を示しました。',
      '**4. 最高裁で逆転判決**\n\n最高裁判所は統治行為論などを踏まえ、条約の違憲審査を限定的に扱う方向で判決し、一審とは異なる結論（逆転）となりました。',
    ],
  },
};

/** 先頭 [[image:]] がヒーロー用に丸ごと抜かれないよう、四コマブロック先頭のみ付与 */
const COMIC_FIRST_PANEL_GUARD = '\u200C';

function comic4ExpandedBody(fullKey: string): string {
  const entry = COMIC4_REGISTRY[fullKey];
  if (!entry) return '';
  return entry.paragraphs
    .map(
      (para, i) =>
        `${i === 0 ? COMIC_FIRST_PANEL_GUARD : ''}[[image:${fullKey}-p${i + 1}]]\n\n${para}`,
    )
    .join('\n\n');
}

/** 登録済みの「一枚画像」参照を四コマ＋説明に差し替え（-p1 は触らない） */
function expandRegisteredComic4ImageTags(text: string): string {
  if (!text || !text.includes('[[image:')) return text;
  let out = text;
  for (const fullKey of Object.keys(COMIC4_REGISTRY)) {
    const body = comic4ExpandedBody(fullKey);
    if (!body) continue;
    const base = fullKey.includes('/') ? (fullKey.split('/').pop() ?? fullKey) : fullKey;
    const variants = Array.from(new Set([fullKey, base])).filter(Boolean);
    for (const vk of variants) {
      const escaped = vk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`\\[\\[image:${escaped}\\]\\]`, 'g');
      out = out.replace(re, body);
    }
  }
  return out;
}

export function expandComic4DeepdiveTags(text: string): string {
  if (!text) return text;
  let t = expandRegisteredComic4ImageTags(text);
  if (!t.includes('[[comic4:')) return t;
  return t.replace(COMIC4_TAG_RE, (_full, rawKey: string) => {
    const key = String(rawKey ?? '').trim();
    const body = comic4ExpandedBody(key);
    if (!body) return `[[comic4:${rawKey}]]`;
    return body;
  });
}
