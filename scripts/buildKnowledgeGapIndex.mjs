import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dir = path.join(root, 'data', 'knowledge', 'canonical');
const out = path.join(root, 'src', 'generated', 'knowledgeGapIndex.ts');

function genreFrom(text) {
  const t = text;
  if (/行政手続/.test(t)) return '行政法・行政手続法';
  if (/不服審査|審理員|裁決|審査請求/.test(t)) return '行政法・行政不服審査法';
  if (/行政事件|取消訴訟|義務付け|差止め|事情判決/.test(t)) return '行政法・行政事件訴訟法';
  if (/国家賠償|損失補償|国賠/.test(t)) return '行政法・国家賠償';
  if (/地方自治|条例|指定都市|選挙管理委員会/.test(t)) return '行政法・地方自治';
  if (/行政法|処分性|原告適格|行政指導/.test(t)) return '行政法・総論';
  if (/物権|抵当|留置|先取特権|質権|占有|地上権|登記/.test(t)) return '民法・物権';
  if (/賃貸|売買|請負|委任|寄託|贈与|消費貸借|使用貸借|敷金|契約不適合/.test(t)) return '民法・債権各論';
  if (/債務不履行|相殺|弁済|保証|債権譲渡|詐害|代位|解除|危険負担|連帯/.test(t)) return '民法・債権総論';
  if (/相続|遺言|婚姻|親権|遺留分|家族法/.test(t)) return '民法・家族法';
  if (/意思表示|代理|時効|制限行為|錯誤|詐欺|民法/.test(t)) return '民法・総則';
  if (/商法|会社|株主|取締役|商業登記/.test(t)) return '商法・会社法';
  if (/憲法|人権|国会|内閣|違憲/.test(t)) return '憲法';
  if (/基礎法学|法の分類|実定法/.test(t)) return '基礎法学';
  if (/政治|経済|社会|情報通信|文章理解|行政書士法|戸籍|個人情報|住民基本台帳|基礎知識/.test(t)) return '基礎知識';
  return '';
}

function clean(text) {
  return text
    .replace(/\*\*/g, '')
    .replace(/\[\[red:|\]\]/g, '')
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function pushProp(list, text) {
  const value = clean(text);
  if (value.length < 18 || value.length > 100) return;
  if (/確認日|https?:|要確認|市販|全文は載せない/.test(value)) return;
  if (list.includes(value)) return;
  list.push(value);
}

function parseFile(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  const body = fm ? raw.slice(fm[0].length) : raw;
  const head = fm ? fm[1] : '';
  const heading = (body.match(/^#\s+(.+)$/m) || [])[1] || '';
  const title = clean((head.match(/^title:\s*(.+)$/m) || [])[1] || heading || path.basename(file, '.md'));
  const tagLine = (head.match(/^tags:\s*\[(.*)\]\s*$/m) || [])[1] || '';
  const tags = tagLine.split(',').map((s) => s.trim()).filter(Boolean).slice(0, 8);
  const bullets = [];
  for (const line of body.split(/\n/)) {
    const item = line.match(/^\s*-\s+(.+)$/);
    if (item) pushProp(bullets, item[1]);
    if (line.includes('|') && !/^\s*\|?\s*-+/.test(line) && !/類型|条文/.test(line)) {
      const cells = line.split('|').map((cell) => clean(cell)).filter((cell) => cell && cell !== '---');
      if (cells.length >= 2) pushProp(bullets, `${cells[0]}は${cells[1]}`);
    }
    if (!line.startsWith('|') && !line.startsWith('#') && !line.startsWith('-')) {
      for (const sentence of line.split('。')) pushProp(bullets, sentence);
    }
    if (bullets.length >= 6) break;
  }
  const genre = genreFrom(`${tags.join(' ')} ${title} ${bullets.join(' ')}`);
  return { id: path.basename(file, '.md'), title, genre, tags, bullets: bullets.slice(0, 6) };
}

const entries = fs.readdirSync(dir)
  .filter((name) => name.endsWith('.md') && !name.startsWith('_') && name !== '常識で切る-HANDOFF.md')
  .map((name) => parseFile(path.join(dir, name)))
  .filter((entry) => entry.title && entry.bullets.length > 0);

const file = `/* 正本 data/knowledge/canonical の題名・結論だけ。全文は載せない。scripts/buildKnowledgeGapIndex.mjs */
export type KnowledgeGapEntry = {
  id: string;
  title: string;
  genre: string;
  tags: string[];
  bullets: string[];
};

export const KNOWLEDGE_GAP_INDEX: KnowledgeGapEntry[] = ${JSON.stringify(entries, null, 2)};
`;

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, file);
console.log(`entries ${entries.length}`);
