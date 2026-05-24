import { Platform } from 'react-native';

/** もっと深掘るページ用。URL長制限を避けるため、遷移前にここにセットする */
const WEB_SESSION_KEY = 'gq_deepdive_restore_v1';
const RETURN_HREF_KEY = 'gq_deepdive_return_href';
/** Web: 巨大 B 列で本体セッションが入らなくても戻るため（民法総則等） */
const LEARN_BACK_META_KEY = 'gq_deepdive_learn_back_v1';
/** Web: 本文が巨大でも復元できるよう、questions.js 参照用メタだけ別キーで常に保存 */
const QUIZ_DEEPDIVE_META_KEY = 'gq_deepdive_quiz_meta_v1';
/** sessionStorage 上限回避（巨大 B 列などはリロード復元を諦める） */
const WEB_SESSION_MAX_CHARS = 4_000_000;

let _content = '';
let _choiceLabel = '';
/** 見て聞いて覚えるから開いた場合は true（ミニプレイヤーを学習のメインプレイヤーと連動） */
let _fromLearn = false;
/** 問題を解くモードで肢の深掘りを開いたとき、その肢が正解か。null は表示しない（memo 単体・学習など） */
let _choiceCorrect: boolean | null = null;
/** N列（語群未使用シートのみ）。もっと深掘る本文と切り替え表示 */
let _peripheralContent = '';
/** M列のあとに表示。スプレッドシート AZ列（肢ごと）から同期 */
let _beginnerContent = '';
/** 見て聞いて覚える: スプレッドシート F列（解説）。ヘッダー画像の直下に表示 */
let _fExplain = '';
/** 見て聞いて覚える: #連携したK列肢の関連条文。深掘り画面のコマンドから表示 */
let _learnRelatedStatutesContent = '';
/** 見て聞いて覚えるで開いたときの科目キー（例: 債権総論）。共有画像検索の科目スコープ用 */
let _learnSubject = '';
/** 問題を解くモードから開いたときの科目・分野（深掘り表示の切り替え用） */
let _quizSubject = '';
let _quizField = '';
/** 問題画面へ復帰するとき router.replace に載せる（もっと深掘るからの戻りフォールバック用） */
let _quizMode = '';
let _quizShuffle = '';
let _quizQuestionIndex = '';
/** 結果画面など、深掘りを開いた直前の画面（router.back 失敗時の確実な復帰先） */
let _quizReturnTo: { pathname: string; params: Record<string, string> } | null = null;
/** 問題を解くモード: 肢 index（0 始まり）。Web で本文が消えたとき questions.js から復元 */
let _quizChoiceIndex: number | null = null;
/** 問題を解くモード: 復元するフィールド種別 */
let _quizDeepdiveSource = '';
/** 別ページのヘッダー題名（例: 根拠条文＝スプレッドシートI列のみ表示） */
let _screenTitle = '';
/** 見て聞いて覚えるから開いたときのカード番号（0 始まり）。Web 戻り URL 失敗時の合成用 */
let _learnReturnIndex: number | null = null;
/** 学習を開いていた URL（pathname + search）。静的書き出しでそのまま router.replace に渡す */
let _learnReturnPath = '';

/** setDeepdiveParams の learnSubject と同じキーで照合。深掘り中に裏で読み進めた問題番号へ戻す */
export type LearnDeepdiveReturnCursor = {
  learnSubjectKey: string;
  /** /learn/[subject] に渡す subject */
  routeSubject: string;
  field: string | null;
  displayIndex: number;
};

let _learnDeepdiveReturnCursor: LearnDeepdiveReturnCursor | null = null;

export function setLearnDeepdiveReturnCursor(c: LearnDeepdiveReturnCursor | null): void {
  _learnDeepdiveReturnCursor = c;
}

export function getLearnDeepdiveReturnCursor(): LearnDeepdiveReturnCursor | null {
  return _learnDeepdiveReturnCursor;
}

