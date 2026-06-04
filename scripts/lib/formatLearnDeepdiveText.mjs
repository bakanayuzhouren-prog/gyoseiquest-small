/**
 * 見て聞いて覚える・B列深掘りを Q3 形式（太字見出し・改行・[[red:]]・[[c:#]]）に整える
 */

const HALFWD_NUM_HEAD = /[1-9][0-9]?[\.．:：\uFF1A](?!\d)\s*(?:\*\*|＊＊|[^\s\n　])/;
const FULLWD_NUM_HEAD = /[１-９][０-９]?[\.．:：\uFF1A](?![０-９])\s*(?:\*\*|＊＊|[^\s\n　])/;
const CASE_LAW_RE = /(最判|大判)((?:昭|平|令|大|明)[0-9]{1,2}[\.．][0-9]{1,2}(?:[\.．][0-9]{1,2})?(?:（[^）]{0,30}）)?)/g;

const KEYWORD_BREAKS =
  /(考え方のポイント|法理のポイント|受験生へのアドバイス|判示：|事案：|根拠条文：|根拠判例：|根拠となる判例：|重要判例：|結論：|具体例|ケース：|結果：|ポイント：|ひっかけ：|状況：)/g;

const BLUE_HEAD_RE =
  /^(範囲の特定|第三者の承諾|目的の限定|抵当権設定の可否|明認方法|立木登記|対抗力|「通路の開設」の主体|「継続的」の意味|特定の3要素|当事者か第三者か|前か後か|相手にできる|占有改定|将来の動産|対抗要件)$/;

function normalizeBlankLines(text) {
  return text
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim();
}

