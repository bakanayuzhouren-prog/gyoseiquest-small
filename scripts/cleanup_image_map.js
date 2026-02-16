const fs = require('fs');
const path = require('path');

const mapPath = path.join(__dirname, '../src/imageMap.js');
const assetsDir = path.join(__dirname, '../assets/images');

const content = fs.readFileSync(mapPath, 'utf8');
const lines = content.split('\n');

const newLines = lines.map(line => {
    // Look for: 'key': require('@/assets/images/filename.ext'),
    const match = line.match(/require\('@\/assets\/images\/(.+?)'\)/);
    if (match) {
        const relativePath = match[1];
        // Handle subdirectory cases if necessary, though require paths usually match file structure relative to assets/images if using alias
        // The alias @/assets/images/ maps to ../assets/images/ from src/imageMap.js point of view? No, @ maps to project root.
        // So @/assets/images/foo.png -> project/assets/images/foo.png

        const fullPath = path.join(assetsDir, relativePath);

        if (!fs.existsSync(fullPath)) {
            console.log(`Missing: ${relativePath}`);
            // Comment out the line if it's not already commented
            if (!line.trim().startsWith('//')) {
                return '// ' + line;
            }
        }
    }
    return line;
});

fs.writeFileSync(mapPath, newLines.join('\n'), 'utf8');
console.log('Finished cleaning imageMap.js');
