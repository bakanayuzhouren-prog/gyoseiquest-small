import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const positional = argv.filter((arg) => !arg.startsWith('--'));
  const args = {
    image: positional[0],
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rows: 60,
    choices: 5,
    rowGapRatio: 0.12,
    colGapRatio: 0.12,
    minDarknessGap: 0.035,
    out: '',
  };

  for (const arg of argv) {
    const [key, rawValue] = arg.replace(/^--/, '').split('=');
    if (!rawValue) continue;
    if (key in args && key !== 'image' && key !== 'out') args[key] = Number(rawValue);
    if (key === 'out') args.out = rawValue;
  }

  return args;
}

function mean(values) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function darknessOfCell(buffer, imageWidth, x0, y0, width, height) {
  const values = [];
  const left = Math.max(0, Math.floor(x0));
  const top = Math.max(0, Math.floor(y0));
  const right = Math.max(left + 1, Math.floor(x0 + width));
  const bottom = Math.max(top + 1, Math.floor(y0 + height));

  for (let y = top; y < bottom; y += 1) {
    for (let x = left; x < right; x += 1) {
      const idx = y * imageWidth + x;
      const lightness = buffer[idx] ?? 255;
      values.push(1 - lightness / 255);
    }
  }

  return mean(values);
}

function answerForRow(cells, minDarknessGap) {
  const ranked = cells
    .map((darkness, index) => ({ choice: index + 1, darkness }))
    .sort((a, b) => b.darkness - a.darkness);
  const top = ranked[0];
  const second = ranked[1];
  if (!top || !second) return { answer: '', confidence: 'low', darknessGap: 0 };
  const gap = top.darkness - second.darkness;
  if (gap < minDarknessGap) return { answer: '', confidence: 'low', darknessGap: gap };
  return {
    answer: String(top.choice),
    confidence: gap >= minDarknessGap * 2 ? 'high' : 'medium',
    darknessGap: gap,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.image) {
    throw new Error(
      '使い方: npm run read:moshi-marksheet -- <画像> --x=100 --y=200 --width=900 --height=1800 [--rows=60 --choices=5 --out=tmp/moshi-ocr/answers.txt]'
    );
  }
  if (args.width <= 0 || args.height <= 0) {
    throw new Error('解答欄の矩形を --x --y --width --height で指定してください。');
  }

  const imagePath = path.resolve(ROOT, args.image);
  const image = sharp(imagePath).rotate().grayscale();
  const metadata = await image.metadata();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const imageWidth = info.width || metadata.width || 0;

  const rowPitch = args.height / args.rows;
  const colPitch = args.width / args.choices;
  const cellWidth = colPitch * (1 - args.colGapRatio);
  const cellHeight = rowPitch * (1 - args.rowGapRatio);
  const answers = [];

  for (let row = 0; row < args.rows; row += 1) {
    const cells = [];
    for (let col = 0; col < args.choices; col += 1) {
      const x = args.x + col * colPitch + (colPitch - cellWidth) / 2;
      const y = args.y + row * rowPitch + (rowPitch - cellHeight) / 2;
      cells.push(darknessOfCell(data, imageWidth, x, y, cellWidth, cellHeight));
    }
    const result = answerForRow(cells, args.minDarknessGap);
    answers.push({
      question: row + 1,
      answer: result.answer,
      confidence: result.confidence,
      darknessGap: Number(result.darknessGap.toFixed(4)),
      cells: cells.map((value) => Number(value.toFixed(4))),
    });
  }

  const text = answers
    .map((item) =>
      item.answer
        ? `問${item.question} 回答 ${item.answer} # ${item.confidence} gap=${item.darknessGap}`
        : `問${item.question} 回答 ? # low gap=${item.darknessGap}`
    )
    .join('\n');

  const json = JSON.stringify(
    {
      image: path.relative(ROOT, imagePath),
      rect: { x: args.x, y: args.y, width: args.width, height: args.height },
      rows: args.rows,
      choices: args.choices,
      answers,
    },
    null,
    2
  );

  if (args.out) {
    const outPath = path.resolve(ROOT, args.out);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, text, 'utf8');
    await fs.writeFile(outPath.replace(/\.[^.]+$/, '.json'), json, 'utf8');
    console.log(`Wrote ${path.relative(ROOT, outPath)}`);
  } else {
    console.log(text);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