/** AI誤字・判例タグ破損・「とメカニズム」連結・空** を一括修正 */
function fixKnownDefects(text) {
  let t = text;
  t = t
    .replace(/最\[\[red:大判/g, '[[red:大判')
    .replace(/最\[\[red:最判/g, '[[red:最判')
    .replace(/\bT17\./g, '平17.')
    .replace(/\bT穏/g, '平穏')
    .replace(/\bT等/g, '平等')
    .replace(/\bS架/g, '高架')
    .replace(/\bS圧/g, '高圧')
    .replace(/\bS価/g, '高価')
    .replace(/\bSく/g, '高く')
    .replace(/\bSい/g, '高い')
    .replace(/\bS度/g, '高度')
    .replace(/標S/g, '標高')
    .replace(/優先弁済県/g, '優先弁済権');
  t = t.replace(/(\*\*2\. 具体例\*\*)\s*\n?\s*とメカニズム/g, '$1\n\n');
  t = t.replace(/(^|\n)とメカニズム(?=[^\n])/gm, '$1');
  t = t.replace(/(\*\*[1-4]\. [^*\n]{2,40}?)(結論[:：])/g, '$1**\n\n**$2');
  t = t.replace(/([1-4])\. ([^*\n]{2,40}?)(結論[:：])/g, '$1. $2\n\n$3');
  t = t.replace(/\*\*([1-4]\. 根拠[^*]+?)結論[:：]([^*]+)\*\*/g, '**$1**\n\n**結論：$2**');
  t = t.replace(/\*\*\s*\*\*/g, '');
  t = t.replace(/\*\*\n\s*\*\*/g, '\n\n');
  return t;
}

function isAlreadyFormatted(text) {
  const t = text.trim();
  return /^\*\*[1-4][\.．]/.test(t) && (t.match(/\n/g) || []).length >= 8;
}

function preInsertNewlines(raw) {
  return raw
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/根拠法\s*\n\s*([12])[:：]/g, '根拠法$1：')
    .replace(/([^\n])(【[^】]{1,80}】)/g, '$1\n$2')
    .replace(
      /([^\n■💡🏠👉🔍📚📝 \t　])(考え方のポイント|受験生へのアドバイス|趣旨|根拠条文[:：]|根拠判例[:：]|根拠となる判例[:：]|重要判例[:：]|結論[:：]|具体的な事例|ここが試験の勝負どころ|関連知識|判示[:：]|事案[:：]|ケース[:：]|結果[:：]|状況[:：])/g,
      '$1\n\n$2',
    )
    .replace(/([^\n*])([1-4])[\.．]\s*(?=根拠|具体例|過去問|周辺知識)/g, '$1\n\n$2. ')
    .replace(new RegExp(`([^\\n*])(${HALFWD_NUM_HEAD.source})`, 'g'), '$1\n$2')
    .replace(new RegExp(`([^\\n*])(${FULLWD_NUM_HEAD.source})`, 'g'), '$1\n$2')
    .replace(/([^\n])([①②③④⑤⑥⑦⑧⑨⑩])/g, '$1\n$2')
    .replace(/^([1-4])\.\n(根拠|具体例|過去問|周辺知識)/gm, '$1. $2');
}

function normalizeFlowText(s) {
  const t = s.replace(/\r\n/g, '\n').trim();
  if (!t) return t;
  const isLabelLine = (line) =>
    /^(?:地下|空中|建物|ケース[A-Z]|状況|結果|種類|所在|量的)[^：\n]{0,24}：\s*$/.test(line.trim());
  return t
    .split(/\n{2,}/)
    .map((block) => {
      const rowLines = block.trim().split('\n').map((l) => l.trim()).filter(Boolean);
      if (rowLines.some((l) => /^-\s+/.test(l) || isLabelLine(l))) {
        return rowLines.join('\n');
      }
      let b = block.trim();
      b = b.replace(/[ \t]*\n[ \t]*/g, ' ').replace(/[ \u3000]{2,}/g, ' ');
      b = b.replace(/([^\n*])([1-4])[\.．]\s*(?=根拠|具体例|過去問|周辺知識)/g, '$1\n\n$2. ');
      b = b.replace(new RegExp(`([^\\n*])(${HALFWD_NUM_HEAD.source})`, 'g'), '$1\n$2');
      b = b.replace(new RegExp(`([^\\n*])(${FULLWD_NUM_HEAD.source})`, 'g'), '$1\n$2');
      b = b.replace(/([^\n])([①②③④⑤⑥⑦⑧⑨⑩])/g, '$1\n$2');
      b = b.replace(/。(?!\n)(?![」』）\)])(?=[^\s])/g, '。\n');
      b = b.replace(KEYWORD_BREAKS, '\n\n$1');
      return b
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .join('\n');
    })
    .filter(Boolean)
    .join('\n\n');
}

function splitGluedSectionLine(line) {
  const m = line.match(/^([1-4])\. ([^結]+?)(結論[:：].+)$/);
  if (m) return [`${m[1]}. ${m[2].trim()}`, m[3].trim()];
  const m2 = line.match(/^([1-4])\. (具体例)\s*(.+)$/);
  if (m2) return [`${m2[1]}. ${m2[2]}`, m2[3].trim()];
  const m3 = line.match(/^([1-4])\. (過去問の急所（ひっかけ対策）)(.+)$/);
  if (m3) return [`${m3[1]}. ${m3[2]}`, m3[3].trim()];
  const m4 = line.match(/^([1-4])\. (周辺知識(?:（[^）]+）)?)(.+)$/);
  if (m4) return [`${m4[1]}. ${m4[2]}`, m4[3].trim()];
  return [line];
}

function splitGluedConclusion(line) {
  const m = line.match(/^(結論[:：])(可能|不可能|正しい|誤り|できる|できない|その通り[^。]*)(.+)$/);
  if (m && m[3].trim().length > 4) {
    return [`${m[1]}${m[2]}`, m[3].trim()];
  }
  return [line];
}

function highlightCaseLaw(text) {
  return text.replace(CASE_LAW_RE, (full, _k, _d, offset, whole) => {
    const before = whole.slice(Math.max(0, offset - 12), offset);
    if (before.includes('[[red:') || before.includes('**[[red:')) return full;
    return `[[red:${full}]]`;
  });
}

function highlightTraps(text) {
  let t = text;
  t = t.replace(
    /([^。\n*]{4,35})×誤り[:：]\s*「([^」]*)」\s*○正しい[:：]\s*([^。\n]+(?:。)?)/g,
    (_, topic, wrong, right) => {
      const head = `**${topic.trim()}**`;
      const wrongPart = wrong ? `「${wrong}」` : '';
      return `${head}\n→ ${wrongPart}：**[[red:×]]**\n→ **[[red:○]]**${right.trim()}`;
    },
  );
  t = t.replace(
    /([^。\n*]{4,35})×誤り[:：]\s*([^○\n]+?)\s*○正しい[:：]\s*([^。\n]+(?:。)?)/g,
    (_, topic, wrong, right) => {
      if (topic.includes('[[red:')) return _;
      const head = `**${topic.trim()}**`;
      return `${head}\n→ ${wrong.trim()}：**[[red:×]]**\n→ **[[red:○]]**${right.trim()}`;
    },
  );
  return t
    .replace(/→\s*×(?!\])/g, '→ **[[red:×]]**')
    .replace(/正解：×(?!\])/g, '正解：**[[red:×]]**')
    .replace(/正解：○(?!\])/g, '正解：**[[red:○]]**')
    .replace(/ひっかけ：\s*「([^」]+)」→\s*×/g, 'ひっかけ：「$1」→ **[[red:×]]**');
}

