/**
 * 問題文から Q40 形式（①ノード上・②矢印上・③承諾等）の関係図 JSON を組み立てる
 */

const CIRCLED = ['①', '②', '③', '④', '⑤', '⑥'];

function extractOrderedChars(text) {
  const ids = [];
  for (const m of text.matchAll(/\b([A-H])\b/g)) {
    if (!ids.includes(m[1])) ids.push(m[1]);
    if (ids.length >= 6) break;
  }
  return ids;
}

function extractThing(text, ownerId) {
  const m = text.match(new RegExp(`${ownerId}の([^、。を]+?)を`));
  if (m) return m[1].trim().slice(0, 10);
  if (/ゲーム機|スイッチ/.test(text)) return 'ゲーム機';
  if (/土地|甲土地/.test(text)) return '土地';
  if (/建物|乙建物/.test(text)) return '建物';
  if (/債権/.test(text)) return '債権';
  if (/動産/.test(text)) return '動産';
  return '';
}

function clip(s, n = 14) {
  return String(s || '').replace(/\s+/g, '').slice(0, n);
}

/** 指図による占有移転（Q40 型） */
function tryShijiPattern(text, chars) {
  if (!/保管/.test(text) || !/命じ/.test(text) || !/承諾/.test(text)) return null;
  if (chars.length < 3) return null;

  const thingM = text.match(/([A-H])の([^を]+?)を/);
  const owner = thingM?.[1] || chars[0];
  const thing = clip(thingM?.[2] || extractThing(text, owner), 8);

  const agentM = text.match(/受寄者の([A-H])|([A-H])が[^。]*?保管/);
  const agent = agentM?.[1] || agentM?.[2] || chars[1];

  const benM = text.match(/([A-H])のために/);
  const beneficiary = benM?.[1] || chars[2];

  const consentM = text.match(/([A-H])が承諾/);
  const consent = consentM?.[1] || beneficiary;

  const ordered = [owner, agent, consent].filter((id, i, a) => id && a.indexOf(id) === i);
  if (ordered.length < 3) return null;

  return {
    nodes: [
      { id: ordered[0] },
      { id: ordered[1], above: thing ? `${CIRCLED[0]}${ordered[0]}の${thing}を保管` : `${CIRCLED[0]}保管` },
      { id: ordered[2], above: `${CIRCLED[2]}承諾` },
    ],
    edges: [
      {
        from: ordered[0],
        to: ordered[1],
        label: `${CIRCLED[1]}${beneficiary}の為に保管せよ`,
        labelAbove: true,
      },
      { from: ordered[1], to: ordered[2], arrow: false },
    ],
  };
}

/** A→B→C 連鎖（譲渡・売却・仮装譲渡など） */
function tryChainPattern(text, chars) {
  if (chars.length < 3) return null;

  const verbs = [];
  if (/仮装譲渡/.test(text)) verbs.push('仮装譲渡');
  else if (/譲渡/.test(text)) verbs.push('譲渡');
  if (/売却/.test(text)) verbs.push('売却');
  else if (/売買/.test(text)) verbs.push('売買');
  if (/賃貸/.test(text)) verbs.push('賃貸');
  if (/抵当権を設定/.test(text)) verbs.push('抵当設定');
  if (/差し押さえ/.test(text)) verbs.push('差押');

  if (verbs.length === 0) return null;

  const [a, b, c] = chars;
  const v1 = verbs[0];
  const v2 = verbs[1] || verbs[0];
  const cAbove = /承諾/.test(text) ? `${CIRCLED[2]}承諾` : /善意/.test(text) ? `${CIRCLED[2]}善意` : undefined;

  return {
    nodes: [
      { id: a },
      { id: b, above: `${CIRCLED[1]}${v1}受け` },
      { id: c, ...(cAbove ? { above: cAbove } : {}) },
    ],
    edges: [
      { from: a, to: b, label: `${CIRCLED[0]}${v1}`, labelAbove: v1.length > 4 },
      {
        from: b,
        to: c,
        label: `${CIRCLED[2]}${v2}`,
        labelAbove: v2.length > 4,
        ...(cAbove === `${CIRCLED[2]}承諾` ? { arrow: false } : {}),
      },
    ],
  };
}

