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

// 模試写真は tmp/模試画像。app/ からもバンドル・監視しない
// Node 24 は metro-config/src/defaults/exclusionList を exports 外として拒否する。
// exclusionList() は Windows で [\\/] を壊すので、既存 blockList に正規表現を足す。
const moshiImageIgnore = /[\\/](tmp|app)[\\/]模試画像[\\/].*/;
const existingBlockList = config.resolver.blockList;
config.resolver.blockList = existingBlockList
  ? [existingBlockList, moshiImageIgnore].flat()
  : moshiImageIgnore;
config.watcher = {
  ...config.watcher,
  additionalIgnores: [
    ...(config.watcher?.additionalIgnores ?? []),
    '**/tmp/**',
    '**/logs/**',
    '**/app/模試画像/**',
    '**/app/textbook/模試元画像/**',
    '**/app/textbook/模試解答/**',
    '**/あぷしX投稿/**',
  ],
};

module.exports = config;