function mergeLabelParagraphs(text) {
  const lines = text.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const labelOnly = line.match(/^((?:地下|空中|建物|ケース[A-Z]|状況|結果|と重要判例)[^：\n]{0,30}：)\s*$/);
    if (labelOnly) {
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j++;
      if (j < lines.length && lines[j].trim() && !/^[1-4]\./.test(lines[j]) && !lines[j].startsWith('**')) {
        out.push(`- **${labelOnly[1].replace(/：$/, '')}：** ${lines[j].trim()}`);
        i = j;
        continue;
      }
    }
    const caseGlued = line.match(/^(ケース[A-Z][：:].+?)(ケース[A-Z][：:])/);
    if (caseGlued) {
      out.push(`- ${caseGlued[1].trim()}`);
      out.push(`- ${line.slice(caseGlued[1].length).trim()}`);
      continue;
    }
    out.push(line);
  }
  return out.join('\n');
}

function formatExamSubheads(text) {
  return text
    .split('\n')
    .map((line) => {
      const t = line.trim();
      if (!t || t.startsWith('**') || t.startsWith('- ') || t.startsWith('→')) return line;
      if (BLUE_HEAD_RE.test(t)) {
        return `**[[c:#1565c0&b]]${t}[[/c]]**`;
      }
      if (/^「[^」]{2,20}」(?:の主体|の意味)?$/.test(t)) {
        return `**${t}**`;
      }
      if (/^[^。：\n「]{2,14}$/.test(t) && !/^(民法|最判|大判|ポイント)/.test(t) && !/[）)]/.test(t)) {
        return `**${t}**`;
      }
      return line;
    })
    .join('\n');
}

function formatCaseLawLines(text) {
  return text
    .replace(
      /^(根拠判例|根拠となる判例|重要判例)[:：]\s*(\[\[red:[^\]]+\]\]|最判[^\n]+|大判[^\n]+)(.*)$/gm,
      (_, label, cite, rest) => {
        const citeNorm = cite.startsWith('[[') ? cite : `[[red:${cite.trim()}]]`;
        const tail = rest.trim();
        return `**${label}：${citeNorm}**${tail ? `\n\n${tail.replace(/^内容[:：]\s*/, '内容：')}` : ''}`;
      },
    )
    .replace(/^(判示|事案)[:：]\s*/gm, '$1：');
}