/** 無権代理・代理（A=本人, B=代理人, C=相手） */
function tryAgentPattern(text, chars) {
  if (!/代理人|無権代理|偽って/.test(text)) return null;
  const sellerM = text.match(/([A-H])が売主/);
  const buyerM = text.match(/([A-H])が買主/);
  const fakeM = text.match(/([A-H])は([A-H])の代理人と偽/);
  const principal = sellerM?.[1] || fakeM?.[2] || chars[0];
  const agent = fakeM?.[1] || chars.find((c) => c !== principal && c !== buyerM?.[1]) || chars[1];
  const counter = buyerM?.[1] || chars.find((c) => c !== principal && c !== agent) || chars[2];
  if (!principal || !agent || !counter) return null;

  return {
    nodes: [
      { id: principal },
      { id: agent, above: `${CIRCLED[0]}無権代理` },
      { id: counter, above: `${CIRCLED[2]}買主` },
    ],
    edges: [
      { from: agent, to: counter, label: `${CIRCLED[1]}契約締結`, labelAbove: true },
      { from: principal, to: agent, arrow: false },
    ],
  };
}

/** 2者間（売買・相続・時効など） */
function tryPairPattern(text, chars) {
  if (chars.length !== 2) return null;
  const [a, b] = chars;
  let label = '';
  let aboveB = '';
  if (/売却|売買/.test(text)) label = `${CIRCLED[0]}売買`;
  else if (/譲渡/.test(text)) label = `${CIRCLED[0]}譲渡`;
  else if (/相続/.test(text)) label = `${CIRCLED[0]}相続`;
  else if (/時効/.test(text)) label = `${CIRCLED[0]}時効取得`;
  else if (/賃貸|賃借/.test(text)) label = `${CIRCLED[0]}賃貸借`;
  else if (/抵当/.test(text)) label = `${CIRCLED[0]}抵当設定`;
  else if (/留置/.test(text)) label = `${CIRCLED[0]}留置`;
  else if (/占有/.test(text)) label = `${CIRCLED[0]}占有`;
  else if (/請求/.test(text)) label = `${CIRCLED[0]}請求`;
  else label = `${CIRCLED[0]}関係`;

  if (/悪意/.test(text) && text.indexOf('悪意') < text.indexOf(b)) aboveB = `${CIRCLED[1]}悪意`;
  else if (/善意/.test(text) && text.includes(b)) aboveB = `${CIRCLED[1]}善意`;

  return {
    nodes: [{ id: a }, { id: b, ...(aboveB ? { above: aboveB } : {}) }],
    edges: [{ from: a, to: b, label, labelAbove: label.length > 6 }],
  };
}

/** 汎用：登場順に連結し、問題文から動詞を拾う */
function tryGenericChain(text, chars) {
  if (chars.length < 2) return null;

  const verbPool = [
    '仮装譲渡', '譲渡', '売却', '売買', '賃貸', '抵当設定', '相続', '保管', '占有', '引渡',
    '明渡', '請求', '承諾', '設定', '処分', '時効取得', '返還', '差押', '競売',
  ];
  let verb = verbPool.find((v) => text.includes(v.replace('設定', '権を設定'))) || '';
  if (!verb && /設定/.test(text)) verb = '設定';

  const nodes = chars.map((id, i) => {
    if (i === 0) return { id };
    if (i === 1 && verb) return { id, above: `${CIRCLED[0]}${verb}` };
    if (i === chars.length - 1 && /承諾/.test(text)) return { id, above: `${CIRCLED[Math.min(i, 5)]}承諾` };
    if (i === chars.length - 1 && /善意/.test(text)) return { id, above: `${CIRCLED[Math.min(i, 5)]}善意` };
    return { id };
  });

  const edges = [];
  for (let i = 0; i < chars.length - 1; i++) {
    const lbl =
      i === 0 && verb
        ? `${CIRCLED[i]}${verb}`
        : `${CIRCLED[Math.min(i + 1, 5)]}${verb || '移転'}`;
    const plain = i === chars.length - 2 && /承諾/.test(text);
    edges.push({
      from: chars[i],
      to: chars[i + 1],
      label: lbl,
      labelAbove: lbl.length > 8,
      ...(plain ? { arrow: false } : {}),
    });
  }

  return { nodes, edges };
}

