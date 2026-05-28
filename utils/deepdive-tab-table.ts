/**
 * もっと深掘り本文をタブ表ブロックとプレーンブロックに分割する。
 * 連続する「表っぽい行」（タブ／パイプ／列空白）を1つの表とみなす。
 */

export type DeepdiveTextSegment =
  | { type: 'plain'; text: string }
  | { type: 'tabTable'; rows: string[][] };

/** Markdown の `| --- | --- |` 区切り行を除外 */
function isMarkdownPipeSeparatorCells(cells: string[]): boolean {
  return cells.length >= 2 && cells.every((c) => /^[\s\-:｜|]+$/.test(c));
}

/**
 * Excel 等で列が細かく分かれた行を「項目｜内容｜判定」相当の 3 列にまとめる。
 * 左端・右端をそれぞれ第 1・第 3 列とし、中間セルは改行で縦に積む（横に詰めない）。
 */
function collapseRowWideToThree(cells: string[]): string[] {
  const n = cells.length;
  if (n <= 3) return cells;
  const trimmed = cells.map((c) => c.trim());
  let j = n - 1;
  while (j > 0 && !trimmed[j]) j--;
  const first = trimmed[0] ?? '';
  const last = j >= 1 ? trimmed[j] ?? '' : '';
  const middleParts = j >= 2 ? trimmed.slice(1, j).filter(Boolean) : [];
  const middle = middleParts.join('\n');
  return [first, middle, last];
}

export function collapseWideRowsToThreeColumns(rows: string[][]): string[][] {
  if (rows.length === 0) return rows;
  const maxCols = rows.reduce((m, r) => Math.max(m, r.length), 0);
  if (maxCols <= 3) return rows;
  return rows.map((cells) => collapseRowWideToThree(cells));
}

/**
 * タブ以外の列区切り（Excel→テキスト、全角スペース列など）を推定して分割。
 * 返せないときは null（1列のみとして扱う）
 */
export function splitTableLineToColumns(line: string): string[] {
  const raw = line.replace(/\r\n/g, '\n');
  if (raw.includes('\t')) {
    return raw.split('\t').map((c) => c.trim());
  }
  const t = raw.trim();
  if (t.startsWith('|') && t.endsWith('|')) {
    const inner = t.slice(1, -1);
    return inner.split('|').map((c) => c.trim());
  }
  // 全角スペースが列の隙間になっているケース
  if (/\u3000{2,}/.test(raw)) {
    const parts = raw.split(/\u3000{2,}/).map((c) => c.trim()).filter(Boolean);
    if (parts.length >= 2) return parts;
  }
  // 半角スペースが3個以上連続＝列区切り（Excelのテキスト貼り付け等）
  if (/\s{3,}/.test(t)) {
    const parts = t.split(/\s{3,}/).map((c) => c.trim()).filter(Boolean);
    if (parts.length >= 2) return parts;
  }
  return [t];
}

function isMarkdownPipeTableRow(line: string): boolean {
  const t = line.trim();
  if (!t.startsWith('|')) return false;
  const pipeCount = (t.match(/\|/g) ?? []).length;
  return pipeCount >= 2;
}

function isSpreadsheetTableRow(line: string): boolean {
  const t = line.trim();
  if (!t) return false;
  if (line.includes('\t')) return true;
  if (isMarkdownPipeTableRow(line)) return true;
  const cols = splitTableLineToColumns(line);
  if (cols.length >= 3) return true;
  /** 2列は全角スペース列のときのみ（本文の偶然の分割を避ける） */
  if (cols.length === 2 && /\u3000{2,}/.test(line)) return true;
  return false;
}

/** ブロック全体が Markdown パイプ表（2行以上・各行が | で始まる） */
export function isMarkdownPipeTableBlock(block: string): boolean {
  const rows = block
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  if (rows.length < 2) return false;
  return rows.every((line) => isMarkdownPipeTableRow(line));
}

/** normalizeDeepdiveFlowText で行結合しない表ブロック（タブ表・Markdown パイプ表） */
export function isPreservableTableBlock(block: string): boolean {
  const trimmedBlock = block.trim();
  if (!trimmedBlock) return false;
  const rowLines = trimmedBlock
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (rowLines.length < 2) return false;
  if (trimmedBlock.includes('\t')) return true;
  return isMarkdownPipeTableBlock(trimmedBlock);
}

export function segmentDeepdiveTextForRender(raw: string): DeepdiveTextSegment[] {
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  const segments: DeepdiveTextSegment[] = [];
  let plainBuf: string[] = [];
  let tableBuf: string[] = [];

  const flushPlain = () => {
    if (plainBuf.length === 0) return;
    const text = plainBuf.join('\n').replace(/\n+$/, '');
    if (text.trim()) segments.push({ type: 'plain', text });
    plainBuf = [];
  };

  const flushTable = () => {
    if (tableBuf.length === 0) return;
    let rows = tableBuf.map((line) => splitTableLineToColumns(line));
    rows = rows.filter((r) => !isMarkdownPipeSeparatorCells(r));
    const isPipeTable = tableBuf.every((line) => isMarkdownPipeTableRow(line));
    if (!isPipeTable) {
      rows = collapseWideRowsToThreeColumns(rows);
    }
    const maxCols = rows.reduce((m, r) => Math.max(m, r.length), 0);
    const padded = rows.map((r) => {
      if (r.length >= maxCols) return r;
      return [...r, ...Array(maxCols - r.length).fill('')];
    });
    segments.push({ type: 'tabTable', rows: padded });
    tableBuf = [];
  };

  for (const line of lines) {
    if (isSpreadsheetTableRow(line)) {
      flushPlain();
      tableBuf.push(line);
    } else {
      if (tableBuf.length > 0) {
        flushTable();
      }
      plainBuf.push(line);
    }
  }
  flushPlain();
  flushTable();
  return segments;
}
