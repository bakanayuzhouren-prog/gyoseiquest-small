/**
 * 見て聞いて覚えるカード本文の「憲法19条・21条・23条」などをクリック可能な条文リンクに分割し、
 * STATUTES から本文を解決する。
 */

export type LearnStatuteLinkSeg =
  | { kind: 'plain'; text: string }
  | {
      kind: 'statute';
      /** 画面に出す語句（例: 憲法19条 / 21条） */
      label: string;
      lawName: string;
      articleNum: number;
      articleOf?: number;
      paragraphNum?: number;
    };

const LAW_ALT =
  '憲法|民法|商法|会社法|行政手続法|行手法|行政不服審査法|行審法|行政事件訴訟法|行訴法|国家賠償法|国賠法|地方自治法|地自法';

const ARTICLE_TOKEN_RE = new RegExp(
  `(?:(${LAW_ALT}))?` +
    `([0-9０-９]{1,4})条` +
    `(?:の([0-9０-９]+))?` +
    `(?:第?([0-9０-９]+)項)?`,
  'g',
);

const LINK_SEP_RE = /^[・･、,／/\s]*$/;

function toHalfWidthDigits(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function toKanjiArticle(n: number): string {
  const d = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  if (n <= 0) return '';
  if (n < 10) return d[n];
  if (n === 10) return '十';
  if (n < 20) return '十' + d[n - 10];
  if (n < 100) return d[Math.floor(n / 10)] + '十' + d[n % 10];
  if (n < 1000) return d[Math.floor(n / 100)] + '百' + toKanjiArticle(n % 100);
  return d[Math.floor(n / 1000)] + '千' + toKanjiArticle(n % 1000);
}

/** 漢数字の条タイトル接頭（第十九条 / 第百十九条） */
export function articleTitlePrefixes(articleNum: number): string[] {
  const main = `第${toKanjiArticle(articleNum)}条`;
  const alts = [main];
  if (articleNum >= 100 && articleNum < 200) {
    alts.push(`第百${toKanjiArticle(articleNum % 100)}条`);
  }
  return alts;
}

export type StatuteBucketKey =
  | 'kenpo'
  | 'gyote'
  | 'gyoshin'
  | 'gyoso'
  | 'kokubai'
  | 'jichi'
  | 'sho_kai'
  | 'minpo_sosoku'
  | 'minpo_bukken'
  | 'minpo_saiken_soron'
  | 'minpo_saiken_kakuron'
  | 'minpo_kazoku';

export function lawNameToStatuteBucket(lawName: string, articleNum: number): StatuteBucketKey | null {
  const n = lawName.trim();
  if (n === '憲法') return 'kenpo';
  if (n === '行政手続法' || n === '行手法') return 'gyote';
  if (n === '行政不服審査法' || n === '行審法') return 'gyoshin';
  if (n === '行政事件訴訟法' || n === '行訴法') return 'gyoso';
  if (n === '国家賠償法' || n === '国賠法') return 'kokubai';
  if (n === '地方自治法' || n === '地自法') return 'jichi';
  if (n === '商法' || n === '会社法') return 'sho_kai';
  if (n === '民法' || n.includes('民法')) {
    if (articleNum <= 174) return 'minpo_sosoku';
    if (articleNum <= 398) return 'minpo_bukken';
    if (articleNum <= 520) return 'minpo_saiken_soron';
    if (articleNum <= 724) return 'minpo_saiken_kakuron';
    return 'minpo_kazoku';
  }
  return null;
}

/**
 * プレーン文を条文リンク候補に分割。
 * 「憲法19条・21条・23条」のように法令名が先頭だけでも、中黒等で続く条は同一法令を引き継ぐ。
 */
export function splitPlainByStatuteRefs(text: string): LearnStatuteLinkSeg[] {
  if (!text) return [];
  const out: LearnStatuteLinkSeg[] = [];
  let lastIndex = 0;
  let lastLaw = '';
  let lastMatchEnd = -1;
  ARTICLE_TOKEN_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = ARTICLE_TOKEN_RE.exec(text)) !== null) {
    const full = m[0];
    const lawRaw = m[1] || '';
    const art = parseInt(toHalfWidthDigits(m[2] || ''), 10);
    const ofRaw = m[3] ? parseInt(toHalfWidthDigits(m[3]), 10) : undefined;
    const paraRaw = m[4] ? parseInt(toHalfWidthDigits(m[4]), 10) : undefined;
    if (!art || Number.isNaN(art)) continue;

    let lawName = lawRaw;
    if (!lawName) {
      const between = lastMatchEnd >= 0 ? text.slice(lastMatchEnd, m.index) : '';
      if (lastLaw && LINK_SEP_RE.test(between)) {
        lawName = lastLaw;
      } else {
        continue;
      }
    }

    if (m.index > lastIndex) {
      out.push({ kind: 'plain', text: text.slice(lastIndex, m.index) });
    }
    out.push({
      kind: 'statute',
      label: full,
      lawName,
      articleNum: art,
      articleOf: ofRaw,
      paragraphNum: paraRaw,
    });
    lastLaw = lawName;
    lastMatchEnd = m.index + full.length;
    lastIndex = lastMatchEnd;
  }
  if (lastIndex < text.length) {
    out.push({ kind: 'plain', text: text.slice(lastIndex) });
  }
  return out.length ? out : [{ kind: 'plain', text }];
}

export function resolveStatuteArticlesFromBucket(
  statutes: Array<{ title: string; content: string }> | undefined,
  articleNum: number,
  opts?: { articleOf?: number; paragraphNum?: number }
): Array<{ title: string; content: string }> {
  if (!statutes?.length) return [];
  const prefixes = articleTitlePrefixes(articleNum).map((p) =>
    opts?.articleOf ? `${p}の${toKanjiArticle(opts.articleOf)}` : p
  );

  const matched = statutes.filter((st) => {
    const t = (st.title || '').trim();
    return prefixes.some((p) => t === p || t.startsWith(`${p} `) || t.startsWith(`${p}　`) || t.startsWith(`${p}第`));
  });

  if (!matched.length) return [];

  if (opts?.paragraphNum != null) {
    const kou = `第${opts.paragraphNum}項`;
    const kouExact = matched.filter((st) => (st.title || '').includes(kou));
    if (kouExact.length) return kouExact;
  }

  return matched;
}

export function formatResolvedStatutesForModal(
  items: Array<{ title: string; content: string }>
): string {
  return items
    .map((st) => {
      const title = (st.title || '').trim();
      const body = (st.content || '').trim();
      if (!title) return body;
      if (!body) return `**${title}**`;
      return `**${title}**\n\n${body}`;
    })
    .filter(Boolean)
    .join('\n\n');
}
