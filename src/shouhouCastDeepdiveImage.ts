/**
 * 商法・登場人物図 → 問題を解く「もっと深掘る」（M列相当）／見て聞いて覚える。
 * 問題文・肢で切る。M列の関連知識に 506条が出るだけで付けない。
 */

export const SHOUHOU_CAST_AGENCY_KEY = 'textbook/shouhou/cast-agency';
export const SHOUHOU_CAST_506_KEY = 'textbook/shouhou/cast-506';
export const SHOUHOU_CAST_KENGEN_KEY = 'textbook/shouhou/cast-kengen';
export const SHOUHOU_CAST_DAIRISHO_KEY = 'textbook/shouhou/cast-dairisho';
export const SHOUHOU_CAST_TEIYAKU_KEY = 'textbook/shouhou/cast-teiyaku';
export const SHOUHOU_CAST_NAKADACHI_KEY = 'textbook/shouhou/cast-nakadachi-tonya';
export const SHOUHOU_CAST_RIKOU_KEY = 'textbook/shouhou/cast-rikou';
export const SHOUHOU_CAST_TONYA_TOKU_KEY = 'textbook/shouhou/cast-tonya-toku';
export const SHOUHOU_CAST_KYOGYO_KEY = 'textbook/shouhou/cast-kyogyo';
export const SHOUHOU_CAST_TSUCHI_KEY = 'textbook/shouhou/cast-tsuchi-ryuchi';

function norm(s: string): string {
  return (s || '').normalize('NFKC').replace(/\s+/g, '').toLowerCase();
}

function hasAny(blob: string, words: string[]): boolean {
  return words.some((w) => blob.includes(norm(w)));
}

function alreadyHasTag(body: string, imageKey: string): boolean {
  if (body.includes(`[[image:${imageKey}]]`)) return true;
  const leaf = imageKey.split('/').pop();
  return !!leaf && body.includes(`[[image:${leaf}]]`);
}

export function pickShouhouCastImageKeys(text: string): string[] {
  const blob = norm(text);
  if (!blob || blob.length < 8) return [];

  if (
    hasAny(blob, [
      '非顕名',
      '本人のためにすることを示さない',
      '示さないでこれをした場合',
      '示さないで商行為',
    ])
  ) {
    return [SHOUHOU_CAST_AGENCY_KEY];
  }

  if (
    hasAny(blob, ['本人の死亡によって消滅', '本人の死亡で消滅', '本人の死亡によっては、消滅しない'])
  ) {
    return [SHOUHOU_CAST_506_KEY];
  }

  if (hasAny(blob, ['支配人以外の重要な使用人'])) {
    return [SHOUHOU_CAST_KENGEN_KEY];
  }

  if (
    hasAny(blob, ['裁判上または裁判外', '裁判上又は裁判外']) &&
    hasAny(blob, ['支配人']) &&
    !hasAny(blob, ['監査役', '監査委員', '社外取締役'])
  ) {
    return [SHOUHOU_CAST_KENGEN_KEY];
  }

  if (hasAny(blob, ['締約代理商', '媒介代理商'])) {
    return [SHOUHOU_CAST_TEIYAKU_KEY];
  }

  if (hasAny(blob, ['代理商']) && !hasAny(blob, ['仲立', '問屋'])) {
    return [SHOUHOU_CAST_DAIRISHO_KEY];
  }

  if (hasAny(blob, ['自ら履行', '介入権', '指定した金額'])) {
    if (hasAny(blob, ['問屋'])) return [SHOUHOU_CAST_TONYA_TOKU_KEY];
    if (hasAny(blob, ['仲立'])) return [SHOUHOU_CAST_RIKOU_KEY];
  }

  if (hasAny(blob, ['仲立人', '問屋'])) {
    return [SHOUHOU_CAST_NAKADACHI_KEY];
  }

  if (hasAny(blob, ['競業']) && hasAny(blob, ['支配人', '代理商'])) {
    return [SHOUHOU_CAST_KYOGYO_KEY];
  }

  if (hasAny(blob, ['商事留置', '遅滞なく通知']) && hasAny(blob, ['代理商', '支配人'])) {
    return [SHOUHOU_CAST_TSUCHI_KEY];
  }

  if (hasAny(blob, ['現物出資']) && hasAny(blob, ['発起人', '引受人'])) {
    return ['textbook/shouhou/setsu-1'];
  }
  if (
    hasAny(blob, ['四分の一']) ||
    (hasAny(blob, ['四倍']) && hasAny(blob, ['発行可能', '設立時発行']))
  ) {
    return ['textbook/shouhou/setsu-yonshiichi'];
  }
  if (hasAny(blob, ['発行可能株式総数'])) {
    return ['textbook/shouhou/setsu-2'];
  }
  if (
    hasAny(blob, ['当然失権']) ||
    (hasAny(blob, ['募集設立']) && hasAny(blob, ['履行しない', '出資を履行', '催告がなくても']))
  ) {
    return ['textbook/shouhou/setsu-3'];
  }
  if (
    hasAny(blob, ['発起人の議決権']) ||
    hasAny(blob, ['創立総会の決議']) ||
    hasAny(blob, ['設立時監査役']) ||
    hasAny(blob, ['設立時役員等の選任'])
  ) {
    return ['textbook/shouhou/setsu-kahansu'];
  }
  if (hasAny(blob, ['発起設立']) && hasAny(blob, ['募集設立'])) {
    return ['textbook/shouhou/setsu-hokki-boshu'];
  }
  if (hasAny(blob, ['正当な事由']) && hasAny(blob, ['登記', '対抗'])) {
    return ['textbook/shouhou/touki-1'];
  }
  if (hasAny(blob, ['自己株式']) && hasAny(blob, ['配当', '議決権', '消却'])) {
    return ['textbook/shouhou/kabu-1'];
  }
  if (hasAny(blob, ['公開会社']) && hasAny(blob, ['譲渡制限', '非公開'])) {
    return ['textbook/shouhou/kabu-2'];
  }
  if (hasAny(blob, ['会計監査人', '監査等委員会', '指名委員会等設置'])) {
    return ['textbook/shouhou/kikan-2'];
  }
  if (hasAny(blob, ['現物配当', '金銭分配請求権'])) {
    return ['textbook/shouhou/hai-1'];
  }
  if (hasAny(blob, ['株式交換'])) {
    return ['textbook/shouhou/sai-1'];
  }
  if (hasAny(blob, ['自己の名をもって']) || (hasAny(blob, ['自己の計算']) && hasAny(blob, ['商人']))) {
    return ['textbook/shouhou/mer-2'];
  }
  if (hasAny(blob, ['商慣習']) && hasAny(blob, ['民法'])) {
    return ['textbook/shouhou/apply-1'];
  }

  return [];
}

export function prependShouhouCastDeepdiveImage(
  body: string,
  matchText: string,
  resolveExists: (key: string) => boolean,
): string {
  const trimmed = (body || '').trim();
  const keys = pickShouhouCastImageKeys(matchText || '').filter(
    (key) => resolveExists(key) && !alreadyHasTag(trimmed, key),
  );
  if (keys.length === 0) return trimmed;
  const tags = keys.map((key) => `[[image:${key}]]`).join('\n\n');
  if (!trimmed) return tags;
  return `${tags}\n\n${trimmed}`;
}
