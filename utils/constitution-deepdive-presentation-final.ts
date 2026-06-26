/** ATX 見出しを露出させず、既存カードで使う【見出し】へ変換する。 */
export function normalizeFinalConstitutionDeepDivePresentation(body: string): string {
  return body
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => {
      const heading = line.match(/^(#{1,6})\s+(.+)$/);
      if (!heading) return line;
      const title = heading[2].replace(/^\d+[　\s]*/, '').trim();
      return heading[1].length === 1 ? title : `【${title}】`;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
