/**
 * 画像ではない「登場人物・関係の構造図」データ。
 * 選択肢ごとに登場人物が変わる前提（questionHash → 肢ごとの配列）。
 */

export type StructuralNodeTone = 'court' | 'person' | 'guardian' | 'supervisor' | 'neutral';

export type StructuralPersonFlowNode = {
  id: string;
  label: string;
  /** 債権者・債務者・機関などの短い役割 */
  role?: string;
  tone?: StructuralNodeTone;
};

export type StructuralPersonFlowEdge = {
  from: string;
  to: string;
  label: string;
  /** 任意・例外は破線 */
  dashed?: boolean;
};

export type StructuralPersonFlowStep = {
  label: string;
  detail?: string;
};

export type StructuralPersonFlowDiagram = {
  title: string;
  /** 何の図か一言 */
  subtitle?: string;
  steps?: StructuralPersonFlowStep[];
  nodes: StructuralPersonFlowNode[];
  edges: StructuralPersonFlowEdge[];
  /** 試験で切るポイント */
  notes?: string[];
};

/** 問題文ハッシュ → 選択肢ごとの構造図（index = 肢番号 0始まり） */
export const STRUCTURAL_BY_QUESTION_CHOICE: Record<string, StructuralPersonFlowDiagram[]> = {
  // 民法総則 Q1 制限行為能力者
  wfye8b: [
    // 肢1: 後見開始＋監督人選任義務（ひっかけ）
    {
      title: '肢1：後見開始と後見監督人',
      subtitle: '登場：家庭裁判所・本人・後見人・後見監督人',
      steps: [
        { label: '① 後見開始の審判', detail: '家庭裁判所が行う' },
        { label: '② 成年後見人を付す', detail: '本人（成年被後見人）に付けるのは義務' },
        { label: '③ 後見監督人', detail: '同時に必ず選任、ではない（肢の誤りポイント）' },
      ],
      nodes: [
        { id: 'court', label: '家庭裁判所', role: '審判', tone: 'court' },
        { id: 'person', label: '本人', role: '成年被後見人', tone: 'person' },
        { id: 'guardian', label: '成年後見人', role: '保護者（付す義務あり）', tone: 'guardian' },
        { id: 'supervisor', label: '後見監督人', role: '監督（必須ではない）', tone: 'supervisor' },
      ],
      edges: [
        { from: 'court', to: 'person', label: '後見開始の審判' },
        { from: 'court', to: 'guardian', label: '選任して本人に付す' },
        { from: 'guardian', to: 'person', label: '事務・代理' },
        {
          from: 'court',
          to: 'supervisor',
          label: '選任義務はない（職権で可）',
          dashed: true,
        },
        { from: 'supervisor', to: 'guardian', label: '事務を監督', dashed: true },
      ],
      notes: ['正しい理解：後見人は付すが、後見監督人の同時選任は義務ではない'],
    },
    // 肢2: 保佐の同意権の範囲
    {
      title: '肢2：被保佐人と保佐人の同意',
      subtitle: '登場：被保佐人・保佐人・家庭裁判所',
      steps: [
        { label: '① 原則', detail: '同意が必要な行為は民法13条1項の法定行為' },
        { label: '② 拡張', detail: '家裁は審判で、法定以外にも同意を要する行為を定められる' },
      ],
      nodes: [
        { id: 'person', label: '被保佐人', role: '本人', tone: 'person' },
        { id: 'guardian', label: '保佐人', role: '同意権者', tone: 'guardian' },
        { id: 'court', label: '家庭裁判所', role: '同意範囲の審判', tone: 'court' },
      ],
      edges: [
        { from: 'guardian', to: 'person', label: '法定行為への同意' },
        {
          from: 'court',
          to: 'person',
          label: '審判で同意対象を広げられる',
        },
        { from: 'court', to: 'guardian', label: '保佐人の同意が要る行為を指定' },
      ],
      notes: ['ひっかけ：「法定行為以外は審判でも広げられない」は誤り'],
    },
    // 肢3: 保佐人への代理権付与
    {
      title: '肢3：保佐人への代理権付与',
      subtitle: '登場：家庭裁判所・本人・保佐人（請求者）',
      steps: [
        { label: '① 請求', detail: '本人・保佐人等' },
        { label: '② 代理権付与の審判', detail: '特定の法律行為について保佐人に代理権' },
        { label: '③ 本人以外の請求', detail: '本人の同意が必要' },
      ],
      nodes: [
        { id: 'court', label: '家庭裁判所', role: '審判', tone: 'court' },
        { id: 'person', label: '本人（被保佐人）', role: '同意が要る場合あり', tone: 'person' },
        { id: 'guardian', label: '保佐人', role: '代理権を付与される側', tone: 'guardian' },
        { id: 'requester', label: '請求者', role: '本人以外もあり', tone: 'neutral' },
      ],
      edges: [
        { from: 'requester', to: 'court', label: '代理権付与を請求' },
        { from: 'court', to: 'guardian', label: '特定行為の代理権を付与' },
        {
          from: 'person',
          to: 'court',
          label: '本人以外の請求なら同意',
          dashed: true,
        },
      ],
      notes: ['同意権と代理権付与は別物。代理権付与は本人同意がポイント'],
    },
    // 肢4: 補助開始
    {
      title: '肢4：補助開始の審判',
      subtitle: '登場：家庭裁判所・本人・配偶者等',
      steps: [
        { label: '① 請求', detail: '本人・配偶者等' },
        { label: '② 補助開始', detail: '本人以外の請求には本人同意が必要' },
      ],
      nodes: [
        { id: 'court', label: '家庭裁判所', role: '審判', tone: 'court' },
        { id: 'person', label: '本人', role: '被補助人となる人', tone: 'person' },
        { id: 'spouse', label: '配偶者等', role: '請求できる利害関係人', tone: 'neutral' },
        { id: 'helper', label: '補助人', role: '開始後に付く保護者', tone: 'guardian' },
      ],
      edges: [
        { from: 'spouse', to: 'court', label: '補助開始を請求' },
        {
          from: 'person',
          to: 'court',
          label: '本人以外の請求→本人同意',
        },
        { from: 'court', to: 'person', label: '補助開始の審判' },
        { from: 'court', to: 'helper', label: '補助人を付す' },
      ],
      notes: ['後見・保佐と違い、補助開始は本人同意が目立つ'],
    },
    // 肢5: 後見⇔保佐・補助の切替
    {
      title: '肢5：開始審判どうしの切替',
      subtitle: '登場：本人・後見／保佐／補助の各審判',
      steps: [
        { label: '① 後見開始へ', detail: 'すでに保佐・補助なら、その審判を取り消す必要あり（整理）' },
        { label: '② 保佐開始へ', detail: 'すでに後見なら、後見開始を取り消す' },
      ],
      nodes: [
        { id: 'court', label: '家庭裁判所', role: '審判の整理', tone: 'court' },
        { id: 'person', label: '本人', role: '状態が変わる中心', tone: 'person' },
        { id: 'kouken', label: '後見開始', role: '最も重い保護', tone: 'guardian' },
        { id: 'hosa', label: '保佐開始', role: '中間', tone: 'supervisor' },
        { id: 'hojo', label: '補助開始', role: '軽い保護', tone: 'neutral' },
      ],
      edges: [
        { from: 'court', to: 'kouken', label: '後見開始' },
        {
          from: 'hosa',
          to: 'kouken',
          label: '後見へ移るとき保佐を取り消す',
          dashed: true,
        },
        {
          from: 'hojo',
          to: 'kouken',
          label: '後見へ移るとき補助を取り消す',
          dashed: true,
        },
        {
          from: 'kouken',
          to: 'hosa',
          label: '保佐へ移るとき後見を取り消す',
          dashed: true,
        },
      ],
      notes: ['「取り消す必要はない」側がひっかけになりやすい。方向を図で固定する'],
    },
    // 肢6: 後見監督人の欠格
    {
      title: '肢6：後見監督人になれない人',
      subtitle: '登場：後見人の近親者 ↔ 後見監督人',
      nodes: [
        { id: 'guardian', label: '後見人', role: '保護者', tone: 'guardian' },
        { id: 'spouse', label: '配偶者・直系血族・兄弟姉妹', role: '後見人の近親', tone: 'neutral' },
        { id: 'supervisor', label: '後見監督人', role: '欠格でなれない', tone: 'supervisor' },
      ],
      edges: [
        {
          from: 'spouse',
          to: 'supervisor',
          label: 'なれない（欠格）',
          dashed: true,
        },
        { from: 'supervisor', to: 'guardian', label: '本来は監督する立場' },
      ],
      notes: ['監督の公平のため、後見人の近い親族は監督人になれない'],
    },
    // 肢7: 保佐開始と本人同意
    {
      title: '肢7：保佐開始と本人同意',
      subtitle: '登場：家庭裁判所・本人',
      steps: [{ label: '保佐開始の審判', detail: '本人の同意は不要' }],
      nodes: [
        { id: 'court', label: '家庭裁判所', role: '審判', tone: 'court' },
        { id: 'person', label: '本人', role: '同意は不要', tone: 'person' },
        { id: 'guardian', label: '保佐人', role: '開始後に付く', tone: 'guardian' },
      ],
      edges: [
        { from: 'court', to: 'person', label: '保佐開始（本人同意なし）' },
        { from: 'court', to: 'guardian', label: '保佐人を付す' },
      ],
      notes: ['補助開始（本人同意が要る）と対比して覚える'],
    },
    // 肢8: 職権で後見監督人
    {
      title: '肢8：職権による後見監督人選任',
      subtitle: '登場：家庭裁判所・後見監督人（法人も可）',
      nodes: [
        { id: 'court', label: '家庭裁判所', role: '職権で選任可', tone: 'court' },
        { id: 'supervisor', label: '後見監督人', role: '法人でも可', tone: 'supervisor' },
        { id: 'guardian', label: '後見人', role: '監督される側', tone: 'guardian' },
      ],
      edges: [
        { from: 'court', to: 'supervisor', label: '職権で選任（義務ではない）' },
        { from: 'supervisor', to: 'guardian', label: '事務を監督' },
      ],
      notes: ['「選任できる」と「選任しなければならない」を取り違えない'],
    },
  ],
};

