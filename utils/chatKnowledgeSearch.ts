import { KISO_HOUGAKU_SUMMARY_MARKDOWN } from '@/src/content/kisoHougakuSummary';
import { TEITOUKEN_TEXTBOOK_MARKDOWN } from '@/src/content/teitoukenTextbookMarkdown';
import { CHAT_MARKDOWN_CHUNKS } from '@/src/generated/chatMarkdownChunks';
import { PIN_CASES } from '@/src/pinData';
import { LEARN_CONTENT, LEARN_DEEPDIVE } from '@/src/learnExports';
// @ts-ignore
import { LINE_HISTORY } from '@/src/data/lineHistory';

/** chatSearch.ts 互換 */
export type SearchResult = {
  type: 'case' | 'knowledge' | 'memory';
  title: string;
  content: string;
  id?: string;
  category?: string;
  matchType?: 'title' | 'tag' | 'content' | 'keyword';
};

export type ScoredKnowledgeChunk = {
  source: string;
  title: string;
  text: string;
  score: number;
};

const STATUTE_LAW_LABEL: Record<string, string> = {
  gyote: '行政手続法',
  gyoshin: '行政不服審査法',
  gyoso: '行政事件訴訟法',
  jichi: '地方自治法',
  kokubai: '国家賠償法',
  minpo_sosoku: '民法（総則）',
  minpo_bukken: '民法（物権）',
  minpo_saiken_soron: '民法（債権総論）',
  minpo_saiken_kakuron: '民法（債権各論）',
  minpo_kazoku: '民法（親族・相続）',
  sho_kai: '商法・会社法',
  kenpo: '日本国憲法',
};

/** 略称・俗称 → 検索語に足す（キーは normalize 後の想定文言に近づける） */
const PHRASE_ALIASES: [string, string[]][] = [
  ['行手法', ['行政手続法']],
  ['行訴法', ['行政事件訴訟法']],
  ['行審法', ['行政不服審査法']],
  ['国賠法', ['国家賠償法']],
  ['国賠', ['国家賠償']],
  ['自治法', ['地方自治法']],
  ['手続法', ['行政手続法']],
  ['取消訴訟', ['行政事件訴訟法']],
  ['抗告訴訟', ['行政事件訴訟法']],
  ['当事者訴訟', ['行政事件訴訟法']],
  ['民衆訴訟', ['行政事件訴訟法']],
  ['審査請求', ['行政不服審査法']],
  ['執行停止', ['行政不服審査法', '行政事件訴訟法']],
  ['信義則', ['信義則', '信義']],
  ['公序良俗', ['公序良俗']],
  ['悪意の受益', ['悪意の受益者']],
  ['抵抗権', ['抵抗権']],
  ['比例代表', ['比例代表']],
  ['朝日', ['朝日訴訟', '生活保護']],
  ['堀木', ['堀木訴訟']],
  ['米軍基地', ['日米地位協定', '基地']],
];

/** 質問語に一致したとき必ずコンテキスト先頭に載せる短い論点ガイド（判例タグだけでは足りない論点用） */
const CHAT_TOPIC_BRIEFS: { triggers: string[]; title: string; text: string }[] = [
  {
    triggers: ['理由の提示', '理由提示', '処分の理由を示す', '処分理由', '示さなければならない理由'],
    title: '論点ガイド：理由の提示（行政手続法）',
    text: [
      '## 理由の提示（行政手続法）',
      '',
      '行政手続法**第8条**は「理由の提示」の中心的な規定です。試験では次の**2類型**を対比して説明します。',
      '',
      '### 1. 不利益処分（第8条第1項）',
      '法令に基づき、特定の者をあて先として**義務を課し、又はその権利を制限する処分**（不利益処分）をするときは、**処分の理由を示さなければならない**。争いの材料を与え、裁量の統制や信頼保護に資する趣旨があります。',
      '',
      '### 2. 申請拒否・不許可等（第8条第2項第1号）',
      '**法令に基づく申請に対し拒否する処分**（許認可の不許可、申請の却下など）をするときも、**理由を示さなければならない**のが典型です。概ね「申請に基づく不利益な処分」と整理される問題でも、試験では**不利益処分（1項）と申請拒否類型（2項1号）の両方に触れる**と answer の厚みが出ます。',
      '',
      '※但書、手続の簡素化、通知、公表、大量処分等の特例は、参考にある条文・解説の範囲に限って補足してください。',
    ].join('\n'),
  },
  {
    triggers: ['占有改定の要件', '占有改定とは', '183条 占有改定', '占有改定 183'],
    title: '論点ガイド：占有改定の要件（民法183条）',
    text: [
      '## 占有改定の要件（民法183条）',
      '',
      '**条文**',
      '「代理人が自己の占有物を以後**本人のために占有する意思を表示**したときは、本人は、これによって**占有権を取得**する。」',
      '',
      '### 要件',
      '1. **代理人**：引き続き物を占有する者（売主・譲渡担保設定者など）',
      '2. **本人**：占有権を取得する者（買主・譲渡担保権者など）',
      '3. **自己の占有物**：代理人が占有している動産',
      '4. **意思表示**：「以後本人のために占有する」旨（現実の引渡し不要）',
      '',
      '### 効果',
      '占有権が本人に移転し、**178条の「引渡し」**に含まれる（対抗要件・譲渡担保の引渡し等）。',
      '',
      '### 各条との関係（別論点）',
      '- 178条・333条・譲渡担保：占有改定も「引渡し」に**含む**',
      '- 192条（即時取得）・345条（質権）：占有改定は**含まない／不可**',
    ].join('\n'),
  },
];

