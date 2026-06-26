/** 憲法の生成解説に含まれる Markdown 見出しを、既存の番号付きカード形式へ寄せる。 */
export function normalizeConstitutionDeepDivePresentation(body: string): string {
  let sectionNumber = 0;
  return body
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => {
      const heading = line.match(/^#{1,6}\s+(.+)$/);
      if (!heading) return line;
      if (line.startsWith('# ') && sectionNumber === 0) return heading[1].trim();
      sectionNumber += 1;
      return `${sectionNumber}. ${heading[1].replace(/^\d+[　\s]*/, '').trim()}`;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