/** 問題全体の俯瞰図（選択肢未指定時のフォールバック） */
export const STRUCTURAL_BY_QUESTION_HASH: Record<string, StructuralPersonFlowDiagram> = {
  wfye8b: {
    title: '制限行為能力：誰が動き、何が付くか（全体）',
    subtitle: '各選択肢の登場人物は、肢ごとの「登場人物」から見てください',
    steps: [
      { label: '① 請求', detail: '本人・配偶者・四親等内の親族など' },
      { label: '② 家庭裁判所の審判', detail: '後見／保佐／補助の開始' },
      { label: '③ 保護者を付す', detail: '後見人・保佐人・補助人' },
      { label: '④ 監督人', detail: '職権で選任可。開始と同時の義務はない' },
    ],
    nodes: [
      { id: 'court', label: '家庭裁判所', role: '審判機関', tone: 'court' },
      { id: 'person', label: '本人', role: '被後見人等', tone: 'person' },
      { id: 'guardian', label: '保護者', role: '後見人・保佐人・補助人', tone: 'guardian' },
      { id: 'supervisor', label: '監督人', role: '任意', tone: 'supervisor' },
    ],
    edges: [
      { from: 'court', to: 'person', label: '開始の審判' },
      { from: 'court', to: 'guardian', label: '選任して付す' },
      { from: 'guardian', to: 'person', label: '同意・代理など' },
      { from: 'court', to: 'supervisor', label: '職権選任可', dashed: true },
      { from: 'supervisor', to: 'guardian', label: '監督', dashed: true },
    ],
    notes: ['詳細な登場人物は各肢の図で確認'],
  },
};

export function getStructuralPersonFlowByHash(
  hash: string,
): StructuralPersonFlowDiagram | null {
  return STRUCTURAL_BY_QUESTION_HASH[hash] || null;
}

export function getStructuralPersonFlowForChoice(
  hash: string,
  choiceIndex: number,
): StructuralPersonFlowDiagram | null {
  if (!Number.isFinite(choiceIndex) || choiceIndex < 0) return null;
  const list = STRUCTURAL_BY_QUESTION_CHOICE[hash];
  if (!list || choiceIndex >= list.length) return null;
  return list[choiceIndex] || null;
}

export function hasStructuralPersonFlowForChoice(
  hash: string,
  choiceIndex: number,
): boolean {
  return getStructuralPersonFlowForChoice(hash, choiceIndex) != null;
}
