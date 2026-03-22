/** もっと深掘るページ用。URL長制限を避けるため、遷移前にここにセットする */
let _content = '';
let _choiceLabel = '';

export function setDeepdiveParams(content: string, choiceLabel: string) {
  _content = content;
  _choiceLabel = choiceLabel;
}

/** 読み取りでクリアしない（React Strict Mode の二重マウントで内容・[[image:…]] が失われるのを防ぐ）。次の setDeepdiveParams で上書きされる */
export function getDeepdiveParams(): { content: string; choiceLabel: string } {
  return { content: _content, choiceLabel: _choiceLabel };
}
