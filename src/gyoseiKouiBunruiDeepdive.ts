/**
 * 行政行為の分類。許可は自由の回復。特許は新しい地位。確認は存否の確定。
 * 図があるとき、もっと深掘るの先頭に足す。
 */

export const GYOSEI_KOUI_BUNRUI_IMAGE_KEY = 'learn/gyosei/gyosei-koui-bunrui';

export const GYOSEI_KOUI_BUNRUI_DEEPDIVE = [
  `[[image:${GYOSEI_KOUI_BUNRUI_IMAGE_KEY}]]`,
  '',
  '**結論**',
  '',
  '許可は、一般的禁止を解いて自由を戻す。特許は、新しい権利か地位を設定する。',
  '',
  '法律行為的行政行為は、行政庁の意思表示で効果を発生させる。命令的は、下命、禁止、許可、免除。形成的は、特許、認可、代理。',
  '',
  '準法律行為的行政行為は、観念の表示である。確認、公証、通知、受理。通説では、附款を付けない。',
  '',
  '**ひっかけ**',
  '',
  '許可は新しい権利を創設する。⇒[[red:×]]',
  '',
  '確認は広い政策裁量で新しい権利を設定する。⇒[[red:×]]',
  '',
  '認可は単なる事実通知である。⇒[[red:×]]',
  '',
  '下命は私人の法律行為を補充して完成させる。⇒[[red:×]] それは認可。',
  '',
  '名前が許可でも、中身は認可や特許があり得る。農地の権利移動は認可。運転免許は伝統的に許可で、裁量は狭い。建築確認は確認で、処分性とは別である。',
  '',
  '**暗記**',
  '',
  '[[red:許可は自由を戻す。特許は新しい地位。確認に広い裁量はない。]]',
].join('\n');

function norm(text: string): string {
  return (text || '').replace(/\s+/g, '');
}

export function shouldAttachGyoseiKouiBunrui(text: string): boolean {
  const t = norm(text);
  if (t.includes('行政行為の分類')) return true;
  if (t.includes('許可と特許')) return true;
  if (t.includes('認可') && t.includes('形成的') && (t.includes('裁量') || t.includes('特許'))) return true;
  if (t.includes('命令的') && t.includes('形成的')) return true;
  if (t.includes('特許') && t.includes('新たな法律上の地位')) return true;
  if (t.includes('許可') && t.includes('自由回復')) return true;
  if (t.includes('確認') && t.includes('政策裁量')) return true;
  if (t.includes('認可') && t.includes('事実通知')) return true;
  if (t.includes('下命') && t.includes('補充')) return true;
  return false;
}

function alreadyHasTag(body: string): boolean {
  return body.includes(`[[image:${GYOSEI_KOUI_BUNRUI_IMAGE_KEY}]]`);
}

export function prependGyoseiKouiBunruiDeepdiveImage(
  body: string,
  matchText: string,
  resolveExists: (key: string) => boolean,
): string {
  const trimmed = (body || '').trim();
  const haystack = `${matchText || ''}\n${trimmed}`;
  if (!shouldAttachGyoseiKouiBunrui(haystack)) return trimmed;
  if (!resolveExists(GYOSEI_KOUI_BUNRUI_IMAGE_KEY)) return trimmed;
  if (alreadyHasTag(trimmed)) return trimmed;
  const tag = `[[image:${GYOSEI_KOUI_BUNRUI_IMAGE_KEY}]]`;
  if (!trimmed) return tag;
  return `${tag}\n\n${trimmed}`;
}
