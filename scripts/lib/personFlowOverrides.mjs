/**
 * 登場人物図の手修正データ（hash → diagram JSON）
 * generateMinpouPersonFlowDiagrams / renderPersonFlowOverride で参照
 */

const Q40_SHIJI = {
  nodes: [
    { id: 'B' },
    { id: 'C', above: '①Bのゲーム機を保管' },
    { id: 'D', above: '③承諾' },
  ],
  edges: [
    { from: 'B', to: 'C', label: '②Dの為に保管せよ', labelAbove: true },
    { from: 'C', to: 'D', arrow: false },
  ],
};

/** 民法物権 Q6: 権原なき建物・甲土地＋乙建物・縦2コマ */
const Q6_LAND_BUILDING = {
  layout: 'landBuilding',
  land: { label: '①甲土地（A所有）', owner: 'A' },
  moods: { A: 'neutral', B: 'bad', C: 'sly' },
  before: {
    buildingTitle: '乙建物',
    buildingTags: ['②Bが権原なく建設', '（B名義）'],
    sideLabel: '占有者＝B',
  },
  transition: { label: '②乙建物をCに譲渡' },
  after: {
    landLabel: '甲土地（A所有）',
    buildingTitle: '乙建物',
    buildingTags: ['（B名義のまま）'],
    sideLabel: '③現占有者＝C',
  },
};

/** 民法物権 Q104: 譲渡担保×先取特権×占有改定 — 物の流れ */
const Q104_JOTO_TANPO = {
  layout: 'thingFlow',
  title: '物の流れ',
  actors: [
    { id: 'メーカー', kind: 'role', sub: '売主・先取特権者' },
    { id: 'カマダ電気', kind: 'institution', sub: '譲渡担保設定者' },
    { id: '銀行', kind: 'role', sub: '譲渡担保債権者' },
  ],
  actorOrder: ['メーカー', 'カマダ電気', '銀行'],
  flows: [
    {
      from: 'メーカー',
      to: 'カマダ電気',
      label: '①売却（代金未払）',
      thingLabel: 'フードプロセッサー（動産）',
    },
    { from: 'カマダ電気', to: '銀行', label: '②占有改定', dashed: true },
  ],
  note: '333条の「引渡し」に占有改定は含まれる → 先取特権は消滅',
};

export const PERSON_FLOW_OVERRIDE_BY_LEARN_KEY = {
  'learn|民法物権|104': Q104_JOTO_TANPO,
};

export const PERSON_FLOW_OVERRIDES = {
  /** 民法物権 Q40: 指図による占有移転 */
  l9ze71: Q40_SHIJI,
  vgt9ex: Q40_SHIJI,
  /** 民法物権 Q6: 権原なき建物 */
  '6z1p5r': Q6_LAND_BUILDING,
  /** 民法物権 Q104: 譲渡担保×先取特権 */
  edp1g5: Q104_JOTO_TANPO,
  '7n47yv': Q104_JOTO_TANPO,
};

export function getPersonFlowOverride(hash, learnKey) {
  if (hash && PERSON_FLOW_OVERRIDES[hash]) return PERSON_FLOW_OVERRIDES[hash];
  if (learnKey && PERSON_FLOW_OVERRIDE_BY_LEARN_KEY[learnKey]) {
    return PERSON_FLOW_OVERRIDE_BY_LEARN_KEY[learnKey];
  }
  return null;
}
