// archive/sheet1-pdf-extract-original.md の「【試験年-問題-肢】」形式の行の直前に ## 見出しを付与（二重実行しても増えない）。
// 過去問行が続くときは先頭の1行にだけ見出しを付ける。そのあいだに空行・箇条書き（(a)・②・→・(1) 等）のみあれば同一ブロックとして維持する。
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../content/textbook/teitouken/archive/sheet1-pdf-extract-original.md');

/** 例: 【18-30-2】 【22-30-ア】 【2-29-1】 【21-29-エ】 — 第3要素は数字1〜2桁またはア行の片仮名 */
const RE_LINE =
  /^【([0-9０-９]+-[0-9０-９]+-(?:[0-9０-９]{1,2}|[アイウエオ]))】/;
const RE_BOLD = /^\*\*【([0-9０-９]+-[0-9０-９]+-[0-9０-９]+)】\*\*/;
const RE_HEADING_WE_ADDED = /^## 過去問 【.+】\s*$/;

function stripOurHeadings(lines) {
  return lines.filter((line) => !RE_HEADING_WE_ADDED.test(line));
}

/** 過去問と過去問のあいだの「つなぎ」行。この行だけでは過去問ブロックを切らない。【】で始まる通常本文は対象にしないこと。 */
function isBridgingPastQuestionGap(line) {
  const s = line.trim();
  // (a), (z), … 半角括弧アルファベット1字
  if (/^\([a-zA-Z]\)\s/.test(s)) return true;
  // (1), (99) — 桁数は短文み出しのみ想定（大きければ本文になり得るので注意）
  if (/^\(\d{1,2}\)\s/.test(s)) return true;
  // ①–⑳ 系（行頭のみ）
  if (/^[\u2460-\u2473]\s/.test(s)) return true;
  // 「→」「・」のみの読み順行、タブインデント行
  if (/^→\s/.test(s)) return true;
  if (/^・/.test(s)) return true;
  if (/^\t\S/.test(line)) return true;
  // 前行の続き：行頭インデント（PDF由来の 「　 イ …」 は全角が1つのみのことあり）
  if (/^[\u3000]+\s*\S/.test(line)) return true;
  return false;
}

function main() {
  const lines = stripOurHeadings(fs.readFileSync(FILE, 'utf8').split(/\r?\n/));
  const out = [];

  function alreadyMarked(id) {
    const h = `## 過去問 【${id}】`;
    const last = out[out.length - 1];
    const prev = out[out.length - 2];
    return prev === h && last === '';
  }

  let pastQuestionRun = false;

  for (const line of lines) {
    const m = line.match(RE_LINE) || line.match(RE_BOLD);
    if (m) {
      if (!pastQuestionRun) {
        const id = m[1];
        if (!alreadyMarked(id)) {
          if (out.length && out[out.length - 1].trim() !== '') out.push('');
          out.push(`## 過去問 【${id}】`);
          out.push('');
        }
      }
      pastQuestionRun = true;
      out.push(line);
    } else {
      out.push(line);
      const t = line.trim();
      if (t !== '' && !isBridgingPastQuestionGap(line)) pastQuestionRun = false;
    }
  }

  fs.writeFileSync(FILE, out.join('\n'), 'utf8');
  console.log('insertTeitoukenPastQuestionHeadings: wrote', FILE);
}

main();
