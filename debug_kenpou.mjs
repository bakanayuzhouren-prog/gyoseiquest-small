import fs from 'fs';

function getKenpouInfo(filePath) {
    if (!fs.existsSync(filePath)) return 'NOT_FOUND';
    const content = fs.readFileSync(filePath, 'utf8');

    // Find SUBJECTS
    const startIdx = content.indexOf('export const SUBJECTS =');
    if (startIdx === -1) return 'NO_SUBJECTS';

    let subStr = content.substring(startIdx + 'export const SUBJECTS ='.length).trim();
    if (subStr.endsWith(';')) subStr = subStr.substring(0, subStr.length - 1);

    try {
        // Use a safe way to parse if possible, but eval is often necessary for these JS files
        const data = eval('(' + subStr + ')');

        // Find 憲法
        let kenpouArr = null;
        for (const cat in data) {
            if (data[cat]['憲法']) {
                kenpouArr = data[cat]['憲法'];
                break;
            }
        }

        if (!kenpouArr) return 'NO_KENPOU_SUBJECT';

        const count = kenpouArr.length;
        const emptyExplains = kenpouArr.filter(q => !q.explain || q.explain.length < 10).length;
        const firstFew = kenpouArr.slice(0, 3).map(q => ({
            text: q.text.substring(0, 50),
            explain: q.explain ? q.explain.substring(0, 50) : 'EMPTY'
        }));

        return { count, emptyExplains, firstFew };
    } catch (e) {
        return 'PARSE_ERROR: ' + e.message;
    }
}

console.log('--- Current src/questions.js ---');
console.log(JSON.stringify(getKenpouInfo('src/questions.js'), null, 2));

console.log('--- src/questions.js.bak ---');
console.log(JSON.stringify(getKenpouInfo('src/questions.js.bak'), null, 2));

console.log('--- src/questions.js.backup ---');
console.log(JSON.stringify(getKenpouInfo('src/questions.js.backup'), null, 2));
