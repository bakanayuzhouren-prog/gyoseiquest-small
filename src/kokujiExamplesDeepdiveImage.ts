/**
 * 告示の具体例。もっと深掘るの先頭に図を足す。
 * 図が未生成のときは本文だけ返す。
 */

export const KOKUJI_EXAMPLES_IMAGE_KEY = 'learn/gyosei/kokuji-rei';

export const KOKUJI_EXAMPLES_DEEPDIVE = [
  '**結論**',
  '',
  '告示は、公示を必要とするときに、一般へ知らせるものです（国家行政組織法14条1項）。',
  '',
  '重要文化財の指定は、文部科学大臣が官報で告示します（文化財保護法28条1項）。',
  '',
  '保険で使う薬の価格は、厚生労働大臣が告示で定めます（薬価基準）。',
  '',
  '都市計画を決定したときは、都道府県または市町村がその旨を告示します（都市計画法20条1項）。効力は、その告示の日から生じます（20条3項）。',
  '',
  '**ひっかけ**',
  '',
  '所管の機関や職員に示すものを告示と書く。⇒[[red:×]]',
  '',
  'それは訓令または通達（国家行政組織法14条2項）。',
  '',
  '**暗記**',
  '',
  '[[red:告示は一般向け。通達は職員向け。]]',
].join('\n');

function norm(text: string): string {
  return (text || '').replace(/\s+/g, '');
}

/** 告示を一般向けの公示として聞く肢か。事業認定の告示、とは分ける。 */
export function shouldAttachKokujiExamples(text: string): boolean {
  const t = norm(text);
  if (!t.includes('告示')) return false;
  if (t.includes('一般') || t.includes('公示') || t.includes('国民')) return true;
  if (t.includes('訓令') || t.includes('通達') || t.includes('職員')) return true;
  return false;
}

export function kokujiPublicNoticeNote(choiceText: string): string {
  if (!shouldAttachKokujiExamples(choiceText)) return '';
  return '告示は、公示が必要なときに一般へ知らせる（国家行政組織法14条1項）。職員へ示すのは訓令または通達（14条2項）。';
}

function alreadyHasTag(body: string): boolean {
  return body.includes(`[[image:${KOKUJI_EXAMPLES_IMAGE_KEY}]]`)
    || body.includes('[[image:kokuji-rei]]');
}

export function prependKokujiExamplesDeepdiveImage(
  body: string,
  matchText: string,
  resolveExists: (key: string) => boolean,
): string {
  const trimmed = (body || '').trim();
  const haystack = `${matchText || ''}\n${trimmed}`;
  if (!shouldAttachKokujiExamples(haystack)) return trimmed;
  if (!resolveExists(KOKUJI_EXAMPLES_IMAGE_KEY)) return trimmed;
  if (alreadyHasTag(trimmed)) return trimmed;
  const tag = `[[image:${KOKUJI_EXAMPLES_IMAGE_KEY}]]`;
  if (!trimmed) return tag;
  return `${tag}\n\n${trimmed}`;
}
