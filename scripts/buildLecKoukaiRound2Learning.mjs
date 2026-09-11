/**
 * lec-koukai-2026-round2-topics.json → learn / bonus / knowledge MD
 * 第1回の出力先は触らない。
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const input = path.join(root, 'data/moshi/lec-koukai-2026-round2-topics.json');

const args = [
  'scripts/buildMoshiTopicLearning.mjs',
  input,
  '--round=第2回',
  '--source-prefix=LEC公開模試',
  '--learn-out=src/lec_koukai_moshi_round2_learn_content.js',
  '--bonus-out=src/lec_koukai_moshi_round2_bonus_questions.js',
  '--md-out=data/knowledge/creator/prep-school/lec-koukai-2026-round2-topics.md',
  '--learn-export=LEC_KOUKAI_MOSHI_ROUND2_LEARN_BY_SUBJECT',
  '--bonus-export=LEC_KOUKAI_MOSHI_ROUND2_BONUS_QUESTIONS',
];

const result = spawnSync('node', args, { stdio: 'inherit', cwd: root });
if ((result.status ?? 1) !== 0) process.exit(result.status ?? 1);

const mdPath = path.join(root, 'data/knowledge/creator/prep-school/lec-koukai-2026-round2-topics.md');
const topics = JSON.parse(fs.readFileSync(input, 'utf8'));
const reviewNums = topics.topics.filter((t) => t.status === 'needs_review').map((t) => t.questionNumber);
let md = fs.readFileSync(mdPath, 'utf8');
md = md.replace(
  'tags: [合格革命, 模試, 論点, もっと深掘る, ボーナス問題]',
  'tags: [LEC公開模試, 第2回, 模試, 論点, もっと深掘る, ボーナス問題]',
);
md = md.replace(
  /- 未構造化の問題番号:.*$/m,
  `- 未構造化の問題番号: ${reviewNums.length ? reviewNums.join('、') + '（needs_review。質問機能には収録）' : 'なし'}`,
);
fs.writeFileSync(mdPath, md);
process.exit(0);
