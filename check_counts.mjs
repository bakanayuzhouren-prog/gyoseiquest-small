import fs from 'fs';

function extractSubject(filePath, catName, subName) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const startMarker = `"${catName}": {`;
  const startIndex = content.indexOf(startMarker);
  if (startIndex === -1) return null;

  const subMarker = `"${subName}": [`;
  const subIndex = content.indexOf(subMarker, startIndex);
  if (subIndex === -1) return null;

  // Find the closing bracket for the array
  let bracketCount = 0;
  let arrayStr = "";
  for (let i = subIndex + subMarker.length - 1; i < content.length; i++) {
    const char = content[i];
    if (char === '[') bracketCount++;
    if (char === ']') bracketCount--;
    arrayStr += char;
    if (bracketCount === 0) break;
  }

  try {
    return eval(arrayStr);
  } catch (e) {
    console.error(`Failed to eval ${subName}:`, e.message);
    return null;
  }
}

console.log("Extracting high quality Constitution from .backup...");
const kenpou = extractSubject('src/questions.js.backup', '憲法', '憲法');
if (kenpou) console.log(`Found ${kenpou.length} Constitution questions.`);

console.log("Extracting 5-choice Administrative Law from .bak...");
const gyousei_general = extractSubject('src/questions.js.bak', '行政法', '行政法総論');
const gyousei_procedure = extractSubject('src/questions.js.bak', '行政法', '行政手続法');
// ... add others ...

// Verification output to file
const report = {
  kenpou: kenpou ? kenpou.length : 0,
  gyousei_general: gyousei_general ? gyousei_general.length : 0
};
fs.writeFileSync('extraction_report.json', JSON.stringify(report, null, 2));
