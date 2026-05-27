/** スプレッドシート textFormatRuns → [[red:]] / **太字** 等（syncQuiz / syncLearn 共通） */

function normalizeThemeColorKey(themeColor) {
  if (themeColor == null) return null;
  const enumToKey = {
    0: 'UNSPECIFIED',
    1: 'TEXT',
    2: 'BACKGROUND',
    3: 'ACCENT1',
    4: 'ACCENT2',
    5: 'ACCENT3',
    6: 'ACCENT4',
    7: 'ACCENT5',
    8: 'ACCENT6',
    9: 'LINK',
  };
  if (typeof themeColor === 'number') return enumToKey[themeColor] ?? null;
  const asStr = String(themeColor).trim();
  if (/^\d+$/.test(asStr)) return enumToKey[Number(asStr)] ?? null;
  let s = asStr;
  s = s.replace(/^THEME_COLOR_TYPE_/i, '').replace(/^ThemeColorType\./i, '');
  s = s.replace(/_/g, '');
  return s.toUpperCase() || null;
}

const SHEET_THEME_DEFAULT_RGB = {
  ACCENT1: { red: 66 / 255, green: 133 / 255, blue: 244 / 255 },
  ACCENT2: { red: 234 / 255, green: 67 / 255, blue: 53 / 255 },
  ACCENT3: { red: 251 / 255, green: 188 / 255, blue: 4 / 255 },
  ACCENT4: { red: 52 / 255, green: 168 / 255, blue: 83 / 255 },
  ACCENT5: { red: 255 / 255, green: 109 / 255, blue: 1 / 255 },
  ACCENT6: { red: 70 / 255, green: 189 / 255, blue: 198 / 255 },
  LINK: { red: 17 / 255, green: 85 / 255, blue: 204 / 255 },
};

function themeColorKeyToRgb(key) {
  if (!key || key === 'UNSPECIFIED' || key === 'TEXT' || key === 'BACKGROUND') return null;
  return SHEET_THEME_DEFAULT_RGB[key] || null;
}

function rgbColorHasComponents(c) {
  if (!c || typeof c !== 'object') return false;
  return c.red != null || c.green != null || c.blue != null;
}

function resolveForegroundColorStyle(style) {
  if (!style) return null;
  if (rgbColorHasComponents(style.rgbColor)) return style.rgbColor;
  const key = normalizeThemeColorKey(style.themeColor);
  return themeColorKeyToRgb(key);
}

function getForegroundRgb(fmt) {
  if (!fmt) return null;
  const fromStyle = resolveForegroundColorStyle(fmt.foregroundColorStyle);
  if (fromStyle) return fromStyle;
  return fmt.foregroundColor || null;
}

function rgbToHex6(c) {
  if (!c) return null;
  const R = Math.round(Math.min(255, Math.max(0, (c.red ?? 0) * 255)));
  const G = Math.round(Math.min(255, Math.max(0, (c.green ?? 0) * 255)));
  const B = Math.round(Math.min(255, Math.max(0, (c.blue ?? 0) * 255)));
  return R.toString(16).padStart(2, '0') + G.toString(16).padStart(2, '0') + B.toString(16).padStart(2, '0');
}

function isNeutralColor(c) {
  if (!c) return true;
  const r = c.red ?? 0;
  const g = c.green ?? 0;
  const b = c.blue ?? 0;
  const max = Math.max(r, g, b);
  if (max < 0.07) return true;
  const min = Math.min(r, g, b);
  if (max - min < 0.07 && max < 0.42) return true;
  return false;
}

function isRedColor(c) {
  if (!c) return false;
  const r = c.red ?? 0;
  const g = c.green ?? 0;
  const b = c.blue ?? 0;
  return r > 0.35 && r >= g && r >= b && r - Math.max(g, b) > 0.15;
}

function escapeForColorTag(seg) {
  return seg.replace(/\[\[\/c\]\]/g, '［［/c］］');
}

function applyTextFormatRuns(text, cellData) {
  if (!text) return text;
  const runs = cellData?.textFormatRuns;
  if (!runs?.length) return text;
  let out = '';
  let lastEnd = 0;
  for (let j = 0; j < runs.length; j++) {
    const run = runs[j];
    const start = run.startIndex ?? 0;
    if (start > lastEnd) out += text.slice(lastEnd, start);
    const end = j + 1 < runs.length ? (runs[j + 1].startIndex ?? text.length) : text.length;
    const seg = text.slice(start, end);
    if (seg) {
      const bold = run.format?.bold === true;
      const fg = getForegroundRgb(run.format);
      const red = fg && isRedColor(fg);
      const neutral = !fg || isNeutralColor(fg);
      const hex = fg && !neutral && !red ? rgbToHex6(fg) : null;
      if (red) {
        const e = seg.replace(/\]\]/g, '］］');
        out += `[[red:${e}]]`;
      } else if (hex) {
        const e = escapeForColorTag(seg);
        if (bold) out += `[[c:#${hex}&b]]${e}[[/c]]`;
        else out += `[[c:#${hex}]]${e}[[/c]]`;
      } else if (bold) out += `**${seg}**`;
      else out += seg;
    }
    lastEnd = end;
  }
  if (lastEnd < text.length) out += text.slice(lastEnd);
  return out || text;
}

function formatCellText(text, colMap, sheetRow1Based) {
  if (text == null || text === '') return '';
  const raw = String(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
  if (!raw) return '';
  const cell = colMap[sheetRow1Based];
  return cell ? applyTextFormatRuns(raw, cell) : raw;
}

function fillFormatMap(gridData, map) {
  if (!gridData?.rowData) return;
  const startRow = gridData.startRow ?? 1;
  gridData.rowData.forEach((rowData, idx) => {
    const sheetRow = startRow + idx + 1;
    const cell = rowData?.values?.[0];
    if (cell) map[sheetRow] = cell;
  });
}

/** @returns {Record<string, Record<number, object>>} letter → row → cellData */
async function loadSheetColumnFormats(sheets, spreadsheetId, title, rowCount, letters = ['B', 'I', 'M', 'F']) {
  const maps = {};
  for (const letter of letters) maps[letter] = {};
  try {
    const n = Math.min(rowCount + 50, 2000);
    const formatRanges = letters.map((letter) => ({
      letter,
      range: `${title}!${letter}2:${letter}${n}`,
    }));
    const gridResp = await sheets.spreadsheets.get({
      spreadsheetId,
      ranges: formatRanges.map(({ range }) => range),
      includeGridData: true,
    });
    const targetSheet = gridResp.data.sheets?.find((s) => (s.properties?.title || '') === title);
    const data = targetSheet?.data || [];
    formatRanges.forEach(({ letter }, idx) => {
      if (data[idx]) fillFormatMap(data[idx], maps[letter]);
    });
  } catch (e) {
    console.warn(`[WARN] 列フォーマット取得スキップ (${title}): ${e.message}`);
  }
  return maps;
}

module.exports = {
  applyTextFormatRuns,
  formatCellText,
  loadSheetColumnFormats,
};
