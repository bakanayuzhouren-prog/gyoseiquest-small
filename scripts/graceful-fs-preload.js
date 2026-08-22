/**
 * Metro が Windows/OneDrive で EMFILE になるのを緩和する。
 * 1) graceful-fs
 * 2) readFileSync の EMFILE リトライ（ソースマップ生成時の同時オープン対策）
 */
const fs = require('fs');
require('graceful-fs').gracefulify(fs);

const origReadFileSync = fs.readFileSync.bind(fs);
fs.readFileSync = function readFileSyncWithRetry(...args) {
  let lastError;
  for (let attempt = 0; attempt < 80; attempt++) {
    try {
      return origReadFileSync(...args);
    } catch (error) {
      lastError = error;
      if (!error || error.code !== 'EMFILE') throw error;
      // 他のハンドルが閉じるのを少し待つ（同期）
      const until = Date.now() + 15 + attempt;
      while (Date.now() < until) {
        /* spin */
      }
    }
  }
  throw lastError;
};
