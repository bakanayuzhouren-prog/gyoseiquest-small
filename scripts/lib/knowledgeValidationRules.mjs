/**
 * 知識MD生成時の論点チェックリスト。
 * 矛盾検出時は warnings 配列に ruleId / message / severity を返す。
 */

/** @typedef {{ ruleId: string; message: string; severity: 'warning' | 'error'; snippet?: string }} ValidationWarning */

const KATA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワ';

/** @param {number} i */
export function limbLabel(i) {
  return KATA[i] || String(i + 1);
}

/**
 * @param {string} text
 * @param {{ type?: string; answer?: unknown[]; choices?: string[] }} [context]
 * @returns {ValidationWarning[]}
 */
export function validateKnowledgeText(text, context = {}) {
  if (!text || typeof text !== 'string') return [];
  const warnings = /** @type {ValidationWarning[]} */ ([]);
  const t = text.replace(/\r\n/g, '\n');

  if (/(333条|先取特権)/.test(t) && /占有改定.*(含まれない|あたらない|該当しない|不可)/.test(t)) {
    const m = t.match(/占有改定.*(含まれない|あたらない|該当しない|不可)/);
    const ctx = m && m.index != null ? t.slice(Math.max(0, m.index - 100), m.index + m[0].length + 80) : t;
    const isNegatedTrap =
      /(誤り|×|\[\[red:×\]\]|ひっかけ|含まれない.*→.*×|あたらない.*→.*×)/.test(ctx);
    const is192Context = /192条|即時取得/.test(ctx);
    if (!isNegatedTrap && !is192Context) {
      warnings.push({
        ruleId: 'senkyoten-333',
        severity: 'warning',
        message:
          '333条/先取特権の「引渡し」に占有改定は含まれる（大判大6.7.26）。「含まれない」記述は要確認。',
        snippet: extractSnippet(t, /占有改定.*(含まれない|あたらない)/),
      });
    }
  }

  if (/(192条|即時取得)/.test(t)) {
    for (const m of t.matchAll(/占有改定[\s\S]{0,40}?(含まれる|あたる|可能|引渡しに含)/g)) {
      const start = m.index ?? 0;
      const ctx = t.slice(Math.max(0, start - 100), start + m[0].length + 100);
      if (!/(192条|即時取得)/.test(ctx)) continue;
      if (/含まれない|あたらない|不可|×|誤り|\[\[red:×\]\]/.test(ctx)) continue;
      warnings.push({
        ruleId: 'senkyoten-192',
        severity: 'warning',
        message: '192条/即時取得の「占有を始めた」に占有改定は含まれない（最判昭35.2.11）。',
        snippet: ctx.replace(/\s+/g, ' ').trim(),
      });
      break;
    }
  }

  if (/質権/.test(t)) {
    const badPatterns = [
      /質権.*占有改定.*(可能|効力を生|設定できる|含まれる|足りる)/,
      /占有改定.*質権.*(可能|効力を生|設定できる|含まれる)/,
      /質権の設定.*占有改定.*(有効|認め)/,
    ];
    for (const re of badPatterns) {
      const m = t.match(re);
      if (!m || m.index == null) continue;
      const ctx = t.slice(Math.max(0, m.index - 40), m.index + m[0].length + 80);
      if (/345条|含まれない|不可|禁止|誤り|×|\[\[red:×\]\]|あたらない/.test(ctx)) continue;
      warnings.push({
        ruleId: 'senkyoten-345',
        severity: 'warning',
        message: '質権の設定に占有改定は使えない（345条）。',
        snippet: extractSnippet(t, re),
      });
      break;
    }
  }

  const idx333 = t.search(/333条|先取特権.*引渡し/);
  if (idx333 >= 0) {
    const window = t.slice(Math.max(0, idx333 - 120), idx333 + 200);
    if (/最判昭32|昭和32\.6\.27|昭32\.6\.27/.test(window) && !/370条|抵当|物権的請求/.test(window)) {
      warnings.push({
        ruleId: 'case-mismatch-333',
        severity: 'warning',
        message: '333条の根拠判例は大判大6.7.26。最判昭32.6.27は即時取得（192条）の判例であり混同注意。',
        snippet: window.slice(0, 120),
      });
    }
  }

  if (context.type === 'quiz' && Array.isArray(context.choices) && context.choices.length > 0) {
    const ans = context.answer;
    if (!Array.isArray(ans) || ans.length === 0) {
      if (!context.isReorder && !context.isDescriptive && !context.hasSlots) {
        warnings.push({
          ruleId: 'answer-mismatch',
          severity: 'warning',
          message: '正解肢（answer）が未設定。スプレッドシートK列の（ｒ）を確認。',
        });
      }
    }
  }

  return dedupeWarnings(warnings);
}

/** @param {ValidationWarning[]} warnings */
export function formatValidationBlockquotes(warnings) {
  if (!warnings.length) return '';
  return (
    warnings
      .map(
        (w) =>
          `> **要確認** [${w.ruleId}] ${w.message}${w.snippet ? `\n> \n> \`${w.snippet.slice(0, 100).replace(/\n/g, ' ')}…\`\`` : ''}`
      )
      .join('\n\n') + '\n\n'
  );
}

/** @param {string} text */
function extractSnippet(text, re) {
  const m = text.match(re);
  if (!m || m.index == null) return '';
  const start = Math.max(0, m.index - 40);
  return text.slice(start, m.index + m[0].length + 40).replace(/\s+/g, ' ').trim();
}

/** @param {ValidationWarning[]} warnings */
function dedupeWarnings(warnings) {
  const seen = new Set();
  return warnings.filter((w) => {
    const k = w.ruleId + w.message.slice(0, 40);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/** @param {string} text */
export function extractStatuteTags(text) {
  const tags = new Set();
  if (!text) return [];
  let m;
  const re = /(?:民法)?(\d{1,4})条/g;
  while ((m = re.exec(text)) !== null) {
    tags.add(`${m[1]}条`);
  }
  if (/占有改定/.test(text)) tags.add('占有改定');
  if (/即時取得/.test(text)) tags.add('即時取得');
  if (/先取特権/.test(text)) tags.add('先取特権');
  if (/譲渡担保/.test(text)) tags.add('譲渡担保');
  if (/質権/.test(text)) tags.add('質権');
  return [...tags].slice(0, 20);
}
