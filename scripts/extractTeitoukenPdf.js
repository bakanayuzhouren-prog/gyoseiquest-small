// PDF（スプレッドシート書き出し等）を MD に落とす。content/textbook/teitouken 内の最初の .pdf を対象。
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const DIR = path.join(__dirname, '../content/textbook/teitouken');
/** 自動抽出はバンドル対象外の archive に出す（学習用に整えた 01〜 を上書きしない） */
const OUT = path.join(DIR, 'archive/_extract-sheet1-latest.md');

function main() {
  if (!fs.existsSync(DIR)) {
    console.error('missing:', DIR);
    process.exit(1);
  }
  const pdfs = fs.readdirSync(DIR).filter((f) => f.endsWith('.pdf')).sort();
  if (pdfs.length === 0) {
    console.error('No .pdf in', DIR);
    process.exit(1);
  }
  const pdfName = pdfs[0];
  const buf = fs.readFileSync(path.join(DIR, pdfName));

  pdf(buf).then((data) => {
    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    let t = (data.text || '').replace(/\r\n/g, '\n');
    t = t.replace(/\n{3,}/g, '\n\n');
    t = t.replace(/(第[一二三四五六七八九十百零〇０-９0-9]+条)/g, '\n\n$1');
    t = t.trim();

    const body = [
      '# 抵当権の教科書（スプレッドシート書き出し）',
      '',
      `> 元ファイル: \`${pdfName}\`（PDF から自動抽出。レイアウトは崩れていることがあります。）`,
      '',
      t,
      '',
    ].join('\n');

    fs.writeFileSync(OUT, body, 'utf8');
    console.log('Wrote', OUT, `(${body.length} chars, ${data.numpages} pages)`);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

main();
