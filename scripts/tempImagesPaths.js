/**
 * temp_images の canonical パス（learn = 見て聞いて覚える、quiz = 問題を解く）
 */
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = path.join(ROOT, 'temp_images');

const PATHS = {
  learnKenpou: path.join(BASE, 'learn', 'kenpou'),
  learnSaikensouron: path.join(BASE, 'learn', 'saikensouron'),
  learnMinnpouBukken: path.join(BASE, 'learn', 'minnpou', 'bukken'),
  quizRoot: path.join(BASE, 'quiz'),
  quizKakuronn: path.join(BASE, 'quiz', 'kakuronn'),
  quizBukken: path.join(BASE, 'quiz', 'bukken'),
  quizGyouseihou: path.join(BASE, 'quiz', 'gyouseihou'),
  quizSousoku: path.join(BASE, 'quiz', 'sousoku'),
};

module.exports = { ROOT, BASE, PATHS };
