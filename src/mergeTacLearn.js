/**
 * TAC見て聞いて覚えるカードを sync 済み learn データの末尾に結合する。
 * @param {Record<string, string[]>} content
 * @param {Record<string, string[]>} deepdive
 * @param {Record<string, string[]>} fExplain
 * @param {Record<string, string[]>} statuteRefs
 * @param {Record<string, string[]>} source
 * @param {Record<string, unknown[]>} links
 * @param {import('./tac_learn_content.js').TAC_LEARN_BY_SUBJECT} tac
 */
export function mergeTacLearn(content, deepdive, fExplain, statuteRefs, source, links, tac) {
  const outContent = { ...content };
  const outDeepdive = { ...deepdive };
  const outF = { ...fExplain };
  const outStatute = { ...statuteRefs };
  const outSource = { ...source };
  const outLinks = { ...links };

  for (const [subject, items] of Object.entries(tac)) {
    if (!Array.isArray(items) || items.length === 0) continue;
    const prevC = outContent[subject];
    outContent[subject] = [...(Array.isArray(prevC) ? prevC : []), ...items.map((i) => i.text)];
    const prevD = outDeepdive[subject];
    outDeepdive[subject] = [...(Array.isArray(prevD) ? prevD : []), ...items.map((i) => i.deepdive || '')];
    const prevF = outF[subject];
    outF[subject] = [...(Array.isArray(prevF) ? prevF : []), ...items.map((i) => i.fExplain || '')];
    const prevS = outStatute[subject];
    outStatute[subject] = [...(Array.isArray(prevS) ? prevS : []), ...items.map((i) => i.statuteRef || '')];
    const prevSrc = outSource[subject];
    outSource[subject] = [
      ...(Array.isArray(prevSrc) ? prevSrc : []),
      ...items.map((i) => i.source || 'TAC第1回'),
    ];
    if (!outLinks[subject]) outLinks[subject] = [];
    const prevL = outLinks[subject];
    for (let i = 0; i < items.length; i++) {
      const link = items[i].link;
      if (link) prevL.push(link);
    }
    outLinks[subject] = prevL;
  }

  for (const key of Object.keys(outContent)) {
    const c = outContent[key];
    const d = outDeepdive[key];
    if (!Array.isArray(c) || !Array.isArray(d)) continue;
    while (d.length < c.length) d.push('');
    if (!outF[key]) outF[key] = [];
    while (outF[key].length < c.length) outF[key].push('');
    if (!outStatute[key]) outStatute[key] = [];
    while (outStatute[key].length < c.length) outStatute[key].push('');
    if (!outSource[key]) outSource[key] = [];
    while (outSource[key].length < c.length) outSource[key].push('');
  }

  return {
    LEARN_CONTENT: outContent,
    LEARN_DEEPDIVE: outDeepdive,
    LEARN_F_EXPLAIN: outF,
    LEARN_STATUTE_REFS: outStatute,
    LEARN_SOURCE: outSource,
    LEARN_LINKS: outLinks,
  };
}
