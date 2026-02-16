const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'assets', 'images');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'imageMap.js');

// 対象とする拡張子
const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

// 除外するファイル名のパターン（完全一致または部分一致）
const EXCLUDE_FILES = [
    'icon.png', 'splash.png', 'favicon.png', 'adaptive-icon.png',
    'react-logo.png', 'android-icon', 'splash-icon'
];

console.log('Generating image map...');

try {
    const mapEntries = [];
    const keys = new Set();

    function scanDirectory(dir, relativePath = '') {
        const items = fs.readdirSync(dir);

        items.forEach(item => {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                scanDirectory(fullPath, path.join(relativePath, item));
            } else {
                const ext = path.extname(item).toLowerCase();
                if (EXTENSIONS.includes(ext)) {
                    // 除外チェック
                    if (EXCLUDE_FILES.some(ex => item.includes(ex))) {
                        // console.log(`Skipping excluded file: ${item}`);
                        return;
                    }
                    // 特殊文字チェック（@など）
                    if (item.includes('@')) {
                        console.log(`Skipping file with special characters: ${item}`);
                        return;
                    }

                    // キーはファイル名（拡張子なし）
                    const key = path.basename(item, ext);

                    if (keys.has(key)) {
                        console.warn(`⚠ Warning: Duplicate key '${key}' found. Skipping ${path.join(relativePath, item)}`);
                        return;
                    }

                    keys.add(key);

                    // パスは @/assets/images/... 形式にする
                    // Windowsのパス区切り文字 \ を / に置換
                    const resourcePath = '@/assets/images/' + path.join(relativePath, item).split(path.sep).join('/');

                    mapEntries.push(`  '${key}': require('${resourcePath}')`);
                }
            }
        });
    }

    scanDirectory(IMAGES_DIR);

    // ソートして出力（Gitの差分を綺麗にするため）
    mapEntries.sort();

    let content = 'export const IMAGE_RESOURCES_MAP = {\n';
    content += mapEntries.join(',\n');
    content += '\n};\n';

    fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
    console.log(`Successfully generated ${OUTPUT_FILE} with ${mapEntries.length} images.`);

} catch (err) {
    console.error('Error generating image map:', err);
    process.exit(1);
}
