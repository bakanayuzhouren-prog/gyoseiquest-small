// Windows / OneDrive で Metro が EMFILE (too many open files) になる対策
try {
  require('graceful-fs').gracefulify(require('fs'));
} catch {
  // graceful-fs が無い環境ではスキップ
}

const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// 同時オープンを抑える（Desktop/OneDrive 上で特に有効）
config.maxWorkers = 1;

module.exports = config;
