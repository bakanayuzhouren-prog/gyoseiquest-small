const SUBJECTS = ['債権各論'];
const MARKER = '<!-- taxi-kyusho-2houkou -->';
const BLOCK = `${MARKER}

[[image:learn/minpo/taxi-kyusho-2houkou]]

■ 結論

使用者は被害者に全額を賠償したあと、求償の相手で基準が分かれる。共同不法行為者には過失割合。被用者には信義則上相当と認められる限度。

■ なぜそうなる

民法719条の内部求償は、各自の過失の割合で負担を分ける。民法715条3項は被用者への求償を妨げないが、最判昭51.7.8は全額を当然には認めず、損害の公平な分担の見地から信義則上相当の限度とする。

■ ひっかけ

[[red:どちらにも同じ基準で全額を求償できる]]と考えない。被用者への逆求償はこの図の対象ではない。

■ 暗記

他の共同不法行為者には過失割合。被用者には信義則上相当の限度。
`;

function isTaxiKyushoCard(text) {
  const t = String(text || '');
  if (/故意または重過失がなくとも求償/.test(t)) return false;
  if (/共同不法行為者であるマサミに対し/.test(t) && /過失割合に応じて求償/.test(t)) return true;
  if (/被用者であるスナオに対し/.test(t) && /信義則上相当/.test(t)) return true;
  if (/使用者が被用者の加害行為について損害賠償金の全額を支払った場合/.test(t) && /信義則上相当/.test(t)) {
    return true;
  }
  return false;
}

function prependOnce(body, marker, block) {
  const next = String(body || '');
  if (next.includes(marker)) return next;
  return next ? `${block}\n\n${next}` : block;
}

export function appendTaxiKyushoToLearnDeepdive(learnDeepdive, learnContent) {
  const next = { ...learnDeepdive };
  for (const subject of SUBJECTS) {
    const aCol = learnContent[subject] || [];
    const bCol = [...(next[subject] || [])];
    const len = Math.max(aCol.length, bCol.length);
    for (let i = 0; i < len; i++) {
      if (!isTaxiKyushoCard(aCol[i])) continue;
      bCol[i] = prependOnce(bCol[i] || '', MARKER, BLOCK);
    }
    next[subject] = bCol;
  }
  return next;
}
