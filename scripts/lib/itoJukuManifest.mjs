/**
 * 伊藤塾PDF → 知識MD 変換マニフェスト
 *
 * てらしぃが Downloads にPDFを置いたら、ここに1件追加して
 *   npm run sync:ito-juku
 * を実行する。
 *
 * parse:
 *   - auto      … 【】見出し → sections、番号行 → numbered を自動判定
 *   - sections  … 【見出し】または ## で章分割
 *   - numbered  … 行頭 1. / ① / 1　 で項番抽出
 *   - chunks    … 段落単位（長文テキスト向け・800字上限）
 */
export const DOWNLOADS = 'c:/Users/teras/Downloads';

/** @type {import('./itoJukuTypes.d.ts').ItoJukuSource[]} */
export const ITO_JUKU_SOURCES = [
  // 手動MD（文字起こし済み）— PDF不要
  // data/knowledge/creator/ito-juku/shouhou-*.md
  //
  // PDFから再生成する場合の例:
  // {
  //   pdf: '伊藤塾_商法8点.pdf',
  //   slug: 'shouhou-8ten',
  //   title: '4時間で商法8点 — 要約',
  //   subject: '商法',
  //   tags: ['伊藤塾', '商法', '8点対策'],
  //   parse: 'sections',
  // },
];

/** Downloads を走査するときのファイル名パターン（マニフェスト空でも抽出候補を列挙） */
export const SCAN_PATTERNS = [/伊藤/i, /ito.?juku/i, /伊藤塾/i];
