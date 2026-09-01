/**
 * Metro が Windows/OneDrive で EMFILE になるのを緩和する。
 * 1) graceful-fs
 * 2) open/read の EMFILE リトライ（ソースマップ生成時の同時オープン対策）
 */
const fs = require('fs');
require('graceful-fs').gracefulify(fs);

function sleepMs(ms) {
  const buf = new SharedArrayBuffer(4);
  Atomics.wait(new Int32Array(buf), 0, 0, ms);
}

function withEmfileRetry(fn) {
  return function retried(...args) {
    let lastError;
    for (let attempt = 0; attempt < 200; attempt++) {
      try {
        return fn(...args);
      } catch (error) {
        lastError = error;
        if (!error || error.code !== 'EMFILE') throw error;
        sleepMs(20 + Math.min(attempt * 4, 120));
      }
    }
    throw lastError;
  };
}

fs.readFileSync = withEmfileRetry(fs.readFileSync.bind(fs));
fs.openSync = withEmfileRetry(fs.openSync.bind(fs));
if (typeof fs.promises?.open === 'function') {
  const origOpen = fs.promises.open.bind(fs.promises);
  fs.promises.open = async function openWithRetry(...args) {
    let lastError;
    for (let attempt = 0; attempt < 200; attempt++) {
      try {
        return await origOpen(...args);
      } catch (error) {
        lastError = error;
        if (!error || error.code !== 'EMFILE') throw error;
        await new Promise((r) => setTimeout(r, 20 + Math.min(attempt * 4, 120)));
      }
    }
    throw lastError;
  };
}
