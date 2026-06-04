/** チャンクページ用（Y列本文・画像キー等）。URL 長制限を避けるため遷移直前にセットする */
let _textBody = '';
let _chunkImage = '';
let _statuteTitle = '';

export function setChunkTextBodyForNavigation(body: string): void {
  _textBody = typeof body === 'string' ? body : '';
}

export function setChunkNavigationPayload(payload: {
  body?: string;
  chunkImage?: string;
  statuteTitle?: string;
}): void {
  if (payload.body != null) _textBody = payload.body;
  if (payload.chunkImage != null) _chunkImage = payload.chunkImage;
  if (payload.statuteTitle != null) _statuteTitle = payload.statuteTitle;
}

/** チャンク画面マウント時に1回だけ取り出し、以降は空 */
export function takeChunkTextBody(): string {
  const out = _textBody;
  _textBody = '';
  return out;
}

/** 本文・画像キー・見出しをまとめて取り出し（Web で params が欠けても復元） */
export function takeChunkNavigationPayload(): {
  body: string;
  chunkImage: string;
  statuteTitle: string;
} {
  const out = { body: _textBody, chunkImage: _chunkImage, statuteTitle: _statuteTitle };
  _textBody = '';
  _chunkImage = '';
  _statuteTitle = '';
  return out;
}
