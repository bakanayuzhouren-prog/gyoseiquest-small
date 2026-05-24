/** チャンクページ用（Y列の本文など）。URL 長制限を避けるため遷移直前にセットする */
let _textBody = '';

export function setChunkTextBodyForNavigation(body: string): void {
  _textBody = typeof body === 'string' ? body : '';
}

/** チャンク画面マウント時に1回だけ取り出し、以降は空 */
export function takeChunkTextBody(): string {
  const out = _textBody;
  _textBody = '';
  return out;
}
