export type ItoJukuParseMode = 'auto' | 'sections' | 'numbered' | 'chunks';

export interface ItoJukuSource {
  /** Downloads 内の PDF ファイル名 */
  pdf: string;
  /** 出力 MD のベース名（ito-juku/{slug}.md） */
  slug: string;
  title: string;
  subject: string;
  tags: string[];
  parse?: ItoJukuParseMode;
  /** sections / auto 用。省略時は 【…】 全般 */
  sectionMarkers?: string[];
  maxItems?: number;
  maxBodyLen?: number;
  /** 解答解説PDF（任意）。numbered + ○× マージ用 */
  kaitoPdf?: string;
}

export interface ParsedSection {
  heading: string;
  items: { n: number; body: string; mark?: string; note?: string }[];
}