function normalizeQueryForMatch(s: string): string {
  return (s || '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function topicBriefsForQuery(fullNormalized: string): { title: string; text: string }[] {
  const matched: { title: string; text: string }[] = [];
  for (const b of CHAT_TOPIC_BRIEFS) {
    if (b.triggers.some((t) => fullNormalized.includes(normalizeQueryForMatch(t)))) {
      matched.push({ title: b.title, text: b.text });
    }
  }
  return matched;
}

/** 略称展開・条番号バリアント・分割トークン */
function expandSearchTokens(trimmed: string): { fullNormalized: string; tokens: string[] } {
  const fullNormalized = normalizeQueryForMatch(trimmed);
  const bag = new Set<string>();

  for (const part of fullNormalized.split(/[\s　、,.]+/).filter(Boolean)) {
    if (part.length >= 2) bag.add(part);
    if (/条|項|号|章|節/.test(part) && part.length >= 2) bag.add(part);
  }
  if (bag.size === 0 && fullNormalized.length >= 2) bag.add(fullNormalized);

  for (const [needle, adds] of PHRASE_ALIASES) {
    if (fullNormalized.includes(needle)) {
      for (const a of adds) bag.add(normalizeQueryForMatch(a));
    }
  }
  if (fullNormalized.includes('理由の提示') || fullNormalized.includes('理由提示')) {
    ['行政手続法', '不利益処分', '申請', '拒否', '第8条', '却下', '不許可'].forEach((x) => bag.add(normalizeQueryForMatch(x)));
  }
  if (fullNormalized.includes('占有改定')) {
    ['183条', '第183条', '意思を表示', '占有権', '178条'].forEach((x) => bag.add(normalizeQueryForMatch(x)));
  }

  let m: RegExpExecArray | null;
  const reArt = /(\d{1,4})条/g;
  while ((m = reArt.exec(fullNormalized)) !== null) {
    const n = m[1];
    bag.add(`${n}条`);
    bag.add(`第${n}条`);
  }
  const reKo = /(\d{1,3})項/g;
  while ((m = reKo.exec(fullNormalized)) !== null) {
    bag.add(`第${m[1]}項`);
    bag.add(`${m[1]}項`);
  }

  const tokens = [...bag].filter((t) => t.length >= 2 || /^\d+条/.test(t));
  return { fullNormalized, tokens: tokens.slice(0, 42) };
}

function statuteChunkBonus(lawLabel: string, tokens: string[]): number {
  const L = normalizeQueryForMatch(lawLabel);
  let b = 0;
  for (const t of tokens) {
    if (t.length < 2) continue;
    if (L.includes(t) || t.includes(L.replace(/（[^）]+）/g, ''))) b += 5;
  }
  return Math.min(b, 12);
}

function stripImageTags(s: string): string {
  return (s || '').replace(/\[\[image:[^\]]*\]\]/gi, '');
}