/** Web: /learn/... の戻り URL に index を上書き（query がなければ付与） */
export function applyLearnIndexToLearnReturnPath(pathPrefer: string, index: number | null): string {
  if (index == null || !pathPrefer.startsWith('/learn/')) return pathPrefer;
  const qIdx = pathPrefer.indexOf('?');
  const pathnameOnly = qIdx >= 0 ? pathPrefer.slice(0, qIdx) : pathPrefer;
  const queryStr = qIdx >= 0 ? pathPrefer.slice(qIdx + 1) : '';
  const params = new URLSearchParams(queryStr);
  params.set('index', String(index));
  const qs = params.toString();
  return qs ? `${pathnameOnly}?${qs}` : `${pathnameOnly}?index=${index}`;
}
export function setDeepdiveParams(
  content: string,
  choiceLabel: string,
  options?: {
    fromLearn?: boolean;
    choiceCorrect?: boolean | null;
    beginnerContent?: string;
    peripheralContent?: string;
    fExplain?: string;
    learnRelatedStatutesContent?: string;
    learnSubject?: string;
    /** 見て聞いて覚えるで開いた直前のカード index（オプション） */
    learnReturnIndex?: number;
    quizSubject?: string;
    quizField?: string;
    /** past / bonus / shisho など。深掘りから /question に戻すとき保持 */
    quizMode?: string;
    /** 「1」のときのみシャッフル */
    quizShuffle?: string;
    /** 復帰後の問題 index（問題文と同一セッション用） */
    quizQuestionIndex?: string;
    /** 深掘りを開いた直前の画面（結果画面の解答状態を保持） */
    quizReturnTo?: { pathname: string; params: Record<string, string> };
    /** 0 始まりの肢番号（Web 復元用） */
    quizChoiceIndex?: number;
    /** statuteRef / deepDive / relatedJ / memo 等 */
    quizDeepdiveSource?: string;
    /** 空なら「もっと深掘る」 */
    screenTitle?: string;
  }
) {
  _content = content;
  _choiceLabel = choiceLabel;
  _fromLearn = options?.fromLearn ?? false;
  if (_fromLearn) {
    _quizReturnTo = null;
  }
  _choiceCorrect = options?.choiceCorrect !== undefined ? options.choiceCorrect : null;
  _beginnerContent = options?.beginnerContent?.trim() ? options.beginnerContent.trim() : '';
  _peripheralContent = options?.peripheralContent?.trim() ? options.peripheralContent.trim() : '';
  _fExplain = options?.fExplain?.trim() ? options.fExplain.trim() : '';
  _learnRelatedStatutesContent = options?.learnRelatedStatutesContent?.trim()
    ? options.learnRelatedStatutesContent.trim()
    : '';
  _learnSubject = options?.learnSubject?.trim() ? options.learnSubject.trim() : '';
  _quizSubject = options?.quizSubject?.trim() ? options.quizSubject.trim() : '';
  if (_quizSubject) {
    _quizField = options?.quizField?.trim() ? options.quizField.trim() : '';
    _quizMode = options?.quizMode?.trim() ? options.quizMode.trim() : '';
    _quizShuffle = options?.quizShuffle?.trim() === '1' ? '1' : '';
    _quizQuestionIndex = options?.quizQuestionIndex?.trim() ? options.quizQuestionIndex.trim() : '';
  } else {
    _quizField = '';
    _quizMode = '';
    _quizShuffle = '';
    _quizQuestionIndex = '';
  }
  _screenTitle = options?.screenTitle?.trim() ? options.screenTitle.trim() : '';
  _quizReturnTo =
    options?.quizReturnTo?.pathname?.trim()
      ? {
          pathname: options.quizReturnTo.pathname.trim(),
          params: { ...(options.quizReturnTo.params || {}) },
        }
      : null;
  _quizChoiceIndex =
    typeof options?.quizChoiceIndex === 'number' && options.quizChoiceIndex >= 0
      ? Math.floor(options.quizChoiceIndex)
      : null;
  _quizDeepdiveSource = options?.quizDeepdiveSource?.trim() ? options.quizDeepdiveSource.trim() : '';
  _learnReturnIndex =
    typeof options?.learnReturnIndex === 'number' && options.learnReturnIndex >= 0
      ? Math.floor(options.learnReturnIndex)
      : null;
  _learnReturnPath = '';

  if (Platform.OS === 'web' && typeof sessionStorage !== 'undefined' && typeof window !== 'undefined') {
    const pathOnly = window.location.pathname || '';
    const tail = pathOnly.split('/').filter(Boolean).pop() || '';
    const returnPathSnap =
      _fromLearn && _learnSubject && tail !== 'deepdive'
        ? pathOnly + (window.location.search || '')
        : '';
    if (returnPathSnap) {
      _learnReturnPath = returnPathSnap;
    }

    // 結果画面から開いたときは location をそのまま復帰先に（params 取りこぼし防止）
    if (!_quizReturnTo && tail === 'result') {
      const params: Record<string, string> = {};
      try {
        const sp = new URLSearchParams(window.location.search || '');
        sp.forEach((v, k) => {
          params[k] = v;
        });
      } catch {
        /* noop */
      }
      _quizReturnTo = { pathname: pathOnly || '/result', params };
    }

    // 巨大 JSON より先に書く（quota 枯渇で戻れないのを防ぐ）
    try {
      if (_quizSubject && _quizField) {
        sessionStorage.setItem(
          QUIZ_DEEPDIVE_META_KEY,
          JSON.stringify({
            quizSubject: _quizSubject,
            quizField: _quizField,
            quizMode: _quizMode,
            quizQuestionIndex: _quizQuestionIndex,
            quizChoiceIndex: _quizChoiceIndex,
            quizDeepdiveSource: _quizDeepdiveSource,
            screenTitle: _screenTitle,
            choiceLabel: _choiceLabel,
            quizReturnTo: _quizReturnTo,
          })
        );
      } else {
        sessionStorage.removeItem(QUIZ_DEEPDIVE_META_KEY);
      }
    } catch {
      /* noop */
    }
    try {
      if (_fromLearn && _learnSubject) {
        sessionStorage.setItem(
          LEARN_BACK_META_KEY,
          JSON.stringify({
            sub: _learnSubject,
            idx: _learnReturnIndex,
            /** `/learn/…?index=` の実 URL（静的書き出し・サブパスでも location と一致） */
            p: returnPathSnap || null,
          })
        );
      } else {
        sessionStorage.removeItem(LEARN_BACK_META_KEY);
      }
    } catch {
      /* noop */
    }
    try {
      const path = window.location.pathname || '';
      const tail = path.split('/').filter(Boolean).pop() || '';
      if (tail !== 'deepdive') {
        sessionStorage.setItem(RETURN_HREF_KEY, path + (window.location.search || ''));
      }
    } catch {
      /* noop */
    }
    try {
      const payload = JSON.stringify({
        content: _content,
        choiceLabel: _choiceLabel,
        fromLearn: _fromLearn,
        choiceCorrect: _choiceCorrect,
        beginnerContent: _beginnerContent,
        peripheralContent: _peripheralContent,
        fExplain: _fExplain,
        learnRelatedStatutesContent: _learnRelatedStatutesContent,
        learnSubject: _learnSubject,
        learnReturnIndex: _learnReturnIndex,
        learnReturnPath: _learnReturnPath,
        quizSubject: _quizSubject,
        quizField: _quizField,
        quizMode: _quizMode,
        quizShuffle: _quizShuffle,
        quizQuestionIndex: _quizQuestionIndex,
        quizReturnTo: _quizReturnTo,
        quizChoiceIndex: _quizChoiceIndex,
        quizDeepdiveSource: _quizDeepdiveSource,
        screenTitle: _screenTitle,
      });
      if (payload.length <= WEB_SESSION_MAX_CHARS) {
        sessionStorage.setItem(WEB_SESSION_KEY, payload);
      } else {
        sessionStorage.removeItem(WEB_SESSION_KEY);
      }
    } catch {
      try {
        sessionStorage.removeItem(WEB_SESSION_KEY);
      } catch {
        /* noop */
      }
    }
  }
}

