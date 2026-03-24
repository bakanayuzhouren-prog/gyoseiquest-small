/** もっと深掘るページ用。URL長制限を避けるため、遷移前にここにセットする */
let _content = '';
let _choiceLabel = '';
/** 見て聞いて覚えるから開いた場合は true（ミニプレイヤーを学習のメインプレイヤーと連動） */
let _fromLearn = false;

export function setDeepdiveParams(
  content: string,
  choiceLabel: string,
  options?: { fromLearn?: boolean }
) {
  _content = content;
  _choiceLabel = choiceLabel;
  _fromLearn = options?.fromLearn ?? false;
}

/** 読み取りでクリアしない（React Strict Mode の二重マウントで内容・[[image:…]] が失われるのを防ぐ）。次の setDeepdiveParams で上書きされる */
export function getDeepdiveParams(): { content: string; choiceLabel: string; fromLearn: boolean } {
  return { content: _content, choiceLabel: _choiceLabel, fromLearn: _fromLearn };
}