function stripHtml(html: string): string {
  return (html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isLearnSlotId(s: string): boolean {
  return /^[a-z]{2}\d{4}$/i.test((s || '').trim());
}

function scoreHaystack(haystackNorm: string, tokens: string[], fullNormalized: string): number {
  if (!haystackNorm) return 0;
  let s = 0;
  if (fullNormalized.length >= 2 && haystackNorm.includes(fullNormalized)) s += 8;
  for (const t of tokens) {
    if (haystackNorm.includes(t)) s += 2;
  }
  return s;
}

/** 複合クエリ（占有改定＋要件等）で無関係ヒットを下げ、関連チャンクを上げる */
function queryCoherenceBonus(fullNormalized: string, haystackNorm: string): number {
  let b = 0;
  const wantsSenkyoten = fullNormalized.includes('占有改定');
  const wantsYoken = fullNormalized.includes('要件');
  const hasSenkyoten = haystackNorm.includes('占有改定') || haystackNorm.includes('183条');
  const hasYoken =
    haystackNorm.includes('要件') ||
    haystackNorm.includes('183条') ||
    haystackNorm.includes('意思を表示');

  if (wantsSenkyoten && wantsYoken) {
    if (hasSenkyoten && hasYoken) b += 12;
    else if (hasYoken && !hasSenkyoten) b -= 10;
    else if (hasSenkyoten) b += 4;
  } else if (wantsSenkyoten && hasSenkyoten) {
    b += 4;
  }
  if (fullNormalized.includes('183') && haystackNorm.includes('183条')) b += 6;
  return b;
}

function pushCandidate(
  list: ScoredKnowledgeChunk[],
  source: string,
  title: string,
  text: string,
  tokens: string[],
  fullNormalized: string,
  maxLen: number,
  extraScore = 0
): void {
  const t = stripImageTags(text || '').trim();
  if (!t) return;
  const slice = t.length > maxLen ? `${t.slice(0, maxLen)}…` : t;
  const low = normalizeQueryForMatch(slice);
  const sc = scoreHaystack(low, tokens, fullNormalized) + extraScore + queryCoherenceBonus(fullNormalized, low);
  if (sc <= 0) return;
  list.push({ source, title, text: slice, score: sc });
}

function mergeChunksForModel(chunks: ScoredKnowledgeChunk[], maxChunks: number, maxTotalChars: number): ScoredKnowledgeChunk[] {
  const sorted = [...chunks].sort((a, b) => b.score - a.score);
  const out: ScoredKnowledgeChunk[] = [];
  let total = 0;
  for (const c of sorted) {
    if (out.length >= maxChunks) break;
    if (total + c.text.length > maxTotalChars) {
      const room = maxTotalChars - total;
      if (room < 200) break;
      out.push({ ...c, text: c.text.slice(0, room) + '…' });
      break;
    }
    out.push(c);
    total += c.text.length;
  }
  return out;
}

/** 同期検索（従来 chat と同じ形状・上位5件） */
export function searchKnowledge(query: string): SearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const results: SearchResult[] = [];
  const { fullNormalized, tokens } = expandSearchTokens(trimmed);

  const textMatches = (raw: string) => {
    const h = normalizeQueryForMatch(stripHtml(raw));
    return h.includes(fullNormalized) || tokens.some((t) => h.includes(t));
  };

  PIN_CASES.forEach((item) => {
    const titleMatch = textMatches(item.title);
    const tagsMatch = item.tags.some((tag) => textMatches(tag));
    const plain = stripHtml(item.content);
    const contentMatch = textMatches(plain);
    if (titleMatch || tagsMatch || contentMatch) {
      results.push({
        type: 'case',
        title: item.title,
        content: contentMatch
          ? `【判例】${item.title} (${item.category})\n${stripHtml(item.content).slice(0, 1200)}`
          : `【判例】${item.title} (${item.category})\nタグ: ${item.tags.join(', ')}`,
        id: item.id,
        matchType: titleMatch ? 'title' : tagsMatch ? 'tag' : 'content',
      });
    }
  });

  Object.entries(LEARN_CONTENT).forEach(([category, items]) => {
    (items as string[]).forEach((text) => {
      if (isLearnSlotId(text)) return;
      if (textMatches(text)) {
        results.push({
          type: 'knowledge',
          title: category,
          content: text,
          category,
          matchType: 'content',
        });
      }
    });
  });

  LINE_HISTORY.forEach((chat: { id: string; keywords: string[]; message: string }) => {
    const keywordMatch =
      chat.keywords.some((k: string) => textMatches(k)) || textMatches(chat.message);

    if (keywordMatch) {
      let cleanContent = chat.message;
      const namesToRemove = ['てらしぃ', 'ちばまぞこ', 'ちばみほこ', '寺島さん', '寺島', 'まみさん', '相田理恵'];
      namesToRemove.forEach((name) => {
        cleanContent = cleanContent.split(name).join('***');
      });

      results.push({
        type: 'memory',
        title: '過去の会話メモリ',
        content: `「${cleanContent}」`,
        id: chat.id,
        matchType: 'keyword',
      });
    }
  });

  const briefList = topicBriefsForQuery(fullNormalized);
  for (let i = briefList.length - 1; i >= 0; i--) {
    const b = briefList[i];
    results.unshift({
      type: 'knowledge',
      title: b.title,
      content: b.text,
      category: '論点ガイド',
      matchType: 'content',
    });
  }

  return results.slice(0, 5);
}

/**
 * アプリ内データ＋MDチャンクを横断検索し、スコア順のチャンクを返す。
 * questions（クイズ・条文）は動的 import により初回のみ読み込み。
 */
export async function searchKnowledgeFull(query: string): Promise<ScoredKnowledgeChunk[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const { fullNormalized, tokens } = expandSearchTokens(trimmed);
  const candidates: ScoredKnowledgeChunk[] = [];

  for (const brief of topicBriefsForQuery(fullNormalized)) {
    candidates.push({
      source: '質問モード・論点ガイド',
      title: brief.title,
      text: brief.text,
      score: 1000,
    });
  }

  for (const item of PIN_CASES) {
    const blob = [item.title, ...item.tags, stripHtml(item.content)].join('\n');
    pushCandidate(candidates, 'ピンと図', item.title, blob, tokens, fullNormalized, 4000);
  }

  Object.entries(LEARN_CONTENT).forEach(([category, items]) => {
    (items as string[]).forEach((text, i) => {
      if (isLearnSlotId(text)) return;
      const dd = (LEARN_DEEPDIVE as Record<string, string[]>)[category]?.[i];
      const blob = dd && dd.length > 30 ? `${text}\n\n${dd}` : text;
      pushCandidate(candidates, `見て聞いて覚える · ${category}`, `${category} #${i + 1}`, blob, tokens, fullNormalized, 4500);
    });
  });

  for (const chat of LINE_HISTORY as { keywords: string[]; message: string }[]) {
    const blob = [...chat.keywords, chat.message].join('\n');
    pushCandidate(candidates, '過去の会話メモリ', 'LINEメモ', blob, tokens, fullNormalized, 2000);
  }

  pushCandidate(
    candidates,
    '基礎法学まとめ',
    '基礎法学まとめ（アプリ内）',
    KISO_HOUGAKU_SUMMARY_MARKDOWN,
    tokens,
    fullNormalized,
    12000
  );

  pushCandidate(
    candidates,
    '抵当権教科書',
    '抵当権の教科書（アプリ内）',
    TEITOUKEN_TEXTBOOK_MARKDOWN,
    tokens,
    fullNormalized,
    12000
  );

  for (const row of CHAT_MARKDOWN_CHUNKS) {
    const rel = row.path.replace(/\\/g, '/');
    const isKnowledge = rel.startsWith('data/knowledge/');
    const isCreator = rel.includes('/creator/');
    const subjectMatch = isKnowledge ? rel.match(/data\/knowledge\/(?:quiz|learn|creator)\/([^/]+)/) : null;
    const sourceLabel = isCreator
      ? `知識MD · ${subjectMatch?.[1] || 'creator'}（要約）`
      : isKnowledge
        ? `知識MD · ${subjectMatch?.[1] || 'canonical'}`
        : `MD:${rel}`;
    const boost = isKnowledge ? (isCreator ? 4 : 3) : 0;
    pushCandidate(candidates, sourceLabel, row.title || row.path, row.text, tokens, fullNormalized, 3500, boost);
  }

  try {
    const mod = await import('@/src/questions');
    const SUBJECTS = mod.SUBJECTS as Record<string, Record<string, any[]>>;
    const STATUTES = mod.STATUTES as Record<string, { title: string; content: string }[]>;

    for (const [subject, fields] of Object.entries(SUBJECTS || {})) {
      for (const [field, questions] of Object.entries(fields || {})) {
        if (!Array.isArray(questions)) continue;
        for (let qi = 0; qi < questions.length; qi++) {
          const qn = questions[qi];
          if (!qn || typeof qn !== 'object') continue;
          const parts: string[] = [];
          if (typeof qn.text === 'string') parts.push(qn.text);
          if (typeof qn.explain === 'string') parts.push(qn.explain);
          if (Array.isArray(qn.choices)) parts.push(...qn.choices.filter((x: unknown) => typeof x === 'string'));
          if (Array.isArray(qn.choiceExplanations))
            parts.push(...qn.choiceExplanations.filter((x: unknown) => typeof x === 'string'));
          if (Array.isArray(qn.choiceDeepDive))
            parts.push(...qn.choiceDeepDive.filter((x: unknown) => typeof x === 'string'));
          const blob = stripImageTags(parts.join('\n'));
          if (!blob.trim()) continue;
          const title = `過去問・一問一答 · ${subject} › ${field} · 問${qi + 1}`;
          pushCandidate(candidates, '問題データ', title, blob, tokens, fullNormalized, 6000);
        }
      }
    }

    for (const [key, articles] of Object.entries(STATUTES || {})) {
      const law = STATUTE_LAW_LABEL[key] || key;
      if (!Array.isArray(articles)) continue;
      for (const art of articles) {
        if (!art || typeof art !== 'object') continue;
        const t = `${art.title || ''}\n${art.content || ''}`;
        if (!t.trim()) continue;
        const bonus = statuteChunkBonus(law, tokens);
        pushCandidate(
          candidates,
          '条文データ',
          `${law} · ${(art.title || '').split('\n')[0]}`,
          t,
          tokens,
          fullNormalized,
          3500,
          bonus
        );
      }
    }
  } catch (e) {
    console.warn('chatKnowledgeSearch: questions import failed', e);
  }

  return mergeChunksForModel(candidates, 16, 12500);
}