/** Gemini / 旧形式 JSON を Q40 形式に寄せる */
export function normalizeDiagramData(data, text = '') {
  if (!data) return null;
  if (data.layout === 'landBuilding') return data;
  const nodes = (data.nodes || []).map((n) => {
    const id = String(n.id || '').toUpperCase().slice(0, 2);
    const above = n.above || (n.role ? String(n.role) : undefined);
    return above ? { id, above: clip(above, 16) } : { id };
  });
  const edges = (data.edges || []).map((e) => {
    let label = String(e.label || '').trim();
    if (!label || label === '関係') label = '';
    if (label && !/^[①-⑥]/.test(label)) label = clip(label, 14);
    const edge = {
      from: String(e.from || '').toUpperCase().slice(0, 2),
      to: String(e.to || '').toUpperCase().slice(0, 2),
      ...(label ? { label } : {}),
      ...(e.arrow === false ? { arrow: false } : {}),
      ...(e.labelAbove === true || (label && label.length > 8) ? { labelAbove: true } : {}),
    };
    return edge;
  });
  return { nodes, edges, assets: data.assets || [] };
}

/** 甲土地＋乙建物・権原なき建物型（縦2コマ） */
function tryLandBuildingPattern(text, chars) {
  if (chars.length < 3) return null;

  const hasLand = /[甲乙丙丁]土地|土地上|共有地/.test(text);
  const hasUnauthorized = /権原なく|無権原|無断で[^。]*?建|無断で[^。]*?築造/.test(text);
  const hasBuilding = /[甲乙丙丁]建物|建物を建設|建物を築造|建物が存在/.test(text);
  if (!hasLand || !hasUnauthorized || !hasBuilding) return null;
  if (!/譲渡/.test(text)) return null;

  const landM = text.match(/([甲乙丙丁])土地/);
  const landName = landM ? `${landM[1]}土地` : /共有地/.test(text) ? '共有地' : '甲土地';

  const bldM = text.match(/([甲乙丙丁])建物/);
  const buildingName = bldM ? `${bldM[1]}建物` : '乙建物';

  const ownerM = text.match(/([A-H])所有の[^、。]*?(?:[甲乙丙丁])?土地|([A-H])が所有する[^、。]*?(?:[甲乙丙丁])?土地/);
  const owner = ownerM?.[1] || ownerM?.[2] || chars[0];

  const builderM =
    text.match(/([A-H])が権原なく[^、。]*?建設/) ||
    text.match(/([A-H])が権原なく[^、。]*?築造/) ||
    text.match(/権原なく([A-H])所有/);
  const builder = builderM?.[1] || chars.find((c) => c !== owner) || 'B';

  const transM = text.match(/([A-H])に譲渡/);
  const transferee = transM?.[1] || chars.find((c) => c !== owner && c !== builder) || chars[chars.length - 1];

  const unregistered = /未登記/.test(text);
  const beforeTags = unregistered
    ? [`②${builder}が権原なく建設`, '（未登記）']
    : [`②${builder}が権原なく建設`, `（${builder}名義）`];
  const afterTags = unregistered ? ['（未登記のまま）'] : [`（${builder}名義のまま）`];

  const unregTransfer = text.match(/未登記のまま([A-H])に譲渡/);
  const transitionLabel = unregTransfer
    ? `②未登記のまま${transferee}に譲渡`
    : `②${buildingName}を${transferee}に譲渡`;

  return {
    layout: 'landBuilding',
    land: { label: `①${landName}（${owner}所有）`, owner },
    moods: { [owner]: 'neutral', [builder]: 'bad', [transferee]: 'sly' },
    before: {
      buildingTitle: buildingName,
      buildingTags: beforeTags,
      sideLabel: `占有者＝${builder}`,
    },
    transition: { label: transitionLabel },
    after: {
      landLabel: `${landName}（${owner}所有）`,
      buildingTitle: buildingName,
      buildingTags: afterTags,
      sideLabel: `③現占有者＝${transferee}`,
    },
  };
}

/**
 * @param {string} text 正規化済み問題文
 * @returns {object|null}
 */
export function buildPersonFlowDiagramFromText(text) {
  const t = String(text || '').trim();
  if (!t) return null;

  const chars = extractOrderedChars(t);
  if (chars.length < 2) return null;

  const landBuilding = tryLandBuildingPattern(t, chars);
  if (landBuilding) return landBuilding;

  const builders = [tryShijiPattern, tryAgentPattern, tryChainPattern, tryPairPattern, tryGenericChain];
  for (const fn of builders) {
    const diagram = fn(t, chars);
    if (diagram?.nodes?.length >= 2 && diagram?.edges?.length >= 1) {
      return normalizeDiagramData(diagram, t);
    }
  }
  return null;
}
