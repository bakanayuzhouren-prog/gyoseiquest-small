/**
 * lec-koukai-2026-round1-topics.json → learn / bonus / knowledge MD
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const input = path.join(root, 'data/moshi/lec-koukai-2026-round1-topics.json');

const args = [
  'scripts/buildMoshiTopicLearning.mjs',
  input,
  '--round=第1回',
  '--source-prefix=LEC公開模試',
  '--learn-out=src/lec_koukai_moshi_learn_content.js',
  '--bonus-out=src/lec_koukai_moshi_bonus_questions.js',
  '--md-out=data/knowledge/creator/prep-school/lec-koukai-2026-round1-topics.md',
  '--learn-export=LEC_KOUKAI_MOSHI_LEARN_BY_SUBJECT',
  '--bonus-export=LEC_KOUKAI_MOSHI_BONUS_QUESTIONS',
];

const result = spawnSync('node', args, { stdio: 'inherit', cwd: root });
process.exit(result.status ?? 1);
