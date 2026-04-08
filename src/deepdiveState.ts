/** もっと深掘るページ用。URL長制限を避けるため、遷移前にここにセットする */
let _content = '';
let _choiceLabel = '';
/** 見て聞いて覚えるから開いた場合は true（ミニプレイヤーを学習のメインプレイヤーと連動） */
let _fromLearn = false;
/** 問題を解くモードで肢の深掘りを開いたとき、その肢が正解か。null は表示しない（memo 単体・学習など） */
let _choiceCorrect: boolean | null = null;
/** M列のあとに表示。スプレッドシート AZ列（肢ごと）から同期 */
let _beginnerContent = '';
/** 見て聞いて覚える: スプレッドシート F列（解説）。ヘッダー画像の直下に表示 */
let _fExplain = '';
/** 見て聞いて覚えるで開いたときの科目キー（例: 債権総論）。共有画像検索の科目スコープ用 */
let _learnSubject = '';

export function setDeepdiveParams(
  content: string,
  choiceLabel: string,
  options?: {
    fromLearn?: boolean;
    choiceCorrect?: boolean | null;
    beginnerContent?: string;
    fExplain?: string;
    learnSubject?: string;
  }
) {
  _content = content;
  _choiceLabel = choiceLabel;
  _fromLearn = options?.fromLearn ?? false;
  _choiceCorrect = options?.choiceCorrect !== undefined ? options.choiceCorrect : null;
  _beginnerContent = options?.beginnerContent?.trim() ? options.beginnerContent.trim() : '';
  _fExplain = options?.fExplain?.trim() ? options.fExplain.trim() : '';
  _learnSubject = options?.learnSubject?.trim() ? options.learnSubject.trim() : '';
}

/** 読み取りでクリアしない（React Strict Mode の二重マウントで内容・[[image:…]] が失われるのを防ぐ）。次の setDeepdiveParams で上書きされる */
export function getDeepdiveParams(): {
  content: string;
  choiceLabel: string;
  fromLearn: boolean;
  choiceCorrect: boolean | null;
  beginnerContent: string;
  fExplain: string;
  learnSubject: string;
} {
  return {
    content: _content,
    choiceLabel: _choiceLabel,
    fromLearn: _fromLearn,
    choiceCorrect: _choiceCorrect,
    beginnerContent: _beginnerContent,
    fExplain: _fExplain,
    learnSubject: _learnSubject,
  };
}