function applyLineMarkup(line) {
  let t = line.trim();
  if (!t) return t;

  if (/^【要点解説】/.test(t) && !t.startsWith('**')) {
    return `**${t}**`;
  }

  const sec = t.match(/^([1-4])\. (.+)$/);
  if (sec && !t.startsWith('**')) {
    return `**${sec[1]}. ${sec[2].trim()}**`;
  }

  if (/^結論[:：]/.test(t) && !t.startsWith('**')) {
    return `**${t.replace(/[:：]/, '：')}**`;
  }

  if (/^考え方のポイント/.test(t) && !t.startsWith('**')) {
    const rest = t.replace(/^考え方のポイント[:：]?\s*/, '');
    return rest ? `**考え方のポイント**\n\n${rest}` : '**考え方のポイント**';
  }
  if (/^法理のポイント/.test(t) && !t.startsWith('**')) {
    const rest = t.replace(/^法理のポイント[:：]?\s*/, '');
    return rest ? `**法理のポイント**\n\n${rest}` : '**法理のポイント**';
  }
  if (/^受験生へのアドバイス/.test(t) && !t.startsWith('**')) {
    const rest = t.replace(/^受験生へのアドバイス[:：]?\s*/, '');
    return rest ? `**受験生へのアドバイス**\n\n${rest}` : '**受験生へのアドバイス**';
  }

  if (/^(根拠条文|根拠判例|根拠となる判例)[:：]/.test(t) && !t.startsWith('**')) {
    const idx = t.indexOf('：');
    const label = t.slice(0, idx + 1);
    const body = t.slice(idx + 1).trim();
    return `**${label}**${body ? `\n\n${body}` : ''}`;
  }

  if (/^ケース[A-Z][：:]/.test(t) && !t.startsWith('- ')) {
    return `- ${t}`;
  }

  if (/^(種類|所在場所|量的範囲|地下|空中|結果|状況)[:：]/.test(t) && !t.startsWith('- ')) {
    return `- ${t}`;
  }

  if (/^[-・]\s*(即時取得|実行|覚え方)/.test(t) && !t.startsWith('- **')) {
    return t.replace(/^[-・]\s*/, '- **').replace(/[:：]/, '：**');
  }

  return t;
}

function postProcessSections(text) {
  return text
    .replace(/^([1-4])\.\n(根拠|具体例|過去問|周辺知識)/gm, '$1. $2')
    .replace(/^([1-4])\. (具体例)([^:\n\s].+)$/gm, '$1. $2\n\n$3')
    .replace(/^([1-4])\. (過去問の急所（ひっかけ対策）)(.+)$/gm, '$1. $2\n\n$3')
    .replace(/^([1-4])\. (周辺知識（[^）]+）)(.+)$/gm, '$1. $2\n\n$3')
    .replace(
      /^\*\*([1-4])\. (過去問の急所（ひっかけ対策）)([^*]+)\*\*$/gm,
      '**$1. $2**\n\n$3',
    )
    .replace(/^趣旨\n/gm, '**趣旨**\n\n')
    .replace(/^趣旨$/gm, '**趣旨**');
}

function processLines(text) {
  const expanded = [];
  for (const line of text.split('\n')) {
    for (const part of splitGluedSectionLine(line)) {
      if (/^結論[:：]/.test(part)) {
        expanded.push(...splitGluedConclusion(part));
      } else {
        expanded.push(part);
      }
    }
  }
  return expanded.map((line) => applyLineMarkup(line)).join('\n');
}

function formatPipeline(t) {
  t = fixKnownDefects(t);
  t = mergeLabelParagraphs(t);
  t = processLines(t);
  t = postProcessSections(t);
  t = processLines(t);
  t = formatCaseLawLines(t);
  t = highlightCaseLaw(t);
  t = formatExamSubheads(t);
  t = highlightTraps(t);
  return normalizeBlankLines(fixKnownDefects(t));
}

/**
 * @param {string} raw
 * @returns {string}
 */
export function formatLearnDeepdiveText(raw) {
  if (!raw || !String(raw).trim()) return raw ?? '';

  if (isAlreadyFormatted(raw)) {
    return formatPipeline(raw);
  }

  let t = String(raw).replace(/\r\n/g, '\n').trim();

  t = t.replace(
    /【要点解説】([^\n1-9１-９]+?)(?=[1-9１-９][\.．]\s*(?:根拠|具体例|過去問|周辺知識))/u,
    '【要点解説】$1\n\n',
  );
  t = preInsertNewlines(t);
  t = normalizeFlowText(t);
  return formatPipeline(t);
}