export function takeDeepdiveLearnBackMetaWeb(): {
  sub: string;
  idx: number | null;
  path: string | null;
} | null {
  if (Platform.OS !== 'web' || typeof sessionStorage === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(LEARN_BACK_META_KEY);
    if (raw != null) sessionStorage.removeItem(LEARN_BACK_META_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as { sub?: string; idx?: unknown; p?: unknown };
    const sub = typeof p.sub === 'string' ? p.sub.trim() : '';
    if (!sub) return null;
    const idx =
      typeof p.idx === 'number' && p.idx >= 0 ? Math.floor(p.idx) : null;
    const path = typeof p.p === 'string' && p.p.trim().startsWith('/') ? p.p.trim() : null;
    return { sub, idx, path };
  } catch {
    return null;
  }
}

/** リロード直後など、小型メタから戻り URL だけ復元（キーは消さない） */
export function hydrateLearnBackMetaFromSessionIfMissing(): void {
  if (_learnReturnPath.trim()) return;
  if (Platform.OS !== 'web' || typeof sessionStorage === 'undefined') return;
  try {
    const raw = sessionStorage.getItem(LEARN_BACK_META_KEY);
    if (!raw) return;
    const p = JSON.parse(raw) as { sub?: string; idx?: unknown; p?: unknown };
    const sub = typeof p.sub === 'string' ? p.sub.trim() : '';
    if (sub && !_learnSubject.trim()) {
      _fromLearn = true;
      _learnSubject = sub;
      _learnReturnIndex =
        typeof p.idx === 'number' && p.idx >= 0 ? Math.floor(p.idx) : null;
    }
    if (typeof p.p === 'string' && p.p.trim().startsWith('/')) {
      _learnReturnPath = p.p.trim();
    }
  } catch {
    /* noop */
  }
}

export function peekDeepdiveReturnHrefWeb(): string | null {
  if (Platform.OS !== 'web' || typeof sessionStorage === 'undefined') return null;
  try {
    return sessionStorage.getItem(RETURN_HREF_KEY);
  } catch {
    return null;
  }
}

export function takeDeepdiveReturnHrefWeb(): string | null {
  if (Platform.OS !== 'web' || typeof sessionStorage === 'undefined') return null;
  try {
    const v = sessionStorage.getItem(RETURN_HREF_KEY);
    if (v != null) sessionStorage.removeItem(RETURN_HREF_KEY);
    return v;
  } catch {
    return null;
  }
}

export function hydrateQuizDeepdiveMetaFromSessionIfMissing(): void {
  if (Platform.OS !== 'web' || typeof sessionStorage === 'undefined') return;
  try {
    const raw = sessionStorage.getItem(QUIZ_DEEPDIVE_META_KEY);
    if (!raw) return;
    const p = JSON.parse(raw) as Record<string, unknown>;
    if (!_quizSubject.trim() && typeof p.quizSubject === 'string') _quizSubject = p.quizSubject;
    if (!_quizField.trim() && typeof p.quizField === 'string') _quizField = p.quizField;
    if (!_quizMode.trim() && typeof p.quizMode === 'string') _quizMode = p.quizMode;
    if (!_quizQuestionIndex.trim() && typeof p.quizQuestionIndex === 'string') {
      _quizQuestionIndex = p.quizQuestionIndex;
    }
    if (_quizChoiceIndex == null && typeof p.quizChoiceIndex === 'number' && p.quizChoiceIndex >= 0) {
      _quizChoiceIndex = Math.floor(p.quizChoiceIndex);
    }
    if (!_quizDeepdiveSource.trim() && typeof p.quizDeepdiveSource === 'string') {
      _quizDeepdiveSource = p.quizDeepdiveSource;
    }
    if (!_screenTitle.trim() && typeof p.screenTitle === 'string') _screenTitle = p.screenTitle;
    if (!_choiceLabel.trim() && typeof p.choiceLabel === 'string') _choiceLabel = p.choiceLabel;
    if (!_quizReturnTo && p.quizReturnTo && typeof p.quizReturnTo === 'object') {
      const rt = p.quizReturnTo as { pathname?: string; params?: Record<string, string> };
      if (typeof rt.pathname === 'string' && rt.pathname.trim()) {
        _quizReturnTo = { pathname: rt.pathname.trim(), params: { ...(rt.params || {}) } };
      }
    }
  } catch {
    /* noop */
  }
}

export function hydrateDeepdiveFromSessionIfEmpty(): void {
  hydrateQuizDeepdiveMetaFromSessionIfMissing();
  if (_content.trim()) return;
  if (Platform.OS !== 'web' || typeof sessionStorage === 'undefined') return;
  try {
    const raw = sessionStorage.getItem(WEB_SESSION_KEY);
    if (!raw) return;
    const p = JSON.parse(raw) as Record<string, unknown>;
    if (typeof p.content !== 'string' || !p.content.trim()) return;
    _content = p.content;
    _choiceLabel = typeof p.choiceLabel === 'string' ? p.choiceLabel : '';
    _fromLearn = p.fromLearn === true;
    _choiceCorrect = p.choiceCorrect === true || p.choiceCorrect === false ? p.choiceCorrect : null;
    _beginnerContent = typeof p.beginnerContent === 'string' ? p.beginnerContent : '';
    _peripheralContent = typeof p.peripheralContent === 'string' ? p.peripheralContent : '';
    _fExplain = typeof p.fExplain === 'string' ? p.fExplain : '';
    _learnRelatedStatutesContent =
      typeof p.learnRelatedStatutesContent === 'string' ? p.learnRelatedStatutesContent : '';
    _learnSubject = typeof p.learnSubject === 'string' ? p.learnSubject : '';
    _learnReturnIndex =
      typeof p.learnReturnIndex === 'number' && p.learnReturnIndex >= 0
        ? Math.floor(p.learnReturnIndex)
        : null;
    _learnReturnPath =
      typeof p.learnReturnPath === 'string' && p.learnReturnPath.trim().startsWith('/')
        ? p.learnReturnPath.trim()
        : '';
    _quizSubject = typeof p.quizSubject === 'string' ? p.quizSubject : '';
    _quizField = typeof p.quizField === 'string' ? p.quizField : '';
    _quizMode = typeof (p as { quizMode?: unknown }).quizMode === 'string' ? (p as { quizMode: string }).quizMode : '';
    _quizShuffle =
      typeof (p as { quizShuffle?: unknown }).quizShuffle === 'string' ? (p as { quizShuffle: string }).quizShuffle : '';
    _quizQuestionIndex =
      typeof (p as { quizQuestionIndex?: unknown }).quizQuestionIndex === 'string'
        ? (p as { quizQuestionIndex: string }).quizQuestionIndex
        : '';
    _quizChoiceIndex =
      typeof (p as { quizChoiceIndex?: unknown }).quizChoiceIndex === 'number' &&
      (p as { quizChoiceIndex: number }).quizChoiceIndex >= 0
        ? Math.floor((p as { quizChoiceIndex: number }).quizChoiceIndex)
        : _quizChoiceIndex;
    _quizDeepdiveSource =
      typeof (p as { quizDeepdiveSource?: unknown }).quizDeepdiveSource === 'string'
        ? (p as { quizDeepdiveSource: string }).quizDeepdiveSource
        : _quizDeepdiveSource;
    const rawReturnTo = (p as { quizReturnTo?: unknown }).quizReturnTo;
    if (
      rawReturnTo &&
      typeof rawReturnTo === 'object' &&
      typeof (rawReturnTo as { pathname?: unknown }).pathname === 'string'
    ) {
      const rt = rawReturnTo as { pathname: string; params?: Record<string, string> };
      _quizReturnTo = {
        pathname: rt.pathname.trim(),
        params: { ...(rt.params || {}) },
      };
    }
    _screenTitle = typeof p.screenTitle === 'string' ? p.screenTitle : '';
  } catch {
    try {
      sessionStorage.removeItem(WEB_SESSION_KEY);
    } catch {
      /* noop */
    }
  }
}

/** Web: 解説へ戻ったあとリロードで古い深掘りが復活しないようにする */
export function clearDeepdiveSessionWeb(): void {
  if (Platform.OS !== 'web' || typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.removeItem(WEB_SESSION_KEY);
    sessionStorage.removeItem(RETURN_HREF_KEY);
    sessionStorage.removeItem(LEARN_BACK_META_KEY);
    sessionStorage.removeItem(QUIZ_DEEPDIVE_META_KEY);
  } catch {
    /* noop */
  }
}

/** 読み取りでクリアしない（React Strict Mode の二重マウントで内容・[[image:…]] が失われるのを防ぐ）。次の setDeepdiveParams で上書きされる */
export function getDeepdiveParams(): {
  content: string;
  choiceLabel: string;
  fromLearn: boolean;
  choiceCorrect: boolean | null;
  beginnerContent: string;
  peripheralContent: string;
  fExplain: string;
  learnRelatedStatutesContent: string;
  learnSubject: string;
  learnReturnIndex: number | null;
  learnReturnPath: string;
  quizSubject: string;
  quizField: string;
  quizMode: string;
  quizShuffle: string;
  quizQuestionIndex: string;
  quizReturnTo: { pathname: string; params: Record<string, string> } | null;
  quizChoiceIndex: number | null;
  quizDeepdiveSource: string;
  screenTitle: string;
} {
  return {
    content: _content,
    choiceLabel: _choiceLabel,
    fromLearn: _fromLearn,
    choiceCorrect: _choiceCorrect,
    beginnerContent: _beginnerContent,
    peripheralContent: _peripheralContent,
    fExplain: _fExplain,
    learnRelatedStatutesContent: _learnRelatedStatutesContent,
    learnSubject: _learnSubject,
    learnReturnIndex: _learnReturnIndex,
    learnReturnPath: _learnReturnPath,
    quizSubject: _quizSubject,
    quizField: _quizField,
    quizMode: _quizMode,
    quizShuffle: _quizShuffle,
    quizQuestionIndex: _quizQuestionIndex,
    quizReturnTo: _quizReturnTo,
    quizChoiceIndex: _quizChoiceIndex,
    quizDeepdiveSource: _quizDeepdiveSource,
    screenTitle: _screenTitle,
  };
}
